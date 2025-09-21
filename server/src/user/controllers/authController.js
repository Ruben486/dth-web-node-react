import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { handleError } from "../../helpers/handleErrorHelper.js";
import { authenticateUser } from "../../helpers/authenticateUserHelper.js";
import { sendResponse } from "../../helpers/sendReponseHelper.js";
import {
  validatePasswordStrength,
  validateEmail,
  validateUsername,
} from "../helpers/customValidationHelper.js";

// user a enviar en la respuesta
const responseUser = (user) => {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
  };
};

// el register deber verse ademas como create user signUp
const register = async (req, res) => {
  // HAY QUE ENVOLVER Toda el proceso en un una transaccion
  //const session = await mongoose.startSession();
  //session.startTransaction();
  try {
    const { username, email, password } = req.body;

    // Validaciones personalizadas adicionales
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      const error = new Error(emailValidation.errors.join(", "));
      error.statusCode = 400;
      throw error;
    }

    const usernameValidation = validateUsername(username);
    if (!usernameValidation.isValid) {
      const error = new Error(usernameValidation.errors.join(", "));
      error.statusCode = 400;
      throw error;
    }

    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      const error = new Error(passwordValidation.errors.join(", "));
      error.statusCode = 400;
      throw error;
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("El correo electrónico ya está registrado");
      error.statusCode = 409;
      throw error;
    }

    // Verificar si el nombre de usuario ya existe
    /* const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      const error = new Error("El nombre de usuario ya está en uso");
      error.statusCode = 409;
      throw error;
    } */

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el nuevo usuario
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Guardar el usuario en la base de datos
    const savedUser = await newUser.save();
    const token = authenticateUser(res, savedUser);

    // Confirmar la transacción
    //await session.commitTransaction();
    //session.endSession();

    // Enviar respuesta exitosa
    return sendResponse(
      res,
      201,
      true,
      "El usuario fue creado exitosamente",
      responseUser(savedUser),
      token
    );
  } catch (error) {
    // Abortar la transacción en caso de error
    //await session.abortTransaction();
    //session.endSession();

    // Determinar el código de estado y mensaje apropiados
    const statusCode = error.statusCode || 500;
    const message = statusCode === 500 ? "Error en el servidor" : error.message;

    return handleError(res, statusCode, message, error);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validación adicional del correo electrónico
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      return handleError(res, 400, emailValidation.errors.join(", "));
    }

    // Buscar el usuario por correo electrónico
    const user = await User.findOne({ email });
    if (!user) {
      // No revelar si el correo existe o no por seguridad
      return handleError(res, 401, "Credenciales inválidas");
    }

    // Verificar la contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      // No revelar si la contraseña es incorrecta específicamente
      return handleError(res, 401, "Credenciales inválidas");
    }

    // Registrar intento de inicio de sesión exitoso (podría expandirse para seguridad)
    // Aquí se podría agregar lógica para registrar IP, fecha, etc.

    // Generar y establecer el token de autenticación
    const token = authenticateUser(res, user);

    // Enviar respuesta exitosa
    return sendResponse(
      res,
      200,
      true,
      "Usuario conectado correctamente",
      responseUser(user),
      token
    );
  } catch (err) {
    // Manejar errores inesperados
    console.error("Error en login:", err);
    return handleError(res, 500, "Error en el servidor", err);
  }
};


// version con clearCookie
const logout = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Sesión cerrada correctamente",
  });
};

// google auth controller (googleSignIn o googleSignUp)
const googleSignIn = async (req, res) => {
  const { uid: googleId, email, displayName } = req.body;
  
  // Iniciar una transacción para garantizar la integridad de los datos
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Validar los datos recibidos de Google
    if (!googleId || !email || !displayName) {
      const error = new Error("Datos de autenticación de Google incompletos");
      error.statusCode = 400;
      throw error;
    }

    // Validar el formato del correo electrónico
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      const error = new Error(emailValidation.errors.join(", "));
      error.statusCode = 400;
      throw error;
    }

    // Buscar si el usuario ya existe
    const user = await User.findOne({
      email,
      googleId,
    });

    if (!user) {
      // Crear un nuevo usuario si no existe
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(googleId, salt);

      const newGoogleUser = new User({
        username: displayName,
        email,
        password: hashedPassword,
        googleId,
        authProvider: "google",
      });

      // Guardar el nuevo usuario
      const savedUser = await newGoogleUser.save({session});
      const token = authenticateUser(res, savedUser);

      // Confirmar la transacción
      await session.commitTransaction();
      session.endSession();

      return sendResponse(
        res,
        201, // Código 201 para creación
        true,
        "Usuario creado y conectado correctamente",
        responseUser(savedUser),
        token
      );
    } else {
      // Actualizar el usuario existente si es necesario
      if (user.authProvider !== "google") {
        user.username = displayName;
        user.authProvider = "google";
        await user.save({session});
      }

      const token = authenticateUser(res, user);

      // Confirmar la transacción
      await session.commitTransaction();
      session.endSession();

      return sendResponse(
        res,
        200,
        true,
        "Usuario conectado correctamente",
        responseUser(user),
        token
      );
    }
  } catch (error) {
    // Abortar la transacción en caso de error
    await session.abortTransaction();
    session.endSession();

    // Determinar el código de estado y mensaje apropiados
    const statusCode = error.statusCode || 500;
    const message = error
      // statusCode === 500 ? `Error al iniciar sesión con Google ${error}`   : error.message;
    console.log(error)
    return handleError(res, statusCode, message, error);
  }
};

export { register, login, logout, googleSignIn };
