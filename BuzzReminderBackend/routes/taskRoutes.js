import express from "express";
import verifyFirebaseToken from '../middlewares/verifyFirebaseToken.js';

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", verifyFirebaseToken, createTask);

router.get('/', verifyFirebaseToken, getTasks);

router.get("/", verifyFirebaseToken, (req, res) => {
  res.json({ message: "Tareas protegidas", user: req.user });
});

router.delete("/:id", verifyFirebaseToken, deleteTask);

export default router;
