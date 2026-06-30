import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { manageTicketSchema } from '../../utils/validators';
import { STATUS_ORDER, TECHNICIANS } from '../../utils/constants';
import Select from '../common/Select';
import Button from '../common/Button';

/**
 * Admin-only control panel for moving a ticket through the workflow
 * and assigning ownership. Used inside Manage Tickets and on the
 * Ticket Details page when viewed as an admin.
 */
export default function ManageTicketForm({ ticket, onSubmit, isSubmitting = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(manageTicketSchema),
    defaultValues: {
      status: ticket.status,
      assignedTechnician: ticket.assignedTechnician,
    },
  });

  const submitHandler = (data) => onSubmit(data);

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4" noValidate>
      <Select
        label="Status"
        options={STATUS_ORDER}
        required
        error={errors.status?.message}
        {...register('status')}
      />
      <Select
        label="Assigned Technician"
        options={TECHNICIANS}
        required
        error={errors.assignedTechnician?.message}
        {...register('assignedTechnician')}
      />
      <div className="flex justify-end pt-1">
        <Button type="submit" icon={Save} loading={isSubmitting} size="sm">
          Save Changes
        </Button>
      </div>
    </form>
  );
}
