import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDoctors } from "../../context/doctorsContext";

const DoctorProfilePage = ({ doctor }) => {
  const { getOneDoctor } = useDoctors();
  //console.log(getOneDoctor())
  const params = useParams();
  //const doc = await getOneDoctor(params.id)
  //console.log(doc)

  const doctorData = {
    nombres: "Juan",
    apellidos: "Pérez Gómez",
    correo: "juan.perez@correo.com",
    telefono: "+1234567890",
    ubicacion: "CDMX",
    calificacion: 4.5,
    tarifa: 100,
    especialidad: "Cardiología",
    foto: "https://via.placeholder.com/150",
    certificaciones: [
      "Certificado en Cardiología Avanzada",
      "Curso de Emergencias Médicas",
    ],
    experiencia: [
      {
        titulo: "Cardiólogo Senior",
        empresa: "Hospital General",
        periodo: "2015 - Presente",
        descripcion: "Diagnóstico y tratamiento de enfermedades cardiovasculares.",
      },
      {
        titulo: "Residente de Cardiología",
        empresa: "Clínica Especializada",
        periodo: "2012 - 2015",
        descripcion: "Prácticas avanzadas en procedimientos cardiovasculares.",
      },
    ],
  };
  doctor = doctorData;  

  useEffect(() => {
    const loadDoctor = async () => {
      if (params.id) {
        const doctor = await getOneDoctor(params.id);
        console.log(doctor);
      }
    };
    loadDoctor();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full">
        {/* Header */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src={doctor.foto || "https://via.placeholder.com/150"}
            alt={`Foto de ${doctor.nombres} ${doctor.apellidos}`}
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{`${doctor.nombres} ${doctor.apellidos}`}</h1>
            <p className="text-gray-500 text-lg">{doctor.especialidad}</p>
            <p className="text-yellow-500 text-lg">{`Calificación: ${doctor.calificacion} ⭐`}</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Contacto</h2>
          <p className="text-gray-600">📧 {doctor.correo}</p>
          <p className="text-gray-600">📞 {doctor.telefono}</p>
          <p className="text-gray-600">💵 Tarifa: ${doctor.tarifa}</p>
        </div>

        {/* Location Map */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Ubicación</h2>
          <div className="w-full h-64 rounded-lg overflow-hidden">
            <iframe
              src={`https://www.google.com/maps?q=${doctor.ubicacion}&output=embed`}
              title="Mapa de ubicación"
              className="w-full h-full border-0"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Certificaciones</h2>
          <ul className="list-disc list-inside text-gray-600">
            {doctor.certificaciones.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Experiencia Laboral</h2>
          <div className="border-l-2 border-gray-300 pl-4">
            {doctor.experiencia.map((job, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-bold text-gray-700">{job.titulo}</h3>
                <p className="text-gray-600">{`${job.empresa} | ${job.periodo}`}</p>
                <p className="text-gray-600">{job.descripcion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment Button */}
        <Link
        to={`./create-appointment`}
        key={params.id}
        >
        <div className="flex justify-center">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
            Hacer una cita
          </button>
        </div>
        </Link>
        
      </div>
    </div>
  );
};

export default DoctorProfilePage;