# useRef 源码解析

::: tip 前情提要
mountWorkInProgressHook 和 updateWorkInProgressHook 这两个方法的详解可以在[这里](./useState.html#在-update-阶段，updatestate)看到
本部分不做讲解
:::

## useRef 的实现

useRef 是一种近乎原生 hook,就是将 hook 的状态指向了某一个值,它用**对象**的方式,将它放存在堆内存中,保证指向和修改正确

## MountRef

> 省略了部分代码

```ts
function mountRef<T>(initialValue: T): {|current: T|} {
  const hook = mountWorkInProgressHook();
  const ref = {current: initialValue};
  hook.memoizedState = ref;
  return ref;
}
```

mountRef 的实现十分简单。

1. 首先会创建一个 hook 对象，该 hook 对象将会被添加到 `workInProgressHook` 单向链表中，接下来将要创建的 ref 对象将会被缓存到该 hook 对象上

```ts
const hook = mountWorkInProgressHook();
```

2. 接着创建一个 ref 对象，其 `current` 属性初始化为传入的参数(initialValue)：

```ts
const ref = { current: initialValue };
```

3. 然后将 ref 对象缓存到 hook 对象的 `memoizedState` 属性上

```ts
hook.memoizedState = ref;
```

4. 最后返回一个可变的 ref 对象，**其属性 current 发生变化时，不会引发组件重新渲染**

```ts
return ref;
```

## updateRef

调用 updateRef 函数，通过 `updateWorkInProgressHook` 方法直接取出 hook.memoizedState。

```ts
function updateRef<T>(initialValue: T): {|current: T|} {
  const hook = updateWorkInProgressHook();
  return hook.memoizedState;
}
```

没骗人，这个方法就这么长
![userefupdate](/img/hooks/userefupdate.png)

## 总结

可以看到在 `mount` 时 `hook.memoizedState` 挂的就是一个对象 `{ current: initialValue }`，这就解释了我们可以直接通过 `ref.current` 去**改变和获取最新的值**，不必进行任何依赖注入

因为它的本质就是一个对象哈，并不会引发组件的渲染，影响其他的东西

看到这里相信你一定会很震撼，一定也能感受到阅读源码给你带了的提升，在下次使用 `useRef` 的时候一定得心应手
