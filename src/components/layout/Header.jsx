import { Menu } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import RoleSwitcher from '../ui/RoleSwitcher';

/** Top header shown on every page, with page context and global controls. */
export default function Header({ title, subtitle, onMenuClick, actions }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-ink-100 dark:border-ink-700 bg-white/80 dark:bg-ink-900/80 backdrop-blur px-4 py-3.5 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="-ml-1 flex h-9 w-9 items-center justify-center rounded-lg text-ink-600 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-700 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="font-display text-lg font-semibold text-ink-900 dark:text-white sm:text-xl">{title}</h1>
          {subtitle && <p className="text-sm text-ink-500 dark:text-ink-300">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {actions}
        <div className="hidden lg:block">
          <RoleSwitcher />
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
