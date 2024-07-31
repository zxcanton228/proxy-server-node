DOCKER_COMPOSE := docker-compose
CERTBOT_EMAIL := kirillvegele10@gmail.com
CERTBOT_DOMAIN := 192.168.1.33

all: build start certbot reload

build:
	$(DOCKER_COMPOSE) up --build -d

start:
	$(DOCKER_COMPOSE) up -d

certbot:
	$(DOCKER_COMPOSE) run --rm certbot certbot certonly --webroot -w /var/www/certbot -d $(CERTBOT_DOMAIN) --email $(CERTBOT_EMAIL) --agree-tos --no-eff-email
# @echo "Waiting for Nginx to be ready..."
# @timeout /T 10 /NOBREAK >nul
# @echo "Checking Nginx status..."
# @$(DOCKER_COMPOSE) ps | findstr /R /C:"nginx.*Up" >nul
# @if errorlevel 1 (
# 	echo "Nginx is not running. Exiting..."
# 	exit 1
# )
reload:
	$(DOCKER_COMPOSE) exec nginx nginx -s reload


clean:
	$(DOCKER_COMPOSE) down -v