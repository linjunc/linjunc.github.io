module.exports = {
    title: '小丞前端日记', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: '小丞同学的博客，致力于分享高质量的 React,JS 相关博文', // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/orange.png' }],  //浏览器的标签栏的网页图标
    ],
    markdown: {
        lineNumbers: true
    },
    serviceWorker: true,
    themeConfig: {
        logo: '/orange.png',
        lastUpdated: 'lastUpdate', // string | boolean
        sidebar: 'auto',
        search: false,
        smoothScroll: true,
        nav: [
            { text: '首页', link: '/' },
            {
                text: '各类知识点',
                items: [
                    { text: '前端总结', link: '/pages/summary/qrcode.md' },
                    { text: '数据结构和算法', link: '/pages/structure/start.md' },
                    { text: 'CSS 布局方式', link: '/pages/css/layout/flex.md' },
                    // { text: 'JavaScript', link: '/pages/javascript/test1.md' },
                    // { text: 'CSS', link: '/pages/css/test1.md' },
                    // { text: 'HTML', link: '/pages/html/test4.md' },
                ]
            },
            {
                text: '前端面试合集',
                items: [
                    { text: '面试题精选', link: '/pages/interview/heading/best1.md' },
                    // { text: '前端基础', link: '/pages/interview/test1.md' },
                    // { text: '框架进阶', link: '/pages/interview/test2.md' },
                    // { text: '计算机网络', link: '/pages/interview/test3.md' },
                    // { text: '前端工程化', link: '/pages/interview/test4.md' },
                    // { text: '简历编写', link: '/pages/interview/test5.md' },
                ]
            },
            // {
            //     text: 'TypeScript',
            //     items: [
            //         { text: 'TypeScript 类型体操', link: '/pages/typescript/test1.md' },
            //     ]
            // },
            {
                text: 'React 全家桶',
                items: [
                    { text: 'React 入门', link: '/pages/react/primary/jsx.md' },
                    { text: 'React 源码解析', link: '/pages/react/hard/fiberidea.md' },
                    // { text: 'Mobx', link: '/pages/mobx/test2.md' },
                ]
            },
            {
                text: '关于我',
                items: [
                    { text: '关于我', link: '/pages/about/about.md' },
                    { text: 'GitHub', link: 'https://github.com/linjunc' },
                    { text: '掘金', link: 'https://juejin.cn/user/1460594842018446' },
                    { text: 'CSDN', link: 'https://blog.csdn.net/m0_50855872' },
                ]
            },
        ],
        sidebar: {
            '/pages/react/primary/': [
                {
                    title: 'React 入门学习',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        ['jsx.md', '基础知识以及 jsx语法'],
                        ['component.md', '面向组件编程'],
                        ['lifecycle.md', '组件的生命周期'],
                        ['diff.md', 'diff 算法'],
                        ['cli.md', '初始化脚手架'],
                        ['todolist.md', 'todoList案例'],
                        ['proxy.md', '脚手架配置代理'],
                        ['github.md', 'GitHub 搜索案例'],
                        ['pubsub.md', '消息订阅发布'],
                        ['router.md', 'React 路由'],
                        ['params.md', 'React 路由传参'],
                        ['react-router.md', ' React 路由跳转'],
                        ['antd.md', 'antd 的基本使用'],
                        ['redux.md', 'redux 的基本使用'],
                        ['react-redux.md', 'react-redux 的基本使用'],
                        ['share.md', '数据共享'],
                        ['more', 'React 扩展'],
                        ['hooks', 'React Hooks'],
                    ]
                }
            ],
            '/pages/react/hard/': [
                {
                    title: 'React 源码解析',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        ['fiberidea.md', 'React 设计理念'],
                        ['constructure.md', 'React Fiber 架构'],
                    ]
                },
                {
                    title: 'Render 阶段',
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        ['beginwork.md', 'Render 阶段 -- Beginwork']
                    ]
                }
            ],
            '/pages/interview/heading/': [
                {
                    title: '前端面试题精选',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        ['best1.md', '面试题精选1'],
                        ['best2.md', '面试题精选2'],
                        ['best3.md', '面试题精选3'],
                    ]
                }
            ],
            '/pages/summary/': [
                {
                    title: '前端总结',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        ['qrcode.md', '如何优雅的在 H5 网页中实现扫码功能'],
                        ['animate.md', '为什么 CSS 动画比 JavaScript 高效？'],
                        ['git.md', '通俗易懂的GIT入门'],
                        ['prototype.md', '三张图轻松KO⚡ JS 原型和原型链'],
                        ['v8.md', '你知道 V8 是如何执行JS代码的吗？'],
                        ['weakmap.md', '浅析 Map 和 WeakMap 区别以及使用场景'],
                        ['jsrun.md', '新生代总结 JavaScript 运行机制解析'],
                        ['inherit.md', 'JS 继承的7种方法，你学会了吗？'],
                        ['arrayapi.md', '原生 JavaScript 手写数组 API'],
                        ['iterator.md', '【深扒】JavaScript 中的迭代器'],
                        ['generator.md', '【深扒】JavaScript 中的生成器'],
                        ['highf.md', 'JavaScript中的高阶函数'],
                        ['npm.md', '经常使用npm命令，你真的知道它的意思吗？'],
                        ['storage.md', 'Javascript客户端存储技术你知道多少？']
                    ]
                }
            ],
            '/pages/about/': [
                {
                    title: 'About Me',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        ['about.md', '关于我'],
                        ['2021.md', '2021 年终总结'],
                    ]
                }
            ],
            '/pages/structure/': [
                {
                    title: '数据结构和算法',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        ['start.md', '从这里开启数据结构和算法'],
                        ['stack.md', '详解栈结构，并实现一个栈结构'],
                        ['queue.md', '详解队列结构，并实现一个队列结构'],
                        ['link.md', '详解链表结构，并实现一个链表结构'],
                        ['set.md', '详解集合结构，并实现一个集合'],
                        ['map.md', '详解字典结构，并实现一个字典'],
                        ['tree.md', '详解树结构，并实现二叉搜索树'],
                        ['graph.md', '详解图结构，并实现一个图结构'],
                        ['heap.md', '详解堆结构，并实现一个最小堆'],
                    ]
                }
            ],
            '/pages/css/layout/': [
                {
                    title: 'CSS 布局方式',   // 必要的
                    collapsable: true, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        ['flex.md', '一文读懂CSS布局--flex布局'],
                        ['grid.md', '一文读懂CSS布局--grid布局'],
                    ]
                }
            ]
        }
    }
}