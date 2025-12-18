# JavaScript 面试题


---

## 什么是闭包（Closure）？

### 简要回答

闭包是指一个函数能够访问并记住其外部作用域中的变量，即使这个外部函数已经执行完毕。简单来说，**闭包 = 函数 + 函数能够访问的外部变量**。

### 详细解答

闭包的形成需要满足三个条件：
1. **函数嵌套**：一个函数内部定义了另一个函数
2. **内部函数引用外部变量**：内部函数访问了外部函数的变量
3. **内部函数被返回或传递**：内部函数被返回到外部作用域或作为参数传递

**核心原理**：JavaScript 的作用域链机制。当内部函数被创建时，它会保存对外部函数作用域的引用，即使外部函数执行完毕，这些变量也不会被垃圾回收。

### 代码示例

#### 1. 基础闭包示例

```javascript
function outer() {
  let count = 0; // 外部变量
  
  function inner() {
    count++; // 内部函数访问外部变量
    console.log(count);
  }
  
  return inner; // 返回内部函数
}

const counter = outer();
counter(); // 输出: 1
counter(); // 输出: 2
counter(); // 输出: 3
// count 变量被 inner 函数"记住"了
```

#### 2. 创建私有变量

```javascript
function createPerson(name) {
  let age = 0; // 私有变量
  
  return {
    getName: function() {
      return name;
    },
    getAge: function() {
      return age;
    },
    growUp: function() {
      age++;
    }
  };
}

const person = createPerson('张三');
console.log(person.getName()); // '张三'
console.log(person.getAge());  // 0
person.growUp();
console.log(person.getAge());  // 1
console.log(person.age);       // undefined（无法直接访问）
```

#### 3. 循环中的闭包陷阱

```javascript
// ❌ 错误示例
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 输出: 3, 3, 3
  }, 1000);
}

// ✅ 使用闭包解决
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // 输出: 0, 1, 2
    }, 1000);
  })(i);
}

// ✅ 使用 let 解决（推荐）
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 输出: 0, 1, 2
  }, 1000);
}
```

### 应用场景

1. **数据封装和私有变量**
   - 创建模块化代码，隐藏内部实现细节
   - 实现类似面向对象的私有属性

2. **函数工厂**
   ```javascript
   function multiply(x) {
     return function(y) {
       return x * y;
     };
   }
   
   const double = multiply(2);
   const triple = multiply(3);
   console.log(double(5)); // 10
   console.log(triple(5)); // 15
   ```

3. **回调函数和事件处理**
   ```javascript
   function setupButton(buttonId) {
     const button = document.getElementById(buttonId);
     let clickCount = 0;
     
     button.addEventListener('click', function() {
       clickCount++;
       console.log(`点击了 ${clickCount} 次`);
     });
   }
   ```

4. **函数柯里化**
   ```javascript
   function curry(fn) {
     return function curried(...args) {
       if (args.length >= fn.length) {
         return fn.apply(this, args);
       } else {
         return function(...nextArgs) {
           return curried.apply(this, args.concat(nextArgs));
         };
       }
     };
   }
   ```

5. **防抖和节流**
   ```javascript
   function debounce(fn, delay) {
     let timer = null; // 闭包变量
     return function(...args) {
       clearTimeout(timer);
       timer = setTimeout(() => fn.apply(this, args), delay);
     };
   }
   ```

### 注意事项

1. **内存泄漏风险**
   - 闭包会使外部变量无法被垃圾回收，可能导致内存占用增加
   - 不再使用的闭包应及时解除引用

2. **性能考虑**
   - 闭包会增加内存开销
   - 避免在循环中创建大量闭包

3. **this 指向问题**
   ```javascript
   const obj = {
     name: '对象',
     getName: function() {
       return function() {
         return this.name; // this 指向丢失
       };
     }
   };
   
   // 解决方案：使用箭头函数或保存 this
   const obj2 = {
     name: '对象',
     getName: function() {
       return () => this.name; // 箭头函数继承外层 this
     }
   };
   ```

### 相关问题

- 作用域链是如何工作的？
- 闭包和垃圾回收的关系？
- 如何避免闭包造成的内存泄漏？
- let、const 和 var 在闭包中的区别？
