import * as ReplyHelpers from "../Helpers/ReplyHelpers.js";
import { FastifyRequest, FastifyReply } from "fastify";

let authRegex = /(?<=Basic\s+)\S+/;

export default class BasicAuthMiddleware {
    public static handle(request: FastifyRequest, reply: FastifyReply, done: Function): void {
        if (!request.headers.authorization) {
            return ReplyHelpers.error(reply, 401, 'Unauthorized');
        }

        const basic: string|null = request.headers.authorization.match(authRegex)?.[0] ?? null;

        if (!basic) {
            return ReplyHelpers.error(reply, 401, 'Unauthorized');
        }

        const password: string = Buffer.from(basic, 'base64').toString('utf-8').split(':')[1];

        if (password !== request.routeConfig.sharedKey) {
            return ReplyHelpers.error(reply, 401, 'Unauthorized');
        }

        done();
    }
}