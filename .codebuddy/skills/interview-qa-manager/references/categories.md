# 前端面试题分类体系

## 现有分类目录结构

基于 VitePress 项目的 `docs/pages/` 目录结构：

### 1. 面试题合集 (interview/)
- **all/** - 基础面试题合集
  - `html.md` - HTML 相关面试题
  - `css.md` - CSS 相关面试题  
  - `js.md` - JavaScript 相关面试题
  - `intime.md` - 实时更新的面试题

- **heading/** - 精选面试题
  - `best1.md` - 精选面试题第一期
  - `best2.md` - 精选面试题第二期
  - `best3.md` - 精选面试题第三期
  - `route.md` - 路由相关面试题

- **internet/** - 互联网公司面试题
  - `alog.md` - 算法面试题
  - `baidu.md` - 百度面试题
  - `byte.md` - 字节跳动面试题
  - `hight.md` - 高级面试题
  - `project.md` - 项目面试题

### 2. React 相关 (react/)
- **primary/** - React 入门
- **hard/** - React 源码解析
- **reactinterview/** - React 面试题合集
  - `common.md` - React 常见面试题

### 3. 其他技术分类
- **handwriting/** - 手写代码系列
  - `handwriting.md` - 手写代码合集

- **algorithm/** - 算法合集
  - `algorithm.md` - 算法题目

- **network/** - 计算机网络
  - `overview.md` - 网络概述

- **structure/** - 数据结构
  - `start.md` - 数据结构入门

- **css/** - CSS 专题
  - **layout/** - 布局方式
    - `flex.md` - Flex 布局

- **summary/** - 前端总结
  - `ts.md` - TypeScript 总结

- **tschallenge/** - TS 类型挑战
  - `easy.md` - 简单题

## 分类规则

### 主分类映射
根据问题关键词自动归类：

1. **HTML** → `pages/interview/all/html.md`
   - 关键词：标签、语义化、DOCTYPE、meta、表单、canvas、svg

2. **CSS** → `pages/interview/all/css.md` 或 `pages/css/`
   - 关键词：选择器、盒模型、布局、flex、grid、动画、响应式、BFC

3. **JavaScript** → `pages/interview/all/js.md`
   - 关键词：闭包、原型、this、事件循环、Promise、async/await、ES6+

4. **React** → `pages/react/reactinterview/`
   - 关键词：React、Hook、组件、状态管理、Redux、生命周期、虚拟DOM

5. **Vue** → `pages/interview/all/` (可新建 vue.md)
   - 关键词：Vue、响应式、组件通信、computed、watch、Vuex

6. **手写代码** → `pages/handwriting/handwriting.md`
   - 关键词：手写、实现、封装、模拟、实现原理

7. **算法** → `pages/algorithm/algorithm.md`
   - 关键词：算法、数据结构、排序、搜索、动态规划、二叉树

8. **网络** → `pages/network/overview.md`
   - 关键词：HTTP、HTTPS、TCP、UDP、缓存、跨域、安全

9. **工程化** → `pages/interview/all/` (可新建 engineering.md)
   - 关键词：webpack、vite、babel、模块化、性能优化、CI/CD

10. **TypeScript** → `pages/summary/ts.md` 或 `pages/tschallenge/`
    - 关键词：TypeScript、类型、泛型、接口、类型推导

11. **浏览器** → `pages/chrome/` (可新建)
    - 关键词：浏览器、渲染、重排、重绘、存储、安全

12. **综合/其他** → `pages/interview/heading/` (精选系列)
    - 跨领域或综合性问题

## 文件路径规范

### 路径格式
- 绝对路径基准：`/Users/linjuncheng/Desktop/m-p/linjunc.github.io/docs/`
- 相对路径基准：`docs/`

### 命名规范
- 文件名使用小写英文，单词间用横线连接
- 示例：`event-loop.md`, `react-hooks.md`

### 新建分类
当现有分类不满足需求时，可以在以下位置创建新分类：
- `pages/interview/all/{new-category}.md` - 基础面试题新分类
- `pages/{new-topic}/` - 全新主题目录
