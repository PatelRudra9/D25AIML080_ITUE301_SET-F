import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children, requiredRole }) {
  const { token, role } = useAuth();

  if (!token) return <Navigate to="/" replace />;

  // Keep role failures distinct from missing-token failures for a clear redirect flow.
  if (requiredRole && role !== requiredRole) return <Navigate to="/events" replace />;

  return children;
}
