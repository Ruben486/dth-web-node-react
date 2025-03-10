import User from "../modelos/User.js";

/**
 * Verifica si un correo electrónico ya existe en la base de datos
 * @param {string} email - El correo electrónico a verificar
 * @returns {Promise<boolean>} - true si el correo existe, false si no
 */
export const emailExists = async (email) => {
  try {
    const user = await User.findOne({ email });
    return !!user;
  } catch (error) {
    throw new Error(`Error al verificar el correo electrónico: ${error.message}`);
  }
};

/**
 * Verifica si un nombre de usuario ya existe en la base de datos
 * @param {string} username - El nombre de usuario a verificar
 * @returns {Promise<boolean>} - true si el nombre de usuario existe, false si no
 */
export const usernameExists = async (username) => {
  try {
    const user = await User.findOne({ username });
    return !!user;
  } catch (error) {
    throw new Error(`Error al verificar el nombre de usuario: ${error.message}`);
  }
};

/**
 * Valida la fortaleza de una contraseña
 * @param {string} password - La contraseña a validar
 * @returns {Object} - Objeto con el resultado de la validación
 */
export const validatePasswordStrength = (password) => {
  const result = {
    isValid: true,
    errors: []
  };

  // Verificar longitud mínima
  if (password.length < 8) {
    result.isValid = false;
    result.errors.push('La contraseña debe tener al menos 8 caracteres');
  }

  // Verificar si contiene al menos una letra mayúscula
  if (!/[A-Z]/.test(password)) {
    result.isValid = false;
    result.errors.push('La contraseña debe contener al menos una letra mayúscula');
  }

  // Verificar si contiene al menos una letra minúscula
  if (!/[a-z]/.test(password)) {
    result.isValid = false;
    result.errors.push('La contraseña debe contener al menos una letra minúscula');
  }

  // Verificar si contiene al menos un número
  if (!/[0-9]/.test(password)) {
    result.isValid = false;
    result.errors.push('La contraseña debe contener al menos un número');
  }

  // Verificar si contiene al menos un carácter especial
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    result.isValid = false;
    result.errors.push('La contraseña debe contener al menos un carácter especial');
  }

  // Verificar si contiene secuencias comunes
  const commonSequences = ['123456', 'password', 'qwerty', 'abc123'];
  for (const sequence of commonSequences) {
    if (password.toLowerCase().includes(sequence)) {
      result.isValid = false;
      result.errors.push('La contraseña contiene una secuencia común y fácil de adivinar');
      break;
    }
  }

  return result;
};

/**
 * Valida un correo electrónico con reglas más estrictas que las de express-validator
 * @param {string} email - El correo electrónico a validar
 * @returns {Object} - Objeto con el resultado de la validación
 */
export const validateEmail = (email) => {
  const result = {
    isValid: true,
    errors: []
  };

  // Expresión regular más estricta para validar correos electrónicos
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    result.isValid = false;
    result.errors.push('El formato del correo electrónico no es válido');
  }

  // Verificar dominios de correo temporales o no deseados
  const suspiciousDomains = ['tempmail.com', 'throwawaymail.com', 'mailinator.com'];
  const domain = email.split('@')[1];
  if (suspiciousDomains.includes(domain)) {
    result.isValid = false;
    result.errors.push('No se permiten correos electrónicos de dominios temporales');
  }

  return result;
};

/**
 * Valida un nombre de usuario con reglas más estrictas
 * @param {string} username - El nombre de usuario a validar
 * @returns {Object} - Objeto con el resultado de la validación
 */
export const validateUsername = (username) => {
  const result = {
    isValid: true,
    errors: []
  };

  // Verificar longitud
  if (username.length < 3 || username.length > 30) {
    result.isValid = false;
    result.errors.push('El nombre de usuario debe tener entre 3 y 30 caracteres');
  }

  // Verificar caracteres permitidos
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    result.isValid = false;
    result.errors.push('El nombre de usuario solo puede contener letras, números y guiones bajos');
  }

  // Verificar palabras no permitidas
  const forbiddenWords = ['admin', 'root', 'system', 'moderator'];
  if (forbiddenWords.some(word => username.toLowerCase() === word)) {
    result.isValid = false;
    result.errors.push('El nombre de usuario contiene palabras reservadas');
  }

  return result;
};
