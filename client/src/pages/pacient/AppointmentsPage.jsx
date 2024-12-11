import React, { useEffect, useState } from "react";
import { useAppointments } from "../../context/appointmentsContext";

const AppointmentsList = () => {
  const {appointments, getAppointments} = useAppointments();

  const appointmentsList = [
    {
      id: 1,
      date: "2024-12-01T10:00:00",
      doctor: {
        fullName: "Dr. María López",
        specialty: "Dermatology",
      },
      state: "pending",
      consultationReason: "Mole check",
    },
    {
      id: 2,
      date: "2024-11-10T15:00:00",
      doctor: {
        fullName: "Dr. Juan Pérez",
        specialty: "Cardiology",
      },
      state: "completed",
      consultationReason: "Blood pressure control",
    },
    {
      id: 3,
      date: "2024-11-05T10:00:00",
      doctor: {
        fullName: "Dr. Ana García",
        specialty: "Gynecology",
      },
      state: "canceled",
      consultationReason: "Prenatal consultation",
    },
  ];

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  
  useEffect(() => {
    getAppointments();
  }, []);
  console.log(appointments)

  const futureAppointments = appointments.filter(
    (appointment) =>
      appointment.state === "pending" ||
      appointment.state === "confirmed" ||
      appointment.state === "in progress"
  );
  const pastAppointments = appointments.filter(
    (appointment) =>
      appointment.state === "completed" ||
      appointment.state === "canceled" ||
      appointment.state === "no show"
  );

  const formatDateTime = (date) =>
    new Date(date).toLocaleDateString("en", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleCancel = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Tus Citas</h1>

        {/* Future Appointments */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Futuras Citas</h2>
          {futureAppointments.length > 0 ? (
            <ul className="space-y-4">
              {futureAppointments.map((appointment) => (
                <li
                  key={appointment.id}
                  className="p-4 border rounded-lg shadow-sm bg-blue-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-lg font-bold">
                        {appointment.doctor.fullName}
                      </p>
                      <p className="text-gray-600">{appointment.doctor.specialty}</p>
                      <p className="text-gray-500">{formatDateTime(appointment.date)}</p>
                      <p className="text-gray-700">
                        Reason: {appointment.consultationReason}
                      </p>
                      <p
                        className={`text-sm font-semibold ${
                          appointment.state === "scheduled"
                            ? "text-blue-600"
                            : "text-red-600"
                        }`}
                      >
                        Estado: {appointment.state}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReschedule(appointment)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Reagendar
                      </button>
                      <button
                        onClick={() => handleCancel(appointment)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No tienes citas futuras.</p>
          )}
        </div>

        {/* Past Appointments */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Citas Pasadas</h2>
          {pastAppointments.length > 0 ? (
            <ul className="space-y-4">
              {pastAppointments.map((appointment) => (
                <li
                  key={appointment.id}
                  className="p-4 border rounded-lg shadow-sm bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-lg font-bold">
                        {appointment.doctor.fullName}
                      </p>
                      <p className="text-gray-600">{`Especialidad: ${appointment.doctor.specialty}`}</p>
                      <p className="text-gray-500">{formatDateTime(appointment.date)}</p>
                      <p className="text-gray-700">
                        Razón: {appointment.consultationReason}
                      </p>
                      <p className="text-green-600 font-semibold">Estado: {appointment.state}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No haz tenido ninguna cita hasta ahora.</p>
          )}
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Cancel Appointment</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to cancel your appointment with{" "}
              <strong>{selectedAppointment.doctor.fullName}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                No
              </button>
              <button
                onClick={() => {
                  // Action to cancel appointment
                  setShowCancelModal(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Reschedule Appointment</h3>
            <p className="text-gray-700 mb-6">
              Do you want to reschedule your appointment with{" "}
              <strong>{selectedAppointment.doctor.fullName}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                No
              </button>
              <button
                onClick={() => {
                  // Action to reschedule appointment
                  setShowRescheduleModal(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Yes, Reschedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;
