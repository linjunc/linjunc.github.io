---
title: 一文读懂CSS布局（二） -- flex布局
date: 2021-5-22 1:49:03
id: 1635662943
photos: https://ljcimg.oss-cn-beijing.aliyuncs.com/img/flex.png
tags:
  - css布局
  - flex
categories:
  - 前端总结
keywords: flex布局,CSS布局方式,小丞同学
description: 一文读懂CSS布局（二） -- flex布局，图文详细解析，完整思维导图，flex布局这一篇就足够了
---

在我们上一篇CSS布局文章中详细的讲解了**grid布局**，这篇文章就带大家来学习一下flex布局！

**全文思维导图**，建议收藏！

![flex布局](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/flex%E5%B8%83%E5%B1%80-1621697515086.png)

## 简介

Flex布局，也叫"弹性布局"，用来为盒模型提供最大的灵活性。

**任何一个容器**都可以指定为 Flex 布局。

```css
.box{
    display: flex;
}
```

对于行内元素也可以使用**行内flex布局**

`注意`：这个点之前面试被面到过，可以留意一下

```css
.box{
    display: inline-flex;
}
```

**使用时应该注意些什么？**

- 对于部分浏览器有兼容性问题，需要做兼容性处理。（==IE==：“你直接报我身份证算了”）
- 在父级元素设置为flex布局后，子元素的float、clear、vertical-align属性==都将失效==，所以在使用flex布局时，应当在分析页面结构时就考虑清楚，不应该先设置完子元素布局后再使用。

## 基本概念

和grid布局一样，有==容器==和==项目==两个概念，采用 Flex 布局的元素，称为 Flex 容器，简称为"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目，简称为"项目"。

`注意`：不同于grid布局，flex布局是一维布局方式，按行或者按列

> 也就是父级元素采用flex布局，则父级元素为容器，全部子元素自动成为项目。

![flex](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/flex.png)

> 在flex布局中还有很多细致的属性，都一一在图中有展示

1. 水平的主轴（main axis）
2. 垂直的交叉轴（cross axis）
3. 主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end
4. 交叉轴的开始位置叫做cross start，结束位置叫做cross end
5. 单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size

## 容器属性

容器属性顾名思义就是设置在==容器==身上的属性，一共有6个，下面来一一介绍

- 也就是这一部分的属性全是设置在==容器盒子==身上的！

### 1. flex-direction

- `flex-direction`属性决定主轴的方向，也就是项目的排列方向

有四个属性值`row | row-reverse | column | column-reverse`

##### 测试代码

对三个项目分别设置了不同的颜色

```html
<div class="container">
    <div class="item item-1">flex item1</div>
    <div class="item item-2">flex item2</div>
    <div class="item item-3">flex item3</div>
</div>
```

`row`（默认值）：主轴为水平方向，起点在容器左端

![flex-row](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/flex-row.png)

`row-reverse`：主轴为水平方向，起点在容器右端

![flex-row-reverse](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/flex-row-reverse.png)

`column`：主轴为垂直方向，起点在容器上沿。

![flex-column](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/flex-column.png)

`column-reverse`：主轴为垂直方向，起点在容器下沿。

![flex-column-reverse](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/flex-column-reverse.png)

### 2. flex-wrap

- `flex-wrap`属性用于设置当项目在容器中一行无法显示的时候如何处理。

有三个属性值：`nowrap | wrap | wrap-reverse`

1. `nowrap`（默认）：不换行

2. `wrap`：换行，第一行==在上方==

3. `wrap-reverse`：换行，第一行==在下方==

![flex-wrap](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/flex-wrap.png)

### 3. flex-flow

`flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`

```css
.container {
    flex-flow: <flex-direction> || <flex-wrap>;
}
```

第一个属性是方向，第二个是是否换行

### 4. justify-content

`justify-content`属性定义项目在主轴上的对齐方式。

有5个属性值：`flex-start | flex-end | center | space-between | space-around`

- `flex-start`（默认值）：左对齐

![justify-start](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/justify-start.png)

- `flex-end`：右对齐

![justify-end](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/justify-end.png)

- `center`： 居中

![justify-center](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/justify-center.png)

- `space-between`：两端对齐，项目之间的间隔都相等

![justify-between](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/justify-between.png)

- `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

![justify-around](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/justify-around.png)

### 5. align-items

`align-items`属性定义项目在交叉轴上如何对齐

有5个属性值：`flex-start | flex-end | center | baseline | stretch`

- `flex-start`：交叉轴的起点对齐

- `flex-end`：交叉轴的终点对齐
- `center`：交叉轴的中点对齐
- `baseline`: 项目的第一行文字的基线对齐
- `stretch`（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

![align-items](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/align-items.png)

### 6. align-content

`align-content`属性定义了==多根轴线==的对齐方式。如果项目只有一根轴线，该属性不起作用

有6个属性值：`flex-start | flex-end | center | space-between | space-around | stretch`

- `flex-start`：与交叉轴的==起点对齐==

![align-start](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/align-start.png)

- `flex-end`：与交叉轴的==终点对齐==

![align-end](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/align-end.png)

- `center`：与交叉轴的中点对齐，也就是==垂直居中==

![align-center](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/align-center.png)

- `space-between`：与交叉轴两端对齐，轴线之间的间隔==平均分布==

![align-between](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/align-between.png)

- `space-around`：每根轴线==两侧的间隔都相等==。所以，轴线之间的间隔比轴线与边框的间隔大一倍

![align-around](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/align-around.png)

- `stretch`（默认值）：轴线占满整个交叉轴

![align-stretch](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/align-stretch.png)

## 项目属性

项目属性就是写在项目身上的！用来设置项目

### 1. order

`order`属性定义项目的排列顺序。数值越小，排列越靠前，==默认值为0==。

```css
.item-2 {
    order: 1;
    background-color: plum;
}
```

![order](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/order.png)

`item-2`设置了order为1，比1，3的order值要大，所以`item-2`会排到后面

### 2. flex-grow

`flex-grow`属性定义项目的放大比例，默认为`0`，即如果==存在剩余空间，也不放大==。

当其中的一个项目设置了`flex-grow`为`1`时，它将占据剩余空间的100%

```css
.item-1 {
    flex-grow: 1;
    background-color: pink;
}
```

![flex-grow](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/flex-grow.png)

如果所有项目的`flex-grow`属性都为1，则它们将==等分剩余空间==（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

![flex-grow2](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/flex-grow2.png)

### 3. flex-shrink

`flex-shrink`属性定义了项目的缩小比例，==默认为1==，即如果空间不足，该项目将缩小，和`flex-grow`算是相对的属性，一个放大一个缩小

![flex-shrink](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/flex-shrink.png)

如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，属性为0的不缩小。

如果都是默认值1，则空间不足时，==等比缩小==

`注意`：负值对该属性无效。

### 4. flex-basis

`flex-basis`属性定义了在分配多余空间==之前==，项目占据的主轴空间（在基本概念中有介绍到）。浏览器根据这个属性，计算主轴是否有多余空间。

- 它的默认值为`auto`，即项目的本来大小。

简单来说，当设置了`flex-basis`以后，就设定了==项目的尺寸==。

**注意**：`width`跟`flex-basis`的区别是，`flex-basis`的优先级更高。如果设置的`flex-basis`的值不为`auto`，那么`width`设置什么值都无效，以`flex-basis`的值为准。只有当`flex-basis`的值为`auto`的时候，该项目才会是`width`设定的值。

**注意：**`flex-basis`和`width`为`auto`值，那最后的空间就是根据内容多少来定的，内容多占据的水平空间就多

![flex-basis](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/flex-basis.png)

可以看出在`item2`分配剩余空间之前，`item1`先占据了`300px`

### 5. flex属性（重点）

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

```css
/*书写顺序*/
<'flex-grow'>  <'flex-shrink'>  <'flex-basis'> 
```

对于flex属性有几个常用的属性值`auto，none，1`

> 一下实例均对`item1`进行操作

##### flex: auto

`flex: auto` 等同于 `flex: 1 1 auto` 

![flex-auto](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/flex-auto.png)

##### flex: none

`flex: none` 等同于` flex: 0 0 auto` 

![flex-none](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/flex-none.png)

##### flex: 1

**注意：**当 `flex` 取值为一个非负数字，则该数字为 `flex-grow` 值，`flex-shrink` 取 1，`flex-basis` 取 0%

也就是说`flex: 1`是`flex: 1 1 0%`的简写

![flex1](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/flex1.png)

##### flex: 100px

当`flex`取值为一个长度或者是一个百分比时，则视为 `flex-basis` 值，`flex-grow` 取 1，`flex-shrink` 取 1

`flex: 100px`等同于`flex: 1 1 100px`

![flex100px](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/flex100px.png)

**注意：**由于`flex-grow: 1`所以`item1`会占满剩余空间

这部分是面试中常常会提及的内容，面试官：“你知道flex1吗？”

### 6. align-self

`align-self`属性设定单个项目的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

![align-self](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/align-self.png)

给容器设置了下端对齐，再给`item1`单独设置居中对齐

----

以上就是关于flex布局的全部内容了，相信看到这里的你一定有所收获，可以自己动手尝试一下啦！思维导图一定要收好噢！

![flex布局](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/flex%E5%B8%83%E5%B1%80.png)
