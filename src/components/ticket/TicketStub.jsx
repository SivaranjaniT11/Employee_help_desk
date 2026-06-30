import { Ticket } from 'lucide-react';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { cn } from '../../utils/helpers';

/**
 * The app's signature visual motif: a help-desk ticket rendered like a
 * physical ticket stub, complete with a perforated tear line. Used at
 * the top of the Ticket Details page and in the Create Ticket success
 * state, so the most important identifier in the app — the ticket id —
 * always gets a moment that feels like an actual ticket rather than a
 * generic dashboard header.
 *
 * `notchSurface` should match the background color immediately behind
 * the stub (e.g. "paper" on the page background, "card" inside a white
 * card) so the perforation circles read as true cutouts.
 */
export default function TicketStub({ ticket, notchSurface = 'paper', className = '' }) {
  const notchStyle =
    notchSurface === 'card'
      ? { '--stub-notch': 'var(--stub-notch-card)' }
      : { '--stub-notch': 'var(--stub-notch-paper)' };

  return (
    <div
      className={cn(
        'ticket-stub-card relative flex flex-col gap-4 overflow-visible rounded-xl2 border border-ink-100 dark:border-ink-700',
        'bg-white dark:bg-ink-800 shadow-stub sm:flex-row sm:items-stretch',
        className
      )}
      style={notchStyle}
    >
      <div className="flex items-center gap-3 px-5 py-4 sm:w-56 sm:flex-col sm:items-start sm:justify-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal-50 dark:bg-signal-900/40">
          <Ticket className="h-4 w-4 text-signal-500" aria-hidden="true" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400 dark:text-ink-400">
            Ticket
          </p>
          <p className="font-mono text-2xl font-bold tracking-tight text-ink-900 dark:text-white">{ticket.id}</p>
        </div>
      </div>

      <div className="ticket-stub-divider hidden sm:block" aria-hidden="true" />
      <div className="border-t border-dashed border-ink-200 dark:border-ink-600 sm:hidden" aria-hidden="true" />

      <div className="flex flex-1 flex-col justify-center gap-2 px-5 py-4">
        <h2 className="font-display text-lg font-semibold leading-snug text-ink-900 dark:text-white">
          {ticket.subject}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={ticket.status} />
          <PriorityBadge priority={ticket.priority} />
          <span className="text-xs text-ink-400">·</span>
          <span className="text-xs text-ink-500 dark:text-ink-300">{ticket.department}</span>
        </div>
      </div>
    </div>
  );
}
