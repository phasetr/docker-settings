# README
- <https://www.daveops.co.in/post/code-first-entity-framework-core-mysql>

## 起動
```shell
# まずDocker（データベース）を立ち上げる
docker compose up
dotnet watch run
```

## memo
```shell
dotnet new webapi --name dotnet
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Design
```

## Postgresqlのダンプ
```shell
 docker compose exec pgsql pg_dump -Uuser mydb > pgsql/init/init.sql
```

## memo: EF tools
### ツールのインストール
```shell
dotnet tool install --global dotnet-ef
```

### マイグレーションのコマンド
```shell
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### マイグレーションの`undo`
```shell
dotnet ef migrations remove
```
