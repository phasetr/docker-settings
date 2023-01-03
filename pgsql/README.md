# README

- cf. [PostgreSQL 14 Administration Cookbook](https://www.packtpub.com/product/postgresql-14-administration-cookbook/9781803248974)

## 注意
- `.env`から`POSTGRES_USER`を削除するとdocker起動時にワーニングが出るため残しておく.

## 本のメモ
P.12
パラメーターを設定しない場合,
`PGHOST`または`PGHOSTADDR`,
`PGPORT`,
`PGDATABASE`
`PGUSER`などの環境変数を探す.

- URL: `psql postgresql://myuser:mypasswd@myhost:5432/mydb`

P.15

- `postgresql.conf`
- `pg_hba.conf`: ホストベースの認証.
  パスワードがプレーンテキストで送られるため, パスワード認証方式を使わないこと.

P.30
バックスラッシュから始まるコマンドはメタコマンドという.

P.34: パスワードファイルは`~/.pgpass`が標準.
`chmod 600`を設定していないと無視される.

P.35: 接続サービスファイル.
システム全体は`/etc/pg_service.conf`,
個々のユーザーは`~/.pg_service.conf`.
## Postgresqlコマンド類
```
psql -Upostgres # ログイン
psql -h myhost -p 5432 -d mydb -U myuser
psql postgresql://myuser@myhost:5432/mydb
psql -c "SELECT current_time"
psql -f example.sql
```

## SQL
```
SELECT current_database();
SELECT current_user;
SELECT version();

# パスワード変更
SET password_encryption='scram-sha-256';
\password
```

## docker
```shell
docker compose up
docker compose up -d
```
