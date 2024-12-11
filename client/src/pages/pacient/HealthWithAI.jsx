import { useState } from "react";

function HealthWithAI() {
  const [feelings, setFeelings] = useState("");
  const [medicalInfo, setMedicalInfo] = useState({
    conditions: "Tuberculosis",
    allergies: "Ninguna",
    recentMedications: "Ninguna",
    surgeries: "Ninguna",
  });

  const handleRegister = () => {
    alert("Información registrada con éxito.");
  };

  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Tu navegador no soporta el reconocimiento de voz.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "es-ES"; // Configurado para español
    recognition.interimResults = false;

    recognition.onstart = () => {
      alert("Comienza a hablar...");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setFeelings(transcript);
    };

    recognition.onerror = (event) => {
      alert(`Error en el reconocimiento de voz: ${event.error}`);
    };

    recognition.start();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Formulario Médico</h2>

        {/* Formulario */}
        <div className="mb-6">
          <label htmlFor="feelings" className="block text-sm font-medium text-gray-700 mb-2">
            Explícame cómo te sientes:
          </label>
          <div className="relative">
            <textarea
              id="feelings"
              value={feelings}
              onChange={(e) => setFeelings(e.target.value)}
              placeholder="Escribe aquí tus síntomas o emociones..."
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            <button
              onClick={handleVoiceInput}
              className="absolute right-3 top-3 bg-blue-600 text-white px-3 py-1 rounded-md text-sm shadow-md hover:bg-blue-700 transition"
            >
              🎙️
            </button>
          </div>
        </div>

        {/* Información basada en los sentimientos */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Información Relacionada:</h3>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Condiciones Médicas:</span> {medicalInfo.conditions}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Alergias:</span> {medicalInfo.allergies}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Medicinas Recientes:</span> {medicalInfo.recentMedications}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Cirugías:</span> {medicalInfo.surgeries}
          </p>
        </div>

        {/* Botón de registro */}
        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white text-sm font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Registrar
        </button>
      </div>
    </div>
  );
}

export default HealthWithAI;
