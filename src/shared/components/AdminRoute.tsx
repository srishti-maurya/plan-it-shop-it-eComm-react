import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks";

export function AdminRoute() {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (!user?.isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
}
