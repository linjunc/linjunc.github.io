接下来到了**执行 DOM 操作**的 `mutation` 阶段的工作<br />
在 `before mutation` 阶段中，会一上一下的之行 begin 和 complete 的工作，最后 nextEffect 又回到了起始点

`mutation` 阶段会用同样的方式，**向下遍历，向上归并**，执行对应的函数，这里执行的是 `commitMutationEffects` 函数，它会通过调用 `commitMutationEffects_begin`函数来开始本次的 `mutation` 阶段的工作

> React 将每一个阶段又分为了 begin 和 complete，这样将逻辑进行抽离，主函数流程更加清晰

```javascript
export function commitMutationEffects(
  root: FiberRoot,
  firstChild: Fiber,
  committedLanes: Lanes,
) {
  inProgressLanes = committedLanes; // 优先级相关
  inProgressRoot = root;
  nextEffect = firstChild;

  commitMutationEffects_begin(root);

  inProgressLanes = null;
  inProgressRoot = null;
}
```

## commitMutationEffects_begin

可以看到在这个函数中，主体是一个 `while` 循环，会从 rootFiber 开始向下遍历，和 before mutation 的工作一样，找到最底层的有 mutation 标志的 fiber 节点，执行 `commitMutationEffects_complete` 函数<br />
如果遍历到的 **Fiber 上有 Deletion 标记**，则调用 `commitDeletion`函数，**分离 ref 引用**，并**调用 `componentWillUnmount` 生命周期函数**，断开 Fiber 与父节点的连接关系。这些工作都在 `commitDeletion` 函数中进行处理

> 这是在 React 17.0.3 之后才启用的字段，会在需要被 delete 掉的 Fiber 节点上的 deletions 字段上打上标记，这样可以直接通过 deletions 字段来判断是否需要删除该节点


```javascript
function commitMutationEffects_begin(root: FiberRoot) {
  while (nextEffect !== null) {
    const fiber = nextEffect;
    const deletions = fiber.deletions;
    if (deletions !== null) {
      for (let i = 0; i < deletions.length; i++) {
        const childToDelete = deletions[i];
        try {
          // 断开当前 Fiber 节点与 父节点之间的连接
          // 分离 ref ，调用 componentWillUnmount
          commitDeletion(root, childToDelete, fiber);
        } catch (error) {
          ...
        }
      }
    }

    const child = fiber.child;
    // ... 省去判断逻辑 nextEffect = child;
    commitMutationEffects_complete(root);
  }
}
```

## commitMutationEffects_complete

在 `commitMutationEffects_complete` 函数中，**会开始归并，优先处理兄弟节点，最后处理父节点**，调用 `commitMutationEffectsOnFiber` 函数，根据不同的组件类型，来执行更新、插入、删除 DOM 的操作

```javascript
function commitMutationEffects_complete(root: FiberRoot) {
  while (nextEffect !== null) {
    const fiber = nextEffect;
    ...
    // 核心，根据不同的类型，进行处理
    commitMutationEffectsOnFiber(fiber, root);
    ...
    const sibling = fiber.sibling;
    if (sibling !== null) {
      ensureCorrectReturnPointer(sibling, fiber.return);
      nextEffect = sibling;
      return;
    }

    nextEffect = fiber.return;
  }
}
```

## commitMutationEffectsOnFiber

在 `commitMutationEffectsOnFiber` 函数中

1. 首先会判断是否需要**重置文本节点**
1. 然后判断**是否有 `ref` 的更新**
1. 然后会根据 Fiber 上的 `flags` 的类型进行**二进制计算，**根据计算结果来执行不同的操作逻辑，这和前面介绍的 `effectTag` 的计算是相同的。会有**多个 case 存在**
   - **Placement**：执行 `commitPlacement` 函数插入 DOM 节点，然后删除 Placement 的 effectTag
   - **Update**：执行 `commitWork` 函数来执行更新操作，然后删除 Update 的 effectTag
   - **PlacementAndUpdate**：先调用 `commitPlacement` 执行插入操作，然后再调用 `commitWork` 执行更新操作。

对于 Deletion 的操作已经前置处理了，这里不介绍

```javascript
function commitMutationEffectsOnFiber(finishedWork: Fiber, root: FiberRoot) {
  const flags = finishedWork.flags;
  // 判断是否存在 文本节点，重置文本节点
  if (flags & ContentReset) {
    commitResetTextContent(finishedWork);
  }

  if (flags & Ref) {
    const current = finishedWork.alternate;
    if (current !== null) {
      commitDetachRef(current);
    }
    if (enableScopeAPI) {
      if (finishedWork.tag === ScopeComponent) {
        commitAttachRef(finishedWork);
      }
    }
  }
  // ... 处理副作用
  const primaryFlags = flags & (Placement | Update | Hydrating);
  outer: switch (primaryFlags) {
    case Placement: {
      commitPlacement(finishedWork);
      finishedWork.flags &= ~Placement;
      break;
    }
    case PlacementAndUpdate: {
      // Placement
      commitPlacement(finishedWork);
      finishedWork.flags &= ~Placement;

      // Update
      const current = finishedWork.alternate;
      commitWork(current, finishedWork);
      break;
    }
    // SSR 相关 case
     ...
    case Update: {
      const current = finishedWork.alternate;
      commitWork(current, finishedWork);
      break;
    }
  }
}
```

接下来我们来看看相应的对真实 DOM 节点的操作是如何进行的

## Placement 插入节点

当 `flags` 包含 `Placement` 的 `effectTag` 时，会调用这个 `commitPlacement` 函数来执行对 DOM 节点的插入操作<br />**主要的思路是**

1. 首先会根据当前的 Fiber 节点，来找到离他**最近的 Host 类型的 Parent Fiber 节点**

> Host 类型包括：HostComponent、HostRoot ...

2. 然后根据 `parent` Fiber 节点的 `tag` 类型，来判断父 Fiber 节点对应的 DOM 节点是否可以作为 `container` 容器，因为父节点有可能是一个 `component` 这样就不能直接插入
3. 当找到 `parent Fiber` 之后，如果 `parent Fiber` 上存在 `contentReset` 的 `effectTag` ，就需要执行 `resetTextContent`，来重置文本
4. 接下来会找到当前 `Fiber` 节点的 Host 类型的 `slibing` 节点
   1. 当执行 `insertBefore` 时，就需要知道当前 Fiber 节点对应的**兄弟节点**
   1. 当需要执行 `appendChild` 时，需要知道当前 Fiber 节点的 Host 类型 Parent 节点
5. 根据是否可以作为 `container` ，来**调用不同的函数**在指定的位置**插入新的节点**。实际上这两个函数的处理逻辑是一致的，**唯一的区别**就是需不需要判断**父节点**是不是 `COMMENT_NODE` 

```javascript
function commitPlacement(finishedWork: Fiber): void {
  // NOTE：如果不支持 mutation 会直接返回了
  if (!supportsMutation) {
    return;
  }
  // NOTE：根据当前节点找到离他最近的 host 类型 fiber 节点
  // getHostParentFiber 一直向上递归查找，直到找到为止
  const parentFiber = getHostParentFiber(finishedWork);

  let parent;
  let isContainer;
  const parentStateNode = parentFiber.stateNode;
  //根据父节点的 tag 类型，来判断是否能够作为被插入节点的container，（有可能是组件形式）
  switch (parentFiber.tag) {
    case HostComponent:
      parent = parentStateNode;
      isContainer = false;
      break;
    case HostRoot:
      parent = parentStateNode.containerInfo;
      isContainer = true;
      break;
      ...
  }
      //  如果父节点有 ContentReset 的 flags，则重置其文本内容
  if (parentFiber.flags & ContentReset) {
    resetTextContent(parent);
    parentFiber.flags &= ~ContentReset;
  }
  // 找到 host 的兄弟节点，需要在哪插入
  const before = getHostSibling(finishedWork);

  if (isContainer) {
    insertOrAppendPlacementNodeIntoContainer(finishedWork, before, parent);
  } else {
    insertOrAppendPlacementNode(finishedWork, before, parent);
  }
}
```

### insertOrAppendPlacementNodeIntoContainer

在这个函数中分为两部分

- 如果是**原生 DOM 节点**，调用 `insertInContainerBefore` 或 `appendChildToContainer` 来在相应的位置插入 DOM 节点
- 如果不是原生 DOM 节点，会对当前 Fiber 节点的所有子 Fiber 节点调用 `insertOrAppendPlacementNodeIntoContainer` 对自身进行遍历，直到找到 DOM 节点，然后插入

```javascript
function insertOrAppendPlacementNodeIntoContainer(
  node: Fiber,
  before: ?Instance,
  parent: Container,
): void {
  const {tag} = node;
// 判断当前节点是否为原生的 DOM 节点
  const isHost = tag === HostComponent || tag === HostText;
  if (isHost) {
    const stateNode = node.stateNode;
    if (before) {
      // 插入
      insertInContainerBefore(parent, stateNode, before);
    } else {
      // 追加
      appendChildToContainer(parent, stateNode);
    }
  } else if (tag === HostPortal) {
    // 不处理
  } else {
    // 不是原生 DOM 节点，需要遍历插入当前节点的子节点
    const child = node.child;
    if (child !== null) {
      insertOrAppendPlacementNodeIntoContainer(child, before, parent);
      let sibling = child.sibling;
      while (sibling !== null) {
        insertOrAppendPlacementNodeIntoContainer(sibling, before, parent);
        sibling = sibling.sibling;
      }
    }
  }
}
```

### insertInContainerBefore 插入节点

当 `before` 存在时，会进入这个逻辑。也说明当前需要插入节点的前一个节点是明确的了<br />在这里需要判断当前父节点**是否为注释类型的节点**

- 如果是**注释类型**的节点，会在父节点的父节点下插入新的 DOM 节点
- 如果不是，则调用原生 DOM 节点的 `insertBefore` 方法来直接插入节点

```javascript
export function insertInContainerBefore(
  container: Container,
  child: Instance | TextInstance,
  beforeChild: Instance | TextInstance | SuspenseInstance,
): void {
  if (container.nodeType === COMMENT_NODE) {
    (container.parentNode: any).insertBefore(child, beforeChild);
  } else {
    container.insertBefore(child, beforeChild);
  }
}
```

`appendChildToContainer` 差不多，不多讲，源码位置 `packages/react-dom/src/client/ReactDOMHostConfig.js`

## Update 更新节点

在前面的代码中我们也能看到，在更新节点时，都会调用 `commitWork`函数来处理<br />下面我们来揭开它的面纱

### commitWork

`commitWork` 函数会对不同类型的更新做出处理，重点关注 HostComponent 和 HostText 类型

整体流程如下

- 首先会判断**是否支持 mutation**，执行其他的逻辑，这里我们的宿主环境不会进入当前逻辑，跳过这部分
- 接下来会根据 Fiber 节点的 tag 类型，进入不同的条件语句：

对于和 **Function Component 相关的类型**，例如 `simpleMemoComponent`、`functionComponent` 等类型，会执行 `commitHookEffectListUnmount`函数，也就是会**调用 `useLayoutEffect` 或 `useInsertionEffect` 的销毁函数**
<br />具体是会遍历当前的 `updateQueue` 队列，如果当前 Fiber 节点的 `effectTag` 等于传入的 tag（HookLayout ｜ Insertion），这个 `effectTag` 就表示，当前 Fiber 节点包含对 `useLayoutEffect` 或 `useInsertionEffect` 的调用，会执行它们的**销毁函数**

```javascript
function commitHookEffectListUnmount(
  flags: HookFlags,
  finishedWork: Fiber,
  nearestMountedAncestor: Fiber | null,
) {
  const updateQueue: FunctionComponentUpdateQueue | null = (finishedWork.updateQueue: any);
  const lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
  if (lastEffect !== null) {
    const firstEffect = lastEffect.next;
    let effect = firstEffect;
    do {
      if ((effect.tag & flags) === flags) {
        // Unmount
        const destroy = effect.destroy;
        effect.destroy = undefined;
        if (destroy !== undefined) {
          ...
          safelyCallDestroy(finishedWork, nearestMountedAncestor, destroy);
          ...
          
        }
      }
      effect = effect.next;
    } while (effect !== firstEffect);
  }
}
```

- 对于 HostComponent 类型的节点，首先会获取到 **新旧props**以及 `updateQueue` ，最后调用 `commitUpdate`来对 DOM 进行更新

```js
case HostComponent: {
  // 获取对应的 DOM 节点
  const instance: Instance = finishedWork.stateNode;
  if (instance != null) {
    // 新旧 props
    const newProps = finishedWork.memoizedProps;
    const oldProps = current !== null ? current.memoizedProps : newProps;
    const type = finishedWork.type;
    // 获取 updateQueue
    const updatePayload: null | UpdatePayload = (finishedWork.updateQueue: any);
    finishedWork.updateQueue = null; // 清空
    if (updatePayload !== null) {
      // 提交更新
      commitUpdate(
        instance,
        updatePayload,
        type,
        oldProps,
        newProps,
        finishedWork,
      );
    }
  }
  return;
}
```

- 对于 HostText 类型的更新，首先获取到真实的文本节点、**新旧文本的内容**，调用 `commitTextUpdate` 来更新文本节点的 nodeValue

```javascript
// FC 相关的 case 调用 commitHookEffectListUnmount
case HostText: {
  // ...错误处理
  const textInstance: TextInstance = finishedWork.stateNode;
  const newText: string = finishedWork.memoizedProps;

  const oldText: string =
    current !== null ? current.memoizedProps : newText;
  // 更新新旧 text
  commitTextUpdate(textInstance, oldText, newText);
  return;
}
// ... 不关注
}
```

### commitUpdate
在 `commitWork` 中，会调用 `commitUpdate` 函数来进行元素的更新，`commitUpdate` 主要做以下几件事

- 执行 `domElement[internalPropsKey] = props` ，来更新 props
- 然后调用 `updateProperties` 函数，来更新 DOM 的属性，将 `diff` 的结果应用到真实 DOM 上，首先会对 radio 进行特殊的处理，然后会调用 `updateDOMProperties`，然后根据 Fiber 的 tag 类型，对 input、textarea、select 等表单类型的节点做处理

```javascript
export function commitUpdate(
  domElement: Instance,
  updatePayload: Array<mixed>,
  type: string,
  oldProps: Props,
  newProps: Props,
  internalInstanceHandle: Object,
): void {
  // domElement[internalPropsKey] = props
  updateFiberProps(domElement, newProps);
  // 将 diff 结果应用于真实DOM
  updateProperties(domElement, updatePayload, type, oldProps, newProps);
}
```

### updateDOMProperties

在 `updateDOMProperties` 中会遍历 `updateQueue` 队列，将更新作用到真实 DOM 节点上，根据 propKey 进行不同的更新操作

```javascript
function updateDOMProperties(
  domElement: Element,
  updatePayload: Array<any>,
  wasCustomComponentTag: boolean,
  isCustomComponentTag: boolean,
): void {
  // 遍历 updatePayload
  for (let i = 0; i < updatePayload.length; i += 2) {
    const propKey = updatePayload[i];
    const propValue = updatePayload[i + 1];
    if (propKey === STYLE) {
      // 处理 style
      setValueForStyles(domElement, propValue);
    } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
      // 处理 innerHtml
      setInnerHTML(domElement, propValue);
    } else if (propKey === CHILDREN) {
      // 处理 children
      setTextContent(domElement, propValue);
    } else {
      // 处理其他节点属性
      setValueForProperty(domElement, propKey, propValue, isCustomComponentTag);
    }
  }
}
```

---

接下来执行 layout 阶段