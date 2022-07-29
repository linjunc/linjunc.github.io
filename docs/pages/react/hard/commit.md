# commit 阶段流程概览
## 前言

随着 `render` 阶段的完成，也意味着在内存中**构建 `workInProgress Fiber` 树**的所有工作都已经完成，这其中包括了对 Fiber 节点的 `update`、`diff`、`flags 标记`、`subtreeFlags`（effectList） 的收集等操作<br />我们知道，在 `render` 阶段，会将需要更新的节点**标记上** `flags` （effectTag），在 `completeWork` 阶段会**形成** `effectList` 链表，**连接所有需要被更新的节点**。

为了将这些需要更新的节点应用到真实 DOM 上却不需要**遍历整棵树**，在 `commit` 阶段，会通过**遍历这条 `EffectList` 链表**，执行对应的操作，来完成对真实 DOM 的更新，这也叫做 `mutation`，即 **DOM 节点的增删改操作**。

> 在新版本中不再需要 effectList 链表了，而是通过 rootFiber 自下而上调和的方式处理这些标志，执行对应的操作，来完成对真实 DOM 的更新

接下来我们带着**以下的问题**一起去思考 commit 阶段的工作！
- commit 阶段分为几个子阶段，都做了什么事情？
- 如何执行生命周期和 hooks 钩子的回调及销毁函数？
- commit 阶段是如何更新 DOM 节点的？
- useEffect 钩子是如何被调度的？
---
`commit` 阶段会做以下这些事情

- 对一些**生命周期和副作用钩子的处理**，比如 类组件的 `componentDidMount` 、`componentDidUpdate`，函数组件的 `useEffect`、`useLayoutEffect` 、`useInsertionEffect` 等
- 另一方面，在一次 Update 中，进行添加节点（`Placement`）、更新节点（`Update`）、删除节点（`Deletion`）、同时有对 `ref` 的处理等。

`commit` 阶段的**入口在 `commitRoot` 函数**，在这里会发起一个最高优先级的调度任务，然后调用 `commitRootImpl` 函数来处理副作用，将最新的 Fiber 树同步到 DOM 上


```javascript
function commitRoot(root) {
  const previousUpdateLanePriority = getCurrentUpdatePriority();
  const prevTransition = ReactCurrentBatchConfig.transition;
  try {
    ReactCurrentBatchConfig.transition = 0;
    setCurrentUpdatePriority(DiscreteEventPriority); // 最高优先级调度
    commitRootImpl(root, previousUpdateLanePriority); // commit 主流程
  } finally {
    // 重置
    ReactCurrentBatchConfig.transition = prevTransition;
    setCurrentUpdatePriority(previousUpdateLanePriority);
  }

  return null;
}
```

## 流程概览

`commit`阶段主要针对 `rootFiber`上的 `effectList`进行处理，根据对 DOM 的操作时机可以**分为三个子阶段**

- `Before mutation`阶段（执行 DOM 操作前）：读取组件变更前的状态
  - 对于 CC 而言，会执行 `getSnapshotBeforeUpdate`，获取 DOM **更新前**的组件实例信息（更新前）
  - 对于 FC 而言，会异步调度 `useEffect` 钩子
- `mutation` 阶段（执行 DOM 操作）：
  - 对于 `HostComponent` 会执行相应的 DOM 操作
  - 对于 CC 会调用 `componentWillUnmount`
  - 对于 FC 会执行 `useLayoutEffect` 的**销毁函数**
- `layout` 阶段（执行 DOM 操作后）：在 DOM 操作完成后，读取当前组件的状态（更新后）
  - 对于 CC ，会调用 `componentDidMount` 和 `componentDidUpdate` 以及 `setState` 的回调函数
  - 对于 FC ，会执行 `useLayoutEffect` 的回调函数

在这当中，需要注意的是，在 `mutation` 阶段结束后，`layout` 开始之前，`workInProgress` 树会切换成 `current` 树。这样做是为了

- 在 `mutation` 阶段调用类组件的 `componentWillUnmount`的时候， 可以获取到**卸载前**的组件信息
- 在 `layout`阶段调用 `componentDidMount/Update` 时，获取的组件信息是组件**更新后**的。

`commit` 阶段的主流程在 `commitRootImpl` 这个函数中，可以明确的看到三个子阶段的执行

```javascript
function commitRootImpl(root, renderPriorityLevel) {
  // NOTE： 采用 do while 的作用是，在 useEffect 内部可能会触发新的更新，新的更新可能会触发新的副作用 ，因此需要不断的循环，直到 为 null
  do {
    flushPassiveEffects();
  } while (rootWithPendingPassiveEffects !== null); // Note：这一步是为了看看还有没有没有执行的 useEffect， 有的话先执行他们
  ...
  const finishedWork = root.finishedWork; // 当前的 rootFiber
  const lanes = root.finishedLanes; // 优先级相关
  ...
  root.finishedWork = null;
  root.finishedLanes = NoLanes;
  ...
  // 绑定 scheduler 的回调函数
  root.callbackNode = null;
  root.callbackPriority = NoLane;
  let remainingLanes = mergeLanes(finishedWork.lanes, finishedWork.childLanes);
  markRootFinished(root, remainingLanes);
  // Note：处理光标，重置一些 render 阶段使用的变量
  ...
  // 子树是否有更新
  const subtreeHasEffects =
    (finishedWork.subtreeFlags &
      (BeforeMutationMask | MutationMask | LayoutMask | PassiveMask)) !==
    NoFlags;
  const rootHasEffect =
    (finishedWork.flags &
      (BeforeMutationMask | MutationMask | LayoutMask | PassiveMask)) !==
    NoFlags;

  if (subtreeHasEffects || rootHasEffect) {
    // 存在副作用，处理 Fiber 上的副作用
    ...
    // 第一个阶段是 before mutation ，在这个阶段可以读取改变之前的的 state
    // 生命周期函数 getSnapshotBeforeUpdate 的调用
    const shouldFireAfterActiveInstanceBlur = commitBeforeMutationEffects(
      root,
      finishedWork,
    );
    ...
    //  mutation 阶段，可以在这个阶段 改变 host tree
    commitMutationEffects(root, finishedWork, lanes);
    ...
    // 交换 workInProgress
    root.current = finishedWork;
    ...
    // 执行 layout
    commitLayoutEffects(finishedWork, root, lanes);
    ...
    requestPaint();
    // 重置执行栈环境
    executionContext = prevExecutionContext;
    // 将优先级重置为之前的 非同步优先级
    setCurrentUpdatePriority(previousPriority);
    ReactCurrentBatchConfig.transition = prevTransition;
  } else {
    // No effects.
    ...
  }
  ...
  // Note：commit 阶段结尾，可能会在 commit 阶段产生新的更新，因此在 commit 阶段的结尾会重新调度一次
  ensureRootIsScheduled(root, now());
  ...
  // Note：react 中会将同步任务放在 flushSync 队列中，执行这个函数会执行它里面的同步任务
  // Note：默认 react 中开启的是 legacy 模式，这种模式下的更新都是 同步的 更新，未来会开启 concurrent 模式（并发模式），会出现不同优先级的更新
  flushSyncCallbacks();
  ...
  return null;
}
```

接下来我们去看看每个阶段都分别做了哪些工作！

 <br />