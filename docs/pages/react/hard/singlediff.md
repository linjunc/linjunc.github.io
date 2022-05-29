## 前言

在上一节，已经说过了 Diff 算法的一些策略，这节开始通过源码来看看 React 是如何实现的<br />Diff 算法发生在 `beginWork` 阶段的 `reconcileChildFibers` 函数中，在这里会根据 Fiber 节点的 tag 不同，进入不同的逻辑<br />当新创建的节点 `typeof` 为 `object` 时，我们来看看 `REACT_ELEMENT_TYPE` 类型的 diff 。其执行的函数是 `placeSingleChild()` 函数，传参是 `reconcileSingleElement`函数的返回值

```javascript
// ReactChildFiber.old.js  function reconcileChildFibers
if (typeof newChild === 'object' && newChild !== null) {
  // 单一节点的 Diff
  switch (newChild.$$typeof) {
    case REACT_ELEMENT_TYPE:
      return placeSingleChild(
        reconcileSingleElement(
          returnFiber,
          currentFirstChild,
          newChild,
          lanes,
        ),
      );
      // case....
  }
```

核心逻辑在于 `ReconcileSingleElement` 中

## ReconcileSingleElement

在 `reconcileSingleElement`函数中，通过 `while`循环遍历父 Fiber 节点下所有的旧子 Fiber 节点，在每次的遍历中，都会对比 key 和 type 是否一致

```javascript
  function reconcileSingleElement(
    returnFiber: Fiber,
    currentFirstChild: Fiber | null, // 父 Fiber 下，第一个子 Fiber
    element: ReactElement, // 当前 react element
    lanes: Lanes, // 优先级
  ): Fiber {
    const key = element.key;
    let child = currentFirstChild;
    // dom 节点是否存在
    while (child !== null) {
      // 旧 fiber 节点的 key 和 新 fiber 节点的 key 相同
      if (child.key === key) {
        const elementType = element.type;
        // type 是否相等
        if (elementType === REACT_FRAGMENT_TYPE) {
          //如果新的 ReactElement 和 旧fiber 都是 fragment 类型且 key 相同
          if (child.tag === Fragment) {
            // 删除，单一节点更新，key type 不同，删除
            deleteRemainingChildren(returnFiber, child.sibling);
            const existing = useFiber(child, element.props.children);
            existing.return = returnFiber;
            ...
            return existing;
          }
        } else if(child.elementType === elementType){
          // 旧fiber节点的 key 和 新fiber节点的key 相同
          deleteRemainingChildren(returnFiber, child.sibling);
          const existing = useFiber(child, element.props);
          existing.ref = coerceRef(returnFiber, child, element);
          existing.return = returnFiber;
          return existing;
        }
        ...
        // key相同但是type不同 将该fiber及其兄弟fiber标记为删除
        deleteRemainingChildren(returnFiber, child);
        break;
      } else {
        // key 不同，删除 child
        deleteChild(returnFiber, child);
      }
      child = child.sibling;
    }
      // 创建新的 Fiber ....
  }
```

如果新旧 Fiber 节点的**key 和 type 都一致**，那么**可以复用**当前的旧 Fiber 节点，此时

- 通过  `deleteRemainingChildren`来对当前旧 Fiber 节点后面的兄弟 Fiber 节点标记 Deletion 删除标记
- 通过 `useFiber` 函数基于当前旧子 Fiber 节点和新 props 生成新的 Fiber 节点，以复用 Fiber 节点，返回新节点

```javascript
deleteRemainingChildren(returnFiber, child.sibling);
const existing = useFiber(child, element.props);
existing.ref = coerceRef(returnFiber, child, element);
existing.return = returnFiber;
return existing;
```

如果新旧 Fiber 节点的**key 相同，但 type 不同**，则将当前 Fiber 及其所有兄弟节点删除

```javascript
deleteRemainingChildren(returnFiber, child);
```

如果新旧 Fiber 节点的 **key 不同**，则删除当前 child 即可

```javascript
deleteChild(returnFiber, child); 
```

`deleteRemainingChildren`和 `deleteChild`的区别是，前者会通过 while 循环，遍历删除全部的 `child` 的 `sibling` 节点

## deleteRemainingChildren

`shouldTrackSideEffects`就是 `current`对应的参数，也就用来表明当前是 mount 还是 update 阶段，如果是 mount 阶段则不做操作，只有在 `update`才会做出处理<br />遍历 `child`，循环调用 `deleteChild` 进行删除

```javascript
function deleteRemainingChildren(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
): null {
  if (!shouldTrackSideEffects) {
    return null;
  }

  let childToDelete = currentFirstChild;
  while (childToDelete !== null) {
    deleteChild(returnFiber, childToDelete);
    childToDelete = childToDelete.sibling;
  }
  return null;
}
```

## placeSingleChild

`placeSingleChild` 函数所做的就是为 `reconcileSingleElement` 新生成的 Fiber 节点，打上 `Placement` 的 `effectTag`，在 `commit` 阶段进行 DOM 更新时执行插入的操作

```javascript
function placeSingleChild(newFiber: Fiber): Fiber {
  if (shouldTrackSideEffects && newFiber.alternate === null) {
    newFiber.flags |= Placement;
  }
  return newFiber;
}
```

## 疑问

- **为什么在 key 相同 type 不同时，删除全部的子节点？而 key 不同时，只删除当前节点？**

因为 当 key 相同，type 不同时，表达我们**已经找到了对应的 fiber，**但是由于 type 不同导致了不能复用，又因为 key 是唯一的，剩下的其他的 Fiber 都**无法再与这个 key 匹配**了，所以剩下的都是 `key` 的不同情况，因此**全部标记删除**<br />当 key 不同时，后面的 fiber **有可能**会和当前的 key 相同，因此仅仅删除当前的 fiber
