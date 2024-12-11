import React, { useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { createAppointmentRequest } from "../../api/appointments";
import { useAppointments } from "../../context/appointmentsContext";

function CreateAppointmentForm() {
  const {user} = useAuth();
  const {createAppointment} = useAppointments();

  const [consultationReason, setConsultationReason] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [errors, setErrors] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  // Función de validación
  const validateForm = () => {
    const errorMessages = {};
    if (!consultationReason) errorMessages.consultationReason = "Ingresa el motivo de la consulta";
    if (!dateTime) errorMessages.dateTime = "Selecciona una fecha y hora";
    setErrors(errorMessages);
    return Object.keys(errorMessages).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const appointment = {
        doctor_id: params.id,
        //patient_id: user.id,
        consultation_reason: consultationReason,
        description,
        date_time: dateTime,
        state: "pending",
      };
      console.log(createAppointment)
      createAppointment(appointment);
      console.log("Cita registrada:", appointment);
      navigate("/client/appointments");
      // Aquí iría la lógica para enviar la cita a la base de datos (API)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
          Registro de Cita Médica
        </h2>

        {/* Consultation Reason */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2">Motivo de la consulta</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Ingrese el motivo de la consulta"
            value={consultationReason}
            onChange={(e) => setConsultationReason(e.target.value)}
          />
          {errors.consultationReason && (
            <p className="text-red-600">{errors.consultationReason}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2">Descripción</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            placeholder="Detalles adicionales (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Date and Time */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2">Fecha y hora</label>
          <input
            type="datetime-local"
            className="w-full p-2 border border-gray-300 rounded"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
          {errors.dateTime && <p className="text-red-600">{errors.dateTime}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Registrar Cita
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateAppointmentForm;
