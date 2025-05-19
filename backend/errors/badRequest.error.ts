export class BadRequestError extends Error {
    public statusCode: number;
    public message: string;
    public details?: string;

    constructor(message: string, details?: string) {
        super(message);
        this.name = "BadRequestError";
        this.statusCode = 400;
        this.message = message;
        this.details = details;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}