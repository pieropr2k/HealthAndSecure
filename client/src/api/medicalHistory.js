import axios from "./axios";

// Obtener todos los historiales médicos
export const getMedicalHistoriesRequest = async () => axios.get("/medical_history");

// Crear un nuevo historial médico
export const createMedicalHistoryRequest = async (medicalHistory) => 
  axios.post("/medical_history", medicalHistory);

// Actualizar un historial médico existente
export const updateMedicalHistoryRequest = async (id, medicalHistory) =>
  axios.put(`/medical_history/${id}`, medicalHistory);

// Eliminar un historial médico
export const deleteMedicalHistoryRequest = async (id) =>
  axios.delete(`/medical_history/${id}`);

// Obtener un historial médico por ID
export const getMedicalHistoryRequest = async (id) =>
  axios.get(`/medical_history/${id}`);
