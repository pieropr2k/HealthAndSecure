import React, { useEffect, useState } from "react";
import { useAppointments } from "../../context/appointmentsContext";
import { useParams } from "react-router-dom";

// Simulación de datos de un paciente y su historial médico (estos datos normalmente provendrían de una API)
const patient = {
  id: 1,
  name: "Carlos Rodríguez",
  documentType: "DNI",
  documentNumber: "12345678",
  email: "carlos@email.com",
  phone: "987654321",
  birthday: "1990-03-15",
  gender: "Masculino",
  address: "Av. Siempre Viva 123",
};

const medicalHistory = [
  {
    diagnosis: "Hipertensión",
    medication: "Losartan",
    medicalNotes: "Controlado con medicamento, seguimiento en 6 meses.",
  },
  {
    diagnosis: "Diabetes tipo 2",
    medication: "Metformina",
    medicalNotes: "Monitoreo constante de los niveles de azúcar.",
  },
];

function AppointmentWithAI() {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [appointmentInfo, setAppointmentInfo] = useState(null);
  const params = useParams();
  const { getAppointmentById, updateAppointment } = useAppointments();


  useEffect(() => {
    const getRecipe = async () => {
      try {
        console.log(params.id)
        const appointmentInfo = await getAppointmentById(params.id);
        setAppointmentInfo(appointmentInfo);
        console.log(appointmentInfo);
      } catch (error) {
        console.log(error)
      }
    };
    getRecipe();
  }, [])
  console.log(appointmentInfo, "print");


  return (
    <div className="flex bg-gray-100">
      {/* Left Section: Información del paciente y cita */}
      <div className="w-1/3 bg-white p-6 shadow-lg rounded-l-lg">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
          Información del Paciente
        </h2>

        {medicalHistory && appointmentInfo ? <>
        {/* Información General del Paciente */}
        <div className="mb-4">
          <div className="text-gray-700 mb-1"><strong>Nombre:</strong> {appointmentInfo.patientName}</div>
          <div className="text-gray-700 mb-1"><strong>Motivo:</strong> {appointmentInfo.
            reason}</div>
          <div className="text-gray-700 mb-1"><strong>Género:</strong> {appointmentInfo.
            patientGender}</div>
          <div className="text-gray-700 mb-1"><strong>Número de Documento:</strong> {
            `${appointmentInfo.patientId}`}</div>
          <div className="text-gray-700 mb-1"><strong>Dirección:</strong> {patient.address}</div>
          <div className="text-gray-700 mb-1"><strong>Email:</strong> {patient.email}</div>
          <div className="text-gray-700 mb-1"><strong>Teléfono:</strong> {patient.phone}</div>
          <div className="text-gray-700 mb-1"><strong>Fecha de Nacimiento:</strong> {patient.birthday}</div>

        </div>

        {/* Historial Médico */}
        <h3 className="text-xl font-semibold text-blue-900 mt-6 mb-4">Historial Médico del Paciente</h3>
        <div className="space-y-4">
          {medicalHistory.map((record, index) => (
            <div
              key={index}
              className={`p-4 bg-gray-200 rounded-lg cursor-pointer ${selectedRecord === index ? "bg-blue-100" : ""
                }`}
              onClick={() => setSelectedRecord(index)}
            >
              <div className="font-semibold">{record.diagnosis}</div>
              <div className="text-gray-700">Medicamento: {record.medication}</div>
              <div className="text-gray-500 text-sm">Notas: {record.medicalNotes}</div>
            </div>
          ))}
        </div>
        </> : <p>Loading...</p>}

        {/* Botón Analizar Registro */}
        <button
          className="w-full mt-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => alert("Analizando Registro...")}
        >
          Analizar Registro
        </button>
      </div>

      {/* Right Section: Chat */}
      <div className="w-2/3 bg-white p-6 shadow-lg rounded-r-lg flex flex-col">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Chat con IA</h2>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto mb-4 p-4 border border-gray-300 rounded-lg">
          <div className="space-y-4">
            <div className="flex justify-start">
              <div className="bg-blue-200 p-2 rounded-lg max-w-[75%]">
                <p className="text-sm">Hola Dr. ¿Cómo puedo ayudar con este paciente?</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-green-200 p-2 rounded-lg max-w-[75%]">
                <p className="text-sm">Estoy revisando su historial médico.</p>
              </div>
            </div>
            {/* Aquí podrían agregarse más mensajes de chat */}
          </div>
        </div>

        {/* Input para enviar mensaje */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={() => alert("Enviando mensaje...")}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentWithAI;