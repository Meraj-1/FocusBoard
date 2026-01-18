import express from "express";
import { signup, login, logout } from "../controllers/auth_controller.js";
import { authMiddleware } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);



export default router;
