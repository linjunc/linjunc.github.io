# useLayoutEffect 源码解析

::: tip 提示
useLayoutEffect 在实现上和 `useEffect` 基本一致，在 `mount` 和 `update` 时，调用的都是同一个方法，因此本部分具体讲 `useLayoutEffect` 在调度上
和 `useEffect` 有什么不同，以及使用场景
:::

`useLayoutEffect` 和 `useEffect` 的实现基本一致，不同之处在于 `useLayoutEffect` 是被**同步执行**的，`useEffect` 会被 Scheduler **异步调度**，这也是它们最大的不同

## 源码解析

由于 `useLayoutEffect` 是同步执行的，因此不需要像 `useEffect` 一样去收集 `Effect` 对象，而是直接通过 `updateQueue` 去执行。

`useLayoutEffect` 的**回调函数执行在 Layout 阶段，销毁函数执行在 Mutation 阶段**。

在 `mutation` 阶段，调用 `commitHookEffectListUnmount` 来卸载上一次的 `effect`

> 值得注意的是 `commitHookEffectListUnmount` 这个方法在 `mutation` 阶段会被调用多次，但是需要注意它的参数，只有是 `HookLayout` 才代表 `useLayoutEffect`

```js
function commitMutationEffectsOnFiber(
  finishedWork: Fiber,
  root: FiberRoot,
  lanes: Lanes,
) {
  const current = finishedWork.alternate;
  const flags = finishedWork.flags;
  switch (finishedWork.tag) {
    case FunctionComponent:
    case ForwardRef:
    case MemoComponent:
    case SimpleMemoComponent: {
      recursivelyTraverseMutationEffects(root, finishedWork, lanes);
      commitReconciliationEffects(finishedWork);
      ...
      commitHookEffectListUnmount(
              HookLayout | HookHasEffect,
              finishedWork,
              finishedWork.return,
        );
    }
  }
}
```

在 `layout` 阶段，调用 `commitHookEffectListMount` 执行 useLayoutEffect 的 回调函数

```js
// commitLayoutEffectOnFiber{}
commitHookLayoutEffects(finishedWork, HookLayout | HookHasEffect);
```

`commitHookLayoutEffects` 最后会调用到  `commitHookEffectListMount`方法，去执行 `useLayoutEffect` 的回调函数

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

::: tip 重要提示
Effect 对象通过 tag 字段区分是 useEffect 还是 useLayoutEffect，`HookPassive` 为 `useEffect`，`HookLayout` 为 `useLayoutEffect`，
`HookHasEffect` 标记 Effect 的回调和销毁函数需要执行。
:::

## 理论

- `useLayoutEffect` 的 **create** 以及 **destroy**的执行都会阻塞浏览器渲染。当需要操作真实的 DOM 时，需要放在 `useLayoutEffect` 的回调函数中执行，同时 `useLayoutEffect` 的回调尽量避免耗时长的任务
- `useEffect` 的 **create** 以及 **destroy** 的执行都不会阻塞浏览器渲染。`useEffect` 尽量避免操作真实的 DOM，因为 `useEffect` 的回调函数的执行时机是在浏览器绘制之后执行。如果此时在 `useEffect` 的回调里又操作真实的 DOM，会导致浏览器回流重绘。同时可以将耗时长的任务放在 `useEffect` 的回调中执行。

## 使用场景

相比 `useEffect`，`useLayoutEffect` 无论销毁函数和回调函数的执行时机都要更早一些，且会在 `commit` 阶段中同步执行。
因此 `useLayoutEffect` 中适合进行一些可能影响 dom 的操作，因为在其 create 中可以获取到最新的 dom 树且由于此时浏览器未进行绘制（本轮事件循环尚未结束），
因此不会有中间状态的产生，可以有效的避免闪动问题。因此当业务中出现需要在 effect 中修改视图，且执行的上一帧中视图变更，就可以考虑是否将逻辑放入 `useLayoutEffect` 中处理。

当然，`useLayoutEffect` 的使用也应当是谨慎的。由于 js 线程和渲染进程是互斥的，因此 `useLayoutEffects` 中不宜加入很耗时的计算，否则会导致浏览器没有时间重绘而阻塞渲染。

网上找了个对比图，非常明显，useEffect 会闪动一下，就因为引起了页面的重新渲染嘛

**useEffect**
![useEffect](/img/hooks/useeffectgif.awebp)
**useLayoutEffect**
![uselayout](/img/hooks/uselayoutgif.awebp)
