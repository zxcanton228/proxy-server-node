#!/bin/sh

certbot renew --webroot -w /var/www/certbot

# Перезапускаем Nginx после обновления сертификатов
docker exec nginx nginx -s reload