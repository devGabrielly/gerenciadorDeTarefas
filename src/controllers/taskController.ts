import {Request , Response} from "express";
import {Task} from "../models/taskModel";

interface AuthRequest extends Request {
    user?: any;
}

export const getTasks = async (req: AuthRequest, res: Response) => {
    try {
        const task = await Task.find({userId: req.user.id}) .sort({createdAt: -1});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({message: "Erro ao buscar terefas."});
    }
};