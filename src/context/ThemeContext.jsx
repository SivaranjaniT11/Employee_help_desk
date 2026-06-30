import { createContext, useEffect, useMemo, useState } from 'react';
import { LOCAL_STORAGE_KEYS } from '../utils/constants';

export const ThemeContext = createContext(undefined);

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(LOCAL_STORAGE_KEYS.THEME);
  if (stored === 'light' || stored === 'dark') return stored;
  // Respect the OS-level preference on first visit.
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

/**
 * Provides app-wide dark mode state, persisting the user's choice to
 * Local Storage and toggling the `dark` class on the <html> element so
 * Tailwind's `dark:` variants take effect.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
      setTheme,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
