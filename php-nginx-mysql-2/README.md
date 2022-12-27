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
- 個別のアプリに対して nginx/default.conf を適切に設定する

#### inspection
- 自身の webroot/css を参照していて skyscraper を見ていないので nginx/default.conf を適切に設定する必要あり
- [この記事](https://entropiajp.hatenablog.com/entry/2014/06/09/060000)を参考に (img|css|js|files) の設定を追加した

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

### git リポジトリの配置

- ./html 以下に各種 CakePHP のディレクトリを配置

### データベース設定

- 各アプリの `config/app_local.php` で `Datasources` を次のように書き換え.

```php
    'Datasources' => [
        'default' => [
            'host' => 'db',
            'username' => 'root',
            'password' => 'root',
            'database' => 'platon',
            'url' => env('DATABASE_URL', null),
        ],
        'test' => [
            'host' => 'localhost',
            'username' => 'my_app',
            'password' => 'secret',
            'database' => 'test_myapp',
        ],
    ],

```

## メモ
- phpMyAdminは`http://127.0.0.1:8080`でアクセスする.
