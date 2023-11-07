FROM node:12.16.3 as react-build
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 3001
CMD [ "nginx", "-g", "daemon off;"]
