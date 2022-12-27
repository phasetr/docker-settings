# README
## 参考
- [URL](https://learn.microsoft.com/ja-jp/aspnet/core/tutorials/razor-pages/razor-pages-start?view=aspnetcore-7.0&tabs=visual-studio-code)
- [Docker](https://learn.microsoft.com/ja-jp/aspnet/core/host-and-deploy/docker/building-net-docker-images?view=aspnetcore-7.0)
    - [GitHub](https://github.com/dotnet/dotnet-docker)

## 参考コマンド
```shell
docker compose exec backend bash # サーバーにログイン
docker compose up --build # コンテナの再ビルド
```

## Dockerなしでの`dotnet`起動
もしMacでキーチェーンを要求されたらPCログインパスワードを入力して「常に許可」を選ぶこと.

```sh
dotnet dev-certs https --trust # 初回だけ
dotnet run
```

## 初期化
```sh
dotnet new webapp -o RazorPagesMovie
```
