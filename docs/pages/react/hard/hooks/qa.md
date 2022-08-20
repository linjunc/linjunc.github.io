# Q & A

## startTransition 相比 setTimeout 的优势和异同是什么？

- 一方面：`startTransition` 的处理逻辑和 setTimeout 有一个很重要的区别，setTimeout 是异步延时执行，而 `startTransition` 的回调函数是同步执行的。
在 `startTransition` 之中任何更新，都会标记上 transition，React 将在更新的时候，判断这个标记来决定是否完成此次更新。所以 Transition 可以理解成比 setTimeout 更早的更新。但是同时要保证 ui 的正常响应，在性能好的设备上，transition 两次更新的延迟会很小，但是在慢的设备上，延时会很大，但是不会影响 UI 的响应。

- 另一方面，就是通过上面例子，可以看到，对于渲染并发的场景下，`setTimeout` 仍然会使页面卡顿。因为超时后，还会执行 setTimeout 的任务，它们与用户交互同样属于宏任务，所以仍然会阻止页面的交互。
那么 transition 就不同了，在 conCurrent mode 下，`startTransition` 是可以中断渲染的 ，所以它不会让页面卡顿，React 让这些任务，在浏览器空闲时间执行，所以上述输入 input 内容时，`startTransition` 会优先处理 input 值的更新，而之后才是列表的渲染
