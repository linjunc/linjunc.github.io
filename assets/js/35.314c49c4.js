(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{454:function(t,s,a){"use strict";a.r(s);var e=a(62),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[a("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/redux%E5%9F%BA%E7%A1%80.gif",alt:"redux基础"}})]),t._v(" "),a("blockquote",[a("p",[t._v("📢 大家好，我是小丞同学，一名"),a("font",{attrs:{color:"#2e86de"}},[a("strong",[t._v("大二的前端爱好者")])])],1),t._v(" "),a("p",[t._v("📢 这篇文章是学习 Redux 的学习笔记")]),t._v(" "),a("p",[t._v("📢 非常感谢你的阅读，不对的地方欢迎指正 🙏")]),t._v(" "),a("p",[t._v("📢 "),a("font",{attrs:{color:"#f368e0"}},[a("strong",[t._v("愿你忠于自己，热爱生活")])])],1)]),t._v(" "),a("h2",{attrs:{id:"引言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#引言"}},[t._v("#")]),t._v(" 引言")]),t._v(" "),a("p",[t._v("在了解了 Antd 组件库之后，我们现在开始学习了 Redux ，在我们之前写的案例当中，例如：todolist 案例，GitHub 搜索案例当中，我们对于状态的管理，都是通过 state 来实现的，比如，我们在给兄弟组件传递数据时，需要先将数据传递给父组件，再由父组件转发 给它的子组件。这个过程十分的复杂，后来我们又学习了"),a("strong",[t._v("消息的发布订阅")]),t._v("，我们通过 "),a("strong",[t._v("pubsub")]),t._v(" 库，实现了消息的转发，直接将数据发布，由兄弟组件订阅，实现了兄弟组件间的数据传递。但是，随着我们的需求不断地提升，我们需要进行更加复杂的数据传递，更多层次的数据交换。"),a("strong",[t._v("因此我们为何不可以将所有的数据交给一个中转站，这个中转站独立于所有的组件之外，由这个中转站来进行数据的分发，这样不管哪个组件需要数据，我们都可以很轻易的给他派发。")])]),t._v(" "),a("p",[t._v("而有这么一个库就可以帮助我们来实现，那就是 Redux ，它可以帮助我们实现集中式状态管理")]),t._v(" "),a("h2",{attrs:{id:"_1-什么情况使用-redux"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-什么情况使用-redux"}},[t._v("#")]),t._v(" 1. 什么情况使用 Redux ？")]),t._v(" "),a("p",[t._v("首先，我们先明晰 "),a("code",[t._v("Redux")]),t._v(" 的作用 ，实现集中式状态管理。")]),t._v(" "),a("p",[a("code",[t._v("Redux")]),t._v("  适用于多交互、多数据源的场景。简单理解就是"),a("strong",[t._v("复杂")])]),t._v(" "),a("p",[t._v("从组件角度去考虑的话，当我们有以下的应用场景时，我们可以尝试采用 "),a("code",[t._v("Redux")]),t._v(" 来实现")]),t._v(" "),a("ol",[a("li",[t._v("某个组件的状态需要共享时")]),t._v(" "),a("li",[t._v("一个组件需要改变其他组件的状态时")]),t._v(" "),a("li",[t._v("一个组件需要改变全局的状态时")])]),t._v(" "),a("p",[t._v("除此之外，还有很多情况都需要使用 Redux 来实现（还没有学  hook，或许还有更好的方法）")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210909194446988.png",alt:"image-20210909194446988"}})]),t._v(" "),a("p",[t._v("（从掘友的文章里截的图）")]),t._v(" "),a("p",[t._v("这张图，非常形象的将纯 React 和 采用 Redux 的区别体现了出来")]),t._v(" "),a("h2",{attrs:{id:"_2-redux-的工作流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-redux-的工作流程"}},[t._v("#")]),t._v(" 2. Redux 的工作流程")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210909194900532.png",alt:"image-20210909194900532"}})]),t._v(" "),a("p",[t._v("首先组件会在 Redux 中派发一个 "),a("code",[t._v("action")]),t._v(" 方法，通过调用 "),a("code",[t._v("store.dispatch")]),t._v(" 方法，将 "),a("code",[t._v("action")]),t._v(" 对象派发给 "),a("code",[t._v("store")]),t._v(" ，当 "),a("code",[t._v("store")]),t._v(" 接收到 "),a("code",[t._v("action")]),t._v(" 对象时，会将先前的 "),a("code",[t._v("state")]),t._v(" 与传来的 "),a("code",[t._v("action")]),t._v(" 一同发送给 "),a("code",[t._v("reducer")]),t._v(" ，"),a("code",[t._v("reducer")]),t._v("  在接收到数据后，进行数据的更改，返回一个新的状态给 "),a("code",[t._v("store")]),t._v(" ，最后由 "),a("code",[t._v("store")]),t._v(" 更改 "),a("code",[t._v("state")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/12/16e5fd1597faec4d~tplv-t2oaga2asx-watermark.awebp",alt:"img"}})]),t._v(" "),a("p",[t._v("（图来自掘金社区，侵删）")]),t._v(" "),a("h2",{attrs:{id:"_3-redux-三个核心概念"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-redux-三个核心概念"}},[t._v("#")]),t._v(" 3. Redux 三个核心概念")]),t._v(" "),a("h4",{attrs:{id:"_1-store"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-store"}},[t._v("#")]),t._v(" 1. store")]),t._v(" "),a("p",[a("code",[t._v("store")]),t._v(" 是 Redux 的核心，可以理解为是 Redux 的数据中台，我们可以将任何我们想要存放的数据放在 "),a("code",[t._v("store")]),t._v(" 中，在我们需要使用这些数据时，我们可以从中取出相应的数据。因此我们需要先创建一个 "),a("code",[t._v("store")]),t._v(" ，在 Redux 中可以使用 "),a("code",[t._v("createStore")]),t._v(" API 来创建一个 "),a("code",[t._v("store")])]),t._v(" "),a("p",[t._v("在生产中，我们需要在 "),a("code",[t._v("src")]),t._v(" 目录下的 "),a("code",[t._v("redux")]),t._v(" 文件夹中新增一个 "),a("code",[t._v("store.js")]),t._v(" 文件，在这个文件中，创建一个 "),a("code",[t._v("store")]),t._v(" 对象，并暴露它")]),t._v(" "),a("p",[t._v("因此我们需要从 "),a("code",[t._v("redux")]),t._v(" 中暴露两个方法")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    createStore"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    applyMiddleware\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'redux'")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])]),a("p",[t._v("并引入为 count 组件服务的 reducer")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" countReducer "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./count_reducer'")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("最后调用 "),a("code",[t._v("createStore")]),t._v(" 方法来暴露 "),a("code",[t._v("store")])]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createStore")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("countReducer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("applyMiddleware")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("thunk"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("这里采用了中间件，本文应该不会写到~")]),t._v(" "),a("p",[t._v("在 "),a("code",[t._v("store")]),t._v(" 对象下有一些常用的内置方法")]),t._v(" "),a("p",[t._v("获取当前时刻的 "),a("code",[t._v("store")]),t._v(" ，我们可以采用 "),a("code",[t._v("getStore")]),t._v(" 方法")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" state "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" store"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getState")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("在前面我们的流程图中，我们需要通过 "),a("code",[t._v("store")]),t._v(" 中的 "),a("code",[t._v("dispatch")]),t._v(" 方法来派生一个 "),a("code",[t._v("action")]),t._v(" 对象给 "),a("code",[t._v("store")])]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("store"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("dispatch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("action对象")]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("最后还有一个 "),a("code",[t._v("subscribe")]),t._v(" 方法，这个方法可以帮助我们订阅 "),a("code",[t._v("store")]),t._v(" 的改变，只要 "),a("code",[t._v("store")]),t._v(" 发生改变，这个方法的回调就会执行")]),t._v(" "),a("p",[t._v("为了监听数据的更新，我们可以将 "),a("code",[t._v("subscribe")]),t._v(" 方法绑定在组件挂载完毕生命周期函数上，但是这样，当我们的组件数量很多时，会比较的麻烦，因此我们可以直接将 "),a("code",[t._v("subscribe")]),t._v(" 函数用来监听整个 "),a("code",[t._v("App")]),t._v("组件的变化")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("store"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("subscribe")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    ReactDOM"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("render")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" App "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'root'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])]),a("h4",{attrs:{id:"_2-action"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-action"}},[t._v("#")]),t._v(" 2. action")]),t._v(" "),a("p",[a("code",[t._v("action")]),t._v(" 是 "),a("code",[t._v("store")]),t._v(" 中唯一的数据来源，一般来说，我们会通过调用 "),a("code",[t._v("store.dispatch")]),t._v(" 将 action 传到 store")]),t._v(" "),a("p",[t._v("我们需要传递的 "),a("code",[t._v("action")]),t._v(" 是一个对象，它必须要有一个 "),a("code",[t._v("type")]),t._v(" 值")]),t._v(" "),a("p",[t._v("例如，这里我们暴露了一个用于返回一个 "),a("code",[t._v("action")]),t._v(" 对象的方法")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("createIncrementAction")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("data")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("type")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("INCREMENT")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    data\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])]),a("p",[t._v("我们调用它时，会返回一个 "),a("code",[t._v("action")]),t._v(" 对象")]),t._v(" "),a("h4",{attrs:{id:"_3-reducer"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-reducer"}},[t._v("#")]),t._v(" 3. reducer")]),t._v(" "),a("p",[t._v("在 Reducer 中，我们需要指定状态的操作类型，要做怎样的数据更新，因此这个类型是必要的。")]),t._v(" "),a("p",[t._v("reducer 会根据 action 的指示，对 state 进行对应的操作，然后返回操作后的 state")]),t._v(" "),a("p",[t._v("如下，我们对接收的 action 中传来的 type 进行判断")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("countReducer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("preState "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" initState"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" action")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        type"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        data\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" action"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("switch")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("type"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("INCREMENT")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" preState "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" data\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("DECREMENT")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" preState "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" data\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" preState\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br")])]),a("p",[t._v("更改数据，返回新的状态")]),t._v(" "),a("h2",{attrs:{id:"_4-创建-constant-文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-创建-constant-文件"}},[t._v("#")]),t._v(" 4. 创建 constant 文件")]),t._v(" "),a("p",[t._v("在我们正常的编码中，有可能会出现拼写错误的情况，但是我们会发现，拼写错误了不一定会报错，因此就会比较难搞。")]),t._v(" "),a("p",[t._v("我们可以在 "),a("code",[t._v("redux")]),t._v(" 目录下，创建一个 "),a("code",[t._v("constant")]),t._v(" 文件，这个文件用于定义我们代码中常用的一些变量，例如")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("INCREMENT")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'increment'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("DECREMENT")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'decrement'")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("p",[t._v("将这两个单词写在 "),a("code",[t._v("constant")]),t._v(" 文件中，并对外暴露，当我们需要使用时，我们可以引入这个文件，并直接使用它的名称即可")]),t._v(" "),a("p",[t._v("直接使用 "),a("code",[t._v("INCREMENT")]),t._v(" 即可")]),t._v(" "),a("h2",{attrs:{id:"_5-实现异步-action"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-实现异步-action"}},[t._v("#")]),t._v(" 5. 实现异步 action")]),t._v(" "),a("p",[t._v("一开始，我们直接调用一个异步函数，这虽然没有什么问题，但是难道 redux 就不可以实现了吗？")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("incrementAsync")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" value "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("selectNumber\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" count "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setState")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("count")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" count "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" value "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("500")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br")])]),a("p",[t._v("我们可以先尝试将它封装到 "),a("code",[t._v("action")]),t._v(" 对象中调用")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("createIncrementAsyncAction")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" time")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 无需引入 store ，在调用的时候是由 store 调用的")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("dispatch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("dispatch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createIncrementAction")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" time"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br")])]),a("p",[t._v("当我们点击异步加操作时，我们会调用这个函数，在这个函数里接收一个延时加的时间，还有action所需的数据，和原先的区别只在于返回的时一个定时器函数")]),t._v(" "),a("p",[t._v("但是如果仅仅这样，很显然是会报错的，它默认需要接收一个对象")]),t._v(" "),a("p",[t._v("如果我们需要实现传入函数，那我们就需要告诉：你只需要默默的帮我执行以下这个函数就好！")]),t._v(" "),a("p",[t._v("这时我们就需要引入中间件，在原生的 "),a("code",[t._v("redux")]),t._v(" 中暴露出 "),a("code",[t._v("applyMiddleware")]),t._v(" 中间件执行函数，并引入 "),a("code",[t._v("redux-thunk")]),t._v(" 中间件（需要手动下载）")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" thunk "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'redux-thunk'")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("通过第二个参数传递下去就可以了")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createStore")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("countReducer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("applyMiddleware")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("thunk"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("注意：异步 action 不是必须要写的，完全可以自己等待异步任务的结果后再去分发同步action")]),t._v(" "),a("h2",{attrs:{id:"_6-redux-三大原则"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-redux-三大原则"}},[t._v("#")]),t._v(" 6. Redux 三大原则")]),t._v(" "),a("p",[t._v("理解好 Redux 有助于我们更好的理解接下来的 React -Redux")]),t._v(" "),a("h3",{attrs:{id:"第一个原则"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#第一个原则"}},[t._v("#")]),t._v(" 第一个原则")]),t._v(" "),a("p",[a("strong",[t._v("单向数据流")]),t._v("：整个 Redux 中，数据流向是单向的")]),t._v(" "),a("p",[t._v("UI 组件 ---\x3e   action  ---\x3e  store  ---\x3e  reducer ---\x3e  store")]),t._v(" "),a("h3",{attrs:{id:"第二个原则"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#第二个原则"}},[t._v("#")]),t._v(" 第二个原则")]),t._v(" "),a("p",[a("strong",[t._v("state 只读")]),t._v("：在 Redux 中不能通过直接改变 state ，来控制状态的改变，如果想要改变 state ，则需要触发一次 action。通过 action 执行 reducer")]),t._v(" "),a("h3",{attrs:{id:"第三个原则"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#第三个原则"}},[t._v("#")]),t._v(" 第三个原则")]),t._v(" "),a("p",[a("strong",[t._v("纯函数执行")]),t._v("：每一个reducer 都是一个纯函数，不会有任何副作用，返回是一个新的 state，state 改变会触发 store 中的 subscribe")]),t._v(" "),a("h2",{attrs:{id:"参考资料"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考资料"}},[t._v("#")]),t._v(" 参考资料")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://juejin.cn/post/6844903998139400200",target:"_blank",rel:"noopener noreferrer"}},[t._v("Redux + React-router 的入门📖和配置👩🏾‍💻教程"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("小册："),a("a",{attrs:{href:"https://juejin.cn/book/6945998773818490884",target:"_blank",rel:"noopener noreferrer"}},[t._v("React 进阶实践指南"),a("OutboundLink")],1)]),t._v(" "),a("hr"),t._v(" "),a("blockquote",[a("p",[t._v("非常感谢您的阅读，欢迎提出你的意见，有什么问题欢迎指出，谢谢！🎈")])])])}),[],!1,null,null,null);s.default=n.exports}}]);