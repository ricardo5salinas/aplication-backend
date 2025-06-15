import { z } from 'zod';

export const appointmentSchema = z.object({
    date: z.coerce.date(),
    patient_id: z.number().int(),
    doctor_id: z.number().int(),
    payment_id: z.number().int(),
    status: z.enum(['pending', 'completed', 'cancelled']).default('pending'),
    medication_id: z.number().int().optional(),
})

export const appointmentPutSchema = appointmentSchema.partial()