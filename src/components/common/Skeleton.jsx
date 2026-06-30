import { cn } from '../../utils/helpers';

/** A single shimmering placeholder block. Compose these to build loading states. */
export function SkeletonBlock({ className = '' }) {
  return <div className={cn('skeleton', className)} />;
}

/** Loading placeholder for a row of dashboard stat cards. */
export function SkeletonStatsGrid({ count = 5 }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl2 border border-ink-100 dark:border-ink-700 bg-white dark:bg-ink-800 p-5"
        >
          <SkeletonBlock className="h-4 w-24 mb-3" />
          <SkeletonBlock className="h-8 w-16" />
        </div>
      ))}
    </div>
  );
}

/** Loading placeholder for a data table. */
export function SkeletonTable({ rows = 6, columns = 6 }) {
  return (
    <div className="overflow-hidden rounded-xl2 border border-ink-100 dark:border-ink-700 bg-white dark:bg-ink-800">
      <div className="border-b border-ink-100 dark:border-ink-700 p-4">
        <SkeletonBlock className="h-5 w-40" />
      </div>
      <div className="divide-y divide-ink-100 dark:divide-ink-700">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex items-center gap-6 p-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <SkeletonBlock key={colIndex} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Loading placeholder for the ticket details page. */
export function SkeletonDetails() {
  return (
    <div className="space-y-6">
      <SkeletonBlock className="h-24 w-full rounded-xl2" />
      <SkeletonBlock className="h-48 w-full rounded-xl2" />
      <SkeletonBlock className="h-32 w-full rounded-xl2" />
    </div>
  );
}
