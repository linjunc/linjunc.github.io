(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{440:function(s,t,a){"use strict";a.r(t);var n=a(62),r=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("p",[a("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/antd.gif",alt:"antd"}})]),s._v(" "),a("blockquote",[a("p",[s._v("📢 大家好，我是小丞同学，一名"),a("strong",[s._v("大二的前端爱好者")])]),s._v(" "),a("p",[s._v("📢 这篇文章是学习 React 中 React antd组件库的学习笔记")]),s._v(" "),a("p",[s._v("📢 非常感谢你的阅读，不对的地方欢迎指正 🙏")]),s._v(" "),a("p",[s._v("📢 "),a("strong",[s._v("愿你忠于自己，热爱生活")])])]),s._v(" "),a("h2",{attrs:{id:"引言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#引言"}},[s._v("#")]),s._v(" 引言")]),s._v(" "),a("p",[s._v("在我们学习"),a("code",[s._v("JavaScript")]),s._v(" 的时候，我们学习了一个 "),a("code",[s._v("bootstrap")]),s._v(" 的组件库。可以让我们快速开发，但是我们现在学习了 React ，一种组件化编程方式，很少说会去贴大量的 HTML 代码，再配一下 CSS，JS。我们也有一些现成的组件库可以使用，我们只需要写一个组件标签即可调用。这让我们 React 开发变得十分的快速，方便和整洁。")]),s._v(" "),a("p",[s._v("我们这里学习的是 "),a("code",[s._v("Ant-design")]),s._v(" （应该是这样），它有很多的组件供我们使用")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210907180731157.png",alt:"image-20210907180731157"}})]),s._v(" "),a("p",[s._v("按钮，日历，这些都是非常常用的组件，我们一起看看如何使用吧")]),s._v(" "),a("h2",{attrs:{id:"_1-antd-组件基本使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-antd-组件基本使用"}},[s._v("#")]),s._v(" 1. Antd 组件基本使用")]),s._v(" "),a("p",[s._v("使用 "),a("code",[s._v("Antd")]),s._v(" 组件非常的简单")]),s._v(" "),a("p",[s._v("引包 ----- 暴露 ---- 使用")]),s._v(" "),a("p",[s._v("首先我们通过组件库来实现一个简单的按钮")]),s._v(" "),a("h4",{attrs:{id:"第一步"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#第一步"}},[s._v("#")]),s._v(" 第一步")]),s._v(" "),a("p",[s._v("安装并引入 "),a("code",[s._v("antd")]),s._v(" 包")]),s._v(" "),a("p",[s._v("使用命令下载这个组件库")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" antd\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("在我们需要使用的文件下引入，我这里是在 "),a("code",[s._v("App.jsx")]),s._v(" 内引入")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" Button "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'antd'")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("在引入的同时，暴露出要使用的组件名 "),a("code",[s._v("Button")])]),s._v(" "),a("p",[s._v("推荐去"),a("a",{attrs:{href:"https://ant.design/components/button-cn/",target:"_blank",rel:"noopener noreferrer"}},[s._v("官方文档"),a("OutboundLink")],1),s._v("查看，都会有代码解释")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210907181354552.png",alt:"image-20210907181354552"}})]),s._v(" "),a("p",[s._v("现在我们可以在 App 中使用 "),a("code",[s._v("Button")]),s._v(" 组件")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("div"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n    App"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("Button type"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"primary"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("Primary Button"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("Button"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("Button"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("Default Button"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("Button"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("Button type"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"dashed"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("Dashed Button"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("Button"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("br "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("Button type"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"text"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("Text Button"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("Button"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("Button type"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"link"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("Link Button"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("Button"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("div"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br")])]),a("p",[s._v("我这里使用了几种按钮")]),s._v(" "),a("p",[s._v("但是就这样你会发现按钮少了样式")]),s._v(" "),a("p",[s._v("我们还需要引入 "),a("code",[s._v("antd")]),s._v(" 的 CSS 文件")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("@"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/node_modules/antd/dist/antd.less'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("可以在 "),a("code",[s._v("node_modules")]),s._v(" 文件中的 "),a("code",[s._v("antd")]),s._v(" 目录下的 "),a("code",[s._v("dist")]),s._v(" 文件夹中找到相应的样式文件，引入即可")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210907181854774.png",alt:"image-20210907181854774"}})]),s._v(" "),a("p",[s._v("即可成功引入 "),a("code",[s._v("antd")]),s._v(" 组件")]),s._v(" "),a("h2",{attrs:{id:"_2-自定义主题颜色"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-自定义主题颜色"}},[s._v("#")]),s._v(" 2. 自定义主题颜色")]),s._v(" "),a("p",[s._v("由于这些组件采用的颜色，都是支付宝蓝，有时候我们不想要这样的颜色，想要用其他的配色，这当然是可以实现的，我们需要引用一些库和更改一些配置文件来实现")]),s._v(" "),a("p",[s._v("在视频中，老师讲解的是 "),a("code",[s._v("3.几")]),s._v(" 版本中的实现方法，这种方法需要去暴露 React 中的配置文件，这种操作是不可返回的，一旦暴露就不可回收。我觉得这不是一个好方法~")]),s._v(" "),a("p",[s._v("在 "),a("code",[s._v("antd")]),s._v(" 最新版中，引入了 "),a("code",[s._v("craco")]),s._v(" 库，我们可以使用 "),a("code",[s._v("craco")]),s._v(" 来实现自定义的效果")]),s._v(" "),a("p",[s._v("首先我们需要安装 "),a("code",[s._v("craco")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" @craco/craco\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("同时我们需要更改 "),a("code",[s._v("package.json")]),s._v(" 中的启动文件")]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"start"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"craco start"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"build"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"craco build"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"test"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"craco test"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"eject"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"react-scripts eject"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("p",[s._v("更改成 "),a("code",[s._v("craco")]),s._v(" 执行")]),s._v(" "),a("p",[s._v("接下来我们需要在根目录下新建一个 "),a("code",[s._v("craco.config.js")]),s._v(" 文件，用于配置自定义内容")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" CracoLessPlugin "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'craco-less'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\nmodule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("plugins")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("plugin")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" CracoLessPlugin"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("options")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("lessLoaderOptions")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("lessOptions")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("modifyVars")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string-property property"}},[s._v("'@primary-color'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'skyblue'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("javascriptEnabled")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n          "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br")])]),a("p",[s._v("其实它就是用来操作 "),a("code",[s._v("less")]),s._v(" 文件的全局颜色")]),s._v(" "),a("p",[s._v("简单的说，"),a("code",[s._v("antd")]),s._v(" 组件是采用 "),a("code",[s._v("less")]),s._v(" 编写的，我们需要通过重新配置的方式去更改它的值")]),s._v(" "),a("p",[s._v("同时我们需要将我们先前的 "),a("code",[s._v("App.css")]),s._v(" 文件更改为 "),a("code",[s._v("App.less")]),s._v(" 文件，在当中引入我们的 "),a("code",[s._v("less")]),s._v(" 文件")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("@"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/node_modules/antd/dist/antd.less'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("注意一定要添加"),a("strong",[s._v("分号结尾")]),s._v("，这是一个非常容易犯的错误")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210907200116517.png",alt:"image-20210907200116517"}})]),s._v(" "),a("p",[s._v("可见，我们成功的将主题色修改成了红色")]),s._v(" "),a("blockquote",[a("p",[s._v("antd ui组件库就记这么多，还有样式的按需引入没有记录，不太喜好暴露 React 配置文件...")])])])}),[],!1,null,null,null);t.default=r.exports}}]);