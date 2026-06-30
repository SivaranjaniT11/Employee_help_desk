import { useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import TicketFilters from '../components/tables/TicketFilters';
import TicketTable from '../components/tables/TicketTable';
import { SkeletonTable } from '../components/common/Skeleton';
import Card from '../components/common/Card';
import { useTickets } from '../hooks/useTickets';
import { useFilteredTickets } from '../hooks/useFilteredTickets';
import { TICKET_STATUS } from '../utils/constants';

/**
 * Admin triage view. Reuses the same search/filter/sort toolbar and
 * table as the employee Tickets page, but clicking through opens the
 * Ticket Details page with the admin "Manage Ticket" panel unlocked —
 * status changes, technician assignment, comments, and closing all
 * happen from that single, consistent place.
 */
export default function ManageTickets() {
  const { tickets, isLoading } = useTickets();
  const { filters, setFilters, resetFilters, results, totalResults, page, totalPages, pageSize, setPage } =
    useFilteredTickets(tickets, { pageSize: 10 });

  const unassignedOpenCount = useMemo(
    () =>
      tickets.filter((t) => t.assignedTechnician === 'Unassigned' && t.status !== TICKET_STATUS.CLOSED).length,
    [tickets]
  );

  return (
    <AppLayout title="Manage Tickets" subtitle="Triage, assign, and resolve incoming support requests">
      <div className="space-y-4">
        {unassignedOpenCount > 0 && (
          <Card className="flex items-center gap-3 border-amber-200 dark:border-amber-700 bg-amber-50/60 dark:bg-amber-900/20">
            <AlertTriangle className="h-4 w-4 flex-none text-amber-500" />
            <p className="text-sm text-amber-700 dark:text-amber-200">
              <span className="font-semibold">{unassignedOpenCount}</span> active ticket
              {unassignedOpenCount === 1 ? '' : 's'} still need a technician assigned.
            </p>
          </Card>
        )}

        <TicketFilters filters={filters} onChange={setFilters} onReset={resetFilters} />

        {isLoading ? (
          <SkeletonTable rows={8} />
        ) : (
          <TicketTable
            tickets={results}
            page={page}
            totalPages={totalPages}
            totalItems={totalResults}
            pageSize={pageSize}
            onPageChange={setPage}
            emptyTitle="No matching tickets"
            emptyDescription="Try a different search term or clear your filters."
          />
        )}
      </div>
    </AppLayout>
  );
}
