import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/helpers';

const SIZE_CLASSES = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

/**
 * A focus-friendly modal dialog. Closes on Escape or backdrop click,
 * and locks page scroll while open.
 */
export default function Modal({ isOpen, onClose, title, description, size = 'md', children, footer }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative z-10 w-full rounded-xl2 bg-white dark:bg-ink-800 shadow-card-hover border border-ink-100 dark:border-ink-700 max-h-[90vh] overflow-y-auto scrollbar-thin',
          SIZE_CLASSES[size]
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-ink-100 dark:border-ink-700 px-6 py-4">
          <div>
            <h2 id="modal-title" className="font-display text-lg font-semibold text-ink-900 dark:text-white">
              {title}
            </h2>
            {description && <p className="mt-0.5 text-sm text-ink-500 dark:text-ink-300">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-600 dark:hover:bg-ink-700 dark:hover:text-ink-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-ink-100 dark:border-ink-700 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
