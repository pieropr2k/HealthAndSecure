import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppointments } from "../../context/appointmentsContext";

function AppointmentDetailsGestor() {
  const params = useParams();
  const navigate = useNavigate();


  const { getAppointmentById, updateAppointment } = useAppointments();

  console.log(params.id)
  // Separando los campos de appointment
  const [date, setDate] = useState("20 de noviembre, 10:00 AM");
  const [patientId, setPatientId] = useState("78485959");
  const [patientName, setPatientName] = useState("Juan Pérez");
  const [patientAge, setPatientAge] = useState(34);
  const [patientGender, setPatientGender] = useState("Masculino");
  const [patientContact, setPatientContact] = useState("939393984");
  const [reason, setReason] = useState("Dolor de cabeza recurrente");
  const [price, setPrice] = useState("50 soles");
  const [status, setStatus] = useState("pending"); // Estados

  const [notes, setNotes] = useState([]);
  // Separando los campos del formulario
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const loadAppointment = async () => {
      if (params.id) {
        const appointmentData = await getAppointmentById(params.id);
        console.log(appointmentData);

        setDate(appointmentData.date);
        setPatientId(appointmentData.patientId)
        setPatientName(appointmentData.patientName);
        setPatientAge(appointmentData.patientAge);
        setPatientGender(appointmentData.patientGender);
        setPatientContact(appointmentData.patientContact);
        setReason(appointmentData.reason);
        setStatus(appointmentData.state);
        if (appointmentData.state === 'completed' || appointmentData.state === 'in progress') {
          const report = appointmentData.medical_report;
          setDiagnosis(report.diagnosis);
          setTreatment(report.treatment);
          //console.log(report.notes) 

          setNotes(report.notes ? report.notes : []);
        }

      }
    };
    loadAppointment();
  }, []);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const handleAddNote = () => {
    if (newNote) {
      setNotes((prev) => [...prev, newNote]);
      setNewNote("");
    }
  };

  const handleDeleteNote = (itemToDelete) => {
    const index = notes.indexOf(itemToDelete); // Encuentra el índice del elemento
    if (index !== -1) {
      const updatedItems = [...notes]; // Crea una copia del arreglo
      updatedItems.splice(index, 1); // Elimina el elemento en ese índice
      setNotes(updatedItems); // Actualiza el estado
    }
  };

  const renderForm = () => {
    if (status === "no show") {
      return (
        <p className="text-gray-500 mt-6">
          No hay historial médico porque el paciente no asistió.
        </p>
      );
    }

    if (status === "canceled") {
      return (
        <div className="mt-6">
          <label className="block font-semibold mb-2">Razón de la Cancelación:</label>
          <textarea
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
      );
    }

    if (status === "in progress" || status === "completed") {
      return (
        <div className="mt-6">
          {/* Diagnóstico */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Diagnóstico:</label>
            <input
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full p-3 border rounded-md text-sm text-gray-800"
            />
          </div>

          {/* Tratamiento */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tratamiento:</label>
            <input
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
              className="w-full p-3 border rounded-md text-sm text-gray-800"
            />
          </div>

          {/* Notas Médicas */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Notas Médicas:</label>
            <ul className="list-disc text-sm text-gray-700 mb-3">
              {
                notes.map((note, index) => (
                  <li key={index} className="flex justify-between items-center bg-gray-200 my-2 p-2 rounded">
                    {note}
                    <button
                      type="button"
                      onClick={() => handleDeleteNote(note)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))
              }
            </ul>

            {/* Nueva nota */}
            <div className="flex items-center gap-3">
              <input
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full p-3 border rounded-md text-sm text-gray-800"
              />
              <button
                onClick={handleAddNote}
                className="px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                +
              </button>
            </div>
          </div>
        </div>
      );

    }

    return (
      <p className="text-gray-500 mt-6">
        Para que puedas hacer el formulario de Diagnóstico, cambia el estado de la cita a "En Proceso" o "Completado" por favor.
      </p>
    );
  };

  const registerAppointmentInfo = () => {
    const preDateJson = {
      client_id: params.id,
      date,
      state: status
    };
    const onDateJson = {
      client_id: params.id,
      patient_id: patientId,
      date,
      state: status,
      report: {
        diagnosis,
        treatment,
        notes
      },
    };
    const canceledJson = {
      client_id: params.id,
      date,
      state: status,
      report: {
        canceled_reason: cancelReason,
      },
    };

    console.log(updateAppointment)
    if (status === 'canceled') {
      updateAppointment(params.id, canceledJson);
      console.log(canceledJson);
    } else if (status === 'in progress' || status === 'completed') {
      updateAppointment(params.id, onDateJson);
      console.log(onDateJson);
    } else {
      console.log(preDateJson);
    }
    //navigate('/doctor/medical-records');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-4">
      {/* Botón Reprogramar Cita */}
      <h1 className="text-xl font-semibold mb-4 text-gray-800">Detalles de la Cita</h1>
      <p className="text-sm text-gray-600 mb-2"><strong className="mr-1">Nota:</strong>Si es que quieres puedes:</p>
      <Link to={`./with-ai`}>
        <button
          className={`px-4 mb-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm`}
        >
          Analizar la cita con nuestra IA
        </button>
      </Link>

      {/* Información de la Cita */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">📅 <strong>Cita:</strong> {date}</p>
        <p className="text-sm text-gray-600 mb-2"><strong>Paciente:</strong> {patientName}</p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Edad:</strong> {patientAge} años | <strong>Género:</strong> {patientGender} | <strong>Contacto:</strong> {patientContact}
        </p>
        <p className="text-sm text-gray-600 mb-2"><strong>Motivo:</strong> {reason}</p>
        <p className="text-sm text-gray-600 mb-4"><strong>Precio:</strong> {price}</p>

        {/* Enlace al historial médico */}
        <Link to="/medical-history" className="text-blue-600 hover:underline text-sm font-semibold">
          [Ver historial completo]
        </Link>
      </div>

      {/* Opciones de estado */}
      <div className="mt-6 mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Opciones:</label>
        <select
          className="p-2 border rounded-md w-full mb-4 text-sm"
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="pending">Pendiente</option>
          <option value="confirmed">Confirmada</option>
          <option value="reprogramaded">Reprogramada</option>
          <option value="in progress">En Proceso</option>
          <option value="completed">Completada</option>
          <option value="canceled">Cancelada</option>
          <option value="no show">No Asistió</option>
        </select>

        {/* Botón Reprogramar Cita */}
        <button
          onClick={() => alert("Redirigir a reprogramar")}
          className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm ${status === "Cancelada" ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={status === "Cancelada"}
        >
          Reprogramar Cita
        </button>
      </div>

      {/* Formulario */}
      <div className="mt-5">
        <label className="block text-xl font-semibold text-gray-700 mb-2">Formulario de Nuevo Registro Medico:</label>
        {renderForm()}
      </div>

      {/* Registrar en historial */}

      <Link to="/doctor/medical-records" className="hover:underline">

        <button
          onClick={registerAppointmentInfo}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          Registrar en el historial
        </button>
      </Link>
    </div>
  );

}

export default AppointmentDetailsGestor;
