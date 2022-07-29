---
title: 三张图轻松KO⚡ JS 原型和原型链
date: 2021-8-20 7:14:21
id: 1635409101
photos: https://ljcimg.oss-cn-beijing.aliyuncs.com/img/js%E5%8E%9F%E5%9E%8B%E5%92%8C%E5%8E%9F%E5%9E%8B%E9%93%BE.png
tags:
  - JavaScript
categories:
  - [前端总结, JavaScript精读]
keywords: 原型,原型链
description: 引言 原型和原型链据说是面试常考的东西，对于初学者来说有一定的难度，但是其实它也非常的简单，几个概念理解好了就没什么问题了，我们先从一个例子出发，然后再引出相关的知识点
---


> 📢 大家好，我是小丞同学，这一篇是 JS 高程精读系列的第 n 篇文章，主要解释 JS 中的原型和原型链
>
> 📢 非常感谢你的阅读，不对的地方欢迎指正 🙏
>
> 📢 <div color=#e84393>愿你生活明朗，万物可爱</div>

## 引言

原型和原型链据说是面试常考的东西（没面试过，不大清楚），对于初学者来说有一定的难度，但是其实它也非常的简单，几个概念理解好了就没什么问题了，我们先从一个例子出发，然后再引出相关的知识点，下面我们**先来看一个例子**

先定义一个类，添加一些属性和方法

```js
class Student {
    constructor(name, score) {
        this.name = name
        this.score = score
    }
    say() {
        console.log(`我是${this.name}考了${this.score}`);
    }
}
```

然后我们 `new` 一个实例对象出来

```js
const student = new Student('小丞同学', 99)
```

 接着我们想要输出一下这个学生的姓名和成绩

```js
console.log(student.name, student.score);
```

很顺利，控制台输出 小丞同学 99 ，接下来我们想要调用一下 `say` 方法

```js
student.say()
```

成功输出![image-20210816085505993](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210816085505993.png)

没什么问题，很完美，接下来我们来打印一下实例化出来的对象 `student`

```js
console.log(student)
```

我们看一下控制台输出

![image-20210816085704178](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210816085704178.png)

咦，我们发现在这个 `student` 对象上**只有两个**属性 `name` 和 `score` ，那我刚刚调用的 `say` 方法是哪里来的呢？

当我们展开 `__proto__` 时就会发现，我们的 `say` 方法在其中，那这其实是因为我们在类中添加的方法，会被添加到这个类的原型对象上

![image-20210816092625358](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210816092625358.png)



当我们在调用 `say` 方法时，在自身上并没有找到这个方法，就会在自身的 `__proto__` 上去找，而这个 `__proto__` 也叫做**隐式原型**

接下来我们再看一个有意思的事情

我们说 `student` 这个实例对象是由这个大写的类 `Student` 来创建的，那么我们打印一下这个类，来看一下

```js
console.log(Student)
```

打印出来就是一个类

![image-20210816094116614](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210816094116614.png)

 而在这个类上会有一个方法 `prototype`  ，我们来打印一下看看它是什么

```js
console.log(Student.prototype)
```

![image-20210816094325491](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210816094325491.png)

我们会发现在它的上面也有一个 `say` 方法，同时是不是觉得这个又点眼熟呢

我们在控制台打印一下实例对象的隐式原型

```js
console.log(student.__proto__)
```

![image-20210816101622378](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210816101622378.png)

你会发现它们两个尽然长的是一样的，我们可以比对一下，看看它们是不是完全相等的

![image-20210816101744210](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210816101744210.png)

可以看到，它们两个指向的是同一个对象，那么通过上面的一步步推理，我们可以得到这样一张图

![image-20210816103010784](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210816103010784.png)

那到底什么是原型呢？

## 原型

原型又分为显式原型和隐式原型

### `__proto__`  隐式原型

在对象上有一个属性叫做 `__proto__ `，这个属性是对象所特有的，也叫做隐式原型，当我们尝试在一个对象上查找属性或者方法时，如果说找不到这个属性或者方法，就会在它的隐式原型上查找

### prototype 显式原型

`prototype` 是函数所特有的属性，它是从一个函数指向一个对象，它的含义是函数的原型对象。

它的作用是什么呢？

**它的作用**就是包含所有实例对象共享的属性和方法，这也就是为了让该函数所实例化的对象们都可以找到**公共的属性和方法**

**特别注意**的是，任何函数在创建的时候，都会默认创建该函数的 `prototype` 对象

## constructor 构造函数

在前面没有提这个属性，就是怕指向太多容易混乱

其实在对象上除了具有 `__proto__` 属性外，原型对象上还有一个 `constructor` 属性值得我们注意，这一点在我们打印对象的时候也能够注意到，那它是干什么的呢？

我们在控制台上输出对象本身、隐式原型、`constructor` 三个结果

```js
console.log(student)
console.log(student.__proto__)
console.log(student.constructor)
```

![image-20210816111821169](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210816111821169.png)

我们可以发现 `constructor` 属性的值是创建 `student` 的类，也就是构造函数

这也就是 `constructor` 的含义，它指向该对象的构造函数，它的作用就是用来保存自己的构造函数引用

需要**特别注意**的是，所有的 `constructor` 属性的终点都是 `Function` 

这是因为 `Function` 既可以看成是一个函数，也可以是对象，所有的函数和对象都是由 `Function` 构造函数而来
![image-20210816113534547](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210816113534547.png)

这里留下一个问题？

> 修改了构造函数的原型对象，`constructor`指向谁
>
> `functionName.prototype = {}`

## 原型对象、实例对象、构造函数之间的关系

一张图搞定，前面的内容懂了，自己推一下

![foo](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/foo.png)

## 原型链

原型链其实也很简单：对象 => 对象的原型 => 原型的原型 => 原型的原型的原型 => null，这就是原型链

那这是什么意思呢，在我们前面在讲查找原则的时候，其实也有提到，当一个要查找对象上的属性或者方法时，如果在自身上没有找到，就会在隐式原型对象下查找，直到找到，或者到达尽头 `null`

在这个查找的过程形成的一条由 `__proto__` 连接而成的链就是原型链

![image-20210816123733433](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210816123733433.png)

## 总结

1. `__proto__`  和 `constructor` 属性是对象所特有的

> `constructor` 是原型对象所特有的，每个对象上必然能找到 `constructor` 属性

1. `prototype` 属性是函数特有的
2. `__proto__` 的作用是作为桥梁提供一种成员访问机制，不停的通过 `__proto__` 去查找
3. `prototype` 的作用是让函数所实例化的对象拥有公共的属性和方法
4. `constructor` 属性的含义是指向对象的构造函数
5. 修改构造函数的原型对象，需要手动调整 `constructor`

> 以上就是本文的全部内容了，希望你能喜欢💛，有什么问题可以评论区留言噢~

