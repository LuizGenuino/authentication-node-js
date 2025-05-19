import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    APP_NAME: z.string(),
    PORT: z.string().refine((port) => parseInt(port) > 1000 && parseInt(port) < 65535, "Invalid Port Number"),
    NODE_ENV: z.enum(["development", "production"]),
    LOG_LEVEL: z.enum(["error", "warn", "info", "http", "debug"]).optional(),
    MONGO_CONNECTION_STRING: z.string(),
    MAILTRAP_API_TOKEN: z.string(),
    MAILTRAP_SENDER_EMAIL: z.string(),
    MAILTRAP_SENDER_NAME: z.string(),
    MAILTRAP_COMPANY_NAME: z.string(),
    JWT_SECRET_KEY: z.string(),
    JWT_EXPIRATION_TIME: z.string(),
    JWT_COOKIE_NAME: z.string(),
    JWT_COOKIE_MAX_AGE_IN_MS: z.string().refine((time) => parseInt(time) > 0, "Invalid JWT Cookie Expiration Time"),
    BCRYPT_SALT_ROUNDS: z.string().refine((rounds) => parseInt(rounds) > 0 && parseInt(rounds) < 15, "Invalid Bcrypt Salt Rounds"),
    MIN_PASSWORD_LENGTH: z.string().refine((length) => parseInt(length) >= 8, "Invalid Minimum Password Length"),

})

type Env = z.infer<typeof envSchema>;

export const ENV: Env = envSchema.parse(process.env)