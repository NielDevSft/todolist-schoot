FROM node:18-alpine as angular
WORKDIR /app
COPY /app-frontend/package.json /app-frontend/package-lock.json ./
RUN npm i --silence
COPY ./app-frontend .
RUN npm run build

FROM nginx:alpine

VOLUME /var/cache/nginx
COPY --from=angular app/dist/app-frontend /usr/share/nginx/html
COPY ./app-frontend/config/nginx.conf /etc/nginx/conf.d/default.conf
