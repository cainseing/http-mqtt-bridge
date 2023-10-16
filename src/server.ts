import App from './app.js';

App.listen({ host: '0.0.0.0', port: App.config.HTTP_PORT }, function (error: any, address: any): void {
    if (error) {
        App.log.error(error);
        process.exit(1);
    }

    App.log.info(`server listening on ${address}`);
});