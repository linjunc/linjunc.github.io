# 面试题汇总

> 来自于自己的面试，以及牛客

## Promise 输出结果

下面代码运行结果，并解释原因

```js
Promise.resolve("a").then("b").then(Promise.resolve("c")).then(console.log);
```

:::tip
输出 a

首先 promise 的状态是不可扭转的，`Promise.resolve("a")` 返回一个状态为已解决（fulfilled）且结果值为 "a" 的 Promise 对象。

`then("b")` 中 "b" **并非一个函数**，这里的 "b" 会被忽略。根据 Promise 规范，如果 then 方法传入的参数不是函数，将使用**默认透传处理器**。这意味着该 Promise 对象的结果值保持不变，**仍为 "a"**。

`Promise.resolve("c")` 同理，不是一个函数，因此最终会输出 a
:::

### （追问）：如何才能输出 c

可以在 then 方法中传入一个函数，该函数返回 `Promise.resolve("c")`，例如：

```js
Promise.resolve("a")
  .then(() => Promise.resolve("c"))
  .then(console.log);

```

该函数通过箭头函数隐式地返回了 `Promise.resolve("c")` 的结果。