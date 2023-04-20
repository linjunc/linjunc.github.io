# 快速配置开发环境

## 安装开发应用

需要安装必用开发软件

Chrome、VSCode、XCode、iTerm2、Fig、Snipaste、Rectangle

直接在官网进行安装

- iTerm2: [https://iterm2.com/](https://iterm2.com/)
- Fig: [https://fig.io/](https://fig.io/)
- XCode: app store
- Snipaste: [https://www.snipaste.com/](https://www.snipaste.com/)

登录相关账号，同步使用的配置

## 配置开发环境

### HomeBrew

官网：[https://brew.sh/index_zh-cn](https://brew.sh/index_zh-cn)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### NVM

文档：[https://github.com/nvm-sh/nvm/blob/master/README.md](https://github.com/nvm-sh/nvm/blob/master/README.md)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

如果安装出错，可以看[这篇](https://www.jianshu.com/p/622ad36ee020)

安装完成用下面的命令保存

```bash
source ~/.zshrc 
```

用 nvm -v 检查

再安装指定 node 的版本
### NPM

npm 配置镜像地址

```bash
npm set registry xxx
```

### ZSH

官网：[https://ohmyz.sh/](https://ohmyz.sh/)

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```


安装完成用下面的命令保存

```bash
source ~/.zshrc 
```

zsh 插件安装

```bash
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```