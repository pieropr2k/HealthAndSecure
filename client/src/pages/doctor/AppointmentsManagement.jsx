import React, { useState } from "react";
import { useAppointments } from "../../context/appointmentsContext";

const exampleAppointments = [
  {
    id: 1,
    patient: "John Doe",
    date: "2024-11-20",
    time: "10:30 AM",
    reason: "General Check-up",
    status: "Scheduled",
  },
  {
    id: 2,
    patient: "Maria Smith",
    date: "2024-11-21",
    time: "2:00 PM",
    reason: "Headache Consultation",
    status: "Scheduled",
  },
];

export default function AppointmentsManagement() {
  const [appointments, setAppointments] = useState(exampleAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  

  const updateAppointmentStatus = (id, status) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, status: status } : appointment
      )
    );
  };

  const rescheduleAppointment = (id, newDate, newTime) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? { ...appointment, date: newDate, time: newTime }
          : appointment
      )
    );
    setShowRescheduleModal(false);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Appointment Management</h1>
      <div className="grid grid-cols-1 gap-6">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div>
              <p className="text-gray-700 font-semibold">
                Patient: {appointment.patient}
              </p>
              <p className="text-gray-500">Reason: {appointment.reason}</p>
              <p className="text-gray-500">
                Date: {appointment.date} - Time: {appointment.time}
              </p>
              <p
                className={`text-sm font-bold ${
                  appointment.status === "Scheduled"
                    ? "text-blue-500"
                    : appointment.status === "Completed"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Status: {appointment.status}
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              {/* Button to mark as completed */}
              <button
                onClick={() => {
                  setSelectedAppointment(appointment);
                  setNewStatus("Completed");
                  updateAppointmentStatus(appointment.id, "Completed");
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Complete
              </button>
              <button
                onClick={() => {
                  setSelectedAppointment(appointment);
                  setNewStatus("Canceled");
                  updateAppointmentStatus(appointment.id, "Canceled");
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setSelectedAppointment(appointment);
                  setShowRescheduleModal(true);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Reschedule
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedAppointment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Reschedule Appointment</h2>
            <p className="text-gray-700">
              Patient: {selectedAppointment.patient}
            </p>
            <label className="block mt-4">
              New Date:
              <input
                type="date"
                className="w-full border-gray-300 rounded-md p-2 mt-1"
                onChange={(e) =>
                  rescheduleAppointment(
                    selectedAppointment.id,
                    e.target.value,
                    selectedAppointment.time
                  )
                }
              />
            </label>
            <label className="block mt-4">
              New Time:
              <input
                type="time"
                className="w-full border-gray-300 rounded-md p-2 mt-1"
                onChange={(e) =>
                  rescheduleAppointment(
                    selectedAppointment.id,
                    selectedAppointment.date,
                    e.target.value
                  )
                }
              />
            </label>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  rescheduleAppointment(
                    selectedAppointment.id,
                    selectedAppointment.date,
                    selectedAppointment.time
                  )
                }
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
