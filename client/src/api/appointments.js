import axios from "./axios";

export const getAppointmentsRequest = async () => axios.get("/appointments");

export const createAppointmentRequest = async (appointment) => axios.post("/appointments", appointment);

export const updateAppointmentRequest = async (id, appointment) =>
  axios.put(`/appointments/${id}`, appointment);

export const deleteAppointmentRequest = async (id) => axios.delete(`/appointments/${id}`);

export const getAppointmentRequest = async (id) => axios.get(`/appointments/${id}`);
