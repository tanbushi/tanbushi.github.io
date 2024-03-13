# 使用Git-ftp实现网站代码发布的版本管理
> 如果你的网站源码在开发过程中，已经在使用 GIt 进行版本管理，同时你是采用 ftp 服务器来更新上传网站代码的话，Git-ftp 能够实现在上传代码时，只上传从上次上传后更新了的文件，从而帮您节约大量的时间和带宽，同时避免造成版本混乱，轻松实现网站代码版本的精准控制。您可以轻松发布另外的分支，或者回滚到想要使用的老版本。

<font color="red">注意：本文操作需要对 Git 有一定的了解</font>
## 1 安装 Git-ftp
&emsp;&emsp;顾名思义，Git-ftp 这个软件必然和 Git 有关，需要在本地安装有 Git 软件，才能实现从本地 Git 仓库上传代码到 ftp，Git-ftp 安装很简单，从 github 里拉取 Git-ftp 可执行文件即可（点击仓库里的 git-ftp 文件，下载到本地即可）。Git-ftp 的 github 地址为：[https://github.com/git-ftp/git-ftp](https://github.com/git-ftp/git-ftp)。
### 1.1 windows下安装使用 git-ftp：
&emsp;&emsp;windows下先安装 Git BASH - Git for Windows，网址为：[https://gitforwindows.org/](https://gitforwindows.org/)。成功安装 Git BASH 后，运行开始菜单 -> Git -> Git Bash， 出现 Git Bash 终端窗口，在 git bash 里将获取到的 git-ftp 文件拷到 /bin 目录下，并运行命令
```bash
chmod 755 /bin/git-ftp
```
&emsp;&emsp;至此完成 windows 下的安装
### 1.2 mac下安装使用 git-ftp：
#### 1.2.1 brew install git-ftp   # macOS
#### 1.2.2 直接部署git-ftp执行文件
&emsp;&emsp;将 https://github.com/git-ftp/git-ftp/git-ftp 获得的文件拷贝到：/usr/local/bin 目录下并运行：
```bash
chmod 755 /usr/local/bin/git-ftp
```
### 1.3 linux下没有测试，应该和mac类似，猜测直接拷贝 git-ftp 执行文件到相关 bin 目录下
## 2.在gitee（或者github）上建立远程仓库test-git-ftp
&emsp;&emsp;以下是在git客户端进行全局设置，Git 全局设置（下方的名称和邮件根据自己信息填写）：
```bash
git config --global user.name "xxx"
git config --global user.email "xxx@qq.com"
```
## 3 建立本地仓库，并创建和上传README.md文件
直接使用clone即可
```bash
git clone git@gitee.com:tbs-demos/test-git-ftp.git（换成自己的代码库路径）
touch README.md
git add README.md
git commit -m "first commit"
git remote add origin https://gitee.com/tbs-demos/test-git-ftp.git
git push -u origin "master"
```
## 4.配置本地仓库的ftp设置
&emsp;&emsp;在git项目的根目录中执行以下命令，配置ftp服务器的地址、用户名和密码：
```bash
git config git-ftp.url ftp://ftp.xxxx.com/xxxx（ftp 服务器的 URL）
git config git-ftp.user xxxx（ftp 服务器的用户名）
git config git-ftp.password ****（ftp 服务器密码）
```
&emsp;&emsp;这些配置信息将被保存在.git/config文件中。

## 5.初始化git-ftp
&emsp;&emsp;在命令行输入：
```bash
git ftp init
```
&emsp;&emsp;当运行成功后，会在网站上创建目标路径文件.

## 6 推送本地代码到网站
&emsp;&emsp;在git项目的根目录中执行以下命令：
```bash
git ftp push
```
## 7 总结
- .gitignore 文件对 Git-ftp 同样适用
- 网站更新时实现了版本管理
- 本地 git 仓库既可以和 gitee（或 github）上的远程仓库实现代码同步，也可以通过本地 git 仓库，使目标网站上的代码和本地仓库保持同步，在需要同步的时候，运行 git ftp push 命令即可。
- 一般来说网站文件虽然尺寸较小，但数量繁多，所以如果用普通模式上传，每次都需要更新上千个文件，非常耗时，使用 Git-fpt 每次只需要进行增量提交就可以了，大幅提升网站更新效率。
