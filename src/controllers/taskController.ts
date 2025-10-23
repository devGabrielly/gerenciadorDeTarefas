import {Request , Response} from "express";
import {Task} from "../models/taskModel";

interface AuthRequest extends Request {
    user?: any;
}

export const getTasks = async (req: AuthRequest, res: Response) => {
    try {
        const task = await Task.find({userId: req.user.id}) .sort({createdAt: -1});
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({message: "Erro ao buscar terefas."});
    }
};

export const createTask = async (req: AuthRequest, res: Response) => {
    const {title} = req.body;
    if (!title) {
        return res.status(400).json({message: "O título é obrigatório."})
    }
    try {
        const task = await Task.create({
            user: req.user.id, title,
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({message: "Erro ao criar tarefa."});
    }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({message: "Terefa não encontrada."});
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({message: "Usuário não autorizado."});
        }

        const updateTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.status(200).json(updateTask);
    } catch (error) {
        res.status(500).json({message: "Erro ao atualizar tarefa."});
    }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({message: "Tarefa não encontrada."});
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({message: "Usuário não autorizado."});
        }

        await task.deleteOne({_id: req.params.id});
        res.status(200).json({_id: req.params.id, message: "Tarefa excluída com sucesso!"});
    } catch (error) {
        res.status(500).json({message: "Erro ao excluir tarefa."});
    }
};