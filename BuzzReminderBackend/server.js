const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/users");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// ✅ Aquí es el único lugar donde conectas con MongoDB
mongoose.connect("mongodb+srv://andreimorosan39:JwL5EMJYlYQRfElb@cluster0.jtwyx7f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("🟢 MongoDB conectado"))
  .catch(err => console.error("❌ Error al conectar a MongoDB:", err));

// Rutas
app.use("/api/usuarios", userRoutes);

app.listen(3001, () => {
  console.log("🚀 Servidor backend en http://localhost:3001");
});
