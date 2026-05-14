import { beforeEach, describe, expect, it, vi } from "vitest";
import ErrorReply from "../../src/Replies/ErrorReply.js";
import OkReply from "../../src/Replies/OkReply.js";

vi.mock("../../src/Services/MqttService.js", () => ({
  default: {
    publish: vi.fn(),
  },
}));

import WebhookController from "../../src/Controllers/WebhookController.js";
const serviceMock = await vi.importMock("../../src/Services/MqttService.js") as {
  default: { publish: ReturnType<typeof vi.fn> };
};
const mockPublish = serviceMock.default.publish;

describe("WebhookController", () => {
  let reply: any;

  beforeEach(() => {
    mockPublish.mockReset();

    const send = vi.fn();
    const status = vi.fn(() => ({ send }));

    reply = {
      status,
      send,
    };
  });

  it("returns 400 when topic and payload are missing", () => {
    const request = { query: {}, body: {} } as any;

    WebhookController.handle(request, reply);

    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalled();
    expect(reply.send.mock.calls[0][0]).toBeInstanceOf(ErrorReply);
    expect(mockPublish).not.toHaveBeenCalled();
  });

  it("publishes payload and returns OkReply when request is valid", () => {
    const request = {
      body: { topic: "test/topic", payload: { hello: "world" } },
    } as any;

    WebhookController.handle(request, reply);

    expect(mockPublish).toHaveBeenCalledWith(
      "test/topic",
      JSON.stringify({ hello: "world" }),
    );
    expect(reply.send).toHaveBeenCalled();
    expect(reply.send.mock.calls[0][0]).toBeInstanceOf(OkReply);
    expect(reply.status).not.toHaveBeenCalled();
  });
});
