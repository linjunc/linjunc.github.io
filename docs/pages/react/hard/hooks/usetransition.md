# useTransition 源码解析

和 useId 一样，`useTransition` 也是 React 18 带来的全新的 Hook，这也是 React 18 并发模式下才能使用的一个 hook,它用来来帮助我们实现更新协调可中断，能极大的提升用户体验。它的作用非常之大，当然前提是你要先知道它有什么作用

在开始 `useTransition` 之前，需要了解一下 `transition` 设计相关的东西

## What is Transition

`Transition` 是 React 中的一个新概念，用于区分**紧急和非紧急更新**

- 紧急更新反映了直接交互，例如键入、单击、按下等。
- 过渡更新表示将 UI 从一个视图转换到另一个视图。

打字、点击或按下等紧急更新需要立即响应，以符合我们对物理对象行为方式的直觉。否则用户会觉得“不对劲”。但是，过渡是不同的，因为用户不希望在屏幕上看到每个中间值。

例如下面的例子：当滑块滑动条时，下方的图表会一起更新，然而图表更新比较耗时。阻塞了渲染导致页面失去响应，用户能够非常明显的感受到**卡顿**。

在 `useTransition` 之前，我们会采用 `useState` 创建**两个 State**，去更新滑动条和图表

```js
setSlider(10)
setGraph(xxx)
```

这是因为在处理状态更新时，`setGraph` 触发的更新非常的耗时，而 `setSlider` 的触发又非常的频繁，就很有可能导致 `setGraph` 任务还没有做完，`setSlider` 任务又来了，React 没有办法及时的响应，导致了页面卡顿

![](/img/hooks/usetransition-1.gif)

可以看到

当我们使用 `transition`，将这个耗时但又不是非常紧急的任务放到 `startTransition` 里去做，效果就不一样了

核心原理就是在 setGraph 的更新优先级被降低了，slider 的频繁更新会打断 graph 的更新，这样不会阻塞渲染，体验上会更加友好一些

```js
setSlider(input);
startTransition( () => {
    setGraph(input);
}); 
```

![](/img/hooks/usetransition-2.gif)

下面我们从 `useTransition` 的使用到实现原理来讲解这个全新的 hook

## 如何使用

> 例子来自 React 官网

```js
const [isPending, startTransition] = useTransition();
```

返回一个状态值**表示过渡任务的等待状态**，以及一个启动该过渡任务的函数。

`startTransition` 允许你通过标记更新将提供的回调函数作为一个过渡任务：

```js
startTransition(() => {
  setCount(count + 1);
})
```

`isPending` 指示过渡任务何时活跃以显示一个等待状态，反应了当前的 startTransition 回调事件是否做完

```js
function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  
  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1);
    })
  }

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}
```

下面我们先看看这个 API 是**如何实现的，后面再看它是如何被调度的**

## mount 时

核心其实就是通过 `useState` 维护了一个 `pending`，然后将 `setPending` 作为参数传递给 `startTransition`

当任务执行完成就会调用这个 `dispatch` 去更新 `isPending` 的状态

```ts
function mountTransition(): [boolean, (() => void) => void] {
  const [isPending, setPending] = mountState(false);
  const start = startTransition.bind(null, setPending);
  const hook = mountWorkInProgressHook();
  hook.memoizedState = start;
  return [isPending, start];
}
```

## startTransition

核心在于 `startTransition` 这个方法

**从实现上来看，就是用优先级更高的任务去挤掉当前的 callback。**

```js
function startTransition(setPending, callback, options) {
  const previousPriority = getCurrentUpdatePriority();
  // 给当前任务重新设置优先级，比 ContinuousEventPriority 优先级低
  setCurrentUpdatePriority(
    higherEventPriority(previousPriority, ContinuousEventPriority),
  );

  setPending(true);
  // 设置了一个全局过渡标记位
  const prevTransition = ReactCurrentBatchConfig.transition;
  ReactCurrentBatchConfig.transition = {};
  const currentTransition = ReactCurrentBatchConfig.transition;

  if (enableTransitionTracing) {
    if (options !== undefined && options.name !== undefined) {
      ReactCurrentBatchConfig.transition.name = options.name;
      ReactCurrentBatchConfig.transition.startTime = now();
    }
  }

  try {
    setPending(false);
    callback(); // 执行 callback
  } finally {
    // 设置回原来的优先级
    setCurrentUpdatePriority(previousPriority);
    ReactCurrentBatchConfig.transition = prevTransition;
  }
}
```

可以看到在 `startTransition` 中，会重新给任务设置 `ContinuousEventPriority` 的优先级，如果原先任务优先级低于这个，那就还是用原来的优先级

```js
export function higherEventPriority(
  a: EventPriority,
  b: EventPriority,
): EventPriority {
  return a !== 0 && a < b ? a : b;
}
```

可以看到，当调用 `startTransition` 时，会先通过 `setPending` 将 `isPending` 改为 true，然后再通过 `setPending` 将 `isPending` 改为 false，并**在 `callback` 中触发我们自己定义的更新**。
在这里，有些同学可能就有疑问了，这里不是连续调用了三次 setState 吗，为什么只会触发两次 React 更新吗？

![usetransition-3](/img/hooks/usetransition-3.png)

这是因为 React 有 batchUpdate 批处理机制，那你可能又有疑问了，那问什么不是一次更新呢？

就需要特别注意一行代码

```js
ReactCurrentBatchConfig.transition = {};
```

这一句代码会将更新的上下文改为 `transition`，使得 setPending(true) 和 setPending(false)、callback() 的上下文不一样。

![transition-loop](/img/hooks/transition-loop.jpg)

从上图中我们可以看到，`setPending(true)` 上下文为 `DiscreteEvent`，而 `setPending(false)`、`callback()` 的**上下文为 `Transition`**。尽管连续三次 `setState`，但由于存在两类不同的上下文，导致实际需要两次更新。

- `setPending(true)` 对应的更新会先处理，**经过 fiber tree 协调、effect 处理、浏览器渲染**，我们就可以在页面中先看到中间状态；
- `setPending(false)`、`callback` 对应的更新后处理，经过同样的过程以后，我们就可以在页面中看到实际需要的结果了。

## update 时

update 时，没有什么特殊的东西，调用 `updateState` 更新 `isPending` 的状态

```js
function updateTransition(): [
  boolean,
  (callback: () => void, options?: StartTransitionOptions) => void,
] {
  const [isPending] = updateState(false);
  const hook = updateWorkInProgressHook();
  const start = hook.memoizedState;
  return [isPending, start];
}
```

## 参考

[React 18 discussion](https://github.com/reactwg/react-18/discussions/65)
