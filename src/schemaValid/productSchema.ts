import { z } from 'zod';

const productSchema = z.object({
  title: z.string().min(1, { message: 'Required' }),
  price: z.number().min(1, { message: 'Required' }),
  description: z.string().min(5).max(100).optional(),
  thumbnail: z.any().optional(),
});

export default productSchema;
