# 大厂面经

## 百度面经

> 百度面经合集

:::tip
提前批一面 [https://www.nowcoder.com/discuss/399332676883197952?sourceSSR=search](https://www.nowcoder.com/discuss/399332676883197952?sourceSSR=search)
:::

### axios 底层实现，ajax 怎么实现的，优点在哪儿，axios 和 ajax 的关系

### 用户输入 url 到页面渲染的全过程

:::tip

1. 首先浏览器会对输入的内容进行预估，就是对历史访问过的网站进行匹配
2. 当用户输入 URL 时，浏览器进程会去解析，并把网络请求传给网络进程，网络进程收到请求任务后，会发起请求。在此之前，浏览器仍会保留当前页面的展示，直到收到请求响应并渲染后，才会更新页面
3. （重要）网络进程在收到请求任务后，并不会立即去发送请求，而是先检查本地是否有缓存，如果有本地缓存未过期，会走本地缓存，就是强缓存。
    - 否则会进行 DNS 解析获取 IP 地址，建立 TCP 链接，进行服务端协商缓存
4. 在 TCP 连接前，需要确认对方的身份以及位置，也就是确认 IP 地址。通过 DNS 解析获取 IP 地址，IP 地址可以被缓存，优先走缓存
    - DNS 解析会优先查看本地的 host 文件是否有映射关系表，没有的话会走本地 DNS 服务器查找，然后到顶级域名服务器找，总之最终会找到 IP 地址
    - CDN 就不用去目标服务器找，而去最近的服务器获取，资源更新的话 CDN 再向目标服务器更新
5. 找到 IP 后，会进行 TCP 三次握手。
6. 浏览器发送HTTP 请求报文
7. 服务器处理请求，返回 HTTP 响应
8. 服务端处理完请求后，结果会通过网络发回客户端的浏览器。浏览器会对服务端响应解析，状态码、请求头、请求体等。
9. 浏览器进程向渲染进程发送提交文档的信息，渲染进程收到提交文档的消息后，会和网络进程建立 IPC 通信。渲染进程会返回确认提交给浏览器进程，浏览器进程在收到确认提交的消息后，会更新浏览器界面状态，包括安全状态、地址栏的 URL、前进后退的历史状态，并渲染HTML然后更新。
    - 这同时也解释了为什么在浏览器的地址栏里面输入了一个地址后，如果加载速度比较慢，之前的页面不会立马消失，而是需要等待加载一会才能把页面内容更新。
10. 接下来到了渲染进程的工作，渲染进程首先会对获取到的 HTML 字节流文件进行解析，这里会通过 HTML Parser 模块，通过分词器，将字节流分为 token，这一步的目的是把标签区分开。再对 token 进行组装，构建 DOM 树。
11. 在构建完 DOM 树后，还需要 CSS ，在拿到 CSS样式表首先会进行一次标准化，将属性值统一，这里面同时也会对百分比、继承、calc 等进行转化，生成 renderObject。但这些 CSS 还需要转成 StyleSheets
12. 在 CSSOM 和 DOM 树构建完成后，会对 DOM 树中不可见节点进行剔除，比如 head，然后会对 `display: none` 这些节点筛除，不出现在 layout tree 中，因为这些节点不会影响到布局。接下来会对节点进行布局，计算节点的坐标位置、大小
13. 接下来会对布局树进行分层，生成 Layer Tree
14. 在拿到 Layer Tree 后，会对每个图层进行绘制，会把图层的绘制拆分成很多的绘制指令，形成一个绘制指令列表，记录需要执行的绘制操作，然后 commit 到合成线程中
15. 在合成线程中会将图层进行分块，形成图块，按照视口来优先生成位图
16. 在 raster 完成后，合成线程会生成绘制图块命令 draw quad ，并生成 draw quads 给浏览器进程，viz 组件会调用 GL 指令把 draw quads 最终输出到屏幕上


在最后 commit raster 数据的时候，会有缓冲机制，通过 pending Tree 

Compositor thread 有三棵 cc::LayerImpl 树：

- Pending tree: 负责接收 commit，然后将 LayerImpl 进行 Raster
- Active tree: 会从这里取出栅格化好的 LayerImpl 进行 Draw 操作
- Recycle tree：为避免频繁创建 LayerImpl 对象，Pending tree 后续不会被销毁，而是退化成 Recycle tree。

:::

### js 的数据类型

:::tip
`undefined`、`null`、`number`、`string`、`boolean`、`object`、`bigint`、`Symbol`
:::

### null 和 undefined 的区别，使用场景上

- null 表示"没有对象"，即该处不应该有值
- undefined 表示"缺少值"，就是此处应该有一个值，但是还没有定义

- null 的用法：表示函数的参数不是对象、作为对象原型链的终点
- undefined 的用法：声明未赋值、参数为传递，对象没有值、函数返回值

### `1 === new Number(1)` 相等吗

不相等，`new Number` 返回的是包装对象，这里涉及到包装类的知识

以字符串为例子，在我们操作一个字符串时，例如 `str.substring`，我们操作的原始类型 string 原本是没有这个方法的，它会通过 `new String(str)`，把 str 包装成对象调用

内部是这样的

```js
const str = new String(str)
const str1 = str.substring(2)
str = null
```

大概意思就是包装类型使用完就会被销毁，不会存在内存中

### `if（{}） if（[ ]）if（0）`是true还是false

对象是引用，原始值是 false

### symbol 类型 写一下怎么用

### script 会阻塞 html 嘛 css 呢

:::tip
script 的加载如果没有 defer 或者 async 的话，会在同步解析，遇到 script 标签会暂停解析，先下载 script 再执行，执行完再继续解析

如果有 defer 的话，遇到 script 会下载，但会等待 html 解析完，loaded 事件触发前执行

如果是 async 的话，遇到 script 会下载，但不会停止解析，等待 script 下载完立刻执行
:::

DOM 解析和 CSS 解析是并行的，因此 CSS 加载不会阻塞 DOM 树的解析，但是 CSS 加载会阻塞 DOM 树的渲染

- css 加载不会阻塞DOM树的解析
- css 加载会阻塞DOM树的渲染
- css 加载会阻塞后面js语句的执行

### async 和 defer 怎么用 区别

:::tip
在实践中，defer 用于需要整个 DOM 或其相对执行顺序很重要的 scripts。而 async 则用于独立的 scripts，如计数器或广告，而它们的相对执行顺序并不重要。

async 下载完立刻执行，因此和下载速度有关

defer 下载完等待 HTML 解析完成后，按顺序执行
:::

### let const 和 var 的区别

:::tip
var 声明是全局作用域或函数作用域，而 let 和 const 是块作用域。

var 变量可以在其作用域内更新和重新声明； let 变量可以更新但不能重新声明； const 变量既不能更新也不能重新声明。 它们都被提升到了作用域的顶部。
:::

### html 渲染的过程 html 和 css 是怎么渲染的，重绘是什么阶段完成的，若果要加载一个js，会引发重绘嘛，怎么判断这个js执行完没有

:::tip
提前批一面 [https://www.nowcoder.com/discuss/395306690277543936?sourceSSR=search](https://www.nowcoder.com/discuss/395306690277543936?sourceSSR=search)
:::

### 水平垂直居中布局？

:::tip
- text-align + line-height：子元素是 inline-block
- bsolute + margin
- absolute + calc
- flex
- grid
:::

### DOM、BOM常用的API？

### 浏览器缓存机制？

:::tip
强缓存和协商缓存，在浏览器发起 HTTP 请求前，先会检查 Expires，和 `Cache-Control` 是否过期，如果强缓存有效，则不会发起请求，直接返回静态资源。

否则进入协商缓存，请求资源时，把用户本地该资源的 etag 同时带到服务端，服务端和最新资源做对比。 如果资源没更改，返回304，浏览器读取本地缓存。 如果资源有更改，返回200，返回最新的资源。
:::

### 重排、重绘？怎么减少重排重绘的开销？

- 重排是指当前页面中的元素布局、尺寸、位置发生变化，浏览器需要重新计算当前元素的布局信息。
- 重绘，当页面中元素视觉变化时，如颜色、背景等，不影响布局时，浏览器需要重新绘制这些元素。

减少重排重绘的开销的方法有很多

1. 避免逐个样式的变更，将多个样式更改合并到一个 CSS 类中，然后一次性添加一个类，这样只会触发一次重排重绘
2. 避免使用 table 布局，table 绘导致整个表格重排
3. 使用 transfrom、filter 这些属性来进行动画，因为这些属性的变化不会触发重排，只会重绘，而且会在合成线程执行，GPU 优化渲染
4. 对于频繁变化的元素，可以脱离文档流，不会影响到其他元素
5. 有些 DOM 访问操作会导致浏览器进行重排，如果需要多次访问这些属性，可以设置缓存，然后再使用
6. 对于大量 DOM 操作场景，可以使用 文档碎片 document fragment 或者离线 dom进行操作，避免触发多次重排重绘
7. 不可见元素可以设置 display 为 none，避免触发重排重绘

### 网页加载很慢的话，怎么做性能优化？

### sessionStorage、localStorage、cookie区别？

首先这三个都是客户端存储数据的方法，在存储容量上，生命周期、作用域、数据传输上有些不同

先说说 sessionStorage 和 localStorage ，他们的存储空间大小都是 5 MB 左右，作用域都是在同源页面，不能跨域访问。sessionStorage 仅在本次会话期间有效，浏览器标签页关闭数据就会被清除，localStorage 没有过期时间，一直保留在客户端。

而 cookie 来说，大小不超过 4 kb，只能存一些简单的数据，做会话标识，cookie 可以设置过期时间，过期自动删除，如果没有设置，那么会在浏览器关闭时删除。

cookie 的作用域可以自己设置，设置 domain 和 path，用于限制 cookie 只能被特定域名和路径访问，默认情况下 cookie 只能被创建它的同源页面访问。

cookie 在每次 http 请求时，会自动附加在请求头上发送给服务端。


### 用过 localStorage 吗？如果要实现存储数据的时间不超过24小时怎么做？

有的，localStorage 本身没有提供设置过期时间的功能，但是可以通过在存储数据时添加一个额外的过期时间戳来实现这个需求。

在获取数据时，先判断是否过期，如果过期则删除 key

```ts
// 设置数据到 localStorage
function setItemWithExpiry(key, value, ttl) {
  const now = new Date();
  // ttl 是以毫秒为单位的时间长度
  const expiryTime = now.getTime() + ttl;
  const data = { value: value, expiry: expiryTime };
  localStorage.setItem(key, JSON.stringify(data));
}

// 从 localStorage 获取数据
function getItemWithExpiry(key) {
  const data = localStorage.getItem(key);
  if (!data) {
    return null;
  }
  const parsedData = JSON.parse(data);
  const now = new Date();
  // 如果数据已过期，删除它并返回 null
  if (now.getTime() > parsedData.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return parsedData.value;
}

// 示例：存储一个值，过期时间为 24 小时
const key = 'myKey';
const value = 'myValue';
const ttl = 24 * 60 * 60 * 1000; // 24 小时
setItemWithExpiry(key, value, ttl);

// 获取存储的值（如果已过期，将返回 null）
const storedValue = getItemWithExpiry(key);
console.log(storedValue);
```

### 跨域怎么做？谁来做？

跨域问题主要是因为浏览器的同源策略引起的，当域名、协议、端口不一致时，就会有跨域的问题。

跨域的解决方法有很多，大多数都需要服务端配合，比较常用的 JSONP 解决跨域，利用 script 标签，img 标签可以加载跨域资源的原理，服务端返回一个包含回调函数的 json 数据，客户端调用回调来处理数据，只支持 get 请求

第二种是 cors 资源共享，服务端设置响应头 `Access-Control-Allow-Origin` 来允许特定源的请求

第三种是代理服务器，做 ng 请求转发到目标服务器

第四种是用 postMessage 做跨域通信，但不是跨域请求。

第五种是用 websocket 它没有同源策略的限制，跨域实现跨域通信

### 响应式布局实现？媒体查询、vh、vw、rem、em？

### react、vue了解多少？框架底层原理？

### node了解多少？node里的http？

### get、post区别？长度限制、安全性等？

:::tip
提前批一面 [https://www.nowcoder.com/discuss/399928752820559872?sourceSSR=search](https://www.nowcoder.com/discuss/399928752820559872?sourceSSR=search)
:::

1. 手写instanceof

2. 原型链原理

3. http和https区别

4. 对称加密和非对称加密

5. 跨域

6. TCP、UDP 以及应用场景

7. 手写CSS垂直居中

8. BFC

9. 盒模型

10. react生命周期

11. react有哪些hooks

12. react router

:::tip
提前批一面[https://www.nowcoder.com/discuss/394976882133934080?sourceSSR=search](https://www.nowcoder.com/discuss/394976882133934080?sourceSSR=search)
:::

水平垂直居中

position有哪些值

说一下 BFC

js 基本数据类型

instanceof 原理

说一下ES6新增

for in 和for of区别

Object.defineProperty 定义的对象的属性有哪些

<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty>

事件循环

HTTP 缓存

HTTP 状态码

HTTP2.0 新增特性

Git 常用操作

webpack loader plugin区别

说一下知道的plugin

Vue双向绑定原理 数组是怎么做双向绑定

:::tip
百度提前批 前端 一二三面面经 [https://www.nowcoder.com/discuss/395239030223384576?sourceSSR=search](https://www.nowcoder.com/discuss/395239030223384576?sourceSSR=search)
:::

一面：

主要是做了三道题，其他没太问（做太久了后面没时间了）

二分查找（如果排序是逆序怎么处理）

实现 instanceof （null、undefined 怎么处理）

实现水波跳动效果

二面：

key 的作用 -- 虚拟 dom 的构建

防抖节流，简述实现

简述 cookie

闭包为啥会性能不好 -- 变量一直被引用，无法回收 --- 垃圾回收机制：标记清楚法、引用计数法

两个盒子水平垂直居中的方法

简述暂时性死区

简述 async await

promise.all 的返回值，如果有一个报错呢

webpack 打包出来的内容特别大怎么办

实习遇到的问题

实习过程中的收获：技术上、代码规范、逻辑思维

三面

扫码登陆原理

大文件上传(断点上传怎么实现)

## 算法

### 随机打乱一个数组

```ts
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // 当数组中还有元素时
  while (currentIndex !== 0) {
    // 随机选取一个元素
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // 与当前元素交换位置
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// 示例
const myArray = [1, 2, 3, 4, 5];
const shuffledArray = shuffle(myArray);
console.log(shuffledArray);
```

### 字符串 kebab-case 转换成 camelCase

### 手写数组括号匹配

### 全排列
