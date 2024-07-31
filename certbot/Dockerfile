FROM debian:buster-slim

# Устанавливаем Certbot и необходимые зависимости
RUN apt-get update && apt-get install -y certbot cron

# Копируем скрипт для автоматического обновления сертификатов
COPY renew-cert.sh /usr/local/bin/renew-cert.sh

# Устанавливаем права доступа
RUN chmod +x /usr/local/bin/renew-cert.sh

# Настраиваем cron для автоматического обновления сертификатов
RUN crontab -l | { cat; echo "0 0 * * * /usr/local/bin/renew-cert.sh"; } | crontab -

CMD ["cron", "-f"]