# 【offer 收割计划】这几道常见的面试题，你会几道！

![offer收割计划-第二弹](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/offer%E6%94%B6%E5%89%B2%E8%AE%A1%E5%88%92-%E7%AC%AC%E4%BA%8C%E5%BC%B9.png)

> 📢 大家好，我是小丞同学，一名**大二的前端爱好者**
>
> 📢 这篇文章将来讲讲几道常见的面试题
>
> 📢 非常感谢你的阅读，不对的地方欢迎指正 🙏
>
> 📢 **愿你忠于自己，热爱生活**

## 💡 知识点抢先看

1. `BFC` 是什么
2. `CSS` 实现毛玻璃
3. 伪数组和数组的区别
4. `['1', '2', '3'].map(parseInt)` 
5. 实现一个 sleep 函数
6. `react-router` 里的 `<Link>` 标签和 `<a>` 标签有什么区别 https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/135

## 一、请说说什么是 BFC ？

![image-20211126132038720](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211126132038720.png)

**BFC** 全称叫做块级格式化上下文，它是一个完全独立的布局空间，我们可以在这个空间当中对子元素进行布局，并且**不会影响到空间外部**的布局

在 `W3C` 中这样解释到

>`BFC`它决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用，当涉及到可视化布局时，`Block Formatting Context`提供了一个环境，`HTML`在这个环境中按照一定的规则进行布局。

**那么如何触发** `BFC` 呢？

一些经典的话术

- `float` 不为 `none`
- `position` 的值不是 `static` 或者 `relative`
- `display` 的值是 `inline-block` 、`table-cell`、`flex`、`table-caption` 以及 `inline-flex`
- `overflow` 的值不是 `visible`

以及我比较喜欢用的 `display: flow-root`

我把它理解为一种专门用来触发 `BFC` 的属性，它在块级元素的基础上进行了修正，在原来的块级盒子中，子元素开启 `float` 时，会有父元素**高度塌陷**等问题，父元素的高度，不会根据浮动元素的高度来设定，因此 `flow-root` 这种新的布局方式，解决了这个问题，开启了 `flow-root` 后，就会触发 `BFC`，从而解决高度塌陷等问题

`BFC` **有哪些布局规则呢？**

- `BFC` 就是一个块级元素，它的子元素会在垂直方向，一个接一个的放置
- 垂直方向的距离由 `margin` 决定， 属于同一个 `BFC` 的两个相邻的外边距会重叠
- 计算 `BFC` 高度时，浮动元素需要参与计算

`BFC` **解决了什么问题呢？**

1. 浮动元素导致的高度塌陷
2. `margin` 外边距合并，造成的原因是根元素也是一个 `BFC` 元素
3. 清除浮动

## 二、如何用 CSS 实现毛玻璃效果？

毛玻璃就是一种背景模糊的磨砂玻璃的效果，比较有层次感，有一种半透明的感觉

实现毛玻璃效果，主要依赖 `CSS` 属性 `backdrop-filter`，这个属性可以为元素后面区域添加图形效果，类似于模糊，颜色偏移，因为它适用于元素背后的所有元素，因此我们必须使元素或**背景部分透明**

**如何实现呢**？

我们采用这个属性，设置一点模糊即可，但是这个属性有兼容性问题噢，需要注意噢~

![image-20211126215914743](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211126215914743.png)

我们也可以看看和正常添加半透明效果的对比，可以看出第一个的透明感很强，没有**磨砂的感觉**

![image-20211126220139889](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211126220139889.png)

## 三、你知道伪数组吗？说说它和数组的区别

了解。伪数组就是一个像数组的对象，它为什么像数组呢，因为它有 `length` 属性，同时它也和数组一样通过索引来存储数据

我们把符合以下条件的**对象**称为伪数组：

- 具有 `length` 属性
- 按照索引方式来存储数据
- 不具有数组的 `push` 、`pop` 等方法

常见的伪数组有，`argument`参数，`JQ` 对象、`document.querySelectorAll`、`document.getElementsByTagName` 等返回的对象都是伪数组

在我们初学 `DOM` 操作的时候，我们经常会获取到伪数组，我们最后都需要转化成真正的数组去操作，我们可以这样操作

![image-20211126221446767](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211126221446767.png)

这样我们就能将伪数组转成真正的数组了

👉 **总结一下**

1. 都有 `length` 属性
2. 都是对象
3. 类数组的 `length` 属性不会自增
4. 类数组没有原生数组的方法

## 四、来看看这题的输出 `['1', '2', '3'].map(parseInt)` 

这题早已经看透了，答案我们后面再说

这题有两个考点，一个是 `map` 、一个是 `parseInt` ，这两个方法大家用的最多，但也是了解最少的，我们经常用 `map` 来进行遍历，传入一个回调函数，操作 `item` ，`parseInt` 我们经常用来做类型转化，这些我们都很常用，但没有我们想象的那么简单

**具体来看看 `parseInt` 方法**

`parseInt` 函数接收两个参数，第一个参数是我们要操作的字符串，第二个参数是指定的基数，也就是我们以多少进制来看待这个字符串

例如：在这里我们同样都是操作 `100` 这个数，但是当我们第二个参数传入 `2` 时，就会得到不一样的结果，在这里，它把 `100` 看成了二进制的 `100` 因此转化结果为 `4`

![image-20211126223557570](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211126223557570.png)

再来看看 `map` 方法，它创建一个新的数组，结果是这个数组中每一个元素都调用这个提供的函数后返回的结果

它接受的回调函数有三个参数，其中两个可选，第一个参数是当前遍历的元素 `item`，第二个是当前元素的索引，第三个是这个数组本身

知道了 `parseInt` 和 `map` 方法的具体使用规则后，我们来看看这道题

由于 `parseInt` 能够接收两个参数，字符串和基数， `map` 方法会默认传递这两个参数给 `parseInt` 方法，因此它实际上执行的是

![image-20211126224253651](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211126224253651.png)

这样就明朗了，由于 `2、3` 大于它们的基数 `1、2` 导致了它们无法被转化，返回 `NaN`

> 最终结果：`[1, NaN, NaN]`

那如果我们真的要实现这个将数字字符串数组，转化成纯数字数组需要怎么做呢？如下 👇👇👇

![image-20211126224607200](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211126224607200.png)

## 五、来实现一个 sleep 函数

`sleep` 函数就是一个等待的函数，代码运行到这里时，需要等待 `sleep` 函数执行完毕后，再继续执行

这题考验的是对于异步编程的理解，回调函数、生成器、`async` 、`promise`，这些都可以实现

> 关于异步编程，具体可以查看博主的另一篇文章：[深入理解 JavaScript 中的异步编程](https://juejin.cn/post/6998293153824391182)

首先我们先用最原始的**回调函数**的方法来实现

我们接收一个回调函数和睡眠时间，采用 `setTimeout` 来实现等待

![image-20211126225615822](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211126225615822.png)

**生成器**

利用 `yield` 和 `next` 来控制函数运行

![image-20211126225916370](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211126225916370.png)

**Promise**

![image-20211126230123515](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211126230123515.png)

**async**

最优雅的写法

![image-20211126230312546](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211126230312546.png)

## 六、react-router-dom 中的 `<Link>` 标签和 `<a>` 标签有什么区别

首先，从 `DOM` 渲染出来的标签来看，它们都是 `a` 标签

它们的区别再于 `Link` 标签是 `react-router` 中实现路由跳转的链接，它和传统的页面跳转不一样， `Link` 跳转只会触发相匹配的 `Route` 对应的页面进行更新，不会刷新整个页面

而对于 `a` 标签来说，它会从当前页面跳转到 `href` 指向的另一个页面

因此也可以说，`LInk` 跳转不会刷新页面， `a` 标签跳转回刷新页面

我们再来看看 `Link` 标签在页面跳转的时候都做了什么

来看看源码

![image-20211126232055665](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211126232055665.png)

1. 当有 `onClick` 事件时执行 `onClick`
2. `click` 时回阻止 `a` 标签的默认事件，防止 `a` 标签跳转
3. 再取得 `href` ，用 `history` 的方式进行跳转，触发了页面的 `hashChange` 事件，`Router` 内部进行捕获监听来处理跳转逻辑，不刷新页面

最后总结以下

1. `Link` 页面无刷新跳转，`a` 标签进行刷新
2. `Link` 标签会阻止 `a` 标签的默认事件，采用 `history` 进行跳转

---

## 📖 总结

通过这几道面试题，我们重新温习了 `BFC`、`map`、`parseInt` 这些小而却非常常用的方法，对于它们的细节我们也有了一定的学习，最后我们剖析了 `react-router-dom` 中 `Link` 和 `a` 标签的区别，感觉收获还是很大！

最后，我是小丞同学，欢迎大家关注本专栏，持续关注最新文章~祝愿大家拿到心仪的 `offer`

> 最后，可能在很多地方讲诉的不够清晰，请见谅
>
> 💌 如果文章有什么错误的地方，或者有什么疑问，欢迎留言，也欢迎私信交流

