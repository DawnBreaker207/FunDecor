import { z } from 'zod';

const categorySchema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  description: z.string().min(5).max(100).optional(),
});

export default categorySchema;
