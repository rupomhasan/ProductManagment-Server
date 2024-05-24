import { z } from "zod";

export const OrderSchema = z.object({
    email: z.string().email().trim(),
    price: z.number().nonnegative(),
    quantity: z.number().int().positive(),
    address: z.string().min(1),
    dateTime: z.string().optional().refine((val: any) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    })
});