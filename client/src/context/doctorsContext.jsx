import { createContext, useContext, useState } from "react";
import {
  createDoctorRequest,
  deleteDoctorRequest,
  getDoctorsRequest,
  getOneDoctorRequest,
  updateDoctorInfoRequest,
} from "../api/doctors";

const DoctorContext = createContext();

export const useDoctors = () => {
  const context = useContext(DoctorContext);
  if (!context) throw new Error("useDoctors must be used within a DoctorProvider");
  return context;
};

export function DoctorProvider({ children }) {
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    try {
      const res = await getDoctorsRequest();
      setDoctors(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const deleteDoctor = async (id) => {
    try {
      const res = await deleteDoctorRequest(id);
      if (res.status === 204 || res.status === 200) {
        setDoctors(doctors.filter((doctor) => doctor.id !== id));
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const createDoctor = async (doctor) => {
    try {
      const res = await createDoctorRequest(doctor);
      console.log("Doctor created:", res.data);
      // Optionally add the new doctor to the state
      setDoctors((prevDoctors) => [...prevDoctors, res.data]);
    } catch (error) {
      console.error("Error creating doctor:", error);
    }
  };

  const getOneDoctor = async (id) => {
    try {
      const res = await getOneDoctorRequest(id);
      return res.data;
    } catch (error) {
      console.error("Error fetching doctor:", error);
    }
  };

  const updateDoctor = async (id, doctor) => {
    try {
      await updateDoctorInfoRequest(id, doctor);
      console.log("Doctor updated");
      // Optionally update the doctor in the state
      setDoctors((prevDoctors) =>
        prevDoctors.map((d) => (d.id === id ? { ...d, ...doctor } : d))
      );
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };

  return (
    <DoctorContext.Provider
      value={{
        doctors,
        getDoctors,
        deleteDoctor,
        createDoctor,
        getOneDoctor,
        updateDoctor,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
}
