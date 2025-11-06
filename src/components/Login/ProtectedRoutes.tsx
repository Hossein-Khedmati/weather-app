import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();

  // ❌ If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ✅ Otherwise, render the protected page
  return <>{children}</>;
};

export default ProtectedRoute;
