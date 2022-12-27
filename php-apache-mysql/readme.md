# README

## 構築手順

- db/ddl に SQL を置く
- `docker-compose exec mysql bash` で mysql コンテナに入る
- 以下のコマンドを実行

```sh
cd /work
mysql -uroot
create database platon
create database unified
exit
mysql -uroot platon < platon.sql
mysql -uroot unified < unified.sql
exit
```

- `html` 直下にソースを移動
- `app.php` を開く
    - Datasources => default => host を `mysql` に修正
    - Datasources => default => password を `root` に修正

## 注意

- 設定を変えて mysql を作り直したい場合、永続化したボリュームも削除すること
