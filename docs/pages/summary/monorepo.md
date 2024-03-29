# 为什么越来越多的项目选择 Monorepo？

## 什么是 Monorepo？

一个 Monorepo 是一个单一的存储库，包含**多个不同的项目**，和**明确的关系**。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba8dbd7b42ff4f57b41e51c1716df5fd~tplv-k3u1fbpfcp-watermark.image?)

和 Monorepo 对立的是传统的 Polyrepo 模式，每个项目对应一个单独的仓库来分散管理

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45503aa18d984cbfab42ebf7430c646e~tplv-k3u1fbpfcp-watermark.image?)

现代的前端工程越来越多的都会选择 Monorepo 的方式进行开发，比如 Vue、React 等知名开源项目都采用的 Monorepo 的方式进行管理。

Monorepo 的组织方式如下

```diff
├── packages
|   ├── pkg1
|   |   ├── package.json
|   ├── pkg2
|   |   ├── package.json
├── package.json
```

在 `packages` 目录下存放多个子项目，当然也可以叫其他名字，每个子项目都有自己的 `package.json` 文件，用来管理子包。

在更换新的方式之前，一定要知道原先的方式有什么缺点。接下来就先聊聊 Polyrepo 的方式在生产上都存在着哪些弊端。

## Polyrepo 的弊端

### 1. 代码重复

Polyrepo 容易导致代码重复，主要是因为不同的项目都有自己的独立代码仓库。

在维护一些基础组件或者工具函数时，会想着直接从 A 仓库将代码复制到 B 仓库里使用，这样很方便，但是却给后续维护成本带来了很大的负担。一旦出现需要修改的地方，需要在**多个仓库中进行修改**，这可能会导致修改过程出现错误，并可能导致代码的不一致。

那么当然我们可以不进行复制，将公共逻辑抽离出来，单独发包，**作用一个 npm 模块引入到项目**中，需要修改时，也只用修改一份代码，然后重新发布即可。

但是这整个流程还是太复杂了，并不是完美的解决方式，仅仅是为了修改一点点东西，就需要去发包、更新，这太麻烦了。

小结：不同仓库之间的割裂感、导致复用代码的成本很高，开发体验差。或者需要在多个仓库中重复编写相同的代码，从而导致代码的**不一致性和冗余性。**

### 2. 版本管理

因为多个仓库分别管理自己的代码，这样会缺乏一个**全局视角去看待所有仓库**，无法清晰的了解到整个项目的结构和状态。当不同仓库中的有依赖关系时，会有依赖管理的问题，时时刻刻都需要注意依赖的版本和代码是否一致

例如：

主项目依赖了子项目提供的组件，如果此时子项目在某次升级时产生了 `breaking change` 版本，和原来的组件使用方式完全不一致，这样主项目就直接寄了。因此我们需要在子项目更新时，及时的更新主项目的依赖，这样就形成了负担。当组件出现异常时，就会开始怀疑包版本是否不正确...

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f65b2e42b55469ba9eb194b839c14a4~tplv-k3u1fbpfcp-watermark.image?)

因此，Polyrepo 需要有合适的版本管理方法，**保证版本和代码的一致性**

### 3. 工具混乱

每个项目都使用自己的一组命令来运行测试、构建、服务、检查、部署等。不一致会导致记住在不同项目中使用哪些命令的心理负担。

**单独部署、独立工作流**

在多仓库情况下，由于在不同的仓库里，继承测试会变得更加的困难，需要很多步骤才能组合在一起测试。同时每个项目都使用自己的一组命令来运行测试、构建、服务、检查、部署等。不一致会导致记住在不同项目中使用哪些命令的心理负担，维护起来也是问题

例如：

每个项目都会配置自己的 `webpack.config.js` 文件，但是这些配置很多都是一致的。

例如：

CI、CD 流程很难将多个仓库组合到一起去，测试也比较难处理

再例如：

一些 linter 工具也需要每个仓库都写一份，实际上这里是可以统一处理的

### 4. 代码共享

要跨存储库共享代码，可能会为共享代码创建一个存储库。那么必须设置工具和 CI 环境，将提交者添加到存储库，并设置包发布以便其他存储库可以依赖它。让我们不要开始跨存储库协调第三方库的不兼容版本....

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5dd49a9d663a464badeb6d5662df8e13~tplv-k3u1fbpfcp-watermark.image?)

### 5. 代码管理

基于 Polyrepo 管理，每个开发人员的 commit 都会提交到各个仓库，不利于代码的 CR，也不利于管理代码合入机制，导致容易出现逃逸现象。

## Monorepo 能解决什么问题？

**Monorepo 都能解决以上的问题**

不仅仅在于减少了维护和管理多个代码库的成本，同时还有以下优点：

1. **代码复用**：因为多个项目共享一个代码库，所以避免了在不同项目中重复编写相同功能代码的问题，提高了开发效率。
2. **提升协作效率**：多个项目在同一个代码库中进行开发，可以方便地共享代码和文档，避免不同项目之间的沟通和协调成本。
3. **集中管理**：Monorepo 架构中，不同的应用程序都在同一个代码库中，方便管理和监控。这一点非常重要，特别是在需要同时对多个版本进行修改和维护的情况下。
4. **统一构建**：Monorepo 的一个重要特点是可以共用一套构建系统和**工具链进行构建和部署**，提升了构建的效率。
5. **可以快速定位问题**：由于所有的代码都在同一个代码库中进行开发，debugger 可以很快找出问题所在的代码文件和行数，便于开发人员调试问题。
6. **一个版本**：无需担心因为项目依赖于第三方库的冲突版本而导致的不兼容问题。

## Monorepo 和 Polyrepo 的不同？

前面说完之后，相信这里已经有了答案，这里再用对比的方式来看看 Monorepo 和 polyrepo 相比之下都有哪些优势

### 依赖安装

| Polyrepo | Monorepo |
| -------- | -------- |
| 每个项目都需要安装  | 在主项目安装       |

这里就可以看到 Monorepo 的优势在于只需一次安装，即可安装所有子项目的依赖，而 polyrepo 需要每个都单独 install

### CI 构建

| Polyrepo | Monorepo |
| -------- | -------- |
| 各自构建  | 增量构建：根据依赖关系（DAG），通过拓扑排序并行构建此次改动涉及到的项目       |

Monorepo 的优势在于能够通过有向无环图，清楚的知道依赖关系，并通过拓扑排序进行增量的构建，而 Polyrepo 也有一定的优势在于无更改就不需要重新打包

同时在本地开发调试、上线部署上还有着很大的优势...

## Monorepo 如何搭建？

最简单的方式是采用 pnpm + workspace 来搭建，不需要其他额外的工具，利用 pnpm 提供 filter 命令，基本可满足大部分场景。

搭建方式也很简单可以

```
├── packages
|   ├── pkg1
|   |   ├── package.json
|   ├── pkg2
|   |   ├── package.json
├── package.json
├── pnpm-workspace.yaml
```

在 pnpm-workspace.yaml 中指定 packages 的入口

```yaml
packages:
  # all packages in subdirs of packages/ and components/
  - 'packages/**'
```

在 pkg1 中引用 pkg2 只需要在 pkg1 的 package.json 中的依赖中进行添加

```json
"dependencies": { 
    "@test/utils": "workspace:^1.0.0"
}
```

在根的 package.json 中通过 filter 配置 script 来指定特定的项目执行

```json
"build:pkg1": "pnpm --filter=@pkg1 build",
```

当你的项目需要根据 package.json 下的依赖进行拓扑排序并行打包、增量打包、打包缓存、依赖图可视化等等各种功能时，你可以考虑一些构建工具

比如 Rush、lerna、Turbo，这些都能高效的帮你完成想要的工作

## 最后

Monorepo 和 Polyrepo 都有各自的好处，项目不大就用 Polyrepo 也不会有什么坏处，当项目复杂度越来越高时，就要开始考虑做 Monorepo 整合了，让团队的工作更加聚合，让代码更加聚合。
