/** App footer with author credit, shown at the bottom of every page. */
export default function Footer() {
  return (
    <footer className="border-t border-ink-100 dark:border-ink-700 px-4 py-6 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-ink-700 dark:text-ink-100">Sivaranjani T</p>
          <a
            href="mailto:sivaranjanithiyagarajan12@gmail.com"
            className="text-xs text-ink-400 hover:text-signal-500 transition-colors"
          >
            sivaranjanithiyagarajan12@gmail.com
          </a>
        </div>
        {/* <button
          type="button"
          onClick={() => window.open('https://digitalheroesco.com', '_blank', 'noopener,noreferrer')}
          className="rounded-lg bg-ink-900 dark:bg-signal-500 px-4 py-2 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
        >
          Built for Digital Heroes
        </button> */}
      </div>
    </footer>
  );
}
