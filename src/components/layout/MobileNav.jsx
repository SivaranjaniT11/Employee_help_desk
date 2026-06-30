import { useEffect } from 'react';
import { X } from 'lucide-react';
import Sidebar from './Sidebar';
import RoleSwitcher from '../ui/RoleSwitcher';

/** Slide-over navigation drawer shown on mobile/tablet widths. */
export default function MobileNav({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 h-screen h-[100dvh] lg:hidden">
      <button
        type="button"
        aria-label="Close navigation menu"
        className="absolute inset-0 bg-ink-900/60"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 left-0 flex h-full w-72 max-w-[85vw] animate-slide-in flex-col bg-ink-900 shadow-card-hover">
        <div className="flex-1 overflow-y-auto min-h-0">
          <Sidebar onNavigate={onClose} className="h-full" />
        </div>
        <div
          className="flex-none border-t border-white/10 px-5 py-4"
          style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        >
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-400">Workspace</p>
          <RoleSwitcher />
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-white/70 hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
