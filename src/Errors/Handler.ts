import { FastifyReply, FastifyRequest } from "fastify";

export default class Handler {
    public static handle(error: Error, request: FastifyRequest, reply: FastifyReply): void {
        reply.status(500).send({ 
            code: 500,
            message: 'Internal Server Error',
            timestamp: Date.now(), 
        });
    }
}