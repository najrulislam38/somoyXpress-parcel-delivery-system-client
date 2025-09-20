import { Navigate } from "react-router";

interface ProtectedLoginProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export default function ProtectedLogin({
  children,
  isAuthenticated,
}: ProtectedLoginProps) {
  if (isAuthenticated) {
    return <Navigate to="/" replace />; // redirect to homepage or dashboard
  }
  return <>{children}</>;
}
