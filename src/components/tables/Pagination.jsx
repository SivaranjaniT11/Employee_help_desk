import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/helpers';

/** Simple previous/next pagination with a page-count summary. */
export default function Pagination({ page, totalPages, totalItems, pageSize, onPageChange }) {
  if (totalPages <= 1) return null;

  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between border-t border-ink-100 dark:border-ink-700 px-4 py-3">
      <p className="text-xs text-ink-500 dark:text-ink-300">
        Showing <span className="font-medium text-ink-700 dark:text-ink-100">{startItem}–{endItem}</span> of{' '}
        <span className="font-medium text-ink-700 dark:text-ink-100">{totalItems}</span> tickets
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 dark:text-ink-300',
            page <= 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-ink-100 dark:hover:bg-ink-700'
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="px-2 text-xs font-medium text-ink-600 dark:text-ink-200">
          {page} / {totalPages}
        </span>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 dark:text-ink-300',
            page >= totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-ink-100 dark:hover:bg-ink-700'
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
