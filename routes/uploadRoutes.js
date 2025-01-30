import express from "express";
import { uploadFile } from "../services/fileController/uploadFileController.js";
import AuthMiddlewareVerifyToken from "../midleware/AuthMiddlewareVerifyToken.js";

const router = express.Router();

router.post("/upload", AuthMiddlewareVerifyToken, uploadFile);

export default router;
