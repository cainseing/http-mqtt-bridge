import ErrorReply from "../Replies/ErrorReply.js";
import MqttService from "../Services/MqttService.js";
import OkReply from "../Replies/OkReply.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { IWebhook } from "../Requests/IWebhook.js";

class WebhookController {
    static handle(request: FastifyRequest<IWebhook>, reply: FastifyReply): void {
        const topic = request.query?.topic ?? request.body?.topic;
        const payload = request.query?.payload ?? request.body?.payload;

        if (!topic || !payload) {
            reply.status(400).send(new ErrorReply(400, 'Invalid request'));
            return;
        }

        MqttService.publish(topic, JSON.stringify(payload));

        reply.send(new OkReply());
    }
}

export default WebhookController;