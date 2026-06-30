import { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

const Textarea = forwardRef(
  ({ label, error, hint, id, rows = 4, className = '', required, ...rest }, ref) => {
    const textareaId = id || rest.name;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-ink-700 dark:text-ink-200">
            {label}
            {required && <span className="text-coral-400 ml-0.5">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
          className={cn(
            'w-full resize-none rounded-lg border bg-white dark:bg-ink-800 px-3 py-2.5 text-sm text-ink-900 dark:text-ink-50',
            'placeholder:text-ink-400 transition-colors duration-150',
            'border-ink-200 dark:border-ink-600 focus:border-signal-400 focus:outline-none focus:ring-2 focus:ring-signal-100 dark:focus:ring-signal-900',
            error && 'border-coral-300 focus:border-coral-400 focus:ring-coral-100',
            className
          )}
          {...rest}
        />
        {error && (
          <p id={`${textareaId}-error`} className="text-xs font-medium text-coral-500">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${textareaId}-hint`} className="text-xs text-ink-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
