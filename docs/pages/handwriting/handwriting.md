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

## 4. 数组扁平化

## 5. 浅拷贝

## 6. 深拷贝

## 7. 事件总线 发布订阅模式

## 8. 字符串模板

## 9. 图片懒加载

## 10. 函数防抖

## 11. 函数节流

## 12. 函数柯里化

## 13. 偏函数

## 14. JSONP

## 15. AJAX

## 16. 实现 call、apply、bind

## 17. 实现 new 关键字

## 18. 实现 instanceof 关键字

## 20. 实现 Object.create

## 21. 实现 Object.assign

## 22. 实现 Object.stringify

## 23. 实现 JSON.parse
