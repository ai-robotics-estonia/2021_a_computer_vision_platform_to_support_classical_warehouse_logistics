#Build
FROM node:lts-alpine as build
WORKDIR /app
COPY . .
RUN yarn install --silent
RUN yarn run build --silent

#Deploy
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
#Delete defauilt conf
RUN rm /etc/nginx/conf.d/*
#Add my ngnix proxy conf
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]