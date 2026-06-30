import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CheckCircle2, ArrowRight, FilePlus2 } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import CreateTicketForm from '../components/forms/CreateTicketForm';
import TicketStub from '../components/ticket/TicketStub';
import { useTickets } from '../hooks/useTickets';

export default function CreateTicket() {
  const navigate = useNavigate();
  const { addTicket } = useTickets();
  const [createdTicket, setCreatedTicket] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (data, resetForm) => {
    setIsSubmitting(true);
    // Local Storage writes are synchronous, but a short delay keeps the
    // submit button's loading state feeling intentional rather than instant.
    setTimeout(() => {
      const ticket = addTicket(data);
      setCreatedTicket(ticket);
      resetForm();
      setIsSubmitting(false);
      toast.success(`Ticket ${ticket.id} created`, {
        description: 'Your request has been submitted to the help desk.',
      });
    }, 400);
  };

  if (createdTicket) {
    return (
      <AppLayout title="Create Ticket" subtitle="Submit a new support request">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mint-50 dark:bg-mint-900/30">
            <CheckCircle2 className="h-7 w-7 text-mint-500" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white">Ticket submitted</h2>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
              The help desk team has been notified and will pick this up shortly.
            </p>
          </div>

          <TicketStub ticket={createdTicket} notchSurface="paper" />

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="outline" icon={FilePlus2} onClick={() => setCreatedTicket(null)}>
              Create Another Ticket
            </Button>
            <Button icon={ArrowRight} iconPosition="right" onClick={() => navigate(`/tickets/${createdTicket.id}`)}>
              View Ticket
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Create Ticket" subtitle="Tell us what's going on and we'll route it to the right team">
      <Card className="mx-auto max-w-3xl">
        <CreateTicketForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </Card>
    </AppLayout>
  );
}
