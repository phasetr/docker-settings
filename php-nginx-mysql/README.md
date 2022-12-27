# Docker-Compose

## 参考

- [URL1](https://qiita.com/katsuhiko/items/f18c488457af33abdf66)
- [URL2](https://note.com/arakaki_note/n/nf3a0de4d915a)
- [URL3](https://www.webcyou.com/?p=7657)

### TODO

`URL2`によると`app_local.php`のファイルに書く内容をenvの値で直接指定できる?

### 設定のポイント

- CakePHP のサンプルアプリを /var/www/html/sample という形で置いている
- webroot としての /var/www/html 直下に CakePHP を直接置いているわけではない

## ツール類

- zip
- pdo_mysql
- intl
- gd

## 初期設定

### コンテナ起動

```sh
docker-compose up
```

### Composer・CakePHP インストール

```sh
docker-compose exec php bash
yes | composer create-project --prefer-dist cakephp/app:4.* sample
```

### データベース設定

このリポジトリのルートから (Docker に入らずに) コマンド実行する.

```
cp -r php-fpm/sample/* html/sample/
```
