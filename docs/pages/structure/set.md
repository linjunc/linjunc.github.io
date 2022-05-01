---
title: 【化解数据结构】详解集合结构，并实现一个集合
date: 2021-10-31 20:31:31
id: 1635683491
photos: https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84-%E9%9B%86%E5%90%88.png
tags:
  - 数据结构
  - 集合
categories:
  - 化解数据结构
keywords: 数据结构,集合,小丞同学
description: 学习了栈，队列，链表这些线性结构之后，接下来需要学习集合这个数据结构，它在前端世界中起着十分重要的作用
---


> 📢 大家好，我是小丞同学，一名**大二的前端爱好者**
>
> 📢 这篇文章将讲解数据结构中的集合
>
> 📢 非常感谢你的阅读，不对的地方欢迎指正 🙏
>
> 📢 **愿你忠于自己，热爱生活**

## 💡 知识点抢先看
- 什么是集合？
- 集合有哪些方法
- 实现一个集合
- 集合有哪些操作方式
- `LeetCode` 实战

📢 碎碎念

> 在之前的文章中，我们学习了 3 种线性结构，接下来我们需要学习的集合，我更倾向于把它称作是一个容器，它有着十分强大的方法和效率，我们一起来学习吧~

## 一、什么是集合？

集合是由一组无序且唯一（即不能重复）的项组成的，它具有数学中有限集合的性质。

在数学中，集合是一组不同的对象，比如：

的自然数集合：`N = {0, 1, 2, 3, 4, 5, 6, …}` ，集合中的对象采用**花括号**包围

![image-20211031204634522](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20211031204634522.png)

上图就可以表示一个集合，它具有**唯一性和无序性**

接下来我们一起来实现一个集合吧~

## 二、集合有哪些方法？

> 在 `ES6` 中新增了一个 `Set` 类，可以通过它来快速的创建一个集合，在这里我们自己实现一个 `Set` 类

在上面我们说到，我们使用一个对象来创建集合（也可以使用数组）

当然选择对象来创建会更加方便一点，在 JavaScript 的对象中不允许一个键指向两个不同的属性，这保证了集合里的元素都是唯一的

在这里我们需要给集合添加一下这些方法

| 方法            | 含义                     |
| --------------- | ------------------------ |
| `add(value)`    | 向集合中添加一个新的元素 |
| `remove(value)` | 从集合移除一个值         |
| `has(value)`    | 判断集合中是否存在某个值 |
| `clear()`       | 清空集合                 |
| `size()`        | 返回集合中的元素数量     |
| `values()`      | 返回集合中所有值的数组   |

## 三、手写实现一个集合

### 1. 创建一个 Set 类

利用对象来创建一个集合

```js
class Set {
    constructor () {
        this.data = {}
    }
}
```

接下来开始封装方法

### 2. 实现 has 方法

在实现 `add` 方法之前，需要先来实现一个 `has` 方法

```js
has(value) {
    return value in this.data
}
```

这里我们采用 `in` 操作符，判断 `value` 是否存在于 `data` 对象中，如果有就返回 `true` 即可

### 3. 实现 add 方法

由于集合存在唯一性的特点，因此我们需要在添加元素之前，判断当前集合中，是否存在当前元素，如果不存在就添加到集合当中，返回添加成功 `true` ，如果存在则返回 `false` 未添加

```js
add(value) {
    if(!this.has(value)) {
        this.data[value] = value
        return true
    }
    return false
}
```

在这里我们先通过 `has` 方法来判断是否有值，没有的话添加到集合中

### 4.实现 remove 方法

`remove` 方法从集合中移出一个元素，它接受需要移出的元素作为参数

```js
remove (value) {
    if(this.has(value)) {
        delete this.data[value]
        return true
    }
    console.log('未找到需要删除的元素');
    return false
}
```

在这里先通过 `has` 方法来判断是否有这个值，有的话采用 `delete` 删除元素，没有提示未找到

### 5. 实现 clear 方法

`clear` 方法清空整个集合，我们同样可以采用重置对象的方式来实现

```js
clear() {
    this.data = {}
}
```

### 6. 实现 size 方法

实现 `size` 有很多种方法

**第一种**

可以利用 `object` 类的内置方法 `keys` ，它能够返回一个给定对象所有属性的**数组**

因此我们可以采用 `length` 方法来获取它的长度

```js
size() {
    return Object.keys(this.data).length
}
```

**第二种**

我们可以手动提取 `data` 对象上的每个属性，记录属性的个数

```js
size() {
    let count = 0;
    // 遍历对象
    for(let prop in this.data) {
        if(this.data.hasOwnProperty(prop)) {
            ++count
        }
    }
    return count
}
```

在这里我们还需要使用对象的 `hasOwnProperty` 方法来判断，这个属性是不是原型上的方法，因为对象种包含了很多内置的方法，采用 `for-in` 遍历时，会遍历到不是集合中的值

简单一点使用第一种方法即可

### 7. values 方法

我们需要将 `data` 集合，转化成一个数组，我们可以采用之前用到的 `keys` 方法来实现

```js
values() {
    return Object.keys(this.data)
}
```

### 8. 完整 Set 实现

```js
class Set {
    constructor() {
        this.data = {}
    }
    has(value) {
        return value in this.data
    }
    add(value) {
        if (!this.has(value)) {
            this.data[value] = value
            return true
        }
        return false
    }
    remove(value) {
        if (this.has(value)) {
            delete this.data[value]
            return true
        }
        console.log('未找到需要删除的元素');
        return false
    }
    clear() {
        this.data = {}
    }
    size() {
        return Object.keys(this.data).length
    }
    values() {
        return Object.keys(this.data)
    }
}
```

### 9. 如何使用 Set 方法

我们只需要通过 `new` 方法来构造一个实例对象即可操作它

```js
const set = new Set()
```

添加元素

```js
set.add(2)
set.add(3)
```

删除元素

```js
set.remove(3)
set.remove(4) // 未找到需要删除的元素
```

## 四、集合操作方法

在数学中，我们常常做到一些求，交集，求并集，求子集差集的操作，在这里我们也可以实现

| 方法             | 含义 |
| ---------------- | ---- |
| `union()`        | 并集 |
| `intersection()` | 交集 |
| `difference()`   | 差集 |
| `subset()`       | 差集 |

### 1. 实现并集操作

并集是求给定两个集合的一个合集，也就是所有元素组成的新集合

![image-20211031214817139](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20211031214817139.png)

如何实现呢

1. 首先我们需要接收一个传入的集合 `otherSet` ，并创建一个新的集合用来存放最后的数据
2. 通过 `values` 方法展开集合成数组，遍历添加到新的集合中，对传入的数组也是如此
3. 最后返回新集合

> 注意噢，由于我们对 `values` 封装的时候，没有预留参数，因此我们在转化 `otherSet` 的时候需要使用 `otherSet.values`

```js
union(otherSet) {
    const unionSet = new Set()
    // 集合->数组
    const values = this.values()
    const values2 = otherSet.values(otherSet)
    values.map(item => { unionSet.add(item) })
    values2.map(item => { unionSet.add(item) })
    return unionSet
}
```

如何使用呢？

```js
const set = new Set()
const set2 = new Set()
set2.add(3)
set.add(2)
console.log(set.union(set2)); // Set { data: { '2': '2', '3': '3' } }
```

### 2. 实现交集操作

交集操作也就是：返回两个集合中的相同元素组成的新集合

![image-20211031215153583](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20211031215153583.png)

实现思路

1. 新建一个需要返回的集合，同时接收一个集合
2. 同样的转化为数组来进行操作
3. 取一个集合来遍历，拿到的元素在另一个集合中用 `has` 来判断，另一个集合中有没有这个值，有的话说明是公共存在的，添加到新的集合中

> 你知道这样实现的时间复杂度是多少吗？

```js
intersection() {
    const intersectionSet = new Set()
    // 当前集合转化成数组
    const values = this.values()
    for (let i = 0; i < values.length; i++) {
        if (otherSet.has(values[i])) {
            intersectionSet.add(values[i])
        }
    }
    return intersectionSet

```

### 3. 实现差集操作

差集操作就是返回相对不同的部分，A 和 B 的差集就是 A 单独的部分

蓝色这块就是我们要求的

![image-20211031221321784](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20211031221321784.png)

实现思路，和求并集相反即可

```js
difference(otherSet) {
    const differenceSet = new Set()
    const values = this.values
    for (let i = 0; i < values.length; i++) {
        // 判断otherSet中有没有这个元素，没有就是相差的部分
        if (!otherSet.has(values[i])) {
            differenceSet.add(values[i])
        }
    }
    return differenceSet
}
```

### 4. 实现 subset 方法

`subset` 是用来判断它们是不是父子关系，也就是 A 集合是不是包含在 B 集合中

![image-20211031222422835](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20211031222422835.png)

实现思路

- 如果 A 集合大小大于 B 集合，则不可能是子集
- 判断集合 A 中的所有元素是不是在集合 B 中都能找到

```js
subset(otherSet) {
    if (this.size() > otherSet.size()) {
        return false
    }
    // return 中断
    let values = this.values()
    for(let i = 0;i<values.length;i++) {
        if(!otherSet.has(values[i])) {
            return false
        }
    }
    return true
}
```

---

到现在！终于实现完了这些方法，其实思路都差不多，非常感谢能看到这里，谢谢~

## 五、LeetCode 实战

#### [349. 两个数组的交集](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

> 给定两个数组，编写一个函数来计算它们的交集。
>
> 输入：nums1 = [1,2,2,1], nums2 = [2,2]
> 输出：[2]

在 `LeetCode ` 刷题的时候，我们不需要自己实现一个集合，我们可以直接使用现成的 `Set` 类来创建一个集合

AC 优雅代码

```js
var intersection = function (nums1, nums2) {
    // 对 nums1 去重
    const set1 = new Set(nums1)
    const set2 = new Set(nums2)
    return [...new Set([...set1].filter(item => set2.has(item)))]
};
```

可能和前面讲的使用的方法不一样，这是因为数组中有大量的 `API` 供我们使用，应对不同的场景我们需要能够做出选择

## 📖 总结

在这篇文章中我们封装了一个集合，同时实现了很多集合的操作方法。

在 `ES6` 中新增了 `Set` 类，它的底层是通过 `map` 来实现的，`map` 底层利用了哈希表来实现，它极大的优化了我们查值的速度，因此在刷题的时候，可以想想能不能使用 `Set` 来实现。

---

本文关于**集合**的内容就到这里结束了，相信你一定能从中学到很多东西。下一篇文章将带你探索**字典**的奥秘。

欢迎大家关注本专栏，持续关注最新文章~

> 最后，可能在很多地方讲诉的不够清晰，请见谅
>
> 💌 如果文章有什么错误的地方，或者有什么疑问，欢迎留言，也欢迎私信交流

