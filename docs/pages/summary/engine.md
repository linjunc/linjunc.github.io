# 搭建自己喜欢的开发环境

这篇文章将会带你从零开始搭建一个 React 开发环境，当然你可能会觉得用 cra 或者 vite 都可以很快的创建好开发的环境，但是他们的可操作性太差了，
当然你可以又会说可以借助一些其他的库来更改配置，这样还是容易陷于一个黑盒之中

这也是我选择自己搭建开发环境的一个原因，可控，按需

## 为什么会写这篇文章？

自己已经很久没有做过业务上的东西了，最近想要重拾一下业务的开发，想做点东西，于是开始了开发环境的搭建，发现之前的搭建经验都没有沉淀下来，网上的资料层次不齐，
之前踩过的坑，现在又踩了一遍，搭建了很久才完成

为了以后能够快速的搭建好项目框架，因此决定还是要沉淀到文档当中，方便以后搭建项目时快速上手，也为大家提供一个搭建项目的方向吧

## 使用到的技术

这篇文章最终搭建完成的是一个 React + TypeScript 的项目，包含以下内容

- React
- TypeScript
- Rollup 打包工具
- Less 采用 less 预处理器
- storybook 用来做预览
- prettier 代码自动格式化
- eslint 代码检查
- husky + lint-staged + commitlint 提交规范

## 一、项目初始化及配置

### 1. package.json

每一个项目都需要一个 package.json 文件，它的作用是记录项目的配置信息，比如我们的项目名称、包的入口文件、项目版本等，也会记录所需的各种依赖，还有很重要的 script 字段，它指定了运行脚本命令的 npm 命令行缩写。

```bash
npm install -y
```

可以通过 `-y` 快速生成 `package.json，再修改即可

![npm-init](/img/summary/engine/npm-init.png)

也可以不 `-y` ,按照提示生成默认的配置

先简单修改一下这些配置，其他的暂时不用改

- description ：增加了对该项目的描述，github 进行 repo 搜索时，关键字匹配会使你的项目更容易被搜索到。
- keywords ：增加了项目关键字，其他开发者在 npm 上搜索的时候，适合的关键字能你的包更容易被搜索到。
- author ：添加了更具体的作者信息。
- license ：开源协议。

### 2. LICENSE 开源协议

这个的话，就只是一个文件，npm 初始化的时候可以选择想要的开源协议。如果没选可以到开源协议的官网上，把 license 复制下来改一下作者年份即可，没有什么复杂的

```txt
Copyright (c) 2022 linjunc

Permission is hereby granted, free of charge, to any person obtaining a copy
...
```

可以看看阮一峰老师的这张图来选择

![license](/img/summary/engine/licenses.png)

### 3. README 介绍文档

作为一个 Github 仓库，我们还是需要添加一个 README 文档，以便外部人员快速了解这个项目是做什么的，对他们是否有用。
这里推荐创建 `README.md` 和 `README_zh.md`，中英文都考虑上

README 文档是项目的门面，需要好好的设计

### 4. .gitignore

该文件决定了项目进行 git 提交时所需要忽略掉的文件或文件夹，编辑器如 vscode 也会监听 .gitignore 之外的所有文件，如果没有进行忽略的文件有所变动时，在进行 git 提交时就会被识别为需要提交的文件。

在我们平时的项目开发时就有很多的文件是不需要提交，最典型的就是 node_modules，我们只需要把 lock 提交，开发者拉库后 install 即可

创建 .gitignore 文件添加以下内容

```txt
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
yarn.lock

# Sys
.DS_Store
.idea

# Node
node_modules/

# Build
dist
lib
esm

# Test
coverage

# Bundle visualizer
stats.html
```

## 二、Rollup 插件安装

完成了项目的简单初始化，下面我们开始配置 rollup 来打包 React 应用

### 1. 安装 Rollup 相关依赖

- `rollup-plugin-commonjs` 的作用：将CommonJS模块转换为ESM
- `rollup-plugin-node-resolve` 的作用：帮助 Rollup 查找外部模块，可以直接node_modules模块
- `rollup-plugin-clear` 的作用 在打包前删除不需要的文件或者清空输出目录
- `rollup-plugin-terser` 的作用 压缩代码

```bash
yarn add -D rollup rollup-plugin-commonjs @rollup/plugin-node-resolve rollup-plugin-clear rollup-plugin-terser
```

### 2. 安装 TypeScript 相关依赖

对 ts 代码进行处理

```bash
yarn add -D typescript rollup-plugin-typescript2 
```

### 3. 安装 babel 处理 js

```bash
yarn add -D @babel/core @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime @rollup/plugin-babel
```

### 4. 安装 HTML 依赖

```bash
yarn add -D rollup-plugin-generate-html-template
```

### 5. 安装 React

```bash
yarn add react react-dom 
yarn add -D @types/react @types/react-dom
```

### 6. 安装启动服务器

- `rollup-plugin-serve`: 启动一个服务器
- `rollup-plugin-livereload`: 实时刷新页面

```bash
yarn add -D rollup-plugin-serve rollup-plugin-livereload
```

### 7. 处理 CSS、Less

```bash
yarn add -D postcss rollup-plugin-postcss less
```

### 8. 其他

- `rollup-plugin-replace`: 替换变量

```bash
yarn add -D rollup-plugin-replace
```  

## 三、搭建目录结构

在安装好了这些插件后，我们开始搭建目录结构

当然正常来说，我们需要根据需要来选择需要安装的插件，但是这里我们需求明确，对我们需要的技术比较清晰，因此这里先安装插件

目录结构和 CRA 创建的结构保持一致即可

1. 在根目录新增 public 文件夹，存放静态资源，新增 index.html 作为 入口
2. 创建 src 文件夹，也就是我们日常编码的文件夹了
3. 新增 `index.tsx` 作为打包 ts 的入口，以及连接 html 的入口

目录结构如下

![toc](/img/summary/engine/toc.png)

## 四、Rollup 完整配置

这样我们就完成了 `Rollup` 的插件的安装，完整的配置文件如下

```js
import typescript from 'rollup-plugin-typescript2'
import clear from 'rollup-plugin-clear'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import htmlTemplate from 'rollup-plugin-generate-html-template'
import postcss from 'rollup-plugin-postcss'

export default {
  input: ['./src/index.tsx'],
  output: {
    file: 'dist/main.js',
    format: 'cjs',
  },
  plugins: [
    typescript(), // 会自动读取tsconfig.json配置文件
    postcss({
      extensions: ['.css'], // 将less解析成css
      extract: true,
    }),
    clear({
      targets: ['dist'],
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV1': JSON.stringify('production'),  // ENV1 改成 EVN ，否则出错
    }),
    nodeResolve({}),
    commonjs(),
    babel(), // 会自动读取babel的配置文件
    terser(),
    serve('dist'),
    livereload(), // 当src目录中的文件发生变化时，刷新页面
    htmlTemplate({
      template: 'public/index.html',
      target: 'dist/index.html',
    }),
  ],
  external: [
    {
      includeDependencies: true,
    },
  ], // 项目中引用的第三方库
}
```

## 五、配置 TS、Babel

在项目中添加 `tsconfig.json`，根据自己习惯来

```json
{
  "compilerOptions": {
    "target": "es2016",
    "jsx": "react",
    "module": "ESNext",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "baseUrl": "./",
    "moduleResolution": "node",
    "paths": {
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    }
  },
  "include": ["src/**/*", "typings.d.ts"],
  "exclude": ["node_modules"]
}
```

添加 `.babelrc` 解析 ES6+

你在代码中用到的 ES6+ 语法编译之后依然全部保留，然而不是所有浏览器都能支持 ES6+ 语法的，
这时候就需要 `@babel/preset-env` 来做这了，它会根据设置的目标浏览器环境（browserslist）找出所需的插件去转译 ES6+ 语法。

比如 const 或 let 转译为 var

但是遇到 `Promise` 或 `.includes` 这种新的 es 特性，是没办法转译到 es5 的，除非我们把这中新的语言特性的实现注入到打包后的文件中

我们借助 `@babel/plugin-transform-runtime` 这个插件，它和 `@babel/preset-env` 一样都能提供 ES 新API 的垫片，**都可实现按需加载**

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false
      }
    ]
  ],
  "plugins": [["@babel/plugin-transform-runtime"]],
  "ignore": ["node_modules/**"]
}
```

## 六、添加 script 启动脚本

在 package.json 中，添加 启动脚本即可

```json
"scripts": {
    "dev": "rollup -wc",
  },
```

到此为止，我们的 react + typescript 项目开发环境已经可行了，就是说现在已经可以正常进行开发了

执行 `yarn dev` 即可启动

![success](/img/summary/engine/success.png)

还有一些规范的东西，接着往下看

## 七、添加 Prettier 格式化

`Prettier` 可以帮你统一项目代码风格

在我们的项目中执行以下命令安装依赖包：

```bash
yarn add -D prettier 
```

安装成功之后在根目录新建文件 `.prettierrc` ，输入以下配置：

```json
{
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true,
  "endOfLine": "lf",
  "printWidth": 120,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

- `trailingComma` ：对象的最后一个属性末尾也会添加 , ，比如 { a: 1, b: 2 } 会格式为 { a: 1, b: 2, } 。
- `tabWidth` ：缩进大小。
- `semi` ：分号是否添加
- `singleQuote` ：是否单引号
- `jsxSingleQuote` ：jsx 语法下是否单引号
- `endOfLine` ：与 .editorconfig 保持一致设置。
- `printWidth` ：单行代码最长字符长度，超过之后会自动格式化换行。
- `bracketSpacing` ：在对象中的括号之间打印空格， {a: 5} 格式化为 { a: 5 } 。
- `arrowParen`s ：箭头函数的参数无论有几个，都要括号包裹。比如 (a) => {} ，如果设为 avoid ，会自动格式化为 a => {} 。

接着我们可以在项目中新增 `.vsocde` 文件夹，用来设置 vscode 的配置，将 prettier 作为格式化的默认工具，VSCode 需要安装 Prettier 插件哦

```js
// .vscode/setting
{
  "search.exclude": {
    "**/node_modules": true,
    "dist": true,
    "yarn.lock": true
  },
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

`editor.formatOnSave` 的作用是在我们保存时，会**自动执行一次代码格式化**，而我们该使用什么格式化器？

在遇到 .js 、 .jsx 、.ts 、.tsx 、.json 、.html 、.md 、 .css 、 .less 、 .scss 为后缀的文件时，都会去使用 `Prettier` 去格式化代码，而格式化的规则就是我们配置的 `.prettierrc` 决定的！

## 八、ESLint 配置

Prettier 都是为了解决代码风格问题，而 ESLint 是主要为了**解决代码质量问题**，它能在我们编写代码时就检测出程序可能出现的**隐性 BUG**

通过 `eslint --fix` 还能自动修复一些代码写法问题。比如你定义了 `var a = 3` ，自动修复后为 `const a = 3`

还有许多类似的强制扭转代码最佳写法的规则，在无法自动修复时，会给出红线提示

首先我们需要安装 ESLint，还有一些使用到的 eslint 插件

```bash
yarn add -D eslint eslint-plugin-promise eslint-plugin-unicorn eslint-plugin-import
```

- `eslint-plugin-promise` ：让你把 Promise 语法写成最佳实践。
- `eslint-plugin-unicorn` ：提供了更多有用的配置项，比如我会用来规范关于文件命名的方式。
- `eslint-plugin-import` ： 支持 ES2015，ES6+ 导入导出语法的检查，并防止文件路径和导入名称拼写错误的问题

还有一些 TypeScript 的 ESLint 插件也需要一起装一下

```bash
yarn add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

- `@typescript-eslint/parser`： typescript ESLint 语法解析器
- `@typescript-eslint/eslint-plugin`：为 TypeScript 代码提供 lint 规则

### ESLint 配置如下

```js
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript"
  ],
  "rules": {
    "no-constant-condition": [
      "error",
      {
        "checkLoops": false
      }
    ],
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "import/no-unresolved": "off",
    "no-multiple-empty-lines": 1,
    "import/order": "warn",
    "import/namespace": "warn"
  },
  "env": {
    "node": true,
    "jest": true
  }
}
```

配合 ESLint 插件使用更佳

## 九、lint-staged 校验

在项目开发过程中，每次提交前我们都要对代码进行格式化以及 `eslint`  的规则校验，以此来强制规范我们的代码风格，以及防止隐性 BUG 的产生。

但是有时候要是忘记了校验就提交了代码，那么其他人看到你的代码的时候就会有很多的错误，因此我们可以在 commit 阶段，对代码进行检查校验，通过之后才能正常提交

我们可以用 `husky` 和 `lint-staged` 来实现这个功能

1. 先装两个包

```bash
yarn add -D husky lint-staged
```

2. 在项目中增加 `.lintstagedrc` 文件，用来配置 lint-staged 的校验规则

```js
{
  "*.{ts,tsx,js}": [
    "eslint --config .eslintrc"
  ],
  "*.{ts,tsx,js,json,html,yml,css,less,scss,md}": [
    "prettier --write"
  ]
}
```

首先，我们会对暂存区后缀为 `.ts .tsx .js` 的文件进行 eslint 校验， `--config` 的作用是指定配置文件。

没有添加 `--fix` 来**自动修复不符合规则的代码**，因为自动修复的内容对我们不透明，不知道哪些代码被更改了，但是这些会被提交上去，感觉还是不合适

3. 同时我们还需要在 package.json 中添加 `lint-staged` 的执行命令

```json
  "scripts": {
    ...
    "prepare": "husky install",
    "lint": "eslint src",
    "lint-staged": "lint-staged",
  },
```

4. 执行 `yarn prepare` 来启动 husky，会在项目中看到一个 `.husky` 的文件夹

5. 添加 pre-commit 钩子，用于提交前的校验

```bash
npx husky add .husky/pre-commit "yarn lint-staged" 
```

这样我们的代码校验就配置好了，我们接着再配一个 commitlint 的提交信息规范

## 十、commitlint 提交信息规范

类似于这种提交规范

```bash
type(scope?): subject 换行 body 换行 footer
feat(xxx): 规范
```

`commitlint rule` 语法

rule 语法：规则名称: [级别, 适用, 值]

级别：可选 0,1,2。0禁用规则，1警告，2报错。
适用：可选 always, never。

1. 首先安装依赖

```bash
yarn add -D @commitlint/cli @commitlint/config-conventional
```

2. 添加 commit-msg 钩子

```bash
npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"
```

3. 创建 .commitlintrc.js

指定一些 commit 规则

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      // type枚举
      2,
      'always',
      [
        'build', // 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
        'feat', // 新功能
        'fix', // 修补bug
        'docs', // 文档修改
        'style', // 代码格式修改, 注意不是 css 修改
        'refactor', // 重构
        'perf', // 优化相关，比如提升性能、体验
        'test', // 测试用例修改
        'revert', // 代码回滚
        'ci', // 持续集成修改
        'config', // 配置修改
        'chore', // 其他改动
        'wip',
      ],
    ],
    'type-empty': [2, 'never'], // never: type不能为空; always: type必须为空
    'type-case': [0, 'always', 'lower-case'], // type必须小写，upper-case大写，camel-case小驼峰，kebab-case短横线，pascal-case大驼峰，等等
    'scope-empty': [0],
    'scope-case': [0],
    'subject-empty': [1, 'never'], // subject不能为空
    'subject-case': [0],
    'subject-full-stop': [0, 'never', '.'], // subject以.为结束标记
    'header-max-length': [2, 'always', 72], // header最长72
    'body-leading-blank': [0], // body换行
  },
}

```

当不符合规则时，会打断提交
![commit](/img/summary/engine/commit.png)

到这里我们的项目就搭建完成了，commit 规范、代码规范、打包都搞定了，最后我们再加个 storybook 的配置

## Storybook 引入

非常简单，直接执行下面的命令，会自动的去为你的项目添加 storybook 支持

```bash
npx storybook init
```

采用 `yarn storybook` 即可启动

但是这里有个坑，我们的项目使用的是 less 的语法，但是 storybook 不支持 less，因此我们需要配置 storybook 的 webpack，让他能够支持 less

在安装完 storybook 之后，项目中会有 .storybook 的文件夹，main.js 就是他的配置，我们增加 `webpackFinal` 配置解析 less

这里用 less-loader 和 style-loader，需要安装一下，**特别注意**，style-loader 会有版本兼容问题，我们必须要安装指定的版本

```bash
yarn add -D less-loader@5.0.0 style-loader@1.3.0 
```

更改配置

```js
// .storybook/main.js
const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
      include: path.resolve(__dirname, '../'),
    })
    return config
  },
}
```

这样 storybook 就可以正常启动了

## 总结

这些配置都是在项目搭建的时候真实使用的，为了让自己在下次搭建的时候能够快速完成，写下这篇文章，同时也算是为自己的 cli 工具埋下铺垫吧，后续会把这个架构通过 cli 工具来生成，就类似 cra 那种，
有一套自己的开发环境还是很舒服的

希望能对你有些帮助～

## 参考资料

- [我是这样搭建Typescript+React项目环境的！](https://github.com/vortesnail/blog/issues/14)
- [使用 rollup 搭建react项目](https://juejin.cn/post/7123761493807464455)
