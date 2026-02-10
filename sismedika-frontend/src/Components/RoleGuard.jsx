import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleGuard({ role, children }) {
  const { user } = useAuth();
  if (user?.role !== role) return <Navigate to="/" />;
  return children;
}
