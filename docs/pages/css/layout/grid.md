---
title: 一文读懂CSS布局（一）- Grid布局
date: 2021-5-9 10:46:07
id: 1635662767
photos: https://ljcimg.oss-cn-beijing.aliyuncs.com/img/grid.png
tags:
  - css布局
  - grid
categories:
  - 前端总结
keywords: Grid布局,CSS布局方式,小丞同学
description: Grid布局是css中非常重要的一种布局方式，这篇文章将会图文结合，生动的解释每个属性的用法，助你完全掌握grid布局
---

**先上图**

![Grid布局](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/Grid%E5%B8%83%E5%B1%80.png)

## 简介

Grid 布局是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是**二维布局**，也是唯一的二维布局方案，利用grid布局可以很轻松的实现很多的网页布局

## 正文

gird布局很强大，采用网格布局的区域，称为"容器"（container）。容器内部子元素，称为"项目"（item），即`container -> item`

`注意`：Grid 布局==只对项目生效==，项目只能是容器的一级子元素，不包含项目的子元素

下面从==容器属性==和==项目属性==两大块来记录grid布局中的相关属性

**全文代码==基于==**

```css
.container {
    /**/
}
.item {
    
    font-size: 50px;
    color: white;
}
.item-1 {
    background-color: #55efc4;
}
.item-2 {
    background-color: #81ecec;
}
.item-3 {
    background-color: #74b9ff;
}
.item-4 {
    background-color: #a29bfe;
}
.item-5 {
    background-color: #00b894;
}
.item-6 {
    background-color: #0984e3;
}
.item-7 {
    background-color: #6c5ce7;
}
.item-8 {
    background-color: #fab1a0;
}
.item-9 {
    background-color: #fdcb6e;
}
.item-10 {
    background-color: #fd79a8;
}
```

```html
<div class="container">
        <div class="item item-1">1</div>
        <div class="item item-2">2</div>
        <div class="item item-3">3</div>
        <div class="item item-4">4</div>
        <div class="item item-5">5</div>
        <div class="item item-6">6</div>
        <div class="item item-7">7</div>
        <div class="item item-8">8</div>
        <div class="item item-9">9</div>
        <div class="item item-10">10</div>
</div>
```

> 下面开始我们的正文

### 容器属性

#### 1. display属性

`display：grid`为一个容器采用网格布局模式

- 将元素定义为网格容器，并为其内容建立新的网格格式化上下文，属性值有2个：
  - `grid` ：生成一个块级网格
  - `inline-grid`：生成一个行级网格

```css
.container {
     display: grid;
    /* display: inline-grid; 行级网格*/
}
```

在大多数场景下我们往往采用`grid`块级网格，会像块级元素一样占满一行。

对于`inline-grid`行级网格，它就能让容器与其他元素共占一行，容器和行内块元素基本一致

`注意`：为网格布局以后，容器子元素（项目）的`float`、`display: inline-block`、`display: table-cell`等设置都将失效。

![image-20210509005827102](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210509005827102.png)

左侧是`grid`，右侧是`inline-grid`

#### 2. 网格轨道

**至关重要**

`grid-template-columns`属性：定义每一列的列宽

`grid-template-rows `属性：定义每一行的行高

```css
.container {
    display: grid;
    grid-template-columns: 200px 200px 200px;
    grid-template-rows: 200px 200px 200px;
}
```

在上面的代码中划分了一个三行三列，列宽和行高都是200px的网格

![image-20210509012038548](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210509012038548.png)

> 在这个属性下有很多的小属性来帮助我们优化

1. `repeat()`

当我们需要写很多行很多列的时候，一个个敲相同的值会非常麻烦，这时候就可以使用`repeat()`函数，简化重复值

- `repeat()`接受两个参数，第一个参数是重复的次数，第二个参数是所要重复的值

```css
.container {
    display: grid;
	grid-template-columns: repeat(3,200px);
    grid-template-rows: repeat(3,200px);
}
```

不止于此，`repeat`还可以重复某种模式，就像

```css
grid-template-columns: repeat(3,200px 100px);
```

这句代码定义了6列，分别是200，100，200，100，200，100

还是很容易理解的，简单说就是重复后面的值几遍

2. `auto-fill`关键字

表示自动填充，让一行（或者一列）中尽可能的容纳更多的单元格

> 当我们只需要确定列宽或者行高，而不用理有多少列时，就可以使用它了

```css
.container {
    display: grid;
	grid-template-columns: repeat(auto-fill,200px);
    grid-template-rows: repeat(3,200px);
}
```

![grid1](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/grid1.gif)

每一列200px，列数设置为了`auto-fill`会自动填充，此时缩小浏览器的宽度，项目会因填充不下而另起一行

3. `fr`关键字

`fr` 单位代表网格容器中可用空间的一等份。使用方法如下

```css
grid-template-columns: 200px 1fr 2fr ;
grid-template-rows: repeat(3,200px)
```

表示第一个列宽设置为 `200px`，后面剩余的宽度分为两部分，第二给项目占`1/3`，第三个项目占`2/3`

![grid-fr](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/grid-fr.gif)

从图中可以看出第三列始终占据着剩余位置中的2份，列宽始终是第二列的二倍

4. `minmax()`

`minmax()` 函数产生一个长度范围，表示长度就在这个范围之中都可以应用到网格项目中。它接受两个参数，分别为最小值和最大值

- 也就是说最大不会超过最大值，最小不能小过最小值

```css
grid-template-columns: 200px 1fr minmax(400px,1fr);
grid-template-rows: repeat(3,200px)
```

上面的代码` minmax(400px,1fr)`表示列宽不小于400px，不大于1fr

![grid-minmax](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/grid-minmax.gif)

5. `auto`关键字

设置`auto`后，将由浏览器自行决定长度，尽可能的会占满剩余空间，除非有其他设置，例如有`min-width`之类的，利用这个关键字，我们可以轻易实现==三列==或者==两列布局==。

```css
grid-template-columns: 200px auto 200px;
grid-template-rows: repeat(3,200px)
```

![grid-auto](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/grid-auto.gif)

> 对中间那列设置了auto，实现了中间自适应的三栏布局

6. 网格线

grid布局叫做网格布局，那自然少不了网格线的存在，使用方括号，指定每一根网格线的名字，方便以后的做定位时使用

```css
grid-template-columns: [c1] 200px [c2] auto [c3] 200px [c4];
grid-template-rows:  [r1] 200px [r2] auto [r3] 200px [r4];
```

就像这样定义了一个`3*3`的网格区域，就需要有4条水平线，4条垂直线

![grid-line](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/grid-line.png)

#### 3. 网格间距

`row-gap`属性设置行与行的间隔（行间距），`column-gap`属性设置列与列的间隔（列间距）。

`注意`：在很多的博客中采用的都是带有`grid`前缀的方式，目前这种定义网格间距的方式已经被废弃了，所以还是尽量采用这种写法

```css
.container {
	grid-template-columns: repeat(3,200px);
	grid-template-rows: repeat(3,200px);
	row-gap: 10px;
	column-gap: 10px;
}
```

在这段代码中定义了行间距为`10px`，列间距为`10px`，也可以采用合并属性`gap`来写`gap: 10px 10px`的意思和上面相同，第一个参数是行间距，第二个是列间距

![grid-gap](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/grid-gap.png)

#### 4. grid-template-areas 属性

用于定义区域，一个区域由一个或者多个单元格组成

```css
grid-template-columns: repeat(3, 200px);
grid-template-rows: repeat(3, 200px);
grid-template-areas: 'a b c' 
					 'd e f' 
					 'g h i';
```

上面的代码划分出了9个单元格，然后将其命名为`a~i`的9个区域，分别对应9个单元格

我们也可以将多个单元格合并成一个区域

```css
grid-template-columns: repeat(3, 200px);
grid-template-rows: repeat(3, 200px);
grid-template-areas: 'a a a' 
					 'b b c' 
					 'e e c';
```

上面的代码中将9个单元格划分成了`a,b,c,d`4个区域

在我们常见的布局中

![语义化](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/%E8%AF%AD%E4%B9%89%E5%8C%96.webp)

```css
grid-template-areas: 'header header header' 
					 'article article aside' 
					 'footer footer footer';
```

像上面的代码中，就划分出了4个部分，这里省略了`nav`，为了和全为配一配，问题不大 :happy: 在后面会学习怎么操作这些区域，现在先了解划分区域

`注意`：如果某些区域不需要利用，则用"点"（`.`）表示。

**就像这样**

```css
grid-template-areas: 'a . c'
                     'd . f'
                     'g . i';
```

用`.`占取的位置，不会被划分于任何区域，也就是在上面的代码中，只划分了6个区域

`注意`：区域的命名会影响到网格线的名字，对于区域`aside`它的起始线叫做`aside-start`，结束线叫做`aside-end`

![grid-areas](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/grid-areas.png)

#### 5. grid-auto-flow 属性

> 划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行，即下图数字的顺序。

这个顺序由`grid-auto-flow`属性决定，默认值是`row`，即"先行后列"。也可以将它设成`column`，变成"先列后行"。

```css
grid-auto-flow: column;
```

![grid-autofill](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/grid-autofill.png)

`注意`：盒子的排列顺序变成了先列后行

还有两个特殊的属性值`row dense`和`column dense`

当我调整我们的代码将某一个项目拉长时，会有这一行放不下的情况，就像图片==左边==这个场景一样，第6个项目因为太长了放不上去，那个位置被空出来了，我们可以尝试使用。

```css
grid-auto-flow: row dense;
```

结果就会得到==右边==的情形，7号自动的补了上去

![grid-dense](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/grid-dense.png)

> 在实际应用中，我们可能想让下面长度合适的填满这个空白，这个时候可以设置 `grid-auto-flow: row dense`，表示尽可能填满表格

`注意`：把某个项目长度变长使用的是项目属性，后面会写到

#### 6. 单元格内容排列方式

`justify-items` 属性设置单元格内容的水平位置（左中右），`align-items` 属性设置单元格的垂直位置（上中下）

这里只以`justify-items`做展示，另一个同理，只是一个水平一个垂直的差别

- start：对齐单元格的起始边缘。
- end：对齐单元格的结束边缘。
- center：单元格内部居中。
- stretch：拉伸，占满单元格的整个宽度（默认值）。

```js
.container {
    display: grid;
    grid-template-columns: 200px 200px 200px;
    grid-template-rows: 200px 200px 200px;
    gap: 10px 10px;
    justify-items: center;
}
```

在上面的代码中，表示单元格内部居中

![grid-justify](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/grid-justify.png)

```css
justify-items: start;
```

![grid-start](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/grid-start.png)

```css
justify-items: end;
```

![grid-end](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/grid-end.png)

对于`justify-items` 和`align-items` 属性，可以采用合并的写法

```css
place-items: start end;
```

代表的意思是垂直方向子项对齐起始位置，水平方向对齐结束位置

`注意`：如果只写一个值，默认第二个值与第一个相等

#### 7. 内容区域的排列方式

`justify-content`属性是定义整个内容区域在容器里面的水平位置（左中右），`align-content`属性是定义整个内容区域的垂直位置（上中下）

有以下几个属性

- start ：对齐容器的起始边框。
- end ：对齐容器的结束边框。
- center ：容器内部居中。

````css
justify-content: start;
/*justify-content: center;
justify-content: end;*/
````

上面代码依次从上到下对应

![grid-content](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/grid-content.png)

- stretch ：项目大小没有指定时，拉伸占据整个网格容器。

![content-stretch](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/content-stretch.png)

- space-around ：每个项目两侧的间隔相等。因此，项目之间的间隔比项目与容器边框的间隔大一倍

![space-around](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/space-around.png)

- space-between ：项目与项目的间隔相等，项目与容器边框之间没有间隔。

![space-between](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/space-between.png)

- space-evenly ：项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。

![space-evenly](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/space-evenly.png)

#### 8. 设置多余网格

对于网格有==显式网格==和==隐式网格==，显示网格通过`grid-template-columns` 和 `grid-template-rows` 属性中定义的行和列，当实际行数或者列数大于设置的行列数时，就会有多余的网格，这些网格的宽高通过`grid-auto-columns`和`grid-auto-rows`属性来设置

```css
.container {
    display: grid;
    grid-template-columns: 200px 200px 200px 200px;
    grid-template-rows: 200px 200px ;
    gap: 10px 10px;
    grid-auto-rows: 50px;
}
```

在上面的代码中设置了4*2的网格，但是我们一共用9个项目，通过`grid-auto-rows: 50px`设置了多余网格的高度

![gridauto-rows](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/gridauto-rows.png)

### 项目属性

这部分是关于项目的属性，也就是说这些属性要写到项目自己的身上，不能再写到`container`身上

#### 1. 指定项目的位置

实现的原理其实是指定项目的四个==边框==，分别定位在哪根网格线

- `grid-column-start`属性：左边框所在的垂直网格线
- `grid-column-end`属性：右边框所在的垂直网格线
- `grid-row-start`属性：上边框所在的水平网格线
- `grid-row-end`属性：下边框所在的水平网格线

```css
.container {
    display: grid;
    grid-template-columns: 200px 200px 200px ;
    grid-template-rows: 200px 200px 200px;
    gap: 10px 10px;
}
.item-1 {
    background-color: #55efc4;
    grid-column-start: 2;
    grid-column-end: 4;
}
```

上面的代码中指定了1号项目的左边框从第二条网格线开始，第4条网格线结束，因此将会占据2个网格

![grid-column-start](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/grid-column-start.png)

也可以使用`span`关键字，来实现占2个网格这样的效果，可以将它理解为跨越的意思

```css
grid-column-end: span 2;
```

表示的意思是：1号项目的左边框距到右边框跨越了2个网格。

对于上面的4个属性可以采用简写的方式，例如

```css
grid-row: 1 / 4;
grid-column: 2 / 3;
```

这里的`/`不是除号的意思，仅是占位的作用。其中的第一行代码，制定了上边框在第1条网格线，下边框在第4条网格线，第二行代码同理。

> 如果只写一个数字的话，默认跨越1个网格

`注意`：当我们遇到两个项目占据位置重叠时我们可以采用`z-index`属性确定上下关系，就像这样

```css
.item-1 {
    background-color: #55efc4;
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-start: 2;
    grid-column-end: 4;
}
.item-3 {
    grid-row: 1 / 4;
    grid-column: 2 / 3;
    background-color: #74b9ff;
}
```

> 给1号和3号项目添加了属性，指定他们的占据位置，效果如左图

![grid-index](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/grid-index.png)

给一号盒子添加了`z-index:1`后，一号盒子到了上层

#### 2. grid-area属性

在前面容器属性讲过`grid-template-areas`属性，当时只是知道了怎么划分区域，现在这个属性就是怎么把项目指定给区域

```css
.container {
    display: grid;
    grid-template-columns: 200px 200px 200px ;
    grid-template-rows: 200px 200px 200px;
    grid-template-areas: 'a a a' 
                         'b b c' 
                         'e e c';
    gap: 10px 10px;
}
```

首先我们先利用`grid-template-areas`属性在==容器==上划分区域，上面划分了4块区域，下面我们通过给==项目==添加`grid-area`属性，来给它指定到某个区域当中

```css
.item-1 {
    grid-area: c;
    background-color: #55efc4;
}
```

上面的代码中，将1号项目指定到了`c`区域，也就是右下角2个网格

![grid-area](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/grid-area.png)

`注意`：2个区域之间需要紧挨，不能隔开

#### 3. 网格内容排列方式（单个项目）

- `justify-self`属性设置单元格内容的水平位置（左中右），跟`justify-items`属性的用法完全一致，但只作用于单个项目。

- `align-self`属性设置单元格内容的垂直位置（上中下），跟`align-items`属性的用法完全一致，也是只作用于单个项目。

> 属性值：start | end | center | stretch

从`self`这个单词来说，就有自身的意思吧（工地英语，我说有就有），也就是只对当前项目本身有效

```css
.item-1 {
      background-color: #55efc4;
      justify-self: start;
      /* justify-self: center;
      justify-self: end;*/
}
```

![grid-justify-self](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/grid-justify-self.png)

分别对应`justify-self`三个属性值，其中`stretch`拉伸会占满网格整行

```css
.item-1 {
    background-color: #55efc4;
    align-self: start;
    /* align-self: center;
    align-self: end; */
}
```

![grid-align-self](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/grid-align-self.png)

分别对应`align-self`三个属性值，其中`stretch`拉伸会占满网格整列

同样的，存在着合并简写属性`place-self`，可以通过这个来指定`justify-self`和`align-self`的值，前后顺序如下：

```css
place-self: <align-self> <justify-self>;
```

----

以上就是关于`grid`网格布局的全部内容了

### Tips

`grid`布局中属性有很多，一定要通过实战来记这些属性，要区分好容器属性，和项目属性这是重中之重，多动手才是王道！

**牢记此图！**

![grid](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/grid.png)