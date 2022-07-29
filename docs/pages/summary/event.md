
![head](/img/summary/event.png)

还记得上一次使用 event 对象是什么场景吗？<br />我猜一定是用来获取 target 或者用来阻止事件冒泡吧
```javascript
event.stopPropagation()
```
最近在看了一些代码和文章之后，发现 Event 对象并没有想象的那么简单，当然还是很简单，它还有更多丰富的用法！
## 前言
Event 对象就是事件对象，它是在事件发生之后产生的，作为参数传给监听函数。它是浏览器原生支持的一个构造函数，所有的事件都是这个对象的实例
```javascript
const event = new Event(type, options)
```
Event 构造函数接收两个参数，第一个参数是事件的名称，第二个参数是一个配置对象，主要有三个属性

- bubbles：是否冒泡
- cancelable，事件是否可以被取消，也就是能不能被 `preventDefault`取消这个事件
- composed，是否会在 DOM 根节点之外触发侦听器

以上几个属性的默认值都是 false<br />下面就通过**构造函数**的方式创建了一个事件，我们可以用 `dispatchEvent` 来触发这个事件
```javascript
const event = new Event(
  'watch',
  {
    'bubbles': true,
    'cancelable': false
  }
)
document.dispatchEvent(event)
```
## 实例属性
###  Event.eventPhase
Event.eventPhase 属性返回一个整数常量，表示事件**目前所处的阶段**
```javascript
const phase = event.eventPhase
```
返回值有 4 个状态

- 0 事件没有发生
- 1 事件处于捕获阶段、
- 2 事件到达目标节点
-  3 事件处于冒泡阶段
### Event.cancelable & Event.cancelBubble
Event.cancelable 返回布尔值，表示事件是否可以被取消<br />大多数事件都是可以被取消的，但是使用 Event 构造函数生成的事件，默认是不可以取消的
```javascript
const evt = new Event('foo');
evt.cancelable  // false
```
值得一提的是，当 cancelable 返回 false 时，使用 `event.preventDefault()` 会没有任何效果<br />Event.cancelBubble 也是返回当前是否阻止冒泡，设置为 true 和执行 stopPropagation 一样
### Event.currentTarget & Event.target
在事件发生以后，会经过捕获和冒泡两个阶段，依次通过多个 DOM 节点。

- event.target 表示触发事件的那个节点最初发生的节点，不会随事件的传播而变化
- event.currentTarget 表示事件当前正在通过的节点，也就是当前监听函数所在的节点，值会变化
> 事件传播过程中，不同节点的监听函数内部的Event.target与Event.currentTarget属性的值是不一样的。

### Event.type
返回事件的类型，在生成事件的时候就指定的，只读属性
```javascript
const event = new Event('ljc')
event.type // 'ljc'
```
### Event.timeStamp
返回事件发生的时间戳，相对于页面加载成功开始计算的
```javascript
const evt = new Event('ljc');
evt.timeStamp // 111.11
```
返回值的精度取决于浏览器的设置<br />我们可以利用这个属性来计算鼠标移动的速度，每秒移动多少的像素
### Event.detail
这个属性是浏览器事件才具有的，返回一个数值。具体和事件类型有关，比如

- 点击事件，detail 返回的就是鼠标按下的次数（1表示单击，2表示双击，3表示三击)
- 滚轮事件，detail 返回的是滚轮正向滚动的距离，或负向滚动的距离，返回值是 3 的倍数
### Event.isTrusted
表示当前事件是否为真实用户行为产生，比如 click 事件是用户产生的，会返回 true<br />Event 构造函数生成的事件，会返回 false
## 实例方法
### preventDefault & stopPropagation
阻止默认事件<br />阻止冒泡
### stopImmediatePrapagation
Event.stopImmediatePropagation  方法**阻止同一个事件的其他监听函数被调用**，不管监听函数定义在当前节点还是其他节点。也就是说，该方法阻止事件的传播，比 Event.stopPropagation() 更彻底。<br />如果同一个节点对于**同一个事件指定了多个监听函数**，这些函数会根据添加的顺序**依次调用**。只要其中有一个监听函数调用了 Event.stopImmediatePropagation 方法，其他的监听函数就不会再执行了。
```javascript
function l1(e){
  e.stopImmediatePropagation();
}

function l2(e){
  console.log('hello world');
}

el.addEventListener('click', l1, false);
el.addEventListener('click', l2, false);
```
上面代码在 el 节点上，为 click 事件添加了两个监听函数 l1 和 l2 。由于 l1 调用了event.stopImmediatePropagation 方法，所以 l2 不会被调用。
### composedPath
返回一个数组，成员是事件的最深层节点和依次冒泡经过的所有上层节点
```javascript
<div>
	<a></a>	
</div>

const div = document.querySelector('div')

div.addEventListener('click', (e) => {
	console.log(e.composedPath())
})
// [a, div, body, html, document, window]
```
click 节点的最深处是 a 节点，最上层是 window，因此 path 是从 a 到 window

---
以上就是本文的全部内容啦，希望能让你对 Event 对象有更多的认识！
