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

### 674. 最长连续递增序列

:::tip 题目
给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。

连续递增的子序列 可以由两个下标 l 和 r（l < r）确定，如果对于每个 `l <= i < r`，都有 `nums[i] < nums[i + 1]` ，那么子序列 `[nums[l], nums[l + 1], ..., nums[r - 1], nums[r]]`就是连续递增子序列。
:::

**示例 1：**

```js
输入：nums = [1,3,5,4,7]
输出：3
解释：最长连续递增序列是 [1,3,5], 长度为3。
尽管 [1,3,5,7] 也是升序的子序列, 但它不是连续的，因为 5 和 7 在原数组里被 4 隔开。 
```

**示例 2：**

```js
输入：nums = [2,2,2,2,2]
输出：1
解释：最长连续递增序列是 [2], 长度为1。
```

### 解答

和 300 题不同，这题求的是连续的最长递增子序列，是连续的，这也就是这两题的区别，由于是连续的，那么我们的递推公式就不能是 `dp[j] + 1` 了，因为我们需要从上一个也就是 `dp[i]` 开始递推到 `dp[i + 1]`

那么就不再需要两层的 for 循环，只需要从前一项递推到后一项即可

递推公式 `dp[i + 1] = dp[i] + 1`

```js
var findLengthOfLCIS = function(nums) {
    const len = nums.length
    const dp = new Array(len).fill(1)
    for(let i = 0; i < len; i++) {
        if(nums[i + 1] > nums[i]) {
            dp[i + 1] = dp[i] + 1
        }
    }
    return Math.max(...dp)
};
```

## 718. 最长重复子数组

:::tip 题目
给两个整数数组 nums1 和 nums2 ，返回 两个数组中 公共的 、长度最长的子数组的长度 。
:::

**示例 1：**

```js
输入：nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
输出：3
解释：长度最长的公共子数组是 [3,2,1] 。
```

**示例 2：**

```js
输入：nums1 = [0,0,0,0,0], nums2 = [0,0,0,0,0]
输出：5
```

### 解答

动态规划思路

1. 确定 dp 数组以及下标的含义

`dp[i][j]` ：以下标 `i - 1` 为结尾的 A，和以下标 `j - 1` 为结尾的 B，最长重复子数组长度为 `dp[i][j]`。
2. 当 `nums1[i - 1]` 和 `nums2[j - 1]` 相等的时候，`dp[i][j] = dp[i - 1][j - 1] + 1`
3. dp 数组初始化 `new Array(m + 1).fill(0).map(x => new Array(n + 1).fill(0))`

```js
var findLength = function(nums1, nums2) {
    const [m, n] = [nums1.length, nums2.length]
    // 初始化二维 dp 数组，都为 0
    const dp = new Array(m + 1).fill(0).map(x => new Array(n + 1).fill(0))
    let res = 0
    for(let i = 1; i <= m; i++) {
        for(let j = 1; j <= n; j++) {
            if(nums1[i - 1] === nums2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1
            }
            res = dp[i][j] > res ? dp[i][j] : res
        }
    }
    return res
};
```

滚动数组思路

```js
const findLength = function(nums1, nums2) {
    const len1 = nums1.length, len2 = nums2.length
    const dp = new Array(len2 + 1).fill(0)
    let res = 0
    for(let i = 1; i <= len1; i++) {
        for(let j = len2; j > 0; j--) {
            if(nums1[i - 1] === nums2[j - 1]) {
                dp[j] = dp[j - 1] + 1
            }else {
                dp[j] = 0
            }
            res = Math.max(res, dp[j])
        }
    }
    return res
}
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

## 119. 杨辉三角 II

:::tip 题目
给定一个非负索引 `rowIndex`，返回「杨辉三角」的第 `rowIndex` 行。

在「杨辉三角」中，每个数是它左上方和右上方的数的和。

![ani](/img/algorithm/dynamic/PascalTriangleAnimated2.gif)
:::

**示例 1:**

```js
输入: rowIndex = 3
输出: [1,3,3,1]
```

**示例 2:**

```js
输入: rowIndex = 0
输出: [1]
```

**示例 3:**

```js
输入: rowIndex = 1
输出: [1,1]
```

### 解答

```js
```

## 120. 三角形最小路径和

:::tip 题目
给定一个三角形 `triangle` ，找出自顶向下的最小路径和。

每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。也就是说，如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1 。
:::

**示例 1：**

```js
输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
输出：11
解释：如下面简图所示：
   2
  3 4
 6 5 7
4 1 8 3
自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。

```

**示例 2：**

```js
输入：triangle = [[-10]]
输出：-10
```

### 解答

定义二维 dp 数组，自底向下的递推

1. 状态定义：

`dp[i][j]` 表示从点 `(i, j)` 到底边的最小路径和。

2. 状态转移

`dp[i][j] = min(dp[i+1][j], dp[i+1][j+1]) + triangle[i][j]`

```js
var minimumTotal = function(triangle) {
    const dp = new Array(triangle.length + 1).fill(0)
    for(let i = triangle.length - 1; i >= 0; i--) {
        for(let j = 0; j < triangle[i].length; j++) {
            dp[j] = Math.min(dp[j], dp[j + 1]) + triangle[i][j]
        }
    }
    return dp[0]
};
```

## 139. 单词拆分

:::tip 题目
给你一个字符串 s 和一个字符串列表 `wordDict` 作为字典。请你判断是否可以利用字典中出现的单词拼接出 s 。

注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。
:::

**示例 1：**

```js
输入: s = "leetcode", wordDict = ["leet", "code"]
输出: true
解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。
```

**示例 2：**

```js
输入: s = "applepenapple", wordDict = ["apple", "pen"]
输出: true
解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。
     注意，你可以重复使用字典中的单词。
```

**示例 3：**

```js
输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
输出: false
```

### 解答

```js
```

## 198. 打家劫舍

:::tip 题目
你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
:::
**示例 1：**

```js
输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。
```

**示例 2：**

```js
输入：[2,7,9,3,1]
输出：12
解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。
``` 
### 解答

```js
```

## 213. 打家劫舍 II

:::tip 题目
你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。

给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，今晚能够偷窃到的最高金额。
:::

**示例 1：**

```js
输入：nums = [2,3,2]
输出：3
解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。
```

**示例 2：**

```js
输入：nums = [1,2,3,1]
输出：4
解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
     偷窃到的最高金额 = 1 + 3 = 4 。
```

**示例 3：**

```js
输入：nums = [1,2,3]
输出：3
```

### 解答

```js
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

## 309. 最佳买卖股票时机含冷冻期

:::tip 题目
给定一个整数数组 `prices`，其中第  `prices[i]` 表示第 i 天的股票价格 。​

设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:

卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。

- 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

:::

**示例 1:**

```js
输入: prices = [1,2,3,0,2]
输出: 3 
解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]
```

**示例 2:**

```js
输入: prices = [1]
输出: 0
```

### 解答

状态转移方程

```js
dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i])
//冷却时间1天，所以要从 i - 2 天转移状态
//买入，卖出 ---- 冷冻期 ----  买入，卖出
dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 2][k - 1][0] - prices[i])
```

不限制交易次数 K，所以 k 可以省略

```js
dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
dp[i][1] = Math.max(dp[i - 1][1], dp[i - 2][0] - prices[i])

//降维i
dp[0] = Math.max(dp[0], dp[1] + prices[i])
dp[1] = Math.max(dp[1], profit_freeze - prices[i])
```

```js
```

## 714. 买卖股票的最佳时机含手续费

:::tip 题目

给定一个整数数组 prices，其中 `prices[i]` 表示第 i 天的股票价格 ；整数 `fee` 代表了交易股票的手续费用。

你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。

返回获得利润的最大值。

注意：这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。
:::

**示例 1：**

```js
输入：prices = [1, 3, 2, 8, 4, 9], fee = 2
输出：8
解释：能够达到的最大利润:  
在此处买入 prices[0] = 1
在此处卖出 prices[3] = 8
在此处买入 prices[4] = 4
在此处卖出 prices[5] = 9
总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8
```

**示例 2：**

```js
输入：prices = [1,3,7,5,10,3], fee = 3
输出：6
```

### 解答

```js
```

## 62. 不同路径

:::tip 题目
一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

问总共有多少条不同的路径？
:::

**示例 1：**
![](/img/algorithm/dynamic/62.png)

```js
输入：m = 3, n = 7
输出：28
```

**示例 2：**

```js
输入：m = 3, n = 2
输出：3
解释：
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右
3. 向下 -> 向右 -> 向下
```

**示例 3：**

```js
输入：m = 7, n = 3
输出：28
```

**示例 4：**

```js
输入：m = 3, n = 3
输出：6
```

### 解答

到达每个网格的路径数都可以等于上侧和左侧的路径数之和，递推方程可以得到

```js
dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
```

首先初始化一个 `m * n` 的二维数组，数组的所有节点值都先初始为0，由于**最上边一行和最左边一列都是边界**，只能有一种走法，所以初始为 1。然后根据递推方程求解即可

```js
var uniquePaths = function(m, n) {
    const dp = new Array(m).fill(new Array(n).fill(0))
    // 边界场景
    for(let i = 0; i < m; i++) {
        dp[i][0] = 1
    }
    for(let j = 0; j < n; j++) {
        dp[0][j] = 1
    }

    for(let i = 1; i < m; i++) {
        for(let j = 1; j < n; j++) {
                dp[i][j] = dp[i][j - 1] + dp[i - 1][j]
        }
    }
    return dp[m - 1][n - 1]
};

// dp[m, n] = dp[m - 1][n] + dp[m][n - 1]

```

## 63. 不同路径 II

:::tip 题目描述

一个机器人位于一个 `m x n` 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish”）。

现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？

网格中的障碍物和空位置分别用 `1` 和 `0` 来表示。

 :::

**示例 1：**
![](/img/algorithm/dynamic/63.1.png)

```js
输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
输出：2
解释：3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 2 条不同的路径：
1. 向右 -> 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右 -> 向右
```

**示例 2：**

![](/img/algorithm/dynamic/63.2.png)

```js
输入：obstacleGrid = [[0,1],[0,0]]
输出：1
```

### 解答

在上一题的基础上，添加等于 0 的判断即可

```js
var uniquePathsWithObstacles = function(obstacleGrid) {
    if(!obstacleGrid.length || obstacleGrid[0][0] === 1) return 0
    const row = obstacleGrid.length, col = obstacleGrid[0].length
    const dp = new Array(row).fill(0).map(_ => new Array(col).fill(0))
    for(let i = 0; i < row && obstacleGrid[i][0] === 0; i++) {
        dp[i][0] = 1
    }
    for(let i = 0; i < col && obstacleGrid[0][i] === 0; i++) {
        dp[0][i] = 1
    }
    
    for(let i = 1; i < row; i++) {
        for(let j = 1; j < col; j++) {
            if(obstacleGrid[i][j] === 0) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
            }
        }
    }
    return dp[row - 1][col - 1]
};
```
