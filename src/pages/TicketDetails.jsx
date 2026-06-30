import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';
import {
  ArrowLeft,
  User,
  Hash,
  Building2,
  CalendarPlus,
  CalendarClock,
  Wrench,
  Trash2,
  FileSearch,
} from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { SkeletonDetails } from '../components/common/Skeleton';
import TicketStub from '../components/ticket/TicketStub';
import StatusTimeline from '../components/ticket/StatusTimeline';
import CommentList from '../components/ticket/CommentList';
import CommentForm from '../components/forms/CommentForm';
import ManageTicketForm from '../components/forms/ManageTicketForm';
import { useTickets } from '../hooks/useTickets';
import { useAuth } from '../hooks/useAuth';
import { formatDateTime } from '../utils/helpers';

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-ink-50 dark:bg-ink-700">
        <Icon className="h-4 w-4 text-ink-400" />
      </div>
      <div>
        <p className="text-xs text-ink-400">{label}</p>
        <p className="text-sm font-medium text-ink-800 dark:text-ink-100">{value}</p>
      </div>
    </div>
  );
}

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tickets, isLoading, addComment, changeStatus, assignTechnician, removeTicket } = useTickets();
  const { isAdmin } = useAuth();
  const [isCommenting, setIsCommenting] = useState(false);
  const [isManaging, setIsManaging] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const ticket = tickets.find((t) => t.id === id);

  if (isLoading) {
    return (
      <AppLayout title="Ticket Details">
        <SkeletonDetails />
      </AppLayout>
    );
  }

  if (!ticket) {
    return (
      <AppLayout title="Ticket Details">
        <Card>
          <EmptyState
            icon={FileSearch}
            title="Ticket not found"
            description={`We couldn't find a ticket with id "${id}". It may have been deleted.`}
            actionLabel="Back to tickets"
            onAction={() => navigate('/tickets')}
          />
        </Card>
      </AppLayout>
    );
  }

  const handleAddComment = (data, resetForm) => {
    setIsCommenting(true);
    setTimeout(() => {
      addComment(ticket.id, data);
      resetForm();
      setIsCommenting(false);
      toast.success('Comment added');
    }, 300);
  };

  const handleManage = (data) => {
    setIsManaging(true);
    setTimeout(() => {
      if (data.status !== ticket.status) {
        changeStatus(ticket.id, data.status, `Status updated by admin`);
      }
      if (data.assignedTechnician !== ticket.assignedTechnician) {
        assignTechnician(ticket.id, data.assignedTechnician);
      }
      setIsManaging(false);
      toast.success('Ticket updated', { description: `${ticket.id} has been updated.` });
    }, 300);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      removeTicket(ticket.id);
      setIsDeleting(false);
      setIsDeleteOpen(false);
      toast.success(`Ticket ${ticket.id} deleted`);
      navigate('/admin/tickets');
    }, 300);
  };

  return (
    <AppLayout title={ticket.id} subtitle="Full ticket information and activity">
      <div className="space-y-6">
        <Button variant="ghost" size="sm" icon={ArrowLeft} onClick={() => navigate(-1)}>
          Back
        </Button>

        <TicketStub ticket={ticket} notchSurface="paper" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <h3 className="font-display text-base font-semibold text-ink-900 dark:text-white">Description</h3>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-ink-600 dark:text-ink-200">
                {ticket.description}
              </p>
            </Card>

            <Card>
              <h3 className="font-display text-base font-semibold text-ink-900 dark:text-white mb-4">
                Comments ({ticket.comments.length})
              </h3>
              <CommentList comments={ticket.comments} />
              <div className="mt-5 border-t border-ink-100 dark:border-ink-700 pt-5">
                <CommentForm
                  author={isAdmin ? 'Admin' : ticket.employeeName}
                  role={isAdmin ? 'admin' : 'employee'}
                  onSubmit={handleAddComment}
                  isSubmitting={isCommenting}
                />
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <h3 className="font-display text-base font-semibold text-ink-900 dark:text-white mb-4">
                Ticket Information
              </h3>
              <div className="space-y-4">
                <DetailRow icon={User} label="Employee Name" value={ticket.employeeName} />
                <DetailRow icon={Hash} label="Employee ID" value={ticket.employeeId} />
                <DetailRow icon={Building2} label="Department" value={ticket.department} />
                <DetailRow icon={Wrench} label="Assigned Technician" value={ticket.assignedTechnician} />
                <DetailRow icon={CalendarPlus} label="Created" value={formatDateTime(ticket.createdAt)} />
                <DetailRow icon={CalendarClock} label="Last Updated" value={formatDateTime(ticket.updatedAt)} />
              </div>
            </Card>

            {isAdmin && (
              <Card>
                <h3 className="font-display text-base font-semibold text-ink-900 dark:text-white mb-4">
                  Manage Ticket
                </h3>
                <ManageTicketForm ticket={ticket} onSubmit={handleManage} isSubmitting={isManaging} />
              </Card>
            )}

            <Card>
              <h3 className="font-display text-base font-semibold text-ink-900 dark:text-white mb-4">
                Status Timeline
              </h3>
              <StatusTimeline history={ticket.history} />
            </Card>

            {isAdmin && (
              <Card className="border-coral-200 dark:border-coral-700">
                <h3 className="font-display text-sm font-semibold text-coral-600 dark:text-coral-300">
                  Danger Zone
                </h3>
                <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
                  Permanently delete this ticket. This cannot be undone.
                </p>
                <Button
                  variant="danger"
                  size="sm"
                  icon={Trash2}
                  className="mt-3"
                  onClick={() => setIsDeleteOpen(true)}
                >
                  Delete Ticket
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        loading={isDeleting}
        title={`Delete ${ticket.id}?`}
        description="This will permanently remove the ticket, its comments, and its history. This action cannot be undone."
        confirmLabel="Delete Ticket"
      />
    </AppLayout>
  );
}
