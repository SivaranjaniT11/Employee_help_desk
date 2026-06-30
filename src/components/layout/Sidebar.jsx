import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  ListChecks,
  ShieldCheck,
  Wrench,
  BarChart3,
  Ticket,
  ChevronLeft,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { cn } from '../../utils/helpers';
import { ROLES, LOCAL_STORAGE_KEYS } from '../../utils/constants';

const EMPLOYEE_LINKS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/create-ticket', label: 'Create Ticket', icon: PlusCircle },
  { to: '/tickets', label: 'My Tickets', icon: ListChecks },
];

const ADMIN_LINKS = [
  { to: '/admin', label: 'Admin Dashboard', icon: ShieldCheck, end: true },
  { to: '/admin/tickets', label: 'Manage Tickets', icon: Wrench },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
];

function NavSection({ title, links, onNavigate, collapsed }) {
  return (
    <div>
      {!collapsed && (
        <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-ink-400">{title}</p>
      )}
      <nav className={cn('flex flex-col gap-1', !collapsed && 'mt-2')}>
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              cn(
                'flex items-center rounded-lg text-sm font-medium transition-colors duration-150',
                collapsed ? 'justify-center px-0 py-2.5' : 'gap-3 px-3 py-2',
                isActive
                  ? 'bg-signal-500/15 text-signal-300'
                  : 'text-ink-300 hover:bg-white/5 hover:text-white'
              )
            }
          >
            <Icon className="h-[18px] w-[18px] flex-none" aria-hidden="true" />
            {!collapsed && label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

/**
 * Primary navigation. On desktop it's rendered sticky at full viewport
 * height so it stays in place while the page content scrolls, and can
 * be collapsed down to an icon-only rail to reclaim horizontal space.
 * On mobile it's reused inside the off-canvas drawer — always shown
 * fully expanded there, since collapsing a drawer that's already an
 * overlay wouldn't save anything.
 *
 * `collapsible` opts a particular usage into the collapse toggle and
 * persisted collapsed state; the mobile drawer omits it on purpose.
 */
export default function Sidebar({ onNavigate, collapsible = false, className = '' }) {
  const { role } = useAuth();
  const [storedCollapsed, setStoredCollapsed] = useLocalStorage(LOCAL_STORAGE_KEYS.SIDEBAR_COLLAPSED, false);
  const isCollapsed = collapsible && storedCollapsed;

  return (
    <aside
      className={cn(
        'relative flex flex-col bg-ink-900 text-white transition-[width] duration-200 ease-in-out',
        isCollapsed ? 'w-[76px]' : 'w-64',
        className
      )}
    >
      {collapsible && (
        <button
          type="button"
          onClick={() => setStoredCollapsed((prev) => !prev)}
          aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
          className="absolute -right-3 top-7 flex h-6 w-6 items-center justify-center rounded-full bg-white text-ink-500 shadow-card ring-1 ring-ink-200 transition-colors hover:bg-ink-50 hover:text-ink-700 dark:bg-ink-700 dark:text-ink-200 dark:ring-ink-600 dark:hover:bg-ink-600"
        >
          <ChevronLeft className={cn('h-3.5 w-3.5 transition-transform duration-200', isCollapsed && 'rotate-180')} />
        </button>
      )}

      <div className={cn('flex items-center gap-2.5 px-5 py-5', isCollapsed && 'justify-center px-0')}>
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-signal-500">
          <Ticket className="h-5 w-5 text-white" aria-hidden="true" />
        </div>
        {!isCollapsed && (
          <div>
            <p className="font-display text-base font-bold leading-none">HelpDesk</p>
            <p className="text-[11px] leading-none text-ink-400 mt-0.5">Employee Support</p>
          </div>
        )}
      </div>

      <div className={cn('flex-1 space-y-6 overflow-y-auto py-2 scrollbar-thin', isCollapsed ? 'px-2.5' : 'px-3')}>
        <NavSection title="Employee" links={EMPLOYEE_LINKS} onNavigate={onNavigate} collapsed={isCollapsed} />
        {role === ROLES.ADMIN && (
          <NavSection title="Admin" links={ADMIN_LINKS} onNavigate={onNavigate} collapsed={isCollapsed} />
        )}
      </div>

      {!isCollapsed && (
        <div className="border-t border-white/10 px-5 py-4">
          <p className="text-xs text-ink-400">Workflow</p>
          <p className="mt-1 text-xs text-ink-300 leading-relaxed">
            Open <span className="text-ink-500">→</span> In Progress <span className="text-ink-500">→</span> Resolved{' '}
            <span className="text-ink-500">→</span> Closed
          </p>
        </div>
      )}
    </aside>
  );
}
