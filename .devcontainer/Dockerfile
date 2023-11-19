FROM node:lts-alpine3.18
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN apk add --update git
RUN apk add openssh

WORKDIR /usr/app
COPY package*.json .
RUN NODE_ENV=development npm install
COPY . .

EXPOSE 3001
CMD [ "/bin/sh", "-c", "npm run dev" ]
