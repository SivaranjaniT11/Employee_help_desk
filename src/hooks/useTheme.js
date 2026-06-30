import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

/** Convenience hook for reading/toggling the current light/dark theme. */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return context;
}
