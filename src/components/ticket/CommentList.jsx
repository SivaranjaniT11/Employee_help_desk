import { getInitials, formatRelativeTime } from '../../utils/helpers';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';
import { MessageSquare } from 'lucide-react';

/** Renders a ticket's comment thread, oldest first, like a conversation. */
export default function CommentList({ comments = [] }) {
  if (comments.length === 0) {
    return (
      <EmptyState
        icon={MessageSquare}
        title="No comments yet"
        description="Updates and notes from the help desk team will appear here."
      />
    );
  }

  return (
    <ul className="space-y-4">
      {comments.map((comment) => (
        <li key={comment.id} className="flex gap-3">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-signal-100 dark:bg-signal-900/50 text-xs font-semibold text-signal-700 dark:text-signal-200">
            {getInitials(comment.author)}
          </div>
          <div className="flex-1 rounded-xl bg-ink-50 dark:bg-ink-700/60 px-4 py-3">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-ink-800 dark:text-ink-50">{comment.author}</p>
              {comment.role === 'admin' && (
                <Badge tone="signal" className="px-1.5 py-0.5 text-[10px]">
                  Technician
                </Badge>
              )}
              <span className="text-xs text-ink-400">{formatRelativeTime(comment.createdAt)}</span>
            </div>
            <p className="mt-1 text-sm text-ink-600 dark:text-ink-200">{comment.message}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
