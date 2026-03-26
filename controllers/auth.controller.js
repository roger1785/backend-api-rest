import User from "../models/User.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  return token;
};

export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      message: "Perfil del usuario",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (password.length < 5) {
      return res
        .status(400)
        .json({ error: "Contraseña muy corta, mínimo 6 caracteres" });
    }

    const user = await User.findOne({ email });

    // console.log(user);

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // console.log(password, user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const token = createToken(user);

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    //   console.log(!email.includes("@"));

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Correo y contraseña son requeridos." });
    }

    //   if (!email.includes("@")) {
    //     return res.status(400).json({ error: "Invalid email" });
    //   }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    //   console.log(!emailRegex.test(email));

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (password.length < 5) {
      return res
        .status(400)
        .json({ error: "Contraseña muy corta, mínimo 6 caracteres" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Usuario duplicado" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hash,
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
