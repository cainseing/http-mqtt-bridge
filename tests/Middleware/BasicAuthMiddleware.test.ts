import { beforeEach, describe, expect, it, vi } from "vitest";
import BasicAuthMiddleware from "../../src/Middleware/BasicAuthMiddleware.js";
import ErrorReply from "../../src/Replies/ErrorReply.js";

describe("BasicAuthMiddleware", () => {
    let reply: any;
    let done: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        const send = vi.fn();
        const status = vi.fn(() => ({ send }));

        reply = {
            status,
            send,
        };

        done = vi.fn();
    });

    it("returns 401 when authorization header is missing", () => {
        const request = {
            headers: {},
            routeOptions: { config: { sharedKey: "secret" } },
        } as any;

        BasicAuthMiddleware.handle(request, reply, done);

        expect(reply.status).toHaveBeenCalledWith(401);
        expect(reply.send).toHaveBeenCalled();
        expect(reply.send.mock.calls[0][0]).toBeInstanceOf(ErrorReply);
        expect(done).not.toHaveBeenCalled();
    });

    it("returns 401 when authorization header is malformed", () => {
        const request = {
            headers: { authorization: "Bearer abc123" },
            routeOptions: { config: { sharedKey: "secret" } },
        } as any;

        BasicAuthMiddleware.handle(request, reply, done);

        expect(reply.status).toHaveBeenCalledWith(401);
        expect(reply.send).toHaveBeenCalled();
        expect(reply.send.mock.calls[0][0]).toBeInstanceOf(ErrorReply);
        expect(done).not.toHaveBeenCalled();
    });

    it("returns 401 when password is incorrect", () => {
        const invalidCredentials = Buffer.from("user:wrong", "utf-8").toString("base64");
        const request = {
            headers: { authorization: `Basic ${invalidCredentials}` },
            routeOptions: { config: { sharedKey: "secret" } },
        } as any;

        BasicAuthMiddleware.handle(request, reply, done);

        expect(reply.status).toHaveBeenCalledWith(401);
        expect(reply.send).toHaveBeenCalled();
        expect(reply.send.mock.calls[0][0]).toBeInstanceOf(ErrorReply);
        expect(done).not.toHaveBeenCalled();
    });

    it("calls done when the authorization header is valid", () => {
        const validCredentials = Buffer.from("user:secret", "utf-8").toString("base64");
        const request = {
            headers: { authorization: `Basic ${validCredentials}` },
            routeOptions: { config: { sharedKey: "secret" } },
        } as any;

        BasicAuthMiddleware.handle(request, reply, done);

        expect(done).toHaveBeenCalledTimes(1);
        expect(reply.status).not.toHaveBeenCalled();
        expect(reply.send).not.toHaveBeenCalled();
    });
});
