FROM node:22.2.0 AS builder
LABEL authors="Kirill Vegele"

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 8080

RUN pnpm run build
CMD ["pnpm", "run", "start"]