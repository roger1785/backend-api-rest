import { Router } from "express";

const router = Router();

import {authMiddleware} from "../middlewares/auth.middleware.js";


import { addToCart } from "../controllers/cart.controller.js";

router.post("/", authMiddleware, addToCart);


export default router;
