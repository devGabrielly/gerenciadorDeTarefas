// src/server.ts

import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste para verificar se o servidor está funcionando
app.get("/", (req: Request, res: Response) => {
  res.send("API do Gerenciador de Tarefas está no ar!");
});

//  rotas de autenticação
app.use("/api/auth", authRoutes);

// rotas de tarefas
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

// Inicia o servidor
app.listen(PORT, () =>
  console.log(`Backend: Servidor rodando na porta ${PORT}`)
);
