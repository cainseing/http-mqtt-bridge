export default {
    type: 'object',
    required: [],
    properties: {
        API_KEY: {
            type: 'string',
        },
        HTTP_PORT: {
            type: 'number',
            default: 80
        },
        MQTT_URL: {
            type: 'string',
        },
        MQTT_PORT: {
            type: 'number',
            default: 1883
        },
        MQTT_CLIENT_ID: {
            type: 'string',
            default: 'httpmqttbridge'
        },
    }
}