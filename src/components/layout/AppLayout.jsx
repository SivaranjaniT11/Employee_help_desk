import { useState } from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import Header from './Header';
import Footer from './Footer';

/**
 * Shared page shell used by every route: a fixed sidebar on large
 * screens, a slide-over drawer on small screens, a sticky header, and
 * a footer that always sits below the page content.
 */
export default function AppLayout({ title, subtitle, actions, children }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-paper dark:bg-paper-dark">
      <Sidebar collapsible className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-none" />
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

      <div className="flex min-h-screen flex-1 flex-col">
        <Header
          title={title}
          subtitle={subtitle}
          actions={actions}
          onMenuClick={() => setIsMobileNavOpen(true)}
        />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:py-8 animate-fade-in">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
