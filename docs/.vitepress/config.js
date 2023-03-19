import { markdown } from "./configs/index"

module.exports = {
  title: "小丞前端日记", // 显示在左上角的网页名称以及首页在浏览器标签显示的text名称
  description: "小丞同学的博客，致力于分享高质量的 React,JS 相关博文", // meta 中的描述文字，用于SEO
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ["link", { rel: "icon", href: "/avatar.jpg" }], //浏览器的标签栏的网页图标
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css",
      },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js",
      },
    ],
  ],
  serviceWorker: true,
  appearance: true,
  markdown,
  themeConfig: {
    markdown: {
      theme: "material-palenight",
      lineNumbers: true,
    },
    logo: "/avatar.jpg",

    socialLinks: [
      { icon: "github", link: "https://github.com/linjunc/linjunc.github.io" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-present linjunc",
    },
    lastUpdated: true, // string | boolean
    nav: [
      { text: "首页", link: "/" },
      {
        text: "各类知识点",
        items: [
          { text: "前端总结", link: "/pages/summary/ts.md" },
          { text: "TS 类型挑战", link: "/pages/tschallenge/easy.md" },
          { text: "计算机网络", link: "/pages/network/overview.md" },
          {
            text: "数据结构和算法",
            link: "/pages/structure/start.md",
          },
          { text: "CSS 布局方式", link: "/pages/css/layout/flex.md" },
        ],
      },
      {
        text: "前端面试合集",
        items: [
          {
            text: "面试题精选",
            link: "/pages/interview/heading/best1.md",
          },
          {
            text: "面试题合集",
            link: "/pages/interview/all/html.md",
          },
          {
            text: "手写系列",
            link: "/pages/handwriting/handwriting.md",
          },
          {
            text: "算法合集",
            link: "/pages/algorithm/algorithm.md",
          },
          // { text: '前端基础', link: '/pages/interview/test1.md' },
          // { text: '框架进阶', link: '/pages/interview/test2.md' },
          // { text: '计算机网络', link: '/pages/interview/test3.md' },
          // { text: '前端工程化', link: '/pages/interview/test4.md' },
          // { text: '简历编写', link: '/pages/interview/test5.md' },
        ],
      },
      // {
      //     text: 'TypeScript',
      //     items: [
      //         { text: 'TypeScript 类型体操', link: '/pages/typescript/test1.md' },
      //     ]
      // },
      {
        text: "React 全家桶",
        items: [
          { text: "React 入门", link: "/pages/react/primary/jsx.md" },
          {
            text: "React 源码解析",
            link: "/pages/react/hard/fiberidea.md",
          },
          // { text: 'Mobx', link: '/pages/mobx/test2.md' },
        ],
      },
      {
        text: "关于我",
        items: [
          { text: "关于我", link: "/pages/about/about.md" },
          { text: "GitHub", link: "https://github.com/linjunc" },
          {
            text: "掘金",
            link: "https://juejin.cn/user/1460594842018446",
          },
          { text: "CSDN", link: "https://blog.csdn.net/m0_50855872" },
        ],
      },
    ],
    sidebar: {
      "/pages/network/": [
        {
          text: "计算机网络",
          collapsable: true,
          sidebarDepth: 2,
          items: [
            { link: "/pages/network/overview.md", text: "概述" },
            { link: "/pages/network/physics.md", text: "物理层" },
            { link: "/pages/network/datalink.md", text: "数据链路层" },
            { link: "/pages/network/web.md", text: "网络层" },
            { link: "/pages/network/http.md", text: "HTTP 协议相关面试题" },
            { link: "/pages/network/statuscode.md", text: "HTTP 状态码" }
          ],
        },
      ],
      "/pages/react/primary/": [
        {
          text: "React 入门学习", // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          items: [
            {
              link: "/pages/react/primary/jsx.md",
              text: "基础知识以及 jsx语法",
            },
            {
              link: "/pages/react/primary/component.md",
              text: "面向组件编程",
            },
            {
              link: "/pages/react/primary/lifecycle.md",
              text: "组件的生命周期",
            },
            {
              link: "/pages/react/primary/diff.md",
              text: "diff 算法",
            },
            {
              link: "/pages/react/primary/cli.md",
              text: "初始化脚手架",
            },
            {
              link: "/pages/react/primary/todolist.md",
              text: "todoList案例",
            },
            {
              link: "/pages/react/primary/proxy.md",
              text: "脚手架配置代理",
            },
            {
              link: "/pages/react/primary/github.md",
              text: "GitHub 搜索案例",
            },
            {
              link: "/pages/react/primary/pubsub.md",
              text: "消息订阅发布",
            },
            {
              link: "/pages/react/primary/router.md",
              text: "React 路由",
            },
            {
              link: "/pages/react/primary/params.md",
              text: "React 路由传参",
            },
            {
              link: "/pages/react/primary/react-router.md",
              text: " React 路由跳转",
            },
            {
              link: "/pages/react/primary/antd.md",
              text: "antd 的基本使用",
            },
            {
              link: "/pages/react/primary/redux.md",
              text: "redux 的基本使用",
            },
            {
              link: "/pages/react/primary/react-redux.md",
              text: "react-redux 的基本使用",
            },
            {
              link: "/pages/react/primary/share.md",
              text: "数据共享",
            },
            {
              link: "/pages/react/primary/more",
              text: "React 扩展",
            },
            {
              link: "/pages/react/primary/hooks",
              text: "React Hooks",
            },
          ],
        },
      ],
      "/pages/react/hard/": [
        {
          text: "React 源码解析",
          collapsable: false,
          items: [{ link: "/pages/react/hard/readme.md", text: "专栏介绍" }],
        },
        {
          text: "React 哲学", // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 4, // 可选的, 默认值是 1
          items: [
            { link: "/pages/react/hard/fiberidea.md", text: "React 设计理念" },
            {
              link: "/pages/react/hard/constructure.md",
              text: "React Fiber 架构",
            },
          ],
        },
        {
          text: "Render 阶段",
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          items: [
            {
              link: "/pages/react/hard/render/beginwork.md",
              text: "Render 阶段 -- Beginwork",
            },
            {
              link: "/pages/react/hard/render/completework.md",
              text: "Render 阶段 -- Completework",
            },
          ],
        },
        {
          text: "Commit 阶段",
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          items: [
            { link: "/pages/react/hard/commit/commit.md", text: "流程概览" },
            {
              link: "/pages/react/hard/commit/beforemutation.md",
              text: "Before Mutation 阶段",
            },
            {
              link: "/pages/react/hard/commit/mutation.md",
              text: "Mutation 阶段",
            },
            { link: "/pages/react/hard/commit/layout.md", text: "Layout 阶段" },
            { link: "/pages/react/hard/commit/qa.md", text: "Q & A" },
          ],
        },
        {
          text: "Diff 算法",
          collapsable: true,
          sidebarDepth: 2,
          items: [
            {
              link: "/pages/react/hard/diff/diffpre.md",
              text: "Diff 算法概览",
            },
            {
              link: "/pages/react/hard/diff/singlediff.md",
              text: "单一节点的 Diff",
            },
            {
              link: "/pages/react/hard/diff/arraydiff.md",
              text: "多节点的 Diff",
            },
          ],
        },
        {
          text: "状态更新",
          collapsable: true,
          sidebarDepth: 2,
          items: [
            {
              link: "/pages/react/hard/update/update.md",
              text: "状态更新流程概览",
            },
            {
              link: "/pages/react/hard/update/priority.md",
              text: "优先级更新",
            },
            {
              link: "/pages/react/hard/update/updatecode.md",
              text: "状态更新调度源码解析",
            },
          ],
        },
        {
          text: "Scheduler 模块",
          collapsable: true,
          sidebarDepth: 2,
          items: [
            {
              link: "/pages/react/hard/scheduler/scheduler-origin.md",
              text: "Scheduler 实现原理",
            },
            {
              link: "/pages/react/hard/scheduler/scheduler.md",
              text: "Scheduler 源码解析",
            },
          ],
        },
        {
          text: "Hooks 实现",
          collapsable: true,
          sidebarDepth: 2,
          items: [
            {
              link: "/pages/react/hard/hooks/hooks.md",
              text: "Hooks 实现原理",
            },
            {
              link: "/pages/react/hard/hooks/useState.md",
              text: "useState  源码解读",
            },
            {
              link: "/pages/react/hard/hooks/usereducer.md",
              text: "useReducer  源码解读",
            },
            {
              link: "/pages/react/hard/hooks/usecontext.md",
              text: "useContext 源码解读",
            },
            {
              link: "/pages/react/hard/hooks/useeffect.md",
              text: "useEffect 源码解读",
            },
            {
              link: "/pages/react/hard/hooks/uselayouteffect.md",
              text: "useLayoutEffect 源码解读",
            },
            {
              link: "/pages/react/hard/hooks/useref.md",
              text: "useRef  源码解读",
            },
            {
              link: "/pages/react/hard/hooks/usememo-callback.md",
              text: "useMemo & useCallback 源码解读",
            },
            {
              link: "/pages/react/hard/hooks/useId.md",
              text: "useId 源码解读",
            },
            {
              link: "/pages/react/hard/hooks/usetransition.md",
              text: "useTransition 源码解读",
            },
            { link: "/pages/react/hard/hooks/qa.md", text: "Q & A" },
          ],
        },
        // {
        //   text: "事件系统",
        //   collapsable: true,
        //   sidebarDepth: 2,
        //   items: [
        //     {
        //       link: "/pages/react/hard/writing.md",
        //       text: "React 事件系统源码解析",
        //     },
        //   ],
        // },
        // {
        //   text: "Context 状态原理",
        //   collapsable: true,
        //   sidebarDepth: 2,
        //   items: [
        //     {
        //       link: "/pages/react/hard/writing.md",
        //       text: "Context 状态原理概览",
        //     },
        //     {
        //       link: "/pages/react/hard/writing.md",
        //       text: "Context 状态原理源码解析",
        //     },
        //   ],
        // },
        // {
        //   text: "React 全家桶",
        //   collapsable: true,
        //   sidebarDepth: 2,
        //   items: [
        //     {
        //       link: "/pages/react/hard/writing.md",
        //       text: "React Redux 源码解析",
        //     },
        //     {
        //       link: "/pages/react/hard/writing.md",
        //       text: "React MobX 源码解析",
        //     },
        //     {
        //       link: "/pages/react/hard/writing.md",
        //       text: "React Router 源码解析",
        //     },

        //     ["writing.md", "React Redux 源码解析"],
        //     ["writing.md", "React MobX 源码解析"],
        //     ["writing.md", "React Router 源码解析"],
        //   ],
        // },
      ],
      "/pages/interview/heading/": [
        {
          text: "前端面试题精选", // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          items: [
            { link: "/pages/interview/heading/best1.md", text: "面试题精选1" },
            { link: "/pages/interview/heading/best2.md", text: "面试题精选2" },
            { link: "/pages/interview/heading/best3.md", text: "面试题精选3" },
          ],
        },
      ],
      "/pages/interview/all/": [
        {
          text: "面试题合集", // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          items: [
            { link: "/pages/interview/all/html.md", text: "HTML 面试题" },
            { link: "/pages/interview/all/css/css.md", text: "CSS 面试题" },
            { link: "/pages/interview/all/js.md", text: "JS 面试题" },
          ],
        },
      ],
      "/pages/handwriting/": [
        {
          text: "手写系列", // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          items: [
            { link: "/pages/handwriting/handwriting.md", text: "手写题" },
            { link: "/pages/handwriting/array.md", text: "数组方法" },
            { link: "/pages/handwriting/promise.md", text: "Promise" },
            { link: "/pages/handwriting/part.md", text: "场景应用" },
            { link: "/pages/handwriting/reg.md", text: "正则表达式" },
            { link: "/pages/handwriting/react.md", text: "React 手写" },
          ],
        },
      ],
      "/pages/algorithm/": [
        {
          text: "算法合集", // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          items: [
            { link: "/pages/algorithm/algorithm.md", text: "算法合集" },
            { link: "/pages/algorithm/string.md", text: "字符串" },
            { link: "/pages/algorithm/dynamic.md", text: "动态规划" },
            { link: "/pages/algorithm/greedy.md", text: "贪心算法" },
            { link: "/pages/algorithm/link.md", text: "链表" },
            { link: "/pages/algorithm/tree.md", text: "树" },
            { link: "/pages/algorithm/sort.md", text: "排序算法" },
            { link: "/pages/algorithm/bitwise.md", text: "位运算" },
          ],
        },
      ],
      "/pages/summary/": [
        {
          text: "前端总结", // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          items: [
            {
              link: "/pages/summary/jsx2js.md",
              text: "我们编写的 JSX 是如何通过构建工具转换成 JS 的",
            },
            {
              link: "/pages/summary/engine.md",
              text: "我是这样搭建 React + TypeScript 项目的",
            },
            {
              link: "/pages/summary/ts.md",
              text: "TS 类型体操还能这么玩，太秀了！",
            },
            {
              link: "/pages/summary/event.md",
              text: "Event 对象，这些你都知道吗？",
            },
            {
              link: "/pages/summary/qrcode.md",
              text: "如何优雅的在 H5 网页中实现扫码功能",
            },
            {
              link: "/pages/summary/animate.md",
              text: "为什么 CSS 动画比 JavaScript 高效？",
            },
            { link: "/pages/summary/git.md", text: "通俗易懂的GIT入门" },
            {
              link: "/pages/summary/prototype.md",
              text: "三张图轻松KO⚡ JS 原型和原型链",
            },
            {
              link: "/pages/summary/v8.md",
              text: "你知道 V8 是如何执行JS代码的吗？",
            },
            {
              link: "/pages/summary/weakmap.md",
              text: "浅析 Map 和 WeakMap 区别以及使用场景",
            },
            {
              link: "/pages/summary/jsrun.md",
              text: "新生代总结 JavaScript 运行机制解析",
            },
            {
              link: "/pages/summary/inherit.md",
              text: "JS 继承的7种方法，你学会了吗？",
            },
            {
              link: "/pages/summary/arrayapi.md",
              text: "原生 JavaScript 手写数组 API",
            },
            {
              link: "/pages/summary/iterator.md",
              text: "【深扒】JavaScript 中的迭代器",
            },
            {
              link: "/pages/summary/generator.md",
              text: "【深扒】JavaScript 中的生成器",
            },
            { link: "/pages/summary/highf.md", text: "JavaScript中的高阶函数" },
            {
              link: "/pages/summary/npm.md",
              text: "经常使用npm命令，你真的知道它的意思吗？",
            },
            {
              link: "/pages/summary/storage.md",
              text: "Javascript客户端存储技术你知道多少？",
            },
          ],
        },
      ],
      "/pages/about/": [
        {
          text: "About Me", // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          items: [
            { link: "/pages/about/about.md", text: "关于我" },
            { link: "/pages/about/2021.md", text: "2021 年终总结" },
          ],
        },
      ],
      "/pages/structure/": [
        {
          text: "数据结构和算法", // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          items: [
            {
              link: "/pages/structure/start.md",
              text: "从这里开启数据结构和算法",
            },
            {
              link: "/pages/structure/stack.md",
              text: "详解栈结构，并实现一个栈结构",
            },
            {
              link: "/pages/structure/queue.md",
              text: "详解队列结构，并实现一个队列结构",
            },
            {
              link: "/pages/structure/link.md",
              text: "详解链表结构，并实现一个链表结构",
            },
            {
              link: "/pages/structure/set.md",
              text: "详解集合结构，并实现一个集合",
            },
            {
              link: "/pages/structure/map.md",
              text: "详解字典结构，并实现一个字典",
            },
            {
              link: "/pages/structure/tree.md",
              text: "详解树结构，并实现二叉搜索树",
            },
            {
              link: "/pages/structure/graph.md",
              text: "详解图结构，并实现一个图结构",
            },
            {
              link: "/pages/structure/heap.md",
              text: "详解堆结构，并实现一个最小堆",
            },
          ],
        },
      ],
      "/pages/css/layout/": [
        {
          text: "CSS 布局方式", // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          items: [
            {
              link: "/pages/css/layout/flex.md",
              text: "一文读懂CSS布局--flex布局",
            },
            {
              link: "/pages/css/layout/grid.md",
              text: "一文读懂CSS布局--grid布局",
            },
          ],
        },
      ],
      "/pages/tschallenge/": [
        {
          text: "typescript 类型挑战",
          collapsable: true,
          items: [
            {
              link: "/pages/tschallenge/easy.md",
              text: "Easy 题",
            },
            {
              link: "/pages/tschallenge/medium.md",
              text: "Medium 题",
            },
            {
              link: "/pages/tschallenge/hard.md",
              text: "Hard 题",
            },
          ],
        },
      ],
    },
  },
}
