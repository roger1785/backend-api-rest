import { Router } from "express";

const router = Router();

import { register, login, profile } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/register", register);
router.post("/login", login);

router.get("/profile", authMiddleware, profile);

export default router;
