import NodeCache from 'node-cache';

// Caché para almacenar los intentos de inicio de sesión
const loginAttempts = new NodeCache({ stdTTL: 60 * 15 }); // TTL de 15 minutos

/**
 * Middleware para limitar los intentos de inicio de sesión
 * @param {number} maxAttempts - Número máximo de intentos permitidos
 * @param {number} windowMs - Ventana de tiempo en milisegundos
 * @returns {Function} - Middleware de Express
 */
export const loginRateLimiter = (maxAttempts = 5, windowMs = 15 * 60 * 1000) => {
  return (req, res, next) => {
    // Obtener la dirección IP del cliente
    const ip = req.ip || req.connection.remoteAddress;
    
    // Clave única para esta IP
    const key = `login_attempt_${ip}`;
    
    // Obtener los intentos actuales
    const attempts = loginAttempts.get(key) || 0;
    
    // Si se ha excedido el límite, bloquear la solicitud
    if (attempts >= maxAttempts) {
      return res.status(429).json({
        success: false,
        message: 'Demasiados intentos de inicio de sesión. Por favor, inténtelo de nuevo más tarde.',
        remainingTime: Math.ceil(loginAttempts.getTtl(key) / 1000) // Tiempo restante en segundos
      });
    }
    
    // Incrementar el contador de intentos
    loginAttempts.set(key, attempts + 1);
    
    // Middleware para verificar si el inicio de sesión fue exitoso
    res.on('finish', () => {
      // Si el inicio de sesión fue exitoso (código 200), reiniciar el contador
      if (res.statusCode === 200) {
        loginAttempts.del(key);
      }
    });
    
    next();
  };
};

/**
 * Middleware para limitar las solicitudes generales
 * @param {number} maxRequests - Número máximo de solicitudes permitidas
 * @param {number} windowMs - Ventana de tiempo en milisegundos
 * @returns {Function} - Middleware de Express
 */
export const generalRateLimiter = (maxRequests = 100, windowMs = 60 * 1000) => {
  const requests = new NodeCache({ stdTTL: windowMs / 1000 });
  
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const key = `request_${ip}`;
    
    const requestCount = requests.get(key) || 0;
    
    if (requestCount >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Demasiadas solicitudes. Por favor, inténtelo de nuevo más tarde.',
        remainingTime: Math.ceil(requests.getTtl(key) / 1000) // Tiempo restante en segundos
      });
    }
    
    requests.set(key, requestCount + 1);
    next();
  };
};

/**
 * Middleware para limitar los intentos de registro
 * @param {number} maxAttempts - Número máximo de intentos permitidos
 * @param {number} windowMs - Ventana de tiempo en milisegundos
 * @returns {Function} - Middleware de Express
 */
export const registerRateLimiter = (maxAttempts = 3, windowMs = 60 * 60 * 1000) => {
  const registerAttempts = new NodeCache({ stdTTL: windowMs / 1000 });
  
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    console.log(ip)
    const key = `register_attempt_${ip}`;
    
    const attempts = registerAttempts.get(key) || 0;
    
    if (attempts >= maxAttempts) {
      return res.status(429).json({
        success: false,
        message: 'Demasiados intentos de registro. Por favor, inténtelo de nuevo más tarde.',
        remainingTime: Math.ceil(registerAttempts.getTtl(key) / 1000) // Tiempo restante en segundos
      });
    }
    
    registerAttempts.set(key, attempts + 1);
    
    // Si el registro fue exitoso, no reiniciamos el contador para evitar abusos
    // Solo se reiniciará después del tiempo de expiración
    
    next();
  };
};
