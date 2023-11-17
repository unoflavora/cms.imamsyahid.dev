FROM node:lts-alpine3.18 as builder
RUN apk update
RUN apk upgrade
RUN apk add git

WORKDIR /usr/app
COPY ../package*.json ./
COPY .. ./

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
ENV DATABASE_URI=postgresql://postgres:postgres@localhost:27017/payload
ENV PAYLOAD_SECRET=e1057e0557c2f564cfd10ed7
ENV PAYLOAD_CONFIG_PATH=src/payload.config.ts

RUN NODE_ENV=development npm install
EXPOSE 3001
CMD ["npm", "run", "dev"]
