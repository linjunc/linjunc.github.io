# 算法

## 洗牌算法

洗牌算法是用来打乱数组元素顺序的方法，它的基本思想是从未处理的元素中随机选择一个与当前元素进行交换

```js
const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
  return arr;
};

const arr2 = [1, 2, 3, 4, 5, 6, 7, 8];
const shuffledArr = shuffle(arr2);
console.log(shuffledArr);

```

## 快速排序

快速排序的思想就是，取一个基准，然后每次划分出大于和小于它的子序列，然后递归地排序这两个子序列

```js

const quickSort = (arr) => {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];

  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
};

const arr = [5, 3, 7, 4, 1, 9, 8, 6, 2];
const sortedArr = quickSort(arr);
console.log(sortedArr); // 输出：[1, 2, 3, 4, 5, 6, 7, 8, 9]

```

## 快速幂算法

利用二进制的方式，将指数进行拆分

```js
a^13 = a^(1 × 2^3) × a^(1 × 2^2) × a^(0 × 2^1) × a^(1 × 2^0)
     = a^8 × a^4 × a^0 × a^1
```

```js
function quickPow(base, exponent) {
  if (exponent === 0) {
    return 1;
  }

  let result = 1;
  let currentPow = base;

  while (exponent > 0) {
    // 如果指数为奇数，将当前平方累乘到结果中
    if (exponent % 2 === 1) {
      result *= currentPow;
    }

    // 更新当前平方（连续平方）
    currentPow *= currentPow;

    // 将指数右移一位（相当于除以 2）
    exponent = Math.floor(exponent / 2);
  }

  return result;
}

// 示例
console.log(quickPow(2, 10)); // 输出：1024
console.log(quickPow(3, 5)); // 输出：243
```