FROM node:14.15.1-alpine3.10
WORKDIR /app
COPY ./ /app
RUN npm install
ENTRYPOINT npm start
