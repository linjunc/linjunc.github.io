# 场景应用题

## 写一个加法函数(sum)，使他可以同时支持sum(x,y)和sum(x)(y)两种调用方式

:::tip
写一个按照下面两种方式都能正常调用的 sum 方法

```javascript
console.log(sum(2,3)); // 输出5
console.log(sum(2)(3)); // 输出5
```

:::
方法一

```js
function sum(...args) {
    const fn = (...args2) => {
        return sum.apply(this, args.concat(args2));
    }
    fn.toString = () => args.reduce((a, b) => a + b)
    return fn
}
```
