import express from "express";
import User from "../models/User.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const { uid, email } = req.firebaseUser;
    const { name } = req.body;

    if (!name || name.trim().length < 2) {
      return res.status(400).json({ error: "Nombre inválido" });
    }

    let user = await User.findOne({ uid });

    if (user) {
      return res.status(200).json({
        mensaje: "Usuario ya registrado",
        user: { uid, email, name: user.name },
      });
    }

    user = new User({ uid, email, name });
    await user.save();

    res.status(201).json({
      mensaje: "Usuario creado correctamente",
      user: { uid, email, name },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al guardar el usuario" });
  }
});


