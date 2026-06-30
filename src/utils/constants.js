// Centralized constants for the help desk system.
// Keeping these in one place avoids magic strings scattered across components.

export const TICKET_STATUS = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
};

// Defines the linear workflow order used for the status timeline and
// to validate forward-moving status transitions.
export const STATUS_ORDER = [
  TICKET_STATUS.OPEN,
  TICKET_STATUS.IN_PROGRESS,
  TICKET_STATUS.RESOLVED,
  TICKET_STATUS.CLOSED,
];

export const TICKET_PRIORITY = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  URGENT: 'Urgent',
};

export const PRIORITY_ORDER = [
  TICKET_PRIORITY.LOW,
  TICKET_PRIORITY.MEDIUM,
  TICKET_PRIORITY.HIGH,
  TICKET_PRIORITY.URGENT,
];

export const DEPARTMENTS = [
  'Engineering',
  'Human Resources',
  'Finance',
  'Sales',
  'Marketing',
  'Operations',
  'IT Support',
  'Customer Success',
];

export const TECHNICIANS = [
  'Unassigned',
  'Ravi Kumar',
  'Ananya Singh',
  'Mark Thompson',
  'Priya Nair',
  'James Carter',
  'Sneha Reddy',
];

// Status -> visual tone mapping consumed by badges and charts.
export const STATUS_TONE = {
  [TICKET_STATUS.OPEN]: 'signal',
  [TICKET_STATUS.IN_PROGRESS]: 'amber',
  [TICKET_STATUS.RESOLVED]: 'mint',
  [TICKET_STATUS.CLOSED]: 'ink',
};

export const PRIORITY_TONE = {
  [TICKET_PRIORITY.LOW]: 'mint',
  [TICKET_PRIORITY.MEDIUM]: 'signal',
  [TICKET_PRIORITY.HIGH]: 'amber',
  [TICKET_PRIORITY.URGENT]: 'coral',
};

export const LOCAL_STORAGE_KEYS = {
  TICKETS: 'helpdesk_tickets_v1',
  TICKET_SEQUENCE: 'helpdesk_ticket_sequence_v1',
  THEME: 'helpdesk_theme_v1',
  ROLE: 'helpdesk_active_role_v1',
  SIDEBAR_COLLAPSED: 'helpdesk_sidebar_collapsed_v1',
};

export const ROLES = {
  EMPLOYEE: 'employee',
  ADMIN: 'admin',
};

export const SORT_OPTIONS = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
};

// Raw hex values mirroring the Tailwind theme, for use in Recharts fills
// where Tailwind utility classes can't be applied directly.
export const TONE_HEX = {
  signal: '#2F5DD9',
  amber: '#E8A33D',
  mint: '#2BAF7D',
  coral: '#E15554',
  ink: '#6B7A9C',
};
