FROM node:18.8-alpine as builder
WORKDIR /app
COPY package*.json ./
COPY . .
RUN NODE_ENV=development npm install
RUN npm run build

FROM node:18.8-alpine as runtime
ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js
WORKDIR /app
COPY package*.json  ./
RUN npm install --production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src/migrations ./app/src/migrations
EXPOSE 3001

CMD npm run payload migrate:create; npm run payload migrate; npm run serve