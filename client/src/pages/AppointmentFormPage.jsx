import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useAppointments } from "../context/appointmentsContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export function AppointmentFormPage() {
  const { createAppointment, getAppointment, updateAppointment } = useAppointments();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateAppointment(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        createAppointment({
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      }

      navigate("/appointments");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    const loadAppointment = async () => {
      if (params.id) {
        const appointment = await getAppointment(params.id);
        setValue("title", appointment.title);
        setValue("description", appointment.description);
        setValue(
          "date",
          appointment.date ? dayjs(appointment.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("completed", appointment.completed);
      }
    };
    loadAppointment();
  }, []);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Paciente</Label>
        <Input
          type="text"
          name="title"
          placeholder="Paciente"
          {...register("title")}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">Por favor ingresa el paciente.</p>
        )}

        <Label htmlFor="description">Descripcion</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Descripcion"
          {...register("description")}
        ></Textarea>

        <Label htmlFor="date">Cita</Label>
        <Input type="date" name="date" {...register("date")} />
        <Button>Guardar</Button>
      </form>
    </Card>
  );
}
