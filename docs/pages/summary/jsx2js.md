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

> React 17 之后会转化成 _jsx 的 Function

![](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgtwo/20230107192849.png)

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

## Babel 的处理流程

那么 Babel 是如何处理这些 JSX 转成 JS 的呢？

babel 是 source-to-source 的编译器，它会将我们的源代码转换成另一种形式的代码，这种形式的代码可以是同一种语言的不同版本，也可以是不同语言的代码。

整体的编译流程分为三步：

- parse: 通过 parser 把源代码转换成 AST
- transform：通过遍历 AST，调用各种插件对 AST 进行转换，包括一些语法转换，代码优化等
- generate: 把转换后的 AST 打印成目标代码，并生成 sourcemap

![](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgtwo/20230107212004.png)

### parse 阶段

parse 阶段的目的是把源码字符串转换成机器能够理解的 AST，这个过程分为词法分析、语法分析。

```js
let name = "ljc";
```

我们定义了一个 `name` 变量

解析器第一步要做的就是把这个语句拆分成最小的不可拆分的单元

![image-20210822114441105](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210822114441105.png)

生成 token 流，即语法单元成的数组

```json
[
  {
    "type": "Keyword",
    "value": "let"
  },
  {
    "type": "Identifier",
    "value": "name"
  },
  {
    "type": "Punctuator",
    "value": "="
  },
  {
    "type": "String",
    "value": "ljc"
  },
  {
    "type": "Punctuator",
    "value": ";"
  }
]
```

第二步就是语法分析

将上一步的 token 数据进行递归的组装，生成 AST，按照不同的语法结构，来把一组单词组合成对象，这个过程就是语法分析，比如上面的代码，就会生成这样的 AST

```json
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "name"
          },
          "init": {
            "type": "Literal",
            "value": "ljc",
            "raw": "\"ljc\""
          }
        }
      ],
      "kind": "let"
    }
  ],
  "sourceType": "module"
}
```

### transform 阶段

transform 阶段的目的是对 AST 进行转换，这个过程分为遍历 AST 和**调用插件**。遍历的过程中处理到不同的 AST 节点会调用注册的相应的插件进行处理。也就是我们编写插件时注入的 visitor 函数。

如下就是 babel 插件大概的样子

```js
module.exports = (babel) => {
  return {
    pre(path) {
      this.runtimeData = {}
    },
    visitor: {},
    post(path) {
      delete this.runtimeData
    }
  }
}
```

- `visitor`：指定 `traverse` 时调用的函数。
- pre 和 post 分别在**遍历前后调用**，可以做一些初始化和清理工作。比如初始化 runtimeData，遍历结束后删除 runtimeData。

在 visitor 函数里，我们可以对 AST 进行增删改查，最终生成新的 AST。这样遍历完整个 AST 后，会得到一个新的 AST 和一些 sourcemap 信息。

这个阶段的核心是插件，插件使用 visitor 访问者模式定义了遇到特定的节点后如何进行操作。babel 将对 AST 树的遍历和对节点的增删改等方法放在了 `@babel/traverse` 包中。

![](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgtwo/20230107213919.png)

图片来源于: [Babel 插件通关秘籍](https://juejin.cn/book/6946117847848321055/section/6946578914382708770)

然后再通过 generate 阶段，将新的 AST 转换成 JS 代码。

### generate 阶段

AST 转换完毕后，需要将 AST 重新生成 code。

generate 阶段会把 AST 转换成 code，这个过程是递归的，从根节点开始，遍历整个 AST，然后根据节点类型，生成对应的代码，不同的 AST 节点类型，会生成不同的代码。比如 `VariableDeclaration` 节点会生成 `let name = 'ljc'` （根据本文代码）这样的代码。

这样从 AST 根节点开始，递归的进行字符串拼接，最终生成的就是我们的代码。

以上就是 Babel 在编译时的流程，这里涉及到了几个关键的包。

- `@babel/parser`：提供默认的 parse 方法用于解析
- `@babel/traverse`: 封装了对 AST 树的遍历和节点的增删改查操作
- `@babel/generator`: 提供给默认的 generate 方法用于代码生成。

总的来说，Babel 只负责串起整个流程，具体的编译交给 Babel 插件完成，核心的编译和生成 generator 的流程也能通过插件的方式进行扩展。

基于这样的设计， Babel 能够非常快速的跟进各种语言的变化。

了解了 Babel 的工作流程，我们继续看会 React 的 JSX 是如何被 Babel 转换的。

## React JSX to JX

JSX 转换成 JS 借助 Babel 的 transform 插件 babel-plugin-transform-react-jsx，这个插件的作用是将 JSX 转换成 React.createElement 方法调用。

在前面的流程中我们知道，Babel 的编译流程是通过插件来实现的，那么 `babel-plugin-transform-react-jsx` 插件是如何工作的呢？我们接下来看看

在 transform 阶段，可以对 AST 进行增删改查，生成新的 AST。

我们看到 `babel-plugin-transform-react-jsx` 的源代码中

在 visitor 函数中，会对不同的 JSX 类型节点有不同的处理，比如 JSXElement 节点，会调用 `jsxElement` 方法，这个方法会返回一个 JSXElement 的 AST 节点。

![](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgtwo/20230107224657.png)

在这个阶段处理的是 AST 对象，我们再来看看一段 JSX 它的 AST 是怎样的结构？

```js
function test() {
 return <div class="hello">
    <span>word</span>
   </div>
}
```

在这段代码中，JSX 节点的 AST 结构如下：

![](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgtwo/20230107225249.png)

我们可以在图中看到 return 语句的 AST 节点，它的 type 是 `ReturnStatement`，它的 argument 是一个 JSXElement 节点，这个节点的 type 是 `JSXElement`，它的 `openingElement` 是一个 JSXOpeningElement 节点，它的 type 是 `JSXOpeningElement`，它的 name 是一个 JSXIdentifier 节点，它的 type 是 `JSXIdentifier`，它的 name 是 `div`。

Babel 在从根节点开始遍历 AST 树的时候，就会遍历到这个 JSXElement 节点，然后调用 `babel-plugin-transform-react-jsx` 插件中 visitor 中的 `jsxElement` 方法

```js
JSXElement: {
    exit(path, file) {
    let callExpr;
    if (
        get(file, "runtime") === "classic" ||
        shouldUseCreateElement(path)
    ) {
        callExpr = buildCreateElementCall(path, file);
    } else {
        callExpr = buildJSXElementCall(path, file);
    }
    // 用处理完的 AST 节点替换原来的 JSXElement 节点
    path.replaceWith(t.inherits(callExpr, path.node));
    },
},
```

可以看到这里会通过 `shouldUseCreateElement` 来判断是否转成 `React.createElement` 方法调用，如果是的话，就会调用 `buildCreateElementCall` 方法，如果不是的话，就会调用 `buildJSXElementCall` 方法。

这里为什么要判断是否转成 `React.createElement` 方法调用呢？我们来看看 `shouldUseCreateElement` 方法

```js
// We want to use React.createElement, even in the case of
// jsx, for <div {...props} key={key} /> to distinguish it
// from <div key={key} {...props} />. This is an intermediary
// step while we deprecate key spread from props. Afterwards,
// we will stop using createElement in the transform.
function shouldUseCreateElement(path: NodePath<JSXElement>) {
    const openingPath = path.get("openingElement")
    const attributes = openingPath.node.attributes

    let seenPropsSpread = false
    for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i]
        if (
            seenPropsSpread &&
            t.isJSXAttribute(attr) &&
            attr.name.name === "key"
        ) {
            return true
        } else if (t.isJSXSpreadAttribute(attr)) {
            seenPropsSpread = true
        }
    }
    return false
}
```

这个方法很特别，我们通过在源码中的注释可以得知，这个判断是为了区分 `<div {...props} key={key} />` 和 `<div key={key} {...props} />` 这两种情况的，为什么需要这个判断呢，我在 React 的 [Github issue](https://github.com/facebook/react/issues/20031#issuecomment-710346866) 中找到了答案

我们看看下面这段代码

```js
let obj = { key: "bar" }

// 1. Key Before Spread
<div key="foo" {...obj} />.key // "bar"

// 2. Key After Spread
<div {...obj} key="foo" />.key // "foo"
```

在这段代码中，key 存在被 props 覆盖的情况，但是在 React 的定义中，key 是 props 的一部分，所以在 React 中，key 的优先级是最高的，所以在 React 中，key 的值是 `foo`，而不是 `bar`。这里应该不能被覆盖，因此这里采用了一个条件分支来处理 key 先后的情况下，进行不同的转换。

在官方的解释中也印证了这点，并对这个问题进行了未来的规划，从目前的源码来看，这里还处于 Today 的阶段，但这个 comment 的时间是 2022 年了...

![](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgtwo/20230107232612.png)

> 在 `buildJSXElementCall` 方法中，并没有看到有 warn 的逻辑，所以这里应该不会 warn，因此觉得当前还是 Today 阶段

### 生成 createElement

在 `buildCreateElementCall` 方法中

- 首先会通过 `getTag` 方法来获取 tag，这个方法很简单，就是获取 `openingElement` 的 `name`
- 通过 `buildCreateElementOpeningElementAttributes` 方法来获取 attributes 的值，具体的不展开了

```js
function buildCreateElementCall(
    path: NodePath<JSXElement>,
    file: PluginPass,
) {
    const openingPath = path.get("openingElement")

    return call(file, "createElement", [
        getTag(openingPath),
        buildCreateElementOpeningElementAttributes(
            file,
            path,
            openingPath.get("attributes"),
        ),
        // @ts-expect-error JSXSpreadChild has been transformed in convertAttributeValue
        ...t.react.buildChildren(path.node),
    ])
}
```

这里的关键应该看到这个 call 方法，这个方法是用来生成 `React.createElement` 方法调用的，通过 `t.callExpression` 来生成，这里的 `get` 方法是用来获取 `id` 的，这里的 `id` 是在 `visitor` 中定义的，传入的是 `createElement`，所以这里就是生成了 `React.createElement` 方法调用

```js
// get 方法
const get = (pass: PluginPass, name: string) =>
    pass.get(`@babel/plugin-react-jsx/${name}`)

function call(
    pass: PluginPass,
    name: string,
    args: CallExpression["arguments"],
) {
    const node = t.callExpression(get(pass, `id/${name}`)(), args)
    if (PURE_ANNOTATION ?? get(pass, "defaultPure")) annotateAsPure(node)
    return node
}
```

### get 和 set 函数

在上面我们看到了 `get` 方法，对应的还有 `set` 方法，这里我们再讲讲这部分的东西

```js
const get = (pass: PluginPass, name: string) =>
  pass.get(`@babel/plugin-react-jsx/${name}`);
const set = (pass: PluginPass, name: string, v: any) =>
  pass.set(`@babel/plugin-react-jsx/${name}`, v);
```

在 visitor 的 program 函数中会通过当前的运行上下文环境来决定是否需要生成 `jsx` 的 id

- 如果是经典（classic）的方式也就是手动引入 React 的方式，那么就只需要生成 `createElement` 和 `fragment` 的 id
- 如果是自动引入 React 时，就还需要设置 jsx 的 id

```js
if (runtime === "classic") {
    ...
    const createElement = toMemberExpression(pragma)
    const fragment = toMemberExpression(pragmaFrag)

    set(state, "id/createElement", () => t.cloneNode(createElement))
    set(state, "id/fragment", () => t.cloneNode(fragment))

    set(state, "defaultPure", pragma === DEFAULT.pragma)
} else if (runtime === "automatic") {
    ...
    const define = (name: string, id: string) =>
        set(state, name, createImportLazily(state, path, id, source))

    define("id/jsx", development ? "jsxDEV" : "jsx")
    define("id/jsxs", development ? "jsxDEV" : "jsxs")
    define("id/createElement", "createElement")
    define("id/fragment", "Fragment")

    set(state, "defaultPure", source === DEFAULT.importSource)
} 
```

在上面我们可以看到在 `set` 函数执行时，会传入一个回调，注册对应的方法，当我们调用 `get` 方法时，就会执行这个回调，然后返回对应的值

```js
const DEFAULT = {
    pragma: "React.createElement",
    pragmaFrag: "React.Fragment",
}

const createElement = toMemberExpression(pragma)
const fragment = toMemberExpression(pragmaFrag)
```

可以看到这里的 `toMemberExpression` 方法是用来将 `React.createElement` 转换成 `React.createElement` 的 AST 节点的

在 `toMemberExpression` 方法中会遍历传入的 `id`，也就是这个 DEFAULT 对象定义的值，然后通过 `t.identifier` 方法将每个 id 转换成对应的 AST 节点，然后通过 `t.memberExpression` 方法将每个节点转换成对应的 AST 节点，最后通过 `reduce` 方法将每个节点转换成一个 `MemberExpression` 的 AST 节点

```js
function toMemberExpression(id: string): Identifier | MemberExpression {
    return (
        id
            .split(".")
            .map(name => t.identifier(name))
            // @ts-expect-error - The Array#reduce does not have a signature
            // where the type of initialial value differs from callback return type
            .reduce((object, property) => t.memberExpression(object, property))
    )
}
```

这也解释了为什么调用 call 函数能够生成 JSX 对应 createElement 方法对应的 AST 了

### 替换 JSX 结构

在 JSXElement 方法的结尾，我们可以看到，这里是通过 `buildCreateElementCall` 方法来生成 `React.createElement` 方法调用的，然后通过 `path.replaceWith` 来替换掉原来的 JSX 结构，得到一个由 `React.createElement` 方法调用组成的 AST 

```js
JSXElement: {
    exit(path, file) {
      ...
      // 用处理完的 AST 节点替换原来的 JSXElement 节点
+     path.replaceWith(t.inherits(callExpr, path.node));
    },
}
```

经过这些就完成了 JSX 到 JS AST 的转换了，当然这里还有一些特殊的节点没有涉及到，比如 React 中的 Fragment 节点，也有自己的处理逻辑

大致的思路就是将 `<></>` 转换成 `<React.Fragment></React.Fragment>`，然后再通过 `buildCreateElementCall` 方法来生成 `React.createElement` 方法调用，最后通过 `path.replaceWith` 来替换掉原来的 JSX 结构

中间的过程和 JSXElement 是一样的，不同点就是多了 `React.Fragment` 的转换

```js
JSXFragment(path, file) {
    // <>...</>  ->  <React.Fragment>...</React.Fragment>

    const frag = memberExpressionToJSX(get(file, "id/fragment")())

    path.replaceWith(
        t.inherits(
            t.jsxElement(
                t.inherits(
                    t.jsxOpeningElement(frag, []),
                    path.node.openingFragment,
                ),
                t.jsxClosingElement(t.cloneNode(frag)),
                path.node.children,
            ),
            path.node,
        ),
    )
}
```

最后再在 generate 阶段完成 AST 到 JS 的转换，这样整个 JSX 就转化完成了

以上就是 JSX 到 JS 的转换过程，更详细的我们可以直接看 plugin 的源码，这部分的代码还算简单

## 总结

React 的 JSX 会被 Babel 的 `@babel/plugin-transform-react-jsx` 插件转换成 `React.createElement` 方法调用，这个插件的核心就是通过 visitor 函数来遍历 AST，然后对不同类型的节点进行处理，比如 JSXElement，JSXFragment 等，最后将 JSX 转换成 `React.createElement` 方法调用，得到一个由 createElement fn 组成的 AST，最后再在 generate 阶段完成 AST 到 JS 的转换

下一篇，将通过手写 Babel 插件来实现 JSX To JS AST 的转换，这样我们就能更加深入的了解 Babel 的插件机制以及 React JSX transform 的实现
