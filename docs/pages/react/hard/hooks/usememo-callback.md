# useCallback & useMemo 源码解析

::: tip 前情提要
mountWorkInProgressHook 和 updateWorkInProgressHook 这两个方法的详解可以在[这里](./useState.html#在-update-阶段，updatestate)看到
本部分不做讲解
:::

由于 `useCallback` 和 `useMemo` 的实现基本一致，这里放到一起来讲，顺便也能对比这两者的差别

首先同样先看看这两个 hook 是如何使用的

## 基本使用

对于 `useMemo`，我们一般用来缓存一个值，只有在依赖变化的时候才会去重新计算这个值

这样做的好处就是，如果这个值的计算有非常高的复杂度，就不会频繁的计算这个值，只有在 deps 变更时才会重新计算

```ts
// 第一个参数是 create 函数，第二个参数是依赖项数组
const value = useMemo(() => test(a), [a]);
```

对于 `useCallback` 来说，和 `useMemo` 的不同是，`useCallback` 缓存的是一个函数

```ts
const callback = useCallback(() => {
  test(a);
}, [a]);
```

## Mount 时

在 mount 时，分别调用了 `mountCallback` 和 `mountMemo` 函数，

```ts
const HooksDispatcherOnMount: Dispatcher = {
  useCallback: mountCallback,
  useMemo: mountMemo,
};
```

通过 `mountWorkInProgressHook` 方法**创建 hook 添加到了 hooks 链表中**,然后返回相应的值

**mountMemo**

```ts
function mountMemo<T>(
  nextCreate: () => T,
  deps: Array<mixed> | void | null,
): T {
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  // 计算需要缓存的值
  const nextValue = nextCreate();
  // 将计算后的值和相应的依赖项保存到 hook 对象的 memoizedState 属性上
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}
```

**mountCallback**

```ts
function mountCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  // 将 useCallback 的第一个参数 和相应的依赖项保存到 hook 对象的 memoizedState 属性上
  hook.memoizedState = [callback, nextDeps];
  // 返回函数本身
  return callback;
}
```

不同的是

- `mountCallback` 的 `memoizedState` 是 [callback, nextDeps]，并且**返回的是其第一个参数；**
- `mountMemo` 的 `memoizedState` 是 [nextValue, nextDeps]，返回的也是 `nextValue` 也就是其第一个参数的执行结果。

这也就是这个回调执行不执行的事了，就差了一行代码

## Update 时

update 时，分别调用了 `updateCallback` 和 `updateMemo` 函数

```ts
const HooksDispatcherOnUpdate: Dispatcher = {
  useCallback: updateCallback,
  useMemo: updateMemo,
};
```

通过 `updateWorkInProgressHook` 取出对应的 hook

**updateCallback**

```ts
function updateCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;
  // 从 memoizedState 中取出上一次的 deps 判断依赖是否相同，如果相同则，返回之前的函数
  if (prevState !== null) {
    if (nextDeps !== null) {
      const prevDeps: Array<mixed> | null = prevState[1];
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
    }
  }
  hook.memoizedState = [callback, nextDeps];
  return callback;
}
```

**updateMemo**
和 updateCallback 一样，就多了依赖不等的时候，执行一下这个回调，返回新的就好了

```ts
function updateMemo<T>(
  nextCreate: () => T,
  deps: Array<mixed> | void | null,
): T {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;
  if (prevState !== null) {
    // Assume these are defined. If they're not, areHookInputsEqual will warn.
    if (nextDeps !== null) {
      const prevDeps: Array<mixed> | null = prevState[1];
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
    }
  }
  const nextValue = nextCreate();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}
```

关于比较的方法在[这里](./useeffect.html#update-时-〉updateeffect)已经有讲过了

## 小总结

在 mount 时，会把各自的 hook 对象挂到 `memoizedState` 上，返回相应的值

在 update 时，会判断依赖是否相同

- 如果 deps 未发生改变，则取上一轮的 callback 或者 value 返回；
- 如果 deps 发生改变，则重新赋值 `hook.memoizedState` 并返回新的 callback 或新计算的 value

::: tip 提问
这里有个小问题，为什么一个函数还要判断它的依赖相等呢
:::

原因是每一次的函数执行的作用域是不同的,如果依赖变化,但是函数未重定义,就会使数据指向不符合预期
