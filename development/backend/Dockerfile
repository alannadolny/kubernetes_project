FROM node:alpine

WORKDIR /opt/backend

COPY ./package.json .

RUN yarn install

COPY . .

EXPOSE 5000

CMD [ "node", "index.js" ]