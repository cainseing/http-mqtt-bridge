import App from './app.js';
import BasicAuthMiddleware from './Middleware/BasicAuthMiddleware.js';
import WebhookController from './Controllers/WebhookController.js';
import { FastifyInstance } from 'fastify';

async function routes(fastify: FastifyInstance, options: any) {
    fastify.route({
        config: { sharedKey: App.config.API_KEY },
        handler: WebhookController.handle,
        method: 'GET',
        onRequest: BasicAuthMiddleware.handle,
        url: '/webhook',
    });

    fastify.route({
        config: { sharedKey: App.config.API_KEY },
        handler: WebhookController.handle,
        method: 'POST',
        onRequest: BasicAuthMiddleware.handle,
        url: '/webhook',
    });
}

export default routes;