---
title: 【化解数据结构】详解栈结构，并实现一个栈结构
date: 2021-10-29 21:51:14
id: 1635515474
photos: https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84-%E6%A0%88.png
tags:
  - 数据结构
  - 栈
categories:
  - 化解数据结构
keywords: 数据结构,栈,小丞同学
description: 关于栈数据结构你了解多少呢？入栈？出栈？如此简单，不如自己手写实现一个栈数据结构吧，那就从这篇文章开始栈的学习之旅吧~
---


> 📢 大家好，我是小丞同学，一名**大二的前端爱好者**
>
> 📢 这篇文章将讲解数据结构中的栈
>
> 📢 非常感谢你的阅读，不对的地方欢迎指正 🙏
>
> 📢 **愿你忠于自己，热爱生活**

## 💡 内容抢先看

- 什么是栈？
- 栈结构有哪些方法
- 实现一个栈
- `LeetCode` 实战

📢 **碎碎念**

> 这篇文章将总结学习的第一个数据结构：**栈**。
> 栈在前端的应用也是非常广泛的，例如：**函数调用堆栈，进制转化，有效括号**这些问题都涉及到栈结构
> 我们一起来看看吧

## 一、什么是栈结构？

栈是一种特殊的线性表，它可以用数组或链表来实现，通常用数组来实现，但是它和数组又很不一样。
**对于数组而言**，我们可以随意的从数组中取出一个元素，也可以在数组的任意位置插入一个元素。
但是**对于栈结构而言**，相对于数组做了一定的限制，它只允许在**栈顶进行取出和插入操作**
因此，栈有着**先进后出**的特点

如图，可以很形象的描述一个栈结构

这就像生活中的桶一样，只能从桶口放东西进去，从桶顶取东西出来

![image-20211029223113404](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20211029223113404.png)

在生活中还有着很多例子，例如：装羽毛球的球桶，我们每次都只能拿最上面的羽毛球，放到最上面

因此对于一个栈有栈顶和栈底之分

**栈顶可以形象的理解为桶口**

**栈底则可以是桶底**

在 `JS` 中，熟悉的**执行上下文**也使用**栈结构**来维护的，栈底是**全局作用域（GO）**，当前执行代码的执行上下文依次加入栈中，栈顶的元素永远是**正在执行的上下文对象**。

## 二、栈结构有哪些方法呢？

和一般的数据结构一样，它有着插入，取出的方法，我们把它们叫作：入栈和出栈
为了丰富一下栈中的方法，我们多实现一些，例如，判断栈顶是否为空、返回栈中的元素个数、清空栈、返回栈顶元素

| 方法        | 含义                               |
| ----------- | ---------------------------------- |
| `push()`    | 添加一个新元素到栈顶               |
| `pop()`     | 移除栈顶元素，同时返回被移除的元素 |
| `peek()`    | 返回栈顶元素，不改变栈             |
| `isEmpty()` | 判断栈是否为空                     |
| `clear()`   | 移除栈中所有元素                   |
| `size()`    | 返回栈中的元素个数                 |

**接下来我们就一一实现它们**

👇 👇 👇

## 三、手写实现一个栈结构

在这里我采用数组来实现栈这个数据结构，因为 `JS` 数组中封装了大量的原生 `API`，可以通过这些 `API` 很方便的实现我们的功能

### 1. 创建一个 Stack 类

首先我们先创建一个 `class` 类，并采用 `stackData` 数组来存储我们的数据

```javascript
class Stack {
  constructor() {
    this.stackData = [];
  }
}
```

### 2. 实现 push 方法
实现**入栈**的方法，这里就是我们采用数组的好处了
根据栈的规则，我们**只能在栈顶添加元素**，也就是在数组的最后一位插入，对应到的就是数组的 `push` 方法
因此实现栈结构的入栈方法，也就是调用数组的 `push` 方法

```javascript
push(element) {
    this.stackData.push(element)
}
```


### 3. 实现 pop 方法
实现出栈的方法，根据后进先出的原则，也就是取出栈顶元素，相当于取出数组的最后一位
因此我们可以采用数组的 `pop` 方法来实现
> `pop` 方法：删除数组的最后一位，并返回删除的值

```javascript
pop() {
    this.stackData.pop()
}
```
实现了入栈和出栈，一个简单的栈结构就已经基本实现了，我们来试试操作它吧

首先我们需要 `new` 一个对象示例，然后适当的调用一下方法来演示一下

```js
const stack = new Stack()
stack.push(9)
stack.push(4)
stack.pop()
stack.push(6)
```

**动图效果**

![栈-push-pop-动图](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E6%A0%88-push-pop-%E5%8A%A8%E5%9B%BE.gif)

可以看到每次都在数组尾部添加元素， `pop` 时也是弹出数组尾部的元素

### 4. 实现 peek 方法

`peek` 是查看栈顶的元素，也就是数组的最后一个元素，同时这个操作不会改变栈噢~**只是查看**

实现的方法也很简单，我们只要返回**数组的最后一位**就可以了

```js
peek() {
    return this.stackData[this.stackData.length - 1]
}
```

使用 `peek` 方法

```js
const stack = new Stack()
stack.push(9)
stack.peek() // 9
```

### 5. 实现 size 方法

`size` 方法：返回栈中的元素个数，也就是返回数组的长度

```js
size() {
    return this.stackData.length
}
```

调用 `size` 方法

```js
const stack = new Stack()
stack.push(9)
stack.push(4)
stack.size() // 2
```

### 6. 实现 isEmpty 方法

`isEmpty` 方法：查看当前栈中是否有值，是空返回 `true`

我们直接判断一下 `length` 就好了

```js
isEmpty() {
    return !this.stackData.length
}
```

使用 `isEmpty` 方法

```js
const stack = new Stack()
stack.push(9) 
stack.isEmpty()  // false  不为空
```

### 7. 实现 clear 方法

`clear` 方法：清空栈，也就是重置一下栈

```js
clear() {
    this.stackData = []
}
```

### 8. 完整的栈结构

```js
class Stack {
    constructor() {
        this.stackData = []
    }
    // 入栈
    push(element) {
        this.stackData.push(element)
    }
    // 出栈
    pop() {
        this.stackData.pop()
    }
    // 获取栈顶
    peek() {
        return this.stackData[this.stackData.length - 1]
    }
    // 检查是否为空
    isEmpty() {
        return !this.stackData.length
    }
    // 清空栈
    clear() {
        this.stackData = []
    }
    // 返回元素个数
    size() {
        return this.stackData.length
    }
}
```

## 四、LeetCode 实战

#### [ 20. 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

> 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
>
> 有效字符串需满足：左括号必须用相同类型的右括号闭合。左括号必须以正确的顺序闭合。

这是一道很经典的题目，我们可以利用栈后进先出的特点来解题，因为我们需要左右括号匹配

- 当我们遇到左括号时，就把这个括号入栈
- 遇到右括号时，我们需要判断一下当前的栈顶是不是和这个括号匹配
- 如果匹配则说明符合，继续遍历，不匹配则直接返回 `false` 
- 同时还有一种特殊情况，当输入的字符串 `s` 的长度是**奇数**时，不可能满足题意

因此我们可以编写代码

```js
var isValid = function (s) {
    // 新建一个栈
    const stack = [];
    // 扫描字符串，遇到左括号入栈，遇到和栈顶括号类型匹配的右括号就出栈，类型不匹配直接 false
    for (let i = 0; i < s.length; i++) {
        // 如果为奇数直接弹出false
        if (s.length % 2 === 1) {
            return false
        }
        const c = s[i];
        // 遇到左括号push
        if (c === '(' || c === '{' || c === '[') {
            stack.push(c)
        } else {
            const t = stack[stack.length - 1]
            if (
                (t === '(' && c === ')')||
                (t === '[' && c === ']')||
                (t === '{' && c === '}')
            ) {
                stack.pop()
            } else {
                return false
            }

        };
    }
    return stack.length === 0
}
```

## 📖 总结

1. 利用数组封装了一个栈结构
2. 了解了栈结构的基本方法
3. 对数据结构有了进一步的了解

---

本文关于栈的内容就到这里结束了，相信你一定能从中学到很多东西。下一篇文章将带你探索**队列**的奥秘

欢迎大家关注本专栏，持续关注最新文章~

> 最后，可能在很多地方讲诉的不够清晰，请见谅
>
> 💌 如果文章有什么错误的地方，或者有什么疑问，欢迎留言，也欢迎私信交流

