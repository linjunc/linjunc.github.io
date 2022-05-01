---
title: 【化解数据结构】详解队列，优先队列，循环队列，并实现一个队列
date: 2021-10-30 01:49:44
photos: https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84-%E9%98%9F%E5%88%97.png
id: 1635529784
tags:
  - 数据结构
  - 队列
categories:
  - 化解数据结构
keywords: 数据结构,队列,小丞同学
description: 经常排队吗？了解队列这个数据结构吗？这篇文章囊括了队列相关的大部分内容，对于学习队列数据结构一定会有很大提升！
---


> 📢 大家好，我是小丞同学，一名**大二的前端爱好者**
>
> 📢 这篇文章将讲解数据结构中的队列
>
> 📢 非常感谢你的阅读，不对的地方欢迎指正 🙏
>
> 📢 **愿你忠于自己，热爱生活**

## 💡 知识点抢先看

- 什么是队列？
- 队列有哪些方法？
- 手写实现一个队列
- 优先队列，循环队列
- `LeetCode` 实战

📢 碎碎念

> 在上一篇文章中，我们讲了**栈数据结构**，它是一个线性结构，具有后进先出的特点。
>
> 在这一篇文章中，我们将讲**队列数据结构**，同样的它也是一个线性结构，但是它和栈有很大的不同

## 一、什么是队列？

和栈非常的相似，但是队列遵循的规则和栈不同

队列遵循先进先出的规则，也就是在尾部添加元素，从头部移除元素，最新添加的元素排在末尾

我们可以很形象的讲队列结构描绘成一个队伍

如下图，有很多人来买薯条，新来的人永远排在队伍的最后一位，买好的从队伍的最前面走掉

![数据结构-队列-介绍](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84-%E9%98%9F%E5%88%97-%E4%BB%8B%E7%BB%8D.png)

在生活中，几乎所有和排队有关的例子都可以用来描述一个队列

在上述的例子中，

我们把队伍的**第一个元素称为对头**，**新增元素**的操作叫做**入队**，买完薯条**移除元素**的操作叫做**出队**

在前端世界中，也有着很多关于队列的应用，例如

- 和事件处理机制有关的任务队列

JavaScript 在执行是会维护一个微任务队列，遇到微任务会将其加入任务队列当中，执行完宏任务后，会到任务队列中取微任务来执行。具体关于执行机制、事件循环的内容，可以看之前的文章：[JavaScript 运行机制解析](https://juejin.cn/post/6999514306345697294)

## 二、队列有哪些方法？

和栈结构一样，队列也有着丰富的方法，比如入队、出队、查询等...

在这里我们主要介绍以下这些

| 方法               | 含义                                               |
| ------------------ | -------------------------------------------------- |
| `enqueue(element)` | 在队列尾部添加一个新的元素                         |
| `dequeue()`        | 移除队列的第一项，并返回                           |
| `front()`          | 返回队列中第一个元素                               |
| `isEmpty()`        | 如果队列不包含任何元素，返回 `true` 否则为 `false` |
| `size()`           | 返回队列中的元素个数                               |
| `clear()`          | 清空队列                                           |
| `print()`          | 打印所有元素                                       |

## 三、手写实现一个队列

了解了队列有哪些方法，可以来实现一个简单的队列结构

和栈这种线性结构一样，我们可以使用数组来实现一个队列

数组的**一个元素看作是队头**

数组的**最后一位看作是队尾**

### 1. 创建一个 Queue 类

首先创建一个 `queue` 类，用 `queueData` 变量来保存数据

```js
class Queue {
    constructor() {
        this.queueData = []
    }
}
```

### 2. 实现 enqueue 方法

`enqueue` 方法是在数组中新增元素，根据队列的规则应该加在队尾，因此我们可以利用数组的 `push` 方法来实现

```js
enqueue(element) {
    this.queueData.push(element)
}
```

### 3. 实现 dequeue 方法

`dequeue` 方法是移除数组的第一位元素，也就是移除对头，可以利用数组的 `shift` 方法来实现，取出数组的第一个元素，并返回

```js
dequeue() {
    return this.queueData.shift()
}
```

我们来看看如何使用 `enqueue` 和 `dequeue` 方法

```js
const queue = new Queue()
queue.enqueue(2) // 入
queue.enqueue(1) // 入
queue.enqueue(5) // 入
queue.dequeue()  // 出
queue.dequeue()  // c
```

实现动图

![队列-push-动图](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E9%98%9F%E5%88%97-push-%E5%8A%A8%E5%9B%BE.gif)

### 4. 实现 front 方法

`front` 方法是返回数组的一位元素，也就是返回对头的值，可以直接利用 `[0]` 来获取

```js
front() {
    return this.queueData[0]
}
```

### 5. 实现 isEmpty 方法

`isEmpty` 方法是用来判断队列是否为空，为空的话返回 `true` ，不为空返回 `false` 

这里可以采用数组的 `length` 来判断是否为空 

```js
isEmpty() {
    return !this.queueData.length
}
```

### 6. 实现 size 方法

`size` 方法可以返回队列的长度，可以用数组的 `length` 方法来代替

```js
size() {
    return this.queueData.length
}
```

### 7. 实现 clear 方法

`clear` 方法可以清空整个队列，可以采用重置数组的方法来实现

```js
clear() {
    this.queueData = []
}
```

### 8. 实现 print 方法

`print` 方法打印队列中的所有元素，我们可以采用 `toString()` 方法来实现

```js
print() {
    return this.queueData.toString()
}
```

### 9. 完整的 Queue 类

```js
class Queue {
    constructor() {
        this.queueData = []
    }
    enqueue(element) {
        this.queueData.push(element)
    }
    dequeue() {
        return this.queueData.shift()
    }
    front() {
        return this.queueData[0]
    }
    isEmpty() {
        return !this.queueData.length
    }
    size() {
        return this.queueData.length
    }
    clear() {
        this.queueData = []
    }
    print() {
    	return this.queueData.toString()
	}
}
```

到这里，我们已经实现了一个完整的队列结构，很轻易就能实现

在队列结构中，常常被提起的还有一个**优先队列**，我们再来简单的介绍一下

## 四、优先队列

### 1. 什么是优先队列？

优先队列是一种元素有优先级的队列，它的元素添加和移除都是基于优先级的，优先级高的先入队，优先级低的后入队。

在现实生活中大多数情况下都是优先队列，例如：

在医院的急诊室，医生会优先处理病情严重的患者，再处理相较弱的患者

> 在我们学习的时候，也应当为事情添加优先级噢

### 2. 实现 enqueue 方法

对于一个优先队列，它和普通队列最大的区别就在于它添加元素的方法

- 首先每一个元素都会有一个优先级
- 根据优先级值的大小来插入元素

对于一个最小优先队列而言，它是根据优先级值从小到大排列的

> tips: 优先级值越小，优先级越高噢

因此我们需要改造一下 `enqueue` 添加元素的代码

首先我们需要**创建一个优先节点类**

因为，队列中的元素有值和优先级两个属性，因此用类来实现

```js
class QueueElement {
    constructor(element, priority) {
        this.element = element
        this.priority = priority
    }
}
```

在创建元素的时候，我们只需要 `new` 一下就能创建一个有值和优先级的节点

接下来实现一个 `enqueue` 方法

- 当队列空时，直接推入队列中
- 不空时，我们遍历这个队列，比较它的优先级。优先级值比它高的地方插入
- 采用 `splice` 方法插入，（`splice`：在某个位置删除多少个元素，插入什么元素）
- 当插入的元素的优先级值最大时，直接推入

```js
enqueue(element, priority) {
    let queueElement = new QueueElement(element, priority)
    // 如果队列为空直接push
    if (this.isEmpty()) {
        this.data.push(queueElement)
    } else {
        // flag 记录是否成功插入
        let flag = false
        for (let i = 0; i < this.data.length; i++) {
            if (queueElement.priority < data[i].priority) {
                // 在指定位置插入
                this.data.splice(i, 0, queueElement)
                // 标记重置
                flag = true
                // 提前结束循环
                break;
            }
        }
        if(!flag) this.data.push(queueElement)
    }
}
```

这样一个优先队列就实现了，其他方法和普通队列一致

## 五、循环队列

另一个修改版的队列：循环队列。循环队列就是一圈一圈的，首尾相连的

它和普通队列的区别就是循环队列头尾相连

我们通过一个经典的击鼓传花游戏来介绍

> 📢 **游戏规则：**
>
> 在这个游戏中，孩子们围成一个圆圈，把花尽快地传递给旁边的人。某一时刻传花停止，
> 这个时候花在谁手里，谁就退出圆圈结束游戏。重复这个过程，直到只剩一个孩子（胜者）。  

![循环队列](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E5%BE%AA%E7%8E%AF%E9%98%9F%E5%88%97.png)

类似于上图，输入的数字是 7 ，第一轮 `c` 淘汰，花传给它的下一位，从这里重新开始计数

代码实现

```js
function hotPotato(nameList, num) {
    const queue = new Queue()
    // 添加游戏玩家
    for (let i = 0; i < nameList.length; i++) {
        queue.enqueue(nameList[i])
    }
    let dead = ''
    // 实现循环
    while (queue.size() > 1) {
        // 队列重排
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue())
        }
        // 输出淘汰者信息
        dead = queue.dequeue()
        console.log(dead + '淘汰');
    }
    // 最终返回最后一个胜利者
    return queue.dequeue()
}
let names = ['a', 'b', 'c', 'e', 'f']
let winner = hotPotato(names, 7)
```

这样一个击鼓传花的游戏就设计好了，你知道最终的赢家是谁吗？

## 六、LeetCode 实战

#### [933. 最近的请求次数](https://leetcode-cn.com/problems/number-of-recent-calls/)

> 写一个 `RecentCounter` 类来计算特定时间范围内最近的请求。
>
> 请你实现 `RecentCounter` 类：
>
> - `RecentCounter()` 初始化计数器，请求数为 0 。
> - `int ping(int t)` 在时间 t 添加一个新请求，其中 t 表示以毫秒为单位的某个时间，并返回过去 3000 毫秒内发生的所有请求数（包括新请求）。确切地说，返回在 [t-3000, t] 内发生的请求数。
>   保证 每次对 ping 的调用都使用比之前更大的 t 值。

**解题思路**

- 将每次输入的时间 `t` 加入到队列当中
- 从队列的首位元素开始，踢出不在 3000 范围内的元素
- 因为 `t` 表示的是时刻

AC 代码

```js
var RecentCounter = function () {
    this.q = []
};
RecentCounter.prototype.ping = function (t) {
    this.q.push(t)
    // 判断对头，踢出所有不在 3000 内的元素
    while (this.q[0] < t - 3000) {
        this.q.shift()
    }
    return this.q.length
};
```

## 📖 总结

在这篇文章中，我们从实现一个普通队列开始，将来优先队列，循环队列，最后 AC 了一道算法题，还是很有收益的~大概需要掌握以下内容

- 实现一个普通队列
- 了解如何封装优先队列的添加方法
- 掌握循环队列的奥秘

---

本文关于**队列**的内容就到这里结束了，相信你一定能从中学到很多东西。下一篇文章将带你探索**集合**的奥秘。

（链表在很久之前已经发布过了，为了不触犯平台规则还是不重新发了，[【化解数据结构】一文带你搞懂前端必备数据结构 -- 链表](https://juejin.cn/post/6972882923468881950)）

欢迎大家关注本专栏，持续关注最新文章~

> 最后，可能在很多地方讲诉的不够清晰，请见谅
>
> 💌 如果文章有什么错误的地方，或者有什么疑问，欢迎留言，也欢迎私信交流

