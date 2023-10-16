import config from './Schemas/config.js';
import cors from '@fastify/cors';
import fastify from 'fastify';
import fastifyEnv from '@fastify/env';
import routes from './routes.js';
import Handler from './Errors/Handler.js';

let booted = false;
const app: fastify.FastifyInstance = fastify({ logger: false });

if (booted === false) {
    await app.register(cors, { origin: '*' });
    
    await app.register(fastifyEnv, {
        confKey: 'config',
        dotenv: true,
        schema: config
    });

    if (!app.config.API_KEY) {
        throw new Error('API_KEY environment variable must be set');
    }

    app.setErrorHandler(Handler.handle);

    app.register(routes);

    booted = true;
}

export default app;