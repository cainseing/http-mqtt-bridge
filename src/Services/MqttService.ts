import * as mqtt from "mqtt";
import App from "../app.js";

export default class MqttService {
    public static publish(topic: string, message: string): void {
        const client = mqtt.connect({ host: App.config.MQTT_URL, port: App.config.MQTT_PORT });
    
        client.on('connect', (): void => {
            client.subscribe('connect', (error: any) => {
                if (error) {
                    App.log.error(error);
                    return;
                }
    
                client.publish(topic, message);
                client.end();

                App.log.info(`Published to ${topic}`);
            });
        });
    }
}