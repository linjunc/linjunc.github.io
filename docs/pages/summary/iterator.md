---
title: 【深扒】JavaScript 中的迭代器
date: 2021-8-11 7:21:05
id: 1635646025
photos: https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E8%BF%AD%E4%BB%A3%E5%99%A8.png
tags:
  - JavaScript
  - 迭代器
categories:
  - 前端总结
keywords: JavaScript迭代器,小丞同学,迭代器对象
description: 这篇文章将带你深入理解JavaScript中的迭代器，关于迭代器相关的知识，直接的影响到了后面生成器的内容，以及对for...of循环的理解
---


> 📢 大家好，我是小丞同学，本文将会带你理解 `ES6` 中的<font color=#0984e3>**迭代器**</font>。

## 发现问题

> 在 `ES6` 中提出迭代器模式之前，传统迭代存在着怎样的问题？为什么要新增迭代器概念呢？

我们先来看几个例子

```js
let arr = ['小', '丞', '呀']
```

这是一个简单的数组，如果要获取它的每一项数据，我们可以采用 `for` 循环，当然也可以采用 `forEach` 循环，这样很酷

> 关于 `forEach` 循环在之前的文章有解释，[原文连接]()

![image-20210808214248246](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210808214248246.png)

当纯这样还没什么问题

我们再看下面的例子。将给定字符串单个字符输出

```js
let str = '011010'
```

![image-20210808215114945](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210808215114945.png)

可以采用 `for` 循环和 `for...in` 循环

**问题就这样出现了**

上面两个例子中我们的目的都只是遍历，但是却需要去考虑采用**不同的遍历方式**

在第一段代码中我们遍历的是一个数组，第二段遍历的是一个字符串，我们采用了不同的方法，也就是说我们在面对不同**数据结构**时往往会采取不同的**遍历方式**。

在 JavaScript 中原有的表示“集合”的数据结构，主要是 `Array` 和 `Object` ，而在 `ES6`中又新增了 `Map `和 `Set` 两种，同时我们还可以组合使用这些数据结构。面对如此众多的数据结构，我们却**不能使用一个统一的遍历方法**来获取数据，这就是所存在的问题！

当然在 `ES6` 中提供了一个全新的遍历方法 `for...of `循环，但是 `for...of` 有一个非常重要的地方

“**只能对实现了 `iterator` 接口的对象进行遍历取值**”

所以说 `for...of `就只是 `iterator` 雇佣的打工仔，也叫语法糖

> 了解了先前遍历方式存在的问题，下面主角登场，带着问题，`for...of`循环是如何实现统一遍历的？继续往下看~

## Iterator 迭代器

`Iterator` 是一种接口，为各种不同的数据结构提供**统一的访问机制**。任何数据结构只要部署 `Iterator` 接口，就可以完成遍历操作。

### 1. Iterator 的作用

1. 为各种数据结构，提供一个统一的、简便的访问接口

2. 使得数据结构的成员能够按某种次序排列

3. `ES6` 创造了一种新的遍历命令 `for...of` 循环，`Iterator` 接口主要供 `for...of` 消费。

### 2. Iterator 的工作原理

1. 创建一个指针对象，指向当前数据结构的起始位置
2. 第一次调用`next`方法时，指针指向数据结构的第一个成员
3. 接下来调用`next`方法，指针后移，直到指向最后一个成员

每次调用 `next` 方法都会返回一个值，这个值是一个 `object`，包含两个属性，`value` 和 `done`。`value`表示具体的返回值，`done` 是布尔类型的，表示集合是否遍历完成，完成则返回 `true`，否则返回 `false`。

### 3. 手写实现 iterator 接口

```js
function myIterator(arr) {
    let nextIndex = 0;
    return {
        next: function () {
            return nextIndex < arr.length ? {
                value: arr[nextIndex++],
                done: false
            } : {
                value: undefined,
                done: true
            }
        }
    }
}
let arr = [1,2,'ljc']
let it = myIterator(arr)
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
```

![image-20210808230418267](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210808230418267.png)

我们来分析一下上面的代码，`myIterator` 函数是一个遍历器生成函数，它的作用是返回一个遍历器对象，也是指针对象。

我们通过 `next` 方法来移动指针，`next` 方法内部通过闭包来保存指针`nextIndex`的值，每次调用 `next` 方法 `nextIndex`都会 `+1` ，然后根据`nextIndex` 的值从数组内取出数据作为 `value` ，通过索引判断得到 `done` ，当无数据可用时，超过数组最大索引，无可用数据返回，此时 `done` 为 `true`

## 可迭代对象

了解过了 `iterator `，并且我们也已经知道了如何创建一个遍历器对象，但是这和我们先前所说的 `for...of ` 循环有什么关系呢

这里首先我们需要了解一下 `for...of` 的**运行机制**

当 `for...of `循环执行时，循环内部会自动调用这个对象上的迭代器方法`Symbol.iterator` ， 依次执行迭代器对象的 `next` 方法，将 `next` 方法的返回值赋值给 `for ...of` 内的变量，从而得到具体的值，实现遍历。

### 1. 手写实现可迭代对象

一个数据结构只要具有 `Symbol.iterator` 属性，就可以认为是“可遍历的”。

`Symbol.iterator` 属性本身是一个函数，就是当前数据结构默认的遍历器生成函数，执行这个函数，就会返回一个**迭代器对象**。

也就是说要**实现可迭代对象**只要在对象上**部署**了`Symbol.iterator `属性，为它创建一个迭代器方法就可以了

```js
let iteratorObj = {
    items: [1, 2, 'ljc'],
    // 部署Symbol.iterator属性
    [Symbol.iterator]: function () {
        let self = this
        let i = 0
        return {
            next: function () {
                // 类型转化为Boolean
                let done = (i >= self.items.length)
                // 数据确认
                let value = !done ? self.items[i++] : undefined
                // 数据返回
                return {
                    done,
                    value
                }
            }
        }
    }
}
for (let item of iteratorObj) {
    console.log(item); // 1 2 ljc
}
```

显然实现了 `iterator` 接口，可以被 `for...of` 成功遍历

### 2. Iterator 原生应用场景

有些对象我们并没有为它们部署 `Iterator` 接口，但是仍然可以使用 `for...of` 进行遍历。这是因为在`ES6`中有些对象已经默认部署了这个接口。

原生具备 `Iterator` 接口的数据结构：

- Array
- set容器
- map容器
- String
- 函数的 arguments 对象
- NodeList 对象

#### Array

在数组上成功的找到了 `Symbol.iterator` 方法，并能够执行返回迭代器对象，同时验证了`for...of`循环成功执行

```js
let arr = [1, 2, 3]
let it = arr[Symbol.iterator]()//返回迭代器对象
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
for (let item of arr) {
    console.log(item);
}
```

![image-20210809001450172](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210809001450172.png)

> 其余几种都一个套路，不多说

### Q&A

看到这里你可能会想，为什么这么多数据结构都实现了默认部署，为什么偏偏**对象**没有呢？

**当然是有原因的**

对象可能有各种各样的属性，不像数组的值是**有序**的，所以对对象遍历时根本不知道如何确定先后顺序，所以需要我们手动实现

## 提前退出循环

普通的 `for` 循环是可以随时中断的，`for...of` 循环作为 `for` 和 `forEach` 的升级版同样是可以的

迭代器对象除了有 `next` 方法，还有两个可选方法 `return` 方法和 `throw` 方法

`return` 方法的使用场景是，当 `for...of` 循环提前退出，就会调用 `return` 方法。

需要特别注意的是，`return`  方法必须有一个 `object` 类型的返回值

我们在前面代码的基础上添加上 `return` 方法，并在 `for...of` 循环中采用 `break` 语句来中断循环，循环提前退出，自动调用 `return` 方法输出**提前退出**

```js
let iteratorObj = {
    items: [1, 2, 'ljc'],
    // 部署Symbol.iterator属性
    [Symbol.iterator]: function () {
        let self = this
        let i = 0
        return {
            next: function () {
                // 类型转化为Boolean
                let done = (i >= self.items.length)
                // 数据确认
                let value = !done ? self.items[i++] : undefined
                // 数据返回
                return {
                    done,
                    value
                }
            },
            return () {
                console.log('提前退出');
                return {
                    done: true
                }
            }
        }
    }
}
for (let item of iteratorObj) {
    console.log(item); // 1
    break;
}
```

**注意**

如果采用抛出异常的方式退出，会**先执行** `return` 方法再抛出异常

关于 `throw` 方法会在下篇生成器文章中提到

## Iterator 接口使用场景

除了 `for...of` 循环会自动调用 `iterator` 接口之外，还有几个场景也会自动调用

### 1. 解构赋值

对可迭代对象进行解构赋值时，会默认调用 `Symbol.iterator` 方法

```js
let map = new Set().add('a').add('b');
let [x, y] = map
console.log(x, y, map) // a b Set(2) {"a", "b"}
```

由于解构赋值适用于可迭代对象，那么我们对自己自定义的可迭代对象解构赋值试试

```js
let iteratorObj = {
    items: [1, 2, 'ljc'],
    // 部署Symbol.iterator属性
    [Symbol.iterator]: function () {
        let self = this
        let i = 0
        return {
            next: function () {
                // 类型转化为Boolean
                let done = (i >= self.items.length)
                // 数据确认
                let value = !done ? self.items[i++] : undefined
                // 数据返回
                return {
                    done,
                    value
                }
            }
        }
    }
}
let [a, b, c] = iteratorObj
console.log(a, b, c)// 1 2 'ljc'
```

成功的实现了解构赋值

### 2. 扩展运算符

扩展运算符也会默认调用`Symbol.iterator`方法，可以将当前数据结构**转化为数组**

```js
// 阮老师的例子
var str = 'hello';
[...str] //  ['h','e','l','l','o']
let arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']
```

### 3. yield*

`yield*`后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。

```js
let generator = function* () {
  yield 1;
  yield* [2,3,4];
  yield 5;
}
```

这里并不是它的主战场，下节说明

## 总结

在  `ES6` 中新增了新的数据结构，为了提供一种统一的遍历方法，新增了 `for...of` 方式。而 `for...of` 执行的时候会自动调用迭代器来取值

只有实现了 `Iterator` 接口的对象才能采用 `for...of`

迭代器是一个返回迭代器对象的方法

ES6 中很多场景都采用了 `Iterator` ，可以多注意一下，新的东西往往是向上的

**下一篇**将来讲解生成器`Generator`

> 非常感谢您的阅读，欢迎提出你的意见，有什么问题欢迎指出，谢谢！🎈

