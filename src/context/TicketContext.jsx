import { createContext, useCallback, useEffect, useState } from 'react';
import * as ticketService from '../services/ticketService';

export const TicketContext = createContext(undefined);

/**
 * Owns the single in-memory copy of all tickets for the running session,
 * keeping it in sync with Local Storage. Components read from this
 * context instead of calling the service layer directly, so every part
 * of the UI re-renders consistently the moment any ticket changes.
 */
export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshTickets = useCallback(() => {
    setTickets(ticketService.getTickets());
  }, []);

  useEffect(() => {
    // Simulate a brief load so skeleton states have something real to show,
    // even though Local Storage reads are effectively instant.
    const timer = setTimeout(() => {
      refreshTickets();
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [refreshTickets]);

  const addTicket = useCallback((formData) => {
    const ticket = ticketService.createTicket(formData);
    setTickets(ticketService.getTickets());
    return ticket;
  }, []);

  const editTicket = useCallback((id, updates) => {
    const updated = ticketService.updateTicket(id, updates);
    setTickets(ticketService.getTickets());
    return updated;
  }, []);

  const removeTicket = useCallback((id) => {
    const success = ticketService.deleteTicket(id);
    setTickets(ticketService.getTickets());
    return success;
  }, []);

  const changeStatus = useCallback((id, newStatus, note) => {
    const updated = ticketService.changeTicketStatus(id, newStatus, note);
    setTickets(ticketService.getTickets());
    return updated;
  }, []);

  const assignTechnician = useCallback((id, technician) => {
    const updated = ticketService.assignTechnician(id, technician);
    setTickets(ticketService.getTickets());
    return updated;
  }, []);

  const addComment = useCallback((id, comment) => {
    const updated = ticketService.addComment(id, comment);
    setTickets(ticketService.getTickets());
    return updated;
  }, []);

  const resetData = useCallback(() => {
    ticketService.resetToSeedData();
    setTickets(ticketService.getTickets());
  }, []);

  const value = {
    tickets,
    isLoading,
    refreshTickets,
    addTicket,
    editTicket,
    removeTicket,
    changeStatus,
    assignTechnician,
    addComment,
    resetData,
  };

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
}
