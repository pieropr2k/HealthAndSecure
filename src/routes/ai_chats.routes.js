import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { handleChatRequest } from "../controllers/ai_chats.controllers.js";

const router = Router();

// Ruta para manejar solicitudes de chat
router.post("/chat", handleChatRequest);

export default router;
