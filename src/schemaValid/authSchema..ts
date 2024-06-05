import { z } from 'zod';

const signupSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().min(1, { message: 'Required' }),
  password: z.string().min(5, { message: 'Required' }).max(100),
});
const signinSchema = z.object({
  email: z.string().min(1, { message: 'Required' }),
  password: z.string().min(5, { message: 'Required' }).max(100),
});
export { signinSchema, signupSchema };
