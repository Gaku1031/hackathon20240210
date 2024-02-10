destroy:
	docker-compose down --rmi all --volumes --remove-orphans
build:
	docker-compose build --no-cache --force-rm
up:
	docker-compose up -d
down:
	docker-compose down --remove-orphans
app:
	docker-compose exec app bash
app-fmt:
	docker-compose exec app ./vendor/bin/php-cs-fixer fix --config=.php-cs-fixer.dist.php
postgresql:
	docker-compose exec postgresql bash
ps:
	docker-compose ps
app/install:
	docker-compose exec app composer install
app/laravel-init:
	docker-compose exec app cp .env.example .env
	docker-compose exec app php artisan migrate
	docker-compose exec app php artisan migrate:fresh --seed
app/test:
	docker-compose exec app php artisan test
front/install:
	docker-compose exec front npm run install
init:
	@make build
	@make up
	@make app/install
	@make app/laravel-init
lint:
	docker-compose exec app ./vendor/bin/phpstan analyse
