import { body, validationResult } from 'express-validator';

// Función para manejar los resultados de la validación
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg
      }))
    });
  }
  next();
};

// Validaciones para el registro de usuarios
export const registerValidation = [
  // Validación del nombre de usuario
  body('username')
    .trim()
    .notEmpty().withMessage('El nombre de usuario es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre de usuario debe tener al menos 3 caracteres')
    .isLength({ max: 30 }).withMessage('El nombre de usuario no puede exceder los 30 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('El nombre de usuario solo puede contener letras, números y guiones bajos'),
  
  // Validación del correo electrónico
  body('email')
    .trim()
    .notEmpty().withMessage('El correo electrónico es obligatorio')
    .isEmail().withMessage('Ingrese un correo electrónico válido')
    .normalizeEmail(),
  
  // Validación de la contraseña
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula')
    .matches(/[a-z]/).withMessage('La contraseña debe contener al menos una letra minúscula')
    .matches(/[0-9]/).withMessage('La contraseña debe contener al menos un número')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('La contraseña debe contener al menos un carácter especial'),
  
  // Aplicar el middleware de manejo de errores
  handleValidationErrors
];

// Validaciones para el inicio de sesión
export const loginValidation = [
  // Validación del correo electrónico
  body('email')
    .trim()
    .notEmpty().withMessage('El correo electrónico es obligatorio')
    .isEmail().withMessage('Ingrese un correo electrónico válido')
    .normalizeEmail(),
  
  // Validación de la contraseña
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria'),
  
  // Aplicar el middleware de manejo de errores
  handleValidationErrors
];

// Validaciones para la autenticación con Google
export const googleSignInValidation = [
  // Validación del ID de Google
  body('uid')
    .notEmpty().withMessage('El ID de Google es obligatorio'),
  
  // Validación del correo electrónico
  body('email')
    .trim()
    .notEmpty().withMessage('El correo electrónico es obligatorio')
    .isEmail().withMessage('Ingrese un correo electrónico válido')
    .normalizeEmail(),
  
  // Validación del nombre de usuario
  body('displayName')
    .trim()
    .notEmpty().withMessage('El nombre de usuario es obligatorio'),
  
  // Aplicar el middleware de manejo de errores
  handleValidationErrors
];
