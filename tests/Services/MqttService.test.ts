import { beforeEach, describe, expect, it, vi } from "vitest";

const mockPublish = vi.fn();
const mockEnd = vi.fn();
const mockSubscribe = vi.fn();
const mockOn = vi.fn((event, cb) => {
  if (event === "connect") {
    cb();
  }
  return client;
});

const client = {
  on: mockOn,
  subscribe: mockSubscribe,
  publish: mockPublish,
  end: mockEnd,
};

vi.mock("mqtt", () => ({
  connect: vi.fn(() => client),
}));

vi.mock("../../src/app.js", () => ({
  default: {
    config: {
      MQTT_URL: "localhost",
      MQTT_PORT: 1883,
    },
    log: {
      info: vi.fn(),
      error: vi.fn(),
    },
  },
}));

import MqttService from "../../src/Services/MqttService.js";

const appMock = await vi.importMock("../../src/app.js") as {
  default: {
    log: {
      info: ReturnType<typeof vi.fn>;
      error: ReturnType<typeof vi.fn>;
    };
  };
};
const mockInfo = appMock.default.log.info;
const mockError = appMock.default.log.error;

describe("MqttService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSubscribe.mockImplementation((topic, cb) => cb(null));
  });

  it("connects and publishes a message", () => {
    MqttService.publish("test/topic", "hello");

    expect(mockOn).toHaveBeenCalledWith("connect", expect.any(Function));
    expect(mockSubscribe).toHaveBeenCalledWith("connect", expect.any(Function));
    expect(mockPublish).toHaveBeenCalledWith("test/topic", "hello");
    expect(mockEnd).toHaveBeenCalled();
    expect(mockInfo).toHaveBeenCalledWith("Published to test/topic");
  });

  it("logs an error and does not publish when subscribe fails", () => {
    mockSubscribe.mockImplementation((topic, cb) => cb(new Error("subscribe failed")));

    MqttService.publish("test/topic", "hello");

    expect(mockPublish).not.toHaveBeenCalled();
    expect(mockEnd).not.toHaveBeenCalled();
    expect(mockError).toHaveBeenCalled();
  });
});
