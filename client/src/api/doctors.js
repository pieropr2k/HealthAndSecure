import axios from "./axios";

export const getDoctorsRequest = async () => axios.get("/doctors");

export const createDoctorRequest = async (doctor) => axios.post("/doctors", doctor);

export const updateDoctorInfoRequest = async (id, doctor) =>
  axios.put(`/doctors/${id}`, doctor);

export const deleteDoctorRequest = async (id) => axios.delete(`/doctors/${id}`);

export const getOneDoctorRequest = async (id) => axios.get(`/doctors/${id}`);
