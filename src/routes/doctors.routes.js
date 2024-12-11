import { Router } from "express";
import {
  createDoctor,
  deleteDoctor,
  getDoctorById,
  getAllDoctors,
  updateDoctor,
} from "../controllers/doctors.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
//import { validateSchema } from "../middlewares/validator.middleware.js";
//import { createDoctorSchema } from "../schemas/doctor.schema.js";

const router = Router();

// Obtener todos los doctores
router.get("/doctors", getAllDoctors);

// Crear un nuevo doctor
//router.post("/doctors", auth, validateSchema(createDoctorSchema), createDoctor);

// Obtener un doctor por ID
router.get("/doctors/:id", getDoctorById);

// Actualizar información de un doctor
router.put("/doctors/:id", auth, updateDoctor);

// Eliminar un doctor por ID
router.delete("/doctors/:id", auth, deleteDoctor);

export default router;
