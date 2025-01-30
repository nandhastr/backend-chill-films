import express from "express";
import { getPakets, getPaket, createPaket, updatePaket, deletePaket, filterPaket, sortPaket, searchPaket } from "../services/paketController.js";
import AuthMiddlewareVerifyToken from "../midleware/AuthMiddlewareVerifyToken.js";

const router = express.Router();

router.get("/pakets", AuthMiddlewareVerifyToken, getPakets);
router.get("/paket/:id", AuthMiddlewareVerifyToken, getPaket);
router.post("/paket", AuthMiddlewareVerifyToken,createPaket);
router.put("/paket/:id", AuthMiddlewareVerifyToken, updatePaket);
router.delete("/paket/:id", AuthMiddlewareVerifyToken, deletePaket);

router.get("/filterPaket", AuthMiddlewareVerifyToken, filterPaket);
router.get("/sortPaket", AuthMiddlewareVerifyToken, sortPaket);
router.get("/searchPaket", AuthMiddlewareVerifyToken, searchPaket);

export default router;
