import { z } from 'zod';

export const contactForm = z.object({
    name: z.string().trim().min(2, { message: 'Name is required' }),
    email: z.string().email(),
    subject: z.string().trim().min(5, { message: 'Subject is required' }),
    message: z.string().trim().min(1, { message: 'Message is required' }),
  });

  export const contactFormHome = z.object({
    name: z.string().trim().min(2, { message: 'Name is required' }),
    email: z.string().email(),
    message: z.string().trim().min(1, { message: 'Message is required' }),
    phone: z
    .string()
    .trim()
    .regex(/^\d+$/, { message: 'Phone must contain only numbers' })
  });