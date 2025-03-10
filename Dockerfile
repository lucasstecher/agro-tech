#TODO: melhorar a performance do dockerfile (outro package manager)
FROM node:22.14.0-alpine AS installer
WORKDIR /app
COPY package.json ./
RUN npm install --silent

FROM node:22.14.0-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=installer /app/node_modules ./node_modules/
ENV NODE_ENV=production
RUN node ace build --ignore-ts-errors

FROM node:22.14.0-alpine AS app
LABEL STAGE='BACKEND'
WORKDIR /var/www
COPY --from=installer /app/node_modules ./node_modules/
COPY --from=builder /app/build ./build/
RUN apk add --no-cache bash coreutils dumb-init
COPY swagger.yml build/
COPY swagger.json build/
