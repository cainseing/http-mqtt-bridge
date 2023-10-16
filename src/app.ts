import config from './Schemas/config.js';
import cors from '@fastify/cors';
import fastify from 'fastify';
import fastifyEnv from '@fastify/env';
import routes from './routes.js';

let booted = false;
const app: fastify.FastifyInstance = fastify({ logger: false });

if (booted === false) {
    await app.register(cors, { origin: '*' });
    
    await app.register(fastifyEnv, {
        confKey: 'config',
        dotenv: true,
        schema: config
    });

    app.register(routes);
}

export default app;