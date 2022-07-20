(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{501:function(t,e,s){"use strict";s.r(e);var a=s(65),r=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[s("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/react-study-lifecycle.png",alt:"react-study-lifecycle"}})]),t._v(" "),s("blockquote",[s("p",[t._v("📢 大家好，我是小丞同学，这一篇是关于 React 的学习笔记，关于组件的生命周期")]),t._v(" "),s("p",[t._v("📢 非常感谢你的阅读，不对的地方欢迎指正 🙏")]),t._v(" "),s("p",[t._v("📢 愿你生活明朗，万物可爱")])]),t._v(" "),s("h2",{attrs:{id:"引言"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#引言"}},[t._v("#")]),t._v(" 引言")]),t._v(" "),s("p",[t._v("在 React 中为我们提供了一些生命周期钩子函数，让我们能在 React 执行的重要阶段，在钩子函数中做一些事情。那么在 React 的生命周期中，有哪些钩子函数呢，我们来总结一下")]),t._v(" "),s("h2",{attrs:{id:"react-生命周期"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#react-生命周期"}},[t._v("#")]),t._v(" React 生命周期")]),t._v(" "),s("p",[t._v("React 生命周期主要包括三个阶段：初始化阶段，更新阶段，销毁阶段")]),t._v(" "),s("h3",{attrs:{id:"初始化阶段"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#初始化阶段"}},[t._v("#")]),t._v(" 初始化阶段")]),t._v(" "),s("h4",{attrs:{id:"_1-constructor-执行"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-constructor-执行"}},[t._v("#")]),t._v(" 1. constructor 执行")]),t._v(" "),s("p",[s("code",[t._v("constructor")]),t._v(" 在组件初始化的时候只会执行一次")]),t._v(" "),s("p",[t._v("通常它用于做这两件事")]),t._v(" "),s("ol",[s("li",[t._v("初始化函数内部 "),s("code",[t._v("state")])]),t._v(" "),s("li",[t._v("绑定函数")])]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("constructor")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("props")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'进入构造器'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("super")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("props"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("state "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("count")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br")])]),s("p",[t._v("现在我们通常不会使用 "),s("code",[t._v("constructor")]),t._v(" 属性，而是改用类加箭头函数的方法，来替代 "),s("code",[t._v("constructor")])]),t._v(" "),s("p",[t._v("例如，我们可以这样初始化 "),s("code",[t._v("state")])]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("state "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("count")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br")])]),s("h4",{attrs:{id:"_2-static-getderivedstatefromprops-执行-新钩子"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-static-getderivedstatefromprops-执行-新钩子"}},[t._v("#")]),t._v(" 2. static getDerivedStateFromProps 执行 （新钩子）")]),t._v(" "),s("p",[t._v("这个是 React 新版本中新增的2个钩子之一，据说很少用。")]),t._v(" "),s("p",[s("code",[t._v("getDerivedStateFromProps")]),t._v(" 在初始化和更新中都会被调用，并且在 "),s("code",[t._v("render")]),t._v(" 方法之前调用，它返回一个对象用来更新 "),s("code",[t._v("state")])]),t._v(" "),s("p",[s("code",[t._v("getDerivedStateFromProps")]),t._v(" 是类上直接绑定的静态（"),s("code",[t._v("static")]),t._v("）方法，它接收两个参数 "),s("code",[t._v("props")]),t._v(" 和 "),s("code",[t._v("state")])]),t._v(" "),s("p",[s("code",[t._v("props")]),t._v(" 是即将要替代 "),s("code",[t._v("state")]),t._v(" 的值，而 "),s("code",[t._v("state")]),t._v(" 是当前未替代前的值")]),t._v(" "),s("blockquote",[s("p",[t._v("注意："),s("code",[t._v("state")]),t._v(" 的值在任何时候都取决于传入的 "),s("code",[t._v("props")]),t._v(" ，不会再改变")])]),t._v(" "),s("p",[t._v("如下")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getDerivedStateFromProps")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("props")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" props\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nReactDOM"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("render")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("Count count"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"109"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("querySelector")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'.test'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br")])]),s("p",[s("code",[t._v("count")]),t._v(" 的值不会改变，一直是 109")]),t._v(" "),s("h4",{attrs:{id:"_2-componentwillmount-执行-即将废弃"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-componentwillmount-执行-即将废弃"}},[t._v("#")]),t._v(" 2. componentWillMount 执行（即将废弃）")]),t._v(" "),s("blockquote",[s("p",[t._v("如果存在 "),s("code",[t._v("getDerivedStateFromProps")]),t._v(" 和 "),s("code",[t._v("getSnapshotBeforeUpdate")]),t._v(" 就不会执行生命周期"),s("code",[t._v("componentWillMount")]),t._v("。")])]),t._v(" "),s("p",[t._v("该方法只在挂载的时候调用一次，表示组件将要被挂载，并且在 "),s("code",[t._v("render")]),t._v(" 方法之前调用。")]),t._v(" "),s("p",[t._v("这个方法在 React 18版本中将要被废弃，官方解释是在 React 异步机制下，如果滥用这个钩子可能会有 Bug")]),t._v(" "),s("h4",{attrs:{id:"_3-render-执行"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-render-执行"}},[t._v("#")]),t._v(" 3. render 执行")]),t._v(" "),s("p",[s("code",[t._v("render()")]),t._v(" 方法是组件中必须实现的方法，用于渲染 DOM ，但是它不会真正的操作 DOM，它的作用是把需要的东西返回出去。")]),t._v(" "),s("p",[t._v("实现渲染 DOM 操作的是 "),s("code",[t._v("ReactDOM.render()")])]),t._v(" "),s("blockquote",[s("p",[t._v("注意：避免在 "),s("code",[t._v("render")]),t._v(" 中使用 "),s("code",[t._v("setState")]),t._v(" ，否则会死循环")])]),t._v(" "),s("h4",{attrs:{id:"_4-componentdidmount-执行"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-componentdidmount-执行"}},[t._v("#")]),t._v(" 4. componentDidMount 执行")]),t._v(" "),s("p",[s("code",[t._v("componentDidMount")]),t._v(" 的执行意味着初始化挂载操作已经基本完成，它主要用于组件挂载完成后做某些操作")]),t._v(" "),s("p",[t._v("这个挂载完成指的是：组件插入 DOM tree")]),t._v(" "),s("h4",{attrs:{id:"初始化阶段总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#初始化阶段总结"}},[t._v("#")]),t._v(" 初始化阶段总结")]),t._v(" "),s("p",[t._v("执行顺序 "),s("code",[t._v("constructor")]),t._v(" -> "),s("code",[t._v("getDerivedStateFromProps")]),t._v(" 或者 "),s("code",[t._v("componentWillMount")]),t._v(" -> "),s("code",[t._v("render")]),t._v(" -> "),s("code",[t._v("componentDidMount")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210821102153009.png",alt:"image-20210821102153009"}})]),t._v(" "),s("h3",{attrs:{id:"更新阶段"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#更新阶段"}},[t._v("#")]),t._v(" 更新阶段")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210821102622645.png",alt:"image-20210821102622645"}})]),t._v(" "),s("p",[t._v("这里记录新生命周期的流程")]),t._v(" "),s("h4",{attrs:{id:"_1-getderivedstatefromprops-执行"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-getderivedstatefromprops-执行"}},[t._v("#")]),t._v(" 1. getDerivedStateFromProps 执行")]),t._v(" "),s("p",[t._v("执行生命周期"),s("code",[t._v("getDerivedStateFromProps")]),t._v("， 返回的值用于合并 "),s("code",[t._v("state")]),t._v("，生成新的"),s("code",[t._v("state")]),t._v("。")]),t._v(" "),s("h4",{attrs:{id:"_2-shouldcomponentupdat-执行"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-shouldcomponentupdat-执行"}},[t._v("#")]),t._v(" 2. shouldComponentUpdat 执行")]),t._v(" "),s("p",[s("code",[t._v("shouldComponentUpdate()")]),t._v(" 在组件更新之前调用，可以通过返回值来控制组件是否更新，允许更新返回 "),s("code",[t._v("true")]),t._v(" ，反之不更新")]),t._v(" "),s("h4",{attrs:{id:"_3-render-执行-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-render-执行-2"}},[t._v("#")]),t._v(" 3. render 执行")]),t._v(" "),s("p",[t._v("在控制是否更新的函数中，如果返回 "),s("code",[t._v("true")]),t._v(" 才会执行 "),s("code",[t._v("render")]),t._v(" ,得到最新的 "),s("code",[t._v("React element")])]),t._v(" "),s("h4",{attrs:{id:"_4-getsnapshotbeforeupdate-执行"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-getsnapshotbeforeupdate-执行"}},[t._v("#")]),t._v(" 4. getSnapshotBeforeUpdate 执行")]),t._v(" "),s("p",[t._v("在最近一次的渲染输出之前被提交之前调用，也就是即将挂载时调用")]),t._v(" "),s("p",[t._v("相当于淘宝购物的快照，会保留下单前的商品内容，在 React 中就相当于是 即将更新前的状态")]),t._v(" "),s("blockquote",[s("p",[t._v("它可以使组件在 DOM 真正更新之前捕获一些信息（例如滚动位置），此生命周期返回的任何值都会作为参数传递给 "),s("code",[t._v("componentDidUpdate()")]),t._v("。如不需要传递任何值，那么请返回 null")])]),t._v(" "),s("h4",{attrs:{id:"_5-componentdidupdate-执行"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-componentdidupdate-执行"}},[t._v("#")]),t._v(" 5. componentDidUpdate 执行")]),t._v(" "),s("p",[t._v("组件在更新完毕后会立即被调用，首次渲染不会调用")]),t._v(" "),s("hr"),t._v(" "),s("p",[t._v("到此更新阶段就结束了，在 React 旧版本中有两个与更新有关的钩子函数 "),s("code",[t._v("componentWillReceiveProps")]),t._v(" 和 "),s("code",[t._v("componentWillUpdate")]),t._v(" 都即将废弃")]),t._v(" "),s("p",[s("code",[t._v("componentWillReceiveProps")]),t._v(" 我不太懂")]),t._v(" "),s("p",[s("code",[t._v("componentWillUpdate")]),t._v(" 在 "),s("code",[t._v("render")]),t._v(" 之前执行，表示组件将要更新")]),t._v(" "),s("h3",{attrs:{id:"销毁阶段"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#销毁阶段"}},[t._v("#")]),t._v(" 销毁阶段")]),t._v(" "),s("h4",{attrs:{id:"componentwillunmount-执行"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#componentwillunmount-执行"}},[t._v("#")]),t._v(" componentWillUnmount  执行")]),t._v(" "),s("p",[t._v("在组件即将被卸载或销毁时进行调用。")]),t._v(" "),s("h2",{attrs:{id:"总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),s("p",[s("strong",[t._v("初始化")])]),t._v(" "),s("ul",[s("li",[t._v("constructor()")]),t._v(" "),s("li",[t._v("static getDerivedStateFromProps()")]),t._v(" "),s("li",[t._v("render()")]),t._v(" "),s("li",[t._v("componentDidMount()")])]),t._v(" "),s("p",[s("strong",[t._v("更新")])]),t._v(" "),s("ul",[s("li",[t._v("static getDerivedStateFromProps()")]),t._v(" "),s("li",[t._v("shouldComponentUpdate()")]),t._v(" "),s("li",[t._v("render()")]),t._v(" "),s("li",[t._v("getSnapshotBeforeUpdate()")]),t._v(" "),s("li",[t._v("componentDidUpdate()")])]),t._v(" "),s("p",[s("strong",[t._v("销毁")])]),t._v(" "),s("ul",[s("li",[t._v("componentWillUnmount()")])]),t._v(" "),s("hr"),t._v(" "),s("blockquote",[s("p",[t._v("初学 React ，对生命周期还没有深入的理解，只能大概知道在什么时候触发哪个钩子，希望各位大佬多多指教，有什么建议可以提一提 🙏")])])])}),[],!1,null,null,null);e.default=r.exports}}]);