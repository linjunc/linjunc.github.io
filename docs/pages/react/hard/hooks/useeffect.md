# useEffect 源码解析

## 基本使用

首先我们先看看 `useEffect` 的使用方法，有助于理解源码里为什么要这么实现，这么做是为了说明

`useEffect` 是一个接受两个参数的函数。传递给 `useEffect` 的参数

- 第一个参数是一个名为 `effect` 的函数
- 第二个参数（是可选的）是一个存储依赖关系的数组

`effect` 函数会在 `componentDidUpdate` 的时候被调用，这个函数的返回值也可以是一个函数，这个返回的函数会在组件卸载的时候调用。

```js
useEffect(() => {
    fn()
    return () => {
        console.log('component')
    }
},[])
```

## 调度流程

对于 `useEffect` 来说，React 做的事情就是

在 render 阶段，函数组件开始渲染，在 beginWork 阶段，会对特定类型的 component 进行差异化处理，对于 FC 会进入 `updateComponent` 的逻辑，会调用
`renderWithHooks` 方法来处理 `hooks` ，初始化时会创建 hook 链表挂载到 `workInProgress` 的 `memoizedState` 上，并创建 effect 链表，这个链表会根据依赖项有差异。

如果依赖项没有变化的话， effect 时不会被处理的，也就不会存在于链表中

在 `commit` 阶段的 `before Mutation` 阶段，会发起 `useEffect` 的异步调度，但是不会直接处理 `effect`，而是要等到 `commit` 阶段完成，更新已经处理完，才会开始处理 `useEffect` 产生的 `effect` 副作用

从整体上看，`useEffect` 的整个过程涉及到了 `render` 阶段和 `commit` 阶段两部分，render 阶段负责创建 `effect` 链表，`commit` 阶段去处理

这就是 `useEffect` 比较完整的调度流程，下面看以下 `useEffect` 的具体实现

## 挂载时 -- MountEffect

在组件的 `mount` 阶段，执行 `useEffect` 实际上执行的是 `mountEffect`

具体实现如下

```js
function mountEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null,
): void {
  if (
    __DEV__ &&
    enableStrictEffects &&
    (currentlyRenderingFiber.mode & StrictEffectsMode) !== NoMode
  ) {
    return mountEffectImpl(
      MountPassiveDevEffect | PassiveEffect | PassiveStaticEffect,
      HookPassive, // 标识 hook 为 useEffect
      create, // 第一个参数
      deps, // 第二个参数
    );
  } else {
    return mountEffectImpl(
      PassiveEffect | PassiveStaticEffect,
      HookPassive,
      create,
      deps,
    );
  }
}
```

可以看到 `mountEffect` 接受 `useEffect` 用户传入的 `create` 回调函数，以及依赖项数组 `deps`，返回的是 `mountEffectImpl` 的执行结果

同时传入了用于位运算的 Fiber 节点标识，和 hook 对象的标识，以及两个传参

具体再看看 `mountEffectImpl` 的实现

## mountEffectImpl 实现

在 `mountEffectImpl` 里

- 首先会调用 `mountWorkInProgressHook`，将当前的 hook 添加到 `workProgressHook` 单向链表中，返回新的 hook 链表
- 接着初始化 `useEffect` 的第二个参数，也就是依赖项数组，可以看到，当我们不传的时候会被设为 null
- 接着将标识 Fiber 节点的 二进制值添加到 Fiber 的 `flags` 属性上
- 最后第哦啊用 `pushEffect` 初始化 effect 链表，并挂到 `memoizedState` 上

> 这个实现也很简单，哈哈哈

```js
function mountEffectImpl(fiberFlags, hookFlags, create, deps): void {
  // 创建 hook
  const hook = mountWorkInProgressHook();
  // 获取依赖
  const nextDeps = deps === undefined ? null : deps;
  currentlyRenderingFiber.flags |= fiberFlags;
  // 创建effect链表，挂载到hook的memoizedState上和fiber的updateQueue
  hook.memoizedState = pushEffect(
    HookHasEffect | hookFlags,
    create,
    undefined,
    nextDeps,
  );
}
```

接着再看看 `pushEffect` 是如何初始化创建的 `effect` 链表的

## pushEffect 实现

首先，会根据传入的参数，创建一个 effect 对象，该对象上存储着，useEffect 的两个参数：create 和 deps，
还有标识 hook 对象的 二进制数值 tag,还有一个 next 指针，形成 effect 链表

> 这里用二进制也是为了在运算中更快一些，不用二进制也行，我自己实现过

接着就是将 `effect` 添加到 `effect` 链表中，需要先判断 `effect` 链表存不存在，存在就和 `next` 指针相连，形成环状链表

```js
function pushEffect(tag, create, destroy, deps) {
    // 新建 effect 对象
  const effect: Effect = {
    tag, // useEffect 还是 layoutxxx
    create, // 回调
    destroy,
    deps, // 依赖
    // Circular
    next: (null: any),
  };
  // 从当前 Fiber 节点的 updateQueue  上获取当前 Fiber 的更新队列
  let componentUpdateQueue: null | FunctionComponentUpdateQueue = (currentlyRenderingFiber.updateQueue: any);
  if (componentUpdateQueue === null) {
    // 如果还没有，那就创建一个，将 effect 链表添加到熬队列上
    componentUpdateQueue = createFunctionComponentUpdateQueue();
    currentlyRenderingFiber.updateQueue = (componentUpdateQueue: any);
    componentUpdateQueue.lastEffect = effect.next = effect;
  } else {
    // 如果已经有更新队列，那就把 effect 加到 effect 链表的末尾，形成环状链表
    const lastEffect = componentUpdateQueue.lastEffect;
    if (lastEffect === null) {
      componentUpdateQueue.lastEffect = effect.next = effect;
    } else {
      const firstEffect = lastEffect.next;
      lastEffect.next = effect;
      effect.next = firstEffect;
      componentUpdateQueue.lastEffect = effect;
    }
  }
  // 返回 effect 链表
  return effect;
}
```

最后返回的是 `effect` 给 `mountEffectImpl`，赋值给 `memoizedState` 属性

这就是在 `mount` 时,`useEffect` 创建 `effect` 的全部工作

总结以下：

1. 在 `mountEffect` 中会调用 `mountEffectImpl` 去初始化创建 `effect` 链表
2. 在 `mountEffectImpl` 中会干 4 件事
   1. 创建 hook 对象
   2. 初始化依赖项
   3. 设置 `flags`
   4. 初始化 effect 链表
3. 初始化 effect 链表的逻辑在 `pushEffect` 中，会创建 effect 对象，并维护 `UpdateQueue` 上的 effect 链表
