import express from "express";
import { register, login, googleSignIn, logout } from "../controllers/authController.js";
import { validateToken } from "../controllers/verifyToken.js";
import { 
  registerValidation, 
  loginValidation, 
  googleSignInValidation 
} from "../middlewares/authValidation.js";
import {
  loginRateLimiter,
  registerRateLimiter,
  generalRateLimiter
} from "../../middlewares/rateLimitMiddleware.js";

const router = express.Router();

// Aplicar limitador general a todas las rutas de autenticación
router.use(generalRateLimiter(100, 60 * 1000)); // 100 solicitudes por minuto

// Ruta para registro de usuarios con validación y limitación de velocidad
router.post('/register', 
  registerRateLimiter(3, 60 * 60 * 1000), // 3 intentos por hora
  registerValidation, 
  register
);

// Ruta para inicio de sesión de usuarios con validación y limitación de velocidad
router.post('/login', 
  loginRateLimiter(5, 15 * 60 * 1000), // 5 intentos por 15 minutos
  loginValidation, 
  login
);

// Ingresar con Google con validación
router.post('/google', 
  generalRateLimiter(10, 60 * 1000), // 10 solicitudes por minuto
  googleSignInValidation, 
  googleSignIn
);

// Verificar token
router.get('/verifytoken', validateToken);

// Cerrar sesión
router.post('/logout', logout);

export default router;
