import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const proofOfTransferSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Please enter a valid amount'),
  referenceNumber: z.string().min(3, 'Reference number is required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date (YYYY-MM-DD)'),
});

export const volunteerSignupSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  interests: z.array(z.string()).min(1, 'Please select at least one interest'),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ProofOfTransferData = z.infer<typeof proofOfTransferSchema>;
export type VolunteerSignupData = z.infer<typeof volunteerSignupSchema>;
