import { LOCAL_STORAGE_KEYS, TICKET_STATUS } from '../utils/constants';
import { formatTicketId, generateId } from '../utils/helpers';
import { seedTickets } from '../data/seedData';

/**
 * Local Storage service layer.
 *
 * This file is the single source of truth for reading and writing
 * ticket data to the browser's Local Storage. Every other part of the
 * app (hooks, context, pages) should go through these functions rather
 * than touching `window.localStorage` directly — that keeps the storage
 * shape and error handling consistent in one place.
 */

const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

function safeParse(rawValue, fallback) {
  if (!rawValue) return fallback;
  try {
    return JSON.parse(rawValue);
  } catch (error) {
    console.error('helpdesk: failed to parse local storage value', error);
    return fallback;
  }
}

/**
 * Ensures the local storage has an initial data set the very first time
 * the app runs, so the UI never looks empty on a fresh install.
 */
function ensureSeeded() {
  if (!isBrowser) return;
  const existing = window.localStorage.getItem(LOCAL_STORAGE_KEYS.TICKETS);
  if (existing === null) {
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.TICKETS, JSON.stringify(seedTickets));
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.TICKET_SEQUENCE, String(1000 + seedTickets.length + 1));
  }
}

/** Retrieves every ticket currently stored. */
export function getTickets() {
  if (!isBrowser) return [];
  ensureSeeded();
  const raw = window.localStorage.getItem(LOCAL_STORAGE_KEYS.TICKETS);
  return safeParse(raw, []);
}

/** Persists the full ticket array, overwriting whatever was stored before. */
export function saveTickets(tickets) {
  if (!isBrowser) return;
  window.localStorage.setItem(LOCAL_STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
}

/** Returns a single ticket by its id, or undefined if it doesn't exist. */
export function getTicketById(id) {
  return getTickets().find((ticket) => ticket.id === id);
}

/** Reserves and returns the next sequential numeric id, e.g. 1001, 1002... */
function getNextSequence() {
  if (!isBrowser) return 1001;
  ensureSeeded();
  const raw = window.localStorage.getItem(LOCAL_STORAGE_KEYS.TICKET_SEQUENCE);
  const current = raw ? parseInt(raw, 10) : 1001;
  const next = Number.isNaN(current) ? 1001 : current;
  window.localStorage.setItem(LOCAL_STORAGE_KEYS.TICKET_SEQUENCE, String(next + 1));
  return next;
}

/**
 * Creates a new ticket from validated form data, assigning it a fresh
 * sequential id (TKT-1001, TKT-1002, ...) and an initial status history
 * entry so the timeline always has a starting point.
 */
export function createTicket(formData) {
  const now = new Date().toISOString();
  const ticket = {
    id: formatTicketId(getNextSequence()),
    employeeName: formData.employeeName,
    employeeId: formData.employeeId,
    department: formData.department,
    priority: formData.priority,
    subject: formData.subject,
    description: formData.description,
    status: TICKET_STATUS.OPEN,
    assignedTechnician: 'Unassigned',
    comments: [],
    history: [
      {
        id: generateId('hist'),
        status: TICKET_STATUS.OPEN,
        note: 'Ticket created',
        changedAt: now,
      },
    ],
    createdAt: now,
    updatedAt: now,
  };

  const tickets = getTickets();
  saveTickets([ticket, ...tickets]);
  return ticket;
}

/**
 * Applies a partial update to an existing ticket and refreshes its
 * `updatedAt` timestamp. Returns the updated ticket, or null if no
 * ticket matched the given id.
 */
export function updateTicket(id, updates) {
  const tickets = getTickets();
  let updatedTicket = null;

  const nextTickets = tickets.map((ticket) => {
    if (ticket.id !== id) return ticket;
    updatedTicket = { ...ticket, ...updates, updatedAt: new Date().toISOString() };
    return updatedTicket;
  });

  if (updatedTicket) saveTickets(nextTickets);
  return updatedTicket;
}

/** Removes a ticket permanently from storage. */
export function deleteTicket(id) {
  const tickets = getTickets();
  const nextTickets = tickets.filter((ticket) => ticket.id !== id);
  saveTickets(nextTickets);
  return nextTickets.length !== tickets.length;
}

/**
 * Changes a ticket's status and appends an entry to its history timeline.
 * Used by the admin "Manage Tickets" workflow.
 */
export function changeTicketStatus(id, newStatus, note = '') {
  const ticket = getTicketById(id);
  if (!ticket) return null;

  const historyEntry = {
    id: generateId('hist'),
    status: newStatus,
    note: note || `Status changed to ${newStatus}`,
    changedAt: new Date().toISOString(),
  };

  return updateTicket(id, {
    status: newStatus,
    history: [...ticket.history, historyEntry],
  });
}

/** Assigns (or reassigns) a technician to a ticket. */
export function assignTechnician(id, technicianName) {
  return updateTicket(id, { assignedTechnician: technicianName });
}

/** Appends a comment to a ticket's comment thread. */
export function addComment(id, { author, message, role = 'employee' }) {
  const ticket = getTicketById(id);
  if (!ticket) return null;

  const comment = {
    id: generateId('cmt'),
    author,
    message,
    role,
    createdAt: new Date().toISOString(),
  };

  return updateTicket(id, { comments: [...ticket.comments, comment] });
}

/** Wipes all ticket data and re-seeds with the original sample data set. */
export function resetToSeedData() {
  if (!isBrowser) return;
  window.localStorage.setItem(LOCAL_STORAGE_KEYS.TICKETS, JSON.stringify(seedTickets));
  window.localStorage.setItem(LOCAL_STORAGE_KEYS.TICKET_SEQUENCE, String(1000 + seedTickets.length + 1));
}
