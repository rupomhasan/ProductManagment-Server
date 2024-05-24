import { string, z } from "zod";

export const orderValidationSchema = z.object({
    productId: z.string(),
    email: z.string().email().trim(),
    price: z.number().nonnegative(),
    quantity: z.number().int().positive(),
    address: z.string().min(1),
    dateTime: z.string().optional()
});