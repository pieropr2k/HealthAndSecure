import { useEffect } from "react";
import { useAppointments } from "../context/appointmentsContext.jsx";
import { AppointmentCard } from "../components/appointments/AppointmentCard.jsx";
import { ImFileEmpty } from "react-icons/im";

const AppointmentsPage = () => {
  const { appointments, getAppointments } = useAppointments();

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <>
      {appointments.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No hay pacientes aun, agrega un nuevo paciente
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {appointments.map((appointment) => (
          <AppointmentCard appointment={appointment} key={appointment.id} />
        ))}
      </div>
    </>
  );
}
