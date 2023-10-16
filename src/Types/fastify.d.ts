import fastify from 'fastify';
import { Connection } from 'mysql2';

declare module 'fastify' {
    interface FastifyInstance {
        config: {
            API_KEY: string,
            HTTP_PORT: number,
            MQTT_URL: string,
            MQTT_PORT: number,
        },
    }
    
    interface FastifyRouteConfig {
        sharedKey: string,
    }

    interface FastifyContextConfig {
        sharedKey: string,
    }
}