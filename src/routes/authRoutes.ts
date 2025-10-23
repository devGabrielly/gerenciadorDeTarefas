// src/routes/authRoutes.ts

import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController";

const router = Router();

// Define a rota POST para /api/auth/register
router.post("/register", registerUser);

// Define a rota POST para /api/auth/login
router.post("/login", loginUser);

export default router;
