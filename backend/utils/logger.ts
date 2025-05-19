import winston from "winston";
import { ENV } from "./env.ts";

const metaKeyFormat = winston.format((info) => {
    const defaultMetaKeys = ["level", "message", "timestamp", "app", "env"];
    
    const customMeta = Object.keys(info).filter((key) => !defaultMetaKeys.includes(key)).reduce((acc, key) => {
        acc[key] = info[key];
        delete info[key];
        return acc;
    }, {} as Record<string, any>);

    if (Object.keys(customMeta).length > 0) {
        info.meta = customMeta;
    }
    return info;
});

export const logger = winston.createLogger({
    level: ENV.LOG_LEVEL || "info",
    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss.SSS A"
        }),
        winston.format.errors({ stack: true }),
        metaKeyFormat(),
        winston.format.json()
    ),
    defaultMeta: { app: ENV.APP_NAME || "MyApp", env: ENV.NODE_ENV || "development" },
    transports: [
        new winston.transports.Console({
            forceConsole: true,
        }),
    ],
});
