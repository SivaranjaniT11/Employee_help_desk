import { createContext, useMemo, useState } from 'react';
import { LOCAL_STORAGE_KEYS, ROLES } from '../utils/constants';

export const AuthContext = createContext(undefined);

function getInitialRole() {
  if (typeof window === 'undefined') return ROLES.EMPLOYEE;
  const stored = window.localStorage.getItem(LOCAL_STORAGE_KEYS.ROLE);
  return stored === ROLES.ADMIN ? ROLES.ADMIN : ROLES.EMPLOYEE;
}

/**
 * This app has no backend or real authentication. Instead, it simulates
 * two distinct workspaces — Employee and Admin — via a simple role switch
 * stored in Local Storage. This keeps the demo self-contained while still
 * fully separating the two feature sets requested in the brief.
 */
export function AuthProvider({ children }) {
  const [role, setRole] = useState(getInitialRole);

  const value = useMemo(
    () => ({
      role,
      isAdmin: role === ROLES.ADMIN,
      isEmployee: role === ROLES.EMPLOYEE,
      setRole: (nextRole) => {
        setRole(nextRole);
        window.localStorage.setItem(LOCAL_STORAGE_KEYS.ROLE, nextRole);
      },
      toggleRole: () => {
        const nextRole = role === ROLES.ADMIN ? ROLES.EMPLOYEE : ROLES.ADMIN;
        setRole(nextRole);
        window.localStorage.setItem(LOCAL_STORAGE_KEYS.ROLE, nextRole);
      },
    }),
    [role]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
