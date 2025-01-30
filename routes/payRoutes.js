import express from "express";
import { getPays, getPay, createPay, updatePay, deletePay, filterPembayaran, sortPembayaran, searchPembayaran } from "../services/pembayaranController.js";
import AuthMiddlewareVerifyToken from '../midleware/AuthMiddlewareVerifyToken.js';

const router = express.Router();


router.get("/pays", AuthMiddlewareVerifyToken,  getPays);
router.get("/pay/:id", AuthMiddlewareVerifyToken,  getPay);
router.post("/pay", AuthMiddlewareVerifyToken,  createPay);
router.put("/pay/:id", AuthMiddlewareVerifyToken,  updatePay);
router.delete("/pay/:id", AuthMiddlewareVerifyToken,  deletePay);

router.get("/filterPay", AuthMiddlewareVerifyToken,  filterPembayaran);
router.get("/sortPay", AuthMiddlewareVerifyToken,  sortPembayaran);
router.get("/searchPay", AuthMiddlewareVerifyToken,  searchPembayaran);

export default router;

