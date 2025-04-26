import mongoose from "mongoose";
import { ENV } from "./env.ts";

export async function connectToDatabase() {
    try {
        const mongodb = await mongoose.connect(ENV.MONGO_CONNECTION_STRING)
        console.log(`Connected to MongoDB: ${mongodb.connection.host}`);
        
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
        process.exit(1)
    }
}