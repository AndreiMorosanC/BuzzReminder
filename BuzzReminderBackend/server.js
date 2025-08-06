import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/users.js";
import taskRoutes from "./routes/taskRoutes.js";
import { connectDB } from "./config/db.js";
import sendEmailRoutes from "./routes/sendEmail.js";
import startReminderService from "./reminderCron.js";
const app = express();
startReminderService();
app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());


mongoose
  .connect(
    "mongodb+srv://andreimorosan39:JwL5EMJYlYQRfElb@cluster0.jtwyx7f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("🟢 MongoDB conectado"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

// Rutas
app.use("/api/usuarios", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api", sendEmailRoutes);
app.listen(3001, () => {
  console.log("🚀 Servidor backend en http://localhost:3001");
});
