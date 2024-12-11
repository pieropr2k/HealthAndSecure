import { Router } from "express";
import {
  createAppointment,
  deleteAppointment,
  getAppointmentById,
  getAllAppointments,
  updateAppointment,
} from "../controllers/appointments.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createAppointmentSchema } from "../schemas/appointment.schema.js";

const router = Router();

// Obtener todas las citas - Los doctores pueden ver todas sus citas, los pacientes solo las suyas
router.get("/appointments", auth, getAllAppointments);

// Crear una cita - Solo los pacientes pueden crear citas
router.post("/appointments", auth, createAppointment);
//router.post("/appointments", auth, validateSchema(createAppointmentSchema), createAppointment);

// Obtener una cita por ID - Los doctores y pacientes solo pueden ver sus propias citas
router.get("/appointments/:id", auth, getAppointmentById);

// Actualizar una cita - Los doctores solo pueden actualizar las citas de sus pacientes, los pacientes solo pueden actualizar las suyas
router.put("/appointments/:id", auth, updateAppointment);

// Eliminar una cita - Los doctores solo pueden eliminar las citas de sus pacientes, los pacientes solo pueden eliminar las suyas
router.delete("/appointments/:id", auth, deleteAppointment);

export default router;
