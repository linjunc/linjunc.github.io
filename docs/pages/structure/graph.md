---
title: 【化解数据结构】详解图结构，并实现一个图结构
date: 2021-11-02 14:06:40
id: 1635833200
photos: https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84-%E5%9B%BE.png
tags:
  - 数据结构
  - 图
categories:
  - 化解数据结构
keywords: 数据结构,图,小丞同学
description: 图结构，你知道是什么吗？在这篇文章我们将详解图结构，通过学习图结构，我们可以解决道路，航班规划等实际问题
---


> 📢 大家好，我是小丞同学，一名**大二的前端爱好者**
>
> 📢 这篇文章将讲解数据结构中的图
>
> 📢 非常感谢你的阅读，不对的地方欢迎指正 🙏
>
> 📢 **愿你忠于自己，热爱生活**

## 💡 知识点抢先看

- 什么是图结构？
- 图结构有什么应用场景？
- 图结构有什么方法？
- 如何实现一个图结构？
- LeetCode 实战

📢 碎碎念

> 太棒了，这篇文章是数据结构部分的最后一篇文章了，敲键盘都累了，呼呼~，图结构是一个我认为非常有意思的结构，它能表示我们生活中很常见的场景，也能解决很多的问题，一起来探寻一下吧

## 一、什么是图结构？

图结构是一种**网络结构**的抽象模型，是一组**由边连接而成的节点**

同时图可以表示任何二元关系，比如道路、航班...

![image-20211102192517588](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211102192517588.png)

那为什么可以表示二元关系呢？

- 因为图中的每一条边都是由两个节点相连而成的，因此图可以表示任何二元关系

在我们生活中，每天使用的微信等社交软件，我们的好友关系网也能被形象成一种图结构，如图，图能表示各种丰富的关系结构

![image-20211102192828986](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211102192828986.png)

在 `JS` 中没有图结构，我们可以用**对象或者数组**来构建一个图结构

如此抽象的图结构，我们该如何来表示它们呢，我们这里会讲到 3 中方法

- 邻接矩阵
- 邻接表
- 关联矩阵

## 二、图的相关术语 

一个图由 `G = (V,E)` 组成，`V` 表示一组顶点， `E` 表示一组边，连接 `V` 中的顶点

就例如，下面这个图结构，`key` 表示顶点，`value` 表示与这个顶点相连的节点

```js
const graph = {
    0: [1, 2],
    1: [2],
    2: [0, 3],
    3: [3]
};
```

| 术语     | 含义                           |
| -------- | ------------------------------ |
| 顶点     | 图的基本单元，也就是图中的节点 |
| 边       | 顶点之间的关联关系，被称为边   |
| 相邻顶点 | 由一条边连接在一起的顶点       |
| 度       | 一个顶点包含的相邻顶点的数量   |

如何来理解这些术语呢？我们来结合图结构解释一下

![image-20211102201009820](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211102201009820.png)

还是这个图，我们对节点 `A` 分析一下

- `A`节点和 `B` 节点相邻，`A` 和 `D` 是相邻的，`A` 和 `C` 是相邻的，`A` 和 `E` 不是相邻的，因此 `A` 节点和 `B,C,D` 是相邻节点
- 图中的每一个节点都能作为顶点存在
- `A` 节点的度，由于 `A` 与其他三个节点相连，因此 `A` 节点的度为 `3` ，图中的 `D` 节点和其他 `4` 个节点相连，因此它的度为 `4`
- 可以看到图中 `CDG` 形成了一个环，因此这个图也称为有环的
- 如果图中每两个顶点间存在路径，则图是连通的

### 有向图

图中节点之间边线是单向的

![image-20211102201858038](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211102201858038.png)

### 无向图

图中节点之间的边线是双向的，或者没有方向，称为无向图

![image-20211102202015298](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211102202015298.png)

## 三、如何表示一个图？

图的表示有很多种方法，不存在绝对的方法，需要根据待解决的问题来确定图的类型

### 1. 邻接矩阵

我们可以采用一个二维数组来确定顶点间的连接关系，如果 `A` 能连接到 `B` 那么我们就置为 `1` ，如果连不到就是 `0`

如图 `A` 连接 `B` 节点，因此 第一行第二列为 `1`，表示 `A` 连接 `B`

![image-20211102203156931](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211102203156931.png)

### 2. 邻接表

采用邻接表来表示一个图更形象更容易理解

它直接就表示哪个顶点和哪个顶点连接，十分清晰

如图 `B` 节点连接 `C,D` 节点，`C`节点连接 `E` 节点，十分的方便，推荐使用

![image-20211102203755850](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211102203755850.png)



## 四、图的操作

接下来的操作基于这个图结构来进行，这是用一个邻接表来表示的一个图结构

```js
const graph = {
    0:[1, 2],
    1:[2],
    2:[0, 3],
    3:[3]
}
```

### 1. 深度优先遍历（DFS）

尽可能深的搜索图的分支，类似于树的前序遍历

- 先访问根节点
- 对根节点的**没访问过的相邻节点**挨个进行深度优先遍历

**代码实现**

```js
// 记录访问过的节点
const visited = new Set()
// 深度优先遍历
const dfs = (n) => {
    console.log(n);
    visited.add(n)
    // 获取所有相邻节点
    graph[n].forEach(c => {
        // 如果没有访问过
        if (!visited.has(c)) {
            dfs(c)
        }
    })
}
// 根节点
dfs(2) 
```

输出结果 ：`2 0 1 3`

![图-1-动图](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/%E5%9B%BE-1-%E5%8A%A8%E5%9B%BE.gif)

### 2. 广度优先遍历（BFS）

先访问离根节点**最近**的节点，类似于树的层序遍历

遍历的方法

1. 新建一个队列，把根节点入队并访问
2. 把对头没有访问过的相邻节点入队
3. 重复，直至队列为空

代码实现

```js
// 广度优先遍历
const bfs = (n) => {
    const visited = new Set();
    visited.add(n);
    const q = [n];
    while (q.length) {
        const n = q.shift();
        console.log(n);
        graph[n].forEach(c => {
            if (!visited.has(c)) {
                q.push(c)
                visited.add(c);
            }
        });
    }
}
```

输出结果：`2 0 3 1`

![图-广度-动图](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/%E5%9B%BE-%E5%B9%BF%E5%BA%A6-%E5%8A%A8%E5%9B%BE.gif)

还有很多类似于最短路径、拓扑排序、关键路径等问题，难度有点大，就不讨论了有兴趣的自己去研究吧~

## 五、图结构有哪些方法？

根据上面的介绍，我们对图结构有了一定的了解，接下来我们封装一个图结构，首先，先了解图结构有哪些方法

| 方法               | 含义                   |
| ------------------ | ---------------------- |
| `addVertex(value)` | 向图中添加一个顶点     |
| `addEdge(a,b)`     | 向图中添加两点之间的边 |
| `getVertices()`    | 返回图的顶点列表       |
| `toString()`       | 以字符串的形式输出     |

## 六、手写实现无向图结构

### 1. 创建 Graph 类

首先我们需要创建一个 `Graph` 构造函数，用来存放图中的属性和方法

在这里我们添加了两个属性，一个 `vertices` 用来保存顶点， `edgs` 表示邻接表

```js
class Graph {
    constructor() {
        this.vertices = [] // 保存顶点
        this.edges = [] // 保存边，相当于邻接表
    }
}
```

### 2. 实现 addVertex 方法

添加这个顶点，我们先判断一下图中有没有这个顶点，有的话我们就不添加了，没有的话，添加到顶点列表中，同时添加到邻接表中来建立边关系

```js
addVertex(value) {
    // 如果没有这个顶点
    if(!this.vertices.includes(value)){
        this.vertices.push(value) // 添加到顶点列表中
        this.edges[value] = []    // 添加到邻接表中
    }
}
```

### 3. 实现 addEdge 方法

我们通过这个方法来建立边连接的关系，接收两个参数，表示需要进行连接的两个节点，当这两个节点都存在，并且没有进行连接时，我们再进行邻接表的修改操作，具体实现就是，将 `a` 放到 `b` 的连接数组中，`b` 放到 `a` 的连接数组中

```js
addEdge(a,b) {
    if(this.vertices.includes(a) && this.vertices.includes(b)) {
        if(!this.edges[a].includes(b)) {
            this.edges[a].push(b)
            this.edges[b].push(a)
        }
    }
}
```

### 4. 实现 getVertices 方法

只需要返回我们的顶点数组即可

```js
getVertices() {
    return this.vertices
}
```

### 5. 实现 toString 方法

实现这个方法的关键在于，理清每一个层级之间的关系

>  采用数组来实现邻接表，会造成遍历是时间复杂度变高，个人认为后期可以采用 `map` 或者 `set` 类进行实现

实现思路

- 先遍历顶点列表
- 在邻接表中找到顶点列表对应的对象
- 拼接字符串，实现输出

```js
toString() {
    let s = "";
    // 遍历图的顶点列表
    for (let i = 0; i < this.vertices.length; i++) {
        // 采用模板字符串进行拼接
        s += `${this.vertices[i]} -> `;
        // 获取顶点对应的邻接表数组
        const neighbors = this.edges[this.vertices[i]]
        //遍历该邻接表数组，解构数组成字符串
        for (let j = 0; j < neighbors.length; j++) {
            s += `${neighbors[j]} `;
        }
        // 每一个顶点单独成行
        s += "\n";
    }
    return s;
}
```

这样一个简单的图结构，我们就实现了

### 6. 演示

基于上面的代码我们进行操作演示

```js
const graph = new Graph()
graph.addVertex(2)
graph.addVertex(1)
graph.addVertex(3)
graph.addVertex(0)
graph.addEdge(0,1)
graph.addEdge(0,2)
graph.addEdge(1,2)
graph.addEdge(2,3)
console.log(graph.toString());
```

输出结果战术

![image-20211102214518613](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgs/image-20211102214518613.png)

符合我们的预期，完成封装

## 七、LeetCode 实战

推荐几道 `LeetCode` 中关于图结构的题目

#### [65. 有效数字](https://leetcode-cn.com/problems/valid-number/)

#### [417. 太平洋大西洋水流问题](https://leetcode-cn.com/problems/pacific-atlantic-water-flow/)

#### [133. 克隆图](https://leetcode-cn.com/problems/clone-graph/)

#### [207. 课程表](https://leetcode-cn.com/problems/course-schedule/)

#### [997. 找到小镇的法官](https://leetcode-cn.com/problems/find-the-town-judge/)

## 📖 总结

在这篇文章中我们详细讲解了图结构，如何表示一个图结构，如何手写一个图结构，博主在自己写博客的时候，也能学到很多东西，从理解到实现，都需要站在另一个角度去思考，如何能清晰的将内容输出，也希望各位读者能从这个系列的文章中真正的学习到一些东西~

本文关于**图**的内容就到这里结束了，相信你一定能从中学到很多东西。接下来我们将开启算法之路，可能这段时间还不会更新这部分的内容，还请耐心等待

欢迎大家关注本专栏，持续关注最新文章~

## 🐣 彩蛋

数据结构和算法之路还没有结束，这篇文章的结束，也只是基础数据结构告一段落了，在数据结构当中，还有相对多的高级内容没有涉及，例如哈希表的实现、单调栈、红黑树、AVL 树等等等...这些内容都需要我们在未来的日子中不断学习，不断积累，才能有更多的收获，在未来的日子里，希望和大家一起学习，交流，共同进步~

在这里非常感谢大家近几天来的阅读和交流

同时也非常感谢[周一姐姐](https://juejin.cn/user/3131845139247960)对我的帮助和鼓励，很庆幸能在前端路上遇见 🌹

> 最后，可能在很多地方讲诉的不够清晰，请见谅
>
> 💌 如果文章有什么错误的地方，或者有什么疑问，欢迎留言，也欢迎私信交流
