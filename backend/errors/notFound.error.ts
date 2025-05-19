export class NotFoundError extends Error {
    public statusCode: number;
    public message: string;
    public details?: string;

    constructor(message: string, details?: string) {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404;
        this.message = message;
        this.details = details;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}