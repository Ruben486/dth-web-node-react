import express from 'express';
import {sendVerificationCode,verifyCode } from "../controllers/verifyEmailControllers.js"

const router = express.Router();
router.post('/sendverificationemail',sendVerificationCode);
router.post('/verifyCode', verifyCode);

export default router;
