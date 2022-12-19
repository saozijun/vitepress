import { defineConfig } from "vitepress"

export default defineConfig({
  base: '/docs/',
  title: 'volcnao',
  outDir: '../dist',
  description: 'Volcano',
  appearance: true, //主题是否可以切换
  ignoreDeadLinks: true,//设置为true后，VitePress 不会因死链接而使构建失败。true
  lang: 'zh-CN',
  lastUpdated: true,//文档最后更新时间
  markdown: { //markdown的风格样式
    theme: 'material-palenight',
    lineNumbers: true
  },
  server: {
    proxy: {
      "/search": {
        target: "https://www.saozijun.vip",
        changeOrigin:true
      },
    },
  },
  titleTemplate: '喜晴',
  themeConfig: {
    logo: '../img/logo.png',
    siteTitle: "volcano『 博客 』",
    outlineTitle: '🍇🍈🍉🍊🍋🍌🍍🥭🍎🍏',
    outline: [2, 6],
    // socialLinks: [
    //   { icon: 'github', link: '#' },
    //   { icon: 'twitter', link: '#' },
    // ],
    nav: [
      { text: '首页', link: '/' },
      {
        text: '前端',
        items: [
          { text: '网站制作入门', link: '/web/FrontEnd/tutorial' },
          { text: 'HTML', link: '/web/html/HTML' },
          { text: 'Css', link: '/web/css/css' },
          { text: 'Javascript', link: 'web/JavaScript/JavaScript' },
          { text: 'TypeScript', link: 'web/TypeScript/TypeScript' },
          { text: 'Vue', link: 'web/Vue/Vue' },
          { text: 'Vue脚手架', link: 'web/Vite/Vite' }
        ]
      },
      {
        text: '后端',
        items: [
          { text: 'Node', link: '/backend/Node/Node' },
        ]
      },
      {
        text: '网易云音乐',
        link: '/music/music' 
      }
    ],
    sidebar: {
      "/web/FrontEnd": [
        {
          text: "🍳〖零基础〗",
          collapsible: true,
          items: [
            { text: "🖥️ 如何制作网站?", link: "/web/FrontEnd/tutorial" },
            { text: "👋 Hello World", link: "/web/FrontEnd/HelloWorld" },
            { text: "⚔️ 趁手兵器", link: "/web/FrontEnd/Weapons" },
            { text: "🎗️ 介绍前端三剑客", link: "/web/FrontEnd/intro" },
            {
              text: "🚧 前端学习路径",
              link: "/web/FrontEnd/LearningPath",
            },
          ],
        },
      ],
      '/web/html/HTML': [
        {
          text: 'HTML',
          collapsible: true,
          items: [
            { text: '学习路线', link: '/web/html/HTML' },
            { text: '学习笔记', link: '/web/html/HTML_note' },
          ]
        },
        {
          text: 'HTML5',
          collapsible: true,
          items: [
            { text: '介绍', link: '/web/html/HTML5' },
            { text: 'Web存储', link: '/web/html/HTML5_webstorage' },
          ]
        }
      ],
      '/web/css/css': [
        {
          text: 'css',
          collapsible: true,
          items: [
            { text: '学习路线', link: '/web/css/css' },
            { text: '学习笔记', link: '/web/css/css_note' },
            { text: '代码片段', link: '/web/css/css_code_slice' },
            { text: '选择器', link: '/web/css/css_selector' },
            { text: '雪碧图', link: '/web/css/css_sprite' },
          ]
        },
        {
          text: 'HTML5',
          collapsible: true,
          items: [
            { text: '介绍', link: '/web/html/HTML5' },
            { text: 'Web存储', link: '/web/html/HTML5_webstorage' },
          ]
        }
      ],
      "web/JavaScript": [
        {
          text: "JavaScript",
          collapsible: true,
          items: [
            {
              text: "学习路径",
              link: "web/JavaScript/JavaScript",
            },
            { text: "学习笔记", link: "web/JavaScript/JS_Note" },
            {
              text: "代码片段",
              link: "web/JavaScript/JS_CodeSnippet",
            },
            { text: "JS 事件", link: "web/JavaScript/JS_events" },
            {
              text: "JS Map 和 Set",
              link: "web/JavaScript/JS_MapSet",
            },
          ],
        },
        {
          text: "JS - 方法",
          collapsible: true,
          items: [
            { text: "Math数学方法", link: "web/JavaScript/JS_Math" },
            { text: "Date日期/时间", link: "web/JavaScript/JS_Date" },
            { text: "JS 数组方法", link: "web/JavaScript/JS_Array" },
            {
              text: "JS 数组遍历",
              link: "web/JavaScript/JS_ArrayEach",
            },
            {
              text: "JS 数组查找",
              link: "web/JavaScript/JS_ArrayFind",
            },
            {
              text: "JS 数组删除",
              link: "web/JavaScript/JS_ArrayDelete",
            },
            {
              text: "JS 数组批量删除",
              link: "web/JavaScript/JS_ArrayBatchesDelete",
            },
            { text: "JS 对象方法", link: "web/JavaScript/JS_Object" },
            {
              text: "JS 字符串方法",
              link: "web/JavaScript/JS_String",
            },
            {
              text: "JS 类型转换",
              link: "web/JavaScript/JS_ChangeType",
            },
          ],
        },
        {
          text: "ES6",
          collapsible: true,
          items: [
            { text: "ES6", link: "web/FrontEnd/JavaScript/JS_ES6" },
            { text: "ES6 Class", link: "web/FrontEnd/JavaScript/JS_ES6_Class" },
            { text: "JS 模块化", link: "web/FrontEnd/JavaScript/JS_module" },
            {
              text: "JS 深拷贝-浅拷贝",
              link: "web/FrontEnd/JavaScript/JS_Copy",
            },
          ],
        },
      ],
      "/web/TypeScript": [
        {
          text: "TypeScript",
          collapsible: true,
          items: [
            { text: "TypeScript", link: "/web/TypeScript/TypeScript" },
            {
              text: "接口 interface",
              link: "/web/TypeScript/TS_interface",
            },
            { text: "数组的类型", link: "/web/TypeScript/TS_Array" },
            { text: "函数的类型", link: "/web/TypeScript/TS_Funsion" },
            {
              text: "类型断言 as",
              link: "/web/TypeScript/TS_assertion",
            },
            { text: "声明文件", link: "/web/TypeScript/TS_declare" },
            { text: "内置对象", link: "/web/TypeScript/TS_objects" },
            { text: "类型别名 type", link: "/web/TypeScript/TS_type" },
            { text: "元组 tuple", link: "/web/TypeScript/TS_tuple" },
            // { text: '枚举 enum', link: '/web/TypeScript/TS_enum' },
            // { text: '类 class', link: '/web/TypeScript/TS_class' },
            { text: "泛型 <?>", link: "/web/TypeScript/TS_generic" },
            {
              text: "TypeScript 笔记",
              link: "/web/TypeScript/TS_Note",
            },
          ],
        },
      ],
      "/web/Vue": [
        {
          text: "Vue",
          collapsible: true,
          items: [
            { text: "Vue", link: "/web/Vue/Vue" },
            { text: "Vue 笔记", link: "/web/Vue/Vue_Note" },
          ],
        },
        {
          text: "Vue2",
          collapsible: true,
          items: [
            { text: "Vue2 事件", link: "/web/Vue/Vue2_events" },
            {
              text: "Vue2 计算 computed",
              link: "/web/Vue/Vue2_computed",
            },
            { text: "Vue2 监听 Watch", link: "/web/Vue/Vue2_watch" },
            {
              text: "Vue2 过滤器 filters",
              link: "/web/Vue/Vue2_filters",
            },
            { text: "Vue2 生命周期", link: "/web/Vue/Vue2_life" },
            {
              text: "Vue2 父子组件通信",
              link: "/web/Vue/Vue2_components",
            },
            {
              text: "Vue2 keep-alive",
              link: "/web/Vue/Vue2_keep-alive",
            },
            { text: "Vue2 插槽 slot", link: "/web/Vue/Vue2_slot" },
            { text: "Vue2 过渡动画", link: "/web/Vue/Vue2_animation" },
            {
              text: "Object.defineProperty",
              link: "/web/Vue/Vue2_defineProperty",
            },
          ],
        },
        {
          text: "Vue3",
          collapsible: true,
          items: [
            { text: "Vue3", link: "/web/Vue/Vue3" },
            { text: "Vue3 setup", link: "/web/Vue/Vue3_setup" },
            { text: "Vue3 生命周期", link: "/web/Vue/Vue3_生命周期" },
            { text: "Vue3 父子组件", link: "/web/Vue/Vue3_components" },
            { text: "Vue3 监听", link: "/web/Vue/Vue3_watch" },
            { text: "Vue3 计算", link: "/web/Vue/Vue3_computed" },
            { text: "Vue3 绑定元素", link: "/web/Vue/Vue3_ref" },
            { text: "Vue3 过滤", link: "/web/Vue/Vue3_filters" },
          ],
        },
      ],
      "/web/Vite": [
        {
          text: "🛠️ 脚手架 / Vue全家桶",
          collapsible: true,
          items: [
            { text: "Vite", link: "/web/Vite/Vite" },
            { text: "Vite 安装 Sass", link: "/web/Vite/Vite_Sass" },
            {
              text: "Vite 安装 VueRouter",
              link: "/web/Vite/Vite_VueRouter",
            },
            { text: "Vite 安装 Vuex", link: "/web/Vite/Vite_Vuex" },
            { text: "Vite 区分环境", link: "/web/Vite/Vite_env" },
            {
              text: "Vite 跨域 - 开发环境",
              link: "/web/Vite/Vite_cors",
            },
            { text: "Vue Cli", link: "/web/Vite/VueCli" },
            { text: "网页样式初始化", link: "/web/Vite/CSS_init" },
            { text: "📱 移动端优化与适配", link: "/web/Vite/Mobile" },
            { text: "Vue + Sass", link: "/web/Vite/Vue_Scss" },
            { text: "VueRouter", link: "/web/Vite/VueRouter" },
            { text: "Vuex", link: "/web/Vite/Vuex" },
            { text: " Pinia", link: "/web/Vite/Pinia" },
            { text: "Axios", link: "/web/Vite/Axios" },
            {
              text: "Axios + Vue3 封装/跨域",
              link: "/web/Vite/Axios_Vue3",
            },
            {
              text: "Axios + Vue2 封装/跨域",
              link: "/web/Vite/Axios_Vue2",
            },
          ],
        },
      ],
      "/backend/": [
        {
          text: "Node",
          collapsible: true,
          items: [
            { text: "Node", link: "/backend/Node/Node" },
            { text: "Node - os模块", link: "/backend/Node/Node_os" },
            { text: "Node - fs模块", link: "/backend/Node/Node_fs" },
            { text: "Node - http模块", link: "/backend/Node/Node_http" },
          ],
        },
        {
          text: "Express 教程",
          collapsible: true,
          items: [
            { text: "Express 入门", link: "/backend/Express/Express" },
            { text: "Nodemon 热加载", link: "/backend/Express/Nodemon" },
            { text: "Route 路由", link: "/backend/Express/Express_Route" },
            {
              text: "static 静态资源",
              link: "/backend/Express/Express_static",
            },
            { text: "CORS 跨域", link: "/backend/Express/Express_CORS" },
            {
              text: "Express + 🐬 MySQL",
              link: "/backend/Express/Express_MySQL",
            },
            { text: "JWT 认证机制", link: "/backend/Express/Express_JWT" },
            {
              text: "bcryptjs 密码加密",
              link: "/backend/Express/Express_bcryptjs",
            },
            {
              text: "multer 上传文件",
              link: "/backend/Express/Express_multer_file",
            },
            {
              text: "【前端】上传头像",
              link: "/backend/Express/Express_multer_avater",
            },
          ],
        },
        {
          text: "+ + 🐬",
          collapsible: true,
          items: [
            {
              text: "Express 项目案例流程",
              link: "/backend/Express/Express_Node_MySQL",
            },
          ],
        },
      ],
    },
    footer: {
      copyright: 'Copyright © 2022-present volcano'
    }
  }
})