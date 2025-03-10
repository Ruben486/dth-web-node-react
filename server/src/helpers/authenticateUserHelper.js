import jwt from "jsonwebtoken";
import User  from "../modelos/User.js";
import { generateToken } from "../librerias/token.js";

const setAuthCookie = (res, token) => {
    // este codigo a revisar
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      path: "/",
    });
    return token;
    // a revisar
  };
  // autenticacion de usuario 
export const authenticateUser = async (res, user) => {
    const token = generateToken({ id: user._id });
    setAuthCookie(res, token);
    return token
  };
  