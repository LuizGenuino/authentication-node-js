import { z } from "zod";
import { baseSignUpSchema, verifyEmailSchema } from "./auth.schema.ts";

export type SignUpSchemaType = z.infer<typeof baseSignUpSchema>;
export type VerifyEmailSchemaType =   z.infer<typeof verifyEmailSchema>;