import express from "express";
import { createPreferences,mpwebhook,getPagoPorId } from "../controllers/mercadoPagoController.js"

const router = express.Router();

router.post('/createPreferences',createPreferences);
router.post('/webhook',mpwebhook);
router.get('/getPagoPorId',getPagoPorId);

export default router;