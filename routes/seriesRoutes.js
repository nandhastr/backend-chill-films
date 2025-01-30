import express from "express";
import { getSerieses, getSeries, createSeries, updateSeries, deleteSeries, filterSeries, sortSeries, searchSeries } from "../services/seriesController.js";
import AuthMiddlewareVerifyToken from "../midleware/AuthMiddlewareVerifyToken.js";

const router = express.Router();

router.get("/serieses", AuthMiddlewareVerifyToken,  getSerieses);
router.get("/series/:id", AuthMiddlewareVerifyToken,  getSeries);
router.post("/series", AuthMiddlewareVerifyToken,  createSeries);
router.put("/series/:id", AuthMiddlewareVerifyToken, updateSeries);
router.delete("/series/:id", AuthMiddlewareVerifyToken,  deleteSeries);

router.get("/filterSeries", AuthMiddlewareVerifyToken,  filterSeries);
router.get("/sortSeries", AuthMiddlewareVerifyToken,  sortSeries);
router.get("/searchSeries", AuthMiddlewareVerifyToken,  searchSeries);

export default router;
