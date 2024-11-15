FROM node:18.12.0-alpine

WORKDIR /srv/service

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD npm run start