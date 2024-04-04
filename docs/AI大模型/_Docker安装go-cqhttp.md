- 先 docker 安装 ubuntu
docker pull ubuntu
docker run -itd -v /Users/tangeqin/docker_volume/go-cqhttp:/app/go-cqhttp --name go-cqhttp ubuntu
实现了 ubuntu 的 docker 安装，同时，将 /Users/tangeqin/docker_volume/go-cqhttp 挂载到 /app/go-cqhttp，可以通过/Users/tangeqin/docker_volume/go-cqhttp目录来管理容器里的/app/go-cqhttp目录。

下面用 docker exec 进入容器，安装相关环境：
docker exec -it go-cqhttp /bin/bash

apt-get update
apt-get install -y sudo

- 安装Python3和pip：
sudo apt update
sudo apt install -y python3 python3-pip

- 安装cqhttp的依赖库：
sudo pip3 install -U pyyaml requests

- 下载cqhttp的源代码：
- #此命令可以在本地运行，解压后再拷到容器里
wget https://github.com/Mrs4s/go-cqhttp/releases/download/v1.0.0-rc3/go-cqhttp_linux_amd64.tar.gz
$ tar zxvf go-cqhttp_linux_amd64.tar.gz

在容器里运行：
./go-cqhttp
现在配置：0
编辑配置文件：config.yml
