FROM node:18.8-alpine as builder
WORKDIR /app
COPY package*.json ./
COPY . .
RUN NODE_ENV=development npm install
RUN npm run build

FROM node:18.8-alpine as runtime
ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js
ENV DATABASE_URI=postgresql://postgres:postgres@localhost/payload
ENV PAYLOAD_SECRET=e1057e0557c2f564cfd10ed7

WORKDIR /app
COPY package*.json  ./
RUN npm install --production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
VOLUME [ "/app/dist/" ]
EXPOSE 3001

RUN npm run payload migrate:create
RUN npm run payload migrate
CMD npm run serve