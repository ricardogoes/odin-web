FROM node:18.12.1-bullseye-slim AS build
WORKDIR /app
COPY ./package.json /app/
RUN npm install
COPY . /app/
RUN npm run build:ssr

FROM nginx:1.16.1 AS client-browser
COPY --from=build /app/dist/client/browser/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

FROM node:18.12.1-bullseye-slim AS ssr-server
COPY --from=build /app/dist /app/dist/
COPY ./package.json /app/package.json
WORKDIR /app

EXPOSE 4000
CMD npm run serve:ssr
