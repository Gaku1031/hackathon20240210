# リポジトリをクローンして実行する手順

1. cloneする
2. `docker compose build --no-cache`を実行する
3. `docker compose up -d`を実行する
4. `docker compose exec app bash`でappコンテナに入る
5. `composer install`を実行する
6. `php artisan migrate`を実行する
7. `php artisan key:generate`を実行する
8. `control + d`でappコンテナを抜ける
9. `docker compose exec front bash`を実行する
10. `npm install`を実行する
11. `control + d`でfrontコンテナを抜ける
