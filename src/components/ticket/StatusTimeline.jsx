import { Check } from 'lucide-react';
import { formatDateTime, cn } from '../../utils/helpers';
import { STATUS_TONE } from '../../utils/constants';

const TONE_DOT_CLASSES = {
  signal: 'bg-signal-500',
  amber: 'bg-amber-400',
  mint: 'bg-mint-400',
  ink: 'bg-ink-400',
  coral: 'bg-coral-400',
};

/**
 * Vertical timeline showing every status change a ticket has gone
 * through, most recent first. Each entry shows what changed, when,
 * and an optional note left by whoever made the change.
 */
export default function StatusTimeline({ history = [] }) {
  const sorted = [...history].sort((a, b) => new Date(b.changedAt) - new Date(a.changedAt));

  return (
    <ol className="space-y-0">
      {sorted.map((entry, index) => {
        const tone = STATUS_TONE[entry.status] ?? 'ink';
        const isLast = index === sorted.length - 1;

        return (
          <li key={entry.id} className="relative flex gap-4 pb-6 last:pb-0">
            {!isLast && (
              <span
                className="absolute left-[7px] top-5 h-full w-px bg-ink-100 dark:bg-ink-700"
                aria-hidden="true"
              />
            )}
            <span
              className={cn(
                'relative z-10 mt-1 flex h-3.5 w-3.5 flex-none items-center justify-center rounded-full ring-4 ring-white dark:ring-ink-800',
                TONE_DOT_CLASSES[tone]
              )}
            >
              {index === 0 && <Check className="h-2 w-2 text-white" strokeWidth={4} />}
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium text-ink-800 dark:text-ink-50">{entry.status}</p>
              {entry.note && <p className="mt-0.5 text-sm text-ink-500 dark:text-ink-300">{entry.note}</p>}
              <p className="mt-1 text-xs text-ink-400">{formatDateTime(entry.changedAt)}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
