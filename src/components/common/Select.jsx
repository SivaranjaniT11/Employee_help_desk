import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/helpers';

const Select = forwardRef(
  ({ label, error, hint, options = [], placeholder = 'Select...', id, className = '', required, ...rest }, ref) => {
    const selectId = id || rest.name;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-ink-700 dark:text-ink-200">
            {label}
            {required && <span className="text-coral-400 ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
            className={cn(
              'h-10 w-full appearance-none rounded-lg border bg-white dark:bg-ink-800 px-3 pr-9 text-sm text-ink-900 dark:text-ink-50',
              'transition-colors duration-150 cursor-pointer',
              'border-ink-200 dark:border-ink-600 focus:border-signal-400 focus:outline-none focus:ring-2 focus:ring-signal-100 dark:focus:ring-signal-900',
              error && 'border-coral-300 focus:border-coral-400 focus:ring-coral-100',
              className
            )}
            {...rest}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value ?? option} value={option.value ?? option}>
                {option.label ?? option}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
            aria-hidden="true"
          />
        </div>
        {error && (
          <p id={`${selectId}-error`} className="text-xs font-medium text-coral-500">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${selectId}-hint`} className="text-xs text-ink-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
