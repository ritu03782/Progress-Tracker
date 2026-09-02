import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function FullScreenLoader() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-slate-400">
      Loading...
    </div>
  );
}

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <FullScreenLoader />;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export function PublicOnlyRoute() {
  const { user, loading } = useAuth();

  if (loading) return <FullScreenLoader />;
  if (user) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
