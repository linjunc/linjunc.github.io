module.exports = {
    title: '小丞前端之路', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: '小丞同学的博客，致力于分享高质量的 React,JS 相关博文', // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/egg.png' }],  //浏览器的标签栏的网页图标
    ],
    markdown: {
        lineNumbers: true
    },
    serviceWorker: true,
    themeConfig: {
        logo: '/egg.png',
        lastUpdated: 'lastUpdate', // string | boolean
        nav: [
            { text: '首页', link: '/' },
            {
                text: '各类知识点',
                items: [
                    { text: 'JavaScript', link: '/pages/javascript/test1.md' },
                    { text: 'CSS', link: '/pages/css/test1.md' },
                    { text: 'HTML', link: '/pages/html/test4.md' },
                ]
            },
            {
                text: '前端面试合集',
                items: [
                    { text: '前端面试题1', link: '/pages/interview/test1.md' },
                    { text: '前端面试题2', link: '/pages/interview/test2.md' },
                    { text: '我的简历', link: '/pages/interview/test3.md' },
                ]
            },
            {
                text: 'TypeScript',
                items: [
                    { text: 'TypeScript 类型体操', link: '/pages/typescript/test1.md' },
                ]
            },
            {
                text: 'React 全家桶',
                items: [
                    { text: 'React 入门', link: '/pages/react/test1.md' },
                    { text: 'React 源码', link: '/pages/react1/test1.md' },
                    { text: 'Mobx', link: '/pages/mobx/test2.md' },
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
            '/pages/folder1/': [
                {
                    title: '测试菜单1',   // 必要的
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        ['test1.md', '子菜单1'],
                        ['test3.md', '子菜单2']
                    ]
                },
                {
                    title: '测试菜单2',
                    collapsable: false, // 可选的, 默认值是 true,
                    children: [
                        ['test2.md', '子菜单1']
                    ]
                }
            ],
        }
    }
}