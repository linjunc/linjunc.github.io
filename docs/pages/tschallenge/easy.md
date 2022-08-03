# TS 类型挑战 - Easy 题

## Hello World

在这个挑战中，你需要修改下方的代码使得测试通过（使其没有类型错误）。

```ts
// 期望是一个 string 类型
type HelloWorld = any

// 你需要使得如下这行不会抛出异常
type test = Expect<Equal<HelloWorld, string>>
```

:::details 查看解答

```ts
type HelloWorld = string
```

:::

## 4 · 实现 Pick

从类型 T 中选择出属性 K，构造成一个新的类型。
例如

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}
```

:::details 查看解答

```ts
type MyPick<T, U extends keyof T> = {
  [K in U]: T[K]
}

// U = keyof T = ['title', 'description', 'completed']
// K = 循环 U
```

:::

## 7 · 实现 Readonly

构造一个类型，并将 T 的所有属性设置为只读，这意味着无法重新分配所构造类型的属性。

```ts
interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: 'Hey',
  description: 'foobar',
}

todo.title = 'Hello' // Error: cannot reassign a readonly property
todo.description = 'barFoo' // Error: cannot reassign a readonly property
```

:::details 查看解答

```ts
type MyReadOnly<T> {
  readonly[K in keyof T]: T[K]
}
```

:::

## 11 · 元组转换为对象

传入一个元组类型，将这个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历出来。

例如：

```ts
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

:::details 查看解答

```ts
type TupleToObject<T extends readonly (string | number)[]> {
  [K in keyof T[number]]: K
}
```

:::

## 14 · 第一个元素

实现一个通用`First<T>`，它接受一个数组`T`并返回它的第一个元素的类型。

例如：

```ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3
```

:::details 查看解答

```ts
type First<T extends any[]> = T extends [infer F, ...infer Rest] ? F : never

type First<T extends any[]> = T extends [] ? never : T[0]
```

:::

## 18 · 获取元组长度

创建一个通用的 `length`, 接受一个`readonly`的数组，返回这个数组的长度。

例如：

```ts
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type teslaLength = Length<tesla> // expected 4
type spaceXLength = Length<spaceX> // expected 5
```

:::details 查看解答

```ts
type Length<T extends readonly any[]> = T['length']
```

:::

## 43 · Exclude

实现内置的`Exclude <T, U>`类型，但不能直接使用它本身。

> 从联合类型T中排除U的类型成员，来构造一个新的类型。

例如：

```ts
type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
```

:::details 查看解答
通过 判断 T 是不是 U，不是才返回 T

```ts
type MyExclude<T, U> = T extends U ? never : T;
```

:::

## 189 · Awaited

假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。在 TS 中，我们用 `Promise<T>` 中的 T 来描述这个 Promise 返回的类型。请你实现一个类型，可以获取这个类型。

例如：`Promise<ExampleType>`，请你返回 ExampleType 类型。

```ts
type ExampleType = Promise<string>

type Result = MyAwaited<ExampleType> // string
```

:::details 查看解答
通过 infer 来自动推断类型，需要注意 Promise 套 Promise 的情况

```ts
type MyAwaited<T extends Promise<any>> = T extends Promise<infer R>
  ? R extends Promise<any>
    ? MyAwaited<R>
    : R
  : never;
```

:::

## 268 · If

实现一个 `IF` 类型，它接收一个条件类型 `C` ，一个判断为真时的返回类型 `T` ，以及一个判断为假时的返回类型 `F`。 `C` 只能是 `true` 或者 `false`， `T` 和 `F` 可以是任意类型。

例如：

```ts
type A = If<true, 'a', 'b'>  // expected to be 'a'
type B = If<false, 'a', 'b'> // expected to be 'b'
```

:::details 查看解答
简单 if 判断，需要注意类型 boolean 和 true

```ts
type If<C extends boolean, T, F> = C extends true ? T : F;
```

:::

## 533 · Concat

在类型系统里实现 JavaScript 内置的 `Array.concat` 方法，这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。

例如：

```ts
type Result = Concat<[1], [2]> // expected to be [1, 2]
```

:::details 查看解答
注意接收泛型的类型，展开返回即可

```ts
type Concat<T extends Array<any>, U extends Array<any>> = [...T, ...U];
```

:::

## 898 · Includes

在类型系统里实现 JavaScript 的 `Array.includes` 方法，这个类型接受两个参数，返回的类型要么是 `true` 要么是 `false`。

例如：

```ts
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
```

:::details 查看解答

```ts
type Includes<T extends readonly any[], U> = T extends [infer F, ...infer R] ? (IsEqual<U, F> extends true ? true : Includes<R, U>) : false
type IsEqual<A, B> = ((<T>() => T extends A ? true : false) extends (<T>() => T  extends B ? true : false) ? true : false )
```

:::

## 3057 · Push

在类型系统里实现通用的 `Array.push` 。

例如：

```typescript
type Result = Push<[1, 2], '3'> // [1, 2, '3']
```

:::details 查看解答
直接展开就好了

```ts
type Push<T extends any[], U> = [...T, U]
```

:::

## 3060 · Unshift

实现类型版本的 `Array.unshift`。

例如：

```typescript
type Result = Unshift<[1, 2], 0> // [0, 1, 2,]
```

:::details 查看解答

```ts
type Unshift<T extends any[], U> = [U, ...T]
```

:::

## 3312 · Parameters

实现内置的 `Parameters<T>` 类型，而不是直接使用它，可参考[TypeScript官方文档](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)。

例如：

```ts
const foo = (arg1: string, arg2: number): void => {}

type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]
```

:::details 查看解答
这题的意思是返回参数的类型，通过 infer 推断参数的类型，返回数组形式

```ts
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer R) => any ? [...R] : never
```

:::
