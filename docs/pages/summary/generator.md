---
title: 【深扒】JavaScript 中的生成器
date: 2021-8-13 8:10:51
id: 1635646191
photos: https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E7%94%9F%E6%88%90%E5%99%A8.png
tags:
  - JavaScript
  - 生成器
categories:
  - 前端总结
keywords: JavaScript生成器,生成器,小丞同学
description: 写在前面 在上篇文章中，我们深入了理解了迭代器的原理和作用，这一篇我们来深扒与迭代器息息相关的生成器。
---


> 📢 大家好，我是小丞同学，本文将会带你理解 `ES6` 中的**生成器**。

## 写在前面

在上篇文章中，我们深入了理解了迭代器的原理和作用，这一篇我们来深扒与迭代器息息相关的**生成器**。

关于生成器有这样的描述

**红宝书**：生成器是 `ES6` 新增的一个极为灵活的结构，拥有在一个**函数块内暂停和恢复代码**执行的能力

**阮一峰老师**：`Generator` 函数是 `ES6` 提供的一种异步编程解决方案

从上面的两段话中，我们可以知道生成器有着**至少两个作用**：

1. 打破完整运行，拥有暂停和启动的能力
2. 解决异步操作

下面我们来看看生成器是如何实现这些功能的

## 一个例子了解生成器

我们先来看一个例子

下面是一个 `for` 循环的例子，会在每次循环中输出当前的 `index` ，这段代码很也是简单的生成了 0-5 这些数字

```js
for (let i = 0; i <= 5; i++) {
    console.log(i);
}
// 输出 0 1 2 3 4 5
```

我们再来看看利用**生成器函数**是怎么实现的

```js
function* generatorForLoop(num) {
    for (let i = 0; i <= num; i ++) {
        yield console.log(i);
    }
}
const gen = generatorForLoop(5);
gen.next(); // 0
gen.next(); // 1
gen.next(); // 2
gen.next(); // 3
gen.next(); // 4
gen.next(); // 5
```

我们可以看到，只有调用 `next` 方法，才会向下执行，而不会一次产生所有值。这就是一个最简单的生成器了。在某些场景下，这种特性就成为了它的杀手锏

## 基本概念

### 1. 函数声明

生成器的形式是一个函数，函数名称前面加一个星号 `*` 表示它是一个生成器。

```js
// 函数声明
function * generator () {}
// 函数表达式
let generator = function *() {}
```

在定义一个生成器时，星号的位置在函数名前，但是位置没有明确的要求，不需要考虑挨着谁，都可以

>  只要是可以定义函数的地方，就可以定义生成器。
>
> **需要特别注意的是：箭头函数不能用来定义生成器**

### 2. yield 表达式

函数体内部使用`yield`表达式，定义不同的内部状态，我们来看一段代码

```js
function* helloWorld() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
```

在上面的代码中定义了一个生成器函数 `helloWorld ` ，内部有两个 `yield` 表达式，三个状态：hello，world 和 return 语句

作为生成器的核心，单纯这么解释可能还是不能明白 `yield` 的作用以及它的使用方法

下面我们来展开说说 `yield` 关键字

首先它和 `return` 关键字有些许的类似，`return`  语句会在完成函数调用后返回值，但是在 `return` 语句之后无法进行任何操作

![image-20210812111012666](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210812111012666.png)

可以看到在编译器中第一个 `return` 语句之后的代码变灰了，说明了没有生效。但是`yield`的工作方式却不同，我们再来看看 `yield` 是如何工作的

![image-20210812112332270](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210812112332270.png)

**注意**：`yield`  关键字只能在生成器函数内部使用，其他地方使用会抛出错误

首先生成器函数会**返回一个遍历器对象**，只有通过调用 `next` 方法才会遍历下一个状态，而 `yield` 就是一个暂停的标志

在上面的代码中，首先声明了一个生成器函数，利用 `myR` 变量接收生成器函数的返回值，也就是上面所说的**遍历器对象**，此时遍历器对象处于**暂停状态**。

当调用 `next` 方法时，开始执行，遇到 `yield` 表达式，就暂停后面的操作，将 `yield` 后面的表达式的值，作为返回的对象的 `value` 值，因此第一个 `myR.next()` 中的 `value` 值为 `8`

再次调用 `next` 方法时，再继续向下执行，遇到 `yield` 再停止，后续操作一致

需要**注意**的是，`yield` 表达式后面的表达式，只有当调用`next`方法，内部指针指向该语句时才会执行

```js
function* gen() {
  yield  123 + 456;
}
```

就例如上面的代码中，`yield`后面的表达式 `123 + 456` ，不会立即求值，只会在 `next` 方法将指针移到这一句时，才会求值。

因此可以理解为 `return` 是结束， `yield` 是停止

### 3. 一定需要 yield 语句吗？

其实在生成器函数中也**可以没有**`yield`表达式，但是生成器的特性还在，那么它就变成了一个单纯的**暂缓执行函数**，只有在调用该函数的遍历器对象的 `next` 方法才会执行

```js
function* hello() {
    console.log('现在执行');
}
// 生成遍历器对象
let generator = hello()
setTimeout(() => {
    // 开始执行
    generator.next()
}, 2000)
```

### 4. 注意

`yield` 表达式如果用在另一个表达式中，必须放在圆括号里

```js
console.log('Hello' + (yield 123)); // OK
```

`yield` 表达式用作函数参数可以不加括号

```js
foo(yield 'a')
```

## 如何理解 Generator 函数是状态机？

在阮一峰老师的 `ES6` 书籍上有着对生成器函数这样的理解

> `Generator` 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。

书上说，`Generator` 函数是状态机，这是什么意思呢，状态机又怎么理解呢？

这个和 `JavaScript` 的状态模式有些许关联

状态模式：当一个对象的内部状态发生改变时，会导致其行为的改变，这看起来像是改变了对象

看到这些定义的时候，显然每个字都知道是什么意思，合起来却不知所云

先不要慌，我们先来看看状态模式是个什么东西，写个状态机就明白了

我们用一个洗衣机的例子，按一下电源键就打开，再按一下就关闭，我们先来实现这个

```js
let switches = (function () {
    let state = "off";
    return function () {
        if (state === "off") {
            console.log("打开洗衣机");
            state = "on";
        } else if (state === "on") {
            console.log("关闭洗衣机");
            state = "off";
        }
    }
})();
```

在上面的代码中，通过一个立即执行函数，返回一个函数，将状态 `state` 保存在函数内部，每次按下电源键调用 `switches` 函数即可。

这样看起来很完美，下面我们改变一下需求，洗衣机上有一个调整模式的按钮，每按一下换一个模式，假设有快速、洗涤、漂洗、拖水怎么实现

同样的我们还是可以采用 `if-else` 语句实现

```js
let switches = (function () {
    let state = "快速";
    return function () {
        if (state === "快速") {
            console.log("洗涤模式");
            state = "洗涤";
        } else if (state === "洗涤") {
            console.log("漂洗模式");
            state = "漂洗";
        } else if (state === "漂洗") {
            console.log("脱水模式");
            state = "脱水";
        } else if (state === "脱水") {
            console.log("快速模式");
            state = "快速";
        } 
    }
})();
```

越来越复杂了，当模式再增多时，`if-else` 语句会越来越多，代码会难以阅读，你可能会说可以采用 `switch-case`  语句来实现，当然也可以，但是治标不治本。我们可不可以**不采用判断语句**实现呢。回到我们刚开始的定义

> 状态模式：当一个对象的内部状态发生改变时，会导致其行为的改变，这看起来像是改变了对象

咦，想想，洗衣机不正是需要实现状态改变，行为改变吗？那这正可以采用状态模式来实现呀，这里我们就直接引出我们的 `generator` 函数，**通过控制状态来改变它的行为**

利用原型来实现的方法太过于**复杂和冗余**了，就不展示了

```js
const fast = function () {
    console.log("快速模式");
}
const wash = function () {
    console.log("洗涤模式");
}
const rinse = function () {
    console.log("漂洗模式");
}
const dehydration = function () {
    console.log("脱水模式");
}

function* models() {
    let i = 0,
        fn, len = arguments.length;
    while (true) {
        fn = arguments[i++]
        yield fn()
        if (i === len) {
            i = 0;
        }
    }
}
const exe = models(fast, wash, rinse, dehydration); //按照模式顺序排放
```

在上面的代码中我们只需要在每次按下时调用 `next` 方法即可切换下一个状态

![生成器](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E7%94%9F%E6%88%90%E5%99%A8.gif)

说了这么多 `generator` 为什么说是状态机呢？我的理解是：当调用 `Generator` 函数获取一个迭代器时，状态机处于初态。迭代器调用 `next` 方法后，向下一个状态跳转，然后执行该状态的代码。当遇到 `return` 或最后一个 `yield` 时，进入终态。同时采用 `Generator` 实现的状态机是最佳的结构。

## next 传递参数

生成器的另一强大之处在于内建消息**输入输出能力**，而这一能力仰仗于 `yield` 和 `next`  方法

`yield` 表达式本身没有返回值，或者说总是返回 `undefined` 。 `next` 方法可以带一个参数，该参数就会被当作**上一个** `yield` 表达式的返回值。

从语义上讲，第一个 `next` 方法用来**启动遍历器对象**，所以不用带有参数。

来看一个例子

```js
function* foo(x) {
    let y = x * (yield)
    return y
}
const it = foo(6)
it.next()
let res = it.next(7)
console.log(res.value) // 42
```

在上面的代码中，调用 `foo` 函数**返回一个遍历器对象** `it` ，并将 6 作为参数传递给 x ，调用遍历器对象的 `next ` 方法，**启动**遍历器对象，并且运行到第一个 `yield` 位置停止，

再次调用 `next` 方法传入参数 7 ，作为上一个 `yield` 表达式的返回值也就是 x 的乘项 `(yield)` 的值，运行到下一个 `yield` 或 `return` 结束

**下面开始作死**

在上面的例子中，如果不传递参数会这么样呢？
在第二次运行 `next` 方法的时候不带参数，导致了 y 的值等于 `6 * undefined` 也就是 `NaN` 所以返回的对象的 `value` 属性也是 `NaN`

![image-20210812182445067](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210812182445067.png)

我们**再变一下**

在原先的例子中，我们说第一个 `next` 是用来启动遍历器对象，那么如果传入参数会怎么样？

其实这样传递参数是无效的，因为我们说 `next` 方法的参数表示上一个 `yield` 表达式的返回值。

> V8 引擎直接忽略第一次使用 `next` 方法时的参数

## 与 Iterator 接口的关系

在上一篇中我们知道，一个对象的 `Symbol.iterator` 方法，等于该对象的遍历器生成函数，调用该函数会返回一个遍历器对象

在这一篇我们知道，生成器函数就是遍历器生成函数，那么是不是有什么想法了呢？

我们可以把生成器赋值给对象的 `Symbol.iterator` 属性，实现 `iterator` 接口

```js
let myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
}

[...myIterable] // [1, 2, 3]
```

## 提前终止生成器

生成器函数返回的遍历器对象，都有 `next` 方法，以及可选的 `return` 方法和 `throw` 方法

我们先来看 `return` 方法

### return

`return` 方法会强制生成器进入关闭状态，提供给 `return` 方法的值，就是**终止迭代器对象的值**，也就是说此时返回的对象状态为`true`，值为传入的值。我们来验证一下

```js
function* genFn() {
    for (const x of [1, 2, 3]) {
        yield x
    }
}
// 创建遍历器对象 g
const g = genFn()
// 手动结束
console.log(g.return('结束'))
```

在上面的代码中，输出了 `{value: "结束", done: true}` ，这和我们预料的一样，我们生成了遍历器对象后，直接调用 `return` 终止了生成器

如果生成器函数内部有 `try...finally` 代码块，且**正在执行** `try` 代码块，那么 `return()` 方法会导致立刻进入 `finally` 代码块，执行完以后，整个函数才会结束。

```js
function* genFn() {
    try {
        yield 111
    } finally {
        console.log('我在finally中');
        yield 999
    }
}
// 创建遍历器对象 g
const g = genFn()
// 启动
g.next()
console.log(g.return('结束'))
```

![image-20210812212044117](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210812212044117.png)

在上面的代码中，执行 `next` 函数，使得 `try` 代码块开始执行，再调用 `return` 方法，就会开始执行 `finally` 代码块，然后等待执行完毕，再返回 `return` 方法指定的返回值

### throw

`throw()` 方法会在暂停的时候将一个提供的错误注入到生成器对象中。如果错误未被处理，生成器就会关闭

在很多的资料中都说的很复杂，其实就很简单：

有错误你就给我一个 `catch` 来处理掉，不然你就给我退出，就是这么霸道

```js
function* gen(){
    console.log("state1");
    let state1 = yield "state1";
    console.log("state2");
    let state2 = yield "state2";
    console.log("end");
}
let g = gen();
g.next();
g.throw();
```

在上面的代码中，`throw` 方法提出的错误，没有被处理，因此会被直接退出，因此上面的代码只会输出  `state1`  ，然后报错

注意：可以给 `throw` 方法**传递参数**，用来解释错误

```js
g.throw(new Error('出错了！'))
```

## next()、throw()、return() 的共同点

到这里遍历器对象的3个方法，已经都涉及过了，虽然他们的功能各不相同，或者说完全没有关系，但是他们的本质确实在做同一件事，“采用语句替换 `yield` 表达式”

`next` 是将 `yield` 表达式替换成一个值

`throw `是将 `yield` 表达式替换成 `throw` 语句

```js
gen.throw(new Error('出错了')); // Uncaught Error: 出错了
// 相当于将 let result = yield x + y
// 替换成 let result = throw(new Error('出错了'));
```

`return` 是将 `yield` 表达式替换成 `return` 语句

## yield* 表达式

带星号的 `yield`，可以增强`yield`的行为，使它能够迭代一个可迭代对象，从而一次产出一个值，这也叫**委托迭代**。通过这样的方式，能将多个生成器连接在一起。

```js
function * anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function * generator(i) {
  yield* anotherGenerator(i);
}

var gen = generator(1);

gen.next().value; // 2
gen.next().value; // 3
gen.next().value; // 4
```

几个注意点：

1. 任何数据结构只要有 `Iterator` 接口，就可以被`yield*`遍历。
2. 如果被代理的 `Generator` 函数有`return`语句，那么就可以向代理它的 `Generator` 函数返回数据。

### 使用 yield* 实现递归算法

实现递归算法，这也是 yield* 最有用的地方，此时生成器可以产生自身

```js
function* nTimes(n) {
    if (n > 0) {
        yield* nTimes(n - 1);
        yield n - 1;
    }
}
for (const x of nTimes(3)) {
    console.log(x);
}
// 0 1 2
```

上面的代码中，每个生成器首先会从新创建的生成器对象产出每个值，然后再产出一个整数。

## 参考资料

[[译] 什么是 JavaScript 生成器？如何使用生成器？](https://juejin.cn/post/6844903616357072910#heading-3)

阮一峰老师  [Generator 函数的语法](https://wangdoc.com/es6/generator.html)

《JavaScript高级程序设计第四版》

---

上篇文章：[【深扒】 JavaScript 中的迭代器](https://linjc.blog.csdn.net/article/details/119535128)

本文内容就到这里结束了，关于生成器的核心应用异步编码模式以及回调问题，将在下篇总结。

> 非常感谢您的阅读，欢迎提出你的意见，有什么问题欢迎指出，谢谢！🎈

