import mongoose from "mongoose";
import { ENV } from "./env.ts";
import { logger } from "./logger.ts";

export async function connectToDatabase() {
    try {
        const mongodb = await mongoose.connect(ENV.MONGO_CONNECTION_STRING)
        logger.info(`Connected to MongoDB: ${mongodb.connection.host}`);
        
    } catch (error) {
        logger.info("Error connecting to MongoDB", error);
        process.exit(1)
    }
}