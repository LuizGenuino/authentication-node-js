import type { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import type { ZodSchema } from "zod";


type RequestSection = "body" | "params" | "query";

export const validateSchema = (schema: ZodSchema, requestSection: RequestSection) =>
    asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
            if (!["body", "params", "query"].includes(requestSection)) {
                throw new Error("Invalid request section");
            }
            schema.parse(req[requestSection]);
            next();
    })
