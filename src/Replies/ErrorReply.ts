export default class ErrorReply {
    private statusCode: number;
    private message: string;

    constructor(statusCode: number, message: string) {
        this.statusCode = statusCode;
        this.message = message;
    }

    public toJSON(): object {
        return {
            code: this.statusCode,
            message: this.message,
            timestamp: Date.now(),
        };
    }
}