# HTTP to MQTT Bridge Server

The HTTP to MQTT Bridge Server is a lightweight and efficient server that facilitates seamless communication between HTTP-based systems and MQTT brokers. This bridge server allows you to send HTTP requests to it and have them published to the configured MQTT broker, enabling easy integration of MQTT messaging into your HTTP-based applications or services.

## Table of Contents
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Getting Started

### Prerequisites

- Node.js (version 18 or later) and NPM installed on the system.
- Access to an MQTT broker (e.g., Mosquitto, RabbitMQ) where the server can publish and subscribe to topics.

### Usage

#### GIT:
```
# git clone git@github.com:cainseing/http_mqtt_bridge.git
```
```
# npm run local
```
Note: You will need to make a .env file to configure your MQTT broker details.

```
# cp .env.example .env
```

#### DOCKER:
```
# docker run -e HTTP_PORT=8080 -e MQTT_URL=test.mosquitto.org -e MQTT_PORT=1883 cainseing/http_mqtt_bridge:latest
```

#### ENV's

- `API_KEY`
- `HTTP_PORT`
- `MQTT_PORT`
- `MQTT_URL`

## API Endpoints
The server exposes specific API endpoints for receiving HTTP requests. By default, the server listens on port 80, but you can change this in the configuration file. The following are the basic examples for webhook requests.

`topic` is the MQTT topic you want to publish a message to, and `payload` is the message you want to publish.

- GET /webhook?topic=example&payload=hello-world
- POST /webhook
```
{
    "topic": "example",
    "paylod": {
        "type": "alarm",
        "message": "Power failure"
    }
}
```

## Contributing
Contributions are welcome! If you find any issues or want to add new features, feel free to fork this repository and submit a pull request.
