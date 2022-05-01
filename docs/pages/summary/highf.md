---
title: JavaScript中的高阶函数
date: 2021-5-13 9:53:59
id: 1635663239
photos: https://ljcimg.oss-cn-beijing.aliyuncs.com/img/aop.png
tags:
  - JavaScript
categories:
  - 前端总结
keywords: JavaScript,高阶函数,小丞同学
description: 高阶函数 JavaScript 高阶函数是指以函数作为参数的函数，并且可以将函数作为结果返回的函数。 
---

高阶函数是指以函数作为参数的函数，并且可以将函数作为结果返回的函数。

## 1. 高阶函数

- 接受一个或多个函数作为输入
- 输出一个函数

至少满足以上一个条件的函数

在js的内置对象中同样存在着一些高阶函数，像数组的`map`，`filter`，`reduce`方法等，它们接受一个函数作为参数，并应用这个函数到列表的每一个元素

### 1.1 map

`map`方法接收一个函数作为参数 ，遍历数组，并且返回一个新的数组，新的数组里的每个元素都执行`map`传入的函数。

```js
let arr = [1, 2, 3, 4];
let arr1 = arr.map(item => item * 2)
console.log(arr1);// [2, 4, 6, 8]
```

返回的是一个新数组`arr1`，==不改变原数组==

`注意`：如果传入的参数没有返回值，则数组的每一项都会是`undefind`

#### **经典题目**

```js
console.log(['1','2','3'].map(parseInt)); 
```

来看看上面这个代码输出什么

**答案**：`[1, NaN, NaN]`

**解析**

`parseInt()` 函数可解析一个字符串，并返回一个整数。

当参数 radix 的值为 0，或没有设置该参数时，`parseInt() `会根据该字符串来判断数字的基数。

当忽略参数 radix , 默认的基数如下:

- 如果 字符串 以 "0x" 开头，`parseInt()` 会把 其余部分解析为十六进制的整数。
- 如果字符串以 0 开头，把其余部分解析为八进制或十六进制的数字。
- 如果字符串以 1 ~ 9 的数字开头，`parseInt()`将把它解析为十进制的整数

`注意`：基数**可不是**默认十进制噢！

当我们把数组传入`parseInt`时，由于接收2个参数，会将数组的索引作为基数传个`parseInt`，所以实质上进行的是以下几步

```js
parseInt('1', 0)
parseInt('2', 1)
parseInt('3', 2)
```

`注意`：如果字符串的第一个字符不能被转换为数字，那么` parseInt() `会返回 NaN。

**小tips**：

`parseInt()`还有很多值得注意的问题，可以使用搜索引擎再了解以下

### 1.2 filter

**用于筛选数组**

`filter`方法接收一个函数作为参数，通过这个函数来指定筛选数组的规则，最后返回满足规则的新数组

在传入的函数中有3个参数可选

| 参数           | 描述                         |
| :------------- | :--------------------------- |
| *currentValue* | 必须。当前元素的值           |
| *index*        | 可选。当前元素的索引值       |
| *arr*          | 可选。当前元素属于的数组对象 |

`注意`：

- 不会检测空数组
- 不会改变原始数组

```js
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let arr1 = arr.filter(num => {
    return num > 5
})
console.log(arr1);// [6, 7, 8, 9]
```

### 1.3 reduce

`reduce`能做的事情很多，但是我们平时都使用for循环之类的方法代替了，但是`reduce`真的**高逼格**

```js
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
```

在`w3school`中给出的reduce语法，这里我们常用的只有前面两个

| 参数           | 描述                                     |
| :------------- | :--------------------------------------- |
| *total*        | 必需。*初始值*, 或者计算结束后的返回值。 |
| *currentValue* | 必需。当前元素                           |

```js
let arr = [1, 2, 3, 4]
let sum = arr.reduce((value, item) => {
    console.log(value, item);
    // 1 2   3 3  6 4  
    return value + item
})
console.log(sum);// 10
```

从第四行的调试中可以看出`reduce`函数的执行过程，在没有初始值的情况下，将数组第一个值作为`value`第二个值作为`item`再依次往下遍历整个数组，将返回值作为`value`，数组的下一位作为`item`，直至遍历完成。

![](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/reduce.png)

**利用`ruduce`实现数组去重**

```js
let arr = [1,1,2,3,4,2,5,4];
let unique = arr.reduce(function (prev, item) {
    prev.indexOf(item) === -1 && prev.push(item);
    return prev;
}, []);
console.log(unique); // [1, 2, 3, 4, 5]
```

通过将空数组作为`prev`初始值，再通过`indexOf`判断数组中是否包含`item`，如果没有就将`item`加入数组，最终返回数组

> 关于`&&`运算符，第一条语句为true则执行第二条，否则不执行

`ruduce`的用法远不止这些，有兴趣的可以再了解以下~

---

还有很多内置对象都是高阶函数，这里就不一一说明了，从上面的三个方法中，已经能很直观的感受到了函数接收函数作为参数，再返回值的过程，**逼格很高也很好用**

## 2. AOP 面向切面编程

当我们需要使用一个公共函数，并且需要在这个函数执行前后添加自己的逻辑，通常我们的做法不能是直接修改这个函数，因为它是==公共函数==，这时候我们可以通过AOP的方法利用高阶函数和原型链的特点进行处理

> 把一些与业务无关的功能抽离出来，通过"动态植入"的方法，掺入到业务逻辑模块中。这样做的好处是保证业务逻辑模块的纯净和高内聚，其次可以方便的复用功能模块

- 下面我们要实现在函数==执行前==输出提示信息

```js
function say(who) {
    console.log(who + '：函数执行了');
}
Function.prototype.before = function(callback) {
    return (...args) => {
        callback()
        this(...args)
    }
}
let whoSay = say.before(function() {
    console.log('你要被调用了');
})
whoSay('ljc')
// 你要被调用了
// ljc：函数执行了
```

如果需要实现==后置通知==，只需要将6，7行换以下就可以了

**实现的原理**

在调用公共函数时，传入我们需要执行提前执行的函数，在内部函数执行前先调用该函数

## 3. 偏函数

当一个函数有很多参数时，调用该函数就需要提供多个参数，如果可以减少参数的个数，就能简化该函数的调用,降低调用该函数的难度。

- 实现3个数求和

```js
function sum(a, b, c){
	return a + b + c;
}
sum(1, 2, 3) // 6
```

在调用时我们需要传入3个参数，好像有些许麻烦，下面我们用偏函数的做法

创建一个新的`partial`函数，这个新函数可以**固定住原函数的部分参数**，从而减少调用时的输入的参数，让我们的调用更加简单

```js
function sum(a, b, c) {
    return a + b + c
}

function partial(sum, c) {
    return function (a, b) {
        return sum(a, b, c)
    }
}
let partialSum = partial(sum, 3)// -> 6
```

> 高阶函数除了可以接收函数作为参数外，还可以将函数作为结果返回，偏函数就是固定了函数的一个或多个参数，返回一个新的函数接收剩下的参数，以此来简化函数的调用。

`Function.prototype.bind` 函数就是一个偏函数的典型代表，它接受的第二个参数开始，为预先添加到绑定函数的参数列表中的参数

## 4. 函数柯里化

与偏函数不同，柯里化是把接收多个参数的函数转换成多个只接收一个参数的函数。

我们从一个简单的例子来认识**函数柯里化**

```js
function add(a, b) {
    return a + b;
}
add(1, 2) // 3  普通做法 一次传入两个参数

// 假设有一个 curring 函数可以做到柯里化
function curring(){}
curring(1)(2) // 我们通过这样的方式来接受参数，这样就实现了柯里化
```

接下来我们来看看利用柯里化来实现

```js
function curring(x) {
    return return y => x + y
}
curring(1)(2)  // => 3
```

### 4.1 函数柯里化的作用

要真正理解柯里化还是得看示例

#### 4.1.1 参数复用

我们先看一段短短的代码，这段代码中，实现了输入输出个人信息的功能，通过`myInfo`函数将参数拼接返回，这实际上很简单，但是当用很多很多的用户信息时，需要一直传递着`个人信息`这个参数，这样显然是不合理的

```js
function myInfo(inf, name, age) {
    return `${inf}：${name}${age}`
}
const myInfo1 = myInfo('个人信息', 'ljc', '19')
console.log(myInfo1); // 个人信息：ljc19
```

下面我们通过柯里化技术来解决

```js
function myInfoCurry(inf) {
    return (name, age) => {
        return `${inf}：${name}${age}`
    }
}
let myInfoName = myInfoCurry('个人信息')
const myInfo1 = myInfoName('ljc', '19')
const myInfo2 = myInfoName('ljcc','19')
console.log(myInfo2); // 个人信息：ljcc119
console.log(myInfo1); // 个人信息：ljc19
```

这个就是柯里化技术的作用之一了，参数复用，个人感觉还是很好用的

在上面代码的基础上，我们可以继续扩展我们的信息，就像这样，利用一个函数就可以实现多个功能

```js
let myInfoSex = myInfoCurry('爱好')
const myInfo3 = myInfoSex('看球赛','听歌')
console.log(myInfo3); // 爱好：看球赛听歌
```

#### 4.1.2 提前返回

这个特性是用来对浏览器的监听事件兼容性做一些判断并初始化，解决有些浏览器对`addEventListener`存在的兼容性问题，所以在使用之前做一次判断，之后就可以省略了

```js
const whichEvent = (function () {
    if (window.addEventListener) {
        return function (ele, type, listener, useCapture) {
            ele.addEventListener(type, function (e) {
                listener.call(ele, e)
            }, useCapture)
        }
    } else if (window.attachEvent) {
        return function (ele, type, handler) {
            ele.attachEvent('on' + type, function (e) {
                handler.call(ele, e)
            })
        }
    }
})()
```

由于使用了立即执行函数，即使触发多次事件依旧只会触发一次if条件判断

#### 4.1.3 延迟执行

下面我们通过一道例题来了解

编写一个`add`函数实现下面的功能

> add(1)(2)(3) = 6
>
> add(1, 2, 3)(4) = 10
>
> add(1)(2)(3)(4)(5) = 15

```js
function add(...args) {
    let inner = function () {
        args.push(...arguments);
        inner.toString = function () {
            return args.reduce((prev, cur) => {
                return prev + cur
            })
        }
        return inner
    }
    return inner
}
console.log(add(1)(2)(3)); // f 6
```

这段代码中涵盖的知识面很多，核心的部分在于`inner.toString`这里，利用了当返回一个函数时返回的是它的字符串形式，所以我们可以利用这个特性来自定义我们的返回值

----

以上就是关于高阶函数的全部内容了，这部分的知识有点难，可能理解的不够深入，如果有什么好的方法，可以留言讨论一下

> 参考文献：JavaScript Web前端开发指南
>
> 部分代码实现学习于b站，以及GitHub等平台

