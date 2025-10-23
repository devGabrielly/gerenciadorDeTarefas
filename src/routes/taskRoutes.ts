// src/routes/taskRoutes.ts

import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

import { protect } from "../middleware/authMiddleware"; // Importamos nosso "segurança"

const router = Router();

// Rota para buscar todas as tarefas (GET) e criar uma nova tarefa (POST)
// Ambas as rotas na URL base '/' são protegidas
router.route("/").get(protect, getTasks).post(protect, createTask);

// Rota para atualizar (PUT) e deletar (DELETE) uma tarefa específica
// Ambas as rotas que usam um ID ('/:id') são protegidas
router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

export default router;
