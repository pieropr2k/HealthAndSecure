import React, { useEffect, useState } from "react";
import { useMedicalHistory } from "../../context/medicalHistoryContext";

// Simulación de datos de registros médicos (estos normalmente provendrían de una base de datos o API)
const medicalRecords = [
  {
    id: 1,
    patientName: "Carlos Rodríguez",
    diagnosis: "Hipertensión",
    date: "2024-11-01",
    patientId: 1,
    doctorId: 101,
  },
  {
    id: 2,
    patientName: "Ana García",
    diagnosis: "Diabetes tipo 2",
    date: "2024-11-10",
    patientId: 2,
    doctorId: 101,
  },
  {
    id: 3,
    patientName: "Luis Pérez",
    diagnosis: "Asma",
    date: "2024-11-15",
    patientId: 3,
    doctorId: 101,
  },
];

function MedicalRecords() {
  const [selectedRecord, setSelectedRecord] = useState(null);

  //const {appointments, getAppointments} = useAppointments();
  const { medicalHistories, getAllMedicalHistories } = useMedicalHistory();
  useEffect(() => {
    getAllMedicalHistories();
    //getAppointments();
  }, []);

  //console.log(medicalHistories);

  const handleViewRecord = (recordId) => {
    // Simula abrir los detalles del registro médico
    setSelectedRecord(medicalHistories.find((record) => record.id === recordId));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Título de la Página */}
      <div className="bg-blue-600 p-6">
        <h2 className="text-3xl text-white font-bold text-center">Registros Médicos</h2>
      </div>

      {/* Lista de Registros Médicos */}
      <div className="flex flex-col items-center p-6">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-blue-900 mb-6">Registros de Pacientes</h3>

          {/* Tabla de Registros Médicos */}
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left text-gray-700">Paciente</th>
                <th className="py-2 px-4 text-left text-gray-700">Diagnóstico</th>
                <th className="py-2 px-4 text-left text-gray-700">Fecha</th>
                <th className="py-2 px-4 text-left text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                //medicalRecords.map((record) => (
                medicalHistories.map((record) => (
                  <tr key={record.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{record.patient}</td>
                    <td className="py-3 px-4">{record.diagnosis}</td>
                    <td className="py-3 px-4">{record.date}</td>
                    <td className="py-3 px-4 text-blue-600 cursor-pointer">
                      <button
                        onClick={() => handleViewRecord(record.id)}
                        className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700"
                      >
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detalles del Registro Seleccionado */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-1/2 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Detalles del Registro</h3>
            <div className="space-y-4">
              <div>
                <strong>Paciente:</strong> {selectedRecord.patient}
              </div>
              <div>
                <strong>Diagnóstico:</strong> {selectedRecord.diagnosis}
              </div>
              <div>
                <strong>Fecha:</strong> {selectedRecord.date}
              </div>
              <div>
                <strong>Notas Médicas:</strong>
                <ul className="mt-2 space-y-2">
                  {
                    selectedRecord.notes 
                  ? selectedRecord.notes.map((item, index) => (
                    <li key={index} className="flex justify-between items-center bg-gray-200 p-2 rounded">
                      {item}
                    </li>
                  ))
                  : null
                  }
                </ul>

              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedRecord(null)}
                className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MedicalRecords;
