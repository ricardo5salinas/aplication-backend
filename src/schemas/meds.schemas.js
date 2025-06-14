import { z } from 'zod';

export const medSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    dosage: z.string().min(1, 'Dosage is required'),
    category_id: z.number().int(),
})

export const medPutSchema = medSchema.partial()