import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import { useMedicalHistory } from "../../context/medicalHistoryContext";

const medicalHistoryData = [
  {
    id: 1,
    date: "2024-08-15",
    doctor: { nombreCompleto: "Dr. Juan Pérez", especialidad: "Cardiólogo" },
    diagnostico: "Hipertensión",
    estado: "Completada",
    detalles: {
      descripcion: "La presión arterial del paciente ha estado elevada durante las últimas semanas, lo que sugiere hipertensión crónica.",
      tratamiento: [
        "Losartan 50 mg, 1 tableta diaria durante 2 semanas.",
        "Controlar la presión arterial cada 3 días."
      ],
      notas: [
        "Paciente debe evitar el consumo de alcohol.",
        "El paciente está bajo observación para ver respuesta al tratamiento."
      ]
    }
  },
  {
    id: 2,
    date: "2024-09-10",
    doctor: { nombreCompleto: "Dr. Ana González", especialidad: "Neuróloga" },
    diagnostico: "Migraña crónica",
    estado: "Pendiente de Revisión",
    detalles: {
      descripcion: "Paciente presenta episodios recurrentes de migraña.",
      tratamiento: [
        "Ibuprofeno 400 mg cada 8 horas durante 5 días.",
        "Evitar luces brillantes y estrés."
      ],
      notas: [
        "Requiere seguimiento cada mes.",
        "Evitar el uso prolongado de pantallas."
      ]
    }
  }
];

const MedicalHistoryPage = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filterDate, setFilterDate] = useState("6months");
  const [filterDiagnosis, setFilterDiagnosis] = useState("");

  const { medicalHistories, getAllMedicalHistories } = useMedicalHistory();
  useEffect(() => {
    getAllMedicalHistories();
    //getAppointments();
  }, []);
  console.log(medicalHistories);

  const formatDate = (date) => new Date(date).toLocaleDateString("es", { year: "numeric", month: "long", day: "numeric" });

  const filteredData = medicalHistories.filter((appointment) => {
  //const filteredData = medicalHistoryData.filter((appointment) => {
    const matchDate = filterDate === "6months"
      ? new Date(appointment.date) > new Date(new Date().setMonth(new Date().getMonth() - 6))
      : true;

    const matchDiagnosis = appointment.diagnosis.toLowerCase().includes(filterDiagnosis.toLowerCase());

    return matchDate && matchDiagnosis;
  });

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  const handleDownloadHistory = () => {
    // Crear una nueva instancia de jsPDF
    const doc = new jsPDF();
  
    // Establecer el contenido del PDF
    const historyText = filteredData.map((appointment, index) => {
      return `
  Cita: ${formatDate(appointment.date)}
  Doctor: ${appointment.doctor.name} - ${appointment.doctor.specialty}
  Diagnóstico: ${appointment.diagnosis}
  Estado: ${"appointment.estado"}
  ----------------------------------
      `;
    }).join("\n");
  
    // Agregar el texto al PDF
    doc.text(historyText, 10, 10);
  
    // Descargar el archivo PDF
    doc.save("historial_medico.pdf");
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Historial Médico</h1>

        {/* Filtros de búsqueda */}
        <div className="mb-6">
          <div className="flex gap-6 justify-between mb-4">
            <div>
              <label className="block font-semibold mb-2">Filtrar por Fecha</label>
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="6months">Últimos 6 meses</option>
                <option value="1year">Último año</option>
                <option value="custom">Personalizado</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2">Filtrar por Diagnóstico</label>
              <input
                type="text"
                value={filterDiagnosis}
                onChange={(e) => setFilterDiagnosis(e.target.value)}
                placeholder="Ej. Hipertensión"
                className="px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
          <button
            onClick={handleDownloadHistory}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Descargar Historial Médico
          </button>
        </div>

        {
          /*<p className={`text-sm font-semibold ${appointment.estado === "Pendiente de Revisión" ? "text-yellow-500" : "text-green-600"}`}>
                    Estado: {appointment.estado}
                  </p> */
        }
        {/* Listado de Citas */}
        <ul className="space-y-4">
          {filteredData.map((appointment) => (
            <li key={appointment.id} className="p-4 border rounded-lg shadow-sm bg-blue-50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-bold">{formatDate(appointment.date)}</p>
                  <p className="text-gray-600">{appointment.doctor.name} - {appointment.doctor.specialty}</p>
                  <p className="text-gray-700">Diagnóstico: {appointment.diagnosis}</p>
                  
                </div>
                <button
                  onClick={() => handleViewDetails(appointment)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Ver más detalles
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal de Detalles */}
      {showDetailsModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Detalles de la Cita</h3>
            <p className="text-gray-700 mb-4">
              <strong>Diagnóstico:</strong> {selectedAppointment.diagnosis}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Tratamiento recomendado:</strong> {selectedAppointment.treatment}
       {
        /*
        <p className="text-gray-700 mb-4">
              <strong>Descripción:</strong> {"selectedAppointment.detalles.descripcion"}
            </p>

              <ul className="list-disc pl-6">
                {
                
                selectedAppointment.treatment.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
                }
              </ul>
      */
              }
            </p>
            <div className="text-gray-700 mb-4">
              <strong>Notas médicas:</strong>
              <ul className="list-disc pl-6">
                {selectedAppointment.notes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalHistoryPage;
