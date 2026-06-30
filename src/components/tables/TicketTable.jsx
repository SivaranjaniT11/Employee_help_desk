import { useNavigate } from 'react-router-dom';
import { ChevronRight, Inbox } from 'lucide-react';
import TicketIdPill from '../ticket/TicketIdPill';
import StatusBadge from '../ticket/StatusBadge';
import PriorityBadge from '../ticket/PriorityBadge';
import EmptyState from '../common/EmptyState';
import Pagination from './Pagination';
import { formatDate, truncate } from '../../utils/helpers';

/**
 * Ticket data table. Renders as a proper <table> on medium screens and
 * up, and collapses into a stack of cards on small screens so nothing
 * gets cut off or requires horizontal scrolling on a phone.
 */
export default function TicketTable({
  tickets,
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  emptyTitle = 'No tickets found',
  emptyDescription = 'Try adjusting your search or filters.',
}) {
  const navigate = useNavigate();
  const goToTicket = (id) => navigate(`/tickets/${id}`);

  if (tickets.length === 0) {
    return (
      <div className="rounded-xl2 border border-ink-100 dark:border-ink-700 bg-white dark:bg-ink-800">
        <EmptyState icon={Inbox} title={emptyTitle} description={emptyDescription} />
      </div>
    );
  }

  return (
    <div className="rounded-xl2 border border-ink-100 dark:border-ink-700 bg-white dark:bg-ink-800 overflow-hidden">
      {/* Desktop / tablet table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink-100 dark:border-ink-700 bg-ink-50/60 dark:bg-ink-900/40">
            <tr>
              <th className="px-4 py-3 font-medium text-ink-500 dark:text-ink-300">Ticket</th>
              <th className="px-4 py-3 font-medium text-ink-500 dark:text-ink-300">Subject</th>
              <th className="px-4 py-3 font-medium text-ink-500 dark:text-ink-300">Employee</th>
              <th className="px-4 py-3 font-medium text-ink-500 dark:text-ink-300">Priority</th>
              <th className="px-4 py-3 font-medium text-ink-500 dark:text-ink-300">Status</th>
              <th className="px-4 py-3 font-medium text-ink-500 dark:text-ink-300">Created</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100 dark:divide-ink-700">
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                onClick={() => goToTicket(ticket.id)}
                className="cursor-pointer transition-colors hover:bg-signal-50/60 dark:hover:bg-ink-700/40"
              >
                <td className="px-4 py-3">
                  <TicketIdPill id={ticket.id} />
                </td>
                <td className="px-4 py-3 text-ink-800 dark:text-ink-100">{truncate(ticket.subject, 48)}</td>
                <td className="px-4 py-3 text-ink-600 dark:text-ink-300">{ticket.employeeName}</td>
                <td className="px-4 py-3">
                  <PriorityBadge priority={ticket.priority} />
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={ticket.status} />
                </td>
                <td className="px-4 py-3 text-ink-500 dark:text-ink-400">{formatDate(ticket.createdAt)}</td>
                <td className="px-4 py-3 text-right">
                  <ChevronRight className="h-4 w-4 text-ink-300" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="divide-y divide-ink-100 dark:divide-ink-700 md:hidden">
        {tickets.map((ticket) => (
          <button
            key={ticket.id}
            onClick={() => goToTicket(ticket.id)}
            className="flex w-full flex-col gap-2 px-4 py-4 text-left active:bg-ink-50 dark:active:bg-ink-700/50"
          >
            <div className="flex items-center justify-between">
              <TicketIdPill id={ticket.id} />
              <ChevronRight className="h-4 w-4 text-ink-300" />
            </div>
            <p className="text-sm font-medium text-ink-800 dark:text-ink-100">{truncate(ticket.subject, 56)}</p>
            <p className="text-xs text-ink-500 dark:text-ink-400">
              {ticket.employeeName} · {formatDate(ticket.createdAt)}
            </p>
            <div className="flex items-center gap-2">
              <StatusBadge status={ticket.status} />
              <PriorityBadge priority={ticket.priority} />
            </div>
          </button>
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
}
