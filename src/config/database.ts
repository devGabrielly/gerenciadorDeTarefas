import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      throw new Error("MONGO_URI não definida no arquivo .env");
    }
    await mongoose.connect(MONGO_URI);
    console.log("Backend: Conectado ao MongoDB com sucesso!");
  } catch (err) {
    console.error("Backend: Erro ao conectar ao MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;
