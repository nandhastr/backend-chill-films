import express from "express";
import { getGenres,  getGenre,  createGenre,  updateGenre,  deleteGenre,  filterGenre,  sortGenre,  searchGenre } from "../services/genreController.js";
import AuthMiddlewareVerifyToken from "../midleware/AuthMiddlewareVerifyToken.js";

const router = express.Router();

router.get("/genre", AuthMiddlewareVerifyToken,  getGenres);
router.get("/genre/:id", AuthMiddlewareVerifyToken,  getGenre);
router.post("/genre", AuthMiddlewareVerifyToken, createGenre);
router.put("/genre/:id", AuthMiddlewareVerifyToken,  updateGenre);
router.delete("/genre/:id", AuthMiddlewareVerifyToken,  deleteGenre);


router.get("/filterGenre", AuthMiddlewareVerifyToken,  filterGenre);
router.get("/sortGenre", AuthMiddlewareVerifyToken,  sortGenre);
router.get("/searchGenre", AuthMiddlewareVerifyToken,  searchGenre);

export default router;
