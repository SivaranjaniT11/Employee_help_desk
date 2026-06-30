import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/** Convenience hook for reading/switching the active role (employee/admin). */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an <AuthProvider>');
  }
  return context;
}
