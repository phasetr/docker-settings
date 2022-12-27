# LEMP環境の錬成

- [参考](https://www.membersedge.co.jp/blog/laravel-development-environment-with-docker-compose/)

## 実行時の注意

- きちんと docker を立ち上げること

```sh
docker-compose up -d # 立ち上げ
```

## 初期化

### プロジェクトの生成

```sh
docker-compose exec app bash
composer create-project --prefer-dist laravel/laravel ogp-backend "6.*"
cd ogp-backend
chmod -R 777 storage
chmod -R 777 bootstrap/cache
```

### 追加インストール

```sh
cd ogp-backend
composer require fruitcake/laravel-cors
```

### 手続き

```sh
php artisan vendor:publish --tag="cors"
```
