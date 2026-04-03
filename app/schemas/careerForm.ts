import { z } from 'zod';

export const careerForm = z
  .object({
    fullName: z.string().trim().min(2, { message: 'Full name is required' }),
    email: z.string().email({ message: 'Enter a valid email address' }),
    phone: z.preprocess(
      (val) => {
        if (typeof val === 'string' && val.trim() === '') return undefined;
        return typeof val === 'string' ? Number(val) : val;
      },
      z
        .number({
          required_error: 'Enter a valid phone number',
          invalid_type_error: 'Enter a valid phone number',
        })
        .min(1000000000, { message: 'Enter a valid phone number' })
    ),
    nationality: z.string().trim().min(2, { message: 'Provide a nationality' }),
    cityandcountry: z.string().trim().min(2, { message: 'Provide a city and country' }),
    gender: z.enum(['male', 'female', 'other'], { message: 'Provide a gender' }),
    dob: z.preprocess(
      (val) => (typeof val === 'string' ? new Date(val) : val),
      z.date({ message: 'Provide a valid date of birth' })
    ),
    experience: z.preprocess(
      (val) => {
        if (typeof val === 'string' && val.trim() === '') return undefined;
        return typeof val === 'string' ? Number(val) : val;
      },
      z
        .number({
          required_error: 'Experience is required',
          invalid_type_error: 'Experience must be a number',
        })
        .min(0, { message: 'Experience is required' })
    ),
    experienceinconstruction: z.preprocess(
      (val) => {
        if (typeof val === 'string' && val.trim() === '') return undefined;
        return typeof val === 'string' ? Number(val) : val;
      },
      z
        .number({
          required_error: 'Experience is required',
          invalid_type_error: 'Experience must be a number',
        })
        .min(0, { message: 'Experience is required' })
    ),
    experienceinuae: z
      .string({
        required_error: 'This field is required',
        invalid_type_error: 'This field is required',
      })
      .trim()
      .min(1, { message: 'This field is required' }),
    currentposition: z.string().trim().min(1, { message: 'Current position is required' }),
    currentemployer: z.string().trim().min(1, { message: 'Current employer is required' }),
    currentsalary: z.string().trim().min(1, { message: 'Current salary is required' }),
    expectedsalary: z.string().trim().min(1, { message: 'Expected salary is required' }),
    noticeperiod: z.string().trim().min(1, { message: 'Notice period is required' }),
    hasrelative: z.enum(['yes', 'no'], { message: 'Select if you have a relative' }),
    relativeName: z.string().optional(), // will validate conditionally
    haspreviouswork: z.enum(['yes', 'no'], { message: 'This field is required' }),
    hasresponsibilities: z.enum(['yes', 'no'], { message: 'This field is required' }),
    softwares: z.string().trim().min(1, { message: 'List relevant software skills' }),
    companyType: z.string().trim().min(1, { message: 'Company type is required' }),
    skills: z.string().trim().min(3, { message: 'Enter valid skills' }),
    resume: z.string().trim().min(1, { message: 'Resume is required' }),
    coverLetter: z.string().optional(),
    linkedinProfile: z
      .union([
        z.string().url({ message: 'Enter a valid LinkedIn profile URL' }),
        z.literal(''), // allow empty string
      ])
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.hasrelative === 'yes' && (!data.relativeName || data.relativeName.trim() === '')) {
      ctx.addIssue({
        path: ['relativeName'],
        code: z.ZodIssueCode.custom,
        message: 'Relative name is required when you have a relative',
      });
    }
  });
