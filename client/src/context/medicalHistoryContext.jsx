import { createContext, useContext, useState } from "react";
import {
    createMedicalHistoryRequest,
    getMedicalHistoriesRequest,
    getMedicalHistoryRequest,
    updateMedicalHistoryRequest,
    deleteMedicalHistoryRequest
} from "../api/medicalHistory";

const MedicalHistoryContext = createContext();

export const useMedicalHistory = () => {
  const context = useContext(MedicalHistoryContext);
  if (!context) throw new Error("useMedicalHistory must be used within a MedicalHistoryProvider");
  return context;
};

export function MedicalHistoryProvider({ children }) {
  const [medicalHistories, setMedicalHistories] = useState([]);

  const getAllMedicalHistories = async () => {
    try {
      const res = await getMedicalHistoriesRequest();
      setMedicalHistories(res.data);
    } catch (error) {
      console.error("Error fetching medical histories:", error);
    }
  };

  const deleteMedicalHistory = async (id) => {
    try {
      const res = await deleteMedicalHistoryRequest(id);
      if (res.status === 204 || res.status === 200) {
        setMedicalHistories(
          medicalHistories.filter((history) => history.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting medical history:", error);
    }
  };

  const createMedicalHistory = async (history) => {
    try {
      const res = await createMedicalHistoryRequest(history);
      setMedicalHistories((prevHistories) => [...prevHistories, res.data]);
    } catch (error) {
      console.error("Error creating medical history:", error);
    }
  };

  const getMedicalHistoryById = async (id) => {
    try {
      const res = await getMedicalHistoryRequest(id);
      return res.data;
    } catch (error) {
      console.error("Error fetching medical history by ID:", error);
    }
  };

  const updateMedicalHistory = async (id, history) => {
    try {
      await updateMedicalHistoryRequest(id, history);
      // Optionally, update state if needed after updating a medical history
    } catch (error) {
      console.error("Error updating medical history:", error);
    }
  };

  return (
    <MedicalHistoryContext.Provider
      value={{
        medicalHistories,
        getAllMedicalHistories,
        deleteMedicalHistory,
        createMedicalHistory,
        getMedicalHistoryById,
        updateMedicalHistory,
      }}
    >
      {children}
    </MedicalHistoryContext.Provider>
  );
}
