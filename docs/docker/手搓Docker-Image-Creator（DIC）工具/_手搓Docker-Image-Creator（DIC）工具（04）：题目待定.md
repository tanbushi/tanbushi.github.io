


### 1.1 创建一个名为`test-app`的目录，用于存放单个应用的 Dockerfile 编译生成镜像和验证的基本脚本。
2. 在`test-app`目录下创建的文件为：
- Dockerfile 文件

这是一个最简的的 Dockerfile，只是通过她来进行简报的编写用于定义 Docker 镜像的构建过程。这次使用的基础镜像为 alpine:3.10。


Dockerfile 内容如下：

```Dockerfile
# 使用Alpine Linux作为基础镜像，加入版本的目的是保持镜像版本的确定性，不会因为基础版本更新而产生问题。
FROM alpine:3.10
 
# 定义作者信息
LABEL MAINTAINER="tanbushi@qq.com"
```

- build.sh 文件，用于编译 Dockerfile 生成 Docker 镜像。
```bash
#!/bin/bash
docker build -t test-app .
```
- run.sh 文件，用于运行 Docker 镜像。
```bash
#!/bin/bash
docker run test-app
```  
运行脚本：build.sh，生成镜像：test-app
运行脚本：run.sh，运行容器：test-app

## 发现问题
镜像名称、容器名称在上例中是手工指定的，而作为工具的基本要求，就是参数必须可以动态指定和获取。所以加入配置文件 config.sh，用于配置镜像名称、容器名称。
```bash
# config.sh
# 配置文件
APP_NAME=test-app
IMAGE_NAME=$APP_NAME
CONTAINER_NAME=$APP_NAME
```
后续在 build.sh 和 run.sh 中，需要引用 config.sh 文件，并使用其中的变量。引用文件请使用 source 命令（或 . 命令）。
```bash
. config.sh    
```

修改后的 build.sh 文件和 run.sh 文件如下：
build.sh
```bash
#!/bin/bash
. config.sh
docker build -t $IMAGE_NAME .
```
run.sh
```bash
#!/bin/bash
. config.sh
docker run $CONTAINER_NAME
```
当运行脚本：build.sh，生成镜像：test-app，如果镜像文件已经存在，会自动覆盖
当运行脚本：run.sh，运行容器：test-app，如果容器已经存在，就无法创建容器，会报错。
所以优化 run.sh 文件，增加判断容器是否存在的逻辑，如果存在就删除容器，然后创建容器。
run.sh
```bash
#!/bin/bash

# 调用配置文件 config.sh
. config.sh

# 查询容器是否存在
if [ "$(docker ps -a -q -f name=$CONTAINER_NAME)" ]; then
    # 删除容器
    docker rm -f $CONTAINER_NAME
fi

# 运行容器
docker run -itd --name $CONTAINER_NAME $IMAGE_NAME
```
## 下面引入资源文件
资源文件，就是在本机可以用来拷贝到镜像中的文件、或可以在镜像中执行的本机命令。
以在 alpine 中安装 jre1.8 为例，需要将本机下载的 jre1.8 安装包拷贝到镜像中的指定目录下，并将镜像中的 jre1.8 相关路径写入 PATH 环境变量中，便于在容器中运行 jre1.8。我们把这种需要在镜像文件里运行的包称为“运行时”资源文件，因为这些包在运行时会用到。目录名为 runtime。

再就是在 alpine 中安装 jre1.8 的安装包，需要在容器里执行相关命令，此命令只是用来安装，因为这些包在安装完成后就没用了，此类包我们叫“安装用途”资源文件。目录名为 install。

我们把这两类文件合在一起叫资源文件，目录为 resources。
改造后的文件目录结构为；
```
test-app
|- resources
|    |- install
|        |- glibc
|            |- glibc-2.29-r0.apk
|            |- glibc-bin-2.29-r0.apk
|            |- glibc-i18n-2.29-r0.apk 
|    |- runtime
|        |- JRE
|            |- jre1.8.0_401
|                |-...
|- build.sh
|- config.sh
|- Dockerfile
|- run.sh

```
