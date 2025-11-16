import { Request, Response } from "express";
import { Task } from "../models/taskModel";

interface AuthRequest extends Request {
  user?: any;
}

// 1. Função GETTASKS
export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar tarefas." });
  }
};

// 2. Função CREATETASK
export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description, deadline, priority } = req.body;

  if (!title) {
    return res.status(400).json({ message: "O título é obrigatório." });
  }
  try {
    const task = await Task.create({
      user: req.user.id,
      title,
      description: description || "",
      deadline,
      priority: priority || "normal",
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar tarefa." });
  }
};

// 3. Função UPDATETASK
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada." });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Usuário não autorizado." });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar tarefa." });
  }
};

// 4. Função DELETETASK
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada." });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Usuário não autorizado." });
    }

    await task.deleteOne({ _id: req.params.id });
    res
      .status(200)
      .json({ _id: req.params.id, message: "Tarefa excluída com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir tarefa." });
  }
};
