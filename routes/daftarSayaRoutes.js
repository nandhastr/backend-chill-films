import express from "express";
import { getsDaftarSaya, getDaftarSaya, createDaftarSaya, updateDaftarSaya, deleteDaftarSaya, filterDaftarSaya, sortDaftarSaya, searchDaftarSaya } from "../services/daftarSayaController.js";
import AuthMiddlewareVerifyToken from "../midleware/AuthMiddlewareVerifyToken.js";

const router = express.Router();
router.get("/daftar_saya",AuthMiddlewareVerifyToken, getsDaftarSaya);
router.get("/daftar_saya/:id", AuthMiddlewareVerifyToken, getDaftarSaya);
router.post("/daftar_saya", AuthMiddlewareVerifyToken, createDaftarSaya);
router.put("/daftar_saya/:id", AuthMiddlewareVerifyToken, updateDaftarSaya);
router.delete("/daftar_saya/:id", AuthMiddlewareVerifyToken, deleteDaftarSaya);

router.get("/filterDaftarSaya", AuthMiddlewareVerifyToken, filterDaftarSaya);
router.get("/sortDaftarSaya", AuthMiddlewareVerifyToken, sortDaftarSaya);
router.get("/searchDaftarSaya", AuthMiddlewareVerifyToken, searchDaftarSaya);


export default router;
