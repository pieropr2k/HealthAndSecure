import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/authContext";
import { ProtectedRoute } from "./routes";

//import { ClientLayout } from "./layouts/ClientLayout";
//import { DoctorLayout } from "./layouts/DoctorLayout";

import AppointmentsPage from "./pages/pacient/AppointmentsPage";
import MedicalHistoryPage from "./pages/pacient/MedicalHistoryPage";
import DoctorsListPage from "./pages/pacient/DoctorsListPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Register from "./pages/RegisterPage";
import DoctorLayout from "./DoctorLayout";
import ClientLayout from "./ClientLayout";
import AppointmentsManagement from "./pages/doctor/AppointmentsManagement";
import AppointmentsList from "./pages/doctor/AppointmentsList";
import DoctorProfilePage from "./pages/pacient/DoctorProfilePage";
import PacientRegisterForm from "./pages/PacientRegisterPage";
import { DoctorProvider } from "./context/doctorsContext";
import CreateAppointmentForm from "./pages/pacient/CreateAppointmentForm";
import { AppointmentProvider } from "./context/appointmentsContext";
import AppointmentDetailsGestor from "./pages/doctor/AppointmentDetailsGestor";
import HealthWithAI from "./pages/pacient/HealthWithAI";
import AppointmentWithAI from "./pages/doctor/AppointmentWithAI";
import MedicalRecords from "./pages/doctor/MedicalRecords";
import { MedicalHistoryProvider } from "./context/medicalHistoryContext";

function App() {
  //<DoctorProvider>

  return (
    <AuthProvider>
      <DoctorProvider>
        <MedicalHistoryProvider>
          <AppointmentProvider>
            <BrowserRouter>
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register-patient" element={<PacientRegisterForm />} />

                {/* Rutas para todos excepto doctores */}
                <Route element={<ProtectedRoute excludedRole={"doctor"} />}>
                  <Route path="/" element={<ClientLayout />}>
                    <Route path="appointments" element={<AppointmentsPage />} />
                    <Route path="health-ai" element={<HealthWithAI />} />
                    <Route path="medical-history" element={<MedicalHistoryPage />} />
                    <Route path="search-doctor" element={<DoctorsListPage />} />
                    <Route path="search-doctor/:id" element={<DoctorProfilePage />} />
                    <Route path="search-doctor/:id/create-appointment" element={<CreateAppointmentForm />} />
                  </Route>
                </Route>

                {/* Rutas protegidas para doctores */}
                <Route element={<ProtectedRoute allowedRole={"doctor"} />}>
                  <Route path="/doctor" element={<DoctorLayout />}>
                    <Route path="appointments-man" element={<AppointmentsManagement />} />
                    <Route path="medical-records" element={<MedicalRecords />} />
                    <Route path="appointments" element={<AppointmentsList />} />
                    <Route path="appointments/:id" element={<AppointmentDetailsGestor />} />
                    <Route path="appointments/:id/with-ai" element={<AppointmentWithAI />} />
                  </Route>
                </Route>
              </Routes>

            </BrowserRouter>
          </AppointmentProvider>
        </MedicalHistoryProvider>
      </DoctorProvider>
    </AuthProvider>
  );
  //</DoctorProvider>
}

export default App;
