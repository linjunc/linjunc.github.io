# HTML 面试题

## `href` 和 `src` 的区别

### src

1. 请求的资源会内嵌到元素当中，比如图片用的 src 指向的图片链接
2. 请求的资源会应用到文档内的，比如 script，浏览器会**暂停其他资源的下载**，等待其加载 编译执行完成

### href

1. 表示文本的引用，指向网络资源，建立和当前元素或本文档的链接关系
2. 浏览器会并行下载，不会阻断其他资源的加载，如a、link标签

## img 的 title 和 alt 的区别

- `title` 通常是鼠标滑动到元素上的时候显示的
- `alt` 是 `img` 特有的属性，是图片内容的等价描述，用于图片无法加载时显示。可以提高图片的可访问性，建议设置有意义的值，SEO 会重点分析

## 语义化理解

根据内容的结构来选择合适的标签

优点：

1. 对机器友好，有利于网站的 SEO，有利于搜索引擎的爬取有效信息
2. 对开发者来说，可以增强可读性，结构更加清晰，便于维护

## DOCTYPE 的作用

:::tip doctype

`doctype` 是 `html5` 一种标准通用标记语言的**文档类型声明**，目的是告诉浏览器是以 `html` 还是 `xhtml` 的文档类型来解析文档，不同的渲染模式会影响浏览器的 css 和 js 的解析

来自 MDN文档
:::

可以通 `document.compatMode` 来获取，使用的模式

- `CSS1Compat`：严格模式，默认浏览器用 W3C 标准解析，以其支持的**最高标准呈现页面**

> `<!doctype html>` 作用是让浏览器进入标准模式

- `BackCompat`：怪异模式，使用怪异模式解析渲染，以一种比较宽松的**向后兼容**的方式显示

网页中的 `DTD`，直接影响是什么模式

1. 如果文档包含严格的 `DOCTYPE`，就一般以严格模式呈现
2. 包含过渡 `DTD` 和 `URI` 的 `DOCTYPE`，也以严格模式
3. 但是有过渡 `DTD` 没有 `URI`，就以混杂模式
4. 没有 `DOCTYPE` 或形式不正确会以混杂模式呈现
5. `html5` 没有 `DTD` 就没有严格模式和混杂模式的区别

:::tip
URI: 统一资源标识符，就是声明最后的地址
:::

## Script 标签的 defer 和 async 的区别

共同点：都是**异步加载**外部的 js，加载时不会阻塞页面的解析
不同点：
> 执行顺序不同

- 多个带有 `async` 属性的标签，**不能保证执行的顺序，加载完就执行**，有可能会阻塞 html 的渲染
- 多个带有 `defer` 属性的标签，可以保证执行的顺序

> 脚本是否并行执行

- `async` 表示后续文档的**加载和执行**与 `js` 脚本的**加载执行是并行的**
- `defer` 加载文档和 `js` 脚本的**加载是并行**的，但是 `js` 脚本要等到文档所有元素解析完成后执行，也就是 `DOMContentLoaded` 之前执行

## iframe 的优缺点

`iframe` 会创建包含另一个文档的内联框架

优点：

1. 可以用来加载速度比较慢的内容
2. 脚本会并行下载
3. 实现跨子域通信

缺点：

1. `iframe` 会阻塞主页面的 `onLoad` 事件
2. 无法被搜索引擎识别
3. 产生很多页面，不易管理
4. `iframe` 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载

使用 `iframe` 之前需要考虑这两个缺点。如果需要使用 `iframe`，最好是通过 `js` 动态给 `iframe` 添加 `src` 属性值，可以避免这个问题

## `title` 和 `h1` 的区别，`b` 和 `strong` 的区别，`i` 和 `em` 的区别

1. `strong` 有语义化起到加重语气的效果，`b` 只是简单的加粗，搜索引擎更侧重 `strong`
2. `title` 没有明确意义，只是标题 `h1` 表示层次明确的标题，对信息抓取有很大影响
3. `i` 内容展示为斜体，`em` 表示强调的文本

## 行内元素、块级元素、空元素有哪些

行内元素：`a`、`b` 、`span`、`img`、`input`、`select`、`strong`

块级元素：`div`、`ul`、`ol`、`li`、`dl`、`dt`、`dd`、`h1`、`p`

行内块元素：`img`、`input`

空元素就是没有内容的 html：常见的有 `br`、`hr`、`img`、`input`、`link`、`meta`

## canvas 和 svg 的区别

:::tip SVG
`svg` 是基于 `xml` 描述的 `2d` 图形的语言，`svg` `dom` 中的每个元素都是可用的，可以为某个元素附加 `js` 事件处理器，在 `svg` 中，每个被绘制的图形都可被视为对象，如果 `svg` 对象属性发生变化，浏览器可以自动重现图形
:::

- 不依赖分辨率
- 支持事件处理器
- 适合大型区域应用
- 对数据敏感
- 不适合游戏应用

:::tip Canvas
通过 JS 绘制 2d 图形，逐像素渲染，位置改变就重新绘制
:::

- 依赖分辨率 DPR
- 不支持事件处理器
- 文本渲染能力弱
- 可以保存结果图像
- 适合图像密集型游戏

## 常见的 meta 标签

:::tip meta
由 name 和 content 属性定义，用户描述网页文档的属性
:::

1. `charset` 用于描述 `html` 编码类型

```html
<meta charset="UTF-8" >
```

2. `keywords` 页面关键词

``` html
<meta name="keywords"content="关键词" />
```

3. `description` 页面描述

``` html
<meta name="description"content="页面描述内容" />
```

4. `refresh` 页面的重定向和刷新

``` html
<meta http-equiv="refresh"content="0;url="" />
```

5. `viewport` 适配移动端 可控制视口大小和比例

``` html
<meta name="viewport"content="width=device-width, initial-scale=1, maximum-scale=1">
```

- 其中，`content` 参数有以下几种：
  - `width viewport` ：宽度(数值/`device-width`)
  - `height viewport` ：高度(数值/`device-height`)

  - `initial-scale` ：初始缩放比例
  - `maximum-scale` ：最大缩放比例

  - `minimum-scale` ：最小缩放比例
  - `user-scalable` ：是否允许用户缩放(`yes`/`no`）

6. `robot` 搜索引擎索引方式

``` html
<meta name="robots"content="index,follow" />
```

- 其中，`content` 参数有以下几种：

  - `all`：文件将被检索，且页面上的链接可以被查询；
  - `none`：文件将不被检索，且页面上的链接不可以被查询；

  - `index`：文件将被检索；
  - `follow`：页面上的链接可以被查询；

  - `noindex`：文件将不被检索；
  - `nofollow`：页面上的链接不可以被查询。

## head 标签有什么作用

> 用于定义文档头部，可以引用脚本、样式表

下列标签可以用于 head

- `<base>`
- `<link>`

- `<meta>`

- `<script>`

- `<style>`

- `<title>` **唯一必须元素**

## `label` 标签的作用

> 当选择 label 标签时，浏览器会将焦点转移到和 label 标签相关的表单控件上

两种使用方法

1. `label`里面的`for`与`id`的值相同

``` html
<label for="mobile">Number:</label>
<input type="text" id="mobile"/>
```

2. `label`包裹着`input`标签

``` html
<label>Date:<input type="text"/></label>
```

## `img` 的 `srcset` 属性的作用

响应式页面根据**屏幕密度**不同设置不同的图片

``` html
<img src="/Users/xiaosong/Downloads/image-128.png" srcset="image-256.png 2x" />
```

上述代码在 `1x` 时候加载 `image-128.png`  

在 `2x` 的时候加载 `imges-256.png`，现在有`1x` `2x` `3x` `4x`

每一个图片都设置`4`张图片加载就会很慢，于是有了新的 `srcset` 标准

``` html
<img src="image-128.png" srcset="image-128.png 128w, image-256.png 256w, image-512.png 512w" sizes="(max-width: 360px) 340px, 128px" />
```

- `srcset` 指定图片地址和对应图片质量
- `sizes` 设置图片的尺寸临界点

语法：`sizes="[media query] [length], [media query] [length] ... "`

- `sizes`就是指默认显示`128px`, 如果视区宽度大于`360px`, 则显示`340px`。
- `w`单位理解为图片质量，可视区小于这个质量的值就会使用

## HTML5 新特性

### 媒体标签

**audio 音频**

```html
<audio src='' controls autoplay loop='true'></audio>
```

属性：`controls` 控制面板

- autoplay 自动播放
- loop 循环播放

**video 视频**

```html
<video src='' poster='imgs/aa.jpg' controls></video>
```

- 属性：`poster` 指定视频还没下载完毕，用户尚未点击播放前显示的封面，默认为第一帧，也可以自己设置
  - `controls` 控制面板
  - `width` `height`

- `source`标签，兼容浏览器

``` html
<video>
  <source src='aa.flv'type='video/flv' />
  <source src='aa.mp4'type='video/mp4' />
</video>
```

### 表单

- `emails` 验证当前输入邮箱地址是否合法
- `url` 验证`url`
- `number` 只能输入数字，自带上下增大减小箭头，`max` `min`分别设置最大最小
- `search` 输入框最后会有一个小`×`，可以删除输入
- `range` 提供一个范围，其中可以设置`max`和`min`以及`value`，`value`为默认值
- `color` 提供颜色拾取器
- `time` 时分秒
- `date` 日期选择年月日
- `datetime` 时间和日期(只支持`Safari`)
- `datetime-local` 日期时间控件
- `week` 周控件
- `month` 月控件

```html
<input type="emails">
```

### 表单属性

- `oninput` 当输入框内容发生变化触发
- `onvalid` 当验证不通过时触发

### 进度条、度量条

- `progress`标签：表示任务的进度(`ie`，`Safari`不支持)，`max`表示任务的进度，`value`表示已完成多少
- `meter` 显示剩余容量或剩余库存
- `high/low`：高低范围
- `max/min`: 最大/小值
- `value`: 当前度量衡

```html
<progress value="70" max="100">70</progress>
```

### Drag API

- `dragstart` 事件主体是**被拖放元素**，再**开始拖放**被拖放元素时触发
- `drag` 事件的主体是**被拖放的元素**，**正在**被拖放元素时触发
- `dragenter` 事件主体是**目标元素**，在被拖放元素**进入**某元素时触发
- `dragover` 事件主体是**目标元素**，再被拖放元素内**移动**时触发
- `dragleave` 事件的主体是**目标元素**，在被拖放元素**移除**目标时触发
- `drop` 事件主体是**被拖放元素**，在目标元素完全**接收**被拖放元素时触发

## 前端需要注意哪些 SEO

- 合理的 `title` `description` `keywords`：搜索引擎对这三项的权重逐个减小
  - `title` 值强调重点即可，**重要关键词出现不要超过 2 次**，而且要靠前，不同页面 `title` 要不同
  - `description` 把页面内容**高度概括，长度合适**，不可过分堆砌关键词，不同页面 `description` 应当不同
  - `keywords` 列举出**重要关键词**
- **语义化的 HTML 代码**，符合 W3C 规范，语义化代码让搜索引擎更容易理解网页
- **重要内容 HTML 代码放在最前**：搜索引擎抓取 HTML 的顺序是从上到下，有的搜索引起对抓取的长度有限制，因此要确保重要内容被抓取到
- 重要内容不要用 JS 输出，**爬虫不会执行 JS 获取内容**
- **少用 iframe**：搜索引擎不会抓取 iframe 中的内容
- 非装饰性图片必须加 `alt`
- 提高**网站速度**：网站速度是搜索引擎排序的一个重要指标

## HTML5 的离线储存怎么使用，工作原理能不能解释一下？

- 在用户没有网络下，可以正常访问站点，在有网时，更新缓存文件

原理

- `HTML5`的离线存储是基于一个新建的`.appcache`文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像`cookie`一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示

- 如何使用：
  - 页面头部像下面一样加入一个`manifest`的属性；
  - 在`cache.manifest`文件的编写离线存储的资源
  - 在离线状态时，操作`window.applicationCache`进行需求实现

```json
CACHE MANIFEST
#v0.11
CACHE:
js/app.js
css/style.css
NETWORK:
resourse/logo.png
FALLBACK:
/offline.html
```

## 浏览器是怎么对 HTML5 的离线储存资源进行管理和加载的呢？

- 在线的情况下，浏览器发现`html`头部有`manifest`属性，它会请求`manifest`文件，如果是第一次访问`app`，那么浏览器就会根据`manifest`文件的内容下载相应的资源并且进行离线存储。如果已经访问过`app`并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的`manifest`文件与旧的`manifest`文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。
- 离线的情况下，浏览器就直接使用离线存储的资源。
