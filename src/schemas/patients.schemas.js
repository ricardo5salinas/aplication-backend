import { z } from 'zod';

export const patientSchema = z.object({
    identity_card: z.string().min(1, 'Identity card is required'),
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    birth_date: z.coerce.date().refine(date => date < new Date(), {
    message: 'La fecha de nacimiento debe estar en el pasado'
}),
    address: z.string().optional(),
    phone: z.string().optional(),
})

export const patientPutSchema = patientSchema.partial()