import morgan from "morgan";
import { logger } from "../utils/logger.ts";

export const morganMiddleware = morgan(
    function (tokens, req, res) {
        return JSON.stringify({
            method: tokens.method(req, res),
            url: tokens.url(req, res),
            status: tokens.status(req, res),
            content_length: tokens.res(req, res, "content-length"),
            response_time: Number.parseFloat(
                tokens["response-time"]?.(req, res) ?? ""
            ),
        });
    },
    {
        stream: {
            write: (message) => {
                const data = JSON.parse(message);
                logger.http('incoming request', data);
            },
        },
    }  
);
