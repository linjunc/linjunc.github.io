# React 常见面试题

在前面两个部分，写了 React 的基础使用，以及 React 源码的解析，包括了它的一些设计理念。但是对于面试来说，前面的内容，可能并不适合复习，知识点太过于零散了，所以在这个部分，会对一些常见的 React 面试题，做出我的回答。以供往后复习，也可以给大家一些参考。

:::tip 写在前面
如果有什么回答错误的地方，欢迎您在 GitHub 上提 issue，或者直接添加我的微信：**Ljc-10c** ，进行沟通
:::

## React 为什么要造出 Hooks 呢？

在没有 Hooks 的时候，函数组件能够做的只是**接受 Props、渲染 UI，以及触发父组件传过来的事件**。所有的处理逻辑都要在类组件中写，这样会使得 Class 类组件内部错综复杂，每一个类组件都有一套独特的状态，相互之间不能复用，即便是使用 mixin 的复用方式也没有很好的解决。

类组件是之间的状态会随着功能的增强变得越来越臃肿，代码维护成本越来越高，不利于 Tree Shaking。

Hooks 出现的本质原因是，**为了让函数式组件也能做类组件的事，有自己的状态，可以处理一些副作用、获取 Ref、也能够缓存数据**，同时函数组件也能够让复用变得更加简单。

## （追问）React Hooks 如何把状态保存起来？保存的信息存在了哪里？

在 React 的 render 阶段 fiber 调和的过程中，当遇到了 Function Component 类型的 Fiber，就会用 `updateFunctionComponent` 来更新 Fiber，在 `updateFunctionComponent` 的内部会调用 `renderWithHooks`。在 `renderWithHooks` 中，会用 `memoizedState` 保存 hooks 信息。

Hooks 的信息会被保存到 Fiber 的 `memoizedState` 中，这个 `memoizedState` 是一个链表，这个链表的连接关系就是 Hooks 的调用顺序，链表的每个节点都是一个 hooks 的信息，这个 hooks 对象中，保存着当前 hooks 的信息，不同 hooks 保存的形式不同

![](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgtwo/20230417003644.png)

## （追问）为什么 React Hooks 不能写在条件语句中

因为在 React hooks 更新的过程中，首先会从 workInProgress.alternate 中取出对应的 hook，**这个取出其实是按照顺序的，**然后根据这个 hooks 复制一份，形成新的 hooks 链表关系。

根据这个规则，如果在 if 条件语句中，使用 hooks，有可能导致 前后的 hooks 数量不一致，在复用 hooks 的过程中，会出现错乱的问题，也就导致了前后状态不一致的问题。

![](https://ljcimg.oss-cn-beijing.aliyuncs.com/imgtwo/20230417004301.png)

## React Hooks 的大致原理？

:::tip 我的回答
首先我觉得这个问题，可以先谈谈为什么 react 要造出 hooks，因为知道了为什么要做，我们就能知道该怎么做了。在没有 hooks 之前，函数式组件没有自己的状态，只能接受 props，渲染 ui，传递事件。hooks 的出现让函数式组件有了自己的状态。

那么可以想想类组件的状态是如何保存的，它是保存在类组件的实例上。

那么函数式组件要有自己的状态，那就需要有地方能够保存它的状态，也就是 React Fiber，在每个 element 对应的 fiber 节点上 的 `memoizedState` 字段，就是用来保存 hooks 信息的。在类组件中用来保存 state 状态。

React 在 fiber 的调和阶段，将所有的 function component 中调用的 hooks，注册到 `memoizedState` 上，与 fiber 形成关联

对于不同的 hooks 挂载的 hook 信息不同，要更新 hooks 可以通过返回的方法 dispatchAction 来进行更新，它会创建一个 update，然后把它放到待更新 pending 队列中。

然后判断如果当前的 fiber 正在更新，那么也就不需要再更新了。
反之，说明当前 fiber 没有更新任务，那么会拿出上一次 state 和 这一次 state 进行对比，如果相同，那么直接退出更新。如果不相同，那么发起更新调度任务。这就解释了，为什么函数组件 useState 改变相同的值，组件不更新了。

:::

## React Hooks 解决了什么问题

:::tip
前面也有提到很多，react hooks 的出现主要是为了解决函数式组件没有状态的问题，同时也解决了类组件状态和 ui 逻辑耦合导致难以复用的问题。复杂的类组件的逻辑会非常多，生命周期很多，组件难以理解，维护和拆分重构都非常困难。
:::

## 什么是虚拟 DOM，它的作用是什么？

:::tip
虚拟 DOM 是 React 在内存中描述节点的一种形态，我们编写的 JSX 可以说是一个语法糖，它通过 react 调和之后会形成一棵虚拟 DOM Tree，也可以理解为在内存中存在的形态。它反映的是真实 DOM 节点，在内存中用一个 Object 来描述。

在 DOM 节点数量少的情况下，直接操作真实 DOM 问题不大，浏览器不会出现很大的消耗。但是在节点非常多的情况下，页面触发 10 次更新，浏览器会进行 10 次的 layout 和 paint 的流程，非常可能出现卡顿的情况。虚拟 DOM 的出现就是解决这样的问题，它不会直接将更新直接应用在真实 DOM 节点上，而是通过虚拟 DOM 的计算，算出本次操作的更新带来了那样的结果，再将更新一次性应用在对应需要更新的节点上，避免了大量无谓的计算。

但是它的性能消耗在于需要做一次 Diff，找出变更。

同时虚拟 DOM 的抽象，也让跨平台变的更加容易，一套虚拟 DOM 可以映射到多套 DSL 上。
:::

## React Diff 的原理？

## React 为什么需要 Diff？

## useState 为什么用数组来声明，为什么不用对象？

数组解构是按照顺序的，对象是按名字的

## React cloneElement 和 createElement 的区别？

## React 中的 key 的作用是什么？
