import { z } from 'zod';

export const contactForm = z.object({
    name: z.string().trim().min(2, { message: 'Name is required' }),
    email: z.string().email(),
    subject: z.string().trim().min(5, { message: 'Subject is required' }),
    message: z.string().trim().min(10, { message: 'Message is required' }),
  });