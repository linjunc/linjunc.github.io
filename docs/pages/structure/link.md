---
title: 【化解数据结构】详解链表结构，并实现一个链表
date: 2021-5-28 1:55:43
id: 1635663343
photos: https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84-%E9%93%BE%E8%A1%A8.png
tags:
  - 数据结构
  - 链表
categories:
  - 化解数据结构
keywords: 数据结构和算法,链表,小丞同学
description: 嘟嘟嘟~~发车啦，快来和博主一起飙车啦！😊文末附上力扣相关题目。关于链表的全部讲解，图文解析超级详细！
---

嘟嘟嘟~~发车啦，快来和博主一起飙车啦！😊文末附上力扣相关题目

![火车](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E7%81%AB%E8%BD%A6.jpg)

> 不止图文解释，注释也很清晰噢！:thumbsup:




## 1. 什么是链表

链表是一组由节点组成的集合，每个节点都有**一个指针指向它的下一个节点**。举个栗子来说，就像上图的小火车一样，每一节车厢之间都通过绳索相连接，每节车厢都是一个节点，车厢间的连接就是指针:heart:

![链表2](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E9%93%BE%E8%A1%A82.png)

> 那了解了什么是链表之后，很多小伙伴就会想，这和数组**有什么区别**呢？数组操作不是更方便吗？

数组的大小是固定的，从数组的起点或中间插入或移除项的操作成本很高，因为需要移动元素（尽管我们已经学过很多的`API`，但背后的情况同样是这样）

### 1.1 链表的优点

相对于传统的数组，链表的一个好处在于，添加或移除元素的时候==不需要移动其他元素==。这样添加、移除操作的==时间复杂度==就为`O(1)`。下图就是一个单向链表插入节点的示意图，我们只需要改变前一个节点的`next`指针并且修改新节点的`next`指针是链表连接起来即可完成

![链表1](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E9%93%BE%E8%A1%A81.png)

### 1.2 链表的缺点

相对于数组而言，数组在访问一个元素的时候，可以直接通过索引来直接访问，而对于链表而言访问其中的一个元素，需要从起点开始迭代整个链表直到找到所需的元素。因此访问的时间复杂度落在`O(1)-O(n)`之间

### 1.3 单向链表与数组各个操作时间复杂度对比

| 链表操作      | 最大时间复杂度 | 数组操作      | 最大时间复杂度 |
|-------------|----------------|-------------|----------------|
| search（访问）  | `O(n)`         | search（访问）  | `O(1)`         |
| insert（插入）  | `O(1)`         | insert（插入）  | `O(n)`         |
| remove（删除）  | `O(1)`         | remove（删除）  | `O(n)`         |
| append （添加） | `O(1)`         | append （添加） | `O(1)`         |

### 1.4 链表的分类

有三种：单向链表、双向链表、循环链表

#### 1.4.1 单向链表

![链表2](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E9%93%BE%E8%A1%A82.png)

#### 1.4.2 双向链表

![双向链表1](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A81-1622280757149.png)

#### 1.4.3 循环链表

![循环链表单向](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E5%BE%AA%E7%8E%AF%E9%93%BE%E8%A1%A8%E5%8D%95%E5%90%91-1622280742671.png)

## 2. 使用JS实现链表

了解了什么是链表，接下来我们使用js来实现链表的相关操作

### 2.1 单向链表

#### 2.1.1 创建一个单向链表

以下是一个`LinkedList`的基本骨架

```js

class LinkedList {
    constructor() {
        // 链表的长度size
        this.size = 0;
        this.head = null;
    }
    //添加链表项
    append(element) { }
    //插入链表项
    appendAt(position, element) { }
    // 删除指定列表项
    remove(element) { }
    //删除指定位置链表项
    removeAt(position) { }
    // 查找指定元素索引
    indexOf(element) { }
    // 翻转链表
    reserve() { }
    // 获取节点
    getNode(index) {}
}
//测试
let l1 = new LinkedList();
```

链表数据结构还需要一个`Node`辅助类。`Node`类表示要加入列表的项。它包含一个`element`属性，即要添加到列表的值，以及一个`next`属性，即指向列表中下一个节点
项的指针。

```js
// node类
class Node {
    constructor(element) {
        this.element = element;
        // 添加一个指针
        this.next = null
    }
}
```

另一个重要的点是，我们还需要**存储第一个节点的引用**。为此，可以把这个引用存储在一个称为`head`的变量当中，接下来我们就要来实现`LinkedList`类中为填写的方法。

- `append(element)` ：向链表尾部添加一个新的项
- `appendAt(position, element)` ： 向链表的特定位置插入一个新的项
- `remove(element)`：从列表中移除一项
- `removeAt(position)`：从列表的特定位置移除一项
- `getNode(index)`：获取某个位置的节点
- `reserve()`：反转链表

#### 2.1.2 获取链表中的节点

> 先写这个是因为后面的很多方法中都有使用到这个函数！其实也可以不用单独封装成一个函数，存粹个人习惯

传入一个需要查找的节点位置，通过`for`循环，不断地让`current`指向下一位，直至到达`index`的位置，跳出`for`循环，返回当前`current`节点:orange:

![链表迭代](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E9%93%BE%E8%A1%A8%E8%BF%AD%E4%BB%A3.png)

```js
getNode(index) {
    // 边界判断 传入的参数是否在链表的长度范围之内
    if (index < 0 || index >= this.size) {
        throw new Error('out')
    }
    let current = this.head;
    // 不断的让current移到下一位，直到到达index - 1位置
    // 也就是循环遍历的过程
    for (let i = 0; i < index; i++) {
        current = current.next;
    }
    // 最后返回节点
    return current
}
```

#### 2.1.3 向链表尾部追加元素

有两种场景：

1. 列表**为空**，添加的是第一个元素
2. 列表**不为空**，向其追加元素

下面是我们实现的`append`方法，通过上一部分的`getNode`方法，获取到链表的最后一个节点，让最后一个节点的`next`指针**指向新创建的节点**`node`，使得链表串联起来，最后让链表长度`size`自加，即可实现 :shamrock:

```js
append(element) {
    // 通过实例化添加属性
    let node = new Node(element);
    // 添加操作
    if (this.head === null) {
        this.head = node;
    } else {
        let current = this.getNode(this.size - 1);
        // 最后一个节点的next指向新创建的节点
        current.next = node
    }
    //添加链表项后，size自增
    this.size++;
}
```

**注意**：这里的节点创建是通过`new`操作符实现的，构造出来的`node`是一个对象，带有了自身的值`element`和`next`指针，新创建的节点`next`指针默认指向`null`

#### 2.1.4 向链表的任意位置插入一个元素

因为是通过位置来插入元素，所以首先要判断该位置是否越界。如果越界了，可以直接抛出错误。同样的有2种场景：

**第一种场景**：需要在列表的起点添加一个元素，也就是第一个位置，让新创建的节点`next`指针指向头节点，也就是`this.head`，再将新创建的节点设为头节点:tada:

![appendAt](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/appendAt.png)

**第二种场景**：非起点插入。首先需要找到插入位置的前一个节点`pre`，让新创建的节点指向`pre`的下一个节点`pre.next`，再让`pre`节点的`next`指针指向新创建的节点:apple:

![appendAt2](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/appendAt2.png)

```js
//插入链表项
appendAt(position, element) {
    // 边界判断
    if (position < 0 || position > this.size) {
        throw new Error('position out range')
    }
    // 实例化创建节点
    let node = new Node(element);
    //起点插入
    if (position === 0) {
        node.next = this.head;
        this.head = node;
    } else {
        // 找到需要插入位置的前一个节点
        let pre = this.getNode(position - 1);
        // 让新创建的节点指向当前前一个节点的下一个节点
        node.next = pre.next;
        // 让前一个节点指向新创建的节点
        pre.next = node;
    }
}
```

#### 2.1.5 从链表中移除元素（根据特定位置移除）

移除元素也有两种场景：第一种是移除第一个元素，第二种是移除第一个以外的任一元素。同样的我们需要先进行边界判断，在链表长度外的抛出错误即可。:banana:

第一种场景非常简单，由于移除的是第一个节点，只需要让head指向列表的第二个元素

![removeAt](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/removeAt.png)

现在，假设我们要移除列表的最后一项或者中间某一项。首先我们需要获取到被删除节点的前一个节点，让该节点的`next`指针指向被删除节点的下一个节点。这样，被遗弃的元素就会被丢弃在计算机内存中，等着被垃圾回收器清除。:pear:

![removeAt2](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/removeAt2.png)

```js
//删除指定位置链表项
removeAt(position) {
    // 边界判断，超出链表长度，抛出错误
    if (position < 0 || position >= this.size) {
        throw new Error('position out range')
    }
    let current = this.head
    if (position === 0) {
        // 如果删除的是第一个节点，则让head指向下一位即可
        this.head = current.next;
    } else {
        // 获取删除位置的前一个节点
        let pre = this.getNode(position - 1); 
        // current为被删除节点
        current = pre.next;
        // 让前一个节点指向删除节点的下一个节点
        pre.next = current.next;
    }
    // 长度自减
    this.size--;
}
```

#### 2.1.6 查找元素在链表的位置

我们需要一个变量来帮助我们循环访问列表，也就是代码中的`current`，它的初始值是`head`。通过`for`循环来遍历链表，判断当前位置的值是否等于查找值，如果是，就返回它的位置；如果不是，就继续向下访问。如果`for`循环结束还未弹出，说明到达了链表的尾部，也就是说链表中不存在该元素，返回`-1`。:heart_decoration:

```js
// 查找指定元素索引
indexOf(element) {
    // 当前链表头节点
    let current = this.head; 
    // 遍历整个链表
    for (let i = 0; i < this.size; i++) {
        if (current.element === element) {
            return i
        }
        // 依次向下移动
        current = current.next; 
    }
    return -1;
}
```

#### 2.1.7 根据元素值移除元素

现在有了`indexOf`方法，我们可以传入元素的值，找到它的位置，然后调用`removeAt`方法并传入找到的位置，就能实现移除元素:deciduous_tree:

```js
remove(element) {
    // 获取需要删除元素在链表的位置
    let index = this.indexOf(element)
    if(index!= -1 ) {
        // 通过下面的removeAt方法删除指定位置节点
        this.removeAt(index)
    }else {
        // 删除不存在的元素，抛出错误
        throw new Error('element no found')
    }
}
```

#### 2.1.8 反转链表

> 反转链表在`leetcode`中经常会遇到，在各个面试题中也都会发现它的身影。所以，这里就顺带写以下

首先定义两个指针：`prev` 和 `current`,`current` 在前 `prev` 在后。每次让 `current`的 `next`指针指向`prev`，实现一次局部反转，局部反转完成之后，`prev` 和`current`同时往前移动一个位置，循环这个过程，直到`current`到达链表尾部，实现动画如下

![list](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/list2.gif)

```js
reserve() {
    let prev = null;
    let current = this.head;
    while (current) {
        // 保存当前的下一位
        let next = current.next;
        // 让当前节点指向前面的节点prev
        current.next = prev;
        // 交换完之后，让prev移到下一位也就是current
        prev = current;
        current = next;
    }
    //返回翻转的链表
    this.head = prev
}
```

### 2.2 双向链表

双向链表和单向链表的区别在于，单向链表一个节点只有链向下一个节点的指针，而在双向链表中，有两个指针，一个指向前一个元素，一个指向下一个元素，示意图如下：

![双向链表1](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A81.png)

#### 2.2.1 创建一个双向链表

相较于单向链表多了一个指向前一个元素的指针，所以在代码中要进行一些修改

```js
//一个链表节点
class Node {
    constructor(element) {
        this.element = element
        this.next = null
        this.prev = null//新增
    }
}
//双向链表
class doubleLinkedList {
    constructor () {
        this.size = 0
        this.head = null
        this.tail = null//新增
    }
    // 这里是接下来写的方法
}
```

**双向链表的优点**：可以访问一个特定节点的下一个或==前一个==元素。在单向链表中，如果迭代链表时错过了要查找的元素，就需要回到链表的起点**重新开始迭代**:sweat:

**注意**：在`doubleLinedList`类中有保存对列表最后一项的引用的tail属性。

#### 2.2.2 获取链表中的节点

根据位置获取链表的方法和单向链表中的是相同，忘记了记得跳回去看看噢！:heart:

```js
// 获取某个位置的节点，和单向链表相同
getNode(index) {
    if (index < 0 || index >= this.size) {
        throw new Error('out')
    }
    let current = this.head
    for(let i = 0;i < index;i++) {
        current = current.next
    }
    return current
}
```

#### 2.2.3 向链表尾部追加节点

相信看到这里的你，应该知道要先干嘛了吧！分两种情况

第一种情况：链表为空

第二种情况：链表不为空

对于**第一种情况**而言，我们只需要让`head`和`tail`指向新创建的节点即可

对于**第二种情况**，相对于单向链表而言，有一点不一样的地方，我们需要设置前驱指针。

首先我们需要让最后一个节点的`next`指针**指向新节点**，再让新节点的`prev`指针**指向前一个节点**（也就是连接前的最后一个节点），最后记得将`tail`移向**最后一个节点**，同时`size`也要自增！下面是示意图，清晰明了:thumbsup:

![双向链表2](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A82.png)

```js
append(element) {
    // 创建节点
    let node = new Node(element)
    // 保存当前指向最后一个元素的指针
    let tail = this.tail
    // 如果链表为空则新节点将作为第一个
    if(this.head === null) {
        // head和tail都为node
        this.head = node
        this.tail = node
    }else {
        // 常规尾插，让最后一个元素的next指针指向node  
        tail.next = node
        // 再让node的前驱指针指向最后一个节点tail
        node.prev = tail
        // 最后更新tail指向最后一个元素node
        this.tail = node
    }
    this.size++
}
```

#### 2.2.4 向链表中插入节点

向双向链表中插入一个新节点和单向链表非常相似。区别在于，单向链表只需要控制一个`next`指针，而双向链表则要同时控制`next`和`prev`两个指针

首先来分析**第一种场景**：在链表的<div color=#00a8ff>第一个位置</div>插入一个新节点。如果链表为空，只需要把`head`和`tail`都指向这个新节点。如果不为空，`current`变量将保存的是链表中第一个元素的引用，那么只需让新节点的`next`指针指向`current`，让`current`节点的`prev`指针指向新节点，最后让`head`指向第一个节点即可，==演示过程==如下：

![双向链表3](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A83.png)

接下来是**第二种场景**：<div color=#00a8ff>在尾部插入</div>，这个和上一个方法有点类似，可以查看上一小节，这里就不重复赘述了

**最后一个场景**也是相对复杂一点点的：在链表的<div color=#00a8ff>中间部分</div>插入

通过前面写的`getNode`方法，获取到需要插入位置的**前一个节点**`preNode`以及**下一个节点**`current`，我们将在`current`和`preNode`元素<div color=#00a8ff>之间</div>插入新元素。首先，`node`节点的`next`指针指向`current`，再让`node`的`prev`指针指向`preNode`节点，再处理剩下两个指针分别指向`node`即可，演示图如下：

![双向链表4](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A84.png)

```js
// 插入节点
insert(position, element) {
    // 边界判断，输入的position需要在范围之内
    if (position < 0 || position > this.size) {
        throw new Error('position out range')
    }
    // 创建节点
    let node = new Node(element)
    // 保存第一个节点，为一个变量
    let current = this.head
    // 第一种情况，在最头部插入
    if (position === 0) {
        // 链表为空的情况
        if (!this.head) {
            this.head = node
            this.tail = node
        } else {
            // 链表不为空
            // 让node的next指针指向第一个节点
            node.next = current
            // 第一个节点的前驱指针指向node
            current.prev = node
            // head指向新的第一个节点
            this.head = node
        }
        this.size++
    } else if (position === this.size) {
        // 在最后插入
        // current变量保存最后一个节点
        current = this.tail
        // 最后一个节点的next指针指向新节点
        current.next = node
        // 新节点的前驱指针指向前一个节点
        node.prev = current
        // tail移至node
        this.tail = node
        this.size++
    } else {
        // 在中间插入
        // 获取插入位置的前一个节点
        let preNode = this.getNode(position - 1)
        // current变量保存preNode节点的下一个节点
        current = preNode.next
        // 1. 让node节点的next指针指向后一个节点current
        node.next = current
        // 2. 让node节点的prev指针指向前一个节点preNode
        node.prev = preNode
        // 3. 让preNode节点的next指针指向新节点
        preNode.next = node
        // 4. 让current节点的prev指针指向新节点
        current.prev = node
        this.size++
    }
}
```

<div color=#e84118>注意：</div>在我们封装的`getNode`方法中，无论如何都是从头开始遍历的，实际上我们可以优化这个过程，当我们要找的`position`大于`size`的一半时，我们可以从<div color=#e84118>尾部开始遍历</div>，这样可以提高性能。

#### 2.2.5 从链表中的特定位置删除元素

双向链表的操作其实都和单向链表相似，只是多了一个前驱指针，要多操作一个指针而已，对于这个删除特定位置元素的方法，我们需要知道最重要的一点就是<div color=#0097e6>将被删除的节点从链表中移出，再将链表连接完好</div>即可

同样的我们需要分成3种情况

<div color=#e84118>第一种情况</div>：删除第一个节点

用`current`变量保存链表中第一个节点的引用，也就是我们想要移除的第一个节点。首先要改变的是 `head` 的引用，将其从` current `改为`current.next`。但我们还需要更新`current.next`指向上一个元素的指针，因此需要判断链表的长度是否为1，如果为1说明删除第一个节点之后链表就为空了，这时候就需要将`tail`设为`null`，如果不为1，则把`head.prev`的引用改为`null`即可。演示图如下：

![双向链表5](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A85.png)

<div color=#e84118>第二种情况</div>：删除最后一个节点

因为有了最后一个节点的引用`tail`，我们不需要通过`getNode`来获取最后一个节点，这样我们也就可以把`tail`的引用赋给`current`变量。接下来，需要把`tail`的引用更新为列表中**倒数第二个元素**，同时将`next`指针指向`null`，这个过程可以展示为下图：

![双向链表6](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A86.png)

<div color=#e84118>第三种情况</div>：删除中间的节点

首先我们需要通过`getNode`方法找到要删除的节点，用`current`变量保存，再用`preNode`表示要删除节点的前一个节点，。那么要移除它，我们可以通过更新`prev.next`和`current.next.prev`的引用，在链表中跳过它，因此，将`prev`的`next`指针指向`current.next`，而`current.next`的`prev`指针指向`prev`，如下图演示：

![双向链表7](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A87.png)

```js
removeAt(position) {
    // 边界判断，输入的position需要在范围之内
    if (position < 0 || position > this.size) {
        throw new Error('position out range')
    }
    let current = this.head
    // 如果删除的是第一个节点
    if (position === 0) {
        // 让head指向下一位
        this.head = current.next
        // 如果链表的长度为1，删除后末尾应当为null
        if(this.size === 1) {
            this.tail = null
        }else {
            // 不为1 删除节点后第一个节点（current.next)指向null
            this.head.prev = null
        }
        this.size--
    }else if (position === this.size -1) {
        // 删除最后一个节点
        // 先让current保存我们要删除的节点
        current = this.tail
        // 让tail移向删除节点的前一位
        this.tail = current.prev
        // 再让tail的next指针指向null，这样最后一个节点就被丢弃了
        this.tail.next = null
        this.size--
    }else {
        // 被删除的节点
        let current = this.getNode(position)
        // 删除节点的前一个节点
        let preNode = current.prev
        // 删除节点的前一个节点next指向它的后一个节点
        preNode.next = current.next
        // 后一个节点的prev指向preNode
        current.next.prev = preNode
        this.size--
    }
}
```

#### 2.2.6 查找元素在链表中的位置

和单向链表的处理方式相同，没有做什么改动:hamburger:

```js
indexOf(element) {
    // 当前链表头节点
    let current = this.head; 
    // 遍历整个链表
    for (let i = 0; i < this.size; i++) {
        if (current.element === element) {
            return i
        }
        // 依次向下移动
        current = current.next; 
    }
    return -1;
}
```

#### 2.2.7 根据元素值移除节点

在前面根据位置删除链表节点的基础上，这部分的代码和单向链表相同，但也不完全相同噢，毕竟`removeAt`方法是一个新的方法噢！

```js
// 根据元素值删除元素
remove(element) {
    let index = this.indexOf(element)
    if (index != -1) {
        // 通过下面的removeAt方法删除指定位置节点
        this.removeAt(index)
    } else {
        // 删除不存在的元素，抛出错误
        throw new Error('element no found')
    }
}
```

#### 2.2.8 打印双向链表

通过遍历整个链表，将每个节点的值拼接起来，这样看起来会清晰很多

输出示例：`NULL<->1<->2<->3<->NULL`

```js
print() {
    let str = 'NULL<->';
    let current = this.head
    while (current !== null) {
        str += current.element + '<->';
        current = current.next;
    }
    return str += 'NULL';
}
```

### 2.3 单向循环链表

循环链表和单向链表相似，节点类型都是一样，唯一的区别是，在创建循环链表的时候，需要让其最后一个节点的 `next` 指针**指向第一个节点**

```js
// 假定lastItem为最后一个节点
lastItem.next = this.head
```

![循环链表单向](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E5%BE%AA%E7%8E%AF%E9%93%BE%E8%A1%A8%E5%8D%95%E5%90%91.png)

#### 2.3.1 创建一个单向循环链表

大体的结构和单向链表一致

```js
class Node {
    constructor(element) {
        this.element = element
        this.next = null
    }
}
class CircleLinkedList {
    constructor() {
        this.size = 0
        this.head = null
    }
    // 在末尾添加节点
    append(element) {}
    // 在任意位置插入节点
    insert(position,element) {}
    // 根据位置删除节点
    removeAt(position){}
    // 查找元素对应索引，与单向链表相同
    indexOf(element) {}
    // 根据元素值删除节点，与单向链表相同
    remove(element) {}
    // 获取节点，与单向链表相同
    getNode(index) {}
}
```

#### 2.3.2 在链表尾部追加节点

<div color=#00a8ff>第一种情况</div>：链表为空，直接让`head`指向新节点`node`即可

<div color=#00a8ff>第二种情况</div>：链表不为空，通过`getNode`方法获取到链表的最后一个节点，让该节点的`next`指针指向新节点`node`

<div color=#c23616>注意</div>：在执行完`if`判断后都需要将最后一个节点的`next`指针指向第一个节点`head`

```js
append(element) {
    // 创建节点
    let node = new Node(element)
    // 链表为空情况
    if (this.head === null) {
        this.head = node
    } else {
        // 获取最后一个节点
        let current = this.getNode(this.size - 1)
        current.next = node
    }
    // 不管哪种情况，都要保持首尾相连
    node.next = this.head
    this.size++
}
```

#### 2.3.3 在链表中插入节点

同样的有==两种场景==

- 当插入的位置是第一个时，不同于单向链表的操作是，需要额外的将链表的最后一个节点的`next`指针指向新节点`node`
- 在其他地方插入时，可以通过三元运算符来判断，新节点的`next`指向是不是`null`如果是`null`说明新节点**插在最后一个节点**，需要将该节点的`next`指针指向第一个节点，否则就正常插入即可

```js
insert(position, element) {
    // 边界判断
    if (position < 0 || position > this.size) {
        throw new Error('position out range')
    }
    // 实例化创建节点
    let node = new Node(element);
    if (position === 0) {
        // node指向先前的第一个节点
        node.next = this.head;
        // 头节点改变为新节点node
        this.head = node;
        let current = this.getNode(this.size - 1)
        current.next = this.head
        this.size++
    } else {
        // 找到需要插入位置的前一个节点
        let prev = this.getNode(position - 1);
        // 如果prev.next 为null就指向head否则就指向下一个
        node.next = prev.next == null ? this.head : prev.next
        // 让前一个节点指向新创建的节点
        prev.next = node;
        this.size++
    }
}
```

#### 2.3.4 在链表中删除特定位置的节点

区别于单向链表，==删除第一个节点时==，需要改变最后一个节点的`next`指向，指向新的第一个节点，删除其他节点时，需要判断以下被删除节点的前一个节点的`next`指向是否为`null`从而进行下一步的操作

```js
// 根据位置删除节点
removeAt(position) {
    // 边界判断，超出链表长度，抛出错误
    if (position < 0 || position >= this.size) {
        throw new Error('position out range')
    }
    let current = this.head
    if (position === 0) {
        // 如果删除的是第一个节点，则让head指向下一位即可
        let last = this.getNode(this.size - 1); 
        this.head = current.next;
        last.next = this.head
    } else {
        // 获取删除位置的前一个节点
        let pre = this.getNode(position - 1); 
        // current为被删除节点
        current = pre.next;
        // 让前一个节点指向删除节点的下一个节点
        pre.next = current.next == null ? this.head : current.next;
    }
    // 长度自减
    this.size--;
}
```

### 2.4 双向循环链表

双向循环链表区别于单向循环链表，双向链表有多一个从第一个节点指向最后一个节点的`prev`指针

![双向循环链表](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E5%8F%8C%E5%90%91%E5%BE%AA%E7%8E%AF%E9%93%BE%E8%A1%A8.png)

> 双向循环链表与前面的差别都不是很大，本文就不展开写了，相信看了前面的详解，一定能够自己完成的

## 3. 相关题目

> `leetcode`上关于链表的几道题目，附上ac代码

### 3.1 [反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)（链接直达噢！）

![111](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/111.png)

```js
var reverseList = function(head) {
    let prev = null;
    let current = head;
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    return prev
};
```

### 3.2 [合并K个升序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)

![222](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/222.png)

```js
var mergeKLists = function (lists) {
    if (!lists || !lists.length) return null;
    let end = lists[0]
    let i = 1;
    while (i != lists.length) {
        end = mergeTwoLists(lists[i++], end)
    }
    return end
};

function mergeTwoLists(l1, l2) {
    // 如果其中一个为空，直接返回另一个链表
    if (!l1) return l2
    if (!l2) return l1
    // 依次比较链表的值
    if (l1.val > l2.val) {
        // 如果l2的值大，则从l2开始，l2的next通过递归再次判断是谁 
        l2.next = mergeTwoLists(l1, l2.next)
        return l2
    } else {
        l1.next = mergeTwoLists(l1.next, l2)
        return l1
    }
};
```

### 3.3 [删除链表的倒数第 N 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

![333](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/333.png)

```js
var removeNthFromEnd = function (head, n) {
    let node = head;
    let count = 0 ;
    //计算链表长度
    while(node) {
        node = node.next;
        count++;
    }
    count = count - n - 1
    if(count == -1) {
        return head.next
    }else {
        node = head;
        while(count > 0) {
        node = node.next;
        count--;
    }
    }
    node.next = node.next.next
    return head
};
```

## 4. 小结

以上就是本文JavaScript实现链表的全部内容了，希望你能从中学到好多好多东西噢~:heart:

今天的分享就到这里结束啦！

> 参考文献：javascript数据结构与算法

