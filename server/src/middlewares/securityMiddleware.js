import crypto from 'crypto';

/**
 * Middleware para generar y verificar tokens CSRF
 * @returns {Function} - Middleware de Express
 */
export const csrfProtection = () => {
  return (req, res, next) => {
    // Solo aplicar a métodos que modifican datos
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
      // Verificar el token CSRF en las solicitudes
      const csrfToken = req.headers['x-csrf-token'] || req.body._csrf;
      const storedToken = req.cookies.csrfToken;
      
      if (!csrfToken || !storedToken || csrfToken !== storedToken) {
        return res.status(403).json({
          success: false,
          message: 'Token CSRF inválido o faltante'
        });
      }
    } else if (req.method === 'GET') {
      // Generar un nuevo token CSRF para solicitudes GET
      const newToken = crypto.randomBytes(32).toString('hex');
      res.cookie('csrfToken', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 1 día
      });
      
      // Almacenar el token para que esté disponible en las vistas
      res.locals.csrfToken = newToken;
    }
    
    next();
  };
};

/**
 * Middleware para establecer encabezados de seguridad
 * @returns {Function} - Middleware de Express
 */
export const securityHeaders = () => {
  return (req, res, next) => {
    // Prevenir que el navegador MIME-sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Habilitar la protección XSS en navegadores antiguos
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // Evitar que la página se cargue en un iframe (clickjacking)
    res.setHeader('X-Frame-Options', 'DENY');
    
    // Política de seguridad de contenido (CSP)
    res.setHeader('Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' https://apis.google.com; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https:; " +
      "connect-src 'self' https://api.example.com; " +
      "font-src 'self'; " +
      "object-src 'none'; " +
      "media-src 'self'; " +
      "frame-src 'self' https://accounts.google.com; " +
      "base-uri 'self'; " +
      "form-action 'self';"
    );
    
    // Política de referencia
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Política de características del navegador
    res.setHeader('Permissions-Policy', 
      'camera=(), microphone=(), geolocation=(), interest-cohort=()'
    );
    
    next();
  };
};

/**
 * Middleware para sanitizar entradas y prevenir inyecciones
 * @returns {Function} - Middleware de Express
 */
export const inputSanitizer = () => {
  return (req, res, next) => {
    // Función para sanitizar un valor
    const sanitize = (value) => {
      if (typeof value === 'string') {
        // Eliminar caracteres potencialmente peligrosos
        return value
          .replace(/[<>]/g, '') // Eliminar < y > para prevenir HTML
          .replace(/javascript:/gi, '') // Prevenir javascript: URLs
          .replace(/on\w+=/gi, '') // Prevenir eventos inline (onclick, onload, etc.)
          .trim();
      } else if (typeof value === 'object' && value !== null) {
        // Recursivamente sanitizar objetos y arrays
        Object.keys(value).forEach(key => {
          value[key] = sanitize(value[key]);
        });
      }
      return value;
    };
    
    // Sanitizar body, query y params
    if (req.body) req.body = sanitize(req.body);
    if (req.query) req.query = sanitize(req.query);
    if (req.params) req.params = sanitize(req.params);
    
    next();
  };
};

/**
 * Middleware para validar el origen de las solicitudes
 * @param {Array} allowedOrigins - Orígenes permitidos
 * @returns {Function} - Middleware de Express
 */
export const validateOrigin = (allowedOrigins = ['http://localhost:3000', 
    'https://yourdomain.com','http://localhost:8081','http://localhost:8082']) => {
  return (req, res, next) => {
    const origin = req.headers.origin;

    // Si no hay origen o es una solicitud del mismo sitio, permitir
    if (!origin || allowedOrigins.includes(origin)) {
      return next();
    }
    
    // Registrar intento sospechoso
    console.warn(`Intento de solicitud desde origen no permitido: ${origin}`);
    
    // Opcionalmente, se puede bloquear la solicitud
    // return res.status(403).json({
    //   success: false,
    //   message: 'Origen no permitido'
    // });
    
    // O simplemente registrar y permitir (menos restrictivo)
    next();
  };
};

/**
 * Middleware para detectar y prevenir ataques de inyección SQL
 * @returns {Function} - Middleware de Express
 */
export const sqlInjectionProtection = () => {
  return (req, res, next) => {
    // Patrones comunes de inyección SQL
    const sqlPatterns = [
      /(\s|^)(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE)(\s)/i,
      /(\s|^)(UNION|JOIN|OR|AND)(\s)/i,
      /'(''|[^'])*'/,
      /;.*/,
      /--/,
      /\/\*/,
      /\*\//
    ];
    
    // Función para verificar si un valor contiene patrones de inyección SQL
    const checkForSqlInjection = (value) => {
      if (typeof value !== 'string') return false;
      
      return sqlPatterns.some(pattern => pattern.test(value));
    };
    
    // Función para verificar recursivamente objetos
    const checkObject = (obj) => {
      if (!obj) return false;
      
      for (const key in obj) {
        if (typeof obj[key] === 'string' && checkForSqlInjection(obj[key])) {
          return true;
        } else if (typeof obj[key] === 'object') {
          if (checkObject(obj[key])) return true;
        }
      }
      
      return false;
    };
    
    // Verificar body, query y params
    if (
      checkObject(req.body) || 
      checkObject(req.query) || 
      checkObject(req.params)
    ) {
      console.warn(`Posible intento de inyección SQL detectado desde ${req.ip}`);
      return res.status(403).json({
        success: false,
        message: 'Solicitud bloqueada por motivos de seguridad'
      });
    }
    
    next();
  };
};

/**
 * Middleware para aplicar todas las protecciones de seguridad
 * @returns {Array} - Array de middlewares de Express
 */
export const applySecurityMiddleware = () => {
  return [
    securityHeaders(),
    inputSanitizer(),
    sqlInjectionProtection(),
    validateOrigin(),
    // csrfProtection() // Comentado porque requiere configuración adicional
  ];
};
