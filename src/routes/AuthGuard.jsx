import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";
import { LoadingState } from "../component/general/states/LoadingState";

export const AuthGuard = () => {
  const { session, loading } = UseAuth();
  if (loading) {
    return <LoadingState />;
  }

  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};
