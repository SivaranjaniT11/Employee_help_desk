import { z } from 'zod';
import { DEPARTMENTS, TICKET_PRIORITY } from './constants';

// Schema for the "Create Ticket" form (React Hook Form + zodResolver).
export const createTicketSchema = z.object({
  employeeName: z
    .string()
    .trim()
    .min(2, 'Employee name must be at least 2 characters')
    .max(60, 'Employee name is too long'),
  employeeId: z
    .string()
    .trim()
    .min(2, 'Employee ID is required')
    .max(20, 'Employee ID is too long')
    .regex(/^[A-Za-z0-9-]+$/, 'Use letters, numbers, and dashes only'),
  department: z
    .string()
    .min(1, 'Please select a department')
    .refine((val) => DEPARTMENTS.includes(val), 'Please select a valid department'),
  priority: z
    .string()
    .min(1, 'Please select a priority')
    .refine((val) => Object.values(TICKET_PRIORITY).includes(val), 'Please select a valid priority'),
  subject: z
    .string()
    .trim()
    .min(5, 'Subject must be at least 5 characters')
    .max(120, 'Subject must be under 120 characters'),
  description: z
    .string()
    .trim()
    .min(20, 'Please describe the issue in at least 20 characters')
    .max(2000, 'Description must be under 2000 characters'),
});

// Schema for adding a comment to a ticket (employee or admin).
export const commentSchema = z.object({
  author: z.string().trim().min(2, 'Name is required').max(60, 'Name is too long'),
  message: z
    .string()
    .trim()
    .min(2, 'Comment cannot be empty')
    .max(1000, 'Comment must be under 1000 characters'),
});

// Schema for the admin "manage ticket" panel (status + technician assignment).
export const manageTicketSchema = z.object({
  status: z.string().min(1, 'Please select a status'),
  assignedTechnician: z.string().min(1, 'Please select a technician'),
});
