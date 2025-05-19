//ignorar typescript
// @ts-nocheck
// @ts-ignore
import jwt from "jsonwebtoken";
import { ENV } from "./env.ts";
import type { Response } from "express";

const JWT_EXPIRATION_TIME: string = ENV.JWT_EXPIRATION_TIME || "1d"; // Default to 1 hour if not set

export const generateJWT = (userId: string): string => {
  return jwt.sign({ userId }, ENV.JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRATION_TIME || "1d"
  });
};

export const setTokenCookie = (res: Response, token: string): void => {
  res.cookie(ENV.JWT_COOKIE_NAME, token, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    maxAge: Number(ENV.JWT_COOKIE_MAX_AGE_IN_MS),
  });
}

export const generateVerificationToken = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const calculateTokenExpiry = (hours: number): Date => {
    return new Date(Date.now() + hours * 60 * 60 * 1000);
}