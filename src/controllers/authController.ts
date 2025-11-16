import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/UserModel";

// Função para registrar um novo usuário
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Usuário já existe." });
    }

    // Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Cria o novo usuário
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      // ← GERA O TOKEN TAMBÉM NO REGISTRO
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "30d",
      });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token, // ← AGORA ENVIA O TOKEN
      });
    } else {
      res.status(400).json({ message: "Dados de usuário inválidos." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor.", error });
  }
};

// Função para fazer login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Procura o usuário pelo email
    const user = await User.findOne({ email });

    // Se o usuário existir e a senha estiver correta...
    if (user && (await bcrypt.compare(password, user.password))) {
      // Gera o token JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "30d",
      });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      });
    } else {
      res.status(401).json({ message: "Email ou senha inválidos." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor.", error });
  }
};
