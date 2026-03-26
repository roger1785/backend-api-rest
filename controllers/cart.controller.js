// import Cart from "../models/Cart.js";
<<<<<<< HEAD
import { json } from "express";
import Product from "../models/Product.js";
=======
// import { json } from "express";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
>>>>>>> 6ea9a67 (actualizando)

export const addToCart = async (req, res) => {
  try {
    console.log(req.body, req.user);

    if (req.body.product == undefined) {
      return res.status(422).json({ error: "Product ID is required" });
    }

    const product = await Product.findById(req.body.product);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (req.body.quantity == "undefined") {
      req.body.quantity = 1;
    }

    //deberia ser un numero entero positivo
    if (req.body.quantity < 1 || !Number.isInteger(req.body.quantity)) {
      return res
        .status(400)
        .json({ error: "Quantity must be a positive integer" });
    }

    // Validamos que tengamos stock suficiente
    if (req.body.quantity > product.stock) {
      return res.status(400).json({ error: "Not enough stock available" });
    }

    const cart = new Cart({
      user: req.user.id,
      product: [req.body.product],
    });
    const item = {
      product: req.body.product,
      quantity: req.body.quantity,
    };
    cart.products.push(item);
    await cart.save();
    

    res.send({ message: "Producto agregado al carrito" });
  } catch (error) {
    res.status(404).json({ message: "internal Server Error" });
  }
};
