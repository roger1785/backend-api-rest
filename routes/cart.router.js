import { Router } from "express";

const router = Router();

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { addToCart } from "../controllers/cart.controller.js";
import { get } from "mongoose";

router.post("/", authMiddleware, addToCart);
// router.get("/", authMiddleware, getCart);
// router.delete("/", authMiddleware, clearCart);

export default router;
