import {z} from 'zod';

export const baseSignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: 'Password must be at least 8 characters long'}),
    name: z.string().min(3, {message: 'Name is required'}),
    confirmPassword: z.string().min(8, {message: 'Confirm password must be at least 8 characters long'}),
});

export const signUpSchema = baseSignUpSchema.refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match', path: ['confirmPassword'],
});