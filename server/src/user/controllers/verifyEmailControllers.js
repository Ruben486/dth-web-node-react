// Function to send verification email
import nodemailer from "nodemailer";
import "dotenv/config";
import { generateTransporter } from "../helpers/nodeMailTransporter.js";
import { EmailTemplateService } from "../services/emailTemplateService.js";

let verificationCodes = {};

// Function to generate a 4-digit verification code
function generateVerificationCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

async function codeAndEmail(email) {
  const verificationCode = parseInt(generateVerificationCode());
  verificationCodes[email] = verificationCode;

  // const htmlTemplate = findHtmlTemplate();
  const transporter = generateTransporter();
  const { isHtml, content } =
    EmailTemplateService.getEmailContent(verificationCode);

  let mailOptions = {
    from: process.env.GOOGLE_ACCOUNT,
    to: email,
    subject: "Verificación de correo",
    ...(isHtml ? { html: content } : { text: content }),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return {
      success: true,
      message: "Envìo exitoso del mail ",
    };
  } catch (error) {
    return {
      success: false,
      message: "Ocurrió un error en el envio del correo de verificación",
      error,
    };
  }
}

export const sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const result = await codeAndEmail(email);
  res.json(result);
};

// Function to verify the code entered by the user
function validateCode(email, code) {
  console.log(verificationCodes[email])
  // hay uno que es numerico y otro es alfa
  if (verificationCodes[email] && verificationCodes[email] === code) {
    delete verificationCodes[email];
    return { success: true, message: "El Código ingresado ha sido validado con exito" };
  } else {
    return { success: false, message: "Código de verificación inválido" };
  }
}
export const verifyCode = async (req, res) => {
  const { email, code } = req.body;
  const result = validateCode(email, code);
  res.json(result);
};
//
// middleeare opcional para manejo de errores
/* export const handleTemplateErrors = (err, req, res, next) => {
  if (err.code === 'ENOENT' && err.message.includes('htmlTemplate.html')) {
    console.warn('Template HTML no encontrado, usando texto plano como fallback');
    return next(); // Continuar con texto plano
  }
  next(err); // Pasar otros errores al siguiente middleware
}; */
