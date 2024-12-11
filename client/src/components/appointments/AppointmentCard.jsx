import { useAppointments } from "../../context/appointmentsContext";
import { Button, ButtonLink, Card } from "../ui";

export function AppointmentCard({ appointment }) {
  //console.log(appointment, "el appointment")
  const { deleteAppointment } = useAppointments();

  return (
    <Card>
      <header className="flex justify-between">
      <div className="flex items-center gap-4">
          <img
            src={appointment.foto}
            alt={`Foto de ${appointment.nombreCompleto}`}
            className="w-16 h-16 rounded-full object-cover"
          />
          <h1 className="text-2xl font-bold">{appointment.title}</h1>
        </div>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteAppointment(appointment.id)}>Eliminar</Button>
          <ButtonLink to={`/doctorinfo`}>Editar</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{`Descripcion: ${appointment.description}`}</p>
      <p className="text-slate-300">{`Especialidad: ${appointment.especialidad}`}</p>
      <p className="text-slate-300">{`Años de experiencia: ${appointment.anosExperiencia}`}</p>
      <p className="text-slate-300">{`Distrito: ${appointment.distrito}`}</p>
      <p className="text-slate-300">
        {`Calificación: ${appointment.calificacion} ⭐`}
      </p>
      <p className="text-slate-300">{`Tarifa: ${appointment.tarifa}`}</p>
      <p>
        {`Fecha Cita: ${appointment.date &&
          new Date(appointment.date).toLocaleDateString("es", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`}
      </p>
    </Card>
  );
}