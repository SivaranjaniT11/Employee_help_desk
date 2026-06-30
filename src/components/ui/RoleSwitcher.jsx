import { User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';
import { cn } from '../../utils/helpers';

/**
 * Lets the person switch between the Employee and Admin workspaces.
 * There is no real authentication in this offline demo, so this is a
 * deliberate, visible switch rather than a hidden backdoor — anyone
 * using the app can see exactly which workspace they're in.
 */
export default function RoleSwitcher() {
  const { role, setRole } = useAuth();

  return (
    <div className="flex items-center rounded-lg bg-ink-100 dark:bg-ink-700 p-1 text-sm">
      <button
        type="button"
        onClick={() => setRole(ROLES.EMPLOYEE)}
        className={cn(
          'flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-colors',
          role === ROLES.EMPLOYEE
            ? 'bg-white dark:bg-ink-800 text-ink-900 dark:text-white shadow-sm'
            : 'text-ink-500 dark:text-ink-300'
        )}
      >
        <User className="h-3.5 w-3.5" />
        Employee
      </button>
      <button
        type="button"
        onClick={() => setRole(ROLES.ADMIN)}
        className={cn(
          'flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-colors',
          role === ROLES.ADMIN
            ? 'bg-white dark:bg-ink-800 text-ink-900 dark:text-white shadow-sm'
            : 'text-ink-500 dark:text-ink-300'
        )}
      >
        <ShieldCheck className="h-3.5 w-3.5" />
        Admin
      </button>
    </div>
  );
}
