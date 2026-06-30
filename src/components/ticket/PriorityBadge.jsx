import Badge from '../common/Badge';
import { PRIORITY_TONE } from '../../utils/constants';

/** Renders a ticket's priority as a colored dot badge. */
export default function PriorityBadge({ priority, className = '' }) {
  const tone = PRIORITY_TONE[priority] ?? 'ink';

  return (
    <Badge tone={tone} dot className={className}>
      {priority}
    </Badge>
  );
}
