import { createContext, useContext, useState } from "react";
import {
  createAppointmentRequest,
  deleteAppointmentRequest,
  getAppointmentsRequest,
  getAppointmentRequest,
  updateAppointmentRequest,
} from "../api/appointments";

const AppointmentContext = createContext();

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) throw new Error("useAppointments must be used within an AppointmentProvider");
  return context;
};

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    const res = await getAppointmentsRequest();
    setAppointments(res.data);
  };

  const deleteAppointment = async (id) => {
    try {
      const res = await deleteAppointmentRequest(id);
      if (res.status === 204 || res.status === 200) setAppointments(appointments.filter((appointment) => appointment.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createAppointment = async (appointment) => {
    try {
      const res = await createAppointmentRequest(appointment);
      //setDoctors((prevDoctors) => [...prevDoctors, res.data]);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAppointmentById = async (id) => {
    try {
      const res = await getAppointmentRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateAppointment = async (id, appointment) => {
    try {
      console.log(id, "update");
      await updateAppointmentRequest(id, appointment);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        getAppointments,
        deleteAppointment,
        createAppointment,
        getAppointmentById,
        updateAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}
