# BeginWork 工作流程
## 前言
render 阶段和 commit 阶段是整个 Fiber Reconcile 的核心，这节我们先来看看 Render 阶段的 beginWork 的主要工作。<br />在 render 阶段，React 会根据当前的可用时间片处理单个或多个 Fiber 节点，并且得益于 Fiber 对象中存储上下文信息的链表结构，使其能够在执行到一半的工作现场保存在内存当中，去处理其他一些优先级更高的事情。之后再找到停止的 Fiber 节点并继续工作
## 概览
`render`阶段开始于 `performSyncWorkOnRoot`或 `performConcurrentWorkOnRoot` 方法。不同的调用**取决于本次更新是同步更新还是异步更新。**
```javascript
// performSyncWorkOnRoot 会调用该方法
function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}
```
在 concurrent mode 下，会通过 scheduler 来调度更新，和同步模式下调度的唯一区别是**是否调用 shouldYield 函数**
> shouldYield 函数决定**是否需要中断**，如果浏览器当前帧没有剩余时间，shouldYield 会中止 while 循环，也不会执行后面的 performUnitOfWork 函数，自然也不会执行 render 和 commit 阶段，直到浏览器有空余时间再继续遍历

```javascript
// performConcurrentWorkOnRoot 会调用该方法
function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}
```
Fiber reconciler 从 Stack reconciler 重构后，`render` 阶段，使用**遍历实现了可中断的递归**，递归可以分为递阶段(`beginWork`)和归阶段(`completeWork`)<br />在前面的文章中也有提到，每一个 Fiber 可以看作是一个工作单元，在调和的过程中，每一个发生更新的 Fiber 都会作为一次新的 workInProgress。<br />那么上面这个函数 `workLoopxxx` 其实就是**执行每一个工作单元的调度器**，如果渲染没有中断，那么它会遍历整棵 Fiber 树。
```javascript
function performUnitOfWork(unitOfWork: Fiber): void {
  ...
    next = beginWork(current, unitOfWork, subtreeRenderLanes);
  ...
  if (next === null) {
    // If this doesn't spawn new work, complete the current work.
    completeUnitOfWork(unitOfWork);
  }
  ...
}
```
### 递阶段
递阶段首先会从 rootFiber 开始向下深度优先遍历。遍历到的每个 Fiber 节点，会调用 `beginWork` 方法，并且该方法会为传入的 Fiber 节点**创建它的子 Fiber 节点**，并赋值给 `workInProgress.child` 进行连接，当遍历到叶子节点时就会进入**归阶段**这个过程也叫做**调和**
### 归阶段
就是向上归并的过程，会执行 completeWork 方法来处理 Fiber 节点，当某个 Fiber 节点执行完 completeWork，如果有兄弟 Fiber 节点，会**进入该兄弟节点的递阶段**。如果不存在兄弟 Fiber 节点，会进入**父级节点的归阶段**，一直执行到 **rootFiber** ，期间可以形成 effectList，对于初始化构建会创建 DOM ，对 DOM 事件收集、处理 style等<br />这样递归的工作就完成了，这也就是整个 Fiber 树的调和的过程<br />![image.png](/img//beginwork/all.png "图片来自网络")

---

由于 `mount` 时，不存在对应的 current Fiber Tree，`update` 时存在 current Fiber Tree，因此在 `mount` 和 `update`时的工作会有不同，接下来细细看看
## beginWork
在前面，我们知道 beginWork 的主要工作是创建子 Fiber 节点<br />在 mount 时，会进行深度优先遍历，从根节点开始执行 beginWork，直到叶子节点后执行 completeWork 向上返回<br />在 update 时，会尽可能的去复用已有的 Fiber 节点
> tips：文本节点不会存在 Fiber

### beginWork 的入参
我们先来看看 beginWork 这个函数的参数
```javascript
function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes,
): Fiber | null {
  // ...省略函数体
}
```
beginWork 接收三个参数

- current：当前组件对应的 Fiber 节点在**上一次更新**时的 Fiber 节点，也就是 alternate 指向的 Fiber 节点
- workInProgress：当前组件对应的 Fiber 节点
- renderLanes：优先级相关的参数

在之前的双缓存机制的文章中，我们知道只有在首屏渲染时 current 等于 null，因为此时 DOM 还未构建，在 update 时 current 都不等于 null，因为 DOM 树已经存在 `current !== null`，**这也是 beginWork 流程的关键因素，**我们可以根据 current 是否为 null 来**判断当前组件是处于 update 阶段还是 mount 阶段**<br />因此，beginWork 的工作其实可以**分成两部分**

1. mount 时：会根据 Fiber.tag 的不同，执行不同类型的创建子 Fiber 节点的程序
1. update 时：会根据一定的条件复用 current 节点，这样可以通过 clone current.child 来作为 workInProgress.child ，而不需要重新创建
```javascript
function beginWork(
): Fiber | null {
  // update 时
  if (current !== null) {
    // 复用current
    return bailoutOnAlreadyFinishedWork(
      current,
      workInProgress,
      renderLanes,
    );
  } else {
    didReceiveUpdate = false;
  }
    // mount 时
    ...
}
```
### mount 时
首先会根据不同 Fiber 节点的 tag，执行不同的 case，进入不同类型的 Fiber 子节点创建逻辑
```javascript
switch (workInProgress.tag) {
    case IndeterminateComponent:{ // 不知道是 FC 还是 CC
      // ...
    }
    case LazyComponent:
    case FunctionComponent: // FC
    case ClassComponent: // CC
    case HostRoot:
    case HostComponent:
    ...
```
**最终都会进入 reconcileChildren 的逻辑**，在 reconcileChildren 的逻辑中，会判断当前的 fiber 节点的 children 是什么类型，来执行不同的创建操作
> 比如本次这个 fiber 节点 是一个 host component ，他是一个单一的 react element type，所以它会进入一个 reconcileSingle Element，最终会创建一个它的子节点

#### reconcileChildren
reconcileChildren 是 Reconciler 协调器的核心模块<br />这里我们看到它还是会根据 mount 和 update 进入不同的流程，`mountChildFibers` 或者 `reconcileChildFibers` ，但也可以看到**最终的结果都是生成新的子 Fiber 节点赋给 workInProgress.child** 。然后继续深度优先遍历它的子节点执行相同的操作
```javascript
export function reconcileChildren(
  current: Fiber | null,
  workInProgress: Fiber,
  nextChildren: any,
  renderLanes: Lanes,
) {
  // mount 时
  if (current === null) {
    workInProgress.child = mountChildFibers(
      workInProgress,
      null,
      nextChildren,
      renderLanes,
    );
  } else {
    // update 时，diff children将在这里进行
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren,
      renderLanes,
    );
  }
}
```
我们可以看到其实 `mount` 和 `update` 时调用的这两个方法是封装而成，差别只在于**传参的不同**，这个参数用来**表示是否追踪副作用** ，在 `ChildReconciler` 中用 `shouldTrackSideEffects` 来判断是否为对应的节点打上对应 DOM 操作的 `effectTag`(即 `flags`)
```javascript
export const reconcileChildFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(false);
```
需要注意的是：mount 时不需要追踪副作用，原因是我们只需要被插入一次，如果追踪副作用，那么每个节点都将被打上 EffectTag 为 Placement，这样 commit 阶段所有节点都会被插入一次, 这种频繁操作 DOM 的行为显然是消耗性能且没有必要的
#### ChildReconciler
在 ChildReconciler 这个方法中，实际上是通过闭包封装了大量的内部函数，其主要流程在于 reconcileChildFibers 这个方法，它的入参

- returnFiber：当前 Fiber 节点，即 workInProgress
- currentFirstChild：current 树上对应的当前 Fiber 节点的第一个子 Fiber 节点，mount 时为 null
- newChild：子节点(ReactElement)
- lanes：优先级相关
```javascript
function ChildReconciler(shouldTrackSideEffects) {
  function placeChild(
    newFiber: Fiber,
    lastPlacedIndex: number,
    newIndex: number,
  ): number {
    newFiber.index = newIndex;
      // 是否追踪副作用
    if (!shouldTrackSideEffects) {
      newFiber.flags |= Forked;
      return lastPlacedIndex;
    }
    const current = newFiber.alternate;
    if (current !== null) {
      const oldIndex = current.index;
      if (oldIndex < lastPlacedIndex) {
        // This is a move.
        newFiber.flags |= Placement;
        return lastPlacedIndex;
      } else {
        // This item can stay in place.
        return oldIndex;
      }
    } else {
      // This is an insertion.
      newFiber.flags |= Placement;
      return lastPlacedIndex;
    }
  }
  // 一大堆内部方法 ...
  function reconcileChildFibers(
    returnFiber: Fiber,
    currentFirstChild: Fiber | null,
    newChild: any,
    lanes: Lanes,
  ): Fiber | null {
    // ....
  }

  return reconcileChildFibers;
}
```
#### reconcileChildFibers
在这个方法中，首先会判断 newChild 的类型，进入不同的处理逻辑，还会判断 `$$typeof`，其实它就是 ReactElement 类型，它的值是一个 Symbol 类型的 REACT_ELEMENT_TYPE<br />这样做的目的是为了防止用户伪造 ReactElement JSON 对象，进行 **XSS 攻击**，采用 Symbol 类型堵住这个漏洞
```javascript
function reconcileChildFibers(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  newChild: any,
  lanes: Lanes,
): Fiber | null {
  if (typeof newChild === 'object' && newChild !== null) {
    switch (newChild.$$typeof) { // 根据$$typeof属性来进一步区分类型
      case REACT_ELEMENT_TYPE:
        return placeSingleChild(
          reconcileSingleElement(
            returnFiber,
            currentFirstChild,
            newChild,
            lanes,
          ),
        );
      case REACT_PORTAL_TYPE:
      // 省略
      case REACT_LAZY_TYPE:
      // 省略
    }
    /* 处理子节点是一个数组的情况 */
    if (isArray(newChild)) {
      ...
    }
      ...
  }
  /* 处理纯文本 */
  if (typeof newChild === 'string' || typeof newChild === 'number') {
    ...
  }
    ...
}

```
在 update 阶段 reconcileSingle Element 会进行单一节点的 Diff 算法<br />在判断 newChild 为 array 时，会进入多节点的 Diff 算法，具体会在后面讲到
### update 时
当 beginWork 的参数中 current 不为 null 时，会进入 update 的逻辑，在这个条件分支里，会根据一些条件来修改 `didReceiveUpdate` 这个变量的值，这个变量代表的是当前更新是否源自父级的更新

- 新旧 props 是否相等
- context 是否有改变
- type 是否有改变
```javascript
if (current !== null) {
  const oldProps = current.memoizedProps;
  const newProps = workInProgress.pendingProps;

  if (
    oldProps !== newProps ||
    hasLegacyContextChanged() ||
    (__DEV__ ? workInProgress.type !== current.type : false)
  ) {
    didReceiveUpdate = true;
  } else {
     /* props 和 context 没有发生变化，检查是否更新来自自身或者 context 改变 */
    const hasScheduledUpdateOrContext = checkScheduledUpdateOrContext(
      current,
      renderLanes,
    );
    if (
      !hasScheduledUpdateOrContext &&
      (workInProgress.flags & DidCapture) === NoFlags
    ) {
      didReceiveUpdate = false;
      return attemptEarlyBailoutIfNoScheduledUpdate(
        current,
        workInProgress,
        renderLanes,
      );
    }
    if ((current.flags & ForceUpdateForLegacySuspense) !== NoFlags) {
      didReceiveUpdate = true;
    } else {
      didReceiveUpdate = false;
    }
  }
} 
```
当新老 props 相等时，会进入 `checkScheduledUpdateOrContext` 的逻辑
#### checkScheduledUpdateOrContext
**检查当前 Fiber 节点上的 lanes 是否等于 updateLanes**，如果相等，那么证明更新来源当前 fiber 返回 true
```javascript
function checkScheduledUpdateOrContext(
  current: Fiber,
  renderLanes: Lanes,
): boolean {
  const updateLanes = current.lanes;
  if (includesSomeLane(updateLanes, renderLanes)) {
    return true;
  }
  ...
  return false;
}

```
当 `checkScheduledUpdateOrContext`函数返回 false，则证明当前组件没有更新，context 又没有变化，只能是子节点更新。会进入 `attemptEarlyBailoutIfNoScheduledUpdate` 的逻辑，在这个逻辑中会根据不同的 type 来复用 Fiber 节点
#### attemptEarlyBailoutIfNoScheduledUpdate
`attemptEarlyBailoutIfNoScheduledUpdate` 这个函数会处理部分 Context 逻辑，但是最重要的是调用了 `bailoutOnAlreadyFinishedWork`方法
```javascript
function attemptEarlyBailoutIfNoScheduledUpdate(
  current: Fiber,
  workInProgress: Fiber,
  renderLanes: Lanes,
) {
  switch (workInProgress.tag) {...}
  return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
 }
```
#### bailoutOnAlreadyFinishedWork
首先通过 `includesSomeLane`来判断 childLanes **是否是高优先级的任务**，如果不是，则子孙节点不需要被调和<br />简单来说，就是判断当前 Fiber 节点的子孙节点中，有没有需要在本次 render 过程中进行的更新任务，如果没有，则可以直接跳过当前节点下所有后代节点的 render<br />若后代节点中仍有本次 render 过程需要处理的更新任务，则**克隆 current 树上对应的子 Fiber 节点**并返回，作为下次 performUnitOfWork 的主体，但组件本身不会 rerender
```javascript
function bailoutOnAlreadyFinishedWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes,
): Fiber | null {
    // 如果 children 没有高优先级的任务，说明所有的 child 没有更新，那么child 不需要被调和
  if (!includesSomeLane(renderLanes, workInProgress.childLanes)) {
    if (enableLazyContextPropagation && current !== null) {
      lazilyPropagateParentContextChanges(current, workInProgress, renderLanes);
      if (!includesSomeLane(renderLanes, workInProgress.childLanes)) {
        return null;
      }
    } else {
      return null;
    }
  }
    // 当前fiber没有更新。但是它的children 需要更新
  cloneChildFibers(current, workInProgress);
  return workInProgress.child;
}
```
#### cloneChildFibers
复用 current Fiber Tree 上对应的子 Fiber 节点
```javascript
export function cloneChildFibers(
  current: Fiber | null,
  workInProgress: Fiber,
): void {
  
  // 判断子节点为空，则直接返回
  if (workInProgress.child === null) {
    return;
  }

  let currentChild = workInProgress.child;
  let newChild = createWorkInProgress(currentChild, currentChild.pendingProps);
  workInProgress.child = newChild;
  // 让子Fiber节点与当前Fiber节点建立联系
  newChild.return = workInProgress;
  // 遍历 Fiber 子节点的所有兄弟节点并进行节点复用
  while (currentChild.sibling !== null) {
    currentChild = currentChild.sibling;
    newChild = newChild.sibling = createWorkInProgress(
      currentChild,
      currentChild.pendingProps,
    );
    newChild.return = workInProgress;
  }
  newChild.sibling = null;
}
```
以上就是 update 是的主要流程，最核心的工作就是 bailoutOnAlreadyFinishedWork ，通过 bailout，一些与本次 update 无关的 Fiber 树路径可以被直接裁剪掉，直接进行复用，这种复用，会保留被裁剪的 Fiber 子树的所有 Fiber 节点
### 关于 EffectTag 是啥
> React 17 更新为 flags，用法相同

effectTag 实际上就是需要对节点需要执行的 DOM 操作（也可认为是副作用，即 sideEffect ）<br />render 阶段是在内存中进行的，render 阶段需要做的是为需要执行 DOM 操作的节点打上标记也就是 effectTag。 当工作结束后会通知 renderer 渲染器需要执行的 DOM 操作，要执行的 DOM 操作的具体类型就保存在 fiber.effectTag 中
```javascript
export const Placement = /*             */ 0b0000000000010;  // 插入节点
export const Update = /*                */ 0b0000000000100;  // 更新fiber
export const Deletion = /*              */ 0b0000000001000;  // 删除fiebr
export const Snapshot = /*              */ 0b0000100000000;  // 快照
export const Passive = /*               */ 0b0001000000000;  // useEffect的副作用
export const Callback = /*              */ 0b0000000100000;  // setState的 callback
export const Ref = /*                   */ 0b0000010000000;  // ref
```
采用二进制表示 effectTag 的类型，可以方便的使用位操作为 fiber.effectTag 赋值多个 effect<br />![image.png](/img//beginwork/test.png)<br />在下一节，我们会讲 render 阶段 completeWork 的主要流程

