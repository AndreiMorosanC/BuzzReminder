
import mongoose from "mongoose";

export async function connectDB(){
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error.message);
    process.exit(1); // Cierra la app si falla la conexión
  }
};
