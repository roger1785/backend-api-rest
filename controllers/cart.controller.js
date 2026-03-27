// import Cart from "../models/Cart.js";
// import { json } from "express"
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  const { product, quantity } = req.body;
  const userId = req.user.id;

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({
      user: userId,
      products: [],
    });
  }
  const productExists = cart.products.find((p) => p.product == product.Id);

  if (productExists) {
  } else {
    const newProduct = {
      product: productId,
      quantity: quantity,
    };
    cart.products.push(newProduct);
  }

  await cart.save();
  res.status(201).json({ message: "Carrito agregado al carrito" });

  // console.log(productExists);

  res.json({ user: req.user, body: req.body });
};
//   try {
//     console.log(req.body, req.user);

//     if (req.body.product == undefined) {
//       return res.status(422).json({ error: "Product ID is required" });
//     }

//     const product = await Product.findById(req.body.product);
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     if (req.body.quantity == "undefined") {
//       req.body.quantity = 1;
//     }

//     //deberia ser un numero entero positivo
//     if (req.body.quantity < 1 || !Number.isInteger(req.body.quantity)) {
//       return res
//         .status(400)
//         .json({ error: "Quantity must be a positive integer" });
//     }

//     // Validamos que tengamos stock suficiente
//     if (req.body.quantity > product.stock) {
//       return res.status(400).json({ error: "Not enough stock available" });
//     }

//     const cart = new Cart({
//       user: req.user.id,
//       product: [req.body.product],
//     });
//     const item = {
//       product: req.body.product,
//       quantity: req.body.quantity,
//     };
//     cart.products.push(item);
//     await cart.save();

//     res.send({ message: "Producto agregado al carrito" });
//   } catch (error) {
//     res.status(404).json({ message: "internal Server Error" });
//   }
// };
