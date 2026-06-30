import { useMemo, useState } from 'react';
import { SORT_OPTIONS } from '../utils/constants';
import { useDebounce } from './useDebounce';

const DEFAULT_FILTERS = { search: '', status: '', priority: '', sort: SORT_OPTIONS.NEWEST };

/**
 * Shared search + filter + sort + pagination logic used by both the
 * employee Tickets page and the admin Manage Tickets page, so the two
 * don't reimplement the same filtering rules twice.
 */
export function useFilteredTickets(tickets, { pageSize = 8 } = {}) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(filters.search, 250);

  const filtered = useMemo(() => {
    let result = [...tickets];

    if (debouncedSearch.trim()) {
      const query = debouncedSearch.trim().toLowerCase();
      result = result.filter(
        (ticket) =>
          ticket.id.toLowerCase().includes(query) ||
          ticket.subject.toLowerCase().includes(query) ||
          ticket.employeeName.toLowerCase().includes(query)
      );
    }

    if (filters.status) {
      result = result.filter((ticket) => ticket.status === filters.status);
    }

    if (filters.priority) {
      result = result.filter((ticket) => ticket.priority === filters.priority);
    }

    result.sort((a, b) => {
      const diff = new Date(b.createdAt) - new Date(a.createdAt);
      return filters.sort === SORT_OPTIONS.OLDEST ? -diff : diff;
    });

    return result;
  }, [tickets, debouncedSearch, filters.status, filters.priority, filters.sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const updateFilters = (next) => {
    setFilters(next);
    setPage(1);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  };

  return {
    filters,
    setFilters: updateFilters,
    resetFilters,
    results: paginated,
    totalResults: filtered.length,
    page: safePage,
    totalPages,
    pageSize,
    setPage,
  };
}
