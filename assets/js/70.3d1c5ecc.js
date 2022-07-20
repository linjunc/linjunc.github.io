(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{518:function(v,_,t){"use strict";t.r(_);var r=t(65),s=Object(r.a)({},(function(){var v=this,_=v.$createElement,t=v._self._c||_;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("blockquote",[t("p",[v._v("📢 大家好，我是小丞同学，一名"),t("font",{attrs:{color:"#2e86de"}},[v._v("准大二的前端爱好者")])],1),v._v(" "),t("p",[v._v("📢 这篇文章将"),t("strong",[v._v("欢快的")]),v._v("带你了解一下 CSS 和 JS 动画的差别")]),v._v(" "),t("p",[v._v("📢 "),t("font",{attrs:{color:"#f368e0"}},[t("strong",[v._v("愿你忠于自己，热爱生活")])])],1)]),v._v(" "),t("h2",{attrs:{id:"引言"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#引言"}},[v._v("#")]),v._v(" 引言")]),v._v(" "),t("p",[v._v("讲到动画，当然是非常有意思的啦，你可以往上滑一下，看看上面的封面图，是不是相当的炫酷，以为我是代码写出来的吗？")]),v._v(" "),t("p",[v._v("那当然不可能啊，我这么摸鱼，怎么会为了个封面图上号呢")]),v._v(" "),t("p",[v._v("废话不多说，其实上面的动图用代码实现也不会很困难，这个图是用 canva 做出来的。")]),v._v(" "),t("p",[v._v("本文主要讲以下这些内容")]),v._v(" "),t("ol",[t("li",[v._v("浏览器渲染流程")]),v._v(" "),t("li",[v._v("回流和重绘")]),v._v(" "),t("li",[v._v("CSS 动画")]),v._v(" "),t("li",[v._v("JS 动画")]),v._v(" "),t("li",[v._v("两者对比")])]),v._v(" "),t("h2",{attrs:{id:"🍉-1-浏览器的渲染流程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#🍉-1-浏览器的渲染流程"}},[v._v("#")]),v._v(" 🍉 1. 浏览器的渲染流程")]),v._v(" "),t("p",[v._v("渲染流程主要有4个步骤")]),v._v(" "),t("ol",[t("li",[v._v("解析 HTML 生成DOM 树")]),v._v(" "),t("li",[v._v("解析 CSS 样式生成 CSSOM 树，CSSOM 树与 DOM 树结合生成 Render tree")]),v._v(" "),t("li",[v._v("布局 Render Tree 对每个节点进行布局处理，确定在屏幕上的位置")]),v._v(" "),t("li",[v._v("绘制 Render Tree，遍历渲染树将每个节点绘制出来")])]),v._v(" "),t("p",[v._v("为了优化用户体验，渲染引擎不会等到 HTML 解析完才创建布局渲染树")]),v._v(" "),t("h3",{attrs:{id:"生成-dom-树"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#生成-dom-树"}},[v._v("#")]),v._v(" "),t("strong",[v._v("生成 DOM 树")])]),v._v(" "),t("p",[v._v("DOM 树的构建是一个深度遍历过程，也就是说只有在所有子节点都构建好后才会去构建当前节点的下一个兄弟节点")]),v._v(" "),t("h3",{attrs:{id:"生成-render-树"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#生成-render-树"}},[v._v("#")]),v._v(" "),t("strong",[v._v("生成 Render 树")])]),v._v(" "),t("p",[v._v("生成 DOM 树的同时会生成 CSSOM 树，根据 CSSOM 和 DOM 树构建 Render Tree，渲染树包括颜色，尺寸等显示属性的矩形")]),v._v(" "),t("h3",{attrs:{id:"dom-树和-render-树"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dom-树和-render-树"}},[v._v("#")]),v._v(" "),t("strong",[v._v("DOM 树和 Render 树")])]),v._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210822213018363.png",alt:"image-20210822213018363"}})]),v._v(" "),t("h2",{attrs:{id:"🍋-2-回流和重绘"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#🍋-2-回流和重绘"}},[v._v("#")]),v._v(" 🍋 2. 回流和重绘")]),v._v(" "),t("p",[v._v("CSS 中至关重要的概念")]),v._v(" "),t("h3",{attrs:{id:"回流"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#回流"}},[v._v("#")]),v._v(" 回流")]),v._v(" "),t("p",[v._v("回流也叫"),t("strong",[v._v("重排")]),v._v("，指"),t("strong",[v._v("几何属性")]),v._v("需要改变的渲染。")]),v._v(" "),t("p",[v._v("每一次的回流都会将网页内容"),t("strong",[v._v("重新渲染")]),v._v("，只是我们人眼感觉不到有任何变化，但是它确实是会清空页面的，再从页面的左上角的第一个像素点从左到右从上到下这样一点一点渲染，每次回流都会是这样的过程，只是感觉不到而已")]),v._v(" "),t("blockquote",[t("p",[v._v("渲染树的节点发生改变，影响了该节点的几何属性，导致该节点位置发生变化，此时就会触发浏览器回流并重新生成渲染树。")])]),v._v(" "),t("p",[v._v("常见的几何属性：布局，尺寸这些可以用尺子量出来的属性")]),v._v(" "),t("ul",[t("li",[v._v("display、float、grid")]),v._v(" "),t("li",[v._v("width、padding")])]),v._v(" "),t("p",[v._v("等")]),v._v(" "),t("h3",{attrs:{id:"重绘"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#重绘"}},[v._v("#")]),v._v(" 重绘")]),v._v(" "),t("p",[v._v("重绘指更改"),t("strong",[v._v("外观属性")]),v._v("而不影响"),t("strong",[v._v("集合属性")]),v._v("的渲染，类似于颜色这些。相比于回流，重绘的作用不会那么强烈。")]),v._v(" "),t("p",[v._v("渲染树的节点发生改变，但不影响该节点的集合属性，回流对浏览器性能的消耗是远大于重绘的。并且回流就必然带来重绘，重绘不一定需要回流")]),v._v(" "),t("p",[t("strong",[v._v("外观属性")])]),v._v(" "),t("ul",[t("li",[v._v("clip，background")]),v._v(" "),t("li",[v._v("text")])]),v._v(" "),t("p",[v._v("等")]),v._v(" "),t("p",[v._v("在介绍完这些知识后我们来聊聊 CSS 动画")]),v._v(" "),t("h2",{attrs:{id:"🍍-3-css3-动画"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#🍍-3-css3-动画"}},[v._v("#")]),v._v(" 🍍 3. CSS3 动画")]),v._v(" "),t("p",[v._v("这里我们只谈论 CSS3 的动画")]),v._v(" "),t("p",[v._v("CSS3 动画也被称为补间动画，原因是只需要添加关键帧的位置，其他的未定义的帧会被自动生成")]),v._v(" "),t("p",[v._v("因为我们只设置了几个关键帧的位置，所以在进行动画控制的时候比较困难，不能再半路暂停动画，或者在动画过程中添加一些其他操作，都不大容易")]),v._v(" "),t("p",[v._v("但是 CSS 动画也有很多的好处")]),v._v(" "),t("ul",[t("li",[v._v("浏览器可以对动画进行优化")]),v._v(" "),t("li",[v._v("帧速不好的浏览器，CSS3 可以自然降级兼容")]),v._v(" "),t("li",[v._v("代码简单，调优方向固定")])]),v._v(" "),t("h2",{attrs:{id:"🍎-4-js-动画"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#🍎-4-js-动画"}},[v._v("#")]),v._v(" 🍎 4. JS 动画")]),v._v(" "),t("p",[v._v("首先，JS 动画是逐帧动画，在时间帧上绘制内容，一帧一帧的，所以他的可再造性很高，几乎可以完成任何你想要的动画形式。但是由于逐帧动画的内容不一样，会增加制作的负担，占用比较大的资源空间。")]),v._v(" "),t("p",[v._v("但是它也有很多的优势")]),v._v(" "),t("ul",[t("li",[v._v("细腻的动画")]),v._v(" "),t("li",[v._v("可控性高")]),v._v(" "),t("li",[v._v("炫酷高级的动画")])]),v._v(" "),t("h2",{attrs:{id:"💯-5-css-动画与-js-动画对比"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#💯-5-css-动画与-js-动画对比"}},[v._v("#")]),v._v(" 💯 5. CSS 动画与 JS 动画对比")]),v._v(" "),t("p",[v._v("前面关于 CSS 动画和 JS 动画，都是一些概念性比较强的东西，不看也罢")]),v._v(" "),t("p",[v._v("说了这么多，到底为什么CSS动画要"),t("strong",[v._v("更高效")]),v._v("呢？")]),v._v(" "),t("h3",{attrs:{id:"第一点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第一点"}},[v._v("#")]),v._v(" "),t("strong",[v._v("第一点")])]),v._v(" "),t("p",[v._v("从实现动画的复杂度来看，CSS 动画大多数都是补间动画，而 JS 动画是逐帧动画。当然这里我们不谈论实现的效果")]),v._v(" "),t("h3",{attrs:{id:"第二点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第二点"}},[v._v("#")]),v._v(" "),t("strong",[v._v("第二点")])]),v._v(" "),t("p",[v._v("编码的高效，采用 JS 去实现的动画，无论多简单的动画，都需要去控制整个过程，当然你可能会说可以采用一些库来解决这些问题，但是这些库的实际运行可能要比原生实现的效率要低的多")]),v._v(" "),t("h3",{attrs:{id:"第三点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第三点"}},[v._v("#")]),v._v(" "),t("strong",[v._v("第三点")])]),v._v(" "),t("p",[v._v("性能的高效，在我们前面讲到了回流和重绘，如果我们要操作一个元素向右移动，我们可能需要控制 "),t("code",[v._v("dom.style.left")]),v._v(" 属性，每次来"),t("strong",[v._v("改变元素的位置")]),v._v("，而结合我们所说的，"),t("strong",[v._v("几何属性")]),v._v("的改变必然会引起"),t("strong",[v._v("回流")]),v._v("，回流必然引起重绘，可想而知如果我们采用 JS 来实现动画，这个代价有多大，这会造成浏览器在不断的计算页面，从而导致浏览器内存堆积。同时由于 JavaScript 运行在浏览器的主线程中，主线程中还有其他的重要任务在运行，因而可能会受到干扰导致"),t("strong",[v._v("线程阻塞")]),v._v("，从而"),t("strong",[v._v("丢帧")])]),v._v(" "),t("p",[v._v("而 CSS 的动画是运行在合成线程中的，不会阻塞主线程，并且在合成线程中完成的动作不会触发回流和重绘")]),v._v(" "),t("p",[v._v("当然还有一个重要的点：JS 动画运行在 CPU，而 CSS 动画运行在 GPU")]),v._v(" "),t("p",[v._v("总的来说， CSS动画的渲染成本小，并且它的执行效率高于 JavaScript 动画")]),v._v(" "),t("hr"),v._v(" "),t("p",[v._v("那我们什么时候使用 CSS 动画，什么时候使用 JS 动画呢？")]),v._v(" "),t("p",[v._v("我个人觉得")]),v._v(" "),t("p",[t("strong",[v._v("只要能用 CSS 实现的动画，就不要采用 JS 去实现")]),v._v("，可以多采用 CSS 预处理器去做更多复杂的动画，就像我之前用 SCSS 做的流星雨动画一样")]),v._v(" "),t("p",[v._v("如果动画相较复杂，我们可以采用 "),t("code",[v._v("JS + canvas")]),v._v(" 去尝试，能不能实现")]),v._v(" "),t("p",[v._v("最后再考虑纯 JS 实现")]),v._v(" "),t("hr"),v._v(" "),t("p",[v._v("这篇文章可能还有很多值得探讨的地方，大佬们有什么看法或者不一样的见解可以一起交流以下~")]),v._v(" "),t("blockquote",[t("p",[v._v("非常感谢您的阅读，欢迎提出你的意见，有什么问题欢迎指出，谢谢！🎈")])])])}),[],!1,null,null,null);_.default=s.exports}}]);