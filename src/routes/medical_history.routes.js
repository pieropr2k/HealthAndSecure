import { Router } from "express";
import {
  createMedicalHistory,
  deleteMedicalHistory,
  getMedicalHistoryById,
  getAllMedicalHistories,
  updateMedicalHistory,
} from "../controllers/medical_history.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
// import { validateSchema } from "../middlewares/validator.middleware.js";
// import { createMedicalHistorySchema } from "../schemas/medical_history.schema.js";

const router = Router();

// Obtener todos los historiales médicos
router.get("/medical_history", auth, getAllMedicalHistories);

// Crear un nuevo historial médico
// router.post("/medical_history", auth, validateSchema(createMedicalHistorySchema), createMedicalHistory);

// Obtener un historial médico por ID
router.get("/medical_history/:id", auth, getMedicalHistoryById);

// Actualizar un historial médico
router.put("/medical_history/:id", auth, updateMedicalHistory);

// Eliminar un historial médico por ID
router.delete("/medical_history/:id", auth, deleteMedicalHistory);

export default router;
