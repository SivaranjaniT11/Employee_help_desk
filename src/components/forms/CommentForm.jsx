import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { commentSchema } from '../../utils/validators';
import Textarea from '../common/Textarea';
import Button from '../common/Button';

/**
 * Comment form used on the Ticket Details page. `author` and `role`
 * are supplied by the parent (the active employee or admin identity)
 * so the person only has to type the message itself.
 */
export default function CommentForm({ author, role = 'employee', onSubmit, isSubmitting = false }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: { author, message: '' },
  });

  const submitHandler = (data) => {
    onSubmit({ ...data, author, role }, reset);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-3" noValidate>
      <Textarea
        label="Add a comment"
        placeholder={role === 'admin' ? 'Post an update for the employee...' : 'Ask a question or add details...'}
        rows={3}
        error={errors.message?.message}
        {...register('message')}
      />
      <div className="flex justify-end">
        <Button type="submit" size="sm" icon={Send} loading={isSubmitting}>
          Post Comment
        </Button>
      </div>
    </form>
  );
}
