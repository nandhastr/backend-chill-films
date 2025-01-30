import express from "express";
import AuthMiddlewareVerifyToken from "../midleware/AuthMiddlewareVerifyToken.js";
import refreshToken from "../services/auth/refreshToken.js";
import { getAllUsers, getUser, updateUser, deleteUser, sortUser, searchUser, filterUser } from "../services/userController.js";
import Register from "../services/auth/registerController.js";
import Login from "../services/auth/loginController.js";
import Logout from "../services/auth/logoutController.js";

const router = express.Router();


router.post("/register", Register);
router.post("/login",  Login);
router.delete("/logout", Logout);

router.get("/refreshtoken", refreshToken);

router.get("/users", AuthMiddlewareVerifyToken, getAllUsers);
router.get("/user/:id", AuthMiddlewareVerifyToken, getUser);
router.put("/user/:id", AuthMiddlewareVerifyToken, updateUser);
router.delete("/user/:id", AuthMiddlewareVerifyToken, deleteUser);


router.get("/filter", AuthMiddlewareVerifyToken, filterUser);
router.get("/sortUser", AuthMiddlewareVerifyToken, sortUser);
router.get("/user", AuthMiddlewareVerifyToken, searchUser);

export default router;
