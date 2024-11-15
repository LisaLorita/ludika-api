FROM node:18.12.0-alpine

RUN npm install

RUN npm run build

CMD npm run start