# Recoil 理念和用法

## React 状态管理

我们在实现组件间交互时，常常会需要使用状态来控制，例如：通过按钮控制弹窗展示

我们需要定义一个 `isOpen` 的状态，通过这个状态来决定显示和隐藏。

我们可以通过 props 的方式，将状态值分发下去，同时将 dispatch 方法也进行透传。这样我们可以在子组件中更改父组件的状态，从而控制兄弟组件的渲染。

```ts
export const Page = () => {
    const [isOpen, setIsOpen] = useState(false)
    return <>
        <ButtonComponent setIsOpen={setIsOpen}  />
        <Dialog isOpen={isOpen} />
    </>
}
```

当项目逐渐复杂，我们的状态需要被越来越多的组件使用，按照上面的方式，我们需要不断的把状态往上提，再通过 props 透传下来。

到最后，所有的状态都被存在父节点上，根节点上也可能会有大量的状态，全部通过 props 传递，这样会导致很多问题

- 状态需要层层传递，组件间通信困难。
- 状态变化，引起根组件重渲染，出现性能问题，当然可以用 memo，但是也增加了 memo 的工作量
- 状态会变得十分混乱，可维护性降低
- 组件和根组件耦合严重，难以拆分和复用

开始用一些状态管理工具，例如官方的 useContext，第三方状态库 Redux、Mobx

### useContext

我们可以通过 useContext 和 useReducer hook 来实现跨层级状态传递。

通过 createContext 创建 context 上下文，通过 provider 来提供状态。

```ts
const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
  )
}
```

通过 useContext hook 可以在组件中读取和订阅 context

```ts
import { useContext } from 'react';

function Button() {
  const theme = useContext(ThemeContext);
  // ...
```

useContext 实现状态管理的方式存在着一些问题

- useContext 中的状态变化，所有使用这个 context 的组件都会重新渲染，这会导致一些不必要的重渲染，造成性能问题，同时我们也没有很好的性能优化手段
- 我们需要规划好哪些状态存放在哪个 context 内，这样导致状态分散在多个不同的 context 中，难以管理和维护
- React 18 下存在并发更新冲突的问题？

随之，我们开始尝试第三方状态管理库

### Redux

Redux 开始提倡了 immutable 的方式来实现数据的管理。

正如 Redux 官网说的，Redux 让你开发出 **行为稳定可预测** 的应用

这也是 Redux 的核心吧，通过 dispatch action 的方式来触发状态变化，通过 reducer 来处理状态变化，reducer 必须是一个纯函数，相同的输入要用相同的输出，不产生副作用。

Redux 可以分为 3 个重要的部分

**Store**

使用 Redux 提供的 createStore 函数传入一个 reducer 创建 Store。Store 对 object 的内部实现是通过事件订阅模式来关联组件和状态的变化。

```js
import { createStore } from 'redux';
import rootReducer from './reducers'; // rootReducer 是多个 reducer 的组合

const store = createStore(rootReducer);
```

**Action**

Action 就是前面说的行为。表示执行的是什么操作，通过 type 表示操作，其他属性来携带信息

```js
const incrementAction = {
  type: 'INCREMENT',
  payload: 1
};

// action 创建函数
function increment(payload) {
  return {
    type: 'INCREMENT',
    payload
  };
}
```

**Reducer**

Reducer 是 action 的执行者，生成新的状态并返回。

```js
function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + action.payload;
    ...
    default:
      return state;
  }
}
```

当派发一个 Action 时，Store 会调用 Reducer 生成新的状态，并基于订阅者模式通知关联组件更新，触发组件重新渲染。

Redux 用的很难受，它规定我们必须要按照这样的范式来编写代码，每个状态变化都要对应一个行为出现，很难受

后来又有了 Mobx

### Mobx

Mobx 是响应式状态管理库，感觉和 Vue 的响应式原理有点像？

Mobx 还是需要通过编写数据模型，通过响应式的数据模型来驱动组件重新渲染。

Mobx 的缺点还是需要定义数据模型，不过比 Mobx 的方式要简单很多了，而且还是响应式的。

现在也出现了越来越多的第三方状态库，zustand、jotai、recoil 好多库

这里主要讲讲 recoil，因为工作中需要接触到，正好学习一下！

## Recoil 基础用法

Recoil 官网说的很简单，说实话很难轻易的看明白。因为 Recoil 引入了一些新的名词，atom、selector 都会有一点难理解吧。下面用的理解解释一下

Recoil 和其他状态管理库一样，也是将所有的变量存放在顶层数据集合中，但是 Recoil 可以做到对每个变量进行拆分和组合，这也就是 Recoil 中的原子性吧。

原子是化学反应中最小且不可再分割的元素。但是在物理上还可以分成电子和原子核，因此可以把原子理解成足够小，不可分割的最小单位

下面通过官网的例子来写

### Recoil 特性

首先和需要用特有的标签包裹 App 组件，用于创建一个状态管理对象，对于子组件不会感知到这个对象的存在。

```js
import React from 'react';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <A />
    </RecoilRoot>
  );
}
```

然后在组件 A 中，使用 Recoil 提供的函数来定义和管理数据

用一个字符串类型的 key，作为变量的 ID，然后得到变量 textState 的引用

```js
const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});
```

在组件 B 中，用 Recoil 提供的钩子函数，传递 textState 引用对象为参数，获取到操作变量的不同权限

1. 获取读和写的权限
2. 只获取读的权限
3. 只获取写的权限

```js
const [text, setText] = useRecoilState(textState);
const text = useRecoilValue(textState);
```

都有不同的钩子来获取，这样在组件 A 和组件 B，各自都有对变量 textState 的读写能力，那么只要有一方修改了值，Recoil 都会自动通知另一方，并且重新渲染。

Recoil 可以让我们非常方便的定义全局变量，唯一的心智负担是需要全局唯一的标识 id，用来定位每一条数据。


### 拆分和组合

**拆分的例子**

假设通过 Recoil 定义了一个 object 类型的变量 obj，结构为

```js
{
    a: number,
    arr: string[],
}
```

假设有个组件 A，只关心 obj.arr 值的变化，按照传统的状态管理思路，一定需要将 obj 完整引入，然后通过 obj.arr 这种形式去找到 arr 。

但是 Recoil 中可以只引入 arr，也就是对于组件 A 而言，它并不关心 obj 的存在。

**类似的组合例子**

假设有两个变量 obj1，obj2

```js
{
  width: number,
  height: number,
  x: number,
  y: number
}
```

假设有组件 B 需要获取 obj1 和 obj2 水平距离，基于之前，我们需要引入 obj1，obj2，然后进行计算得到间隔

```js
const offsetX = objB.x - objA.x - objA.width
```

但是 Recoil 可以将计算进行剥离，派生出新的状态 offsetX，组件 B 无需关心 obj1，obj2，只需引入 offsetX。

通过 Recoil 提供的能力，我们可以对状态进行拆分和组合，减少定义更多的原始状态。

### Atom / Selector

相信到这里你对拆分和组合有了一定的了解，可以开始看这两个最重要的概念了。

#### atom

atom 用来定义变量，传递 key 唯一 id 和 default 默认值，会返回一个 RecoilState 实例，注意返回的这个 RecoilState 是引用。

```js
export const a = atom({
  key: 'a',
  default: 'xxxxxxx'
})
```

这样，我们通过 atom 就向全局添加了 id 为 a 的变量

在实际项目中，为了防止 key 被重复定义，我们可以通过建立 keyMap 对象，所有的 key 都从这里暴露出去，方便统一管理

```js
const keyMap = {
    a: 'a',
    b: 'b'
}
``` 

也可以将原子变量写在一起，统一集体导出。这样可以方便引用不同的 atom。

#### selector

selector 官方的定义是：接收原子数据或其他选项作为数据输入源的纯函数。

前面讲拆分和组合就是为了为 selector 铺垫，可以通过 selector 将原子数据组合和拆分出新的数据

首先我们先用 atom 创建一个变量，记录一个字符串的值

```js
const textState = atom({
    key: 'textState',
    default: ''
})
```

再使用 selector 派生出一个用于表示字符串长度的变量

```js
const countState = selector({
    key: 'charCountState',
    get: ({ get }) => {
        const text = get(textState) //获取到字符串
        return text.length //返回字符串的长度
    }
})
```

通过传递 get 方法来定义 state 的获取方式，get 函数会传入 get 参数，这两个不一样，get 参数可以用来获取 atom 的值。

selector 看起来真的很好用，还可以派生出同时依赖多个原子数据状态的 state

```js
const xxxState = selector({
    key: 'xxxState',
    get: ({ get }) => {
        const aa = get(aaState)
        const bb = get(bbState)
        ...
        return xxxxx
    }
})
```

selector 也是纯函数，也有点像 Redux 的那种，但是大不相同。selector 带来了很多的好处，

- 无需修改对应的组件，就能将它们本地的 state 用派生数据替换。
- 无需修改对应的组件，就能将派生数据在同步与异步间切换。

### Recoil Hooks

#### useRecoilState

用户获取变量的读写权限

用法和 useState 一样，都是 `state + dispatch` 的形式。区别在于需要传入的参数是 RecoilState 实例

```js
const textState = atom({
    key: 'textState',
    default: ''
})

const [text, setText] = useRecoilState(textState)
```

#### useRecoilValue、useSetRecoilState

`useRecoilValue` 返回给定 RecoilState 的值，这个 hook 只获取值，`useSetRecoilState` 得到修改变量的方法

```js
const text = useRecoilValue(textState)
const setText = useSetRecoilState(textState)
```

`useRecoilValue` 和 `useRecoilState` 还是存在着不一样的地方的

`useRecoilValue` 可以用来获取只读 state 和可写 state 的值。Atom 是可写 state，而 selector 可以是只读，也可以是可写的

但是 `useRecoilState` 不行，`useRecoilState` 传入的 state 参数必须是 可写的 selector，或者是 atom

**可写的 selector 是指，同时定义了 get 和 set 函数的。而只读是只有一个 get 函数**

#### useResetRecoilState

返回一个函数，用来把给定 state 重置为其初始值。

```js
const textState = atom({
    key: 'textState',
    default: ''
})

const reset = useResetRecoilState(textState)

reset()
```

reset 触发后，textState 对应的变量恢复成默认值。

还有几个其他的钩子，处理异步数据等，这里先不看了～


## Recoil 实现原理

> 展示不从源码角度分析

Recoil 基于发布订阅模式来实现状态更新，在调用取值 hook 读取 atom 时，组件会隐式的订阅该 atom，任何 atom 变化都会引起组件的重新渲染。

也就是说，在读取 atom 的地方，就会开启一个 subscribe，在 update 时，会进行 emit