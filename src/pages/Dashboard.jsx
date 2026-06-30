import { useNavigate } from 'react-router-dom';
import { Inbox, Loader2, CheckCircle2, Lock, PlusCircle, LayoutGrid } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import StatsGrid from '../components/dashboard/StatsGrid';
import { SkeletonStatsGrid, SkeletonTable } from '../components/common/Skeleton';
import TicketTable from '../components/tables/TicketTable';
import Button from '../components/common/Button';
import { useTickets } from '../hooks/useTickets';
import { TICKET_STATUS } from '../utils/constants';

export default function Dashboard() {
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
  ];

  const recentTickets = [...tickets]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <AppLayout
      title="Dashboard"
      subtitle="Track and manage your support requests"
      actions={
        <Button icon={PlusCircle} size="sm" onClick={() => navigate('/create-ticket')}>
          New Ticket
        </Button>
      }
    >
      <div className="space-y-6">
        {isLoading ? <SkeletonStatsGrid /> : <StatsGrid stats={stats} />}

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-ink-900 dark:text-white">Recent Tickets</h2>
            <button
              onClick={() => navigate('/tickets')}
              className="text-sm font-medium text-signal-500 hover:text-signal-600"
            >
              View all
            </button>
          </div>

          {isLoading ? (
            <SkeletonTable rows={5} columns={6} />
          ) : (
            <TicketTable
              tickets={recentTickets}
              page={1}
              totalPages={1}
              totalItems={recentTickets.length}
              pageSize={5}
              onPageChange={() => {}}
              emptyTitle="No tickets yet"
              emptyDescription="Create your first support ticket to get started."
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
}
