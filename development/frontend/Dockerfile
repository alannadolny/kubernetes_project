FROM node:alpine as frontend-builder

WORKDIR /opt/frontend

COPY ./package.json .

RUN yarn install

COPY . .

RUN yarn run build

FROM nginx

EXPOSE 3000

COPY ./default.conf /etc/nginx/conf.d/default.conf

COPY --from=frontend-builder /opt/frontend/build /usr/share/nginx/html
