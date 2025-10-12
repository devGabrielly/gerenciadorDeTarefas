import { Schema, model } from "mongoose";

// Define a estrutura (schema) para os documentos de usuário
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Cria e exporta o modelo 'User' que usaremos para interagir com a coleção de usuários
export const User = model("User", userSchema);
