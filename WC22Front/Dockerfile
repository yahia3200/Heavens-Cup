FROM node:14.17.3 as build

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN npm install

COPY . .

RUN npm run build

FROM nginx

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html