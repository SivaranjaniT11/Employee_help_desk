import { useNavigate } from 'react-router-dom';
import { Inbox, Loader2, CheckCircle2, Lock, LayoutGrid, Flame, Wrench, BarChart3 } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import StatsGrid from '../components/dashboard/StatsGrid';
import { SkeletonStatsGrid, SkeletonTable } from '../components/common/Skeleton';
import TicketTable from '../components/tables/TicketTable';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useTickets } from '../hooks/useTickets';
import { TICKET_STATUS, TICKET_PRIORITY } from '../utils/constants';

/**
 * Admin landing page. Mirrors the employee dashboard's stat-card pattern
 * but adds the one number admins specifically care about at a glance —
 * how many tickets are currently flagged High or Urgent priority.
 */
export default function AdminDashboard() {
  const navigate = useNavigate();
  const { tickets, isLoading } = useTickets();

  const stats = [
    { label: 'Total Tickets', value: tickets.length, icon: LayoutGrid, tone: 'signal' },
    {
      label: 'Open',
      value: tickets.filter((t) => t.status === TICKET_STATUS.OPEN).length,
      icon: Inbox,
      tone: 'signal',
    },
    {
      label: 'In Progress',
      value: tickets.filter((t) => t.status === TICKET_STATUS.IN_PROGRESS).length,
      icon: Loader2,
      tone: 'amber',
    },
    {
      label: 'Resolved',
      value: tickets.filter((t) => t.status === TICKET_STATUS.RESOLVED).length,
      icon: CheckCircle2,
      tone: 'mint',
    },
    {
      label: 'Closed',
      value: tickets.filter((t) => t.status === TICKET_STATUS.CLOSED).length,
      icon: Lock,
      tone: 'ink',
    },
    {
      label: 'High Priority',
      value: tickets.filter(
        (t) => t.priority === TICKET_PRIORITY.HIGH || t.priority === TICKET_PRIORITY.URGENT
      ).length,
      icon: Flame,
      tone: 'coral',
    },
  ];

  const queue = [...tickets]
    .filter((t) => t.status !== TICKET_STATUS.CLOSED)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 6);

  return (
    <AppLayout
      title="Admin Dashboard"
      subtitle="A bird's-eye view of every open support request"
      actions={
        <Button variant="outline" icon={BarChart3} size="sm" onClick={() => navigate('/admin/analytics')}>
          View Analytics
        </Button>
      }
    >
      <div className="space-y-6">
        {isLoading ? <SkeletonStatsGrid count={6} /> : <StatsGrid stats={stats} />}

        <Card className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-display text-base font-semibold text-ink-900 dark:text-white">
              Manage the active queue
            </h3>
            <p className="text-sm text-ink-500 dark:text-ink-300">
              Update statuses, assign technicians, and close out resolved requests.
            </p>
          </div>
          <Button icon={Wrench} size="sm" onClick={() => navigate('/admin/tickets')}>
            Open Manage Tickets
          </Button>
        </Card>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-ink-900 dark:text-white">
              Recently Updated
            </h2>
            <button
              onClick={() => navigate('/admin/tickets')}
              className="text-sm font-medium text-signal-500 hover:text-signal-600"
            >
              View all
            </button>
          </div>

          {isLoading ? (
            <SkeletonTable rows={6} columns={6} />
          ) : (
            <TicketTable
              tickets={queue}
              page={1}
              totalPages={1}
              totalItems={queue.length}
              pageSize={6}
              onPageChange={() => {}}
              emptyTitle="Queue is clear"
              emptyDescription="There are no open or in-progress tickets right now."
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
}
