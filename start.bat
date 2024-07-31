@echo off

REM Сборка и запуск контейнеров
docker-compose up --build -d

REM Получение SSL-сертификата с помощью Certbot
docker-compose run --rm certbot certonly --webroot -w /var/www/certbot -d 192.168.1.33 --email your-email@example.com --agree-tos --no-eff-email

REM Перезапуск Nginx после получения сертификата
docker-compose exec nginx nginx -s reload

@echo on