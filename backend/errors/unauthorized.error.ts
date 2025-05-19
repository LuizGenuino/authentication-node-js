export class UnauthorizedError extends Error {
    public statusCode: number;
    public message: string;
    public details?: string;

    constructor(message: string, details?: string) {
        super(message);
        this.name = "UnauthorizedError";
        this.statusCode = 401;
        this.message = message;
        this.details = details;
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}