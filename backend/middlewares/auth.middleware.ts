import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger.ts';
import { BadRequestError } from '../errors/badRequest.error.ts';
import { ENV } from '../utils/env.ts';
import { UnauthorizedError } from '../errors/unauthorized.error.ts';

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies[ENV.JWT_COOKIE_NAME];

    if (!token) {
        logger.info('No token provided');
        throw new UnauthorizedError('Unauthorized access');
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET_KEY);

    if (!decoded) {
        logger.info('Invalid token provided');
        throw new UnauthorizedError('Unauthorized access');
    }

    req.userId = (decoded as jwt.JwtPayload).userId;

    next();
}