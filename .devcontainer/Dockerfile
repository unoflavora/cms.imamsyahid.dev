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

RUN NODE_ENV=development npm install
EXPOSE 3001
CMD ["npm", "run", "dev"]
