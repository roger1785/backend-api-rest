import { Router } from "express";

const router = Router();

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsByOwner,
} from "../controllers/products.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

router.get("/my-products", authMiddleware, getProductsByOwner);

// CRUD: create, read, update, delete
router.post("/", authMiddleware, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

// Extra
router.get("/category/:id", getProductsByCategory);

export default router;
