
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

解答：通过 infer 来推断返回的参数类型

```typescript
type MyReturnType<T> = T extends (...args: any) => infer R ? R : never
```

---

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
  completed: false,
}
```

解答：extends 有遍历的功能，通过 判断 key 是不是属于 需要排除的参数来实现

```typescript
type MyOmit<T, K extends keyof T> = {
  [R in keyof T as R extends K ? never: R ]: T[R]
}
```

---

## 8 · Readonly 2

题目：实现一个通用`MyReadonly2<T, K>`，它带有两种类型的参数 T 和 K。

K 指定应设置为 Readonly 的 T 的属性集。如果未提供 K，则应使所有属性都变为只读，就像普通的`Readonly<T>`一样。

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

解答：这题需要结合上一题，需要判断当前的 key 是不是 K 中传入的，如果是 K 中的，那么需要设置为 readonly，要主要其他的也要保持原来的类型。需要注意，当 K 不传入时，所有都需要是 readonly ，因此可以设置 K 为 T

```typescript
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P]
} & {
  [P in Exclude<keyof T, K>]: T[P]
}
```

---

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

解答：通过判断 value 的类型，来递归添加 readonly

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends Object ? T[P] extends Function ? T[P]: DeepReadonly<T[P]> : T[P]
}
// 也可以用 keyof T[P] extends never 来判断
```

---

## 10 · 元组转合集

题目：实现泛型`TupleToUnion<T>`，它覆盖元组的值与其值联合。

```typescript
type Arr = ['1', '2', '3']

const a: TupleToUnion<Arr> // expected to be '1' | '2' | '3'
```

解答：通过 infer 来推断数组中每一项的类型

```typescript
type TupleToUnion<T extends any[]> = T extends (infer R)[] ? R :never
```

---

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

解答：有点难，需要注意 key 重复的情况，会按照后面的类型来定义。将 option 的两个参数设置为 泛型，来判断是否存在于当前的对象中，类似去重，然后返回相应的 value 类型

可以理解为这是一个 class，T 是其中的一个对象，保存了所有的 key value 组合

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

---

## 15 · 最后一个元素

题目：实现一个通用`Last<T>`，它接受一个数组 T 并返回其最后一个元素的类型。

```typescript
type arr1 = ['a', 'b', 'c', 'd']
type arr2 = [3, 2, 1]

type tail1 = Last<arr1> // expected to be 'c'
type tail2 = Last<arr2> // expected to be 1
```

解答：很简单，用 infer 推断一下最后一个参数就好

```typescript
type Last<T extends any[]> = T extends [...any[], infer R] ? R: never
```

---

## 16 · 出堆

题目：实现一个通用`Pop<T>`，它接受一个数组 T 并返回一个没有最后一个元素的数组。

```typescript
type arr1 = ['a', 'b', 'c', 'd']
type arr2 = [3, 2, 1]

type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2> // expected to be [3, 2]
```

解答：用 infer 推出前面的即可，把最后一个单独弄出来

```typescript
type Pop<T extends any[]> = T extends [...infer R, any] ? R : never
```

---

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

解答：核心在于处理这个泛型 T，利用类型推断，会得到一个参数类型数组 T，类似于传入 `[1,2]` T 就是 `[number, number]` 后续只需要遍历匹配数组即可

> 遍历数组这里的 P 就是它的 index

```typescript
declare function PromiseAll<T extends any[] >(values: readonly [...T]): Promise<{
  [P in keyof T]: T[P] extends Promise<infer U> ? U : T[P]
}>
```

---

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

解答：遍历泛型 U，判断是否有 type 为 T 的即可

```typescript
type LookUp<U, T extends string> = U extends { type: T} ? U : never
```

---

## Trim Left

题目：删除字符串开头的空格

```typescript
type trimed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '
```

解答：

```typescript

```

---

## Trim

题目：删除字符串开头和结尾的空格

```typescript
type trimed = Trim<'  Hello World  '> // expected to be 'Hello World'
```

解答：

```typescript

```

---

## Capitalize

题目：将第一个字符转为大写

```typescript
type capitalized = Capitalize<'hello world'> // expected to be 'Hello world'
```

解答：

```typescript

```

---

## Replace

题目：替换给定的内容

```typescript
type replaced = Replace<'types are fun!', 'fun', 'awesome'> // expected to be 'types are awesome!'
```

解答：

```typescript

```

---

## ReplaceAll

题目：替换全部给定的内容

```typescript
type replaced = ReplaceAll<'t y p e s', ' ', ''> // expected to be 'types'
```

解答：

```typescript

```

---

## 追加参数

题目：实现一个范型`AppendArgument<Fn, A>`，对于给定的函数类型 Fn，以及一个任意类型 A，返回一个新的函数 G。G 拥有 Fn 的所有参数并在末尾追加类型为 A 的参数。

```typescript
type Fn = (a: number, b: string) => number

type Result = AppendArgument<Fn, boolean>
// 期望是 (a: number, b: string, x: boolean) => number
```

解答：

```typescript

```

---

## Permutation

实现联合类型的全排列，将联合类型转换成所有可能的全排列数组的联合类型。

```typescript
type perm = Permutation<'A' | 'B' | 'C'> // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
```

解答：

```typescript

```

---

## Length of String

题目：计算字符串的长度

```typescript
type a = 'hellow world'

type b = LengthOfString<a> // type b = 12
```

解答：

```typescript

```

---

## Flatten

题目：铺平数组

```typescript
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
```

解答：

```typescript

```

---

## Append to object

题目：拓展对象的属性

```typescript
type Test = { id: '1' }
type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
```

解答：

```typescript

```

---

## Absolute

题目：获取数字的绝对值，返回绝对值的字符串形式

```typescript
type Test = -100
type Result = Absolute<Test> // expected to be "100"
```

解答：

```typescript

```

---

## String to Union

题目：实现一个将接收到的 String 参数转换为一个字母 Union 的类型。

```typescript
type Test = '123'
type Result = StringToUnion<Test> // expected to be "1" | "2" | "3"
```

解答：

```typescript

```

---

## Merge

题目：合并两个类型，key 相同的类型由第二个覆盖第一个

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

解答：

```typescript

```

---

## KebabCase

题目： `FooBarBaz` -> `foo-bar-baz`

```typescript
type a = 'forBarBaz'

type b = KebabCase<a> // for-bar-baz
```

解答：

```typescript

```

---

## Diff

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

解答：

```typescript

```

---

## AnyOf

题目： 在类型系统中实现类似于 Python 中 `any` 函数。类型接收一个数组，如果数组中任一个元素为真，则返回 `true`，否则返回 `false`。如果数组为空，返回 `false`。

```typescript
type Sample1 = AnyOf<[1, '', false, [], {}]> // expected to be true.
type Sample2 = AnyOf<[0, '', false, [], {}]> // expected to be false.
```

解答：

```typescript

```

---

## IsNever

题目： 判断是否为 never 类型

```typescript
type A = IsNever<never> // expected to be true
type B = IsNever<undefined> // expected to be false
type C = IsNever<null> // expected to be false
type D = IsNever<[]> // expected to be false
type E = IsNever<number> // expected to be false
```

解答：

```typescript

```

---

## IsUnion

题目： 判断是否为联合类型

```typescript
type case1 = IsUnion<string> // false
type case2 = IsUnion<string | number> // true
type case3 = IsUnion<[string | number]> // false
```

解答：

```typescript

```

---

## ReplaceKeys

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

解答：

```typescript

```

---

## Percentage Parser

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

解答：

```typescript

```

---

## Drop Char

题目： 从字符串中剔除指定字符。

```typescript
type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
```

解答：

```typescript

```

---

## PickByType

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

解答：

```typescript

```

---

## StartsWith

题目：实现`StartsWith<T, U>`,接收两个 string 类型参数,然后判断`T`是否以`U`开头,根据结果返回`true`或`false`

```typescript
type a = StartsWith<'abc', 'ac'> // expected to be false
type b = StartsWith<'abc', 'ab'> // expected to be true
type c = StartsWith<'abc', 'abcd'> // expected to be false
```

解答：

```typescript

```

---

## PartialByKeys

题目： 实现一个通用的`PartialByKeys<T, K>`，它接收两个类型参数`T`和`K`。

`K`指定应设置为可选的`T`的属性集。当没有提供`K`时，它就和普通的`Partial<T>`一样使所有属性都是可选的。

```typescript
interface User {
  name: string
  age: number
  address: string
}

type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }
```

解答：

```typescript

```

---

## RequiredByKeys

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

解答：

```typescript

```

---

## Mutable

题目： 实现一个通用的类型 `Mutable<T>`，使类型 `T` 的全部属性可变（非只读）。

```typescript
interface Todo {
  readonly title: string
  readonly description: string
  readonly completed: boolean
}

type MutableTodo = Mutable<Todo> // { title: string; description: string; completed: boolean; }
```

解答：

```typescript

```

---

## OmitByType

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

解答：

```typescript

```

---

## ObjectEntries

题目： 实现`Object.entries`

```typescript
interface Model {
  name: string
  age: number
  locations: string[] | null
}
type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
```

解答：

```typescript

```

---

## Shift

题目： 实现`Array.shift`

```typescript
type Result = Shift<[3, 2, 1]> // [2, 1]
```

解答：

```typescript

```

---

## Tuple to Nested Object

题目： 将数组转为嵌套的对象

```typescript
type a = TupleToNestedObject<['a'], string> // {a: string}
type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type
```

解答：

```typescript

```

---

## Reverse

题目： 实现`Array.reverse`

```typescript
type a = Reverse<['a', 'b']> // ['b', 'a']
type b = Reverse<['a', 'b', 'c']> // ['c', 'b', 'a']
```

解答：

```typescript

```

---

## Flip Arguments

题目： 返回一个反转了参数的函数类型

```typescript
type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>
// (arg0: boolean, arg1: number, arg2: string) => void
```

解答：

```typescript

```

---

## FlattenDepth

题目： 根据给定值对数组执行 Flatten 操作，默认 Flatten 一层

```typescript
type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
```

解答：

```typescript

```

---

## BEM style string

题目： 给定参数返回类名的组合

```typescript
type ClassNames1 = BEM<'btn', ['price']> // 'btn__price'
type ClassNames2 = BEM<'btn', ['price'], ['warning', 'success']> // 'btn__price--warning' | 'btn__price--success'
type ClassNames3 = BEM<'btn', [], ['small', 'medium', 'large']> // 'btn--small' | 'btn--medium' | 'btn--large'
```

解答：

```typescript

```

---

## Flip

题目： 反转对象的 key 和 value

```typescript
Flip<{ a: "x", b: "y", c: "z" }>; // {x: 'a', y: 'b', z: 'c'}
Flip<{ a: 1, b: 2, c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
Flip<{ a: false, b: true }>; // {false: 'a', true: 'b'}
```

解答：

```typescript

```

---

## Zip

题目： 合并两个数组，将两个数组都具有的项合并到同一项，其他的不要

```typescript
type a = Zip<[1, 2], [true, false]> // expected to be [[1, true], [2, false]]
type b = Zip<[1, 2, 3], ['1', '2']> //  [[1, '1'], [2, '2']]
```

解答：

```typescript

```

---

## IsTuple

题目： 判断当前类型是否为元组

```typescript
type case1 = IsTuple<[number]> // true
type case2 = IsTuple<readonly [number]> // true
type case3 = IsTuple<number[]> // false
```

解答：

```typescript

```
