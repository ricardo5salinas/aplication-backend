import { z } from 'zod';

export const userSchema = z.object({
    identity_card: z.string().min(1, 'Identity card is required'),
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    role_id: z.number().int(),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    address: z.string().optional(),
    phone: z.string().optional(),
})

export const userPutSchema = userSchema.partial()