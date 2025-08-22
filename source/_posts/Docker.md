---
title: Docker
date: 2025-07-22 07:56:26
categories:
  - note
  - Docker
tags: [Docker]
banner_img: /images/壁纸.jpg
---

## Docker 命令

### 拉取镜像

```shell
docker pull docker.io/library/nginx:lastest
```

- `docker.io`为官方仓库，可省略,`registry`仓库地址，注册表
- `library`作者名（命名空间）,是官方的命名空间可省略
- `nginx`仓库名
- `latest`标签/版本号，最新版可不写

such as:

```shell
docker pull docker.n8n.io/n8nio/n8n
```

### 列出镜像

```shell
docker images
```

### 删除镜像

```shell
docker rmi 镜像名字或id/（-f 容器名字）
```

### 创建并运行镜像

```shell
docker run (-p 80:80) (--name 容器名字，必须唯一) 镜像名字或id -d 
```

`detached mode`分离模式，命令行启动后在后台执行，不会阻塞当前窗口

当镜像不存在时会自动拉取并创建运行

端口映射，分别为宿主机端口和容器内端口

### 查看正在运行容器

```shell
docker ps(process status) -a
```

`-a`查询所有容器

### 创建容器

```shell
docker create -p 80:80 nginx
```

### 启动容器

```shell
docker start 容器id/名字
```

### 停止容器

```shell
docker stop 容器id/名字
```

### 滚动查看容器日志

```shell
docker logs 容器id/名字 -f
```

### 容器内部执行Linux命令

```shell
docker exec 容器id linux命令
```

```shell
docker exec -it 容器id /bin/sh
```

打开容器内命令行环境

## Dockerfile

```dockerfile
FROM python:3.13-slim(基础镜像)

WORRKDIR /app(切换目录)

COPY . .(当前目录 镜像内当前目录)

RUN pip install -r requirements.txt

EXPOSE 8000(声明端口)

CMD ['python3',"main.py"](容器启动时会自动执行该命令)
```
### 构建镜像

```shell
docker build -t docker_test:latest .
```

### 推送至dockhub上

```shell
docker login
docker build -t cwdpsky/docker_test .
docker push cwdpsky/docker_test
```

## docker_compose

可以理解为将多个`dockerfile`集成到一起，例如前端+后端+数据库

```shell
docker compose up -d
```

### 停止并删除容器

```shell
docker compose down
```

### 启动停止

```shell
docker compose start/stop
```

企业级服务器集群的大规模的容器编排需求则采用k8s
