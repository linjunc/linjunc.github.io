import{_ as l,c as i,o as a,V as e}from"./chunks/framework.3d11d069.js";const P=JSON.parse('{"title":"高频面试题","description":"","frontmatter":{},"headers":[],"relativePath":"pages/interview/internet/hight.md","filePath":"pages/interview/internet/hight.md","lastUpdated":1691330952000}'),t={name:"pages/interview/internet/hight.md"},r=e('<h1 id="高频面试题" tabindex="-1">高频面试题 <a class="header-anchor" href="#高频面试题" aria-label="Permalink to &quot;高频面试题&quot;">​</a></h1><h3 id="用户输入-url-到页面渲染的全过程" tabindex="-1">用户输入 url 到页面渲染的全过程 <a class="header-anchor" href="#用户输入-url-到页面渲染的全过程" aria-label="Permalink to &quot;用户输入 url 到页面渲染的全过程&quot;">​</a></h3><div class="tip custom-block"><p class="custom-block-title">TIP</p><ol><li>首先浏览器会对输入的内容进行预估，就是对历史访问过的网站进行匹配</li><li>当用户输入 URL 时，浏览器进程会去解析，并把网络请求传给网络进程，网络进程收到请求任务后，会发起请求。在此之前，浏览器仍会保留当前页面的展示，直到收到请求响应并渲染后，才会更新页面</li><li>（重要）网络进程在收到请求任务后，并不会立即去发送请求，而是先检查本地是否有缓存，如果有本地缓存未过期，会走本地缓存，就是强缓存。 <ul><li>否则会进行 DNS 解析获取 IP 地址，建立 TCP 链接，进行服务端协商缓存</li></ul></li><li>在 TCP 连接前，需要确认对方的身份以及位置，也就是确认 IP 地址。通过 DNS 解析获取 IP 地址，IP 地址可以被缓存，优先走缓存 <ul><li>DNS 解析会优先查看本地的 host 文件是否有映射关系表，没有的话会走本地 DNS 服务器查找，然后到顶级域名服务器找，总之最终会找到 IP 地址</li><li>CDN 就不用去目标服务器找，而去最近的服务器获取，资源更新的话 CDN 再向目标服务器更新</li></ul></li><li>找到 IP 后，会进行 TCP 三次握手。</li><li>浏览器发送HTTP 请求报文</li><li>服务器处理请求，返回 HTTP 响应</li><li>服务端处理完请求后，结果会通过网络发回客户端的浏览器。浏览器会对服务端响应解析，状态码、请求头、请求体等。</li><li>浏览器进程向渲染进程发送提交文档的信息，渲染进程收到提交文档的消息后，会和网络进程建立 IPC 通信。渲染进程会返回确认提交给浏览器进程，浏览器进程在收到确认提交的消息后，会更新浏览器界面状态，包括安全状态、地址栏的 URL、前进后退的历史状态，并渲染HTML然后更新。 <ul><li>这同时也解释了为什么在浏览器的地址栏里面输入了一个地址后，如果加载速度比较慢，之前的页面不会立马消失，而是需要等待加载一会才能把页面内容更新。</li></ul></li><li>接下来到了渲染进程的工作，渲染进程首先会对获取到的 HTML 字节流文件进行解析，这里会通过 HTML Parser 模块，通过分词器，将字节流分为 token，这一步的目的是把标签区分开。再对 token 进行组装，构建 DOM 树。</li><li>在构建完 DOM 树后，还需要 CSS ，在拿到 CSS样式表首先会进行一次标准化，将属性值统一，这里面同时也会对百分比、继承、calc 等进行转化，生成 renderObject。但这些 CSS 还需要转成 StyleSheets</li><li>在 CSSOM 和 DOM 树构建完成后，会对 DOM 树中不可见节点进行剔除，比如 head，然后会对 <code>display: none</code> 这些节点筛除，不出现在 layout tree 中，因为这些节点不会影响到布局。接下来会对节点进行布局，计算节点的坐标位置、大小</li><li>接下来会对布局树进行分层，生成 Layer Tree</li><li>在拿到 Layer Tree 后，会对每个图层进行绘制，会把图层的绘制拆分成很多的绘制指令，形成一个绘制指令列表，记录需要执行的绘制操作，然后 commit 到合成线程中</li><li>在合成线程中会将图层进行分块，形成图块，按照视口来优先生成位图</li><li>在 raster 完成后，合成线程会生成绘制图块命令 draw quad ，并生成 draw quads 给浏览器进程，viz 组件会调用 GL 指令把 draw quads 最终输出到屏幕上</li></ol><p>在最后 commit raster 数据的时候，会有缓冲机制，通过 pending Tree</p><p>Compositor thread 有三棵 cc::LayerImpl 树：</p><ul><li>Pending tree: 负责接收 commit，然后将 LayerImpl 进行 Raster</li><li>Active tree: 会从这里取出栅格化好的 LayerImpl 进行 Draw 操作</li><li>Recycle tree：为避免频繁创建 LayerImpl 对象，Pending tree 后续不会被销毁，而是退化成 Recycle tree。</li></ul></div><h3 id="浏览器从输入-url-到页面加载这之间发生了什么" tabindex="-1">浏览器从输入 url 到页面加载这之间发生了什么? <a class="header-anchor" href="#浏览器从输入-url-到页面加载这之间发生了什么" aria-label="Permalink to &quot;浏览器从输入 url 到页面加载这之间发生了什么?&quot;">​</a></h3><p>从输入 URL 到页面加载完成，浏览器经历了一系列的过程。以下是这个过程的简要概述：</p><ol><li>URL 解析：浏览器首先解析输入的 URL，包括协议（如 HTTP、HTTPS）、域名、端口号（如果有）、路径和查询参数等。</li><li>DNS 查询：浏览器通过 DNS（域名系统）查询 URL 中的域名对应的 IP 地址。如果浏览器或操作系统的 DNS 缓存中已经有该域名的 IP 地址，将直接使用缓存中的地址。</li><li>建立连接：浏览器与目标服务器建立 TCP 连接。如果使用的是 HTTPS 协议，还需要进行 SSL/TLS 握手，以建立安全连接。</li><li>发送 HTTP 请求：浏览器向服务器发送 HTTP 请求，包括请求方法（如 GET、POST）、请求路径、查询参数、协议版本以及请求头等信息。</li><li>接收响应：服务器处理请求后，向浏览器发送 HTTP 响应，包括响应状态码（如 200、404）、协议版本、响应头以及响应体（通常是 HTML 文档）。</li><li>解析 HTML：浏览器接收到响应后，开始解析 HTML 文档，构建 DOM（Document Object Model）树。</li><li>资源请求：在解析 HTML 的过程中，浏览器会遇到外部资源（如 CSS、JavaScript、图片等），此时浏览器会发送额外的 HTTP 请求来获取这些资源。</li><li>CSS 解析：浏览器解析 CSS 文件，构建 CSSOM（CSS Object Model）树。</li><li>渲染树构建：浏览器将 DOM 树和 CSSOM 树合并为渲染树（Render Tree），其中包含了页面中所有可见元素的样式和位置信息。</li><li>布局：浏览器根据渲染树计算每个元素的准确位置和大小，这个过程也叫做回流（Reflow）。</li><li>绘制：浏览器将渲染树中的每个元素绘制到屏幕上，这个过程也叫做重绘（Repaint）。</li><li>加载完成：当所有资源加载完成并渲染到屏幕上，浏览器会触发页面的 load 事件。</li></ol><p>请注意，这个过程可能因浏览器、服务器和网络条件的不同而有所差异。而且，在实际应用中，很多步骤会并行执行，以提高性能。例如，浏览器在解析 HTML 的同时，可能已经开始请求外部资源。</p><h3 id="dns-查询的详细过程" tabindex="-1">DNS 查询的详细过程 <a class="header-anchor" href="#dns-查询的详细过程" aria-label="Permalink to &quot;DNS 查询的详细过程&quot;">​</a></h3><p>DNS（域名系统）查询是将域名解析为对应 IP 地址的过程。当您在浏览器中输入一个 URL 时，浏览器需要知道该 URL 对应的服务器的 IP 地址，以便建立连接并获取资源。以下是 DNS 查询的详细过程：</p><ol><li>检查本地缓存：浏览器首先检查其本地 DNS 缓存，看是否已经有该域名对应的 IP 地址。如果有，查询过程结束，浏览器直接使用缓存中的 IP 地址。本地 DNS 缓存是有时效性的，过期后将自动清除。</li><li>检查操作系统缓存：如果浏览器缓存中没有找到对应的 IP 地址，接下来会检查操作系统的 DNS 缓存。操作系统同样维护了一个 DNS 缓存，如果找到了对应的 IP 地址，查询过程结束。</li><li>请求本地 DNS 服务器：如果操作系统缓存中也没有找到对应的 IP 地址，浏览器会向本地 DNS 服务器发送查询请求。本地 DNS 服务器通常由您的网络服务提供商（ISP）或组织网络管理员提供。</li><li>迭代查询：如果本地 DNS 服务器没有缓存该域名的 IP 地址，它会执行迭代查询。迭代查询的过程如下：</li></ol><ul><li>本地 DNS 服务器首先向根 DNS 服务器发送查询请求。根 DNS 服务器负责管理顶级域（如 .com、.org 等）的 DNS 信息。</li><li>根 DNS 服务器返回一个负责该顶级域的权威 DNS 服务器的 IP 地址。</li><li>本地 DNS 服务器接着向权威 DNS 服务器发送查询请求。</li><li>权威 DNS 服务器返回负责该域名的权威 DNS 服务器的 IP 地址（如果域名对应的是一个子域名，这个过程可能需要多次迭代）。</li><li>本地 DNS 服务器最后向负责该域名的权威 DNS 服务器发送查询请求。</li></ul><ol start="5"><li>权威 DNS 服务器响应：负责该域名的权威 DNS 服务器收到查询请求后，返回域名对应的 IP 地址。</li><li>缓存并返回结果：本地 DNS 服务器收到 IP 地址后，会将其缓存一段时间，然后将结果返回给浏览器。浏览器同样会将 IP 地址缓存在本地，以备后续使用。</li><li>建立连接：浏览器获得域名对应的 IP 地址后，开始与目标服务器建立连接，进行后续的请求和响应过程。</li></ol><p>请注意，这个过程可能因网络环境、DNS 服务器配置和域名解析策略的不同而有所差异。在实际应用中，为了提高 DNS 查询性能，通常会使用一些优化手段，如负载均衡、多层缓存和 Anycast 网络等。</p><h3 id="script-会阻塞-html-嘛-css-呢" tabindex="-1">script 会阻塞 html 嘛 css 呢 <a class="header-anchor" href="#script-会阻塞-html-嘛-css-呢" aria-label="Permalink to &quot;script 会阻塞 html 嘛 css 呢&quot;">​</a></h3><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>script 的加载如果没有 defer 或者 async 的话，会在同步解析，遇到 script 标签会暂停解析，先下载 script 再执行，执行完再继续解析</p><p>如果有 defer 的话，遇到 script 会下载，但会等待 html 解析完，loaded 事件触发前执行</p><p>如果是 async 的话，遇到 script 会下载，但不会停止解析，等待 script 下载完立刻执行</p></div><p>DOM 解析和 CSS 解析是并行的，因此 CSS 加载不会阻塞 DOM 树的解析，但是 CSS 加载会阻塞 DOM 树的渲染</p><ul><li>css 加载不会阻塞DOM树的解析</li><li>css 加载会阻塞DOM树的渲染</li><li>css 加载会阻塞后面js语句的执行</li></ul><h3 id="async-和-defer-怎么用-区别" tabindex="-1">async 和 defer 怎么用 区别 <a class="header-anchor" href="#async-和-defer-怎么用-区别" aria-label="Permalink to &quot;async 和 defer 怎么用 区别&quot;">​</a></h3><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>在实践中，defer 用于需要整个 DOM 或其相对执行顺序很重要的 scripts。而 async 则用于独立的 scripts，如计数器或广告，而它们的相对执行顺序并不重要。</p><p>async 下载完立刻执行，因此和下载速度有关</p><p>defer 下载完等待 HTML 解析完成后，按顺序执行</p></div><h3 id="浏览器缓存机制" tabindex="-1">浏览器缓存机制？ <a class="header-anchor" href="#浏览器缓存机制" aria-label="Permalink to &quot;浏览器缓存机制？&quot;">​</a></h3><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>强缓存和协商缓存，在浏览器发起 HTTP 请求前，先会检查 Expires，和 <code>Cache-Control</code> 是否过期，如果强缓存有效，则不会发起请求，直接返回静态资源。</p><p>否则进入协商缓存，请求资源时，把用户本地该资源的 etag 同时带到服务端，服务端和最新资源做对比。 如果资源没更改，返回304，浏览器读取本地缓存。 如果资源有更改，返回200，返回最新的资源。</p></div><h3 id="重排、重绘-怎么减少重排重绘的开销" tabindex="-1">重排、重绘？怎么减少重排重绘的开销？ <a class="header-anchor" href="#重排、重绘-怎么减少重排重绘的开销" aria-label="Permalink to &quot;重排、重绘？怎么减少重排重绘的开销？&quot;">​</a></h3><ul><li>重排是指当前页面中的元素布局、尺寸、位置发生变化，浏览器需要重新计算当前元素的布局信息。</li><li>重绘，当页面中元素视觉变化时，如颜色、背景等，不影响布局时，浏览器需要重新绘制这些元素。</li></ul><p>减少重排重绘的开销的方法有很多</p><ol><li>避免逐个样式的变更，将多个样式更改合并到一个 CSS 类中，然后一次性添加一个类，这样只会触发一次重排重绘</li><li>避免使用 table 布局，table 绘导致整个表格重排</li><li>使用 transfrom、filter 这些属性来进行动画，因为这些属性的变化不会触发重排，只会重绘，而且会在合成线程执行，GPU 优化渲染</li><li>对于频繁变化的元素，可以脱离文档流，不会影响到其他元素</li><li>有些 DOM 访问操作会导致浏览器进行重排，如果需要多次访问这些属性，可以设置缓存，然后再使用</li><li>对于大量 DOM 操作场景，可以使用 文档碎片 document fragment 或者离线 dom进行操作，避免触发多次重排重绘</li><li>不可见元素可以设置 display 为 none，避免触发重排重绘</li></ol><h3 id="http-和-https-区别" tabindex="-1">http 和 https 区别 <a class="header-anchor" href="#http-和-https-区别" aria-label="Permalink to &quot;http 和 https 区别&quot;">​</a></h3><p>HTTPS 相对于 HTTP 提高了更高的安全性，HTTP 基于 3次握手就可以进行通信，HTTPS 在 HTTP 的基础上还需要进行 TLS 四次握手，对服务端身份进行确认，确保服务器可信</p><p>HTTPS 使用 TLS 对传输数据进行加密，确保数据在传输过程中的安全性，即使数据被拦截也无法轻易破解。同时 HTTPS 可以确保数据在传输过程中未被篡改，通过对数据进行数字签名，可以检测数据是否被篡改</p><p>HTTPS 的端口号是 443，HTTP 是 80</p><h3 id="对称加密和非对称加密" tabindex="-1">对称加密和非对称加密 <a class="header-anchor" href="#对称加密和非对称加密" aria-label="Permalink to &quot;对称加密和非对称加密&quot;">​</a></h3><p>对称加密是指加密和解密用的相同密钥的加密算法，发送方和接收方需要共享一个密钥，用于加解密，例如 HTTPS 的 ECDHE 算法，就采用的对称加密，采用非对称加密的方式生成共享密钥。</p><p>非对称加密是指在加密和解密过程中用的不同的密钥。每个用户都有一对密钥，一个公钥一个私钥。</p><p>非对称加密的优点是密钥管理简单，安全性高，比如 RSA 就是非对称加密，生成 3 个随机数。</p><p>在实际应用中，通常会将对称加密和非对称加密结合使用。例如，使用非对称加密算法安全地传输对称加密算法的密钥，然后使用对称加密算法加密和解密数据。这样既保证了数据传输的安全性，又提高了加密和解密的效率。</p><h3 id="tcp、udp-以及应用场景" tabindex="-1">TCP、UDP 以及应用场景 <a class="header-anchor" href="#tcp、udp-以及应用场景" aria-label="Permalink to &quot;TCP、UDP 以及应用场景&quot;">​</a></h3><p>TCP 和 UDP 的是传输层协议 它们有一定的区别</p><p>TCP 是面向连接的可靠的数据传输协议，在数据传输前，需要通过 3 次握手来简历连接，然后通过序号、确认应答、滑动窗口，超时重传、流量控制、拥塞控制等手段来保证数据的可靠传输</p><p>而对于 UDP 而言它是无连接的，不可靠的传输协议，它不需要建立连接即可以进行数据传输，传输速度较快。在 HTTP 3 中就采用了 UDP 来做传输层协议。</p><p>采用 QUIC 结合了 TCP 的可靠性和高效性，来保证 UDP 的安全性，自己实现了一套基于帧和流的二进制传输方式，以及多路复用，同时也有超时重传等能力，保障基于 UDP 实现的不可靠问题，让 UDP 变得可靠。</p><p>对于应用场景而言，TCP 因为它的可靠性以及数据的完整性，决定了它的使用场景，网页内容、文件传输、邮件、远程登录</p><p>而 UDP 则因为它的速度快和实时性，让它在视频会议、实时通话、在线游戏等场景更受青睐</p><h3 id="说说闭包会出现什么问题-内存泄漏怎么解决-闭包有什么好处" tabindex="-1">说说闭包会出现什么问题，内存泄漏怎么解决，闭包有什么好处？ <a class="header-anchor" href="#说说闭包会出现什么问题-内存泄漏怎么解决-闭包有什么好处" aria-label="Permalink to &quot;说说闭包会出现什么问题，内存泄漏怎么解决，闭包有什么好处？&quot;">​</a></h3><p>闭包其实是 JS 里的一个很强大的特性，可能会出现内存泄漏的问题，解决内存泄漏的问题最好的方法就是及时释放内存，当闭包不需要时，就清理引用，或者对于一些场景，采用 WeakMap 建立弱引用关系，不影响垃圾回收，同时现代化浏览器的 JS 引擎其实有很好的垃圾回收机制可以用来处理闭包和内存泄漏。</p><p>闭包的好处有很多，</p><ul><li>比如说在数据封装时，可以创建私有变量，这些变量对外部函数时不可见的，只能在函数内部访问。</li><li>闭包允许在多次调用之间保存函数的状态，可以实现缓存，记忆化能力等</li></ul><h3 id="如何避免由于-js-加载-导致首屏字体抖动的问题" tabindex="-1">如何避免由于 JS 加载，导致首屏字体抖动的问题 <a class="header-anchor" href="#如何避免由于-js-加载-导致首屏字体抖动的问题" aria-label="Permalink to &quot;如何避免由于 JS 加载，导致首屏字体抖动的问题&quot;">​</a></h3><ul><li>可以用内联 CSS</li><li>CSS 预加载，用 preload</li><li>少用 JS 来改样式，或者用 async 或 defer 来调整时机</li><li>用 font-display swap 采用备用字体</li><li>使用骨架屏</li></ul><h3 id="relative-是相对于谁定位的" tabindex="-1">Relative 是相对于谁定位的？ <a class="header-anchor" href="#relative-是相对于谁定位的" aria-label="Permalink to &quot;Relative 是相对于谁定位的？&quot;">​</a></h3><p>Relative 是不脱离文档流的，会相对自己进行定位，而 Absolute、Fixed 会脱离文档，相对 html 或者最近的内容块定位，粘性定位也不会脱离文档流，而是相对于视口进行定位</p><h3 id="进程的线程的关系" tabindex="-1">进程的线程的关系？ <a class="header-anchor" href="#进程的线程的关系" aria-label="Permalink to &quot;进程的线程的关系？&quot;">​</a></h3><h3 id="首屏加载的优化方式" tabindex="-1">首屏加载的优化方式 <a class="header-anchor" href="#首屏加载的优化方式" aria-label="Permalink to &quot;首屏加载的优化方式&quot;">​</a></h3><h3 id="vite-是如何进行语法检查的" tabindex="-1">Vite 是如何进行语法检查的？ <a class="header-anchor" href="#vite-是如何进行语法检查的" aria-label="Permalink to &quot;Vite 是如何进行语法检查的？&quot;">​</a></h3><p>首先 Vite 本身没有语法检查的功能，语法检查是一些插件实现的，比如 ESlint、Prettier、Babel 等，这些 Source To Source 的工具库进行转译生成符合规范的代码</p><p>他们的实现原理都是基于 AST 实现的，首先会将源码字符串解析成 AST，解析器会读取源码，然后根据 JS 规范创建 AST 节点，然后遍历 AST，访问每个节点，根据 ESLint 配置的规则来检查 AST 节点类型，遍历到相应类型的节点时，规则会检查该节点是否符合预定义的条件。如果不符合条件，ESLint 会报告一个错误或警告，收集所有规则检查的结果，并生成一个报告。报告可以输出到控制台。</p><p>同时有些插件有自动修复的功能，也是在 AST 遍历的时候进行处理的</p><h3 id="vite-打包与-webpack-打包的原理区别" tabindex="-1">vite 打包与 webpack 打包的原理区别 <a class="header-anchor" href="#vite-打包与-webpack-打包的原理区别" aria-label="Permalink to &quot;vite 打包与 webpack 打包的原理区别&quot;">​</a></h3><p>Webpack 打包原理：</p><ul><li>Webpack 从入口文件开始，分析模块依赖关系，构建一个依赖图。</li><li>将所有模块和资源通过 Loader 和 Plugin 进行处理，转换成浏览器可识别的代码。</li><li>将处理后的代码进行优化，如代码拆分、压缩等。</li><li>输出最终的打包文件。</li></ul><p>Vite 打包原理：</p><ul><li>Vite 在开发模式下，利用原生的 ES modules 实现按需加载，避免了 Webpack 需要打包整个项目的过程，从而实现快速启动和热更新。</li><li>Vite 使用 Rollup 进行生产环境的打包，Rollup 也是从入口文件开始，分析模块依赖关系，构建依赖图，最终输出一个或多个打包文件。</li><li>Vite 通过插件系统提供了丰富的扩展，可以处理各种资源文件，如 CSS、图片、字体等。</li></ul><h3 id="盒子模型" tabindex="-1">盒子模型 <a class="header-anchor" href="#盒子模型" aria-label="Permalink to &quot;盒子模型&quot;">​</a></h3><blockquote><p>什么是怪异盒子模型，如果盒子内部元素设置了margin属性，怎么让盒子不出现滚动条</p></blockquote><p>盒子模型是 CSS 用于描述元素如何布局和渲染的，包括几个部分，内容区、内边距、外边距、边框</p><p>怪异盒模型 border-box，是指早期浏览器的，和标准盒模型计算方式不同，可以用 box-sizing 来控制</p><p>content box 只包含内容区域，border-box 包含内容、内边距、边框</p><p>overflow hidden 可以不显示滚动条，也可以反向设置 margin 来避免滚动条</p><h3 id="margin-百分比相对于谁" tabindex="-1">Margin 百分比相对于谁 <a class="header-anchor" href="#margin-百分比相对于谁" aria-label="Permalink to &quot;Margin 百分比相对于谁&quot;">​</a></h3><p>在 CSS 中，百分比值的 margin-top 是相对于其包含块（即父元素）的宽度来计算的，而不是相对于父元素的高度。这是因为在 CSS 中，垂直水平方向的百分比外边距（margin）和内边距（padding）都是相对于包含块宽度来计算的。</p><p>在这个例子中，父元素的宽度为 100px，子元素的 margin-top 设置为 20%。那么子元素的实际 margin-top 值为 20 px</p><p>所以子元素的 margin-top 为 20px，相对于父元素的宽度计算。</p><h3 id="chrome-浏览器最低只能显示-12px-的字体大小-怎么在不改变整体字体大小的情况下-让单独某个区域的字体显示为-10px-的效果" tabindex="-1">Chrome 浏览器最低只能显示 12px 的字体大小，怎么在不改变整体字体大小的情况下，让单独某个区域的字体显示为 10px 的效果 <a class="header-anchor" href="#chrome-浏览器最低只能显示-12px-的字体大小-怎么在不改变整体字体大小的情况下-让单独某个区域的字体显示为-10px-的效果" aria-label="Permalink to &quot;Chrome 浏览器最低只能显示 12px 的字体大小，怎么在不改变整体字体大小的情况下，让单独某个区域的字体显示为 10px 的效果&quot;">​</a></h3><p>可以使用 transform 来进行缩放，缩放 83.33%</p>',72),o=[r];function p(s,c,n,h,d,S){return a(),i("div",null,o)}const T=l(t,[["render",p]]);export{P as __pageData,T as default};
