# 手写题

- 对常见的需求进行手写实现，提高项目的开发效率
- 对现有关键字和 API 实现，巩固自己的基础，同时能够熟悉 ployfill 实现

[参考](https://juejin.cn/post/6946022649768181774#heading-0)

## 1. 数据类型判断

```js
const typeOf = (obj) => {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}
// test
console.log(typeOf([])) // 'array'
console.log(typeOf({})) // 'object'
```

## 2. 继承

之前写的[文章](https://juejin.cn/post/6999513278229512200)

### 原型链继承

存在的问题是：

- 对于引用数据类型数据会被子类共享，也就是改一个其他都会改
- 创建子类实例时，无法向父类构造函数传参，不够灵活。

```js
// 原型链继承
function Father() {
    this.name = 'father' 
}

Father.prototype.say = () => {
    console.log('I am Father')
}

function Son() {}

Son.prototype = new Father()

console.log(Son.prototype) // Father { name: 'father' }
```

### 借助构造函数继承

存在的问题：

- 不能继承父类的原型属性和方法
- 父类方法无法复用，每次实例化子类，都要执行父类函数，重新声明父类所定义的方法，无法复用

```js
function Father() {
    this.a = [1, 2, 3, 4]
}

function Son() {
    Father.call(this)
}
let son1 = new Son()
let son2 = new Son()
son1.a.push(9)
console.log(son1, son2)
```

### 组合继承

存在的问题：

- 调用了两次的父类函数，有性能问题
- 由于两次调用，会造成实例和原型上有相同的属性或方法

```js
function Father() {
    this.a = [1, 2, 3, 4]
}
Father.prototype.say = function () {
    console.log('I am Father')
}

function Son() {
    Father.call(this)
}
Son.prototype = new Father()

let son1 = new Son()
let son2 = new Son()
```

### 寄生组合继承

采用 `Object.create` 来重写子类的原型，这样就减少了对父类的调用

存在的问题：

- 子类的原型会被重写

```js
function Father() {
    this.a = [1, 2, 3, 4]
}
Father.prototype.say = function () {
    console.log(111);
}
function Son() {
    Father.call(this)
}
Son.prototype = Object.create(Father)
let son1 = new Son()
let son2 = new Son()
```

### class 实现继承

由于 ES6 之前的继承过于复杂，代码太多，再 ES6 中引入了一种新的继承方式 `extends` 继承

采用 `extends` 关键字来实现继承

```js
class Father {}
class Son extends Father {
    constructor() {
        super()
    }
}
```

## 3. 数组去重

### ES5 实现

```js
function unique(arr) {
    return arr.filter((item, index, array) => array.indexOf(item) === index)
}
```

### ES6 实现

```js
const unique = arr => [...new Set(arr)]
```

## 4. 数组扁平化

### API 实现

```js
const arr = [1, [2, [3]]]
console.log(arr.flat(2)) // [ 1, 2, 3 ]
```

### ES5 实现

```js
function flatten (arr) {
    let result = []
    const len = arr.length
    for(let i = 0; i < len; i++) {
        if(Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]));
        }else {
            result.push(arr[i]);
        }
    }
    return result
}
```

### ES6 实现

```js
function flatten (arr) {
    while(arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
```

## 5. 浅拷贝

:::info 什么是浅拷贝?
创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。
:::

只考虑对象类型，并且只有一层那种

```js
function shallowCopy (obj) {
    if(obj !== 'object') return
    const newObj = obj instanceof Array ? [] : {}
    for(const key in obj) {
        if(obj.hasOwnProperty(key)) {
            newObj[key] = obj[key]
        }
    }
    return newObj
}
```

::: tip 特别注意
采用 `Object.assign` 或者扩展运算符进行浅拷贝的话，会有以下的限制

- 不会拷贝对象的继承属性
- 不会拷贝对象的可枚举属性
- 可以拷贝 `Symbol` 类型的属性
:::

## 6. 深拷贝

:::info 什么是深拷贝
将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象
:::

### 乞丐版

平时用的比较多的方式

当然也有很多的缺陷，比如拷贝其他引用类型、拷贝函数、循环引用等问题

```js
JSON.parse(JSON.stringify(obj))
```

:::tip 值得注意的事
`JSON.stringify` 有局限性

- 会忽略 `undefined`
- 会忽略 `symbol`
- 不能序列化函数
- 不能拷贝不可枚举属性
- 不能拷贝对象的原型链
- 内置对象存在问题
- 不能解决循环引用的问题
:::

### API 版本

现在，`structuredClone` API 已经成为了一个 HTML 规范中的标准提案，用它可以轻松实现一个深拷贝，并且也默认解决了循环引用等问题、支持了很多默认的数据类型。

```js
// Create an object with a value and a circular reference to itself.
const original = { name: "MDN" };
original.itself = original;

// Clone it
const clone = structuredClone(original);
```

并且，相比 JSON.parse() ，structuredClone API 的性能更好，特别是在处理一些更大复杂的对象的时候，所以我们可以用它来作为代码里深拷贝的默认方法啦，为了兼容性考虑，可以用 JSON.stringify 或者其他工具函数作为备用。

### 简单版

简单版，只考虑普通对象属性，不考虑内置对象和函数

```js
function deepClone(obj) {
    if(typeof obj !== 'object') return
    const newObj = obj instanceof Array ? [] : {}
    for(const key in obj) {
        if(obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
        }
    }
}
```

### 2.0 简单版

```js
// 简版
function deepClone (target, hash = new WeakMap()) { // 额外开辟一个存储空间WeakMap来存储当前对象
  if (target === null) return target
  if (target instanceof Date) return new Date(target)
  if (target instanceof RegExp) return new RegExp(target)
  if (target instanceof HTMLElement) return target // 处理 DOM元素

  if (typeof target !== 'object') return target

  if (hash.get(target)) return hash.get(target) // 当需要拷贝当前对象时，先去存储空间中找，如果有的话直接返回
  const cloneTarget = new target.constructor()
  hash.set(target, cloneTarget) // 如果存储空间中没有就存进 hash 里

  Reflect.ownKeys(target).forEach(key => {
    cloneTarget[key] = deepClone(target[key], hash) // 递归拷贝每一层
  })
  return cloneTarget
}
```

### 复杂版

::: details 完整版
完整代码

```js
// 完整版
const getType = (obj) => Object.prototype.toString.call(obj);
const isObject = (target) =>
  (typeof target === "object" || typeof target === "function") &&
  target !== null;

const canTraverse = {
  "[object Map]": true,
  "[object Set]": true,
  "[object Array]": true,
  "[object Object]": true,
  "[object Arguments]": true,
};
const mapTag = "[object Map]";
const setTag = "[object Set]";
const boolTag = "[object Boolean]";
const numberTag = "[object Number]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";
const dateTag = "[object Date]";
const errorTag = "[object Error]";
const regexpTag = "[object RegExp]";
const funcTag = "[object Function]";

const handleRegExp = (target) => {
  const { source, flags } = target;
  return new target.constructor(source, flags);
};

const handleFunc = (func) => {
  // 箭头函数直接返回自身
  if (!func.prototype) return func;
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  // 分别匹配 函数参数 和 函数体
  const param = paramReg.exec(funcString);
  const body = bodyReg.exec(funcString);
  if (!body) return null;
  if (param) {
    const paramArr = param[0].split(",");
    return new Function(...paramArr, body[0]);
  } else {
    return new Function(body[0]);
  }
};

const handleNotTraverse = (target, tag) => {
  const Ctor = target.constructor;
  switch (tag) {
    case boolTag:
      return new Object(Boolean.prototype.valueOf.call(target));
    case numberTag:
      return new Object(Number.prototype.valueOf.call(target));
    case stringTag:
      return new Object(String.prototype.valueOf.call(target));
    case symbolTag:
      return new Object(Symbol.prototype.valueOf.call(target));
    case errorTag:
    case dateTag:
      return new Ctor(target);
    case regexpTag:
      return handleRegExp(target);
    case funcTag:
      return handleFunc(target);
    default:
      return new Ctor(target);
  }
};

const deepClone = (target, map = new WeakMap()) => {
  if (!isObject(target)) return target;
  let type = getType(target);
  let cloneTarget;
  if (!canTraverse[type]) {
    // 处理不能遍历的对象，通过对应的类型来实例化它
    return handleNotTraverse(target, type);
  } else {
    // 这波操作相当关键，可以保证对象的原型不丢失！
    let ctor = target.constructor;
    cloneTarget = new ctor();
  }
    // 解循环引用，用 weakMap 来保存引用
  if (map.get(target)) return target;
  map.set(target, true);

  if (type === mapTag) {
    //处理Map
    target.forEach((item, key) => {
      cloneTarget.set(deepClone(key, map), deepClone(item, map));
    });
  }

  if (type === setTag) {
    //处理Set
    target.forEach((item) => {
      cloneTarget.add(deepClone(item, map));
    });
  }

  // 处理数组和对象
  for (let prop in target) {
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = deepClone(target[prop], map);
    }
  }
  return cloneTarget;
};

```

测试数据

```js
const map = new Map();
map.set("key", "value");
map.set("crucials", "male");

const set = new Set();
set.add("crucials");
set.add("male");

const target = {
  field1: 1,
  field2: undefined,
  field3: {
   child: "child",
  },
  field4: [2, 4, 8],
  empty: null,
  map,
  set,
  bool: new Boolean(true),
  num: new Number(2),
  str: new String(2),
  symbol: Object(Symbol(1)),
  date: new Date(),
  reg: /\d+/,
  error: new Error(),
  func1: () => {
   console.log("crucials");
  },
  func2: function (a, b) {
  return a + b;
  },
};

```

:::

## 7. 事件总线 发布订阅模式

```js
class EventEmitter {
    constructor() {
        this.cache = {}
    }
    on(name, fn) {
        if(this.cache[name]) {
            this.cache[name].push(fn)
        }else {
            this.cache[name] = [fn]
        }
    }
    off(name, fn) {
        const tasks = this.cache[name]
        if(tasks) {
            const index = tasks.findIndex(f => f.name === fn || f.callback === fn)
            if(index >= 0) {
                tasks.splice(index, 1)
            }
        }
    }
    emit(name, once = false, ...args) {
        if(this.cache[name]) {
            const tasks = this.cache[name].slice()
            for(const fn of tasks) {
                fn(...args)
            }
            if(once) {
                delete this.cache[name]
            }
        }
    }
}

```

:::details 测试

```js
// test
const eventBus = new EventEmitter()

const fn = (name) => {
    console.log('hello', name)
}

eventBus.on('aaa', fn)
eventBus.emit('aaa', false, 'ljc')
```

:::

## 8. 模板字符串

通过正则表达式来匹配

```js
function render(template, data) {
    const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
    if (reg.test(template)) { // 判断模板里是否有模板字符串
        const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
        template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
        return render(template, data); // 递归的渲染并返回渲染后的结构
    }
    return template; // 如果模板没有模板字符串直接返回
}
```

:::details 测试

```js
const template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
const person = {
    name: 'ljc',
    age: 21
}
console.log(render(template, person)); // 我是ljc，年龄21，性别undefined
```

:::

## 9. 图片懒加载

- 图片全部加载完成后移除事件监听
- 加载完的图片，从 imgList 移除
第一种，监听 `scroll` 事件，采用 `getBoundingClientRect` 来判断图片是否进入视口中，来设置图片真正的 scroll

```js
const imgList = [...document.querySelectorAll('img')];
const length = imgList.length;

const imgLazyLoad = (() => {
    let count = 0;
    return () => {
        const deleteIndexList = [];
        imgList.forEach((img, index) => {
            const rect = img.getBoundingClientRect()
            if(rect.top < window.innerHeight) {
                img.src = img.dataset.src
                deleteIndexList.push(index)
                count++;
                if(count === length) {
                    document.removeEventListener('scroll', imgLazyLoad)
                }
            }
        })
        imgList = imgList.filter((_, index) => !deleteIndexList.includes(index));
    }
})()
```

第二种，采用 `intersectionObserver` 来实现，实例化 `intersectionObserver`，并观察所有的 img 标签

当 img 标签进入可视区域内会执行实例化时的回调，同时传递 entries 参数，保存着实例观察的所有元素的状态，当元素进入可视区域，将真正的图片赋值给当前的 img 标签，同时解除观察

```js
const imgLazyLoad = () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.intersectionRatio > 0) {
                entry.target.src = entry.target.dataset.src
                observer.unobserve(entry.target)
            }
        })
    })
    imgList.forEach(img => {
        observer.observe(img)
    })
}
```

## 10. 函数防抖

:::tip
在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时
:::

运用场景：防止多次提交，只执行最后一次提交。联想搜索词的功能

原始版本：

```js
const debounce = (fn, wait = 50) => {
    let timer = null;
    return function(...args) {
        if(timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, wait);
    }
}
```

高级版本：

- 支持立即执行
- 可能有返回值
- 支持取消功能

```js
function debounce(func, wait, immediate) {
    let timeout, result;
    const debounced = function() {
        const context = this;
        const args = arguments;
        if(timeout) clearTimeout(timeout);
        if(immediate) {
            let callNow = !timeout 
            timeout = setTimeout(function() {
                timeout = null;
            }, wait);
            if(callNow) result = func.apply(context, args);
        }else {
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        }
        return result;
    }
    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    }
    return debounced;
}
```

## 11. 函数节流

:::tip
规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效
:::

使用场景：

- 拖拽：固定时间只执行一次，防止高频次触发位置变动
- 缩放：resize
- 动画：避免短时间多次触发引起性能问题

非常好的[一篇文章](https://github.com/mqyqingfeng/Blog/issues/26)

普通版：使用时间戳来实现，立即执行一次，然后每 N 秒执行一次。

```js
const throttle = (fn, wait = 50) => {
    let lastTime = 0;
    return function(...args) {
        let now = +new Date() // 获取当前的时间戳
        if(now - lastTime > wait) {
            lastTime = now
            fn.apply(this, args)
        }
    }
}
```

普通版 2.0，定时器实现

```js
const throttle = (fn, wait = 50) => {
    let timeout;
    return function () {
        context = this
        args = arguments
        if(!timeout) {
            timeout = setTimeout(function() {
                timeout = null
                fn.apply(context, args)
            }, wait)
        }
    }
}
```

高级版：

- 支持取消节流
- 通过 `option.leading` 参数决定是否可以立即执行一次
- 通过 `option.trailing` 参数表示结束时是否还要执行一次
- 默认是 true，不能同时为 false

```js
function throttle(func, wait, options = {}) {
    let timeout, context, args;
    let previous = 0;

    let later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

    let throttled = function() {
        let now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        let remaining = wait - (now - previous);
        context = this;
        args = arguments;
        // 如果没有剩余的时间了或者你改了系统时间
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };
    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    }
    return throttled;
}
```

:::tip 提示
后续考虑学习以下 lodash 的 debounce
:::

## 12. 函数柯里化

:::tip 什么是柯里化
其实就是将使用多个参数的函数转换成一系列使用一个参数的函数的技术。

```js
function add(a, b, c) {
    return a + b + c
}
add(1, 2, 3)
let addCurry = curry(add)
addCurry(1)(2)(3)
```

:::

```js
function curry(fn) {
    const judge = (...args) => {
        if(args.length === fn.length) return fn(...args);
        return (...arg) => judge(...args, ...arg)
    }
    return judge
}
```

## 13. 偏函数

:::tip 什么是偏函数
偏函数就是将一个有 n 个参数的函数转换成固定 x 参的函数，剩余参数 n - x 个参数将会在下次调用中全部传入

可以理解为能够提前**预设一些参数**的值

```js
function add(a, b, c) {
    return a + b + c
}
const partialAdd = partial(add, 1)
partialAdd(2, 3)
```

:::

提前传入一个参数，返回已经带了这个参数的函数

```js
function partial(fn, ...args) {
    return (...arg) => {
        return fn(...args, ...arg)
    }
}
```

## 14. JSONP

在我们学习 Ajax 时，都会遇到跨域问题，这时候都会听到采用 JSONP 来解决

:::tip JSONP 核心原理
script 标签不受同源策略约束，所以可以用来进行跨域请求，优点是兼容性好，但是只能用于 GET 请求；
:::

```js
const jsonp = ({ url, params, callbackName }) => {
    // 生成 url 链接
    const generateUrl = () => {
        let dataSrc = ''
        // get 请求拼接 params
        for(const key in params) {
            if(params.hasOwnProperty(key)) {
                dataSrc += `${key}=${params[key]}`
            }
        }
        dataSrc += `callback=${callbackName}`
        return `${url}?${dataSrc}`
    }
    return new Promise((resolve, reject) => {
        const scriptElement = document.createElement('script')
        scriptElement.src = generateUrl()
        // 服务器返回字符串 `${callbackName}(${服务器的数据})`，浏览器解析即可执行
        window.[callbackName] = data => {
            resolve(data)
            document.removeChild(scriptElement)
        }
    })
}
```

## 15. 实现 AJAX 请求

异步通信，从服务端获取 XML 文档从中提取数据，再更新到网页的对应部分，不刷新整个页面

:::tip 创建 AJAX 请求的步骤

1. 创建 `XMLHttpRequest` 对象
2. 在对象上使用 open 方法创建一个 HTTP 请求，open 方法需要的参数时请求的方法、请求的地址、是否异步、和用户的认证信息
3. 在发送请求前，可以为这个对象添加一些信息和监听函数。
   1. 一个 `XMLHttpRequest` 对象上有 5 个状态，它的状态变化时会触发 `onReadyStateChange` 事件，可以通过监听这个事件来获取状态的变化，来处理请求成功的结果
   2. 当对象的 `readyState` 为 4 时，表示请求已经完成，可以通过 status 来判断请求是否成功
   3. 如果状态时 2xx 或者 304，表示请求成功，可以通过 `responseText` 或者 `responseXML` 来获取服务器返回的数据
4. 调用 sent 方法来向服务器发送请求
:::

```js
const SERVER_URL = "/server"
const xhr = new XMLHttpRequest()
// 创建 HTTP 请求
xhr.open("GET", SERVER_URL, true)
// 监听状态变化
xhr.onreadystatechange = function() {
    if(this.readyState !== 4) return;
    if(this.status === 200) {
        handleSuccess(this.response)
    }else {
        console.error(this.statusText)
    }
}
// 设置请求失败时的监听函数
xhr.onerror = function() {
    console.error(this.statusText)
}
// 设置请求头信息
xhr.responseType = "json"
xhr.setRequestHeader("Accept", "application/json")
// 发送 HTTP 请求
xhr.send(null)
```

## 16. Promise 封装 AJAX 请求

```js
const request = function(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.setRequestHeader('CONTENT-TYPE', 'application/json');
        xhr.onreadystatechange = () => {
            if(xhr.readyState !== 4) return;
            if(xhr.status === 200 || xhr.status === 304) {
                resolve(xhr.responseText)
            }else {
                reject(new Error(xhr.responseText))
            }
        }
        xhr.responseText = 'json';
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send()
    })
}
```

## 17. 实现 call

## 18. 实现 apply

## 19. 实现 bind

## 17. 实现 new 关键字

## 18. 实现 instanceof 关键字

## 20. 实现 Object.create

## 21. 实现 Object.assign

## 22. 实现 Object.stringify

## 23. 实现 JSON.parse
