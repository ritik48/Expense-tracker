import { RootState } from "@/utils/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const user = useSelector((state: RootState) => state.auth.name);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
