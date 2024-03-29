# Q & A

## startTransition 相比 setTimeout 的优势和异同是什么？

- 一方面：`startTransition` 的处理逻辑和 setTimeout 有一个很重要的区别，setTimeout 是异步延时执行，而 `startTransition` 的回调函数是同步执行的。
在 `startTransition` 之中任何更新，都会标记上 transition，React 将在更新的时候，判断这个标记来决定是否完成此次更新。所以 Transition 可以理解成比 setTimeout 更早的更新。但是同时要保证 ui 的正常响应，在性能好的设备上，transition 两次更新的延迟会很小，但是在慢的设备上，延时会很大，但是不会影响 UI 的响应。

- 另一方面，就是通过上面例子，可以看到，对于渲染并发的场景下，`setTimeout` 仍然会使页面卡顿。因为超时后，还会执行 setTimeout 的任务，它们与用户交互同样属于宏任务，所以仍然会阻止页面的交互。
那么 transition 就不同了，在 conCurrent mode 下，`startTransition` 是可以中断渲染的 ，所以它不会让页面卡顿，React 让这些任务，在浏览器空闲时间执行，所以上述输入 input 内容时，`startTransition` 会优先处理 input 值的更新，而之后才是列表的渲染

## useLayoutEffect 与 useEffect 的区别是什么？

`useLayoutEffect`：这个钩子函数会在 **DOM 更新之前同步地执行**。它会在组件渲染完毕后、DOM 更新之前被调用，因此它的执行会**阻塞页面渲染**。这个钩子函数提供了一种在渲染之前同步更新 DOM 的方法，可以用于实现一些需要计算布局的操作，例如测量 DOM 尺寸、更新滚动位置等。

`useEffect`：这个钩子函数会在组件渲染完毕后异步地执行。它会在 DOM 更新之后被调用，因此它不会阻塞页面渲染。它通常用于处理一些不需要同步更新 DOM 的副作用，例如数据获取、订阅事件等。由于它是异步执行的，因此它对页面性能的影响较小。

两者都能获取到最新的 DOM 数据，但是 `useLayoutEffect` 会在浏览器绘制之前执行，因此会阻塞浏览器的渲染，所以会影响页面的性能。而 `useEffect` 则不会阻塞浏览器的渲染，所以不会影响页面的性能。

## （追问）什么情况下使用 useLayoutEffect？

1. 测量 DOM 尺寸

`useLayoutEffect` 可以用于计算 DOM 元素的尺寸。在组件渲染前测量 DOM 元素的大小可以保证后续的计算和布局能够正确地进行，**避免由于计算延时导致的页面抖动问题。**

2. 更新滚动位置
如果需要同步重新计算滚动位置，可以使用 `useLayoutEffect` 实现。在组件渲染完成后，这个钩子函数可以确保正确计算和更新滚动位置。

3. 更新 DOM 样式
使用 `useLayoutEffect` 可以同步更新 DOM 样式，以确保正确计算布局。在组件渲染完成之后立即更新样式可以**防止可能存在的样式闪烁问题。**
