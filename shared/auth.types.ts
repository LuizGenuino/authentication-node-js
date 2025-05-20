import { z } from "zod";
import { baseResetPasswordSchema, baseSignUpSchema, forgotPasswordSchema, signInSchema, verifyEmailSchema } from "./auth.schema.ts";

export type SignUpSchemaType = z.infer<typeof baseSignUpSchema>;
export type VerifyEmailSchemaType =   z.infer<typeof verifyEmailSchema>;
export type SignInSchemaType = z.infer<typeof signInSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchemaType = z.infer<typeof baseResetPasswordSchema>;