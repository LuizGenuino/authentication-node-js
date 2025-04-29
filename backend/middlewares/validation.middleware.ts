import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import { fromError } from "zod-validation-error";

type RequestSection = "body" | "params" | "query";

export const validateSchema = (schema: ZodSchema, requestSection: RequestSection) =>
    (req: Request, res: Response, next: NextFunction): void => {
        try {
            if (!["body", "params", "query"].includes(requestSection)) {
                res.status(400).json({ success: false, message: "Invalid Request Section" });
                return;
            }

            schema.parse(req[requestSection]);
            next();
        } catch (error) {
            const message = fromError(error).toString();
            res.status(400).json({ success: false, message });
        }
    };
