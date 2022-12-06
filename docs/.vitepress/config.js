import { defineConfig } from "vitepress"

export default defineConfig({
    base: '/docs/',
    title: 'volcnao',
    description: 'Volcano',
    appearance: true, //主题是否可以切换
    ignoreDeadLinks: true,//设置为true后，VitePress 不会因死链接而使构建失败。true
    lang: 'zh-CN',
    lastUpdated: true,//文档最后更新时间
    markdown: { //markdown的风格样式
        theme: 'material-palenight',
        lineNumbers: true
    },
    titleTemplate: '喜晴',
    outDir: '../public',
    themeConfig: {
        logo: '../img/logo.png',
        nav: [
            { text: '首页', link: '/' },
            {
                text: '前端',
                items: [
                    { text: 'HTML', link: '/web/HTML' },
                    { text: 'css', link: '/web/css' },
                    { text: 'javascript', link: '/web/js' }
                ]
            }
        ],
        sidebar: {
              '/web/HTML':[
                {
                  text: 'HTML',
                  collapsible:true,
                  items: [
                    { text: '学习路线', link: '/web/HTML' },
                    { text: '学习笔记', link: '/web/HTML_note' },
                  ]
                },
                {
                  text: 'HTML5',
                  collapsible:true,
                  items: [
                    { text: '介绍', link: '/web/HTML5' },
                    { text: 'Web存储', link: '/web/HTML5_webstorage' },
                  ]
                }
              ],
              '/web/css':[
                {
                  text: 'css',
                  collapsible:true,
                  items: [
                    { text: '学习路线', link: '/web/css' },
                    { text: '学习笔记', link: '/web/css_note' },
                    { text: '代码片段', link: '/web/css_code_slice' },
                    { text: '选择器', link: '/web/css_selector' },
                    { text: '雪碧图', link: '/web/css_sprite' },
                  ]
                },
                {
                  text: 'HTML5',
                  collapsible:true,
                  items: [
                    { text: '介绍', link: '/web/HTML5' },
                    { text: 'Web存储', link: '/web/HTML5_webstorage' },
                  ]
                }
              ]
        },
        footer: {
            copyright: 'Copyright © 2022-present volcano'
        }
    }
})