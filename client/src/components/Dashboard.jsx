import { NavLink, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="flex bg-gray-50">
      {/* Sidebar */}
      <aside className="bg-slate-800 text-white flex flex-col items-center py-4 fixed h-screen w-[260px] shadow-lg">
        {/* Profile Picture */}
        <div className="w-24 h-24 rounded-full border-4 border-white mb-4 overflow-hidden shadow-md">
          <img
            src={user?.profilePicture || "https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"}
            alt="Doctor"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Welcome Message */}
        <h1 className="text-sm font-semibold text-center mb-6 px-2">
          {`Bienvenido, ${user?.firstName || "Armanimo"}`}
        </h1>

        <hr className="w-3/4 border-gray-400 mb-6" />

        {/* Menu */}
        <nav className="w-full px-4 flex-grow">
          <ul className="space-y-3 text-sm">
            <li>
              <NavLink
                to="./manage-info"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md block text-center ${
                    isActive
                      ? "bg-blue-700 shadow-md"
                      : "hover:bg-blue-600 hover:shadow-sm"
                  }`
                }
              >
                Mi Información
              </NavLink>
            </li>
            <li>
              <NavLink
                to="./appointments"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md block text-center ${
                    isActive
                      ? "bg-blue-700 shadow-md"
                      : "hover:bg-blue-600 hover:shadow-sm"
                  }`
                }
              >
                Lista de Citas
              </NavLink>
            </li>
            <li>
              <NavLink
                to="./schedules"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md block text-center ${
                    isActive
                      ? "bg-blue-700 shadow-md"
                      : "hover:bg-blue-600 hover:shadow-sm"
                  }`
                }
              >
                Gestionar horarios
              </NavLink>
            </li>
            <li>
              <NavLink
                to="./medical-records"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md block text-center ${
                    isActive
                      ? "bg-blue-700 shadow-md"
                      : "hover:bg-blue-600 hover:shadow-sm"
                  }`
                }
              >
                Historiales Médicos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="./view-finances"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md block text-center ${
                    isActive
                      ? "bg-blue-700 shadow-md"
                      : "hover:bg-blue-600 hover:shadow-sm"
                  }`
                }
              >
                Ver Finanzas
              </NavLink>
            </li>
          </ul>
        </nav>

        <hr className="w-3/4 border-gray-400 my-6" />

        {/* Logout Button */}
        <button
          className="mb-4 px-10 py-2 rounded-lg cursor-pointer bg-red-600 hover:bg-red-700 text-sm font-medium shadow-md"
          onClick={logout}
        >
          Salir
        </button>
      </aside>
    </div>
  );
}

export default Dashboard;
