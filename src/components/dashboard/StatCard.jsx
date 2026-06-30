import Card from '../common/Card';
import { cn } from '../../utils/helpers';

const TONE_CLASSES = {
  signal: 'bg-signal-50 text-signal-500 dark:bg-signal-900/40 dark:text-signal-300',
  amber: 'bg-amber-50 text-amber-500 dark:bg-amber-900/30 dark:text-amber-300',
  mint: 'bg-mint-50 text-mint-500 dark:bg-mint-900/30 dark:text-mint-300',
  coral: 'bg-coral-50 text-coral-500 dark:bg-coral-900/30 dark:text-coral-300',
  ink: 'bg-ink-100 text-ink-500 dark:bg-ink-700 dark:text-ink-300',
};

/** A single metric card used across the employee and admin dashboards. */
export default function StatCard({ icon: Icon, label, value, tone = 'signal', className = '' }) {
  return (
    <Card hoverable className={cn('flex items-center justify-between gap-4', className)}>
      <div>
        <p className="text-sm font-medium text-ink-500 dark:text-ink-300">{label}</p>
        <p className="mt-2 font-display text-3xl font-bold text-ink-900 dark:text-white">{value}</p>
      </div>
      <div className={cn('flex h-11 w-11 flex-none items-center justify-center rounded-xl', TONE_CLASSES[tone])}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
    </Card>
  );
}
