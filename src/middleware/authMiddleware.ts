// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/UserModel";

// Estendemos a interface Request do Express para adicionar a propriedade 'user'
interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  // 1. Verifica se o token está no cabeçalho da requisição
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2. Extrai o token do cabeçalho (formato "Bearer TOKEN")
      token = req.headers.authorization.split(" ")[1];

      // 3. Verifica se o token é válido usando o segredo
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

      // 4. Busca o usuário do banco de dados pelo ID que estava no token
      // e anexa o usuário ao objeto 'req' (sem a senha)
      req.user = await User.findById(decoded.id).select("-password");

      // 5. Chama o próximo passo (o controlador da rota)
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Não autorizado, token falhou." });
    }
  }

  // Se não houver nenhum token no cabeçalho
  if (!token) {
    res.status(401).json({ message: "Não autorizado, sem token." });
  }
};
