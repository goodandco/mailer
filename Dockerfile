FROM node:8.11.4

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD node index.js