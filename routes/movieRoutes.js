import express from "express";
import { getMovies, getMovie, createMovie, updateMovie, deleteMovie, filterEpisodeMovie, sortEpisodeMovie, searchEpisodeMovie } from "../services/movieController.js";
import AuthMiddlewareVerifyToken from "../midleware/AuthMiddlewareVerifyToken.js";

const router = express.Router();

router.get("/movies", AuthMiddlewareVerifyToken, getMovies);
router.get("/movie/:id", AuthMiddlewareVerifyToken, getMovie);
router.post("/movie", AuthMiddlewareVerifyToken,  createMovie);
router.put("/movie/:id", AuthMiddlewareVerifyToken,  updateMovie);
router.delete("/movie/:id", AuthMiddlewareVerifyToken,  deleteMovie);

router.get("/filterMovie ", AuthMiddlewareVerifyToken,  filterEpisodeMovie);
router.get("/sortMovie ", AuthMiddlewareVerifyToken,  sortEpisodeMovie);
router.get("/searchMovie ", AuthMiddlewareVerifyToken,  searchEpisodeMovie);

export default router;
