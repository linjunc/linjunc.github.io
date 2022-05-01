---
title: 浅析 Map 和 WeakMap 区别以及使用场景
date: 2021-7-25 17:34:27
id: 1635420087
photos: https://ljcimg.oss-cn-beijing.aliyuncs.com/img/map.png
tags:
  - JavaScript
categories:
  - [前端总结, JavaScript精读]
keywords: Map,weakMap
description: 希望这一篇文章能让你对 Map 有更好的理解，或者能够帮你理解 Map 和 WeakMap 这篇文章会先从Map再到WeakMap 
---



> 在阅读红宝书时遇到了 `WeakMap` 这个关键字，第一次见感觉没啥用，是我见识浅了，其实还是有点用的，有多大我不知道（快跑）

希望这一篇文章能让你对 `Map` 有更好的理解，或者能够帮你理解 `Map` 和 `WeakMap`

这篇文章会先从`Map`再到`WeakMap`

## 一、为什么是 Map ？

### 1. 传统对象结构

`Map`本质上是一个键值对的集合。和传统对象结构相比，传统的对象只能用**字符串作为键名**，这就在使用上造成了很大的限制了。这也是新增 `Map` 的原因之一。

```js
const data = {};
// element 为节点对象
const element = document.querySelector(".node");
console.log(element); // 输出 div.node 对象
// 将对象转化成字符串输出 [object HTMLDivElement]
console.log(element.toString());
// 用点操作符不能有空格，所以采用中括号的形式给对象赋值
data[element] = "objectData";
// 输出 objectData，说明在对象中存在[object HTMLDivElement]键名
console.log(data["[object HTMLDivElement]"]);
```

在上面的代码中，我们创建了一个对象并将一个节点对象作为了它的键名，并进行了代码测试，首先验证了获取到的`element`节点为一个对象，再确定了经过`toString`方法转化后的结果，以这个值为键名成功的输出了`value`值`objectData`

![image-20210724161150545](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724161150545.png)

通过上面的测试，确定了传统对象的键名会通过`toString`方法转化为**字符串类型**

> 注意：在我们访问对象成员时，键名**有空格**时不能采用点访问，例如`data.ab c`
>
> 这样是**错误的**。我们需要采用`data['ab c']`的形式来访问

### 2. Map 结构

`Map`类似于对象，但是键名不限于字符串，可以说`Object`结构提供`键-值`对应，`Map`结构提供`值-值`对应因此其实采用`map`结构会优于传统对象

```js
// 1. 通过new Map来创建dataMap容器
const dataMap = new Map();
// 2. 获取节点对象，作为测试数据
const element = document.querySelector(".node");
// 3. 通过 set 方法给 dataMap 中指定键和对应的值
dataMap.set(element, "objectData");
// 4. 通过 get 来从 dataMap 中获取键名对应的值
console.log(dataMap.get(element));
// 5. 揭开面目
console.log(dataMap);
```

从上面的代码中，我们可以清楚的看到，第 8 行代码获取值时直接传入了`element`对象，

可以成功的获取到对应的值，在最后打印`dataMap`时更是验证了上诉说法

![image-20210724164519441](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724164519441.png)

成功的将对象作为了键名，弥补了传统对象的不足

### 3. Map 的特点

1. Map 默认情况下不包含任何键，所有键都是自己添加进去的。不同于 Object 原型链上有一些默认的键。

2. Map 的键可以是**任意类型**数据，就连函数都可以。

3. Map 的键值对个数可以**轻易**通过`size`属性获取，Object 需要手动计算。

4. Map 在频繁增删键值对的场景下**性能**要比 Object 好。

### 4. 什么时候用 Map

1. 要添加的键值名和 Object 上的默认键值名冲突，又不想改名时，**用 Map**
2. 需要 String 和 Symbol 以外的数据类型做键值时，**用 Map**
3. 键值对很多，有需要计算数量时，**用 Map**
4. 需要频繁增删键值对时，**用 Map**

## 二、Map 实例属性和方法

在上面我们已经接触到了`Map`的个别 API，接下来简单说说

### 1. set

`set`方法设置键名`key`对应的键值为`value`，然后会返回整个`Map`结构，如果设置的`key`已经存在，则会更新`value`值，否则会新生成该键

![image-20210724170830046](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724170830046.png)

也可以采用链式写法设置多组数据

![image-20210724171054240](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724171054240.png)

成功输出如下：

![image-20210724171030502](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724171030502.png)

### 2. get

通过`get`方法读取`key`对应的键值，如果传入的键值不存在，则会返回`undefined`

![image-20210724170801123](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724170801123.png)

控制台成功输出`ljc`

### 3. has

判断传入的键是否存在当前`Map`对象中，该方法返回一个布尔值

![image-20210724202711276](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724202711276.png)

在上面的代码中，存在`name`为`true`，不存在`sex`返回`false`

### 4. delete

删除传入的键，返回`true`，如果删除失败，则返回`false`

![image-20210724203222536](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724203222536.png)

### 5. clear

清除所有成员，没有返回值

![image-20210724204013186](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724204013186.png)

`clear`前后结果对比，注意`clear`没有**返回值**！

![image-20210724203849295](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724203849295.png)

## 三、遍历方法

可以采用`for...of`循环和`forEach`两种方法。由于`Map`实例会维护键值对的插入顺序，因此可以根据插入顺序进行遍历

采用**for...of**

> `for...of`可以遍历有`iterator`接口的数据结构

- `keys()`：返回键名的遍历器
- `values()`：返回键值的遍历器
- `entries()`：返回键值对的遍历器
- `forEach()`：使用回调函数遍历每个成员

#### map.entries()

在`Map`实例中**有一个迭代器**，能以插入顺序生成`[key,value]`形式的数据。

我们可以通过`entries`方法来获得这个迭代器，从而利用`for...of`进行遍历操作

![image-20210724223527628](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724223527628.png)

![image-20210724223611443](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724223611443.png)

也可以采用如下进行遍历，每次`item`获取到一个数组

![image-20210725104827297](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725104827297.png)

又因为`entries`是**默认**的迭代器，所以可以直接对`Map`实例使用扩展操作或者直接采用`map`

![image-20210725104331505](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725104331505.png)

采用**扩展**操作

![image-20210725104503000](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725104503000.png)

#### map.values()

可以采用遍历`map.values()`的方式来遍历`map`容器的属性值

![image-20210725105131665](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725105131665.png)

#### map.keys()

可以采用`map.keys()`来遍历键名

![image-20210725105326525](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725105326525.png)

#### 采用 forEach() 回调遍历

![image-20210725110225814](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725110225814.png)

通过回调的方式遍历`map`

## 四、Map 类型转化

几种与`map`相互类型转化的方法

#### Map 转为数组

通过扩展运算符实现

```js
let map = new Map();
let arr = [...map];
```

#### 数组转为 Map

```js
let map = new Map(arr);
```

#### Map 转为对象

通过遍历利用`set`将键值对加入对象中

```js
let obj = {};
for (let [k, v] of map) {
  obj[k] = v;
}
```

#### 对象转为 Map

```js
for (let k of Object.keys(obj)) {
  map.set(k, obj[k]);
}
```

## 五、什么是 WeakMap ？

总所周知，`WeakMap`是 ES6 中新增的一种集合类型，叫做“弱映射”。它和`Map`是兄弟关系，与`Map`的区别就在于这个**弱字**，API 还是`Map`的那套（只有`set` `get` `has` `delete`)

那它真正是什么意思呢？

> 这其实描述的是 JS 中**垃圾回收**程序对待“弱映射”中键的方式

那为什么要有 WeakMap 呢？它解决了什么问题呢？这些问题后面都会讲到

## 六、WeakMap 的特性

我们先从 WeakMap 的特性讲起

### 1. WeakMap 只能将对象作为键名

- 只接受对象作为键名（`null` 除外），不接受其他类型的值作为键名

**null 除外**

![image-20210725145126758](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725145126758.png)

![image-20210725145141515](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725145141515.png)

**正常添加**

![image-20210725145321219](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725145321219.png)

### 2. WeakMap 的键名引用的对象是弱引用

这里懵了挺久的，但是这是`WeakMap`结构的关键所在

要想读懂这句话，不容易，我们需要先知道**强引用和弱引用**

#### 2.1 什么是强引用？

我们先来看看**强引用**，这是阮一峰老师书上的例子

![image-20210725151557054](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725151557054.png)

在上面的代码中，`e1`和`e2`是两个对象，通过`arr`数组对这两个对象添加一些文字说明。但是这样就形成了`arr`对`e1`和`e2`的引用，而这种引用又是强引用。它的区别就体现在。当我们不再需要这两个对象时，我们必须手动的删除这个引用，解除`arr`都两个对象的引用关系，否则垃圾回收机制不会释放`e1`和`e2`占用的内存。因为，`arr`**仍然存在着对对象的引用！**

![image-20210725152942154](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725152942154.png)

**麻烦的操作势必会造成问题，当忘记了手动删除引用，就会造成内存泄漏**

#### 2.2 什么是弱引用？

对于**弱引用**，百度百科给出的答案：

> 在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。

也就是说**如果**我们能这样创建一个弱引用的对象

```js
//假设
let obj = new WeakObject();
```

我们就可以静静的等待垃圾车来把它拖走了，`obj`所引用的对象就会被回收

如果还没有理解的话，我们再来看看

#### 2.3 弱引用和强引用图解

从 1 套代码结合两张图来理解

对于强引用

```js
const myMap = new Map();
let my = {
  name: "ljc",
  sex: "男",
};
myMap.set(my, "info");
console.log(myMap);
```

![image-20210725161643051](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725161643051.png)

对于弱引用

```js
const myMap = new WeakMap();
let my = {
  name: "ljc",
  sex: "男",
};
myMap.set(my, "info");
console.log(myMap);
```

![image-20210725161619701](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725161619701.png)

图一中的数据被`my`和`myMap`实例对象所引用，引用计数为 2，图 2 中建立了`myMap`对`my`所引用的对象的**弱引用**，引用计数为 1

在上面我们谈到强引用数据被删除时，需要手动解除引用，而弱引用则可以等待垃圾回收机制自动清除

**弱引用与垃圾回收**

![image-20210725162356371](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725162356371.png)

当执行`my = null`时会解除`my`对原数据的引用，而`myMap`实例对象对`my`所引用对象是弱引用关系，该数据的**引用计数为 0** ，程序垃圾回收机制在执行时会将引用对象回收。而如果时强引用关系则**引用计数为 1** ，不会被垃圾回收机制清除。

> 总的来说， `WeakMap` 保持了对键名所引用的对象的弱引用，即垃圾回收机制不将该引用考虑在内。只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，`WeakMap` 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

### 3. 不可遍历

正因为`WeakMap`对键名所引用的对象是弱引用关系，因此`WeakMap`内部成员是会**却决于垃圾回收机制有没有执行**，运行前后成员个数很可能是不一样的，而垃圾回收机制的执行又是**不可预测**的，因此不可遍历

> 了解了`WeakMap`的特性，相信对“为什么要有`WeakMap`？”已经有了一定的答案

## 七、Map 和 WeakMap 的区别

> 看到这里相信心中已经有答案了

- `Map` 的键可以是任意类型，`WeakMap` 只接受对象作为键（null 除外），不接受其他类型的值作为键
- `Map` 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键； `WeakMap` 的键是弱引用，键所指向的对象可以被垃圾回收，此时键是无效的
- `Map` 可以被遍历， `WeakMap` 不能被遍历

## 八、WeakMap 的使用场景

### 1. DOM 节点元数据

> 用红宝书的例子

因为 weakMap 不会影响垃圾回收，所以可以用来关联元数据

![image-20210725171056590](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725171056590.png)

当上面代码执行后，登录按钮从 DOM 树中被删除了，但由于 Map 对节点对象是强引用关系，仍然保存着对按钮的引用，所以会引起内存泄漏

![image-20210725171352098](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725171352098.png)

因此可以采用`WeakMap`当节点删除后，引用计数为 0，等待垃圾回收机制回收

### 2. 部署私有属性

利用弱映射，将内部属性设置为实例的弱引用对象，当实例删除时，私有属性也会随之消失，因此不会内存泄漏

阮一峰老师的代码实例

![image-20210725172559971](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725172559971.png)

### 3. 数据缓存

当我们需要在不修改原有对象的情况下储存某些属性等，而又不想管理这些数据时，可以使用`WeakMap`

![image-20210725173257029](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725173257029.png)

---

> 非常感谢您的阅读，欢迎提出你的意见，有什么问题欢迎指出，谢谢！🎈
