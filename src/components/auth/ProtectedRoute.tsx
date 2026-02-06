import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../modules/auth/store";
import type { ReactElement } from "react";

export function ProtectedRoute({ children }: { children: ReactElement }) {
  const token = useAuthStore((s) => s.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}