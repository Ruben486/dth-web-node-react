import express from "express";
import { createPreferences,mpwebhook,getPagoPorId } from "../controllers/mercadoPagoController.js"

const router = express.Router();

router.post('/createPreferences',createPreferences);
router.post('/mpwebhook',mpwebhook);
router.get('/getPagoPorId',getPagoPorId);

export default router;