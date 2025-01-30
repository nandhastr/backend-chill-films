import express from "express";
import { getOrders, getOrder, createOrder, updateOrder, deleteOrder, filterOrder, sortOrder, searchOrder } from "../services/orderController.js";
import AuthMiddlewareVerifyToken from "../midleware/AuthMiddlewareVerifyToken.js";

const router = express.Router();

router.get("/orders", AuthMiddlewareVerifyToken, getOrders);
router.get("/order/:id", AuthMiddlewareVerifyToken,getOrder);
router.post("/order", AuthMiddlewareVerifyToken, createOrder);
router.put("/order/:id", AuthMiddlewareVerifyToken, updateOrder);
router.delete("/order/:id", AuthMiddlewareVerifyToken, deleteOrder);

router.get("/filterOrder", AuthMiddlewareVerifyToken, filterOrder);
router.get("/sortOrder", AuthMiddlewareVerifyToken, sortOrder);
router.get("/searchOrder", AuthMiddlewareVerifyToken, searchOrder);

export default router;
