// Small, dependency-free helper functions used across the app.

/**
 * Conditionally joins class names together, skipping falsy values.
 * A minimal stand-in for the popular `clsx` package.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formats an ISO date string into a short, readable date (e.g. "27 Jun 2026").
 */
export function formatDate(isoString) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Formats an ISO date string into a date + time string (e.g. "27 Jun 2026, 3:45 PM").
 */
export function formatDateTime(isoString) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '—';
  return `${formatDate(isoString)}, ${date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })}`;
}

/**
 * Returns a friendly relative time string (e.g. "3 hours ago") for recent dates,
 * falling back to a formatted date for anything older than a week.
 */
export function formatRelativeTime(isoString) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '—';
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.round(diffMs / 60000);
  const diffHours = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} min${diffMins === 1 ? '' : 's'} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  return formatDate(isoString);
}

/**
 * Generates the next sequential ticket id in the form "TKT-1001".
 * The sequence number is persisted separately in local storage so ids
 * never collide, even if tickets are later deleted.
 */
export function formatTicketId(sequenceNumber) {
  return `TKT-${sequenceNumber}`;
}

/**
 * Produces a short, readable initials string from a person's full name,
 * used for avatar placeholders (e.g. "Sivaranjani T" -> "ST").
 */
export function getInitials(fullName = '') {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

/**
 * Truncates long text with an ellipsis, useful for table cells.
 */
export function truncate(text = '', maxLength = 60) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

/**
 * Generates a reasonably unique id for client-side records (comments, etc.)
 * without pulling in an external uuid dependency.
 */
export function generateId(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
