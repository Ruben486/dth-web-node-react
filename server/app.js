import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import responseTime from "response-time";
import nodeCache from "node-cache";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import useragent from "express-useragent"; // Importa el middleware de useragent
import { applySecurityMiddleware } from "./src/middlewares/securityMiddleware.js";
import { generalRateLimiter } from "./src/middlewares/rateLimitMiddleware.js";
import { botDetection } from "./src/middlewares/botDetectionMiddleware.js";
import "dotenv/config";

const app = express();
export const serverCache = new nodeCache();

// Aplicar middlewares de seguridad básicos
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: '20kb' })); // Limita el tamaño de las solicitudes JSON
app.use(responseTime());
app.use(cookieParser());
app.use(useragent.express()); // Usa el middleware de useragent

// middleware de deteccion de bots
app.use(botDetection());

// Aplicar middleware de limitación de velocidad global
app.use(generalRateLimiter(200, 60 * 1000)); // 200 solicitudes por minuto globalmente

// Aplicar middlewares de seguridad personalizados
app.use(applySecurityMiddleware());

// Middleware de Arcjet (comentado)
//app.use(arcjetMiddleware);

const corsOptions = {
  // Especifica los orígenes permitidos
  origin: [
    'http://localhost:8081',
    'http://localhost:8082',  
    process.env.FRONTEND_URL
    // Agrega otros dominios permitidos según necesites
  ],
  
  // Métodos HTTP permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  
  // Headers permitidos
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With'
  ],
  
  // Exponer estos headers al cliente
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  
  // Permitir credenciales (cookies, headers de autorización)
  credentials: true,
  
  // Tiempo máximo que el navegador puede cachear la respuesta pre-flight
  maxAge: 86400, // 24 horas
  
  // Manejo de errores
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

app.use(fileUpload({
    limits: {fileSize: 1024*1024*50},
    useTempFiles: true,
    tempFileDir: "./upload",
    createParentPath: true,
}))

app.use(bodyParser.urlencoded({extended: true}));
export default app;
