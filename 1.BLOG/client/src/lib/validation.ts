import {z} from 'zod';

export const authSchema = z.object({
    name: z.string().min(3).max(50,"Must be 5 or fewer characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6,"Must be 6 or more characters long").max(50),
})