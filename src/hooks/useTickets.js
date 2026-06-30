import { useContext } from 'react';
import { TicketContext } from '../context/TicketContext';

/**
 * Convenience hook for accessing the shared ticket state and mutation
 * functions exposed by TicketContext. Throws a clear error if used
 * outside the provider, which makes misuse easy to spot during development.
 */
export function useTickets() {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a <TicketProvider>');
  }
  return context;
}
