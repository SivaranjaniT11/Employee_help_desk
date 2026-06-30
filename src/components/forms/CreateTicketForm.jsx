import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, User, Hash } from 'lucide-react';
import { createTicketSchema } from '../../utils/validators';
import { DEPARTMENTS, TICKET_PRIORITY } from '../../utils/constants';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';
import Button from '../common/Button';

const PRIORITY_OPTIONS = Object.values(TICKET_PRIORITY);

/**
 * Ticket creation form. Validation is handled entirely by the shared
 * Zod schema in utils/validators.js, so the same rules can be reused
 * anywhere else the same data shape needs validating.
 */
export default function CreateTicketForm({ onSubmit, isSubmitting = false }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      employeeName: '',
      employeeId: '',
      department: '',
      priority: '',
      subject: '',
      description: '',
    },
  });

  const submitHandler = (data) => {
    onSubmit(data, reset);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Employee Name"
          placeholder="e.g. Aarav Mehta"
          icon={User}
          required
          error={errors.employeeName?.message}
          {...register('employeeName')}
        />
        <Input
          label="Employee ID"
          placeholder="e.g. EMP-204"
          icon={Hash}
          required
          error={errors.employeeId?.message}
          {...register('employeeId')}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Select
          label="Department"
          placeholder="Select your department"
          required
          options={DEPARTMENTS}
          error={errors.department?.message}
          {...register('department')}
        />
        <Select
          label="Priority"
          placeholder="Select priority"
          required
          options={PRIORITY_OPTIONS}
          error={errors.priority?.message}
          {...register('priority')}
        />
      </div>

      <Input
        label="Subject"
        placeholder="A short summary of the issue"
        required
        error={errors.subject?.message}
        {...register('subject')}
      />

      <Textarea
        label="Description"
        placeholder="Describe what happened, what you expected, and any steps to reproduce it."
        rows={6}
        required
        hint="Minimum 20 characters — the more detail, the faster this gets resolved."
        error={errors.description?.message}
        {...register('description')}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button type="submit" icon={Send} loading={isSubmitting}>
          Submit Ticket
        </Button>
      </div>
    </form>
  );
}
