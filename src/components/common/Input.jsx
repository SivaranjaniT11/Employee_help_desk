import { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

/**
 * Labeled text input. Forwards its ref so it can be registered directly
 * with React Hook Form via `{...register('fieldName')}`.
 */
const Input = forwardRef(
  ({ label, error, hint, icon: Icon, id, className = '', required, ...rest }, ref) => {
    const inputId = id || rest.name;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-ink-700 dark:text-ink-200">
            {label}
            {required && <span className="text-coral-400 ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
              aria-hidden="true"
            />
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            className={cn(
              'h-10 w-full rounded-lg border bg-white dark:bg-ink-800 px-3 text-sm text-ink-900 dark:text-ink-50',
              'placeholder:text-ink-400 transition-colors duration-150',
              'border-ink-200 dark:border-ink-600 focus:border-signal-400 focus:outline-none focus:ring-2 focus:ring-signal-100 dark:focus:ring-signal-900',
              error && 'border-coral-300 focus:border-coral-400 focus:ring-coral-100',
              Icon && 'pl-9',
              className
            )}
            {...rest}
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs font-medium text-coral-500">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${inputId}-hint`} className="text-xs text-ink-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
