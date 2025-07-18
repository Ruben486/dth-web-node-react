import User from "../models/User.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const secretKey = process.env.JWT_SECRET_KEY;
// VERIFY TOKEN
// Esta version retorna un valor a ser usado en las siguientes funciones

const verifyTokenExistence = async (cookie) => {
  if (!cookie) return { error: "No token provided" };

  const token = cookie.split("=")[1];
  if (!token) return { error: "Token not found" };
  try {
    // devuelve el id del user logeado
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const userFound = await User.findById(decoded.id);
    if (!userFound) return { error: "User not found" };

    return {
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      isAdmin: userFound.isAdmin,
    };
  } catch (error) {
    return { error: error.message };
  }
};

// en desuso
const verify_Token = async (headertoken) => {
  if (headertoken) {
    const token = headertoken.split("=")[1];
    if (!token) return false;
    const tokenfound = await jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      async (error, user) => {
        if (error) return error.message;
        const userFound = await User.findById(user.id);
        if (!userFound) return false;

        return {
          id: userFound._id,
          username: userFound.username,
          email: userFound.email,
          isAdmin: userFound.isAdmin,
        };
      }
    );

    return tokenfound;
  } else {
    return false;
  }
};

const verifyTokenRespose = async (req, res) => {
  const headertoken = req.header.cookie;
  if (headertoken) {
    const token = headertoken.split("=")[1];
    if (!token) return res.send(false);

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, user) => {
      if (error) return res.send(error);
      const userFound = await User.findById(user._id);
      if (!userFound) return res.sendStatus(401);

      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
      });
    });
  } else {
    res.status(405).json("No se ha proporcionado información del usuario");
  }
};

const verifyTokenAndAuthorization = async (req, res, next) => {
  const headertoken = req.headers.cookie;
  const response = await verifyTokenExistence(headertoken);
  if (response.id === req.params.id || response.isAdmin) {
    next();
  } else {
    res.status(403).json("No esta habilitado a realizar esa tarea !");
  }
};

const verifyTokenAndAdmin = async (req, res, next) => {
  const headertoken = req.headers.cookie;
  const response = await verifyTokenExistence(headertoken);
  console.log(response);
  // manejo la respuesta de verifyTokenExistence
  if (response.isAdmin) {
    next();
  } else {
    res.status(403).json("No esta autorizado a realizar esta accion !");
  }
};

const validateToken = async (req, res, next) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No se proporcionò un Token",
    });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    const userDecoded = await User.findById(decoded.id);
    if (userDecoded) {
      return res.status(200).json({
        success: true,
        user: {
          id: decoded._id,
          username: userDecoded.username,
          email: userDecoded.email,
          isAdmin: userDecoded.isAdmin,
        },
      });
    }
    return null;
    next();
  } catch (error) {
    res.clearCookie("token").status(401).json({
      success: false,
      error: {
        message: "Token inválido o expirado",
      },
    });
  }
};

export {
  verify_Token,
  verifyTokenRespose,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  validateToken,
};
