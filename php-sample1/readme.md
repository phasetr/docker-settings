# LEMP環境の錬成

- [参考](https://www.membersedge.co.jp/blog/laravel-development-environment-with-docker-compose/)

## 実行時の注意

- きちんと docker を立ち上げること

```sh
docker-compose up -d # 立ち上げ
```

### mysql に触る方法

```sh
docker-compose up
docker-compose exec mysql bash
mysql -h localhost -u user -p
```

### php コンテナに入る

```sh
docker-compose up -d
docker-compose exec app bash
```

### Laravel プロジェクト作成

```sh
docker-compose up -d
docker-compose exec app bash
composer create-project --prefer-dist laravel/laravel my-laravel-app
```

### Laravel データベース生成

```sh
cd /var/www/html/my-laravel-app
php artisan migrate
```
