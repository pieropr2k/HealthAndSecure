import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";

export const ProtectedRoute = ({ allowedRole, excludedRole }) => {
  const { isAuthenticated, user, loading } = useAuth();
  console.log(user);

  if (loading) return <h1>Loading...</h1>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const userRole = user?.role;

  // Si el usuario tiene un rol excluido, redirigir
  if (excludedRole && userRole === excludedRole) {
    return <Navigate to="/" replace />;
  }

  // Si el rol del usuario no coincide con el rol permitido
  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
