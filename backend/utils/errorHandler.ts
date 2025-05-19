import type { Response } from 'express';
import { logger } from './logger.ts';
import { BadRequestError } from '../errors/badRequest.error.ts';
import { ZodError } from 'zod';
import { fromError } from 'zod-validation-error';
import { NotFoundError } from '../errors/notFound.error.ts';
import { UnauthorizedError } from '../errors/unauthorized.error.ts';

class ErrorHandler {
    public async handleError(error: unknown, responseStream?: Response) {
        if (!responseStream) {
            logger.error('No response stream provided', error);
            return;
        }

        if (error instanceof BadRequestError) {
            logger.info('Bad request error', error);
            return responseStream.status(error.statusCode).json({
                success: false,
                message: error.message,
            });

        } else if (error instanceof NotFoundError) {
            logger.info('Not found request error', error);
            return responseStream.status(error.statusCode).json({
                success: false,
                message: fromError(error.toString()),
            });

        } else if (error instanceof UnauthorizedError) {
            logger.info('Unauthorized request error', error);
            return responseStream.status(error.statusCode).json({
                success: false,
                message: fromError(error.toString()),
            });

        } else if (error instanceof ZodError) {
            logger.info('Zod validation error', error);
            return responseStream.status(400).json({
                success: false,
                message: fromError(error.toString()),
            });

        } else {
            logger.error('An error occurred', error);
            return responseStream.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }


    }
}

export const errorHandler = new ErrorHandler();