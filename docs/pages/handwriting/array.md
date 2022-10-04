# 数组的方法

## 1. 数组改变自身的方法

:::tip
会改变自身的方法有 9 个

`push`、`pop`、`reverse`、`shift`、`sort`、`splice`、`unshift`、以及 ES6 新增的 `copyWithIn` 和 `fill` 方法
:::

1、 **shift**：将第一个元素删除并且返回删除元素，空即为undefined

```js
let a = arr.shift()
console.log(a)         // a
console.log(arr)       // ['b', 'c', 'd']
```

2、**unshift**：向数组开头添加元素，并返回新的长度

```js
let a = arr.unshift(0)
console.log(a)        // 5 返回数组长度
console.log(arr)      // [0, 'a', 'b', 'c', 'd']
```

3、**pop**：删除最后一个并返回删除的元素

```js
let a = arr.pop()
console.log(a)        // d
console.log(arr)      // ['a', 'b', 'c']
```

4、**push**：向数组末尾添加元素，并返回新的长度

```js
let a = arr.push('f')
console.log(a)        // 5 返回数组长度
console.log(arr)      // ['a', 'b', 'c', 'd', 'f']
```

5、**reverse**：颠倒数组顺序

```js
let a = arr.reverse()
console.log(a)        // ["d", "c", "b", "a"]
console.log(arr)      // ["d", "c", "b", "a"]
```

6、**sort**：对数组排序

```js
let arr = ['c', 'a', 'd', 'b']
let a = arr.sort()
console.log(a)        // ['a', 'b', 'c', 'd']
console.log(arr)      // ['a', 'b', 'c', 'd']
```

7、**splice**:splice(start,length,item)删，增，替换数组元素，返回被删除数组，无删除则不返回

```js
let a = arr.splice(1, 2, 'f')
console.log(a)        // 返回被删除的元素数组['b', 'c'] 
console.log(arr)      // 在添加的地方添加元素后的数组["a", "f", "d"]
```

8、**copyWithin**:方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

```js
let a = arr.copyWithin(1, 2,3)
console.log(a)  //返回被复制的元素数组 ['a', 'c', 'c', 'd']
console.log(arr)  //原元素数组已经改变 ['a', 'c', 'c', 'd']
```

9、**fill**:用一个元素填充原来的数组

```js
let a = arr.fill('e', 2, 4);
console.log(a) // 返回它会改变调用它的 `this` 对象本身, 然后返回它['a', 'b', 'e', 'e'] 
console.log(arr) // ['a', 'b', 'e', 'e']
```

## 2. 数组不改变自身的方法

:::tip
concat, join, slice, map,filter, forEach, some, every, reduce 等不改变原数组
:::

1、**concat**：`targetArr.concat(otherArr\[,anyOtherArr\])` 连接多个数组，返回新的数组

```js
let a = arr.concat(['e', 'f'])
console.log(a)        // 新数组 ["a", "b", "c", "d", "e", "f"]
console.log(arr)      // ["a", "b", "c", "d"] 不变
```

2、**join**：将数组中所有元素以参数作为分隔符放入一个字符

```js
let a = arr.join('-')
console.log(a)        // 字符串 a-b-c-d
console.log(arr)      // ["a", "b", "c", "d"] 不变
```

3、**slice**：slice(start,end)，返回选定元素

```js
let a = arr.slice(1)
console.log(a)        // ["b", "c", "d"]
console.log(arr)      // ["a", "b", "c", "d"] 不变
```

## 3. 数组扁平化

### 递归方法

```js
function flatten(arr) {
    let result = [];
    for(let i = 0; i < arr.length; i++) {
        if(Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]));
        }else {
            result.push(arr[i]);
        }
    }
    return result;
}
```

### 迭代方法

```js
function flatten(arr) {
    return arr.reduce((prev, next) => {
        return prev.concat(Array.isArray(next) ? flatten(next) : next);
    }, []);
}
```

### 扩展运算符

```js
function flatten(arr) {
    while(arr.some(item => Array.isArray(item)) {
        arr = [].concat(...arr)
    }
}
```

### split 和 toString

缺点是数字会被全部转成字符串

```js
function flatten(arr) {
    return arr.toString().split(',')
}
```

### ES6 Flat

```js
function flatten(arr) {
    return arr.flat(Infinity)
}
```

### 可选降几层

```js
function flatDeep(arr, d = 1) {
    return d > 0
        ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
        : arr.slice()
}
```

## 4. 数组去重

:::tip
性能最好的是 Set，最差的方法是 双循环

性能排序：`Set` > `map` > `Array.sort` + 一层遍历去重 > `filter` + `indexOf` > double for cycle
:::

### 双循环

```js
function distinct(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = i + 1; j < arr.length; j++) {
            if(arr[j] === arr[i]) {
                arr.splice(j, 1)
                j--; // 数组长度变了
            }
        }
    }
    return arr;
}
```

### filter 和 indexOf

```js
function distinct(a, b) {
    const arr = a.concat(b)
    return arr.filter((item, index) => {
        return arr.indexOf(item) === index;
    })
}
```

### Set

```js
const array = [1, 2, 2, 3, 1]
const res = [...new Set(array)];
```

### Map

```js
function uniqueArray(arr) {
    const map = new Map()
    const res = []
    for(let i = 0; i < arr.length; i++) {
        if(!map.get(arr[i])) {
            res.push(arr[i])
            map.set(arr[i], true)
        }
    }
    return res
}
```

### Object 对象

```js
function distinct(arr) {
    const obj = {}
    return arr.filter(item =>
        obj.hasOwnProperty(typeof item + item)
        ? false
        : (obj[typeof item + item] = true) // 存储有的值
    )
}
```

### sort 排序

```js
function unique(arr) {
    arr = arr.sort()
    let pointer = 0
    while(arr[pointer]) {
        if(arr[pointer]  != arr[pointer + 1]) { // 不相等，指针下移
            pointe++
        }else {
            arr.splice(pointer + 1, 1)
        }
    }
    return arr
}
```

## 5. flat

```js
function flat(arr, depth) {
    if(!arr || depth < 0) return arr;
    return arr.reduce((prev, next) => {
        return prev.concat(Array.isArray(next) ? flat(next, depth - 1) : next)
    }, [])
}
```

## 6. push

```js
Array.prototype.push = function() {
    for(let i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i];
    }
    return this.length // 返回长度
}
```

## 7. filter

```js
Array.prototype.filter = function(fn) {
    if(typeof fn !== 'function') {
        console.error('type Error')
    }
    const res = []
    for(let i = 0; i < this.length; i++) {
        fn(this[i] && res.push(this[i]))
    }
    return res
}
```

## 8. map

```js
Array.prototype.map = function(cb, context) {
    const arr = Array.prototype.slice.call(this)
    const res = []
    for(let i = 0; i < arr.length; i++) {
        res.push(cb.call(context, arr[i], i, this))
    }
    return res
}
```

## 9. reduce

## 10. splice

## 11. indexOf
