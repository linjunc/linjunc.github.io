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

**如果依赖项没有变化的话， effect 时不会被处理的，也就不会存在于链表中**

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
3. 初始化 effect 链表的逻辑在 `pushEffect` 中，会创建 effect 对象，并维护 `UpdateQueue` 上的 effect 环状链表
4. 在渲染完成后会，会循环这个环状链表，执行每个对象的 destroy 和 create

## update 时 --〉updateEffect

在页面更新时，会执行 `updateEffect`，调用 `updateEffectImpl` 完成 `effect` 链表的构建，这个过程会根据前后依赖的是否变化，来创建不同的 effect 对象，

- 首先会根据 `hook` 单向链表获取对应的更新时的 hook 对象，创建新的 hook 对象，加入 hook 的单向链表
- 如果拿到 `effect` 的 `deps` 不为 null，或者 undefined，会从当前 hook 对象拿到上一次 `effect` 对象，再从 `effect` 对象拿到 `deps` 和 `destroy`，用新的 `deps` 与之比较
  - 如果新老 `deps` 相等，push 一个不带 `HookHasEffect` 的 tag 给 effect 对象，加入 `updateQueue` 环状链表(没有副作用），不更新 `hook.memoizedState`
  - 如果新老 `deps` 不相等，更新 `effect` 对象，在 `effect` 的 tag 中加入 `HookHasEffect` 和上一次 `create` 执行的 `destroy`，更新 `hook.memoizedState`

```js
function updateEffectImpl(fiberFlags, hookFlags, create, deps): void {
  // 获取 更新时的 hook 对象
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  let destroy = undefined;

  if (currentHook !== null) {
    // 从 currentHook 获取上一次的 effect
    const prevEffect = currentHook.memoizedState;
    destroy = prevEffect.destroy;
    if (nextDeps !== null) {
      const prevDeps = prevEffect.deps;
      // 比较前后的 deps 是否相等，push 一个不带 hasEffect 的 effect
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        hook.memoizedState = pushEffect(hookFlags, create, destroy, nextDeps);
        return;
      }
    }
  }
  // 如果 deps 有变化，那就 push 一个 有 hookHasEffect 的 effect，并挂到 hook.memoizedState 上
  currentlyRenderingFiber.flags |= fiberFlags;

  hook.memoizedState = pushEffect(
    HookHasEffect | hookFlags,
    create,
    destroy,
    nextDeps,
  );
}
```

和 `mountEffectImpl` 有一些不同，在挂载时调用的 `pushEffect` 去创建 `effect` 对象，并没有传递 `destroy` 方法，而 `update` 的时候传了，
这是因为 `effect` 执行之前，都会先执行前一次的销毁函数，再执行新 `effect` 的创建函数，而 `mount` 时，并没有上一个 `effect` ，因此无需先销毁

再来看看这个 `areHookInputsEqual` 方法

### areHookInputsEqual 比较

这个方法是用来比较两个 `deps` 是否相等的

```js
function areHookInputsEqual(
  nextDeps: Array<mixed>,
  prevDeps: Array<mixed> | null,
) {
  if (prevDeps === null) {
    return false;
  }
  // 循环遍历
  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    // is 比较函数是浅比较
    if (is(nextDeps[i], prevDeps[i])) {
      continue;
    }
    return false;
  }
  return true;
}
```

首先会遍历 `deps` ，调用 `is` 方法来比较依赖项数组中的每个依赖

`is` 方法是一个浅比较的方法

```js
function is(x: any, y: any) {
  return (
    (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y) // eslint-disable-line no-self-compare
  );
}

const objectIs: (x: any, y: any) => boolean =
  typeof Object.is === 'function' ? Object.is : is;
```

若当前浏览器支持 `Object.is()` 方法，则调用该方法来判断两个值是否相同，若不支持，则调用 React 自己实现 is 方法来比较。

这块就是 `update` 时所做的工作了

## 如何调度

由于 `useEffect` 回调延迟调用的设计，在实现上利用 `Scheduler` 的异步调度函数：`scheduleCallback`，将执行 `useEffect` 回调的动作作为一个任务去调度，这个任务会异步调用。

> 与 componentDidMount、componentDidUpdate 不同的是，在浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用。
> 这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况，因此不应在函数中执行阻塞浏览器更新屏幕的操作。

和 `useEffect` 调度相关的部分在 React 的 commit 阶段，commit 阶段的具体工作可以看[这部分](../commit/commit.md)

主要分为 `beforeMutation` 、`mutation`、`layout` 三个阶段

```js
function commitRootImpl(root, renderPriorityLevel) {
  // 进入 commit 阶段，先执行一次之前未执行的 useEffect
  do {
    flushPassiveEffects();
  } while (rootWithPendingPassiveEffects !== null);
  ...
  do {
    try {
      // beforeMutation阶段 异步调度useEffect
      commitBeforeMutationEffects();
    } catch (error) {
      ...
    }
  } while (nextEffect !== null);
  ...
  const rootDidHavePassiveEffects = rootDoesHavePassiveEffects;
  if (rootDoesHavePassiveEffects) {
    // 记录有副作用的effect
    rootWithPendingPassiveEffects = root;
  }
}
```

其中和 `useEffect` 有关的在 `commit` 阶段开始、`beforeMutation` 、`layout` 阶段
具体如下：

1. 在 `commit` 阶段开始时，会先将之前还没有处理完的 `useEffect` 全部处理完成，这里采用的是 `do while` 循环。在这里这么处理的作用是因为
由于 `useEffect` 是被以一个低优先级的任务进行调度的，因此在过程中有可能会被其他高优先级的任务打断，高优先级的任务会先进入到 `commit` 阶段，
而低优先级的 `useEffect` 还没有被执行，所以需要先将之前的 `effect` 全部处理掉，保证本次调度的产生的更新是由当前的 `useEffect` 产生的

```js
// 进入 commit 阶段，先执行一次之前未执行的 useEffect
do {
    flushPassiveEffects();
} while (rootWithPendingPassiveEffects !== null);
```

2. `useEffect` 在 `beforeMutation` 阶段会被交给 `scheduleCallback`，发起一个 `NormalPriority` 低优先级的调度，这一点上面也提到了

由于 `rootDoesHavePassiveEffects` 的限制，只会发起一次 `useEffect` 调度

::: info 提示
引用之前的写的

- before mutation 阶段在 scheduleCallback 中调度 flushPassiveEffects
- layout 阶段之后将 effectList 赋值给 rootWithPendingPassiveEffects
- scheduleCallback 触发 flushPassiveEffects，flushPassiveEffects内部遍历rootWithPendingPassiveEffects
:::

```js
// commitImpl
  if (
    (finishedWork.subtreeFlags & PassiveMask) !== NoFlags ||
    (finishedWork.flags & PassiveMask) !== NoFlags
  ) {
    if (!rootDoesHavePassiveEffects) {
      scheduleCallback(NormalSchedulerPriority, () => {
        flushPassiveEffects();
        return null;
      });
    }
  }
```

3. 在 layout 阶段会去补齐 `effect` 链表，真正 `useEffect` 执行的时候，实际上是先执行上一次 effect 的销毁(destroy)，再执行本次 effect 的创建(create)

可以看到 `commitHookEffectListMount` 和 `commitHookEffectListUnMount` 这两个方法

```js
function commitHookEffectListUnmount(
  flags: HookFlags,
  finishedWork: Fiber,
  nearestMountedAncestor: Fiber | null,
) {
  const updateQueue: FunctionComponentUpdateQueue | null = (finishedWork.updateQueue: any);
  const lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
  if (lastEffect !== null) {
    const firstEffect = lastEffect.next;
    let effect = firstEffect;
    do {
      if ((effect.tag & flags) === flags) {
        // Unmount
        const destroy = effect.destroy;
        effect.destroy = undefined;
        if (destroy !== undefined) {
          safelyCallDestroy(finishedWork, nearestMountedAncestor, destroy);
        }
      }
      effect = effect.next;
    } while (effect !== firstEffect);
  }
}
```

执行 create

```js
function commitHookEffectListMount(flags: HookFlags, finishedWork: Fiber) {
  const updateQueue: FunctionComponentUpdateQueue | null = (finishedWork.updateQueue: any);
  const lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
  if (lastEffect !== null) {
    const firstEffect = lastEffect.next;
    let effect = firstEffect;
    do {
      if ((effect.tag & flags) === flags) {
        // Mount
        const create = effect.create;
        effect.destroy = create();
      }
      effect = effect.next;
    } while (effect !== firstEffect);
  }
}
```

## 总结

`useEffect` 的大体流程如下：
![useEffect](/img/hooks/useEffect.jpg)
