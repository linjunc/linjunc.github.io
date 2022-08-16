# layout 阶段
在 `layout` 阶段正式开始之前，也就是在 `mutation` 阶段之后，会执行 current 树变更的操作，这是一个非常重要的过程
## current Fiber 树的切换

在 `mutation` 阶段和 `layout` 阶段之间有一句关键的代码

```javascript
root.current = finishedWork;
```

在双缓存机制部分中，我们也有写过，当 `workInProgress`Fiber 树完成了渲染，就会将 current 指针从 `current Fiber` 树指向 `workInProgress Fiber` 树，也就是这行代码所做的工作<br />**为什么要在 mutation 阶段结束后，layout 阶段之前执行呢？**<br />这是因为 `componentWillUnmount` 这个生命周期钩子函数，会在 `mutation` 阶段执行，此时可能会操作原来 Fiber 上的内容，为了保证数据的可靠性所以不会修改 `current` 指针<br />而在 `layout` 阶段会执行 `componentDidMount` 和 `componentDidUpdate` 生命周期钩子，此时需要**获取到的 DOM 是更新后的**

## 流程概览

本部分来讲解 `commit` 阶段的最后一个子阶段 `Layout` 阶段的主要工作<br />`layout` 阶段会执行 `commitLayoutEffect` 这个方法

```javascript
commitLayoutEffects(finishedWork, root, lanes);
```

同样的会分为 `begin` 和 `complete` 两部分来执行，核心流程也是在 xxxOnFiber 中执行<br />在 `commitLayoutEffect` 函数中，首先会对全局变量 `nextEffect` 进行赋值<br />然后会执行 `commitLayoutEffects_begin` 函数，在这个函数中，会从 `nextEffect` 开始，向下遍历子树，调用 `commitLayoutMountEffects_complete` 函数来处理副作用，触发 `componentDidMount`、`componentDidUpdate` 以及各种回调函数等。

## commitLayoutEffects

作为入口函数，会对全局变量 `nextEffect` 进行赋值，调用 `commitLayoutEffects_begin` 处理副作用，触发生命周期钩子

```javascript
export function commitLayoutEffects(
  finishedWork: Fiber,
  root: FiberRoot,
  committedLanes: Lanes,
): void {
  inProgressLanes = committedLanes;
  inProgressRoot = root;
  nextEffect = finishedWork;

  commitLayoutEffects_begin(finishedWork, root, committedLanes);

  inProgressLanes = null;
  inProgressRoot = null;
}
```

## commitLayoutEffects_begin

在这个函数中会从 rootFiber 开始，向下遍历。对**当前屏幕内的节点**调用 `commitLayoutMountEffects_complete` 函数来处理副作用，触发 `componentDidMount`、`componentDidUpdate` 以及各种回调函数等，跳过未显示的节点。

```javascript
function commitLayoutEffects_begin(
  subtreeRoot: Fiber,
  root: FiberRoot,
  committedLanes: Lanes,
) {
  const isModernRoot = (subtreeRoot.mode & ConcurrentMode) !== NoMode;

  while (nextEffect !== null) {
    const fiber = nextEffect;
    const firstChild = fiber.child;

    if (
      enableSuspenseLayoutEffectSemantics &&
      fiber.tag === OffscreenComponent &&
      isModernRoot
    ) {
      // 跟踪当前屏幕外堆栈的状态
      const isHidden = fiber.memoizedState !== null;
      const newOffscreenSubtreeIsHidden = isHidden || offscreenSubtreeIsHidden;
      // 当前节点是否显示
      if (newOffscreenSubtreeIsHidden) {
        // 遍历 alternate 树进行布局，循环处理兄弟节点和父节点
        commitLayoutMountEffects_complete(subtreeRoot, root, committedLanes);
        continue;
      } else {
        ...
        let child = firstChild;
        // 递归调用 commitLayoutEffects_begin
        while (child !== null) {
          nextEffect = child;
          commitLayoutEffects_begin(
            child, // New root; bubble back up to here and stop.
            root,
            committedLanes,
          );
          child = child.sibling;
        }
        ...
        commitLayoutMountEffects_complete(subtreeRoot, root, committedLanes);

        continue;
      }
    }

    if ((fiber.subtreeFlags & LayoutMask) !== NoFlags && firstChild !== null) {
      ensureCorrectReturnPointer(firstChild, fiber);
      nextEffect = firstChild;
    } else {
      commitLayoutMountEffects_complete(subtreeRoot, root, committedLanes);
    }
  }
}
```

## commitLayoutMountEffects_complete

在 complete 中，同样会从 `nextEffect` 开始进行归并。调用 `commitLayoutEffectOnFiber` 函数，根据不同的组件类型，处理相关的副作用

```javascript
function commitLayoutMountEffects_complete(
  subtreeRoot: Fiber,
  root: FiberRoot,
  committedLanes: Lanes,
) {
  // 循环处理兄弟节点和父节点
  while (nextEffect !== null) {
    const fiber = nextEffect;
    if ((fiber.flags & LayoutMask) !== NoFlags) {
      const current = fiber.alternate;
      ...
      commitLayoutEffectOnFiber(root, current, fiber, committedLanes);
      ...
    }
    // fiber 树遍历完成
    if (fiber === subtreeRoot) {
      nextEffect = null;
      return;
    }
    // 遍历 sibling 节点
    const sibling = fiber.sibling;
    if (sibling !== null) {
      ensureCorrectReturnPointer(sibling, fiber.return);
      nextEffect = sibling;
      return;
    }
    // 回到 parent 节点，继续遍历
    nextEffect = fiber.return;
  }
}
```

## commitLayoutEffectOnFiber

在 `commitLayoutEffectOnFiber`中会根据 `fiber` 的 `tag` 的不同，执行不同的操作<br />对于 **Function  component **来说，会调用 `commitHookEffectListMount`函数，首先会遍历所有 `useLayoutEffect` ，去执行它的**回调函数**<br />在前面我们知道了 `useLayoutEffect` 会在 `mutation` 阶段执行它上一次的**销毁函数**<br />在这里我们知道了在 `layout`阶段会执行 `useLayoutEffect` 的回调函数，因此 `useLayoutEffect` 会**先执行所有的销毁函数，再执行回调函数**，这两步是同步执行

```javascript
function commitLayoutEffectOnFiber(
  finishedRoot: FiberRoot,
  current: Fiber | null,
  finishedWork: Fiber,
  committedLanes: Lanes,
): void {
      switch (finishedWork.tag) {
    // FC 相关
    case FunctionComponent:
    case ForwardRef:
    case SimpleMemoComponent: {
      // 执行 useLayoutEffect 的回调函数
      commitHookEffectListMount(HookLayout | HookHasEffect, finishedWork);
      return;
    }
    ...
    commitAttachRef(finishedWork);
}
```

对于 **ClassComponent**  而言

- 如果 `current` 为 `null` 会调用 `componentDidMount` 这个生命周期函数，因此也可以知道 `componentDidMount` 是在 `commit layout` 阶段同步执行的
- 当 `current` 不为 `null` 时，会执行 `componentDidUpdate` 生命周期函数，然后会调用 `commitUpdateQueue`函数，遍历 `updateQueue`上的 `effects`，执行 `effect`副作用
- 如果 setState 有 callback 会放入 updateQueue 中，通过 `commitUpdateQueue` 来执行 callback 回调函数

> current 为 null 时，是首屏渲染

```javascript
if (current === null) {
  ...
    instance.componentDidMount();
} else {
  ...
    instance.componentDidUpdate(
      prevProps,
      prevState,
      instance.__reactInternalSnapshotBeforeUpdate,
    );
}
```

同样的对于 `HostRoot` 类型的 Fiber 而言，也会在这里调用 `commitUpdateQueue`函数来处理 `effects`，接下来看看 `commitUpdateQueue`的作用

## commitUpdateQueue

`commitUpdateQueue` 函数会执行 `updateQueue` 上的 `effects` 副作用，通过遍历 `effects`，如果有 `callback` 就会执行，否则会重置 `updateQueue` 上的 `effects` 为 null

```javascript
export function commitUpdateQueue<State>(
  finishedWork: Fiber,
  finishedQueue: UpdateQueue<State>,
  instance: any,
): void {
  // 遍历 effects 链表，执行 effect callback
  const effects = finishedQueue.effects;
  finishedQueue.effects = null;
  if (effects !== null) {
    for (let i = 0; i < effects.length; i++) {
      const effect = effects[i];
      const callback = effect.callback;
      if (callback !== null) {
        effect.callback = null;
        callCallback(callback, instance);
      }
    }
  }
}
```

## commitAttachRef

在 `commitLayoutEffectOnFiber`中做的第二件事就是 `commitAttachRef`，获取 DOM 实例，更新 Ref

```javascript
function commitAttachRef(finishedWork: Fiber) {
  const ref = finishedWork.ref;
  if (ref !== null) {
    const instance = finishedWork.stateNode;
    let instanceToUse;
    // 获取 DOM 实例
    switch (finishedWork.tag) {
      case HostComponent:
        instanceToUse = getPublicInstance(instance);
        break;
      default:
        instanceToUse = instance;
    }
    // Moved outside to ensure DCE works with this flag
    if (enableScopeAPI && finishedWork.tag === ScopeComponent) {
      instanceToUse = instance;
    }
    if (typeof ref === 'function') {
        ...
        retVal = ref(instanceToUse);
      } else {
        retVal = ref(instanceToUse);
      }
    }
  }
}
```

## 总结

至此 layout 阶段的工作已经完成了，Layout 做的事情有：

- 对于类组件，会执行 `componentDidMount` 、`componentDidUpdate` 生命周期，setState 的 callback
- 对于函数组件会执行 `useLayoutEffect` 、`useInsertionEffect` 钩子
- 如果有 ref ，会更新 ref 



