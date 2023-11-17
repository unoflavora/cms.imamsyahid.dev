FROM node:lts-alpine3.18 as builder
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN apk add --update git

WORKDIR /usr/app
COPY package*.json .
COPY . .
RUN NODE_ENV=development npm install

EXPOSE 3001
CMD ["npm", "run", "dev"]
