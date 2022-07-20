(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{532:function(a,s,t){"use strict";t.r(s);var e=t(65),n=Object(e.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("blockquote",[t("p",[a._v("在阅读红宝书时遇到了 "),t("code",[a._v("WeakMap")]),a._v(" 这个关键字，第一次见感觉没啥用，是我见识浅了，其实还是有点用的，有多大我不知道（快跑）")])]),a._v(" "),t("p",[a._v("希望这一篇文章能让你对 "),t("code",[a._v("Map")]),a._v(" 有更好的理解，或者能够帮你理解 "),t("code",[a._v("Map")]),a._v(" 和 "),t("code",[a._v("WeakMap")])]),a._v(" "),t("p",[a._v("这篇文章会先从"),t("code",[a._v("Map")]),a._v("再到"),t("code",[a._v("WeakMap")])]),a._v(" "),t("h2",{attrs:{id:"一、为什么是-map"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#一、为什么是-map"}},[a._v("#")]),a._v(" 一、为什么是 Map ？")]),a._v(" "),t("h3",{attrs:{id:"_1-传统对象结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-传统对象结构"}},[a._v("#")]),a._v(" 1. 传统对象结构")]),a._v(" "),t("p",[t("code",[a._v("Map")]),a._v("本质上是一个键值对的集合。和传统对象结构相比，传统的对象只能用"),t("strong",[a._v("字符串作为键名")]),a._v("，这就在使用上造成了很大的限制了。这也是新增 "),t("code",[a._v("Map")]),a._v(" 的原因之一。")]),a._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" data "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// element 为节点对象")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" element "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" document"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("querySelector")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('".node"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\nconsole"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("element"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 输出 div.node 对象")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 将对象转化成字符串输出 [object HTMLDivElement]")]),a._v("\nconsole"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("element"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("toString")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 用点操作符不能有空格，所以采用中括号的形式给对象赋值")]),a._v("\ndata"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("element"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"objectData"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 输出 objectData，说明在对象中存在[object HTMLDivElement]键名")]),a._v("\nconsole"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("data"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"[object HTMLDivElement]"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br"),t("span",{staticClass:"line-number"},[a._v("7")]),t("br"),t("span",{staticClass:"line-number"},[a._v("8")]),t("br"),t("span",{staticClass:"line-number"},[a._v("9")]),t("br"),t("span",{staticClass:"line-number"},[a._v("10")]),t("br")])]),t("p",[a._v("在上面的代码中，我们创建了一个对象并将一个节点对象作为了它的键名，并进行了代码测试，首先验证了获取到的"),t("code",[a._v("element")]),a._v("节点为一个对象，再确定了经过"),t("code",[a._v("toString")]),a._v("方法转化后的结果，以这个值为键名成功的输出了"),t("code",[a._v("value")]),a._v("值"),t("code",[a._v("objectData")])]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724161150545.png",alt:"image-20210724161150545"}})]),a._v(" "),t("p",[a._v("通过上面的测试，确定了传统对象的键名会通过"),t("code",[a._v("toString")]),a._v("方法转化为"),t("strong",[a._v("字符串类型")])]),a._v(" "),t("blockquote",[t("p",[a._v("注意：在我们访问对象成员时，键名"),t("strong",[a._v("有空格")]),a._v("时不能采用点访问，例如"),t("code",[a._v("data.ab c")])]),a._v(" "),t("p",[a._v("这样是"),t("strong",[a._v("错误的")]),a._v("。我们需要采用"),t("code",[a._v("data['ab c']")]),a._v("的形式来访问")])]),a._v(" "),t("h3",{attrs:{id:"_2-map-结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-map-结构"}},[a._v("#")]),a._v(" 2. Map 结构")]),a._v(" "),t("p",[t("code",[a._v("Map")]),a._v("类似于对象，但是键名不限于字符串，可以说"),t("code",[a._v("Object")]),a._v("结构提供"),t("code",[a._v("键-值")]),a._v("对应，"),t("code",[a._v("Map")]),a._v("结构提供"),t("code",[a._v("值-值")]),a._v("对应因此其实采用"),t("code",[a._v("map")]),a._v("结构会优于传统对象")]),a._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 1. 通过new Map来创建dataMap容器")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" dataMap "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Map")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 2. 获取节点对象，作为测试数据")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" element "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" document"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("querySelector")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('".node"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 3. 通过 set 方法给 dataMap 中指定键和对应的值")]),a._v("\ndataMap"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("set")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("element"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"objectData"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 4. 通过 get 来从 dataMap 中获取键名对应的值")]),a._v("\nconsole"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("dataMap"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("get")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("element"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 5. 揭开面目")]),a._v("\nconsole"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("dataMap"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br"),t("span",{staticClass:"line-number"},[a._v("7")]),t("br"),t("span",{staticClass:"line-number"},[a._v("8")]),t("br"),t("span",{staticClass:"line-number"},[a._v("9")]),t("br"),t("span",{staticClass:"line-number"},[a._v("10")]),t("br")])]),t("p",[a._v("从上面的代码中，我们可以清楚的看到，第 8 行代码获取值时直接传入了"),t("code",[a._v("element")]),a._v("对象，")]),a._v(" "),t("p",[a._v("可以成功的获取到对应的值，在最后打印"),t("code",[a._v("dataMap")]),a._v("时更是验证了上诉说法")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724164519441.png",alt:"image-20210724164519441"}})]),a._v(" "),t("p",[a._v("成功的将对象作为了键名，弥补了传统对象的不足")]),a._v(" "),t("h3",{attrs:{id:"_3-map-的特点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-map-的特点"}},[a._v("#")]),a._v(" 3. Map 的特点")]),a._v(" "),t("ol",[t("li",[t("p",[a._v("Map 默认情况下不包含任何键，所有键都是自己添加进去的。不同于 Object 原型链上有一些默认的键。")])]),a._v(" "),t("li",[t("p",[a._v("Map 的键可以是"),t("strong",[a._v("任意类型")]),a._v("数据，就连函数都可以。")])]),a._v(" "),t("li",[t("p",[a._v("Map 的键值对个数可以"),t("strong",[a._v("轻易")]),a._v("通过"),t("code",[a._v("size")]),a._v("属性获取，Object 需要手动计算。")])]),a._v(" "),t("li",[t("p",[a._v("Map 在频繁增删键值对的场景下"),t("strong",[a._v("性能")]),a._v("要比 Object 好。")])])]),a._v(" "),t("h3",{attrs:{id:"_4-什么时候用-map"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-什么时候用-map"}},[a._v("#")]),a._v(" 4. 什么时候用 Map")]),a._v(" "),t("ol",[t("li",[a._v("要添加的键值名和 Object 上的默认键值名冲突，又不想改名时，"),t("strong",[a._v("用 Map")])]),a._v(" "),t("li",[a._v("需要 String 和 Symbol 以外的数据类型做键值时，"),t("strong",[a._v("用 Map")])]),a._v(" "),t("li",[a._v("键值对很多，有需要计算数量时，"),t("strong",[a._v("用 Map")])]),a._v(" "),t("li",[a._v("需要频繁增删键值对时，"),t("strong",[a._v("用 Map")])])]),a._v(" "),t("h2",{attrs:{id:"二、map-实例属性和方法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#二、map-实例属性和方法"}},[a._v("#")]),a._v(" 二、Map 实例属性和方法")]),a._v(" "),t("p",[a._v("在上面我们已经接触到了"),t("code",[a._v("Map")]),a._v("的个别 API，接下来简单说说")]),a._v(" "),t("h3",{attrs:{id:"_1-set"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-set"}},[a._v("#")]),a._v(" 1. set")]),a._v(" "),t("p",[t("code",[a._v("set")]),a._v("方法设置键名"),t("code",[a._v("key")]),a._v("对应的键值为"),t("code",[a._v("value")]),a._v("，然后会返回整个"),t("code",[a._v("Map")]),a._v("结构，如果设置的"),t("code",[a._v("key")]),a._v("已经存在，则会更新"),t("code",[a._v("value")]),a._v("值，否则会新生成该键")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724170830046.png",alt:"image-20210724170830046"}})]),a._v(" "),t("p",[a._v("也可以采用链式写法设置多组数据")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724171054240.png",alt:"image-20210724171054240"}})]),a._v(" "),t("p",[a._v("成功输出如下：")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724171030502.png",alt:"image-20210724171030502"}})]),a._v(" "),t("h3",{attrs:{id:"_2-get"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-get"}},[a._v("#")]),a._v(" 2. get")]),a._v(" "),t("p",[a._v("通过"),t("code",[a._v("get")]),a._v("方法读取"),t("code",[a._v("key")]),a._v("对应的键值，如果传入的键值不存在，则会返回"),t("code",[a._v("undefined")])]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724170801123.png",alt:"image-20210724170801123"}})]),a._v(" "),t("p",[a._v("控制台成功输出"),t("code",[a._v("ljc")])]),a._v(" "),t("h3",{attrs:{id:"_3-has"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-has"}},[a._v("#")]),a._v(" 3. has")]),a._v(" "),t("p",[a._v("判断传入的键是否存在当前"),t("code",[a._v("Map")]),a._v("对象中，该方法返回一个布尔值")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724202711276.png",alt:"image-20210724202711276"}})]),a._v(" "),t("p",[a._v("在上面的代码中，存在"),t("code",[a._v("name")]),a._v("为"),t("code",[a._v("true")]),a._v("，不存在"),t("code",[a._v("sex")]),a._v("返回"),t("code",[a._v("false")])]),a._v(" "),t("h3",{attrs:{id:"_4-delete"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-delete"}},[a._v("#")]),a._v(" 4. delete")]),a._v(" "),t("p",[a._v("删除传入的键，返回"),t("code",[a._v("true")]),a._v("，如果删除失败，则返回"),t("code",[a._v("false")])]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724203222536.png",alt:"image-20210724203222536"}})]),a._v(" "),t("h3",{attrs:{id:"_5-clear"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-clear"}},[a._v("#")]),a._v(" 5. clear")]),a._v(" "),t("p",[a._v("清除所有成员，没有返回值")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724204013186.png",alt:"image-20210724204013186"}})]),a._v(" "),t("p",[t("code",[a._v("clear")]),a._v("前后结果对比，注意"),t("code",[a._v("clear")]),a._v("没有"),t("strong",[a._v("返回值")]),a._v("！")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724203849295.png",alt:"image-20210724203849295"}})]),a._v(" "),t("h2",{attrs:{id:"三、遍历方法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#三、遍历方法"}},[a._v("#")]),a._v(" 三、遍历方法")]),a._v(" "),t("p",[a._v("可以采用"),t("code",[a._v("for...of")]),a._v("循环和"),t("code",[a._v("forEach")]),a._v("两种方法。由于"),t("code",[a._v("Map")]),a._v("实例会维护键值对的插入顺序，因此可以根据插入顺序进行遍历")]),a._v(" "),t("p",[a._v("采用"),t("strong",[a._v("for...of")])]),a._v(" "),t("blockquote",[t("p",[t("code",[a._v("for...of")]),a._v("可以遍历有"),t("code",[a._v("iterator")]),a._v("接口的数据结构")])]),a._v(" "),t("ul",[t("li",[t("code",[a._v("keys()")]),a._v("：返回键名的遍历器")]),a._v(" "),t("li",[t("code",[a._v("values()")]),a._v("：返回键值的遍历器")]),a._v(" "),t("li",[t("code",[a._v("entries()")]),a._v("：返回键值对的遍历器")]),a._v(" "),t("li",[t("code",[a._v("forEach()")]),a._v("：使用回调函数遍历每个成员")])]),a._v(" "),t("h4",{attrs:{id:"map-entries"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#map-entries"}},[a._v("#")]),a._v(" map.entries()")]),a._v(" "),t("p",[a._v("在"),t("code",[a._v("Map")]),a._v("实例中"),t("strong",[a._v("有一个迭代器")]),a._v("，能以插入顺序生成"),t("code",[a._v("[key,value]")]),a._v("形式的数据。")]),a._v(" "),t("p",[a._v("我们可以通过"),t("code",[a._v("entries")]),a._v("方法来获得这个迭代器，从而利用"),t("code",[a._v("for...of")]),a._v("进行遍历操作")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724223527628.png",alt:"image-20210724223527628"}})]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210724223611443.png",alt:"image-20210724223611443"}})]),a._v(" "),t("p",[a._v("也可以采用如下进行遍历，每次"),t("code",[a._v("item")]),a._v("获取到一个数组")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725104827297.png",alt:"image-20210725104827297"}})]),a._v(" "),t("p",[a._v("又因为"),t("code",[a._v("entries")]),a._v("是"),t("strong",[a._v("默认")]),a._v("的迭代器，所以可以直接对"),t("code",[a._v("Map")]),a._v("实例使用扩展操作或者直接采用"),t("code",[a._v("map")])]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725104331505.png",alt:"image-20210725104331505"}})]),a._v(" "),t("p",[a._v("采用"),t("strong",[a._v("扩展")]),a._v("操作")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725104503000.png",alt:"image-20210725104503000"}})]),a._v(" "),t("h4",{attrs:{id:"map-values"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#map-values"}},[a._v("#")]),a._v(" map.values()")]),a._v(" "),t("p",[a._v("可以采用遍历"),t("code",[a._v("map.values()")]),a._v("的方式来遍历"),t("code",[a._v("map")]),a._v("容器的属性值")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725105131665.png",alt:"image-20210725105131665"}})]),a._v(" "),t("h4",{attrs:{id:"map-keys"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#map-keys"}},[a._v("#")]),a._v(" map.keys()")]),a._v(" "),t("p",[a._v("可以采用"),t("code",[a._v("map.keys()")]),a._v("来遍历键名")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725105326525.png",alt:"image-20210725105326525"}})]),a._v(" "),t("h4",{attrs:{id:"采用-foreach-回调遍历"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#采用-foreach-回调遍历"}},[a._v("#")]),a._v(" 采用 forEach() 回调遍历")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725110225814.png",alt:"image-20210725110225814"}})]),a._v(" "),t("p",[a._v("通过回调的方式遍历"),t("code",[a._v("map")])]),a._v(" "),t("h2",{attrs:{id:"四、map-类型转化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#四、map-类型转化"}},[a._v("#")]),a._v(" 四、Map 类型转化")]),a._v(" "),t("p",[a._v("几种与"),t("code",[a._v("map")]),a._v("相互类型转化的方法")]),a._v(" "),t("h4",{attrs:{id:"map-转为数组"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#map-转为数组"}},[a._v("#")]),a._v(" Map 转为数组")]),a._v(" "),t("p",[a._v("通过扩展运算符实现")]),a._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("let")]),a._v(" map "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Map")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("let")]),a._v(" arr "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("...")]),a._v("map"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br")])]),t("h4",{attrs:{id:"数组转为-map"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数组转为-map"}},[a._v("#")]),a._v(" 数组转为 Map")]),a._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("let")]),a._v(" map "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Map")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("arr"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br")])]),t("h4",{attrs:{id:"map-转为对象"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#map-转为对象"}},[a._v("#")]),a._v(" Map 转为对象")]),a._v(" "),t("p",[a._v("通过遍历利用"),t("code",[a._v("set")]),a._v("将键值对加入对象中")]),a._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("let")]),a._v(" obj "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("for")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("let")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("k"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" v"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("of")]),a._v(" map"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  obj"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("k"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" v"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br")])]),t("h4",{attrs:{id:"对象转为-map"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#对象转为-map"}},[a._v("#")]),a._v(" 对象转为 Map")]),a._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("for")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("let")]),a._v(" k "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("of")]),a._v(" Object"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("keys")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("obj"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  map"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("set")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("k"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" obj"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("k"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br")])]),t("h2",{attrs:{id:"五、什么是-weakmap"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#五、什么是-weakmap"}},[a._v("#")]),a._v(" 五、什么是 WeakMap ？")]),a._v(" "),t("p",[a._v("总所周知，"),t("code",[a._v("WeakMap")]),a._v("是 ES6 中新增的一种集合类型，叫做“弱映射”。它和"),t("code",[a._v("Map")]),a._v("是兄弟关系，与"),t("code",[a._v("Map")]),a._v("的区别就在于这个"),t("strong",[a._v("弱字")]),a._v("，API 还是"),t("code",[a._v("Map")]),a._v("的那套（只有"),t("code",[a._v("set")]),a._v(" "),t("code",[a._v("get")]),a._v(" "),t("code",[a._v("has")]),a._v(" "),t("code",[a._v("delete")]),a._v(")")]),a._v(" "),t("p",[a._v("那它真正是什么意思呢？")]),a._v(" "),t("blockquote",[t("p",[a._v("这其实描述的是 JS 中"),t("strong",[a._v("垃圾回收")]),a._v("程序对待“弱映射”中键的方式")])]),a._v(" "),t("p",[a._v("那为什么要有 WeakMap 呢？它解决了什么问题呢？这些问题后面都会讲到")]),a._v(" "),t("h2",{attrs:{id:"六、weakmap-的特性"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#六、weakmap-的特性"}},[a._v("#")]),a._v(" 六、WeakMap 的特性")]),a._v(" "),t("p",[a._v("我们先从 WeakMap 的特性讲起")]),a._v(" "),t("h3",{attrs:{id:"_1-weakmap-只能将对象作为键名"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-weakmap-只能将对象作为键名"}},[a._v("#")]),a._v(" 1. WeakMap 只能将对象作为键名")]),a._v(" "),t("ul",[t("li",[a._v("只接受对象作为键名（"),t("code",[a._v("null")]),a._v(" 除外），不接受其他类型的值作为键名")])]),a._v(" "),t("p",[t("strong",[a._v("null 除外")])]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725145126758.png",alt:"image-20210725145126758"}})]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725145141515.png",alt:"image-20210725145141515"}})]),a._v(" "),t("p",[t("strong",[a._v("正常添加")])]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725145321219.png",alt:"image-20210725145321219"}})]),a._v(" "),t("h3",{attrs:{id:"_2-weakmap-的键名引用的对象是弱引用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-weakmap-的键名引用的对象是弱引用"}},[a._v("#")]),a._v(" 2. WeakMap 的键名引用的对象是弱引用")]),a._v(" "),t("p",[a._v("这里懵了挺久的，但是这是"),t("code",[a._v("WeakMap")]),a._v("结构的关键所在")]),a._v(" "),t("p",[a._v("要想读懂这句话，不容易，我们需要先知道"),t("strong",[a._v("强引用和弱引用")])]),a._v(" "),t("h4",{attrs:{id:"_2-1-什么是强引用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-什么是强引用"}},[a._v("#")]),a._v(" 2.1 什么是强引用？")]),a._v(" "),t("p",[a._v("我们先来看看"),t("strong",[a._v("强引用")]),a._v("，这是阮一峰老师书上的例子")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725151557054.png",alt:"image-20210725151557054"}})]),a._v(" "),t("p",[a._v("在上面的代码中，"),t("code",[a._v("e1")]),a._v("和"),t("code",[a._v("e2")]),a._v("是两个对象，通过"),t("code",[a._v("arr")]),a._v("数组对这两个对象添加一些文字说明。但是这样就形成了"),t("code",[a._v("arr")]),a._v("对"),t("code",[a._v("e1")]),a._v("和"),t("code",[a._v("e2")]),a._v("的引用，而这种引用又是强引用。它的区别就体现在。当我们不再需要这两个对象时，我们必须手动的删除这个引用，解除"),t("code",[a._v("arr")]),a._v("都两个对象的引用关系，否则垃圾回收机制不会释放"),t("code",[a._v("e1")]),a._v("和"),t("code",[a._v("e2")]),a._v("占用的内存。因为，"),t("code",[a._v("arr")]),t("strong",[a._v("仍然存在着对对象的引用！")])]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725152942154.png",alt:"image-20210725152942154"}})]),a._v(" "),t("p",[t("strong",[a._v("麻烦的操作势必会造成问题，当忘记了手动删除引用，就会造成内存泄漏")])]),a._v(" "),t("h4",{attrs:{id:"_2-2-什么是弱引用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-什么是弱引用"}},[a._v("#")]),a._v(" 2.2 什么是弱引用？")]),a._v(" "),t("p",[a._v("对于"),t("strong",[a._v("弱引用")]),a._v("，百度百科给出的答案：")]),a._v(" "),t("blockquote",[t("p",[a._v("在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。")])]),a._v(" "),t("p",[a._v("也就是说"),t("strong",[a._v("如果")]),a._v("我们能这样创建一个弱引用的对象")]),a._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//假设")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("let")]),a._v(" obj "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("WeakObject")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br")])]),t("p",[a._v("我们就可以静静的等待垃圾车来把它拖走了，"),t("code",[a._v("obj")]),a._v("所引用的对象就会被回收")]),a._v(" "),t("p",[a._v("如果还没有理解的话，我们再来看看")]),a._v(" "),t("h4",{attrs:{id:"_2-3-弱引用和强引用图解"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-弱引用和强引用图解"}},[a._v("#")]),a._v(" 2.3 弱引用和强引用图解")]),a._v(" "),t("p",[a._v("从 1 套代码结合两张图来理解")]),a._v(" "),t("p",[a._v("对于强引用")]),a._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" myMap "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Map")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("let")]),a._v(" my "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[a._v("name")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"ljc"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[a._v("sex")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"男"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\nmyMap"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("set")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("my"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"info"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\nconsole"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("myMap"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br"),t("span",{staticClass:"line-number"},[a._v("7")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725161643051.png",alt:"image-20210725161643051"}})]),a._v(" "),t("p",[a._v("对于弱引用")]),a._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" myMap "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("WeakMap")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("let")]),a._v(" my "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[a._v("name")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"ljc"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[a._v("sex")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"男"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\nmyMap"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("set")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("my"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"info"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\nconsole"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("myMap"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br"),t("span",{staticClass:"line-number"},[a._v("7")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725161619701.png",alt:"image-20210725161619701"}})]),a._v(" "),t("p",[a._v("图一中的数据被"),t("code",[a._v("my")]),a._v("和"),t("code",[a._v("myMap")]),a._v("实例对象所引用，引用计数为 2，图 2 中建立了"),t("code",[a._v("myMap")]),a._v("对"),t("code",[a._v("my")]),a._v("所引用的对象的"),t("strong",[a._v("弱引用")]),a._v("，引用计数为 1")]),a._v(" "),t("p",[a._v("在上面我们谈到强引用数据被删除时，需要手动解除引用，而弱引用则可以等待垃圾回收机制自动清除")]),a._v(" "),t("p",[t("strong",[a._v("弱引用与垃圾回收")])]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725162356371.png",alt:"image-20210725162356371"}})]),a._v(" "),t("p",[a._v("当执行"),t("code",[a._v("my = null")]),a._v("时会解除"),t("code",[a._v("my")]),a._v("对原数据的引用，而"),t("code",[a._v("myMap")]),a._v("实例对象对"),t("code",[a._v("my")]),a._v("所引用对象是弱引用关系，该数据的"),t("strong",[a._v("引用计数为 0")]),a._v(" ，程序垃圾回收机制在执行时会将引用对象回收。而如果时强引用关系则"),t("strong",[a._v("引用计数为 1")]),a._v(" ，不会被垃圾回收机制清除。")]),a._v(" "),t("blockquote",[t("p",[a._v("总的来说， "),t("code",[a._v("WeakMap")]),a._v(" 保持了对键名所引用的对象的弱引用，即垃圾回收机制不将该引用考虑在内。只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，"),t("code",[a._v("WeakMap")]),a._v(" 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。")])]),a._v(" "),t("h3",{attrs:{id:"_3-不可遍历"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-不可遍历"}},[a._v("#")]),a._v(" 3. 不可遍历")]),a._v(" "),t("p",[a._v("正因为"),t("code",[a._v("WeakMap")]),a._v("对键名所引用的对象是弱引用关系，因此"),t("code",[a._v("WeakMap")]),a._v("内部成员是会"),t("strong",[a._v("却决于垃圾回收机制有没有执行")]),a._v("，运行前后成员个数很可能是不一样的，而垃圾回收机制的执行又是"),t("strong",[a._v("不可预测")]),a._v("的，因此不可遍历")]),a._v(" "),t("blockquote",[t("p",[a._v("了解了"),t("code",[a._v("WeakMap")]),a._v("的特性，相信对“为什么要有"),t("code",[a._v("WeakMap")]),a._v("？”已经有了一定的答案")])]),a._v(" "),t("h2",{attrs:{id:"七、map-和-weakmap-的区别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#七、map-和-weakmap-的区别"}},[a._v("#")]),a._v(" 七、Map 和 WeakMap 的区别")]),a._v(" "),t("blockquote",[t("p",[a._v("看到这里相信心中已经有答案了")])]),a._v(" "),t("ul",[t("li",[t("code",[a._v("Map")]),a._v(" 的键可以是任意类型，"),t("code",[a._v("WeakMap")]),a._v(" 只接受对象作为键（null 除外），不接受其他类型的值作为键")]),a._v(" "),t("li",[t("code",[a._v("Map")]),a._v(" 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键； "),t("code",[a._v("WeakMap")]),a._v(" 的键是弱引用，键所指向的对象可以被垃圾回收，此时键是无效的")]),a._v(" "),t("li",[t("code",[a._v("Map")]),a._v(" 可以被遍历， "),t("code",[a._v("WeakMap")]),a._v(" 不能被遍历")])]),a._v(" "),t("h2",{attrs:{id:"八、weakmap-的使用场景"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#八、weakmap-的使用场景"}},[a._v("#")]),a._v(" 八、WeakMap 的使用场景")]),a._v(" "),t("h3",{attrs:{id:"_1-dom-节点元数据"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-dom-节点元数据"}},[a._v("#")]),a._v(" 1. DOM 节点元数据")]),a._v(" "),t("blockquote",[t("p",[a._v("用红宝书的例子")])]),a._v(" "),t("p",[a._v("因为 weakMap 不会影响垃圾回收，所以可以用来关联元数据")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725171056590.png",alt:"image-20210725171056590"}})]),a._v(" "),t("p",[a._v("当上面代码执行后，登录按钮从 DOM 树中被删除了，但由于 Map 对节点对象是强引用关系，仍然保存着对按钮的引用，所以会引起内存泄漏")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725171352098.png",alt:"image-20210725171352098"}})]),a._v(" "),t("p",[a._v("因此可以采用"),t("code",[a._v("WeakMap")]),a._v("当节点删除后，引用计数为 0，等待垃圾回收机制回收")]),a._v(" "),t("h3",{attrs:{id:"_2-部署私有属性"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-部署私有属性"}},[a._v("#")]),a._v(" 2. 部署私有属性")]),a._v(" "),t("p",[a._v("利用弱映射，将内部属性设置为实例的弱引用对象，当实例删除时，私有属性也会随之消失，因此不会内存泄漏")]),a._v(" "),t("p",[a._v("阮一峰老师的代码实例")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725172559971.png",alt:"image-20210725172559971"}})]),a._v(" "),t("h3",{attrs:{id:"_3-数据缓存"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-数据缓存"}},[a._v("#")]),a._v(" 3. 数据缓存")]),a._v(" "),t("p",[a._v("当我们需要在不修改原有对象的情况下储存某些属性等，而又不想管理这些数据时，可以使用"),t("code",[a._v("WeakMap")])]),a._v(" "),t("p",[t("img",{attrs:{src:"https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210725173257029.png",alt:"image-20210725173257029"}})]),a._v(" "),t("hr"),a._v(" "),t("blockquote",[t("p",[a._v("非常感谢您的阅读，欢迎提出你的意见，有什么问题欢迎指出，谢谢！🎈")])])])}),[],!1,null,null,null);s.default=n.exports}}]);