import { useEffect, useState } from "react";
import { useAppointments } from "../../context/appointmentsContext";
import { Link } from "react-router-dom";

const AppointmentList = () => {
  const initialAppointments = [
    {
      id: 1,
      patient: "Juan Pérez",
      date: "2024-11-20",
      time: "10:00 AM",
      reason: "Dolor de cabeza recurrente",
      status: "Confirmada",
    },
    {
      id: 2,
      patient: "Maria García",
      date: "2024-11-21",
      time: "3:00 PM",
      reason: "",
      status: "Pendiente",
    },
    {
      id: 3,
      patient: "Carlos Ruiz",
      date: "2024-11-19",
      time: "9:00 AM",
      reason: "Consulta general",
      status: "Completada",
    },
    {
      id: 4,
      patient: "Ana López",
      date: "2024-11-18",
      time: "11:30 AM",
      reason: "Chequeo postoperatorio",
      status: "Cancelada",
    },
  ];

  const [, setAppointments] = useState(initialAppointments);
  const {appointments, getAppointments} = useAppointments();
  useEffect(() => {
    getAppointments();
  }, []);
  console.log(appointments)
  console.log("habla")
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    status: "",
    patient: "",
  });
  const [sortOption, setSortOption] = useState({
    date: "",
    name: "",
  });

  // Funciones para manejar filtros
  const applyFilters = () => {
    let filteredAppointments = [...initialAppointments];

    if (filters.dateFrom) {
      filteredAppointments = filteredAppointments.filter(
        (appt) => new Date(appt.date) >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      filteredAppointments = filteredAppointments.filter(
        (appt) => new Date(appt.date) <= new Date(filters.dateTo)
      );
    }

    if (filters.status) {
      filteredAppointments = filteredAppointments.filter(
        (appt) => appt.status === filters.status
      );
    }

    if (filters.patient) {
      filteredAppointments = filteredAppointments.filter((appt) =>
        appt.patient.toLowerCase().includes(filters.patient.toLowerCase())
      );
    }

    setAppointments(filteredAppointments);
  };

  // Función para aplicar el ordenamiento
  const applySort = () => {
    const sortedAppointments = [...appointments];

    if (sortOption.date === "date-asc") {
      sortedAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption.date === "date-desc") {
      sortedAppointments.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption.name === "name-asc") {
      sortedAppointments.sort((a, b) => a.patient.localeCompare(b.patient));
    } else if (sortOption.name === "name-desc") {
      sortedAppointments.sort((a, b) => b.patient.localeCompare(a.patient));
    }

    setAppointments(sortedAppointments);
  };

  // Handler para controlar la selección de checkboxes
  const handleSortChange = (category, value) => {
    const updatedSortOption = { ...sortOption, [category]: value };
    setSortOption(updatedSortOption);
    applySort(); // Aplica el ordenamiento inmediatamente
  };

  return (
    <div className="ml-5 flex">
      {/* Panel de Filtros y Ordenamiento */}
      <div className="w-1/3 bg-gray-50 p-4 rounded-md shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Filtros</h2>
        {/* Filtros */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600">Desde:</label>
          <input
            type="date"
            className="w-full border rounded-md p-2 text-sm"
            value={filters.dateFrom}
            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600">Hasta:</label>
          <input
            type="date"
            className="w-full border rounded-md p-2 text-sm"
            value={filters.dateTo}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600">Estado:</label>
          <select
            className="w-full border rounded-md p-2 text-sm"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Confirmada">Confirmada</option>
            <option value="Reprogramada">Reprogramada</option>
            <option value="Completada">Completada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600">Paciente:</label>
          <input
            type="text"
            className="w-full border rounded-md p-2 text-sm"
            placeholder="Buscar por nombre"
            value={filters.patient}
            onChange={(e) => setFilters({ ...filters, patient: e.target.value })}
          />
        </div>
        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded-md w-full text-sm hover:bg-blue-700"
        >
          Aplicar Filtros
        </button>
        <h2 className="text-lg font-semibold mt-6 mb-4 text-gray-800">Ordenar Citas</h2>
        <div className="mb-4 border-b pb-4">
          <div className="mt-2 text-sm text-gray-600">
            <p className="font-semibold mb-2">Fecha y Hora</p>
            <div className="ml-4">
              <label className="block">
                <input
                  type="checkbox"
                  checked={sortOption.date === "date-desc"}
                  onChange={() => handleSortChange("date", "date-desc")}
                  className="mr-2 mb-2"
                />
                Más recientes primero
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  checked={sortOption.date === "date-asc"}
                  onChange={() => handleSortChange("date", "date-asc")}
                  className="mr-2"
                />
                Más antiguas primero
              </label>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p className="font-semibold mb-2">Nombre del Paciente</p>
            <div className="ml-4">
              <label className="block">
                <input
                  type="checkbox"
                  checked={sortOption.name === "name-asc"}
                  onChange={() => handleSortChange("name", "name-asc")}
                  className="mr-2 mb-2"
                />
                Ascendente (A-Z)
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  checked={sortOption.name === "name-desc"}
                  onChange={() => handleSortChange("name", "name-desc")}
                  className="mr-2"
                />
                Descendente (Z-A)
              </label>
            </div>
          </div>
        </div>
      </div>
  
      {/* Lista de Citas */}
      <div className="w-3/4 ml-6 p-4">
        <h1 className="text-xl font-semibold mb-6 text-gray-800">Lista de Citas</h1>
        <ul>
          {appointments.map((appt) => (
            <li
              key={appt.id}
              className="bg-white p-4 mb-4 rounded-md shadow-sm border border-gray-200"
            >
              <p className="text-lg font-semibold text-gray-800">{appt.patient}</p>
              <p className="text-sm text-gray-600">📅 {appt.date}, {appt.time}</p>
              <p className="text-sm text-gray-600">
                Estado: <span className="font-medium text-gray-700">{appt.status}</span>
              </p>
              {appt.reason && <p className="text-sm text-gray-600">Motivo: {appt.reason}</p>}
              <Link to={`./${appt.id}/`}>
                <button
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                >
                  {appt.status === "Completada" || appt.status === "Cancelada"
                    ? "Ver detalles de la cita"
                    : "Gestionar la cita"}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
};

export default AppointmentList;
