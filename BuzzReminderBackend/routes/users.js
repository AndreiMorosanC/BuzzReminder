import express from "express";
import User from "../models/User.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const { uid, email } = req.firebaseUser;

    let user = await User.findOne({ uid });
    if (!user) {
      user = new User({ uid, email });
      await user.save();
    }

    res.status(201).json({
      mensaje: "Usuario guardado correctamente",
      user: { uid, email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al guardar el usuario" });
  }
});

export default router;
