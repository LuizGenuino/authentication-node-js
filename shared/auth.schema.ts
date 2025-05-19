import 'dotenv/config';
import { z} from 'zod';

const MIN_PASSWORD_LENGTH = Number(process.env.MIN_PASSWORD_LENGTH || "8");

export const baseSignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(MIN_PASSWORD_LENGTH, {message: 'Password must be at least 8 characters long'}),
    name: z.string().min(3, {message: 'Name is required'}),
    confirmPassword: z.string().min(MIN_PASSWORD_LENGTH, {message: 'Confirm password must be at least 8 characters long'}),
});

export const signUpSchema = baseSignUpSchema.refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match', path: ['confirmPassword'],
});

export const verifyEmailSchema = z.object({
    verificationToken: z.string().min(6).max(6),
})