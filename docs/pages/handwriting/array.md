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

## 4. 数组去重

## 5. flat

## 6. push

## 7. filter

## 8. map

## 9. reduce

## 10. splice

## 11. indexOf
