FROM node:23-alpine

ENV NODE_ENV development

WORKDIR /app

COPY . .

RUN npm install

ENTRYPOINT [ "npm", "start" ]