FROM node:18.12.0-alpine

WORKDIR /srv/service

RUN npm install

RUN npm run build

CMD npm run start