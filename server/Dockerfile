FROM node:22.2.0 AS builder
LABEL authors="Kirill Vegele"

WORKDIR /usr/src/app

# Список зависемостей
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Установка зависемостей
RUN npm install -g pnpm
RUN pnpm install

# Копирование всего остального
COPY . .

# Порт
EXPOSE 8080

# Запуск
RUN pnpm run build
CMD ["pnpm", "run", "start"]
