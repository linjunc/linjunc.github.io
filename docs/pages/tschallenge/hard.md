
# Hard 题
::: tip 我的 Issue 提交记录
Github Issue 记录，[点击查看](https://github.com/type-challenges/type-challenges/issues/created_by/linjunc)
:::

## 6 · Simple Vue

实现类似Vue的类型支持的简化版本。

通过提供一个函数SimpleVue（类似于Vue.extend或defineComponent），它应该正确地推断出 computed 和 methods 内部的this类型。

在此挑战中，我们假设SimpleVue接受只带有data，computed和methods字段的Object作为其唯一的参数，

- data是一个简单的函数，它返回一个提供上下文this的对象，但是你无法在data中获取其他的计算属性或方法。

- computed是将this作为上下文的函数的对象，进行一些计算并返回结果。在上下文中应暴露计算出的值而不是函数。

- methods是函数的对象，其上下文也为this。函数中可以访问data，computed以及其他methods中的暴露的字段。 computed与methods的不同之处在于methods在上下文中按原样暴露为函数。

SimpleVue的返回值类型可以是任意的。

```typescript
const instance = SimpleVue({
  data() {
    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return this.firstname + ' ' + this.lastname
    }
  },
  methods: {
    hi() {
      alert(this.fullname.toLowerCase())
    }
  }
})
```

:::details 查看解答
由于没有学过 Vue，所以写起来有点难，看了题解写的，其实不算很难，简单聊聊

`SimpleVue` 接受的参数是一个对象，也就是 `data`、`computed`、`methods` 这些，这题写的就是这些方法的类型

那么我们根据泛型来接受它的参数，再通过题目的意思一一返回

- `Data` 返回一个提供上下文 this 的对象
- `computed` 返回 this 作为上下文的函数的对象，进行一些计算并返回结果，因此需要返回 `computed` 和 This，`ThisType` 是内置的方法
- `methods` 可以访问其他几个字段

```ts
type GetComputed<TComputed> = {
  [key in keyof TComputed]: TComputed[key] extends () => infer Result ? Result : never;
};

type Options<TData, TComputed, TMethods> = {
  data: (this: void) => TData;
  computed: TComputed & ThisType<TData>;
  methods: TMethods & ThisType<TData & GetComputed<TComputed> & TMethods>;
};

declare function SimpleVue<TData, TComputed, TMethods>(
  options: Options<TData, TComputed, TMethods>
): unknown;

```

:::

## 17 · currying

[Currying]（<https://en.wikipedia.org/wiki/Currying>）是一种将带有多个参数的函数转换为每个带有一个参数的函数序列的技术。

例如：

```typescript
const add = (a: number, b: number) => a + b
const three = add(1, 2)

const curriedAdd = Currying(add)
const five = curriedAdd(2)(3)
```

传递给Currying的函数可能有多个参数，您需要正确键入它。

在此挑战中，curried函数一次仅接受一个参数。分配完所有参数后，它应返回其结果。

:::details 查看解答

```ts

```

:::
