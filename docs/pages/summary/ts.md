![ts](/img/ts/ts.jpeg)

最近在看 `TypeScript` 相关的内容，做了一下类型体操，真的太秀啦

递归、`infer` 满天飞，今天就来领略一下 `TS` 能做什么骚操作吧！

先放上本文的几个小标题，很骚

- 巧用数组上数学课
- 模版字符串为所欲为
- 中序遍历 TS 也能行
- infer + 递归随意秒杀

下面开始军训体操

## 一、巧用数组上数学课

这一题是 TS 类型挑战中的 [Greater Than](https://github.com/type-challenges/type-challenges/blob/main/questions/04425-medium-greater-than/README.md)

这道题需要我们实现 `GreaterThan<T, U>` 判断 `T > U` 是 `true` 还是 `false`

有几个特殊测试用例

```ts
GreaterThan<2, 1> //should be true
GreaterThan<1, 1> //should be false
GreaterThan<10, 100> //should be false
GreaterThan<111, 11> //should be true
```

看到这题，在 JS 中非常的简单，直接就能有答案，但是 TS 是没有计算能力的，也不支持大小判断

那么我们还能怎么做呢？巧用数组，通过**数组的 `length` 来进行比较**，

有两种可行的方法

- 第一种就是递归，但是通过实践我们会知道，当参数过大时，很容易爆栈
- 第二种方法就是构造两个长度为 `T` 和 `U` 的数组，通过数组判断哪个数组更长

这里我们先看第一种方法

### 递归法

可以采用递归来实现，前面我们也有说过了，数组的很容易爆掉，但是测试用例还算温柔，这题能过

- 思路是拿一个新数组，和 `T`,`U` 进行对比，哪个先追上新数组的长度，哪个就小
- 简单一点来说就是，两个不一样长的木棍放在一起，我们从一端开始不断往前走，先摸到的那个木棍就是短一点的

看到具体实现上

通过引入新的变量 `R extends any[] = []` ,来进行辅助的计算，接着依次判断 `T`，`U` 和 `R['length]` 是否相等，这时候，如果 `T` 和 `R['length`] 相等了而 U 还没有相等，那就说明了 `T < U` ，如果都不相等，那就继续加大数组 `R` 的长度

怎么加大数组 `R` 呢？

递归的时候，往数组中多加一个值即可，`GreaterThan<T, U, [...R, 1]>` 这里的 `1` 就是塞进去把 `length` 整大的

这样就完成了这道大小判断

```ts
// 答案
type GreaterThan<T extends number, U extends number, R extends any[] = []> = 
  T extends R['length']
    ? false
    : U extends R['length']
      ? true
      : GreaterThan<T, U, [...R, 1]>
```

### 构造数组

我们还有一种很巧妙的方法

先看几段小代码

```ts
[1, 1, 1, 1] extends [1, 1] ? true : false // false
[1, 1] extends [1, 1, 1] ? true : false // false
```

上面的例子中，两个数组长度不等，很显然都会返回 `false`

那么我们抽象一下，这同样会返回 `false`，因为很显然多了 `...any` 嘛

```ts
// 伪代码
A extends [...A, ...any] ? true : false
```

那么我们就可以有这样的思路，例如比较 2 和 3

我们就可以比较数组 A`[1, 1]` 和数组B `[1, 1, 1]`

我们就可以这么来看，**数组 B 可以表示为 `[...A, 1]` 所以 B 大于 A**，A 没有办法这样表示 B 所以更小

显然我们这个思路没啥问题！

如何实现呢？**关键在于怎么构造长度为 T 和 U 的数组**

写一个生成长度为 N 的数组的方法，需要接受长度 `T`，还需要使用辅助变量 `A` 来保存当前的数组并作为返回值

采用递归的方式往数组中添加新的元素，这样数组的 `['length']` 就会不断的变长，当等于 `T` 时，就结束循环，返回数组 `A`

```ts
type newArr<T extends number, A extends any[] = []> = 
  A['length'] extends T
    ? A
    : newArr<T, [...A, '']>
```

验证一下，没啥毛病

```ts
type A = newArr<4> // type A = ["", "", "", ""]
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c027a42157f4480b2562ea62ff03a9d~tplv-k3u1fbpfcp-watermark.image?)

接下来就好办了，我们比较这两个数组就好了，为了美观抽出一个 type 来，这个就是我们前面讲到的逻辑

```ts
type GreaterArr<T extends any[], U extends any[]> = U extends [...T, ...any] ? false : true
```

最后调用它进行比较,KO

```ts
type GreaterThan<T extends number, U extends number> = GreaterArr<newArr<T>, newArr<U>>
```

## 二、模版字符串为所欲为

这一节，来看看模版字符串在 TS 里有多骚

这一题是 3326 · BEM style string，我们需要实现 BEM 函数完成其规则拼接，不理他，直接看用例

```ts
type ClassNames1 = BEM<'btn', ['price']> // 'btn__price'
type ClassNames2 = BEM<'btn', ['price'], ['warning', 'success']> // 'btn__price--warning' | 'btn__price--success'
type ClassNames3 = BEM<'btn', [], ['small', 'medium', 'large']> // 'btn--small' | 'btn--medium' | 'btn--large'
```

不过就是根据参数的位置，用不同的符号进行连接，例如`BEN<'aaa', ['b'], ['c']>`

b 是第二个参数，那么就用 `__` 来连接，c 是第三个参数就用 `--` 来连接

这题怎么做呢，我们只需要根据不同的参数利用模版字符串定义不同的模版即可

但是你会发现我们传参是数组形式的，我们要的是一个个的，那就需要通过下标来将数组或者对象转成联合类型

```typescript
// 数组转联合
T[number]
// 对象转联合
Object[keyof T]
```

特殊的，当字符串中通过这种方式申明时，会自动生成新的联合类型，例如这题下面的写法，

```ts
type BEM<B extends string, E extends string[], M extends string[]> = `${B}__${E[number]}--${M[number]}`
```

会得到 `type A = "btn__price--warning" | "btn__price--success"` 这样的结果

但是这并没有考虑到空数组的情况，因此需要做提前的判断，

```typescript
type IsNever<T> = [T] extends [never] ? true : false
type IsUnion<U> = IsNever<U> extends true ? "" : U
type BEM<B extends string, E extends string[], M extends string[]> = `${B}${IsUnion<`__${E[number]}`>}${IsUnion<`--${M[number]}`>}`
```

模版字符串想拼啥就拼啥，酷！

## 三、中序遍历 TS 也能行

JS 实现中序遍历，你闭着眼睛就能写，那 TS 呢

这是我们的测试用例，我们需要实现 `InorderTraversal` 方法，来实现中序遍历

```ts
const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const

type A = InorderTraversal<typeof tree1> // [1, 3, 2]
```

这题看上去很难，TS 怎么还能遍历树呢，其实是可以的，非常简单，和 JS 的思路是一致的，我们先看看 JS 是如何实现中序遍历的呢？

```javascript
const inorderTraversal = (root) => {
  if(!root) return []
  const res = []
  while(root) {
    inorderTraversal(root.left)
    res.push(val)
    inorderTraversal(tree.right)
  }
  return res
}
```

JS 是在 root 为 `null` 时结束。对于 `TS` 来说，实现递归，需要 `extends TreeNode` 而不是 `null` 来结束

>不能使用 `null` 来判断，是因为 `TS` 不能判断类型 `T` 是否符合 `TreeNode` 类型

在结束前，我们需要递归的调用这个方法，左中右的顺序

```typescript
// 答案
interface TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}
type InorderTraversal<T extends TreeNode | null> = 
  [T] extends [TreeNode] 
    ? (
      [
        ...InorderTraversal<T['left']>,
        T['val'],
        ...InorderTraversal<T['right']>
      ]
    )
    : []
```

## 四、infer + 递归随意秒杀

`infer` 可谓是 TS 中的大杀器，大多数题目都会涉及到它的使用，他可以很方便的帮我们推断出一个变量的类型，我们看看这道题

实现一个像 `Lodash.without` 函数一样的泛型 `Without<T, U>`，它接收数组类型的 T 和数字或数组类型的 U 为参数，会返回一个去除 U 中元素的数组 T。

```ts
type Res = Without<[1, 2], 1> // expected to be [2]
type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]> // expected to be [4, 5]
type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]> // expected to be []
```

不用看题目啦，直接看用例，无非就是把第二个参数中的值，从数组中去掉

这题我们非常容易想，通过 `infer` 和 递归来实现，用 `infer` 取出数组的第一项

- 如果能够被 `U` 包含，那就丢弃，也就是把剩余的递归，不保留这一项
- 如果不包含，那就用 `[R, ...]` 把它给留下，剩下的继续递归
因此很有可能写下这样的代码

```typescript
type Without<T, U> = 
  T extends [infer R, ...infer F]
    ? R extends U
      ? Without<F, U>
      : [R, ...Without<F, U>]
    : T
```

但是发现只过了一个用例，问题在于 `U` 有可能是数组，也有可能是字符串，而单纯采用 `extends` 来判断只能处理字符串的情况

因此我们需要解决如何判断字符串和数组两种情况

可以采用数组转 `Union` 的方法来解决

```typescript
type ToUnion<T> = T extends any[] ? T[number] : T
type B = ToUnion<['1','b']> // type B = "1" | "b"
```

这样无论是数字还是数组，都会转成联合类型，而联合类型很方便判断 extends 包含关系：

```typescript
// 答案
type ToUnion<T> = T extends any[] ? T[number] : T
type Without<T, U> = 
  T extends [infer R, ...infer F]
    ? R extends ToUnion<U>
      ? Without<F, U>
      : [R, ...Without<F, U>]
    : T
```

## 总结

这篇文章通过几道例题，带大家领略了 TS 的风采，也看到了 TS 的弊端：计算能力，在使用 TS 过程中，我们要

- 巧用辅助变量
- 遇到计算时大胆使用 `['length']`
- 诡异字符串操作多用模版字符串
- infer + 递归大杀器

好了本文的内容就这么多了，更多关于 TS 的内容，以后再说，随缘更新！

> 有帮助的话留言点赞哦！
