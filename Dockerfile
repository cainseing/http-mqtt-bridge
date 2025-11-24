FROM node:24.11.1-alpine3.22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./dist .

EXPOSE 80

CMD [ "node", "server.js" ]