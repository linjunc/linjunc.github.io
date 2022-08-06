
# Middle 题

## 2 · 获取函数返回类型

题目：不使用 `ReturnType` 实现 TypeScript 的 `ReturnType<T>` 范型。

```typescript
const fn = (v: boolean) => {
  if (v) return 1
  else return 2
}

type a = MyReturnType<typeof fn> // 应推导出 "1 | 2"
```

:::details 查看解答
通过 `infer` 来推断返回的参数类型

```typescript
type MyReturnType<T> = T extends (...args: any) => infer R ? R : never
```

:::

## 3 · 实现 Omit

题目：不使用 Omit 实现 TypeScript 的 `Omit<T, K>` 范型。Omit 会创建一个省略 K 中字段的 T 对象。

```typescript
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false
}
```

:::details 查看解答
`extends` 有遍历的功能，通过 判断 `key` 是不是属于 需要排除的参数来实现

```typescript
type MyOmit<T, K extends keyof T> = {
  [R in keyof T as R extends K ? never: R ]: T[R]
}
```

:::

## 8 · Readonly 2

题目：实现一个通用`MyReadonly2<T, K>`，它带有两种类型的参数 T 和 K。

K 指定应设置为 `Readonly` 的 T 的属性集。如果未提供 K，则应使所有属性都变为只读，就像普通的`Readonly<T>`一样。

```typescript
interface Todo {
  title: string
  description: string
  completed: boolean
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: 'Hey',
  description: 'foobar',
  completed: false,
}

todo.title = 'Hello' // Error: cannot reassign a readonly property
todo.description = 'barFoo' // Error: cannot reassign a readonly property
todo.completed = true // OK
```

:::details 查看解答

这题需要结合上一题，需要判断当前的 `key` 是不是 `K` 中传入的，如果是 `K` 中的，那么需要设置为 `readonly`，要主要其他的也要保持原来的类型。需要注意，当 K 不传入时，所有都需要是 readonly ，因此可以设置 K 为 T

```typescript
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P]
} & {
  [P in Exclude<keyof T, K>]: T[P]
}
```

:::

## 9 · 深度 Readonly

题目：实现一个通用的`DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。

您可以假设在此挑战中我们仅处理对象。数组，函数，类等都无需考虑。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

```typescript
type X = {
  x: {
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

type Expected = {
  readonly x: {
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey'
}

const todo: DeepReadonly<X> // should be same as `Expected`
```

:::details 查看解答
通过判断 `value` 的类型，来递归添加 `readonly`

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends Object ? T[P] extends Function ? T[P]: DeepReadonly<T[P]> : T[P]
}
// 也可以用 keyof T[P] extends never 来判断
```

:::

## 10 · 元组转合集

题目：实现泛型`TupleToUnion<T>`，它覆盖元组的值与其值联合。

```typescript
type Arr = ['1', '2', '3']

const a: TupleToUnion<Arr> // expected to be '1' | '2' | '3'
```

:::details 查看解答
通过 `infer` 来推断数组中每一项的类型

```typescript
type TupleToUnion<T extends any[]> = T extends (infer R)[] ? R :never
```

:::

## 12 · 可串联构造器

题目：在 JavaScript 中我们很常会使用可串联（Chainable/Pipeline）的函数构造一个对象，但在 TypeScript 中，你能合理的给他附上类型吗？

在这个挑战中，你可以使用任意你喜欢的方式实现这个类型 - Interface, Type 或 Class 都行。你需要提供两个函数 option(key, value) 和 get()。在 option 中你需要使用提供的 key 和 value 扩展当前的对象类型，通过 get 获取最终结果。

你只需要在类型层面实现这个功能 - 不需要实现任何 TS/JS 的实际逻辑。

你可以假设 key 只接受字符串而 value 接受任何类型，你只需要暴露它传递的类型而不需要进行任何处理。同样的 key 只会被使用一次。

```typescript
declare const config: Chainable

const result = config.option('foo', 123).option('name', 'type-challenges').option('bar', { value: 'Hello World' }).get()

// 期望 result 的类型是：
interface Result {
  foo: number
  name: string
  bar: {
    value: string
  }
}
```

:::details 查看解答
有点难，需要注意 key 重复的情况，会按照后面的类型来定义。将 option 的两个参数设置为 泛型，来判断是否存在于当前的对象中，类似去重，然后返回相应的 value 类型

可以理解为这是一个 `class`，`T` 是其中的一个对象，保存了所有的 `key` `value` 组合

```typescript
type Chainable<T = {}> = {
  option<K extends PropertyKey, V>(
    key: K extends keyof T 
      ? T[K] extends V ? never : K
      : K, 
    value: V
  ): Chainable<{
      [U in (keyof T | K)]: U extends K ? V : U extends keyof T ? T[U] : never
    }>
  get(): T
}
```

:::

## 15 · 最后一个元素

题目：实现一个通用`Last<T>`，它接受一个数组 T 并返回其最后一个元素的类型。

```typescript
type arr1 = ['a', 'b', 'c', 'd']
type arr2 = [3, 2, 1]

type tail1 = Last<arr1> // expected to be 'c'
type tail2 = Last<arr2> // expected to be 1
```

:::details 查看解答
很简单，用 `infer` 推断一下最后一个参数就好

```typescript
type Last<T extends any[]> = T extends [...any[], infer R] ? R: never
```

:::

## 16 · 出堆

题目：实现一个通用`Pop<T>`，它接受一个数组 T 并返回一个没有最后一个元素的数组。

```typescript
type arr1 = ['a', 'b', 'c', 'd']
type arr2 = [3, 2, 1]

type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2> // expected to be [3, 2]
```

:::details 查看解答
用 `infer` 推出前面的即可，把最后一个单独弄出来

```typescript
type Pop<T extends any[]> = T extends [...infer R, any] ? R : never
```

:::

## 20 · Promise.all

题目：键入函数`PromiseAll`，它接受 PromiseLike 对象数组，返回值应为`Promise<T>`，其中 T 是解析的结果数组。

```typescript
const promise1 = Promise.resolve(3)
const promise2 = 42
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo')
})

// expected to be `Promise<[number, number, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const)
```

:::details 查看解答
核心在于处理这个泛型 `T`，利用类型推断，会得到一个参数类型数组 `T`，类似于传入 `[1,2]` T 就是 `[number, number]` 后续只需要遍历匹配数组即可

> 遍历数组这里的 P 就是它的 index

```typescript
declare function PromiseAll<T extends any[] >(values: readonly [...T]): Promise<{
  [P in keyof T]: T[P] extends Promise<infer U> ? U : T[P]
}>
```

:::

## 62 · Type Lookup

题目：有时，您可能希望根据其属性在并集中查找类型。

在此挑战中，我们想通过在联合`Cat | Dog中`搜索公共 type 字段来获取相应的类型。换句话说，在以下示例中，我们期望`LookUp<Dog | Cat, 'dog'>`获得 Dog，`LookUp<Dog | Cat, 'cat'>`获得 Cat。

```typescript
interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type MyDog = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
```

:::details 查看解答
遍历泛型 `U`，判断是否有 `type` 为 `T` 的即可

```typescript
type LookUp<U, T extends string> = U extends { type: T} ? U : never
```

:::

## 106 · Trim Left

题目：删除字符串开头的空格

```typescript
type trimed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '
```

:::details 查看解答
一次判断一个，递归判断，通过 `infer` 留下最后的，每次清一个

```typescript
type TrimLeft<S extends string> = S extends `${' ' | '\n' | '\t'}${infer R}` ? TrimLeft<R> : S
```

:::

## 108 · Trim

题目：删除字符串开头和结尾的空格

```typescript
type trimed = Trim<'  Hello World  '> // expected to be 'Hello World'
```

:::details 查看解答
先删除前面的，删除完再删除后面的，都用 `infer` 就行

```typescript
type Space = ' ' | '\n' | '\t'
type Trim<S extends string> = S extends `${Space}${infer R}` ? Trim<R> : S extends `${infer R}${Space}` ? Trim<R> : S
```

:::

## 110 · Capitalize

题目：将第一个字符转为大写

```typescript
type capitalized = Capitalize<'hello world'> // expected to be 'Hello world'
```

:::details 查看解答
通过 `infer` 取到第一个字母，通过 `Uppercase` 转化成大写

```typescript
type MyCapitalize<S extends string> = S extends `${infer U}${infer R}` ? `${Uppercase<U>}${R}` : S
```

:::

## 116 · Replace

题目：替换给定的内容

```typescript
type replaced = Replace<'types are fun!', 'fun', 'awesome'> // expected to be 'types are awesome!'
```

:::details 查看解答
通过找到 `From` 替换即可，用模版字符串最方便

```typescript
type Replace<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer R}${From}${infer U}`
    ? `${R}${To}${U}`
    : S
```

:::

## 119 · ReplaceAll

题目：替换全部给定的内容

```typescript
type replaced = ReplaceAll<'t y p e s', ' ', ''> // expected to be 'types'
```

:::details 查看解答
需要注意多个的情况，递归调用 `ReplaceAll`

```typescript
type ReplaceAll<S extends string, From extends string, To extends string> = From extends '' 
  ? S 
  : S extends `${infer R}${From}${infer U}`
    ? `${R}${To}${ReplaceAll<U, From, To>}`
    : S
```

:::

## 191 · 追加参数

题目：实现一个范型`AppendArgument<Fn, A>`，对于给定的函数类型 Fn，以及一个任意类型 A，返回一个新的函数 G。G 拥有 Fn 的所有参数并在末尾追加类型为 A 的参数。

```typescript
type Fn = (a: number, b: string) => number

type Result = AppendArgument<Fn, boolean>
// 期望是 (a: number, b: string, x: boolean) => number
```

:::details 查看解答
利用 `args` 和 `infer`，获得 `fn` 的参数列表类型，再进行添加

```typescript
type AppendArgument<Fn extends Function, A> = Fn extends (...args: infer U) => infer R ? (...args: [...U, A]) => R : never
```

:::

## 296 · Permutation 🌟

实现联合类型的全排列，将联合类型转换成所有可能的全排列数组的联合类型。

```typescript
type perm = Permutation<'A' | 'B' | 'C'> // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
```

:::details 查看解答
很难，[题解](https://github.com/type-challenges/type-challenges/issues/614)

```typescript
type Permutation<T, U = T> = 
  [T] extends [never] 
  ? []
  : U extends U
      ? [U, ...Permutation<Exclude<T, U>>]
      : never
```

:::

## 298 · Length of String

题目：计算字符串的长度

```typescript
type a = 'hellow world'

type b = LengthOfString<a> // type b = 12
```

:::details 查看解答
拿一个数组来保存遍历到的每个字符，最后返回数组的 `length`

```typescript
type LengthOfString<S extends string, A extends any[] = []> =
  S extends `${infer R}${infer U}`
  ? LengthOfString<U, [...A, R]>
  : A['length']
```

:::

## 459 · Flatten

题目：铺平数组

```typescript
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
```

:::details 查看解答
通过遍历数组的每一项，如果还是数组就再走一遍

```typescript
type Flatten<A extends any[]> = 
  A extends [infer R, ...infer K]
  ? R extends any[]
    ? [...Flatten<R>, ...Flatten<K>]
    : [R, ...Flatten<K>]
  : A
```

:::

## 527 · Append to object

题目：拓展对象的属性

```typescript
type Test = { id: '1' }
type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
```

:::details 查看解答
通过增加一个对 新增 `key` 的判断，如果是这个 `key` 就给他匹配 `value`

```typescript
type AppendToObject<T extends Object, U extends string, V> = {
  [P in keyof T | U]: P extends keyof T ? T[P] : V
}
```

:::

## 529 · Absolute

题目：获取数字的绝对值，返回绝对值的字符串形式

```typescript
type Test = -100
type Result = Absolute<Test> // expected to be "100"
```

:::details 查看解答
通过模板字符串来识别开头是否有 负号，需要注意要把 `T` 转成字符串来进行考虑

```typescript
type Absolute<T extends number | string | bigint> =
  `${T}` extends `-${infer R}` 
  ? R
  : `${T}`
```

:::

## 531 · String to Union

题目：实现一个将接收到的 `String` 参数转换为一个字母 `Union` 的类型。

```typescript
type Test = '123'
type Result = StringToUnion<Test> // expected to be "1" | "2" | "3"
```

:::details 查看解答
通过 `infer` 来推第一个字母，递归的形式达成题意

```typescript
type StringToUnion<T extends string> = 
  T extends `${infer R}${infer U}`
  ? R | StringToUnion<U>
  : never
```

:::

## 599 · Merge

题目：合并两个类型，`key` 相同的类型由第二个覆盖第一个

```typescript
type a = {
  x: 1
  y: 3
}

type b = {
  y: 2
  z: 3
}

type c = Merge<a, b> // c { x: 1, y: 2, z: 3 }
```

:::details 查看解答
先遍历 `key` 是否在 `F` 和 `S` 中，在的话就再判断它要使用谁的类型，也就是 `P extends keyof S`,这里是因为 S 会覆盖 F，后面也是依次判断即可

```ts
type Merge<F, S> = {
  [P in keyof F | keyof S]: 
    P extends keyof S 
    ? S[P] 
    : P extends keyof F
      ? F[P]
      :never
}
```

:::

## 612 · KebabCase

题目： `FooBarBaz` -> `foo-bar-baz`

```typescript
type a = 'forBarBaz'

type b = KebabCase<a> // for-bar-baz
```

:::details 查看解答
这题的意思是将字母分隔开同时转成小写，根据大写字母开头来判断，比如 AaBb 就应该得到 aa-bb，使用 Uncapitalize 可以将单词转成小写字母，因此我们可以通过判断单词开头是不是小写字母来反推逻辑，
如果是小写字母我们就继续判断下一个，如果是大写字母，我们就加个 - ，继续判断

```ts
type KebabCase<S> = 
  S extends `${infer R}${infer U}` 
  ? U extends Uncapitalize<U>
    ? `${Uncapitalize<R>}${KebabCase<U>}`
    : `${Uncapitalize<R>}-${KebabCase<U>}`
  : S
```

:::

## 645 · Diff

题目：获取两个接口类型中的差值属性。

```typescript
type Foo = {
  a: string
  b: number
}
type Bar = {
  a: string
  c: boolean
}

type Result1 = Diff<Foo, Bar> // { b: number, c: boolean }
type Result2 = Diff<Bar, Foo> // { b: number, c: boolean }
```

:::details 查看解答
采用 Exclude 排除掉两个相同的部分，也就是 O | O1，再从 O&O1 （全部）中获取相应的 value 即可

```ts
type Diff<O, O1> = {
  [K in Exclude<keyof (O & O1), keyof(O | O1)>]: (O & O1)[K]
}
```

:::

## 949 · AnyOf

题目： 在类型系统中实现类似于 Python 中 `any` 函数。类型接收一个数组，如果数组中任一个元素为真，则返回 `true`，否则返回 `false`。如果数组为空，返回 `false`。

```typescript
type Sample1 = AnyOf<[1, '', false, [], {}]> // expected to be true.
type Sample2 = AnyOf<[0, '', false, [], {}]> // expected to be false.
```

:::details 查看解答
通过 infer 推断每个数组项的类型，判断是不是这些空值，递归直到得到一个 true 为止，否则返回 false

```typescript
type AnyOf<T extends readonly any[]> = 
  T extends [infer R, ...infer U]
  ? R extends 0 | '' | [] | false | Record<string,never>
    ?  AnyOf<U>
    : true
  : false
```

:::

## 1042 · IsNever

题目： 判断是否为 never 类型

```typescript
type A = IsNever<never> // expected to be true
type B = IsNever<undefined> // expected to be false
type C = IsNever<null> // expected to be false
type D = IsNever<[]> // expected to be false
type E = IsNever<number> // expected to be false
```

:::details 查看解答
never 不能 extends never，需要套个数组，never 不会触发 extends 而是直接终结，判断无效

```typescript
type IsNever<T> = [T] extends [never] ? true : false
```

:::

## 1097 · IsUnion

题目： 判断是否为联合类型

```typescript
type case1 = IsUnion<string> // false
type case2 = IsUnion<string | number> // true
type case3 = IsUnion<[string | number]> // false
```

:::details 查看解答
联合类型的特征只有两个：

- 在 TS 处理泛型为联合类型时进行分发处理，即将联合类型拆解为独立项一一进行判定，最后再用 | 连接。
- 用 [] 包裹联合类型可以规避分发的特性

这题利用 `[]` 包裹不分发的特性

也就是 `T extends F` 会分发 T，`[T] extends [F]` 不会分发 T，对于联合类型来说 `[T]` 就是它整个联合类型 `A | B | C`  

```typescript
type IsNever<T> = [T] extends [never] ? true : false
type IsUnion<A, B = A> = IsNever<A> extends true ? false : (
  A extends A ? (
    [B] extends [A] ? false : true
  ) : false
)
```

:::

## 1130 · ReplaceKeys

题目： 根据指定的 key 替换属性

```typescript
type NodeA = {
  type: 'A'
  name: string
  flag: number
}

type NodeB = {
  type: 'B'
  id: number
  flag: number
}

type NodeC = {
  type: 'C'
  name: string
  flag: number
}

type Nodes = NodeA | NodeB | NodeC

type ReplacedNodes = ReplaceKeys<Nodes, 'name' | 'flag', { name: number; flag: string }> // {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string} // would replace name from string to number, replace flag from number to string.

type ReplacedNotExistKeys = ReplaceKeys<Nodes, 'name', { aa: number }> // {type: 'A', name: never, flag: number} | NodeB | {type: 'C', name: never, flag: number} // would replace name to never
```

:::details 查看解答
用 `K in keyof U` 遍历原始对象所有 `Key`

- 如果这个 `Key` 在描述的 `T` 中，且又在 `Y` 中存在，则返回类型 `Y[K]` 否则返回 `never`
- 如果不在描述的 `Y` 中则用在对象里本来的类型 `U[K]`

```typescript
type ReplaceKeys<U, T, Y> = {
  [K in keyof U]: K extends T 
    ? K extends keyof Y 
      ? Y[K]
      : never
    : U[K]
}
```

:::

## 1367 · Remove Index Signature 🌟

题目：Implement `RemoveIndexSignature<T>` ,从对象类型中排除索引签名。

```ts
type Foo = {
  [key: string]: any;
  foo(): void;
}

type A = RemoveIndexSignature<Foo>  // expected { foo(): void }
```

:::details 查看解答
有点难

```typescript
type RemoveIndexSignature<T> = {
  // [K in keyof T as K extends `${infer P}` ? P : never]: T[K]
  [k in keyof T as string extends k
    ? never
    : number extends k
      ? never
      : symbol extends k
        ? never
        : k
  ]
  : T[k] 
}
```

:::

## 1978 · Percentage Parser

题目： 实现类型 `PercentageParser<T>`。根据规则 `/^(\+|\-)?(\d*)?(\%)?$/` 匹配类型 T。

匹配的结果由三部分组成，分别是：[`正负号`, `数字`, `单位`]，如果没有匹配，则默认是空字符串。

```typescript
type PString1 = ''
type PString2 = '+85%'
type PString3 = '-85%'
type PString4 = '85%'
type PString5 = '85'

type R1 = PercentageParser<PString1> // expected ['', '', '']
type R2 = PercentageParser<PString2> // expected ["+", "85", "%"]
type R3 = PercentageParser<PString3> // expected ["-", "85", "%"]
type R4 = PercentageParser<PString4> // expected ["", "85", "%"]
type R5 = PercentageParser<PString5> // expected ["", "85", ""]
```

:::details 查看解答
不断通过 `infer` 进行分支判断，先判断有符号的情况，再判断没有符号的，最后判断没有符号和单位的

```typescript
type PercentageParser<A extends string> = 
  A extends `${infer R extends '+' | '-'}${infer U}%`
    ? [R, U, '%']
    : A extends `${infer R extends '+' | '-'}${infer U}`
      ? [R, U, '']
      : A extends `${infer U}%`
        ? ['', U, '%']
        : A extends `${infer U}`
          ? ['', U, '']
          : never
```

:::

## 2070 · Drop Char

题目： 从字符串中剔除指定字符。

```typescript
type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
```

:::details 查看解答
递归不断把 `C` 排除掉即可：

```typescript
type DropChar<S extends string, C extends string> = 
  C extends ''
  ? S
  : S extends `${infer L}${C}${infer R}`
    ? `${L}${DropChar<R, C>}`
    : S
```

:::

## 2257 · MinusOne

题目：给定一个正整数作为类型的参数，要求返回的类型是该数字减 1。

例如:

```typescript
type Zero = MinusOne<1> // 0
type FiftyFour = MinusOne<55> // 54
```

:::details 查看解答

这题没有通过 `1001` 的测试，和负数都不会通过，这里采用的是数组的 `length` 来进行计算，不断的往数组中添加空字符串，来加大数组的 `length` 当 `length` 等于 `T` 的时候就是到终点了，
用来计算 `length` 的数组比 `arr` 多了一个，因此达到了 `-1` 的效果

```typescript
type MinusOne<T extends number, arr extends any[] = []> = [
  ...arr,
  ''
]['length'] extends T
  ? arr['length']
  : MinusOne<T, [...arr, '']>
```

:::

## 2595 · PickByType

题目：根据指定值筛选出符合的字段。

```typescript
type OnlyBoolean = PickByType<
  {
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
  },
  boolean
> // { isReadonly: boolean; isEnable: boolean; }
```

:::details 查看解答

通过 `P in keyof T as T[P]` 来对 `key` 做进一步的类型判断，如果类型 `T[P] extends U` 就保留，不然就 never

```typescript
type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never ]: T[P]
}
```

:::

## 2688 · StartsWith

题目：实现 `StartsWith<T, U>` ,接收两个 `string` 类型参数,然后判断 `T` 否以 `U` 开头,根据结果返回 `true` 或 `false`

```typescript
type a = StartsWith<'abc', 'ac'> // expected to be false
type b = StartsWith<'abc', 'ab'> // expected to be true
type c = StartsWith<'abc', 'abcd'> // expected to be false
```

:::details 查看解答

用 `infer R` 匹配任意字符串进行 `extends` 判定

```typescript
type StartsWith<T extends string, U extends string> = T extends `${U}${infer R}` ? true : false
```

:::

## 2693 · EndsWith

题目：实现 `EndsWith<T, U>`,接收两个 `string` 类型参数,然后判断T是否以 `U` 结尾,根据结果返回 `true` 或 `false`

```typescript
type a = EndsWith<'abc', 'bc'> // expected to be false
type b = EndsWith<'abc', 'abc'> // expected to be true
type c = EndsWith<'abc', 'd'> // expected to be false
```

:::details 查看解答

和上题一样，通过 模板字符串匹配 `U` 是否存在，返回对应结果，这里采用 `${string}` 来替代 `${infer R}` 效果一样

```typescript
type EndsWith<T extends string, U extends string> = T extends `${string}${U}` ? true : false
```

:::

## 2757 · PartialByKeys

题目： 实现一个通用的 `PartialByKeys<T, K>`，它接收两个类型参数 `T` 和 `K`。

`K`指定应设置为可选的`T`的属性集。当没有提供`K`时，它就和普通的`Partial<T>`一样使所有属性都是可选的。

```typescript
interface User {
  name: string
  age: number
  address: string
}

type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }
```

:::details 查看解答
这题的意思是要把 T 中的部分值转换成可选类型，TS 中同一个对象下只能用一个 keyof 来描述，因此只能通过写两个对象来拣选指定 key 的类型可不可选，由于最后结果是一个对象，我们还需要把它们 `merge` 起来

```typescript
type MergeType<O> = {
  [P in keyof O]: O[P]
}
type PartialByKeys<T, K = keyof T> = MergeType<{
  [P in keyof T as P extends K ? P : never]?: T[P]
} & {
    [P in keyof T as P extends K ? never : P]: T[P]
  }
>;
```

:::

## 2759 · RequiredByKeys

题目： 实现一个通用的`RequiredByKeys<T, K>`，它接收两个类型参数`T`和`K`。

`K`指定应设为必选的`T`的属性集。当没有提供`K`时，它就和普通的`Required<T>`一样使所有的属性成为必选的。

```typescript
interface User {
  name?: string
  age?: number
  address?: string
}

type UserRequiredName = RequiredByKeys<User, 'name'> // { name: string; age?: number; address?: string }
```

:::details 查看解答
和上题基本一致，换一种写法，我们采用 `Required & Pick` 来实现，因为如果有必选的和非必选的在一起，结果还是必选的，因此需要 `Pick<T, K>` 出来，相对于把 `K` 转成是必选的然后和原始的 T 联合得出

```typescript
type Merge<T> = {
  [K in keyof T]: T[K]
}
type RequiredByKeys<T, K extends PropertyKey = keyof T> = Merge<
  T & Required<Pick<T, K extends keyof T ? K : never>>
>
```

:::

## 2793 · Mutable

题目： 实现一个通用的类型 `Mutable<T>`，使类型 `T` 的全部属性可变（非只读）。

```typescript
interface Todo {
  readonly title: string
  readonly description: string
  readonly completed: boolean
}

type MutableTodo = Mutable<Todo> // { title: string; description: string; completed: boolean; }
```

:::details 查看解答
把一个对象变成只读，我们只需要使用 readonly 即可
也就是这样

```typescript
type Mutable<T> = {
  readonly [P in keyof T]: T[P]
}
```

但是这题要的是把类型变成全部可写，不是可读，因此我们只需要变成可写即可，采用 `-readonly`
本题答案最终答案

```typescript
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
```

:::

## 2852 · OmitByType

题目： 根据指定类型排除属性

```typescript
type OmitBoolean = OmitByType<
  {
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
  },
  boolean
> // { name: string; count: number }
```

:::details 查看解答
这题刚好和 `PickByType` 反过来，只需要排除 U 即可

```typescript
type OmitByType<T, U> = {
   [P in keyof T as T[P] extends U ? never : P]: T[P] 
}
```

:::

## 2946 · ObjectEntries

题目： 实现`Object.entries`

```typescript
interface Model {
  name: string
  age: number
  locations: string[] | null
}
type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
```

:::details 查看解答

这题需要解决的问题是如何将对象转换成联合类型

数组转联合类型用 `[number]` 作为下标

```typescript
['1', '2']['number'] // '1' | '2'
```

对象则是用 `[keyof T]` 作为下标

```typescript
type ObjectToUnion<T> = T[keyof T]
```

看回本题，联合类型的每一项都是数组，因此只需要构造符合结构的对象即可，因为 `value` 有可能是 `undefined` 需要强制把对象描述为非可选 `Key`

```typescript
type ObjectEntries<T> = {
  [K in keyof T]-?: [K, T[K]]
}[keyof T]
```

`value` 为 `undefined` 需要移除，因此再加一个判断

```typescript
type RemoveUndefined<T> = [T] extends [undefined] ? T : Exclude<T, undefined>
type ObjectEntries<T> = {
  [K in keyof T]-?: [K, RemoveUndefined<T[K]>]
}[keyof T]
```

:::

## 3062 · Shift

题目： 实现`Array.shift`

```typescript
type Result = Shift<[3, 2, 1]> // [2, 1]
```

:::details 查看解答
用 `infer` 把第一项抛弃掉即可

```typescript
type Shift<T extends any[]> = T extends [infer R, ...infer U] ? U : never
```

:::

## 3188 · Tuple to Nested Object

题目： 将数组转为嵌套的对象

```typescript
type a = TupleToNestedObject<['a'], string> // {a: string}
type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type
```

:::details 查看解答
这题需要通过 `infer` 结合递归来实现，不断的递归数组的余项，不断的嵌套对象。这里需要注意指定对象 `key` 的方法，可以通过 `K in key` ，但是需要指定 `key` 的类型为 `PropertyKey`

```typescript
type TupleToNestedObject<T extends Array<unknown>, U> = 
  T extends [infer R, ...infer Rest] 
    ? {
      [K in R as R extends PropertyKey ? R : never]: TupleToNestedObject<Rest, U>
    }
  : U
```

:::

## 3192 · Reverse

题目： 实现`Array.reverse`

```typescript
type a = Reverse<['a', 'b']> // ['b', 'a']
type b = Reverse<['a', 'b', 'c']> // ['c', 'b', 'a']
```

:::details 查看解答
通过递归实现

```typescript
type Reverse<T extends any[]> = 
  T extends [...infer R, infer E] 
    ? [E, ...Reverse<R>] 
    : T
```

:::

## 3196 · Flip Arguments

题目： 返回一个反转了参数的函数类型，

```typescript
type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>
// (arg0: boolean, arg1: number, arg2: string) => void
```

:::details 查看解答
将函数的参数进行反转，只要用 `infer` 定义出函数的参数，利用 `Reverse` 函数反转即可：

```typescript
type Reverse<K> = K extends [infer U, ...infer R] ? [...Reverse<R>, U] : K
type FlipArguments<T> = 
  T extends (...args: [...infer A]) => infer R 
    ? (...args: Reverse<A>) => R
    : never
```

:::

## 3243 · FlattenDepth

题目： 根据给定值对数组执行 `Flatten` 操作，默认 `Flatten` 一层

```typescript
type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
```

:::details 查看解答
这道题，需要控制打平的次数，因此需要先实现打平一次的函数，再递归调用即可
`FlattenOnce` 就是打平一次，同时利用数组长度来辅助计数

当递归没有达到深度 `U` 时，就用 `[...P, any]` 的方式给数组塞一个元素

下次如果能匹配上 `P['length'] extends U` 说明递归深度已达到。

```typescript
type FlattenOnce<T extends any[], U extends any[] = []> = T extends [infer X, ...infer Y] ? (
  X extends any[] ? FlattenOnce<Y, [...U, ...X]> : FlattenOnce<Y, [...U, X]>
) : U

type FlattenDepth<
  T extends any[],
  U extends number = 1,
  P extends any[] = []
> = P['length'] extends U ? T : (
  FlattenOnce<T> extends T ? T : (
    FlattenDepth<FlattenOnce<T>, U, [...P, any]>
  )
)
```

:::

## 3326 · BEM style string

题目： 实现 BEM 函数完成其规则拼接

```typescript
type ClassNames1 = BEM<'btn', ['price']> // 'btn__price'
type ClassNames2 = BEM<'btn', ['price'], ['warning', 'success']> // 'btn__price--warning' | 'btn__price--success'
type ClassNames3 = BEM<'btn', [], ['small', 'medium', 'large']> // 'btn--small' | 'btn--medium' | 'btn--large'
```

:::details 查看解答
我们知道可以通过下标来将数组或者对象转成联合类型

```typescript
// 数组
T[number]
// 对象  
Object[keyof T]
```

特殊的，当字符串中通过这种方式申明时，会自动生成新的联合类型，例如这题下面的写法，

```typescript
type BEM<B extends string, E extends string[], M extends string[]> = `${B}__${E[number]}--${M[number]}`
```

会得到 `type A = "btn__price--warning" | "btn__price--success"` 这样的结果，但是这并没有考虑到空数组的情况，因此需要做提前的判断

```typescript
type IsNever<T> = [T] extends [never] ? true : false
type IsUnion<U> = IsNever<U> extends true ? "" : U
type BEM<B extends string, E extends string[], M extends string[]> = `${B}${IsUnion<`__${E[number]}`>}${IsUnion<`--${M[number]}`>}`
```

:::

## 3379 · InorderTraversal

实现二叉树中序遍历的类型版本
例如：

```typescript
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

:::details 查看解答
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

JS 是在 root 为 `null` 时结束，对于 `TS` 来说，实现递归，需要 `extends TreeNode` 而不是 `null` 来结束

不能使用 `null` 来判断是因为 `TS` 不能判断类型 `T` 是否符合 `TreeNode` 类型

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

:::

## 4179 · Flip

题目： 反转对象的 `key` 和 `value`

```typescript
Flip<{ a: "x", b: "y", c: "z" }>; // {x: 'a', y: 'b', z: 'c'}
Flip<{ a: 1, b: 2, c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
Flip<{ a: false, b: true }>; // {false: 'a', true: 'b'}
```

:::details 查看解答
这题需要实现 `key` 和 `value` 的交换，我们可以遍历对象对 `key` 进行追加变形

通过在 `keyof` 描述对象时采用 `as` 追加变形

```typescript
type Flip<T> = {
  [P in keyof T as T[P]]: P
}
```

但是这样有几个测试会挂掉，由于 `key` 的位置只能是 `string` 或者 `number` 或者 `boolean` 所以挂了

因此我们可以限定一下 `value` 的类型 `Record<string, string | number | boolean>`

这样还是有挂掉的，是 `Flip<{ pi: 3.14; bool: true }>`，很显然 `boolean` 不能作为 `key`，需要转化成字符串，我们用模版强行转一下即可

```typescript
// 答案
type Flip<T extends Record<string, string | number | boolean>> = {
  [P in keyof T as `${T[P]}`]: P
}
```

:::

## 4182 · 斐波那契序列

题目：实现泛型 `Fibonacci<T>` 传入数字 T 返回正确的 Fibonacci number.

The sequence starts: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...
例如：

```typescript
type Result1 = Fibonacci<3> // 2
type Result2 = Fibonacci<8> // 21
```

:::details 查看解答
让 TS 来做这些真的比较恶心，TS 没有计算能力，遇到这种 TS 计算的题目，我们应该第一时间想到采用数组的 `length` 进行计算，好在测试用例没有非常大的 `case`，不然必挂

首先，我们需要记录当前递归的次数，用来结束循环，这里用 `N` 来表示，数组里面的值给什么都可以，我们只是用来计数

```typescript
type Fibonacci<T extends number, N extends number[] = [1]> = N['length'] extends T ? (
  // 返回结果
) : Fibonacci<T, [...N, 1]>
```

现在递归结束条件我们已经处理好了，那么需要开始计算了，我们需要将前面的结果加上当前的值，因此需要引入两个数，一个记录结果 `Res` ，一个记录当前值 `Cur`，关键在于这段代码

```typescript
Fibonacci<T,[...N, 1], Cur, [...Res, ...Cur]> 
```

把前面结果 `Res` 数组和 当前的 `Cur` 展开在一起，作为新的 `Cur` 进行递归，而当前的结果也就是 `Cur` 数组，通过数组展开的方式，把每个值都通过项数堆在一起，最后返回 `length` 即可

```typescript
// 答案
type Fibonacci<
    T extends number, 
    N extends number[] = [1], 
    Res extends number[] = [1], 
    Cur extends number[] = [1]
> = N['length'] extends T 
    ? Res['length']
    : Fibonacci<T,[...N, 1], Cur, [...Res, ...Cur]> 
```

:::

## 4260 · AllCombinations

题目：实现 `AllCombinations<S>` 对字符串 S 全排列
例如：

```typescript
type AllCombinations_ABC = AllCombinations<'ABC'>;
// should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
```

:::details 查看解答
记得之前应该也有写过一到全排列的问题，但是这个要难很多

首先我们需要把字符串 `S` 转换成联合类型，这样我们就可以遍历它，再结合上对象转联合类型时的特征实现

1. 首先我们需要实现一个字符串转 Union 的方法
递归字符串即可

```typescript
type StrToUnion<S> = S extends `${infer R}${infer U}` ? R | StrToUnion<U> : never
```

2. 利用对象转联合
我们先看看一个对象转成联合类型是什么样子的

会将 `value` 通过 `|` 连接

```typescript
type ObjToUnion<O> = {
  [P in keyof O]: O[P]
}[keyof O]

type B = ObjToUnion<{'a': 1, 'b':2, 'c': 3}> // type B = 1 | 2 | 3
```

那么我们就可以利用这个特性来处理，也就是这样，我们通过递归的方式，把 `value` 进行排列

```typescript
{
  [K in U]: `${K}${AllCombinations<never, Exclude<U, K>>}`
}[U]
```

但是这样得到的是字母间的全排列，我们还需要单个字符，因此需要在递归的时候加上 `'' |` 即可

因为每次递归时都会经历 `''、'A'、'AB'、'ABC'` 这样逐渐累加字符的过程，而每次都会遇到 `'' |` 使其自然形成了联合类型

推演：

1. 当输入 `ABC` 时，会通过 `StrToUnion` 转成 `Union` 类型
2. 判断是不是 `never` ，因为递归过程中可能会有 `never` 出现
3. `[K in U]` 取类型中的一个，如 `A`, 递归 `Exclude<U,K>`,也就是 `B,C`,这样就从 `ABC` 到了 `BC` 接下来又到 `C` 所有字符都会被考虑

```typescript
// 答案
type AllCombinations<S extends string, U extends string = StrToUnion<S>> =
  [U] extends [never]
  ? ''
  : '' | {
    [K in U]: `${K}${AllCombinations<never, Exclude<U, K>>}`
  }[U]
```

:::

## 4425 · Greater Than

题目：实现类型 `GreaterThan<T, U>` 来比较大小，就像 `T > U` 。不需要考虑负数

```typescript
GreaterThan<2, 1> //should be true
GreaterThan<1, 1> //should be false
GreaterThan<10, 100> //should be false
GreaterThan<111, 11> //should be true
```

:::details 查看解答
又是一道计算题，TS 不支持大小判断，我们还是需要借用数组 `['length']` 来实现

可以采用递归来实现，前面我们也有说过了，数组的很容易爆掉，但是测试用例还算温柔，这题能过

- 思路是拿一个新数组，和 `T`,`U` 进行对比，哪个先追上新数组的长度，哪个就小
- 简单一点来说就是，两个不一样长的木棍放在一起，我们从一端开始不断往前走，先摸到的那个木棍就是短一点的

```typescript
// 答案
type GreaterThan<T extends number, U extends number, R extends any[] = []> = 
  T extends R['length']
    ? false
    : U extends R['length']
      ? true
      : GreaterThan<T, U, [...R, 1]>
```

:::

## 4471 · Zip

题目：合并两个数组，将两个数组都具有的项合并到同一项，其他的不要

```typescript
type a = Zip<[1, 2], [true, false]> // expected to be [[1, true], [2, false]]
type b = Zip<[1, 2, 3], ['1', '2']> //  [[1, '1'], [2, '2']]
```

:::details 查看解答
采用递归 + `infer` 实现， `[[A, M], ...Zip<B, N>]` 是满足题意的二维数组，当数组长度不一样是，因为在前面已经规避掉了，因此能够实现

```typescript
type Zip<T extends any[], R extends any[], Res extends any[] = []> = 
  T extends [infer A, ...infer B]
    ? R extends [infer M, ...infer N]
      ? [[A, M], ...Zip<B, N>]
      : []
    : []
```

:::

## 4484 · IsTuple

题目：判断当前类型是否为元组

```typescript
type case1 = IsTuple<[number]> // true
type case2 = IsTuple<readonly [number]> // true
type case3 = IsTuple<number[]> // false
```

:::details 查看解答
元组和数组的区别在于，元组的长度是有限的，数组是无限的，也就是他们的 `['length']` 返回的结果是不同的

- 元组返回的是数字
- 数组返回的是 `number`

因此可以根据这个特征来判断，需要注意 `T extends readonly any[]` 前置判断，因为 `{length : 1}` 的用例会通过

```typescript
type IsTuple<T> = [T] extends [never]
  ? false
  : T extends readonly any[]
    ? number extends T['length']
      ? false
      : true
    : false
```

:::

## 4499 · Chunk

题目：按照指定的数量将数组划分

```typescript
type exp1 = Chunk<[1, 2, 3], 2> // expected to be [[1, 2], [3]]
type exp2 = Chunk<[1, 2, 3], 4> // expected to be [[1, 2, 3]]
type exp3 = Chunk<[1, 2, 3], 1> // expected to be [[1], [2], [3]]
```

:::details 查看解答
使用一个变量来记录当前 `Chunk` 的内容，当达到数量时就释放

`C['length'] extends N` 判断 `C` 的长度有没有达到要求的数量

- 有的话那就把它放到数组里，继续递归后续内容，等待返回结果
- 没有的话就继续往这个临时数组里添加新的元素，作为 C 的新值，继续递归

```typescript
type Chunk<T extends any[], N extends number = 1, C extends any[] = []> = 
  T extends [infer R, ...infer U]
    ? C['length'] extends N
      ? [C, ...Chunk<T, N>]
      : Chunk<U, N, [...C, R]>
    : C extends []
      ? C
      : [C]
```

:::

## 4518 · Fill

题目： 实现 Fill<T, N, Start?, End?>，将数组 T 的每一项替换为 N：

```typescript
type exp = Fill<[1, 2, 3], 0> // expected to be [0, 0, 0]
```

:::details 查看解答
这题需要引入两个变量，一个用来计数，一个用来作为是否替换的标志

- `Count extends any[] = []`
- `Flag extends boolean = Count['length'] extends Start ? true : false`
几个关键点

1. 在 `Count` 等于 `End` 的时候需要结束替换，也就是结束条件
2. 当 `Count` 等于 `Start` 的时候是开始替换的条件，递归处理数组替换即可，注意需要把 `T` 换成新的
3. 在开始替换后，需要把 `Flag` 继续传下去，不然 `Flag` 会被置为 `false` 不再替换

```typescript
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Count extends any[] = [],
  Flag extends boolean = Count['length'] extends Start ? true : false
> = Count['length'] extends End
  ? T
  : T extends [infer R, ...infer U]
    ? Flag extends false
      ? [R, ...Fill<U, N, Start, End, [...Count, 0]>]
      : [N, ...Fill<U, N, Start, End, [...Count, 0], Flag>]
    : T
```

:::

## 4803 · Trim Right

题目：实现 `TrimRight<T>` ，它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串结尾的空白字符串。
例如：

```typescript
type Trimed = TrimLeft<'  Hello World  '> // 应推导出 '  Hello World'
```

:::details 查看解答

```typescript

```

:::

## 5117 · Without

题目：实现一个像 Lodash.without 函数一样的泛型 Without<T, U>，它接收数组类型的 T 和数字或数组类型的 U 为参数，会返回一个去除 U 中元素的数组 T。

```typescript
type Res = Without<[1, 2], 1> // expected to be [2]
type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]> // expected to be [4, 5]
type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]> // expected to be []
```

:::details 查看解答

```typescript

```

:::

## 5140 · Trunc

题目：实现`Math.Trunc`

```typescript
type A = Trunc<12.34> // 12
```

:::details 查看解答

```typescript

```

:::

## 5153 · IndexOf

题目：实现`Array.indexOf`

```typescript
type Res = IndexOf<[1, 2, 3], 2> // expected to be 1
type Res1 = IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3> // expected to be 2
type Res2 = IndexOf<[0, 0, 0], 2> // expected to be -1
```

:::details 查看解答

```typescript

```

:::

## 5310 · Join

题目：实现`Array.join`

```typescript
type Res = Join<['a', 'p', 'p', 'l', 'e'], '-'> // expected to be 'a-p-p-l-e'
type Res1 = Join<['Hello', 'World'], ' '> // expected to be 'Hello World'
type Res2 = Join<['2', '2', '2'], 1> // expected to be '21212'
type Res3 = Join<['o'], 'u'> // expected to be 'o'
```

:::details 查看解答

```typescript

```

:::

## 5317 · lastIndexOf

题目：实现`Array.lastIndexOf`

```typescript
type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2> // 3
type Res2 = LastIndexOf<[0, 0, 0], 2> // -1
```

:::details 查看解答

```typescript

```

:::

## 5360 · Unique

题目：数组去重

```typescript
type Res = Unique<[1, 1, 2, 2, 3, 3]> // expected to be [1, 2, 3]
type Res1 = Unique<[1, 2, 3, 4, 4, 5, 6, 7]> // expected to be [1, 2, 3, 4, 5, 6, 7]
type Res2 = Unique<[1, 'a', 2, 'b', 2, 'a']> // expected to be [1, "a", 2, "b"]
type Res3 = Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]> // expected to be [string, number, 1, "a", 2, "b"]
type Res4 = Unique<[unknown, unknown, any, any, never, never]> // expected to be [unknown, any, never]
```

:::details 查看解答

```typescript

```

:::

## 5821 · MapTypes

题目：按照给定的类型进行转换

```typescript
type StringToNumber = { mapFrom: string; mapTo: number }
type StringToDate = { mapFrom: string; mapTo: Date }
type A = MapTypes<{ iWillBeNumberOrDate: string }, StringToDate | StringToNumber> // gives { iWillBeNumberOrDate: number | Date; }
```

:::details 查看解答

```typescript

```

:::

## 7544 · Construct Tuple

题目：构造数组

```typescript
type result = ConstructTuple<2> // expect to be [unknown, unkonwn]
```

:::details 查看解答

```typescript

```

:::

## 8640 · Number Range

题目：有时我们想限制数字的范围......例如。

```typescript
type result = NumberRange<2 , 9> //  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 
```

:::details 查看解答

```typescript

```

:::

## 8767 · Combination

题目：给定一个字符串数组，做排列和组合。它对于视频控件列表等道具类型也很有用

```typescript
// expected to be `"foo" | "bar" | "baz" | "foo bar" | "foo bar baz" | "foo baz" | "foo baz bar" | "bar foo" | "bar foo baz" | "bar baz" | "bar baz foo" | "baz foo" | "baz foo bar" | "baz bar" | "baz bar foo"`
type Keys = Combination<['foo', 'bar', 'baz']>
```

:::details 查看解答

```typescript

```

:::

## 8987 · Subsequence

题目：给定一个唯一元素数组，返回所有可能的子序列。

子序列是可以通过删除一些元素或不删除元素而不改变剩余元素的顺序从数组派生的序列。

例如：

```typescript
type A = Subsequence<[1, 2]> // [] | [1] | [2] | [1, 2]
```

:::details 查看解答

```typescript

```

:::
