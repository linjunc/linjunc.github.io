---
title: 通俗易懂的GIT入门
date: 2021-8-18 12:03:14
id: 1635408974
photos: https://ljcimg.oss-cn-beijing.aliyuncs.com/img/git%E5%85%A5%E9%97%A8.png
tags:
  - Git
categories:
  - 前端总结
keywords: git,github
description: Git 从零入门，实现将本地文件上传到 Github 中
---
<!-- more -->


> 📢 大家好，我是小丞同学，一名<font color=#2e86de>准大二的前端爱好者</font>
>
> 📢 这篇文章将结合使用场景，带你轻松入门 GIT 
>
> 📢 <font color=#f368e0>**愿你忠于自己，热爱生活**</font>

## 引言

Git 作为目前最强大的代码管理工具，相信大家都很熟悉了。它在我们的日常工作中起着至关重要的作用，我们可以用它来实现多人开发。也可以用来方便我们自己，在我们坐车的时候，可以用手机看看自己刚刚上传的代码。这些都是不错的选择，下面我们就结合场景来学习一下 Git 的基本命令

## 场景实战

我们的第一个任务是：将代码提交到 Gitee / Github 远程仓库中

### 🍈 1. 创建远程代码仓库

首先我们需要创建一个远程仓库，这里我选择的是 Gitee 

![image-20210818095208591](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210818095208591.png)

### 🍉 2. 全局设置 Git

在使用 Git 之前，我们需要设置用户名和邮箱，以方便记录代码的提交者是谁

用户名

```shell
git config --global user.name "your_username"
```

邮箱

```shell
git config --global user.email "your_email"
```

### 🍊 3. 创建本地代码仓库

在配置好全局设置后，我们可以新建一个文件夹，用来当作本地代码仓库

建好文件夹后，我们需要初始化代码仓库

```shell
git init
```

这时候在这个文件夹下就会创建一个隐藏的 `.git` 文件，这样就创建好了

### 🍋 4. 暂存文件

这时候我们在当前文件夹下创建一个文件

```shell
touch README.md
```

然后随意添加点文件内容

将修改的文件保存到暂存区

```shell
git add .
```

`.` 表示目录下的全部文件，也就是提交所有

如果只想上传某个可以这样

```shell
git add README.md
```

### 🍌 5. 提交修改

将文件保存到暂存区之后，我们需要将文件提交到本地仓库

```js
git commit -m "first commit"
```

引号内容是我们此次提交的注释，解释这次提交修改的内容之类的

在某些考核的过程中，可能会**限制代码提交的次数**

我们可以将此次的修改加到上一次提交中

```shell
git commit --amend
```

### 🥭 6. 与远程仓库建立连接

在推送代码之前我们需要与远程仓库建立连接，不然本地参考怎么知道上传到哪里呢？

```shell
git remote add origin 仓库地址
```

仓库地址在 Gitee 上可以查看

![image-20210818103933397](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210818103933397.png)

### 🍍 7. 推送代码

在提交代码到本地仓库后，我们需要将它推送到远程仓库中

```shell
git push -u origin master
```

**注意**：第一次推送分支时，加上 `-u` ，在推送分支内容的同时，会与远端的分支关联起来，下次提交不需 `-u`

可以直接

```shell
git push origin master
```

### 🥭 8. 查看远程仓库

这时候我们可以在远程仓库上，看到自己刚刚上传的代码

![image-20210818110316476](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210818110316476.png)

这样我们就完成了我们的第一个任务，上传代码

接收第二个任务，现在我们的项目有两个开发人员，我们需要创建一个分支，用于平时的开发

### 🍎 9. 创建分支

创建分支可以保证各个功能的相对独立，不用一起修改同个分支的代码文件

我们可以先查看当前仓库下的所有分支

```shell
git branch
```

创建一个 `dev` 分支

```shell
git branch dev
```

切换到 `dev` 分支

```shell
git checkout "dev"
```

以上的分支操作，还可以采用其他的方法

创建分支并切换到该分支

```shell
git checkout -b "分支名"
```

也可以采用 `switch` （推荐）

```shell
git switch -c "分支名"
```

切换分支也可以采用 `switch` 

```shell
git switch 分支名
```

然后我们可以通过切换到 dev 分支上，进行正常的提交推送，就像这样

![image-20210818112933698](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210818112933698.png)

### 🍏 10. 合并分支

平时我们在 `dev` 分支上开发，到一定时候是，我们需要将我们的分支合并到主干分支上

首先需要切换到 `master` 分支

```shell
git checkout master
```

然后合并 dev 分支

```shell
git merge dev
```

合并完成后要 push 到远程仓库

```shell
git push origin master
```

### 🍐 11. 删除分支

当我们不再需要这个分支时，我们就可以删除它

```shell
git branch -D 分支名
```

这只是删除了本地的分支

我们还要删除远程仓库的分支

```shell
git push origin --delete 分支名
```

![image-20210818114242674](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210818114242674.png)

此时已删除成功

我们成功的学会了第二个任务，现在你的同事推送了代码我们需要同步一下

### 🍑 12. 拉取代码

直接拉取就好了

```shell
git pull
```

在我们多人开发的过程中，上传代码前一定要**先拉取远程仓库的代码**

---

以上就是一个拉取上传的完整操作了

下面是一些其他的命令，可以结合使用 

### 🍒 13. 其他命令

#### 1. 查看文件状态

```shell
git status
```

#### 2. 查看提交历史记录

```shell
git log
```

#### 3. 代码回滚

版本号可以在 gitee 上看到，也可以在 log 中看到

```shell
git checkout 版本号
```

#### 4. 克隆项目

```shell
git clone 地址
```

指定克隆下来的文件位置

```shell
git clone git地址 '文件存放路径'
```

#### 5. 储藏修改

把本地修改储藏起来，等恢复后再继续工作

```shell
git stash
```

#### 6. 查看储藏信息

```shell
git stash list
```

#### 7. 恢复储藏信息

```shell
git stash apply
```

#### 8. 删除储藏内容

```shell
git stash drop
```

> 非常感谢您的阅读，欢迎提出你的意见，有什么问题欢迎指出，谢谢！🎈

