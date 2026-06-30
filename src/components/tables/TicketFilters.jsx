import { Search, RotateCcw } from 'lucide-react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { STATUS_ORDER, PRIORITY_ORDER, SORT_OPTIONS } from '../../utils/constants';

const SORT_LABELS = {
  [SORT_OPTIONS.NEWEST]: 'Newest first',
  [SORT_OPTIONS.OLDEST]: 'Oldest first',
};

/**
 * Search + filter + sort toolbar shared by the employee Tickets page
 * and the admin Manage Tickets page. Fully controlled — the parent
 * owns the filter state so it can be combined with role-based scoping.
 */
export default function TicketFilters({ filters, onChange, onReset }) {
  const update = (key) => (event) => onChange({ ...filters, [key]: event.target.value });

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:flex-wrap">
      <div className="flex-1 min-w-[220px]">
        <Input
          placeholder="Search by ticket ID, subject, or employee..."
          icon={Search}
          value={filters.search}
          onChange={update('search')}
          aria-label="Search tickets"
        />
      </div>

      <div className="w-full sm:w-44">
        <Select
          placeholder="All statuses"
          options={STATUS_ORDER}
          value={filters.status}
          onChange={update('status')}
          aria-label="Filter by status"
        />
      </div>

      <div className="w-full sm:w-44">
        <Select
          placeholder="All priorities"
          options={PRIORITY_ORDER}
          value={filters.priority}
          onChange={update('priority')}
          aria-label="Filter by priority"
        />
      </div>

      <div className="w-full sm:w-40">
        <Select
          placeholder="Sort by"
          options={Object.entries(SORT_LABELS).map(([value, label]) => ({ value, label }))}
          value={filters.sort}
          onChange={update('sort')}
          aria-label="Sort tickets"
        />
      </div>

      <Button variant="outline" icon={RotateCcw} onClick={onReset} className="sm:mb-0">
        Reset
      </Button>
    </div>
  );
}
