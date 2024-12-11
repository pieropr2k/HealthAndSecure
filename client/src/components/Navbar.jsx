import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";
import { useState } from "react";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const role = 'doctor'

  return (
    <nav className="bg-blue-600 text-white flex justify-between items-center py-4 px-8 shadow-md">
      {/* Logo / Title */}
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "./appointments" : "./"}>Health&Secure</Link>
      </h1>

      {/* Navigation Sections */}
      {isAuthenticated && (
        <ul className="flex items-center gap-6">
          <li>
            <Link to="./health-ai" className="hover:underline">
              Salud con IA
            </Link>
          </li> 
          <li>
            <Link to="./search-doctor" className="hover:underline">
              Buscar Doctor
            </Link>
          </li>
          <li>
            <Link to="./appointments" className="hover:underline">
              Citas Médicas
            </Link>
          </li>
          <li>
            <Link to="./medical-history" className="hover:underline">
              Historial Médico
            </Link>
          </li>
          <li className="relative">
            {/* Profile Icon */}
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="focus:outline-none"
            >
              <img
                src="https://via.placeholder.com/40"
                alt="Perfil"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </button>

            {/* Profile Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/profile">Perfil del Cliente</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <button onClick={() => logout()} className="w-full text-left">
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      )}

      {/* Login/Register Buttons */}
      {!isAuthenticated && (
        <div className="flex gap-4">
          <ButtonLink to="/login">Entrar</ButtonLink>
          <ButtonLink to="/register">Registrar</ButtonLink>
        </div>
      )}
    </nav>
  );
}
