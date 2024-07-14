import { z } from 'zod';

const SignUpSchema = z
  .object({
    email: z.string().email().min(1, { message: 'Required' }),
    password: z.string().min(6, { message: 'Required' }).max(100),
    confirmPass: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: 'Password not match',
    path: ['confirmPass'],
  });
const SignInSchema = z.object({
  email: z.string().email().min(1, { message: 'Required' }),
  password: z.string().min(5, { message: 'Required' }).max(100),
});
export { SignInSchema, SignUpSchema };
