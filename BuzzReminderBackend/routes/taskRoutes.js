import express from "express";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", verifyFirebaseToken, createTask);
router.get("/", verifyFirebaseToken, getTasks);
router.put("/:id",verifyFirebaseToken, updateTask)
router.delete("/:id", verifyFirebaseToken, deleteTask);

export default router;
