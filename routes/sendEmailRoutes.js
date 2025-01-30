import express from "express";
import verifyEmail from "../services/mail/verifyEmail.js";

const router = express.Router();

router.get("/verifikasi-email", verifyEmail)

export default router;