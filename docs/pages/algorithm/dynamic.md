# 动态规划

## 动态规划之子序列问题

## 300. 最长递增子序列

:::tip 题目
给你一个整数数组 `nums` ，找到其中最长严格递增子序列的长度。

子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，`[3,6,2,7]` 是数组 `[0,3,1,6,2,2,7]` 的子序列。
:::

**示例 1：**

```js
输入：nums = [10,9,2,5,3,7,101,18]
输出：4
解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
```

**示例 2：**

```js
输入：nums = [0,1,0,3,2,3]
输出：4
```

**示例 3：**

```js
输入：nums = [7,7,7,7,7,7,7]
输出：1
```

### 解答

动态规划

用 `dp[i]` 表示以第 i 项结尾的最长上升子序列的长度是多少

那么递推公式可以表示为 `dp[i] = Math.max(dp[i], dp[j] + 1)` 

也就是，当前第 i 项的最长上升子序列的长度就等于以当前这个数 `nums[i]` 结尾的最长上升子序列的长度 + 1

```js
var lengthOfLIS = function(nums) {
    const len = nums.length
    const dp = new Array(len).fill(1)
    for(let i = 0; i < nums.length; i++) {
        // 每次遍历前 i 项
        for(let j = 0; j < i; j++) {
            if(nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
    }
    return Math.max(...dp)
};
```

## 1014. 最佳观光组合

:::tip 题目
给你一个正整数数组 values，其中 values[i] 表示第 i 个观光景点的评分，并且两个景点 i 和 j 之间的 距离 为 j - i。

一对景点（i < j）组成的观光组合的得分为 values[i] + values[j] + i - j ，也就是景点的评分之和 减去 它们两者之间的距离。

返回一对观光景点能取得的最高分。
:::
**示例 1：**

```js
输入：values = [8,1,5,2,6]
输出：11
解释：i = 0, j = 2, values[i] + values[j] + i - j = 8 + 5 + 0 - 2 = 11
```

**示例 2：**

```js
输入：values = [1,2]
输出：2
```

**解答**

```js
**(values[ i ] + i) + (values[ j ] -  j)
                  ↑**
```

**递推方程**

```js
res= max(res,  dp( j ) + values[ j ] -  j);
```

对于输入中的每一个 `values[j]` 来说， 它的值 `values[j]` 和它的下标 j 都是固定的，

所以 `values[j] - j` 的值也是固定的。

因此，对于每个 `values[j]` 而言， 想要求 res 的最大值，也就是要求 `values[i] + i （i < j）` 的最大值，

```js
var maxScoreSightseeingPair = function(values) {
    let res = 0, max = values[0] + 0
    const len = values.length
    for(let i = 1; i < len; i++) {
        res = Math.max(res, max + values[i] - i)
        max = Math.max(max, values[i] + i)
    }
    return res
};
```

## 买卖股票系列题

定义状态

- i: 天数
- k: 交易次数，每次交易包含买入和卖出，这里我们只在买入的时候需要将 k - 1
- 0: 不持有股票
- 1: 持有股票

**举例**

```js
  dp[i][k][0]//第i天 还可以交易k次 手中没有股票
  dp[i][k][1]//第i天 还可以交易k次 手中有股票
```

最终的最大收益是 `dp[n - 1][k][0]` 而不是 `dp[n - 1][k][1]`，因为最后一天卖出肯定比持有收益更高

**状态转移方程**
 今天没有持有股票，分为两种情况：

 1. `dp[i - 1][k][0]`，**昨天没有持有**，今天不操作。
 2. `dp[i - 1][k][1] + prices[i]` **昨天持有**，今天卖出，今天手中就没有股票了。

```js
dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i])
```

今天持有股票，分为两种情况：

1. `dp[i - 1][k][1]` 昨天持有，今天不操作
2. `dp[i - 1][k - 1][0] - prices[i]` 昨天没有持有，今天买入。

```js
dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i])
//最大利润就是这俩种情况的最大值
```

## 121. 买卖股票的最佳时机（easy）限定交易次数 k=1

:::tip 题目
给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。

你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
:::

示例 1：

```js
输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
```

示例 2：

```js

输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
```

### 解答

本题 dp 方程

```js
dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
dp[i][1] = Math.max(dp[i - 1][1], -prices[i])
```

**未压缩空间**

```js
var maxProfit = function(prices) {
    const n = prices.length
    const dp = Array.from(new Array(n), () => new Array(2))
    dp[0][0] = 0
    dp[0][1] = -prices[0]
    for(let i = 1; i < n; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
        dp[i][1] = Math.max(dp[i - 1][1], -prices[i])
    }
    return dp[n - 1][0]
};
```

- 时间复杂度O(n)
- 空间复杂度O(n)，dp数组第二维是常数

**压缩空间**

```js
var maxProfit = function(prices) {
    const len = prices.length
    if(len < 2) return 0
    let max = 0, minPrice = prices[0]
    for(let i=1; i<len; i++){
        max = Math.max(max, prices[i] - minPrice)
        minPrice = Math.min(prices[i], minPrice)
    }
    return max
};
```

- 时间复杂度O(n)
- 空间复杂度O(1)

## 122. 买卖股票的最佳时机 II（medium）交易次数无限制 k = +infinity

:::tip 题目
题目描述

给定一个数组 prices ，其中 prices[i] 是一支给定股票第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

注意： 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

:::
**示例 1:**

```js
输入: prices = [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
```

**示例 2:**

```js
输入: prices = [1,2,3,4,5]
输出: 4
解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
```

**示例 3:**

```js
输入: prices = [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

dp 方程

```js
dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
```

解答

```js
var maxProfit = function(prices) {
    const n = prices.length
    let sell = 0
    let buy = -prices[0]
    for(let i = 1; i < n; i++) {
        sell = Math.max(sell, buy + prices[i])
        buy = Math.max(buy, sell - prices[i])
    }
    return sell
};
```
