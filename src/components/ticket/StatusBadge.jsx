import { Circle, Loader2, CheckCircle2, Lock } from 'lucide-react';
import Badge from '../common/Badge';
import { STATUS_TONE, TICKET_STATUS } from '../../utils/constants';

const STATUS_ICONS = {
  [TICKET_STATUS.OPEN]: Circle,
  [TICKET_STATUS.IN_PROGRESS]: Loader2,
  [TICKET_STATUS.RESOLVED]: CheckCircle2,
  [TICKET_STATUS.CLOSED]: Lock,
};

/** Renders a ticket's status as a colored badge with a matching icon. */
export default function StatusBadge({ status, className = '' }) {
  const Icon = STATUS_ICONS[status] ?? Circle;
  const tone = STATUS_TONE[status] ?? 'ink';

  return (
    <Badge tone={tone} className={className}>
      <Icon className={`h-3 w-3 ${status === TICKET_STATUS.IN_PROGRESS ? 'animate-spin' : ''}`} aria-hidden="true" />
      {status}
    </Badge>
  );
}
