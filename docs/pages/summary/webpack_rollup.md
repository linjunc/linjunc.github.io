# Webpack 和 Rollup：您应该知道的一些事情
>
> 本文只做 Webpack 和 Rollup 的对比总结，不参入 esbuild、Vite 或其他工具的讨论

Webpack 和 Rollup 都是现在前端领域比较流行的打包工具，它们的相似之处在于可以帮助我们**把多个 JavaScript 文件打包成一个可以在浏览器中加载并在生产中使用的文件。**

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/112ee7e606924ee89feaf65c48554e70~tplv-k3u1fbpfcp-watermark.image?)

打包成单个文件的好处是可以减少网络请求、提高网站性能等目的。

这篇文章主要想通过对比的方式讲讲这两种打包工具的差异

## 两者存在的直观上的差异
>
> 一些晦涩的文字

**TL;DR**

- 两者的应用场景不同
  - webpack 的代码拆分能力，以及在复杂应用的打包能力，让它更被应用系统所青睐。
  - rollup 得益于 ES2015 Module 的优势，在 Tree Shaking 上有着天然的优势，更受 JS 库的青睐

- 产物大小不同
  - 得益于 Tree-Shaking Rollup 打包体积更小，运行速度更快

- 生态问题
  - Webpack 生态庞大

- 配置方式不同
  - HMR、dev-Server

### 应用场景不同

对于应用场景而言，Webpack 通常用于复杂应用的打包，这种应用大多是由多个单独的模块组成的，并且使用了**多种资源**（例如图片、样式表等）。Webpack 适合这种复杂应用的打包，因为它能够处理 JavaScript 资源以外的任何文件，同时还支持各种插件，例如代码压缩、代码分离、热更新等等。

另一方面，Rollup 更适合用于库的打包，尤其是那些专注于 ES6 模块的库。这是因为 Rollup 的目标是产生**尽可能小和尽可能快**的代码，而且它能够分析所有的 ES6 模块，删除不需要的代码，并将计算合并在一起，从而产生出更小更快的代码，这样的输出可以在所有的现代浏览器中逐字解析。

使用 Rollup 的开源项目：

- react
- vue
- vuex
- vue-router

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31c0542d44dc4d90b4833d02100fa982~tplv-k3u1fbpfcp-watermark.image?)

使用webpack的项目：

- elemnt-ui
- mint-ui
- vue scaffold

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b882ba8f26ef4224b53af49dc0f1f821~tplv-k3u1fbpfcp-watermark.image?)
可以看出 Webpack 更偏向前端工程，Rollup 更偏向于 JavaScript 库

### 打包方式不同

对于打包方式而言，Webpack 的打包方式是将所有的文件打包在一起，以形成一个或多个文件，**这些文件包含了所有的 JavaScript、样式表、图像和字体等等**。同时还需要处理比较复杂的代码和依赖关系，还需要进行一系列的优化和处理，比如加载和解析模块，分离出共享代码等，所以 Webpack 会相对慢一些。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f16554dd09a4087a1c31edb2d3a6faf~tplv-k3u1fbpfcp-watermark.image?)
Rollup 默认是只生成一个文件，会从入口文件开始**遍历整个依赖图**，并只将项目的所需部分包含在生成的 JavaScript 文件中。这种方式通常有效地清除了生成文件不需要的部分并生成更小，更快的输出。

>关键在于只关注 ES6 模块处理，并且能够更好地利用 Tree Shaking 等技术消除不必要的代码。

### 访问速度不同

在访问速度方面，因为 **Webpack 打包后的文件较大**，所以它需要花费更长的时间下载。此外，由于其中包含运行时环境，因此它需要时间来解析代码。

Rollup 的**输出文件更小**，所以它需要更少的时间去下载，同时它不包含任何多余的代码，因此它可以更快地加载和运行。

下图是 Rollup 和 Webpack 打出的 bundle，可以看到 Rollup 非常的简洁

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/654631f1f1f345789b4ec736d83f04a4~tplv-k3u1fbpfcp-watermark.image?)

### 生态和扩展性不同

对于生态和扩展性而言，Webpack 的扩展性非常强大，它有着众多的插件和 Loader 可以使用，因此我们可以为我们的应用添加各种功能和特性，而不用自己去实现一个

例如我们用 CSS loader 和 style loader 来处理 CSS 代码，用 Babel loader 来处理最新的 JavaScript 代码等等

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10eb9286869f40d0b36871212d27c920~tplv-k3u1fbpfcp-watermark.image?)

相较而言 Rollup 的扩展性就比较弱，它不能很好的处理 JavaScript 之外的其他资源，但是我们可以使用一些 Rollup 的插件来帮助我们处理其他类型的文件，来实现更加丰富的功能

### Q & A

在前面我们不断的提到了 Rollup 是 ESModule 的产物，那么**为什么 ESModule 会比 CommonJS 快呢？**

ESModule 和 CommonJS 都是模块化的标准化方案，但它们在加载模块时的实现方式不同。

CommonJS require 是**同步加载模块**，也就是说，一个模块在被引入后，引入模块的代码会等待模块加载完成才继续往下执行。

>CommonJS 模块是 ESModule 提出前的一种暂时性解决方案，未来发展缓慢。

而 ESModule import 是**异步加载模块**，它允许浏览器在解析 JavaScript 代码时，将模块的加载放到后台去，让执行线程不被阻塞。这种并行加载的方法能够提高 JavaScript 代码的执行效率。

ESModule 可以在**编译时进行静态优化**，还支持 Tree shaking，可以在代码打包时删除未使用的代码，从而减少打包后代码的体积和加载时间，这也是 ESModule 比 CommonJS 更快的原因之一。同时还提供了一些高级特性，比如循环引用和实时绑定

**最关键的两个原因就是 TreeShaking 和 异步加载**

同时 ESModule 的兼容性更佳，在未来将变得更加重要。

## 总结

Webpack 和 Rollup 主要存在以下几个方面的不同

- 打包配置不同
- 不同文件类型的转换不同，webpack 用 loader，Rollup 用 plugins
- dev-server 不同，HMR 不同（Rollup 没有）
- Tree-Shaking 实现不同
- 应用场景不同
- 打包方式不同，
- 访问速度
- 生态和扩展性

在不同场景下，Webpack 和 Rollup 都能发挥自身优势作用。

Webpack对于**代码分割和静态资源导入**有着“先天优势”，并且支持 HMR，而 Rollup 并不支持，所以当项目需要用到以上，则可以考虑选择 Webpack。

但是，Rollup 对于 Tree-shaking 和 ES6 模块有着算法优势上的支持，若你项目只需要打包出一个简单的bundle包，可以考虑使用 Rollup，会有以下三点的收益。

- **第一点是构建速度明显快于 webpack**

- **第二点是其生成的代码量很小**

- **第三点是其配置方式其实非常简单。**

其实 Webpack **也支持 Tree-shaking，并且也能够通过 Babel-loader 来打包 ES6 代码**，Rollup已经在渐渐地失去了当初的优势了。

但是 Rollup 仍然依靠简单的 API 和使用方式被许多库开发者青睐，如 React、Vue 等，都是使用 Rollup 作为构建工具的。

而在中大型 Web 应用开发下，Webpack 会更受青睐，并且会更合适一些。

end.

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32fffae511c944d692215737814add9c~tplv-k3u1fbpfcp-watermark.image?)
