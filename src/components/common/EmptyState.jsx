import { Inbox } from 'lucide-react';
import Button from './Button';

/**
 * Shown whenever a list has nothing to display — no tickets yet, or a
 * search/filter combination that matched nothing. Always frames the
 * empty space as something the person can act on.
 */
export default function EmptyState({
  icon: Icon = Inbox,
  title = 'Nothing here yet',
  description = 'Once there is data, it will show up here.',
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 py-16 px-6 text-center ${className}`}>
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-signal-50 dark:bg-signal-900/30">
        <Icon className="h-6 w-6 text-signal-500" aria-hidden="true" />
      </div>
      <h3 className="font-display text-base font-semibold text-ink-800 dark:text-ink-50">{title}</h3>
      <p className="max-w-sm text-sm text-ink-500 dark:text-ink-300">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm" className="mt-1">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
