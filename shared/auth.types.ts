import { z } from "zod";
import { baseSignUpSchema } from "./auth.schema.ts";

export type SignUpSchemaType = z.infer<typeof baseSignUpSchema>;