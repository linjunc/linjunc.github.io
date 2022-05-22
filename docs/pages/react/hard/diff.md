# 什么是多节点 Diff？

> 多节点 Diff 针对的是多个同级的 JSX 对象的情况

例如下面的 a 和 b 切换就会经历多节点的 Diff

```javascript
const a = (
  <div>
    <p key="a" >第一个 p</p>
    <h3 key="b"> 我是 h3</h3>
  </div>
)
const b = (
  <div>
    <h3 key="b"> 我是 h3</h3>
    <p key="a" >第一个 p</p>
  </div>
)
```

在上一节，我们介绍的是单一节点的 Diff，现在考虑 FC，它的返回值 JSX 对象的 children 属性不是单一节点，而是包含多个对象的 数组

```javascript
{
  $$typeof: Symbol(react.element),
  key: null,
  props: {
    children: [
      {$$typeof: Symbol(react.element), type: "li", key: "0", ref: null, props: {…}, …}
      {$$typeof: Symbol(react.element), type: "li", key: "1", ref: null, props: {…}, …}
      {$$typeof: Symbol(react.element), type: "li", key: "2", ref: null, props: {…}, …}
      {$$typeof: Symbol(react.element), type: "li", key: "3", ref: null, props: {…}, …}
    ]
  },
  ref: null,
  type: "ul"
}
```

这种情况下，reconcileChildFibers 的 newChild 参数类型为Array，在 reconcileChildFibers 函数内部会进入下面的 if 中，从而处理 array 多节点的 diff

```javascript
  if (isArray(newChild)) {
    // 调用 reconcileChildrenArray 处理
    // ...省略
  }
```

会有个 newChild 为新的节点![image.png](../../../../img/diff/diff1.png)

# 概览

节点操作前

```javascript
<ul>
  <li key="0" className="before">0<li>
  <li key="1">1<li>
</ul>
```

## 节点更新

1. 节点属性变化

```javascript
<ul>
  <li key="0" className="after">0<li>
  <li key="1">1<li>
</ul>
```

2. 节点类型更新

```javascript
<ul>
  <div key="0">0</div>
  <li key="1">1<li>
</ul>
```

## 节点新增或减少

1. 新增节点

```javascript
<ul>
  <li key="0">0<li>
  <li key="1">1<li>
  <li key="2">2<li>
</ul>
```

2. 节点删除

```javascript
<ul>
  <li key="1">1<li>
</ul>
```

## 节点位置变化

```javascript
<ul>
  <li key="1">1<li>
  <li key="0">0<li>
</ul>
```

对于同级多个节点的Diff，一定属于以上三种情况中的一种或多种

# Diff 的思路

在实际的场景中，节点更新使用的场景会更加高一些，因此 React 中会优先处理节点更新的情况<br />在 `reconcileChildrenArray`的参数中，`currentFirstChild`是 FiberNode 也就是链表的结构，`newChild`则是一个 JSX 对象，因此我们对比的是一个 链表和一个数组

> 虽然本次更新的 JSX 对象 newChildren为数组形式，但是和 newChildren 中每个组件进行比较的是current fiber，同级的 Fiber 节点是由 sibling 指针链接形成的单链表，即不支持双指针遍历。
> 即 newChildren[0] 与 fiber 比较，newChildren[1] 与 fiber.sibling 比较。
> 所以无法使用**双指针**优化。

Diff 算法的目的就是最终返回一个 WIPFiber<br />第一轮遍历：处理更新的节点<br />第二轮遍历：处理剩下的不属于更新的节点

## 第一轮遍历

1. 遍历 `newChild`，将 `newChildren[i]`与 `oldFiber`比较，判断 `DOM`节点是否可复用
2. 如果可以复用，`i++`，将继续比较 `newChildren[i]`与 `oldFiber.sibling`，可以复用继续遍历
3. 如果不可复用
   1. key 不同导致不可复用，直接跳出整个遍历，第一轮遍历结束
   1. key 相同 type 不同导致不可复用，会将 oldFiber 标记为 DELETION 删除，并继续遍历
4. 如果 newChildren 遍历完 或者 oldFiber 遍历完，跳出遍历，第一轮遍历结束

第一轮遍历跳出遍历有两种可能

### 1. key 不同跳出遍历

> updateSlot 方法：判断是否需要新建一个 Fiber

如果是 key 不同的情况下，执行 updateSlot 方法会返回 null 

```javascript
function updateSlot( returnFiber: Fiber, oldFiber: Fiber | null,  newChild: any,lanes: Lanes,): Fiber | null {
  const key = oldFiber !== null ? oldFiber.key : null;
// ...
  // 	处理 react Element 
  if (typeof newChild === 'object' && newChild !== null) {
    switch (newChild.$$typeof) {
      case REACT_ELEMENT_TYPE: {
        if (newChild.key === key) {
          return updateElement(returnFiber, oldFiber, newChild, lanes);
        } else {
          return null;
        }
      }
      //...
    }

  return null;
}
```

newFiber 会被赋值为 null，进入 if 逻辑，break 跳出本次遍历

```javascript
if (newFiber === null) {
    if (oldFiber === null) {
      oldFiber = nextOldFiber;
    }
    break;
}
```

### 2. key 相同 type 不同

当 key 相同时，会进入 switch case 中的 if 逻辑，执行 updateElement 方法，type 不同而执行 `createFiberFromElement`方法，生成新的 Fiber 

```javascript
function updateElement(
  returnFiber: Fiber,
  current: Fiber | null,
  element: ReactElement,
  lanes: Lanes,
): Fiber {
  const elementType = element.type;
// ...
  if (current !== null) {
    if (current.elementType === elementType ){
    // type 相同逻辑
    }
  }
  // type 不同
  const created = createFiberFromElement(element, returnFiber.mode, lanes);
  created.ref = coerceRef(returnFiber, current, element);
  created.return = returnFiber;
  return created;
}
```

因此此时的 newFiber 为新创建的这个 Fiber 节点，因而会进入 reconcileChildrenArray 中下面这个 if 逻辑，newFiber的 alternate 指针为 null ，将 oldFiber 标记删除 

```javascript
if (shouldTrackSideEffects) {
  if (oldFiber && newFiber.alternate === null) {
    // We matched the slot, but we didn't reuse the existing fiber, so we
    // need to delete the existing child.
    deleteChild(returnFiber, oldFiber);
  }
}
```

创建了新的 Fiber 节点，我们需要为新的 Fiber 节点赋值一个 placement 的 effectTag ，这样在 commit 阶段才会被标记为需要插入到 DOM 中

```javascript
function placeChild(
  newFiber: Fiber,
  lastPlacedIndex: number,
  newIndex: number,
): number {
    // 新节点插入的索引
  newFiber.index = newIndex;
  // ...
  const current = newFiber.alternate;
    // 先判断 current 是否存在
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
    // 新创建的 fiber 节点，alternate 为 null，赋值 placement 的 effectTag
    newFiber.flags |= Placement;
    // lastPlacedIndex 代表本次更新的节点在 DOM 中的位置
    return lastPlacedIndex;
  }
}
```

### 3. 遍历完成跳出遍历

可能 newChildren 遍历完，或 oldFiber 遍历完，或他们同时遍历完。

```javascript
// 之前
<li key="0" className="a">0</li>
<li key="1" className="b">1</li>
            
// 之后 情况1 —— newChildren与oldFiber都遍历完
<li key="0" className="aa">0</li>
<li key="1" className="bb">1</li>
            
// 之后 情况2 —— newChildren没遍历完，oldFiber遍历完
// newChildren剩下 key==="2" 未遍历
<li key="0" className="aa">0</li>
<li key="1" className="bb">1</li>
<li key="2" className="cc">2</li>
            
// 之后 情况3 —— newChildren遍历完，oldFiber没遍历完
// oldFiber剩下 key==="1" 未遍历
<li key="0" className="aa">0</li>
```

## 第二轮遍历

建立在第一轮的结果之上

### 1. newChildren 与 oldFiber 同时遍历完

只需要一轮遍历，diff 完成

### 2. newChildren 没遍历完，oldFiber 遍历完

说明 newChildren 中有新的节点加入，意味着本次更新有新节点插入，我们需要遍历剩下的 newChildren 为生成的 WIP fiber 标记为 Placement 即可

### 3. newChildren 遍历完，oldFiber 没遍历完

意味着 newchildren 中，有节点被删除，所以需要遍历剩下的 oldFiber，依次标记 DELETION 

### 4. newChildren 与 oldFiber 都没遍历完

意味着有节点在本次更新中改变了位置<br />由于节点位置发生了改变，所以我们不能再使用位置索引 index 来对比前后节点<br />我们需要用 key 来对比<br />为了在 O(1) 复杂度内，找到 key 对应的 oldFiber 节点，将所有未处理的 oldFiber 存在在 key --> FiberNode<br /> 的 Map 中<br />遍历剩余的 newChildren，通过 newChildren[i].key 就能在 existingChildren 中找到 key 相同的 oldFiber。

```javascript
// 之前
abcd

// 之后
dabc

===第一轮遍历开始===
d（之后）vs a（之前）  
key改变，不能复用，跳出遍历
===第一轮遍历结束===

===第二轮遍历开始===
newChildren === dabc，没用完，不需要执行删除旧节点
oldFiber === abcd，没用完，不需要执行插入新节点

将剩余oldFiber（abcd）保存为map

继续遍历剩余newChildren

// 当前oldFiber：abcd
// 当前newChildren dabc

key === d 在 oldFiber中存在
const oldIndex = d（之前）.index;
此时 oldIndex === 3; // 之前节点为 abcd，所以d.index === 3
比较 oldIndex 与 lastPlacedIndex;
oldIndex 3 > lastPlacedIndex 0
则 lastPlacedIndex = 3;
d节点位置不变

继续遍历剩余newChildren

// 当前oldFiber：abc
// 当前newChildren abc

key === a 在 oldFiber中存在
const oldIndex = a（之前）.index; // 之前节点为 abcd，所以a.index === 0
此时 oldIndex === 0;
比较 oldIndex 与 lastPlacedIndex;
oldIndex 0 < lastPlacedIndex 3
则 a节点需要向右移动

继续遍历剩余newChildren

// 当前oldFiber：bc
// 当前newChildren bc

key === b 在 oldFiber中存在
const oldIndex = b（之前）.index; // 之前节点为 abcd，所以b.index === 1
此时 oldIndex === 1;
比较 oldIndex 与 lastPlacedIndex;
oldIndex 1 < lastPlacedIndex 3
则 b节点需要向右移动

继续遍历剩余newChildren

// 当前oldFiber：c
// 当前newChildren c

key === c 在 oldFiber中存在
const oldIndex = c（之前）.index; // 之前节点为 abcd，所以c.index === 2
此时 oldIndex === 2;
比较 oldIndex 与 lastPlacedIndex;
oldIndex 2 < lastPlacedIndex 3
则 c节点需要向右移动

===第二轮遍历结束===
```

可以看到，我们以为从 abcd 变为 dabc，只需要将d移动到前面。<br />但实际上React保持d不变，将abc分别移动到了d的后面。<br />从这点可以看出，考虑性能，我们要尽量减少将节点从后面移动到前面的操作。