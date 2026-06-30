import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers';

const VARIANT_CLASSES = {
  primary:
    'bg-signal-500 text-white hover:bg-signal-600 focus-visible:ring-signal-400 shadow-sm',
  secondary:
    'bg-ink-100 text-ink-800 hover:bg-ink-200 dark:bg-ink-700 dark:text-ink-50 dark:hover:bg-ink-600',
  outline:
    'border border-ink-200 text-ink-700 hover:bg-ink-50 dark:border-ink-600 dark:text-ink-100 dark:hover:bg-ink-700/60 bg-transparent',
  ghost: 'text-ink-600 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-700/60 bg-transparent',
  danger: 'bg-coral-500 text-white hover:bg-coral-600 focus-visible:ring-coral-300',
};

const SIZE_CLASSES = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-11 px-5 text-base gap-2',
};

/**
 * Base button used everywhere in the app. Accepts an optional `icon`
 * (a lucide-react component) and a `loading` flag that swaps the icon
 * for a spinner and disables interaction.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  type = 'button',
  className = '',
  ...rest
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper dark:focus-visible:ring-offset-paper-dark',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        fullWidth && 'w-full',
        className
      )}
      {...rest}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {!loading && Icon && iconPosition === 'left' && <Icon className="h-4 w-4" aria-hidden="true" />}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}
