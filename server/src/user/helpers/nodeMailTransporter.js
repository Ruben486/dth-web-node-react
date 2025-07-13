import nodemailer from "nodemailer";
import "dotenv/config";

export const generateTransporter = () => {
     const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.GOOGLE_ACCOUNT,
          pass: process.env.GOOGLE_APP_PASS,
        },
      });
    return transporter;  
};
