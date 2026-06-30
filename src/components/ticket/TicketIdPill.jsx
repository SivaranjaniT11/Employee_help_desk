import { cn } from '../../utils/helpers';

/** Compact monospace pill for a ticket id, used in tables and lists. */
export default function TicketIdPill({ id, className = '' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md bg-ink-50 dark:bg-ink-700 px-2 py-1 font-mono text-xs font-semibold tracking-tight text-ink-700 dark:text-ink-100',
        className
      )}
    >
      {id}
    </span>
  );
}
