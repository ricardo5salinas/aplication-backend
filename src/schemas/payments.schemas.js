import { z } from 'zod';

export const paymentSchema = z.object({
    amount: z.coerce.number().positive().multipleOf(0.01),
    payment_date: z.coerce.date(),
    payment_method_id: z.number().int(),
})

export const paymentPutSchema = paymentSchema.partial()