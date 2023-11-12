FROM node:18.8-alpine as base

FROM base as builder

WORKDIR /home/node/app
COPY package*.json ./

COPY . .
RUN set NODE_ENV=development && npm install
RUN npm run build

FROM base as runtime

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js
ENV DATABASE_URI=postgresql://postgres:postgres@localhost/payload
ENV PAYLOAD_SECRET=e1057e0557c2f564cfd10ed7

WORKDIR /home/node/app
COPY package*.json  ./

RUN npm install --production
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build

EXPOSE 3000

CMD ["node", "dist/server.js"]
