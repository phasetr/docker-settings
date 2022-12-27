# たった 1 日で基本が身に付く！Docker/Kubernetes 入門

- ~/GoogleDrive/doc/伊藤裕一.P257.たった 1 日で基本が身に付く*Docker-Kubernetes*超入門.pdf
- [サンプルファイルのダウンロード](https://gihyo.jp/book/2020/978-4-297-11428-2/support)
- centos7 前提


## コマンド

### Chap1-

```sh
# hello-world イメージからコンテナを作成
docker container run hello-world
# nginx の展開
docker container run -p 8080:80 nginx
# もう1 つ nginx を起動する
docker container run --name mynginx -d -p 8081:80 nginx:1.9.15-alpine

# P.31 起動中のコンテナを確認
$ docker container ls

# P.32 コンテナの停止
$ docker container stop mynginx
$ docker container stop 40720b60ed8e

# P.35 DockerHub へのログイン／ログアウト
$ docker logout
$ docker login

# P.37 コンテナの作成
$ docker container run nginx
$ docker container run nginx date

# P.38 コンテナの bash を操作可能にする
$ docker container run nginx bash
$ docker container run -it nginx bash

# P.38 「--rm」と「--name」の併用
$ docker container run --name hello1 -d hello-world
$ docker container run --name hello1 -d hello-world
$ docker container run --rm --name hello2 -d hello-world
$ docker container run --rm --name hello2 -d hello-world

# P.39 コンテナに対してコマンドを発行
$ docker container exec [somename] date
$ docker container exec [somename] cat /etc/nginx/nginx.conf
$ docker container exec -it [somename] bash

# P.40 リダイレクトを利用
$ docker container exec [somename] sh -c "echo 'hello docker' > /hello.txt"
$ docker container exec [somename] cat /hello.txt

# P.40
docker help
# P.41
docker container help
docker container run --help

# P.42 コンテナの一覧を表示
$ docker container ls
# P.42 停止中のコンテナも含めて一覧を表示
$ docker container ls -a

# P.43 特定のコンテナ情報を確認
$ docker container inspect nginx_container

# P.43 コンテナのログを確認
$ docker container run -d -p 8090:80 nginx
$ docker container logs 6e102714486c

# P.43 コンテナのログを継続して表示
$ docker container logs -f 6e102714486c

# P.44 コンテナの統計情報を表示
$ docker container stats --no-stream
# P.44 出力フォーマットを指定
$ docker container ls --format='table {{.ID}}\t{{.Names}}\t{{.Ports}}'

# P.45 コンテナの停止
$ docker container ls
$ docker container stop 6e102714486c
$ docker container ls -a
# P.45 コンテナの起動
$ docker container start 6e102714486c
$ docker container ls
# P.46 コンテナの再起動
$ docker container restart 6e102714486c
$ docker container ls

# P.46 コンテナの破棄
$ docker container ls -a
$ docker container rm [name]
$ docker container inspect 6e102714486c

# P.47 起動していないコンテナをまとめて破棄
$ docker container prune -f

# P.55 docker search コマンドで検索
$ docker search python

# P.56 フィルタを使用
$ docker search -f "is-official=true" -f "stars=50" python

# P.57 curl を利用してタグ一覧を取得
$ curl -s https://registry.hub.docker.com/v1/repositories/python/tags | jq '.[].name'

# P.58 イメージを 2 回 Pull した場合
$ docker pull python:3.7.5-slim

# P.58 ローカルのイメージを検索
$ docker image ls

# P.58 イメージの詳細を表示
$ docker image inspect python:3.7.5-slim

# P.59 イメージの削除
$ docker image rm hello-world # ←イメージを削除
$ docker container prune -f # ←コンテナを削除
$ docker image rm hello-world # ←再度イメージを削除

# P.60 名前なしイメージの削除
$ docker image prune -f

# P.62 flask のインストール
$ docker container run --name base -it -p 8080:80 python:3.7.5-slim bash

# P.63 図2-12 ファイルをコンテナに転送
$ ls
server.py
$ docker container cp server.py base:/

# P.64 図2-14 コンテナからファイルを転送
$ docker container cp base:/etc/hosts ./
$ cat hosts
# 実際は、3章で説明するログ出力先の変更手法を使ってコンテナ内のログを取得しないで済むようにする

# P.65 図2-16 コンテナのイメージ化
$ docker container commit base c2img1_app

# P.66 イメージのレイヤーを確認
$ docker image history c2img1_app

# P.67 イメージにタグを追加
$ docker image tag c2img1_app yuichi110/c2img1_app
$ docker image tag c2img1_app yuichi110/c2img1_app:v1.0
$ docker image ls

# P.68 レジストリへの Push
$ docker login
$ docker image push yuichi110/c2img1_app:v1.0
$ docker image push yuichi110/c2img1_app:latest

# P.73
コンテナ起動時に指定している「tail -f /dev/null」コマンドは、Linuxのtailコマンドで何も書かれる
ことのないスペシャルファイルの「/dev/null」の更新を標準出力させています。要するに「コンテナを
終了させないために、発生することのない仕事を永遠にさせている」のです。DockerやKubernetesで
よく使われる手法なので覚えておいてください。

# P.86 ネットワーク一覧を表示
$ docker network ls

# P.89 ポートフォワーディングを確認
$ docker container run -d --rm -p 8080:80 nginx:1.17.6-alpine
$ docker container ls --format='table {{.ID}}\t{{.Names}}\t{{.Ports}}'
$ docker container port e8546720487c

# P.90 ネットワークの作成
$ docker network create bridge1
$ docker network create -d macvlan macvlan
$ docker network ls

# P.91 コンテナをネットワークに接続
$ docker container run -d --rm --network bridge1 -p 8080:80 nginx:1.17.6-alpine

# P.91 ネットワークに属するコンテナを確認
$ docker network inspect bridge

# P.95 ネームサーバーの設定を確認
$ docker container exec ct1 cat /etc/resolv.conf

# P.104 ボリュームを作成してコンテナにマウントする
$ docker volume create myvolume
$ docker container run --rm -d --name vct1 --mount source=myvolume,target=/volume1 alpine:3.10.3 tail -f /dev/null
$ docker container exec vct1 ls /volume1

# P.105 新しいコンテナにマウントする
$ docker container stop vct1
$ docker container run --rm -d --name vct2 \
$ docker container exec vct2 ls /volume2

# P.105 ボリュームの確認と削除
$ docker volume ls
$ docker container stop vct2
$ docker volume rm myvolume

# P.107
ネットワークとMySQL のコンテナを作成
$ docker network create -d bridge wp-net
$ docker container run -d --network wp-net --name mysql \
--mount source=mysqlvolume,target=/var/lib/mysql \
--mount type=bind,source=/Users/yuichi/mysqlbackup,target=/mysqlbackup \
-e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=wordpress \
-e MYSQL_USER=wordpress -e MYSQL_PASSWORD=password mysql:5.7.28

# P.108 WordPress のコンテナを作成
$ docker container run -d --network wp-net -p 8080:80 \
-e WORDPRESS_DB_HOST=mysql:3306 -e WORDPRESS_DB_NAME=wordpress \
-e WORDPRESS_DB_USER=wordpress -e WORDPRESS_DB_PASSWORD=password \
--name wordpress wordpress:5.2.3-php7.3-apache
```

### Chap4

```sh
# chap4
# P.121 イメージのビルド Dockerfile のあるディレクトリで
$ docker image build ./ -t c4app1
# P.122 コンテナの作成と停止
$ docker container run --rm -d -p 8080:80 --name myapp c4app1
docker container stop myapp

# P.122 イメージのビルド
$ docker image build ./ -t c4app2

# P.127 イメージのビルド
$ docker image build -f Dockerfile.local.yml -t mynginx ./

# P.131 go イメージのビルド
$ docker image build ./ -t c4app3
$ docker container run --rm -d -p 8080:80 --name myapp c4app3

# P.131 イメージサイズの確認
$ docker image ls

# P.131 bash を抜けるとコンテナが停止する
$ docker container run -it --name centos centos:7.7.1908 bash
# exit
$ docker container ls -a
```
