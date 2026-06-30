import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import TicketFilters from '../components/tables/TicketFilters';
import TicketTable from '../components/tables/TicketTable';
import { SkeletonTable } from '../components/common/Skeleton';
import Button from '../components/common/Button';
import { useTickets } from '../hooks/useTickets';
import { useFilteredTickets } from '../hooks/useFilteredTickets';

export default function Tickets() {
  const navigate = useNavigate();
  const { tickets, isLoading } = useTickets();
  const { filters, setFilters, resetFilters, results, totalResults, page, totalPages, pageSize, setPage } =
    useFilteredTickets(tickets, { pageSize: 8 });

  return (
    <AppLayout
      title="My Tickets"
      subtitle="Search, filter, and track every ticket you've submitted"
      actions={
        <Button icon={PlusCircle} size="sm" onClick={() => navigate('/create-ticket')}>
          New Ticket
        </Button>
      }
    >
      <div className="space-y-4">
        <TicketFilters filters={filters} onChange={setFilters} onReset={resetFilters} />

        {isLoading ? (
          <SkeletonTable />
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
