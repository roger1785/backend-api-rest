import dotenv from "dotenv";
dotenv.config();

import express from "express";
import "./db.js";
import cors from "cors";

import productsRouter from "./routes/products.router.js";
import categoriesRouter from "./routes/categories.router.js";
import authRouter from "./routes/auth.router.js";
import cartRouter from "./routes/cart.router.js";
import pingRouter from "./routes/ping.router.js";
// import { authMiddleware } from "./middlewares/auth.middleware.js";

const app = express();

// app.use(
//   cors({
//     origin: "http://127.0.0.1:5173",
//   }),
// );
app.use(cors());
app.use(express.json());

// app.use("/products", authMiddleware, productsRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/auth", authRouter);
app.use("/cart", cartRouter);
app.use(pingRouter);

export default app;
