---
title: Javascript客户端存储技术你知道多少？
date: 2021-5-11 21:52:18
id: 1635663138
photos: https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E5%AE%A2%E6%88%B7%E7%AB%AF.png
tags:
  - JavaScript
categories:
  - 前端总结
keywords: 客户端存储,JavaScript客户端存储,小丞同学
description: 客户端存储技术 为了提升用户的体验感，直接在客户端存储用户信息的需求也随之增加。无论是实现自动登录，个人偏好，换肤功能等，都能使用客户端存储来实现
---

为了提升用户的体验感，直接在客户端存储用户信息的需求也随之增加。无论是实现自动登录，个人偏好，换肤功能等，都能使用客户端存储来实现。本文将介绍Web客户端常见的几种存储方式，将结合实际应用场景进行分析，以及相关代码分享

**先上图**，本文知识归纳

![](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%AD%98%E5%82%A8.png)

## 1. Cookie

`Cookie` 是一些数据， 存储于电脑上的文本文件中。在**HTML5**到来之前，`cookie`是主要的存储方式。

> 对于`cookie`的历史由于学识过浅就不过多讨论 :pensive:

### 1.1 Cookie的限制

因为`cookie`存储在客户端的机器中，所以为了保证它不被恶意利用，浏览器会加以限制，只要遵守下列规则就不会有什么问题

- 不超过300个cookie
- 每个cookie不超过4096字节，也就是`4k`
- 每个域不超过20个cookie
- 每个域不超过81920字节

每个域能设置的cookie总数也是受限的，但不同浏览器的限制不同

`注意`：当cookie总数超过了单个域的上限，浏览器就会删除==**之前设置**==的`cookie`

### 1.2 cookie的构成

`cookie`在浏览器中是由以下参数构成的

1. **名称**：cookie名不区分大小写，因此`myCookie`和`MyCookie`是同一个名称。不过，实践中最好将`cookie`名当成区分大小写来对待，不仅提高代码的可读性，同时避免一些不必要的误会
2. **值**：存储在`cookie`里的字符串值
3. **域**：domain表示的是cookie所在的域， 默认cookie的域是==**当前域名**==。
4. **路径**：请求`URL` 中包含这个路径才会把 `cookie`发送到服务器，例如：指定cookie路径为`http://www.baidu.com/my/ljc` 则`http://www.baidu.com/my/`下的页面就不会发送`cookie`
5. **过期时间**：表示什么时间删除`cookie`，即不再发送到服务器。默认情况下浏览器==**会话结束后**==会删除所有cookie。不过，可以设置删除`cookie`的具体时间，这样即使关闭浏览器`cookie`也会保存在用户的本机上。把过期时间设置为过去的时间就可以实现删除`cookie`
6. **安全标志**：只在使用SSL安全连接的情况下才会把`cookie`发送到服务器。例如，https请求就能发送`ccokie`，而http请求则不会，添加`secure`字样即可开启

这些参数在使用中使用==**分号隔开**==

### 1.3 JavaScript中cookie的使用

这里将结合==**自动登录**==功能来谈论，将经过4个步骤，设置`cookie`，获取`cookie`，移除`cookie`，以及初始化操作

#### 1.3.1 设置cookie

```js
function setCookie() {
	let date = new Date();
	date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
	document.cookie = 'username=' + valId.value + ';path=/;expires=' + date.toGMTString();//用户名
	document.cookie = 'psd=' + valPsd.value + ';path=/;expires=' + 	date.toGMTString();//密码
}
```

在上面的代码中，设置了名为`username`和`psd`的cookie，设置了`path`在任何路径下可以访问，过期时间为30天，

`注意`：这里会有**8小时的误差**，原因是浏览器时间为当前所在地区的时间，而代码中通过`toGMTString`转化后的时间是==格林威治时间==，北京处于东八区，所以时间会早8小时，如果化为准确的30天的话，加8小时即可~

`注意`：在保存账号密码时可以进行==加密处理==

#### 1.3.2 移除cookie

在前面也有说到，当当前时间超过了cookie的过期时间，cookie就会自动的被清除，我们就利用这个特性来实现移除cookie的功能

```js
function removeCookie() {
    let date = new Date();
    date.setTime(date.getTime() - 60 * 60 * 1000);//过去的时间
    document.cookie = 'username=path=/;expires=' + date.toGMTString();
    document.cookie = 'psd=;path=/;expires=' + date.toGMTString();
}
```

在上面的代码中，重点留意第三行，通过重新设置时间戳，使得过期时间为过去的时间，这样cookie就自动的被清除了。

`注意`：当我们在设置同名的cookie时，会覆盖先前的cookie，从而实现了移除cookie的功能

#### 1.3.3 获取cookie值

获取cookie的操作比较复杂，JavaScript中没有太多的API给我们去操作cookie，只有BOM中的`document.cookie`属性。相信都不会陌生吧，当它作为`键`存在时可以用于设置cookie。当作为`值`被调用时，可以返回当前地址下的所有cookie，为==**字符串**==类型

`注意`：存在多个cookie一起返回时，用`;` 隔开。`name1=value1;name2=value2`，因此获取cookie值要经历以下几步

1. 利用字符串中`split`方法，将返回的字符串通过`;`标识符进行分割返回数组
2. 再通过遍历分割好的cookie数组，逐一判断需要获取的cookie名，最后再通过处理数组值从而得到cookie值。

```js
function getCookie(cookieName) {
    cookieName += '=';
    let cookieList = document.cookie.split(';');
    for (let i = 0; i < cookieList[i].length; i++) {
        let cookieItem = cookieList[i].trim(); //去除空格
        if (cookieItem.indexOf(cookieName) != -1) {
            return cookieItem.substring(cookieName.length, cookieItem.length)
        }
    }
}
```

在代码中出现了很多数组，字符串的API，下面我们来一个个分析以下

- 在第4行中，字符串API`split`，这个方法的作用是，通过特定的标识符对字符串进行分割，返回分割好的数组，例如：

```js
let str = "How=are;you=doing";
let n = str.split(";");
console.log(n);// ["How=are", "you=doing"]
```

- 在第5行中使用到了`trim`方法，用于==去除首尾==的空格，避免空格对后面处理值造成影响
- 在第6行中使用到了字符串方法`indexOf`，用于查找字符串中是否存在我们需要的获取的cookie名，找得到返回值就为首次出现的索引，否则为`-1`

> `inedxOf`方法可返回某个指定的字符串值在字符串中首次出现的位置。如果没有找到匹配的字符串则返回 -1。

- 在第7行中使用了字符串的方法`substring`，改方法用于==切割字符串==，要传入两个参数，切割的初始位置和末位置

#### 1.3.4 初始化操作

有了前面的铺垫，这里就比较轻松了，我们只需要判断以下当前地址下的cookie中是否存在，用户名和密码，如果存在，我们就为他们进行自动登录，这一步一般放在代码的最前面，用户打开页面就先判断

```js
function initData() {
    if (getCookie('username') && getCookie('psd')) {
        //需要进行的操作
    }
}
```

`注意`：这里可能有人会有疑问，只要有用户名密码就好了吗？

- 我的答案是：是的，因为我们可以在用户登录的时候，只有用户成功登录了，我们才会为它设置cookie，所以，不用担心密码错误的问题。

以上就是JavaScript中操作利用`cookie`实现自动登录的实现过程，**设置，获取，移除**

---

对cookie的限制及特性决定了cookie并不是存储==大量数据==的理想方式。因此，其他客户端技术出现了

`注意`：不要在cookie中存储重要或敏感信息，cookie的数据保存并不是在安全的地方。

## 2. Web Storage

在**HTML5**中引进了两种存储方式`sessionStorage`和`localStorage`。`web Storage`的目的解决通过客户端存储不需要频繁发送回服务器的数据时使用`cookie`的问题。

`localStorage`和`sessionStorage`存储在用户本地的浏览器上，不像cookie一样携带在http请求头部的字段中，有效的避免了性能问题。`localStorge`同样也采用了同源策略对存储的容量进行了限制，大多数设置限制为同一域名**5M**的存储空间。

> 这里重点讲本地存储，临时存储的方法相同

`注意`：两种方式存储的值都只能是==**字符串**==的形式

### 2.1 localStorage对象

> `localStorage`：没有时间限制，持续范围超过当前会话，浏览器关闭再打开数据依然是可用的（注意是同一域名下）

`localstorage`的存储方式是以==`key-value`==的形式进行存储的，首先我们先了解以下其中的操作方法

1. `localstorage.length`：获取当前存储中的键值对数量

2. `localstorage.key(index)`：得到某个索引的键值

3. `localstorage.getItem(key)`：读取对应键值的数据

4. `localstorage.setItem(key,value)`：设置对应的键值对，保存数据

5. `localstorage.remove(key)`：清除某个指定数据

6. `localstorage.clear()`：清除存储的所有数据

#### 2.1.1 小demo

接下来先实现一个简单的保存查找功能，有以下

- 保存用户的名称，以及拥有的金钱数量
- 通过用户名查询到对应的金钱数量

**代码实现**

```js
function set() {
    let myName = document.querySelector('#myName').value;//获取需要保存的用户名
    let money = document.querySelector('#money').value;//金钱数量
    localStorage.setItem(myName, money);//保存
}
```

首先当我们需要进行保存数据时，我们会调用set函数，通过获取当前的需要保存的数据，直接进行保存

```js
function find() {
    let searchName = document.querySelector('#searchName').value;
    let youMoney = localStorage.getItem(searchName);
    let findEnd = document.querySelector('#findEnd');//页面上的渲染位置
    findEnd.innerHTML = youMoney;
}
```

当我们需要获取用户的金钱数时，我们调用find方法，先确定需要获取的人是谁，再通过`getItem`方法获取本地存储中的键值，再渲染到页面上。

这样我们就实现了一个简单的本地存储，如果需要进行其他的操作，像删除本地存储这些，这里示例删除数据

**删除指定数据**

```js
//delete localStorage.myName;
localStorage.removeItem(myName)
```

有两种方法能够实现删除的操作，使用`delete` 和`removeItem`删除指定的数据

其他的就不过多赘述了，方法一样。

----

从上面的操作中我们会发现我们需要新建过多的存储信息，每一个用户信息都我们要为他们新创建一个本地存储，更多情况下我们存储的数据会更复杂，这样的方法就会变的更加的麻烦

![local](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/local.png)

**就像图片中的这样**，这样的方式并不是友好的，因此我们需要优化它。

#### 2.1.2 对象存储方式

在需要对单个用户的大量信息进行存储时，我们可以采用==对象存储方式==进行存储，将一个用户的姓名，年龄，性别等信息，存入对象中再保存

```js
let user = {
    username: 'ljc',
    age: '20',
    sickName : '小猴',
    sex : '男'
}
user = JSON.stringify(user)
localStorage.setItem('my', user);
```

由于==只能==存储字符串类型的数据，我们采用` JSON.stringify`方法将对象转化为字符串，存储结果的value为：

` {"username":"ljc","age":"20","sickName":"小猴","sex":"男"}`

这样我们就实现了我们想要的操作。

- 当我们需要存储更多的用户数据时，而不单单是一个用户数据时，我们可以继续在上面的代码中优化，我们可以将用户数据存放于数组中，在使用`JSON.stringify`将数组转化为字符串，从而实现，在上面代码的基础上进行修改

```js
let userArr = []
userArr.push(user) 
userArr = JSON.stringify(userArr)
```

下面我们来看看储存结果

`[{"username":"ljc","age":"20","sickName":"小猴","sex":"男"}]`

可以看到现在的value中存放的是一个数组，我们可以==通过push方法==继续的追加用户信息，从而实现了想要的优化

在我们获取本地存储的数据时，需要将获取数据经过`JSON.parse`==转化为对象==再使用

### 2.2 sessionStorage对象

又叫临时存储，顾名思义只是暂时存储，在浏览器会话窗口关闭后，会全部清除

> 操作方法和`localStorage`完全一致，就不过多阐述

## 3.几者的区别

1. cookie在每次请求时都会被发送到服务器，这样会浪费带宽
2. cookie中的操作方法需要自己封装，web storage中有`setItem`，`getItem`等方法
3. cookie能够与服务器端交互，web Storage只是将数据保存在本地
4. 存储数据的大小限制不一样，`cookie`一般4k，`web Storage`一般5M
5. 数据的生命周期不一致，cookie能设置时间，本地存储是永久性的，临时存储可以说是一次性的
6. 作用域不同，`sessionStorage`不在不同的浏览器窗口中共享，`localstorage`和`cookie`在所有同源窗口中都是共享的；

----

以上就是关于客户端存储的几种常用方式的归纳，希望看完的你能有所收获~

> 参考文献：JavaScript高级程序设计（第4版）

