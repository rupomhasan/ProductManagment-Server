import { z } from 'zod';

export const variantsValidationSchema = z.object({
  type: z.string(),
  value: z.string(),
});

export const inventoryValidationSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

export const productValidationSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(variantsValidationSchema),
  inventory: inventoryValidationSchema,
  slug: z.string().optional()
});
