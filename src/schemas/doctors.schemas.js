import { z } from 'zod';

export const doctorSchema = z.object({
    user_id: z.number().int(),
    license_number: z.string().min(1, 'License number is required'),
    created_at: z.coerce.date(),
    
})

export const doctorPutSchema = doctorSchema.partial()