# README

## TODO

- mysqlを非rootでつないで動かす：特にprisma
- JWT認証、リフレッシュトークンまで試験実装
    - [JWT参考](https://www.dailyupblog.com/backend_development/1117/)
    - トークンは期限まで実装確認
- express APIサーバーのセキュリティ調査・実装
- expressのパラメーターバリデーション
- expressのエラーハンドリング
    - [try-catch(https://zenn.dev/web_life_ch/articles/d6981c67a626e7)
- npm http-errors
- ユーザーデータを返すAPIからパスワードを返すのを削除
- docker (docker compose)学習
- express, prismaのドキュメント読み込み
- コンテナの軽量化：alpineまたはslimだとprismaで[ここ](https://note.com/note_fumi/n/n442f5cc22ebf)で示されるエラーが出る
- JWTの`secret`を`.env`に移動
- [tsoa](https://zenn.dev/hedrall/articles/09bfa9cd3c765f)検証
- [OpenAPIとPrisma](https://www.docswell.com/s/shin1kt/5L8QQZ-2022-05-27-231839)
- `tsconfig`のパス周り：`ts-node-dev`だけではなく`jest`でのテストも通す

## 開発環境起動

- (dockerインストール)
- docker (docker desktop)起動
- コンソール立ち上げ
- 直下の`.env`と`backend/.env`をきちんと書く
- `docker compose -f docker-compose.dev.yml up -d`
- `Dockerfile`を更新したときは`docker compose -f docker-compose.dev.yml up --build -d`

## 開発環境停止

- `docker compose -f docker-compose.dev.yml down`

## テスト

- まずテスト用のデータベースを生成すること

```shell
docker compose exec backend yarn prisma:migrate:dev:test
docker compose exec backend yarn test
```

## prisma

```
docker compose exec backend npx prisma migrate dev --name some_name # migration
docker compose exec backend npx prisma studio
docker compose exec backend npx ts-node src/utils/dbaccess.ts
docker compose exec backend npx prisma db seed
```

## memo

### ログアウト処理

- 期限の切れたトークンを返す形で対応する
- TODO・要検討 セッションを使った管理も必要か?

### M1 MacのDockerでそもそもMySQLのコンテナが起動していなかった

- `docker ps`でどのコンテナが立ち上がっているか確認する
- `docker compose up`のログをきちんと見て問題を一つずつ潰す
