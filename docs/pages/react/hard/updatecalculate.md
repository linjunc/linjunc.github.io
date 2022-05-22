# Update的结构

ClassComponent与HostRoot（即rootFiber.tag对应类型）共用同一种Update结构。<br />对应的结构如下：

```javascript
const update: Update<*> = {
  eventTime,
  lane,
  suspenseConfig,
  tag: UpdateState,
  payload: null,
  callback: null,

  next: null,
};
```

> Update 由 createUpdate 方法返回，你可以从 [这里(opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactUpdateQueue.old.js#L189) 看到createUpdate的源码

字段意义如下：

- eventTime：任务时间，通过performance.now()获取的毫秒数。
- lane：优先级相关字段。
- suspenseConfig：Suspense相关，
- tag：更新的类型，包括UpdateState | ReplaceState | ForceUpdate | CaptureUpdate。
- payload：更新挂载的数据，不同类型组件挂载的数据不同。对于ClassComponent，payload为this.setState的第一个传参。对于HostRoot，payload为ReactDOM.render的第一个传参。
- callback：更新的回调函数。
- next：与其他Update连接形成链表。

# Update 与 Fiber 的联系

Update 存在一个连接其他 Update 形成链表的字段 next<br />我们知道 Fiber 节点组成 Fiber 树，页面中最多同时存在两棵 Fiber 树：

- 当前页面状态的 current Fiber 树
- 正在 render 阶段的 WIP Fiber 树

类似于 Fiber Tree ，Fiber 节点上的多个 Update 也会组成链表并包含在 fiber.updateQueue 中

> 例如：在 onClick 事件中触发两次 setState 更新就回生成两个 Update

因此其实一个 Fiber 节点最多同时存在两个 updateQueue

- current Fiber 中的 updateQueue 也就是 current updateQueue
- WIP fiber 中的 WIP updateQueue

在 commit 阶段完成页面渲染后，WIP Fiber 树变成了 current Fiber 树，WIP Fiber 树内的 Fiber 节点的 updateQueue 变成了 current updateQueue

# 如何保证状态正确

1. 在遇到高优先级的任务时，render 阶段可能会被中断，如何保证 updateQueue 中保存的 Update 不丢失呢？
1. 当我们更新状态时，有时候会依赖于前一个状态，如何在支持跳过低优先级任务的同时保证状态依赖的连续性呢？

## 如何保证状态不丢失

在render 阶段，shared.pending 的环状链表会被剪开，连接到 updateQueue.lastBaseUpdate 后面，也就是连接到当前 updateQueue 链表的结尾。**shared.pending 会被同时连接到 WIP 和 current Fiber 上的 updateQueue 中**<br />当 render 阶段被重新开始时，会基于 current.updateQueue 来克隆出 WIP updateQueue 。由于 current updateQueue 保存了上一次的 Update，所以不会丢失 Update<br />当 commit 阶段完成渲染，由于 workInProgress updateQueue.lastBaseUpdate 中保存了上一次的 Update，所以 workInProgress Fiber 树变成 current Fiber 树后也不会造成 Update 丢失。

## 如何保证状态依赖的连续性

当某个 Update 由于优先级低而被跳过的时候，保存在 baseUpdate 中的数据，不仅是该 Update，还包括了链表中该 Update 的所有 Update<br />当遇到 低优先级任务时，会先跳过这个任务，而去执行 UpdateQueue 中该优先级的任务，此时 memoizedState 会是执行完当前优先级 Update 后的状态<br />在第二次 render 的时候，会执行比上一次优先级低的任务，它会以上一次更新中，跳过状态前的状态作为 baseState 而不是第一次更新结束时的 memoizedState<br />这也造成了 下次更新的baseState !== 上次更新的 memoizedState 的情况<br />因此，我们可以得出这样的结论：<br />**React 保证了最终状态一定和用户触发的交互一致，但是中间过程状态可能不一致**

> 考虑如下例子：
> 
> baseState: '' shared.pending: A1 --> B2 --> C1 --> D2
> 
> 其中字母代表该Update要在页面插入的字母，数字代表优先级，值越低优先级越高。
> 
> 第一次render，优先级为1。
> baseState: '' baseUpdate: null render阶段使用的Update: [A1, C1] memoizedState: 'AC'
> 
> 其中B2由于优先级为2，低于当前优先级，所以他及其后面的所有Update会被保存在baseUpdate中作为下次更新的Update（即B2 C1 D2）。
> 
> 这么做是为了保持状态的前后依赖顺序。
> 
> 第二次render，优先级为2。
> 
> baseState: 'A' baseUpdate: B2 --> C1 --> D2 render阶段使用的Update: [B2, C1, D2] memoizedState: 'ABCD'

# 源码分析

源码位于 ReactUpdateQueue 中的 processUpdateQueue 中，

```javascript
  let firstBaseUpdate = queue.firstBaseUpdate;
  let lastBaseUpdate = queue.lastBaseUpdate;
// 判断是否有新产生的Update
  let pendingQueue = queue.shared.pending;
// 如果有新的 Update，进入 if 逻辑
  if (pendingQueue !== null) {
    queue.shared.pending = null;
    // 解开环状链表
    const lastPendingUpdate = pendingQueue;
    const firstPendingUpdate = lastPendingUpdate.next;
    lastPendingUpdate.next = null;
    
    // Append pending updates to base queue
    if (lastBaseUpdate === null) {
      firstBaseUpdate = firstPendingUpdate;
    } else {
      lastBaseUpdate.next = firstPendingUpdate;
    }
    // 将这条链表加在先前的 lastBaseUpdate 之后
    lastBaseUpdate = lastPendingUpdate;
    //判断 current Fiber 是否存在
    const current = workInProgress.alternate;
    if (current !== null) {
      // 防止 Update 丢失的必要操作
      const currentQueue: UpdateQueue<State> = (current.updateQueue: any);
      const currentLastBaseUpdate = currentQueue.lastBaseUpdate;
      if (currentLastBaseUpdate !== lastBaseUpdate) {
        if (currentLastBaseUpdate === null) {
          currentQueue.firstBaseUpdate = firstPendingUpdate;
        } else {
          currentLastBaseUpdate.next = firstPendingUpdate;
        }
        currentQueue.lastBaseUpdate = lastPendingUpdate;
      }
    }
  }
```

遍历 UpdateQueue

```javascript
do {
      const updateLane = update.lane;
      const updateEventTime = update.eventTime;
  // 判断优先级是否足够
      if (!isSubsetOfLanes(renderLanes, updateLane)) {
        // 优先级不足够，克隆一个 Update
        const clone: Update<State> = {
          eventTime: updateEventTime,
          lane: updateLane,

          tag: update.tag,
          payload: update.payload,
          callback: update.callback,

          next: null,
        };
        // 如果 newLastBaseUpdate 等于 null 说明是第一个跳过的低优先级，需要保存当前的状态到 newBaseState 中，作为下一次更新的 baseState
        if (newLastBaseUpdate === null) {
          newFirstBaseUpdate = newLastBaseUpdate = clone;
          newBaseState = newState;
        } else {
          newLastBaseUpdate = newLastBaseUpdate.next = clone;
        }
        // Update the remaining priority in the queue.
        newLanes = mergeLanes(newLanes, updateLane);
      } else {
        // This update does have sufficient priority.
        //....
      }
    } while (true);
```