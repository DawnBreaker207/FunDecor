import { z } from 'zod';

const signupSchema = z.object({
  email: z.string().email().min(1, { message: 'Required' }),
  password: z.string().min(6, { message: 'Required' }).max(100),
  confirmPass: z.string().min(6),
});
const signinSchema = z.object({
  email: z.string().email().min(1, { message: 'Required' }),
  password: z.string().min(5, { message: 'Required' }).max(100),
});
export { signinSchema, signupSchema };
