Git 最基本命令
> 参考
> [Git常用命令](https://aistudio.baidu.com/projectdetail/460027?ad-from=5861)  
> [【Git】--工作区、暂存区、版本库、远程仓库](https://www.cnblogs.com/caihongmin/p/17381979.html)  
> 说明：  
> - 此篇只涉及 Git 入门级、测试目的用到的最基本命令，详细应用请参考其他相关教程，如：[菜鸟教程 - Git 教程](https://www.runoob.com/git/git-tutorial.html)、[Gitee 帮助中心](https://gitee.com/help)等
>- 以 Gitee 为示例：  
> 主要考虑到 Gitee 和 Github 常用命令基本一样，且 Gitee 的使用在国内没有限制

## 准备工作：   
- gitee 官网：[https://www.gitee.com](https://www.gitee.com)  
- gitee 用户注册、使用 ssh 管理远程仓库（包括 ssh key 配置）等请自行操作，在用此处不赘述  
- 在 gitee 上建立测试用的代码库 test-git-cmd
- 本地安装 git  
官网：[https://git-scm.com/](https://git-scm.com/)，根据操作系统下载对应版本的 git，自行安装，命令建议在 git bash 里执行

## 1 Git 的四个工作区域
## 2 Git 的工作流程
## 3 Git 文件的四种状态
## 4 Git 的分支操作
## 5 Git 常用命令


## 1 创建本地代码库
创建本地代码库一般有两种形式。  
方式一：在当前还不是代码库的目录里（是不是空目录都可以），使用git init 将当前目录变为本地 Git 仓库；  
方式二：从远程仓库克隆代码到本地，生成的目录就是本地 Git 仓库。  
### 1.1 git init
在当前目录创建一个 Git 代码库
```bash 
git init
```
### 1.2 git clone
下载一个项目和它的整个代码历史
```bash
git clone [url]
```
url 是目标代码库的地址，建议使用 ssh 地址

## 2 Git 配置
### 2.1 git config --list
列举 Git 配置
```bash
git config --list
```
### 2.2 git config --global user.name
配置 Git 用户名
```bash
git config --global user.name = "username"
```
### 2.3 git config --global user.email
配置 Git 用户邮箱
```
git config --global user.email = "user@xxx.com"
```

增加/删除文件

# 添加指定文件到暂存区
$ git add [file1] [file2] ...

# 添加指定目录到暂存区，包括子目录
$ git add [dir]

# 添加当前目录的所有文件到暂存区
$ git add .

# 添加每个变化前，都会要求确认
# 对于同一个文件的多处变化，可以实现分次提交
$ git add -p

# 删除工作区文件，并且将这次删除放入暂存区
$ git rm [file1] [file2] ...

# 停止追踪指定文件，但该文件会保留在工作区
$ git rm --cached [file]

# 改名文件，并且将这个改名放入暂存区
$ git mv [file-original] [file-renamed]

## 3 代码提交
# 提交暂存区到仓库区
$ git commit -m [message]

# 提交暂存区的指定文件到仓库区
$ git commit [file1] [file2] ... -m [message]

# 提交工作区自上次commit之后的变化，直接到仓库区
$ git commit -a

# 提交时显示所有diff信息
$ git commit -v

# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]

# 重做上一次commit，并包括指定文件的新变化
$ git commit --amend [file1] [file2] ...

