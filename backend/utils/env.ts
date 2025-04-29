import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    APP_NAME: z.string(),
    PORT: z.string().refine((port) => parseInt(port) > 1000 && parseInt(port) < 65535, "Invalid Port Number"),
    NODE_ENV: z.enum(["development", "production"]),
    MONGO_CONNECTION_STRING: z.string(),
    MAILTRAP_API_TOKEN: z.string(),
    MAILTRAP_SENDER_EMAIL: z.string(),
    MAILTRAP_SENDER_NAME: z.string(),
    MAILTRAP_COMPANY_NAME: z.string(),
})

type Env = z.infer<typeof envSchema>;

export const ENV: Env = envSchema.parse(process.env)