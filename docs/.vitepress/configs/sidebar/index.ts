import { privateRouter } from './private'
import { REACT_SIDE } from './reactside'

export const sidebar = {
    ...privateRouter,
    '/pages/network/': [
        {
            text: '计算机网络',
            items: [
                { link: '/pages/network/overview.md', text: '概述' },
                { link: '/pages/network/physics.md', text: '物理层' },
                { link: '/pages/network/datalink.md', text: '数据链路层' },
                { link: '/pages/network/web.md', text: '网络层' },
                { link: '/pages/network/http.md', text: 'HTTP 协议相关面试题' },
                {
                    link: '/pages/network/statuscode.md',
                    text: 'HTTP 状态码相关'
                },
                { link: '/pages/network/tcpudp.md', text: 'TCP 和 UDP 协议' }
            ]
        }
    ],
    ...REACT_SIDE,
    '/pages/interview/heading/': [
        {
            text: '前端面试题精选', // 必要的
            items: [
                {
                    link: '/pages/interview/heading/best1.md',
                    text: '面试题精选1'
                },
                {
                    link: '/pages/interview/heading/best2.md',
                    text: '面试题精选2'
                },
                {
                    link: '/pages/interview/heading/best3.md',
                    text: '面试题精选3'
                }
            ]
        }
    ],
    '/pages/interview/all/': [
        {
            text: '面试题合集', // 必要的
            items: [
                { link: '/pages/interview/all/html.md', text: 'HTML 面试题' },
                { link: '/pages/interview/all/css/css.md', text: 'CSS 面试题' },
                { link: '/pages/interview/all/js.md', text: 'JS 面试题' }
            ]
        }
    ],
    '/pages/handwriting/': [
        {
            text: '手写系列', // 必要的
            items: [
                { link: '/pages/handwriting/handwriting.md', text: '手写题' },
                { link: '/pages/handwriting/array.md', text: '数组方法' },
                { link: '/pages/handwriting/promise.md', text: 'Promise' },
                { link: '/pages/handwriting/part.md', text: '场景应用' },
                { link: '/pages/handwriting/reg.md', text: '正则表达式' },
                { link: '/pages/handwriting/react.md', text: 'React 手写' }
            ]
        }
    ],
    '/pages/algorithm/': [
        {
            text: '算法合集', // 必要的
            items: [
                { link: '/pages/algorithm/algorithm.md', text: '算法合集' },
                { link: '/pages/algorithm/string.md', text: '字符串' },
                { link: '/pages/algorithm/dynamic.md', text: '动态规划' },
                { link: '/pages/algorithm/greedy.md', text: '贪心算法' },
                { link: '/pages/algorithm/link.md', text: '链表' },
                { link: '/pages/algorithm/tree.md', text: '树' },
                { link: '/pages/algorithm/sort.md', text: '排序算法' },
                { link: '/pages/algorithm/bitwise.md', text: '位运算' }
            ]
        }
    ],
    '/pages/summary/': [
        {
            text: '前端总结', // 必要的
            items: [
                {
                    link: '/pages/summary/login.md',
                    text: '面对前端鉴权登录，你需要知道的一切。从 Cookie 到 JWT、从 Session 到 SSO'
                },
                {
                    link: '/pages/summary/jsx2js.md',
                    text: '我们编写的 JSX 是如何通过构建工具转换成 JS 的'
                },
                {
                    link: '/pages/summary/engine.md',
                    text: '我是这样搭建 React + TypeScript 项目的'
                },
                {
                    link: '/pages/summary/ts.md',
                    text: 'TS 类型体操还能这么玩，太秀了！'
                },
                {
                    link: '/pages/summary/event.md',
                    text: 'Event 对象，这些你都知道吗？'
                },
                {
                    link: '/pages/summary/qrcode.md',
                    text: '如何优雅的在 H5 网页中实现扫码功能'
                },
                {
                    link: '/pages/summary/animate.md',
                    text: '为什么 CSS 动画比 JavaScript 高效？'
                },
                { link: '/pages/summary/git.md', text: '通俗易懂的GIT入门' },
                {
                    link: '/pages/summary/prototype.md',
                    text: '三张图轻松KO⚡ JS 原型和原型链'
                },
                {
                    link: '/pages/summary/v8.md',
                    text: '你知道 V8 是如何执行JS代码的吗？'
                },
                {
                    link: '/pages/summary/weakmap.md',
                    text: '浅析 Map 和 WeakMap 区别以及使用场景'
                },
                {
                    link: '/pages/summary/jsrun.md',
                    text: '新生代总结 JavaScript 运行机制解析'
                },
                {
                    link: '/pages/summary/inherit.md',
                    text: 'JS 继承的7种方法，你学会了吗？'
                },
                {
                    link: '/pages/summary/arrayapi.md',
                    text: '原生 JavaScript 手写数组 API'
                },
                {
                    link: '/pages/summary/iterator.md',
                    text: '【深扒】JavaScript 中的迭代器'
                },
                {
                    link: '/pages/summary/generator.md',
                    text: '【深扒】JavaScript 中的生成器'
                },
                {
                    link: '/pages/summary/highf.md',
                    text: 'JavaScript中的高阶函数'
                },
                {
                    link: '/pages/summary/npm.md',
                    text: '经常使用npm命令，你真的知道它的意思吗？'
                },
                {
                    link: '/pages/summary/storage.md',
                    text: 'Javascript客户端存储技术你知道多少？'
                }
            ]
        }
    ],
    '/pages/about/': [
        {
            text: 'About Me', // 必要的
            items: [
                { link: '/pages/about/about.md', text: '关于我' },
                { link: '/pages/about/2021.md', text: '2021 年终总结' }
            ]
        }
    ],
    '/pages/structure/': [
        {
            text: '数据结构和算法', // 必要的
            items: [
                {
                    link: '/pages/structure/start.md',
                    text: '从这里开启数据结构和算法'
                },
                {
                    link: '/pages/structure/stack.md',
                    text: '详解栈结构，并实现一个栈结构'
                },
                {
                    link: '/pages/structure/queue.md',
                    text: '详解队列结构，并实现一个队列结构'
                },
                {
                    link: '/pages/structure/link.md',
                    text: '详解链表结构，并实现一个链表结构'
                },
                {
                    link: '/pages/structure/set.md',
                    text: '详解集合结构，并实现一个集合'
                },
                {
                    link: '/pages/structure/map.md',
                    text: '详解字典结构，并实现一个字典'
                },
                {
                    link: '/pages/structure/tree.md',
                    text: '详解树结构，并实现二叉搜索树'
                },
                {
                    link: '/pages/structure/graph.md',
                    text: '详解图结构，并实现一个图结构'
                },
                {
                    link: '/pages/structure/heap.md',
                    text: '详解堆结构，并实现一个最小堆'
                }
            ]
        }
    ],
    '/pages/css/layout/': [
        {
            text: 'CSS 布局方式', // 必要的
            items: [
                {
                    link: '/pages/css/layout/flex.md',
                    text: '一文读懂CSS布局--flex布局'
                },
                {
                    link: '/pages/css/layout/grid.md',
                    text: '一文读懂CSS布局--grid布局'
                }
            ]
        }
    ],
    '/pages/tschallenge/': [
        {
            text: 'typescript 类型挑战',
            items: [
                {
                    link: '/pages/tschallenge/easy.md',
                    text: 'Easy 题'
                },
                {
                    link: '/pages/tschallenge/medium.md',
                    text: 'Medium 题'
                },
                {
                    link: '/pages/tschallenge/hard.md',
                    text: 'Hard 题'
                }
            ]
        }
    ]
}
