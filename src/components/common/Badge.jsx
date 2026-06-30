import { cn } from '../../utils/helpers';

const TONE_CLASSES = {
  signal: 'bg-signal-50 text-signal-700 dark:bg-signal-900/40 dark:text-signal-200 ring-signal-200 dark:ring-signal-700',
  amber: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200 ring-amber-200 dark:ring-amber-700',
  mint: 'bg-mint-50 text-mint-600 dark:bg-mint-900/30 dark:text-mint-200 ring-mint-200 dark:ring-mint-700',
  coral: 'bg-coral-50 text-coral-600 dark:bg-coral-900/30 dark:text-coral-200 ring-coral-200 dark:ring-coral-700',
  ink: 'bg-ink-100 text-ink-600 dark:bg-ink-700 dark:text-ink-200 ring-ink-200 dark:ring-ink-600',
};

/** Small pill used for statuses, priorities, and other categorical labels. */
export default function Badge({ tone = 'ink', children, dot = false, className = '' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset',
        TONE_CLASSES[tone] ?? TONE_CLASSES.ink,
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  );
}
