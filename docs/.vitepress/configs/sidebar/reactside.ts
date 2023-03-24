export const REACT_SIDE = {
    '/pages/react/primary/': [
        {
            text: 'React 入门学习', // 必要的
            items: [
                {
                    link: '/pages/react/primary/jsx.md',
                    text: '基础知识以及 jsx语法'
                },
                {
                    link: '/pages/react/primary/component.md',
                    text: '面向组件编程'
                },
                {
                    link: '/pages/react/primary/lifecycle.md',
                    text: '组件的生命周期'
                },
                {
                    link: '/pages/react/primary/diff.md',
                    text: 'diff 算法'
                },
                {
                    link: '/pages/react/primary/cli.md',
                    text: '初始化脚手架'
                },
                {
                    link: '/pages/react/primary/todolist.md',
                    text: 'todoList案例'
                },
                {
                    link: '/pages/react/primary/proxy.md',
                    text: '脚手架配置代理'
                },
                {
                    link: '/pages/react/primary/github.md',
                    text: 'GitHub 搜索案例'
                },
                {
                    link: '/pages/react/primary/pubsub.md',
                    text: '消息订阅发布'
                },
                {
                    link: '/pages/react/primary/router.md',
                    text: 'React 路由'
                },
                {
                    link: '/pages/react/primary/params.md',
                    text: 'React 路由传参'
                },
                {
                    link: '/pages/react/primary/react-router.md',
                    text: ' React 路由跳转'
                },
                {
                    link: '/pages/react/primary/antd.md',
                    text: 'antd 的基本使用'
                },
                {
                    link: '/pages/react/primary/redux.md',
                    text: 'redux 的基本使用'
                },
                {
                    link: '/pages/react/primary/react-redux.md',
                    text: 'react-redux 的基本使用'
                },
                {
                    link: '/pages/react/primary/share.md',
                    text: '数据共享'
                },
                {
                    link: '/pages/react/primary/more',
                    text: 'React 扩展'
                },
                {
                    link: '/pages/react/primary/hooks',
                    text: 'React Hooks'
                }
            ]
        }
    ],
    '/pages/react/hard/': [
        {
            text: 'React 源码解析',
            items: [{ link: '/pages/react/hard/readme.md', text: '专栏介绍' }]
        },
        {
            text: 'React 哲学', // 必要的
            items: [
                {
                    link: '/pages/react/hard/fiberidea.md',
                    text: 'React 设计理念'
                },
                {
                    link: '/pages/react/hard/constructure.md',
                    text: 'React Fiber 架构'
                }
            ]
        },
        {
            text: 'Render 阶段',
            items: [
                {
                    link: '/pages/react/hard/render/beginwork.md',
                    text: 'Render 阶段 -- Beginwork'
                },
                {
                    link: '/pages/react/hard/render/completework.md',
                    text: 'Render 阶段 -- Completework'
                }
            ]
        },
        {
            text: 'Commit 阶段',
            items: [
                {
                    link: '/pages/react/hard/commit/commit.md',
                    text: '流程概览'
                },
                {
                    link: '/pages/react/hard/commit/beforemutation.md',
                    text: 'Before Mutation 阶段'
                },
                {
                    link: '/pages/react/hard/commit/mutation.md',
                    text: 'Mutation 阶段'
                },
                {
                    link: '/pages/react/hard/commit/layout.md',
                    text: 'Layout 阶段'
                },
                { link: '/pages/react/hard/commit/qa.md', text: 'Q & A' }
            ]
        },
        {
            text: 'Diff 算法',
            items: [
                {
                    link: '/pages/react/hard/diff/diffpre.md',
                    text: 'Diff 算法概览'
                },
                {
                    link: '/pages/react/hard/diff/singlediff.md',
                    text: '单一节点的 Diff'
                },
                {
                    link: '/pages/react/hard/diff/arraydiff.md',
                    text: '多节点的 Diff'
                }
            ]
        },
        {
            text: '状态更新',
            items: [
                {
                    link: '/pages/react/hard/update/update.md',
                    text: '状态更新流程概览'
                },
                {
                    link: '/pages/react/hard/update/priority.md',
                    text: '优先级更新'
                },
                {
                    link: '/pages/react/hard/update/updatecode.md',
                    text: '状态更新调度源码解析'
                }
            ]
        },
        {
            text: 'Scheduler 模块',
            items: [
                {
                    link: '/pages/react/hard/scheduler/scheduler-origin.md',
                    text: 'Scheduler 实现原理'
                },
                {
                    link: '/pages/react/hard/scheduler/scheduler.md',
                    text: 'Scheduler 源码解析'
                }
            ]
        },
        {
            text: 'Hooks 实现',
            items: [
                {
                    link: '/pages/react/hard/hooks/hooks.md',
                    text: 'Hooks 实现原理'
                },
                {
                    link: '/pages/react/hard/hooks/useState.md',
                    text: 'useState  源码解读'
                },
                {
                    link: '/pages/react/hard/hooks/usereducer.md',
                    text: 'useReducer  源码解读'
                },
                {
                    link: '/pages/react/hard/hooks/usecontext.md',
                    text: 'useContext 源码解读'
                },
                {
                    link: '/pages/react/hard/hooks/useeffect.md',
                    text: 'useEffect 源码解读'
                },
                {
                    link: '/pages/react/hard/hooks/uselayouteffect.md',
                    text: 'useLayoutEffect 源码解读'
                },
                {
                    link: '/pages/react/hard/hooks/useref.md',
                    text: 'useRef  源码解读'
                },
                {
                    link: '/pages/react/hard/hooks/usememo-callback.md',
                    text: 'useMemo & useCallback 源码解读'
                },
                {
                    link: '/pages/react/hard/hooks/useId.md',
                    text: 'useId 源码解读'
                },
                {
                    link: '/pages/react/hard/hooks/usetransition.md',
                    text: 'useTransition 源码解读'
                },
                { link: '/pages/react/hard/hooks/qa.md', text: 'Q & A' }
            ]
        }
        // {
        //   text: "事件系统",
        //   items: [
        //     {
        //       link: "/pages/react/hard/writing.md",
        //       text: "React 事件系统源码解析",
        //     },
        //   ],
        // },
        // {
        //   text: "Context 状态原理",
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
    ]
}
