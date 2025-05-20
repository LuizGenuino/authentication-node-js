import { z } from "zod";
import { baseSignUpSchema, forgotPasswordSchema, signInSchema, verifyEmailSchema } from "./auth.schema.ts";

export type SignUpSchemaType = z.infer<typeof baseSignUpSchema>;
export type VerifyEmailSchemaType =   z.infer<typeof verifyEmailSchema>;
export type SignInSchemaType = z.infer<typeof signInSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;