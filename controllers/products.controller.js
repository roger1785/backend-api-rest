import Product from "../models/Product.js";
import Category from "../models/Category.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .populate("owner", "email");

    res.json(products);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("category");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    if (error.name == "CastError") {
      return res.status(400).json({ error: "Invalid product id" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // console.log(req.body, req.user);

    // const data = {
    //   name: req.body.name,
    //   price: req.body.price,
    //   stock: req.body.stock,
    //   category: req.body.category,
    //   owner: req.user.id,
    // };

    const data = {
      ...req.body,
      owner: req.user.id,
    };

    // console.log(data);

    const product = new Product(data);
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    if (error.name == "ValidationError") {
      return res.status(422).json({ error: error.errors });
    }

    if (error.name == "CastError") {
      return res.status(400).json({ error: "Invalid category id" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.owner.toString() != req.user.id) {
      return res.status(403).json({ error: "Not allowed" });
    }

    const category = await Category.findById(req.body.category);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const productUpdate = await Product.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    // if (!productUpdate) {
    //   return res.status(404).json({ error: "Product not found" });
    // }

    res.json(productUpdate);
  } catch (error) {
    // console.log(error);

    if (error.name == "ValidationError") {
      return res.status(422).json({ error: error.errors });
    }

    if (error.name == "CastError") {
      return res.status(400).json({ error: "Invalid id" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.owner.toString() != req.user.id) {
      return res.status(403).json({ error: "Not allowed" });
    }

    await product.deleteOne({ _id: id });

    // const productDelete = await Product.findByIdAndDelete(id);

    // if (!productDelete) {
    //   return res.status(404).json({ error: "Product not found" });
    // }

    res.status(204).send();
  } catch (error) {
    if (error.name == "CastError") {
      return res.status(400).json({ error: "Invalid product id" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.id }).populate(
      "category",
    );

    res.json(products);
  } catch (error) {
    if (error.name == "CastError") {
      return res.status(400).json({ error: "Invalid category id" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductsByOwner = async (req, res) => {
  const products = await Product.find({ owner: req.user.id });

  res.json(products);
};
