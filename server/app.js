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
//app.use(applySecurityMiddleware());

// Middleware de Arcjet (comentado)
// app.use(arcjetMiddleware);

const allowedOrigins = [
  'http://localhost:8081',
  'http://localhost:8082',
  'http://localhost:5173',
  process.env.FRONTEND_URL,
  process.env.FRONTEND_TUNNEL,
  'https://jjtxsbw0-5173.brs.devtunnels.ms'
].filter(Boolean); // Remove undefined or empty origins

const corsOptions = {
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Origin',
    'Accept',
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range','set-cookie'],
  credentials: true,
  maxAge: 86400, // 24 horas
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
/* app.use(cors({
  credentials: true,
  origin: "*"
})); */
// Establecer encabezados personalizados después de cors
app.use((req, res, next) => {
  // Solo establecer Access-Control-Allow-Credentials si se permite
  res.header('Access-Control-Allow-Credentials', 'true');
  // Establecer Access-Control-Allow-Origin solo si el origen está permitido
  /* const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } */
  next();
});

app.use(fileUpload({
    limits: {fileSize: 1024*1024*50},
    useTempFiles: true,
    tempFileDir: "./upload",
    createParentPath: true,
}))

app.use(bodyParser.urlencoded({extended: false}));
export default app;
