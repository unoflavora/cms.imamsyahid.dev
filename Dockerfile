
FROM node:18.8-alpine as builder
WORKDIR /app
COPY package*.json ./
COPY . .
RUN NODE_ENV=development npm install
RUN npm run build

FROM node:18.8-alpine as runtime
ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js
ARG DATABASE_URI
ARG PAYLOAD_SECRET
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV DATABASE_URI=${DATABASE_URI}

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