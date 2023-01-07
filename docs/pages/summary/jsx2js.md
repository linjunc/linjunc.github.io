# 我们编写的 JSX 是如何通过构建工具转换成 JS 的

## 关于 JSX

在我们编写 React 应用时，我们会通过使用 JSX 的方式来构建我们的 UI 组件,例如这样：

```jsx
function Test() {
 return <div class="hello">world</div>
}
```

如果是初次接触 React，你可能会惊叹，为什么能在 JS 中写 HTML 语法呢？

其实 JSX 是一种语法糖，在 All in JS 的世界里，想要保留住 HTML 这种标签语法的结构和层次感，于是有了 JSX，让我们可以在 JS 中编写 HTML，但实际上最终交由浏览器处理的还是 JS。

在这之间 JSX 是如何转换成 JS 代码的呢？

借助一些构建工具，例如 babel，本文就通过 Babel 来介绍，JSX 是如何转译成 JS 的

## createElement

我们知道 JSX 会通过 Babel 最终转化成 React.createElement 的这种形式

例如上面的代码会有这样的转换

```jsx
function test() {
 return <div class="hello">world</div>
}
// 转换成
"use strict";

function test() {
  return /*#__PURE__*/React.createElement("div", {
    class: "hello"
  }, "world");
}
```

- 第一个参数是要创建的元素的 Tag 值
- 第二个参数是我们传给元素的 props 值，在生成的 JS 代码中，是以一个普通对象，以键值对的方式存在。
- 第三个参数是 children


