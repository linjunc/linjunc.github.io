import { defineConfig } from 'vitepress'
import { markdown, sidebar } from './configs/index'
import { SearchPlugin } from 'vitepress-plugin-search'
//default options
const searchOptions = {
    previewLength: 62,
    buttonLabel: 'Search',
    placeholder: 'Search docs'
}
export default defineConfig({
    title: '小丞前端日记', // 显示在左上角的网页名称以及首页在浏览器标签显示的text名称
    description: '小丞同学的博客，致力于分享高质量的 React,JS 相关博文', // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/avatar.jpg' }], //浏览器的标签栏的网页图标
        [
            'link',
            {
                rel: 'stylesheet',
                href: 'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css'
            }
        ],
        [
            'script',
            {
                src: 'https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js'
            }
        ]
    ],
    appearance: true,
    markdown,
    lastUpdated: true, // string | boolean
    themeConfig: {
        logo: '/avatar.jpg',
        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/linjunc/linjunc.github.io'
            }
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present linjunc'
        },
        // darkModeSwitchLabel: true,
        nav: [
            { text: '首页', link: '/' },
            {
                text: '各类知识点',
                items: [
                    { text: '前端总结', link: '/pages/summary/ts.md' },
                    { text: 'TS 类型挑战', link: '/pages/tschallenge/easy.md' },
                    { text: '计算机网络', link: '/pages/network/overview.md' },
                    {
                        text: '数据结构和算法',
                        link: '/pages/structure/start.md'
                    },
                    { text: 'CSS 布局方式', link: '/pages/css/layout/flex.md' }
                ]
            },
            {
                text: '前端面试合集',
                items: [
                    {
                        text: '面试题精选',
                        link: '/pages/interview/heading/best1.md'
                    },
                    {
                        text: '面试题合集',
                        link: '/pages/interview/all/html.md'
                    },
                    {
                        text: '手写系列',
                        link: '/pages/handwriting/handwriting.md'
                    },
                    {
                        text: '算法合集',
                        link: '/pages/algorithm/algorithm.md'
                    }
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
                    {
                        text: 'React 源码解析',
                        link: '/pages/react/hard/fiberidea.md'
                    }
                    // { text: 'Mobx', link: '/pages/mobx/test2.md' },
                ]
            },
            {
                text: '关于我',
                items: [
                    { text: '关于我', link: '/pages/about/about.md' },
                    { text: 'GitHub', link: 'https://github.com/linjunc' },
                    {
                        text: '掘金',
                        link: 'https://juejin.cn/user/1460594842018446'
                    },
                    { text: 'CSDN', link: 'https://blog.csdn.net/m0_50855872' }
                ]
            }
        ],
        sidebar
    }
})
