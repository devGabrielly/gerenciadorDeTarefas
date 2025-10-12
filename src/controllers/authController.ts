// src/controllers/authController.ts

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
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
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
      const token = jwt.sign(
        { id: user._id }, // O dado que queremos guardar no token
        process.env.JWT_SECRET!, // A chave secreta do .env
        { expiresIn: "1d" } // Expira em 1 dia
      );

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token, // Envia o token para o frontend
      });
    } else {
      res.status(401).json({ message: "Email ou senha inválidos." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor.", error });
  }
};
