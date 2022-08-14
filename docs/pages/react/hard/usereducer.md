# useReducer 源码解析

在[前面](./useState.md)，我们讲了 `useState` 的实现，以及 `hook` 的[调用流程](./hooks.md)，相信你已经非常熟悉了，
hooks 这部分的内容的相似度很高，只要对整个流程清楚了，剩下的就是 API 如何封装的事情了

这部分介绍 `useReducer` 的实现，`useReducer` 和 `useState` 非常相似，在 `update` 时，都调用 `updateReducer`

## Mount 时

在 mount 阶段，当执行到 `useReducer` 方法时，会调用 `mountReducer` 进行处理

```js
const HooksDispatcherOnMount: Dispatcher = {
  useReducer: mountReducer,
};
```

`mountReducer` 会创建 Hook 对象，得到初始状态，创建 queue，生成 `dispatch` 给用户使用

```js
function mountReducer<S, I, A>(
  reducer: (S, A) => S,
  initialArg: I,
  init?: I => S,
): [S, Dispatch<A>] {
    // 创建 hook 对象
  const hook = mountWorkInProgressHook();
  // 生成初始状态，是否有第三个参数
  let initialState;
  if (init !== undefined) {
    initialState = init(initialArg);
  } else {
    initialState = ((initialArg: any): S);
  }
  hook.memoizedState = hook.baseState = initialState;
  // 创建 queue
  const queue: UpdateQueue<S, A> = {...};
  hook.queue = queue;
  // 生成 dispatch
  const dispatch: Dispatch<A> = (queue.dispatch = (dispatchReducerAction.bind(...): any));
  return [hook.memoizedState, dispatch];
}
```

完整的流程如下

1. 通过 `mountWorkInProgressHook` 创建 hook 对象
2. 根据用户传递的参数，进行 state 的初始化
3. 把初始状态挂到 `memoizedState` 和 `baseState` 上
4. 创建 queue 链表，挂到 hook 上
5. 生成 `dispatch` 并返回数组

在这里有一点需要提醒的是，`useReducer` 支持第三个参数，这个参数是一个 Function，用于惰性初始化 state，其实 `useState` 也有这个功能，
惰性初始化是 React 用来优化的一种手段，我们可以看一个例子

```js
const initialState = Number(window.localStorage.getItem('count'))
const [count, setCount] = React.useState(initialState)
```

当函数组件更新 `re-render` 时，函数组件内所有代码都会重新执行一遍。此时 `initialState` 的初始值是一个相对开销较大的 IO 操作。每次函数组件 `re-render` 时，第一行代码都会被执行一次，引起不必要的性能损耗。

```js
const initialState = () => Number(window.localStorage.getItem('count'))
const [count, setCount] = React.useState(initialState)
```

当 `initialState` 以函数形式传入时，它**只会在函数组件初始化的时候执行一次**，函数 `re-render` 时不会再被执行。**这个函数即惰性初始化函数这个特性，可以在这种场景下规避不必要的性能问题。**

这就是惰性初始化的意义所在，避免计算不必要的 `state`

### 生成 Dispatch 函数

还有一个很关键的点，就是 `dispatch` 函数的生成，看到 `dispatchReducerAction` 这个方法

```js
function dispatchReducerAction<S, A>(
  fiber: Fiber,
  queue: UpdateQueue<S, A>,
  action: A,
) {
  const lane = requestUpdateLane(fiber);

  const update: Update<S, A> = {
    lane,
    action,
    hasEagerState: false,
    eagerState: null,
    next: (null: any),
  };

  if (isRenderPhaseUpdate(fiber)) {
    enqueueRenderPhaseUpdate(queue, update);
  } else {
    //将update,加入到queue.pending环状链表中
    //多次调用dispatch，创建的update都会加入到这个queue.pending环状链表中；
    const root = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
    if (root !== null) {
      const eventTime = requestEventTime();
      scheduleUpdateOnFiber(root, fiber, lane, eventTime);
      entangleTransitionUpdate(root, queue, lane);
    }
  }
}
```

1. 首先会去获取本次更新的优先级
2. 然后创建 update
3. 判断是否是 re-render 引起的更新（和 `dispatchSetState` 一样）
   1. 如果是那就执行 `enqueueRenderPhaseUpdate`，会将 update 加到 queue.pending 中，具体可看[上一节](./useState.html#在-mount-阶段的-mountstate)
4. 如果不是 re-render 的更新，也会将 `queue` 加入到 queue.pending 中，返回当前的 `root` 节点，然后调用 `scheduleUpdateOnFiber` 开始更新调度

![](/img/hooks/useReducer-dispatch.png)
图来自网络

## update 时，updateReducer

这部分和 `useState` 一致，可以看[前面的](./useState.html#在-update-阶段，updatestate)

1. 根据上次更新或加载后，存储的组件 `fiber` 的 `hook` 对象，创建新的 `hook` 对象；
2. 拿到 `hook` 的更新对象环状链表 `queue.pending`，循环环状链表，算出新的状态；
3. 判断新老状态，如果不一样就标记更新；
4. 把新的状态存储到 hook 对象；
5. 把新的状态和 dispatch 返回给用户；

![](/img/hooks/useReducer-update.png)
图来自网络

## useState 和 useReducer 的区别

看到这里你一定很疑惑，`useReducer` 和 `useState` 这么相似，为啥还要搞两个 API，这不自找麻烦咩

首先，一些明显的不同，在使用上也能感受到

- `useState` 只需要传递一个状态即可，而 `useReducer` 需要 `reducer` 和状态，使用上来说，`useState` 对开发者更加友好
- 调用 `dispatch` 时，`useState` 需要判断状态是否相等再判断需不需要更新，而 `useReducer` 是一把梭，因为它的状态由 reducer 来控制，reducer 是一个纯函数

对于一些使用场景，React 官方会更加推荐使用 `useReducer`，可以看[官网](https://zh-hans.reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables)

前面 useState 和 useReducer 都没有讲到一个很重要的东西，**就是 `batchUpdate`**，当多次调用 `dispatch` 时，React 是怎么处理批量更新的？

这个其实依赖的是 React 的 Scheduler 调度器实现的，当 `dispatch` 触发后，并不会立刻的去更新，而是调用的 `scheduleUpdateOnFiber` 来调度更新，在这里面，会把
更新处理添加到一个微任务队列里，好像叫 `scheduleMicrotask` （忘记了，不想找），这样可以调用多次 `dispatch` ，而只执行一次更新
