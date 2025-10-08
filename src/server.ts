const express = require("express");
import dotenv from "dotenv";
const cors = require("cors");
const dbConnect = require("./config/database"); // Importa nossa função de conexão

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Executa a função para conectar ao banco de dados
dbConnect();

// Cria a instância do servidor Express
const app = express();

// Middlewares: Funções que rodam em toda requisição
app.use(cors()); // Habilita o CORS para o frontend poder acessar a API
app.use(express.json()); // Habilita o servidor a entender JSON no corpo das requisições

// Rota de teste para verificar se o servidor está funcionando
/**
 * @param {import("express").Request} _req
 * @param {import("express").Response} res
 */
app.get(
  "/",
  (_req: import("express").Request, res: import("express").Response) => {
    res.send("API do Gerenciador de Tarefas está no ar!");
  }
);

// ... Futuramente, as rotas da nossa API serão adicionadas aqui ...

const PORT = process.env.PORT || 5000;

// Inicia o servidor para "escutar" por requisições na porta especificada
app.listen(PORT, () =>
  console.log(`Backend: Servidor rodando na porta ${PORT}`)
);
