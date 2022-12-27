# README

## 構築手順

- db/ddl に SQL を置く
- `docker-compose exec mysql bash` で mysql コンテナに入る
- 以下のコマンドを実行

```sh
cd /work
mysql -uroot -p
create database stub
exit
mysql -uroot -p stub < stub.sql
exit
```

## 注意

- 設定を変えて mysql を作り直したい場合、永続化したボリュームも削除すること

## A5SQL で Docker 上の MySQL にアクセスしたいとき
- 参考: [Windows 10 Home（WSL2）のDockerでMySQL立ち上げてWindows側からA5:SQL Mk2で接続してみる](https://snowsystem.net/container/docker/docker-mysql-wsl-a5sql/)

- WSL2 の `ifconfig` で `eth0` の `inet` を調べる
- A5SQL の「ホスト名」にその IP を設定する
- 「テスト接続」してみる
- エラーが出たらエラーメッセージに合わせた対応をする

### #28000のエラー
- 参考: <https://qiita.com/saken649/items/72f31ee658ce6737009a>
- エラーメッセージでは `root@172.20.0.1` がアクセスできないと言われた前提
- 外部から Docker 内部の MySQL にアクセスできるユーザーとホストを設定する必要がある
- いったん `docker compose mysql bash` でログインして確認

```sql
use mysql;
select host, user from user;
```

- 上記の設定のもとで確認して次の SQL を発行する: `root@172.20.0.1` は適宜変更すること.

```SQL
create user root@172.20.0.1 identified by 'root';
grant all privileges on *.* to root@172.20.0.1 with grant option;
```
