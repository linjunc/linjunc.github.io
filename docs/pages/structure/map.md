---
title: 【化解数据结构】详解字典结构，并实现一个字典
date: 2021-10-31 22:51:27
id: 1635691887
photos: https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84-%E5%AD%97%E5%85%B8.png
tags:
  - 数据结构
  - 字典
categories:
  - 化解数据结构
keywords: 数据结构,字典,小丞同学
description: 来，给你一本字典，帮我查个单词。字典在前端的应用可谓十分的广泛，它独特的数据结构，造就了它一身的本领，一起来看看吧~
---

> 📢 大家好，我是小丞同学，一名**大二的前端爱好者**
>
> 📢 这篇文章将讲解数据结构中的字典
>
> 📢 非常感谢你的阅读，不对的地方欢迎指正 🙏
>
> 📢 **愿你忠于自己，热爱生活**

## 💡 知识点抢先看

- 什么是字典？
- 字典有哪些方法？
- 手写实现一个字典
- `LeetCode` 实战

📢 碎碎念

> 在学完集合后是不是觉得数据结构不过如此，轻松拿捏呢？当然这一篇你依然可以轻松拿捏，但是接下来的哈希表、树、图、堆都是很难的内容，因此要认真看噢~

## 一、什么是字典？

在前面我们学习了集合，它是一种可以存储唯一无序值的数据结构。

字典也有这样的特性，它和集合不同，它是以一个 `key->value` 形式来存储的，而集合是以 `value->value` 来存储的，这也让它有了更丰富的功能

如何描述字典结构呢？

真的可以把它想象成一本字典，一个英文对应着一个中文，因此字典也被称为映射

> 和 `Set` 一样，在 `ES6` 中新增了 `Map` 类来作为字典这种数据结构

![字典-简介](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E5%AD%97%E5%85%B8-%E7%AE%80%E4%BB%8B.png)

## 二、字典有哪些方法呢？

对于字典来说，它有着和 `Set` 几乎相同的方法，但是它们的值类型可完全不一样噢~

| 方法             | 含义                             |
| ---------------- | -------------------------------- |
| `set(key,value)` | 向字典种添加新的元素             |
| `delete(key)`    | 根据键值来从字典种删除对应的数据 |
| `has(key)`       | 判断某个键值是否在字典种存在     |
| `get(key)`       | 获取某个键值对应的数据           |
| `clear()`        | 清空字典全部元素                 |
| `keys()`         | 以数组形式返回全部键名           |
| `values()`       | 以数组形式返回全部键值           |

接下来我们看看如何实现吧

## 三、手写实现一个字典

### 1. 创建一个 Map 类

在这里我们采用对象来作为 `Map` 的数据容器

```js
class Map{
    constructor() {
        this.data = {}
    }
}
```

### 2. 实现一个 has 方法

在实现其他方法之前，我们需要先实现 `has` 方法，因为后面很多都要采用 `has` 来判断

```js
has(key) {
    return key in this.data
}
```

### 3. 实现一个 set 方法

`set` 方法用来添加一个元素，添加的元素的格式是 `key->value` ，我们需要接收 `key,value` ，并在对象中添加这个元素

```js
set(key, value) {
    this.data[key] = value
}
```

注意：在对象中添加属性的方法，可以采用 `[]` 来实现，这个一定要知道噢

### 4. 实现一个 remove 方法

`remove` 方法，根据 `key` 来删除指定元素

在删除之前，我们需要判断一下当前字典中，是否含有这个 `key` ，再进行删除操作

```js
remove(key) {
    if (this.has(key)) {
        delete this.data[key]
        return true
    }
    console.log('未找到');
    return false
}
```

在这里，我们利用 `has` 来判断，当前字典中是不是有这个 `key`

### 5. 实现一个 get 方法

`get` 方法获取 `key` 对应的 `value` 值，在这里我们需要接收一个  `key` 作为参数，通过判断字典中是否含有这个值，再进行取值操作

```js
get(key) {
    return this.has(key) ? item[key] : undefined
}
```

### 6. 实现一个 clear 方法

`clear` 方法重置一个字典，只需要重新赋值即可

```js
clear() {
    this.data = {}
}
```

### 7. 实现一个 keys 方法

`keys` 方法，以数组的形式返回键值，这里我们可以采用 `Object.keys` 来转化对象，得到一个以 `keys` 组成的数组

```js
keys() {
    return Object.keys(this.data)
}
```

### 8. 实现一个 values 方法

`values` 方法，以数组的形式返回 `values` 方法，这里我们可以遍历整个字典，在采用取值的方法来加入到数组当中

- 先遍历这个字典
- 判断有没有这个 `keys` ，这是为了排除内置属性的干扰
- 然后加入到数组当中，返回即可

```js
values() {
    const values = []
    for (let k in this.data) {
        if (this.has(k)) {
            values.push(this.data[k])
        }
    }
    return values
}
```

### 9. 完整 Map 实现

```js
class Map {
    constructor() {
        this.data = {}
    }
    has(key) {
        return key in this.data
    }
    set(key, value) {
        this.data[key] = value
    }
    remove(key) {
        if (this.has(key)) {
            delete this.data[key]
            return true
        }
        console.log('未找到');
        return false
    }
    get(key) {
        return this.has(key) ? item[key] : undefined
    }
    values() {
        const values = []
        for (let k in this.data) {
            if (this.has(k)) {
                values.push(this.data[k])
            }
        }
        return values
    }
    clear() {
        this.data = {}
    }
    keys() {
        return Object.keys(this.data)
    }
}
```

## 四、LeetCode 实战

### [1. 两数之和](https://leetcode-cn.com/problems/two-sum/)

> 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
>
> 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
>
> 你可以按任意顺序返回答案。
>
> 输入：nums = [2,7,11,15], target = 9
> 输出：[0,1]
> 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

这一题，我们就可以采用字典来实现

相比于采用数组的 `indexOf` 方法来判断是否有值，采用 `map` 来实现的效率更高

`indexOf` 的底层会遍历整个数组，它的时间复杂度是 `O(n)` 

而 `map` 的时间复杂度是 `O(1)`

在这道题中，它的算法时间复杂度就晋升到了 `O(n^2)` 比 `O(n)`

**解题思路**

1. 首先我们需要将 `nums` 数组中取一个值出来（遍历）
2. 然后用目标值 - 这个值，来判断得到的这个值是否存在于当前数组中
3. 如果不存在，则将取出来的这个值加入到 `map` 中，接下来我们循环即可

```js
var twoSum = function (nums, target) {
    const map = new Map()
    for (let i = 0; i < nums.length; i++) {
        const n = nums[i]
        const n2 = target - n
        if (map.has(n2)) {
            return [map.get(n2), i]
        } else {
            map.set(n, i)
        }
    }
};
```

这几道关于字典的题目也可以尝试一下

### [20. 有效的括号](https://link.juejin.cn/?target=https%3A%2F%2Fleetcode-cn.com%2Fproblems%2Fvalid-parentheses%2F)

### [76. 最小覆盖子串](https://link.juejin.cn/?target=https%3A%2F%2Fleetcode-cn.com%2Fproblems%2Fminimum-window-substring%2F)

### [3. 无重复字符的最长子串](https://link.juejin.cn/?target=https%3A%2F%2Fleetcode-cn.com%2Fproblems%2Flongest-substring-without-repeating-characters%2F)

## 📖 总结

在这篇文章中我们封装了一个字典，对字典的相关方法有了一定的了解

在 `ES6` 中新增了 `Map` 类，`map` 底层利用了哈希表来实现，它极大的优化了我们查值的速度，

---

本文关于**字典**的内容就到这里结束了，相信你一定能从中学到很多东西。下一篇文章将带你探索**树**的奥秘。

欢迎大家关注本专栏，持续关注最新文章~

> 最后，可能在很多地方讲诉的不够清晰，请见谅
>
> 💌 如果文章有什么错误的地方，或者有什么疑问，欢迎留言，也欢迎私信交流

