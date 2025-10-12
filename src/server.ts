// src/server.ts

import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database";
import authRoutes from "./routes/authRoutes";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Executa a função para conectar ao banco de dados
connectDB();

// Cria a instância do servidor Express
const app = express();

// Middlewares: Funções que rodam em toda requisição
app.use(cors()); // Habilita o CORS para o frontend poder acessar a API
app.use(express.json()); // Habilita o servidor a entender JSON no corpo das requisições

// Rota de teste para verificar se o servidor está funcionando
app.get("/", (req: Request, res: Response) => {
  res.send("API do Gerenciador de Tarefas está no ar!");
});

// Usa as rotas de autenticação
// Todas as rotas em authRoutes serão prefixadas com /api/auth
app.use("/api/auth", authRoutes);

// ... Futuramente, as rotas de TAREFAS serão adicionadas aqui ...

const PORT = process.env.PORT || 5000;

// Inicia o servidor para "escutar" por requisições na porta especificada
app.listen(PORT, () =>
  console.log(`Backend: Servidor rodando na porta ${PORT}`)
);
