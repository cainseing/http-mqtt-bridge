import ErrorReply from "../Replies/ErrorReply.js";
import { FastifyReply } from "fastify";

const error = (reply: FastifyReply, statusCode: number, message: string): void => {
    reply.status(statusCode).send(new ErrorReply(statusCode, message));
}

export { error }