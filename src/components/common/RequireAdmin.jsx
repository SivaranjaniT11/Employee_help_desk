import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * Wraps admin-only routes. Since this app has no real backend
 * authentication, this guard simply respects the active role switch —
 * if someone is in the Employee workspace and navigates straight to an
 * admin URL, they're sent back to the employee dashboard rather than
 * shown a workspace they didn't choose.
 */
export default function RequireAdmin({ children }) {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/" replace />;
}
