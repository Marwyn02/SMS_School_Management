import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
