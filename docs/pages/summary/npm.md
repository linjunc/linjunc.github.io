---
title: 经常使用npm命令，你真的知道它的意思吗？
date: 2021-5-17 19:00:03
id: 1635663603
photos: 
tags:
  - npm
categories:
  - 前端总结
keywords: npm命令,小丞同学
description: NPM是什么？ 它是一个命令行工具，npm已经被全球超过1100万开发人员所依赖，- 拥有超过一百万个软件包，是世界上最大的软件注册表。
---


## NPM是什么？

它是一个命令行工具，`npm`已经被全球超过1100万开发人员所依赖，- 拥有超过一百万个软件包，是世界上最大的软件注册表。也可以形象的理解为一个应用商城，我们可以在里面下载各种已经编写好的代码，像常用的`jQuery`，`webpack`等等。[官网链接](https://docs.npmjs.com/)


## NPM的安装

- `npm`是[Node.js](http://nodejs.cn)默认的软件包管理系统，安装完node后，会默认安装好npm

安装完毕后，使用cmd控制台(`win + R`)，使用命令`node -v`查看node版本，`npm -v`查看`npm`版本

- 使用命令`npm i npm -g`全局安装`npm`，会默认更新最新版本

## NPM 的基本使用

- `npm -v` ：通过==查看版本==，看`npm`是否安装成功

- `npm install <Module Name>`： 使用 `npm `命令==安装模块==，例如`npm install jquery`
- `npm uninstall <Module Name>`： 使用命令==卸载模块==，例如`npm uninstall jquery`
- `npm update <Module Name>`： 使用命令==更新模块==，例如`npm update jquery`

- `npm install <Module Name> -g` ： 可以直接在命令行里使用，安装在==全局==

- `npm list -g `：查看所有全局安装的模块

- `npm list vue `：查看某个模块的==版本号==

- `npm -g install npm@5.9.1`：（@后跟版本号）这样我们就可以更新`npm`版本，==指定安装版本号==

- `npm install -save moduleName`：` -save` 在package文件的`dependencies`节点写入依赖。默认值

- `npm install -save-dev moduleName` ：` -save-dev` 在package文件的`devDependencies`节点写入依赖
- `dependencies`：==运行时==的依赖，发布后，即生产环境下还需要用的模块

- `devDependencies`：==开发时==的依赖。里面的模块是开发时用的，发布时用不到它。

## NPM 镜像的设置和查看

**查看镜像配置结果** ：`npm config get registry`

**将`npm`设置为淘宝镜像**：`npm config set registry https://registry.npm.taobao.org --global`

**使用`nrm`工具切换淘宝源**：`npx nrm use taobao`

**切换到官方源**：`npx nrm use npm`

## Package.json 属性说明

- `name` ：包名。

- `version` ：包的版本号。

- `description` ：包的描述。

- `homepage` ：包的官网 url 。

- `author` ：包的作者姓名。

- `dependencies` ：依赖包列表

- `repository `：包代码存放的地方的类型。

- `main` ：main 字段指定了程序的主入口文件，`require('moduleName') `就会加载这个文件。

- `keywords` ：关键字

**注意：**

`package.json`文件中版本号的说明，安装的时候代表不同的含义：

"7.14.0"  表示安装指定的` 7.14.0 `版本

"~7.14.0" 表示安装 `7.0.x` 中最新的版本

"^7.14.0" 表示安装`7.x.x`中最新的版本

==特别注意==：当我们将代码文件拷贝给别人时，如果只拷贝了`package.json`文件，可以使用命令`npm install`会直接安装`package.json`下的所有依赖

# yarn 

yarn解决了npm的一些缺陷！

## yarn 安装

在有了npm的基础上这个就很简单了

- 使用`npm`安装`npm install -g yarn`   查看版本：`yarn --version`

**淘宝源安装**：

分别运行一下两行命令：

- `yarn config set registry https://registry.npm.taobao.org -g`
- ` yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g`

**成功提示**：`success Set "registry" to "https://registry.npm.taobao.org".`

## yarn的基本使用

- ` yarn init`：初始化项目  同`npm init`，执行输入信息后，会生成`package.json`文件

- `yarn install `：安装`package.json`里所有包，并将包及它的所有依赖项保存进`yarn.lock`

- `yarn install --flat`：安装一个包的单一版本

- `yarn install --force` ：强制重新下载所有包

- `yarn install --production`：只安装`dependencies`里的包

- `yarn install --no-lockfile`：不读取或生成`yarn.lock`

- `yarn install --pure-lockfile`：不生成`yarn.lock`

- `yarn add [package]`： 在当前的项目中添加一个依赖包，会自动更新到`package.json`和`yarn.lock`文件中

- `yarn add [package]@[version]`：安装指定版本，这里指的是主要版本，如果需要精确到小版本，使用-E参数

- `yarn add [package]@[tag]` ：安装某个tag（比如beta,next或者latest）

- `yarn add --dev/-D`： 加到 `devDependencies`

- `yarn add --peer/-P` ：加到 `peerDependencies`

- `yarn add --optional/-O ` ：加到 `optionalDependencies`

## yarn的优点

1. 速度快
2. 安装版本统一
3. 更简洁的输出
4. 多注册来源处理
5. 更好的语义化

