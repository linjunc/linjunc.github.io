## 前言
在最前沿的 diff 算法中，复杂度达到了 O(n^3) <br />react 的 diff 会有 3个限制 

1. 只对同级元素进行 diff ，如果 dom 前后两次更新跨层级，不会复用，而作为新元素 
1. 两个不同类型的元素会产生出不同的树。如 div 变成 p 会将整棵树销毁 
1. 可以通过 key 来暗示不同的渲染下保持稳定 

## 单一节点的 diff 

对于单一节点，会进入 `reconcileSingleElement`的逻辑

```javascript
// ReactChildFiber.old.js  function reconcileChildFibers
// Handle object types
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

1. 首先会判断上次更新时的 Fiber 节点是否存在对应 DOM 节点
2. 判断 DOM 节点是否可以复用
   1. key 是否相同
   1. type 是否相同
3. 如果可以复用，将上次更新的 Fiber 节点的副本作为本次新生成的 Fiber 节点并返回
4. 如果不可以服用，标记 DOM 为需要被删除，新生成一个 Fiber 节点并返回

## 判断是否可以复用

判断是否可以复用的逻辑在 `reconcileSingleElement` 中

```javascript
  function reconcileSingleElement(
    returnFiber: Fiber,
    currentFirstChild: Fiber | null,
    element: ReactElement,
    lanes: Lanes,
  ): Fiber {
    const key = element.key;
    let child = currentFirstChild;
    // dom 节点是否存在
    while (child !== null) {
      // TODO: If key === null and child.key === null, then this only applies to
      // the first item in the list.
      // key 是否相同
      if (child.key === key) {
        const elementType = element.type;
        // type 是否可以服用
        if (elementType === REACT_FRAGMENT_TYPE) {
          if (child.tag === Fragment) {
            // 删除，单一节点更新，key type 不同，删除
            deleteRemainingChildren(returnFiber, child.sibling);
            const existing = useFiber(child, element.props.children);
            existing.return = returnFiber;
            if (__DEV__) {
              existing._debugSource = element._source;
              existing._debugOwner = element._owner;
            }
            return existing;
          }
        } else {
          // ...
        }
        // 代码执行到这里代表：key相同但是type不同
        // 将该fiber及其兄弟fiber标记为删除
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

在上面的代码中，React 先判断 key 是否相同，如果 key 相同，则判断 type 是否相同，只有都相同时，一个 DOM 节点才能复用<br />需要特别注意的是

- 当 key 相同，type 不同时，执行的是 `deleteRemainingChildren`将 child 和 他的 sibling 节点，都标记为删除
- 当 key 不同时，只将 child 标记删除

## 例子

原因如下面这个例子<br />当页面中的 3 个 li ，被替换成一个 p 节点时

```javascript
// 当前页面显示的
ul > li * 3

// 这次需要更新的
ul > p
```

只有单一节点 p 的更新，属于上面的逻辑<br />在 `reconcileSingleElement`中遍历之前的 3个 Fiber ，寻找是否有本次更新的 p 能够复用的 fiber 对应的 DOM 节点<br />当 key 相同，type 不同时，表达我们**已经找到了对应的 fiber** ，但是 p 与 li type 不同，不能匹配，唯一的 key 已经无法匹配了，因此其他的 fiber 节点更没有机会了，所以需要标记删除<br />当  key 不同时，后面的 fiber 有可能会和 当前的 key 相同，因此仅仅删除当前的 fiber