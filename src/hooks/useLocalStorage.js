import { useEffect, useState } from 'react';

/**
 * Generic hook for persisting a piece of component state to Local Storage.
 * Useful for small UI preferences (e.g. table page size) that don't need
 * to live in the central ticket store.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.error(`helpdesk: failed to read "${key}" from local storage`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`helpdesk: failed to write "${key}" to local storage`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
