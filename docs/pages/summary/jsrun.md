---
title: 🔨 新生代总结 JavaScript 运行机制解析
date: 2021-8-19 9:51:33
id: 1635420393
photos: https://ljcimg.oss-cn-beijing.aliyuncs.com/img/JavaScript%E8%BF%90%E8%A1%8C%E6%9C%BA%E5%88%B6.png
tags:
  - JavaScript
categories:
  - [前端总结,JavaScript精读]
keywords: JavaScript,JavaScript运行机制
description: 引言 在一些面试中，我们或许会被问到这样的问题 还有可能会被问这样的代码 这些虽然看起来很深奥很复杂，但是如果你了解了 JavaScript 的运行机制，这些问题都能够一一化解
---


> 📢 大家好，我是小丞同学，一名<font color=#2e86de>准大二的前端爱好者</font>
>
> 📢 这篇文章将带你一起学习理解 JavaScript 运行机制
>
> 📢 <font color=#f368e0>**愿你忠于自己，热爱生活**</font>

## 引言

在一些面试中，我们或许会被问到这样的问题

> 简述一下 JavaScript 的运行机制？

还有可能会被问这样的代码

```js
setTimeout(function () {
    console.log('定时器开始啦')
});

new Promise(function (resolve) {
    console.log('马上执行for循环啦');
    for (var i = 0; i < 10000; i++) {
        i == 99 && resolve();
    }
}).then(function () {
    console.log('执行then函数啦')
});
```

这些虽然看起来很深奥很复杂，但是如果你了解了 JavaScript 的运行机制，这些问题都能够一一化解

先附上本文的纲要，本文将会从这**三个方面**去解析 JavaScript 的运行机制

![image-20210819095110499](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210819095110499.png)

首先我们来谈谈 JavaScript 的单线程

## 1. 为什么是单线程？

众所周知，JavaScript 是一门单线程的语言，也因此带来了很多诟病，那么单线程如此不堪，为什么不把它设计成多线程的呢？

其实这个问题就出现在了 JavaScript 的**应用场景**上，我们通常采用 JavaScript 来操作 DOM 元素，这在现在来看没什么问题。但是我们想一想，如果 JavaScript 变成了一门多线程的语言，那会发生什么呢？

想象一下下面的场景

一段 JS 代码**删除** DOM 元素，一段 JS 代码**更改** DOM 元素样式，它们一起被执行了，这会发生什么？

先别说浏览器该怎么处理了，我都不知道该如何处理，那浏览器就会崩溃掉 ...

为了避免这样的情况， JavaScript 被设计成了一门单线程的语言

单线程就意味着，一次只能执行一个任务，其他任务都需要排队等待

但是为了能有多线程的功能，有了很多的尝试

在 HTML5 中提出了 `web worker` 标准，它提供了一套完整的 API 去允许在主线程以外**去执行另一个线程**，但是这**不意味**着 JavaScript 从此拥有了多线程的能力，同时我们也不能用它来操作 DOM 元素。

在 JavaScript 中还有着独特执行机制，它将主线程中的任务分为同步任务和异步任务

## 2. 为什么需要异步？

> 为了能够解决单线程带来的代码阻塞等问题

JS 是单线程的，我们可以想象成有一个售票窗口，有很多人在窗口排队办理业务，而 JS 只能一个一个处理，那如果有一个客户的需求很多，办理业务的时间很长，那么这条队伍的其他人就只能干等着了，就相当于代码阻塞了，也就是浏览器**假死**，等待代码执行

因此有了同步任务和异步任务的概念

就是需要通过这样来区分，将那些办理业务时间长的分出来，等到其他客户处理完毕之后再统一处理

关于同步任务和异步任务是这样解释的

- 同步任务：是在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务，例如：`console.log`
- 异步任务：不进入主线程、通过事件循环机制处理，在任务队列中注册回调函数最终拿到结果，例如：`setTimeout`

了解了什么是同步，什么是异步，我们来一道非常简单的题目

```js
console.log(1);
setTimeout(()=>{console.log(2);},0)
console.log(3);
```

结果输出 1 3 2

原因是 `setTimeout` 是异步任务，需要在同步代码执行之后再执行

接下来我们聊聊运行机制的核心：事件循环

## 3. 事件循环

首先我们用一张图来理解事件循环

![image-20210818224430488](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210818224430488.png)

它的运行机制如下：

1. 所有同步任务在主线程上执行，形成一个执行栈，也就是上图蓝色箭头表示
2. 主线程以外有一个异步任务队列（红色箭头），会等到异步任务**返回结果后**将它放入**任务队列**
3. 当主线程中执行栈代码执行完毕，也就是同步任务执行完毕，就会**开始读取**任务队列代码，再放入执行栈中执行
4. 不断地重复上面三步，这就是事件循环

用图形来描绘的话，就是上图中的**三个黑色箭头**，连成的闭环

也就是说：**只要主线程执行栈空了，就会去读取任务队列，这个过程是循环不断的，这种运行机制就叫做事件循环**

了解了事件循环，我们对前面那题做一个简单的升级

```js
console.log(1);
setTimeout(()=>{console.log(2);},0)
setTimeout(()=>{console.log(3);},1000)
setTimeout(()=>{console.log(4);},0)
console.log(5);
```

这次输出了 1 -- 5 -- 2 -- 4 -- 3

可能会有人会对 `3` 的输出有疑惑，首先定时器都是异步任务，会先被放入异步任务队列当中，需要等待异步任务**返回结果后**，再将回调函数放入任务队列当中，等待主线程来执行，因此，2 和 4 会在 3 之前输出

## 4. 异步任务队列细节

常见的会放入异步任务队列的事件

1. DOM 事件
2. Promise
3. Ajax 请求
4. `setTimeout` 和 `setlnterval`
5. 文件上传

至于加入异步任务队列的时间，是需要根据当前异步任务而定的，**不是说**拿到异步任务直接添加到任务队列里面，是要等到当前异步任务执行完成返回结果，才将其放到任务队列里

就拿 `setTimeout` 来说，是需要**等待定时结束**再将回调加入任务队列的

也可以结合下图理解

![image-20210819002424355](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210819002424355.png)

了解了任务队列，我们需要再谈一谈异步任务当中，又被细分出来的宏任务和微任务

## 5. 宏任务和微任务

宏任务队列可以有多个，微任务队列只有一个

那么什么是宏任务，什么是微任务呢？

- 宏任务有：HTML解析、鼠标事件、键盘事件、网络请求、执行主线程js代码和定时器
- 微任务有：`promise.then`，DOM 渲染，`async`，`process.nextTick`

那它是怎么被执行的呢？

1. 当执行栈中的同步任务执行完毕后，先执行微任务

2. 微任务队列执行完毕后，会读取宏任务

3. 执行宏任务的过程中，遇到微任务，再加入微任务队列

4. 宏任务执行完后，再次读取微任务队列，依次循环

画个图来辅助理解一下

用一句简单的话来总结：**微任务永远在宏任务执行之前被执行完毕**

![image-20210819001618159](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210819001618159.png)

**特别注意**的是：由于代码的入口就是一个 `script` 标签。因此，全局任务属于宏任务

## 6. 实战

在了解了这么多后，我们来看一到经典的面试题

```js
console.log("1");
setTimeout(function () {
    console.log("2");
    new Promise(function (resolve) {
        console.log("3");
        resolve();
    }).then(function () {
        console.log("4");
    });
});
new Promise(function (resolve) {
    console.log("5");
    resolve();
}).then(function () {
    console.log("6");
});
setTimeout(function () {
    console.log("7");
});
setTimeout(function () {
    console.log("8");
    new Promise(function (resolve) {
        console.log("9");
        resolve();
    }).then(function () {
        console.log("10");
    });
});
new Promise(function (resolve) {
    console.log("11");
    resolve();
}).then(function () {
    console.log("12");
});
console.log("13");
```

答案是：1 -- 5 -- 11 -- 13 -- 6 -- 12 -- 2 -- 3 -- 4 -- 7 --  8 -- 9 -- 10

**第一轮循环**

- 从全局任务入口，首先**打印**日志 `1`
- 遇到宏任务 `setTimeout` ，交给异步处理模块，记为`setTimeout1`
- 再遇到 promise 对象，**打印**日志 `5` ，将 `promise.then` 加入微任务队列，记做 `p1`
- 又遇到 `setTimeout` 交给异步处理模块，记为 `setTimeout2`
- 又遇到 `setTimeout` 交给异步处理模块，记为 `setTimeout3`
- 遇到 promise 对象，打印日志 `11` ，将 `promise.then` 加入微任务队列，记做 `p2`
- 遇到打印语句，直接打印日志 `13`

本轮循环共打印：1 -- 5 -- 11 -- 13

当前循环结果

![image-20210819084640821](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210819084640821.png)



**第二轮循环**

- 首先执行微任务队列 `p1` 和 `p2` ，先进先出，先打印 `6` 再打印 `12`
- 微任务事件处理完毕，开始执行宏任务 `setTimeout1`
- 遇到打印语句，直接打印日志 `2`
- 又遇到 promise 对象，打印日志 `3`，将 `promise.then` 加入微任务队列，记做 `p3`

第二轮循环结束

当前运行图为

![image-20210819084924330](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210819084924330.png)



**第三轮循环**

- 首先执行微任务队列，打印日志 `4`
- 微任务处理完毕，执行宏任务 `setTimeout2`
- 遇到打印语句，直接输出 `7`

本轮循环结束

![image-20210819085314165](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210819085314165.png)

**第四轮循环**

- 微任务队列为空，执行宏任务 `setTimeout3`
- 遇到打印语句，打印日志 `8`
- 遇到 promise 对象，执行打印语句，打印 `9`
- 将 `promise.then` 加入微任务队列 记做 `p4`

![image-20210819085545680](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210819085545680.png)

**第五轮循环**

- 首先清空微任务队列，执行打印语句，打印 `10`
- 执行完毕

以上就是关于 JavaScript 运行机制的全部内容，希望能有所收获

> 非常感谢您的阅读，欢迎提出你的意见，有什么问题欢迎指出，谢谢！🎈

