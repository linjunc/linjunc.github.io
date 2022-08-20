# useId 源码解析

这是在 React v18 版本中新增的一个 hooks。它的出现是为了解决一些在 SSR 场景下，因为服务端生成随机 id 和客户端生成随机 id 不一致的问题，导致了客户端重新渲染

::: warning 重要
useId 是一个用于生成横跨服务端和客户端的稳定的唯一 ID 的同时避免 hydration 不匹配的 hook。
:::

## 使用场景

如果是 CSR 场景，id 是稳定的，不会有什么问题出现

在 useId 出现之前，会有这样的情况出现

```js
const id = Math.random();

export default function App() {
  return <div id={id}>Hello useId</div>
}
```

当我们采用 `Math.random()` 来生成随机 id 时，由于采用的 SSR，在服务端会生成一次随机 id，将 `jsx` 转成 `html` string 传递给客户端，作为首屏渲染

在客户端渲染时，生成随机 id，这一步叫 hydrate

客户端和服务端产生的 Id 不一致

useId 的诞生就是为了解决这个问题，那么是如何使用的呢？

## 使用方式

一个最简单的例子，只需要使用 `useId` 来生成稳定的 Id，直接传递 id 给需要它的元素即可，使用起来非常方便简单

```js
const id = useId()

export default function App() {
  return <div id={id}>Hello useId</div>
}
```

对于同一组件中的多个 ID，使用相同的 id 并添加后缀：

```ts
function NameFields() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id + '-firstName'}>First Name</label>
      <div>
        <input id={id + '-firstName'} type="text" />
      </div>
      <label htmlFor={id + '-lastName'}>Last Name</label>
      <div>
        <input id={id + '-lastName'} type="text" />
      </div>
    </div>
  );
}
```

那么 `useId` 生成的 id 是怎么样的呢？

![useId](/img/hooks/useid.png)

生成的 Id 是带 `:` 的，用来确保唯一，毕竟很少人用 `:` 做 id

::: warning 重要
useId 生成一个包含 : 的字符串 token。这有助于确保 token 是唯一的，但在 CSS 选择器或 `querySelectorAll` 等 API 中不受支持。
:::

和其他的 hook 一样，执行`useId` 会在 `mount` 阶段会调用 `mountId`，在 `update` 阶段会调用 `updateId`

先来看看 mountId

## mount 阶段

可以看到 `mountId` 会做以下几件事情

1. 创建 hook 对象
2. 获取当前组件的 root Fiber 上的 `identifierPrefix` id 前缀
3. 判断是 SSR 还是 CSR
   1. SSR 会根据 Tree 来生成 Id，并夹杂大写字母 R
   2. CSR 会根据一个全局变量来生成自增的 Id，夹杂小写字母 r
4. 最后挂载到 `memoizedState` 上

```ts
function mountId(): string {
  const hook = mountWorkInProgressHook();
  const root = ((getWorkInProgressRoot(): any): FiberRoot);
  const identifierPrefix = root.identifierPrefix;
  let id;
  if (getIsHydrating()) {
    const treeId = getTreeId();
    // Use a captial R prefix for server-generated ids.
    id = ':' + identifierPrefix + 'R' + treeId;
    const localId = localIdCounter++;
    if (localId > 0) {
      id += 'H' + localId.toString(32);
    }
    id += ':';
  } else {
    // Use a lowercase r prefix for client-generated ids.
    const globalClientId = globalClientIdCounter++;
    id = ':' + identifierPrefix + 'r' + globalClientId.toString(32) + ':';
  }
  hook.memoizedState = id;
  return id;
}
```

::: warning 注意
`identifierPrefix`: React 用于生成的 id 的可选前缀，在同一页面上使用多个根时避免冲突很有用。必须与服务器上使用的前缀相同。

```js
hydrateRoot(container, element[, options])
```

写在 options 里的
:::

重点需要放到这个 `getTreeId` 的方法上，这个函数究竟是如何工作的呢？

### getTreeId

getTreeId 使用组件的树状结构（在客户端和服务端都绝对稳定）来生成id。这里涉及到了 React 的 Id 生成算法具体可以看这个 [PR](https://github.com/facebook/react/pull/22644)

![useid-tree](/img/hooks/useid-tree.svg)

为了让 Id 更加的紧凑，并不是所有的组件都会生成 ID，只有调用了 `useId` 的组件才会生成 Id，并且 Id 是连续的，如果有其中一层组件没有调用 `useId` 那就跳过这一层

在 useId 的实际实现中，层级被表示为32进制的数。

如果 组件的层数超过了 32 进制数能表达的数时，会通过 `treeContextOverflow` 来将超出的几位截断，转成字符串，继续拼接在 id 的后面

```js
export function getTreeId(): string {
  const overflow = treeContextOverflow;
  const idWithLeadingBit = treeContextId;
  const id = idWithLeadingBit & ~getLeadingBit(idWithLeadingBit);
  return id.toString(32) + overflow;
}
```

## update 阶段

update 时，不需要做什么事情,获取 id 返回即可

```js
function updateId(): string {
  const hook = updateWorkInProgressHook();
  const id: string = hook.memoizedState;
  return id;
}
```
