# VueRouter


### 官方文档
VueRouter：[https://router.vuejs.org/zh/](https://router.vuejs.org/zh/)

[[toc]]

## 安装
### Vue2、Vue3安装
虽然大多数时，@vue/cli在搭建的时候都可以选择配置好~
```sh
npm install vue-router
```

### Vite安装
```sh
npm add vue-router@next
```
## 引入 【✌ != 👌】
### ✌【Vue2】✌
```javascript
//scr/router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
```
```javascript
//main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```
### 👌【Vue3】👌
```ts
//src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: () => import( '../views/AboutView.vue') }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
```
```ts
//main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

## 声明式导航【都一样】
```html
<router-link to="/index">首页</router-link>；
```
`<router-view>`：该组件将渲染路由匹配到的组件内容。
```html
<router-view />
```

## 编程式导航【✌ != 👌】
| 声明式 | 编程式 |
| :-: | :-: |
| `<router-link :to="...">` | `router.push(...)` |

- `router.push`
###  ✌【Vue2】✌
```javascript
//vue2里
methods: {
  btn() {
    
    this.$router.push('home') // 字符串形式的参数
    
    this.$router.push({ path: 'home' }) // 通过路径描述地址
    
    this.$router.push({ name: 'user' }) // 通过命名的路由描述地址
  }
}
```
###  👌【Vue3】👌
**引入的 `useRoute` `useRouter` 相当于vue2的 `this.$route()` `this.$router()`**   
**引入的 `useRoute` `useRouter` 相当于vue2的 `this.$route()` `this.$router()`**   
**引入的 `useRoute` `useRouter` 相当于vue2的 `this.$route()` `this.$router()`**   
```javascript
//vue3里
import { useRoute, useRouter } from 'vue-router'
export default {
  setup () {
    const route = useRoute()
    const router = useRouter()
    const toHome = (() => {
      router.push({
        name: 'home'
      })
    })
    return {
      toHome
    }
  },
}
```
### 👌 `<script setup>` 👌
```vue
<script setup lang='ts'>
  import { } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  const route = useRoute()
  const router = useRouter()
  const goAbout = () => {
    router.push('/About')
  }
</script>
```
### router.replace
跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，替换掉当前的 history 记录，
【言下之意，就是点过去，然后浏览器返回按钮不会亮（不能点返回）】
```javascript
//✌【Vue2】✌
this.$router.replace('/About') 
```
```javascript
//👌【Vue3】👌
import { useRouter } from 'vue-router'
const router = useRouter()
router.replace('/About') 
```
### router.go 
这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步。例如：
```javascript
// ✌【Vue2】✌
// 在浏览器记录中前进一步
this.$router.go(1)

// 后退一步记录
this.$router.go(-1)

// 前进 3 步记录
this.$router.go(3)

// 如果 history 记录不够用，路由将不会进行跳转
this.$router.go(-100)
this.$router.go(100)
```
```ts
// 👌【Vue3】👌
import { useRouter } from 'vue-router'
const router = useRouter()
router.go(1) 
```
## 传参【✌ != 👌】
### params 传参（name）
```javascript
//路由定义 router/index.js
const routes = [
  { path: '/detail/:data', name: 'detail', component: detail },
]
```
```html
<router-link :to="{name: 'detail', params: {data: 'cxc'}}">detail</router-link>
```
### ✌【Vue2】✌
```javascript
// ✌【Vue2 传参数】✌
this.$router.push({ name: 'detail', params: { data: 'cxc' }})
```
```javascript
//✌【Vue2 接收参数】✌
let data = this.$route.params.data
console.log(data) //cxc
```

### 👌【Vue3】👌
```ts
//👌【Vue3 传参数】👌
import { useRouter } from 'vue-router'
const router = useRouter()

router.push({ name: 'detail', params: { data: 'cxc' }})
```
```ts
//👌【Vue3 接收参数】👌
import { useRoute } from 'vue-router'
const route = useRoute() 

let data = route.params.data
console.log(data) //cxc
```
### query 传参（path）
```html
<router-link :to="{path: '/detail', query: { id: cxc }}">detail</router-link>
```
### ✌【vue2】✌
```javascript
// ✌【vue2】✌
this.$router.push({ path: '/detail', query: { id: 2 }})
```
```javascript
//获取参数✌【vue2】✌
$route.query.id
this.$route.query.id
```
### 👌【vue3】👌
```ts
//👌【vue3】👌
import { useRouter } from 'vue-router'
const router = useRouter()

// 带查询参数，结果是 /register?plan=private
router.push({ path: '/About', query: { id: '3' } })
```
```ts
//👌【vue3】👌
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.query.id)
```



## 配置

### 路由嵌套
- router/router.js 路由配置 👇
- 在组件`index`中需要使用 `<router-view/>`
- 路由跳转直接写是 `/cxc`
```javascript
const routes = [
  { path: '/', component: Home },
  { 
    path: '/index', 
    component: index ,
    children: [
      {
        path: '/cxc', 
        component: cxc ,
      }
    ]
  }
]
```

### 重定向 【redirect】
```javascript
// router/index.js
const routes = [
  { path: '/', redirect: {name: 'index'} },
  { path: '/index', name: 'index', component: Index },
  { path: '/article', name: 'article', component: Article }
]

//动态返回重定向目标
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    }}
  ]
})
```
### 路由别名 【alias】
- “重定向”的意思是，当用户访问 `/a` 时，URL 将会被替换成 `/b`，然后匹配路由为 `/b`
  - 【内容变成了其他地方的内容】


- `/a` 的别名是`/b`，意味着，当用户访问 `/b` 时，URL 会保持为 `/b`，  
但是路由匹配则为 `/a`，就像用户访问 `/a` 一样。
  - 【内容还是该内容，只是url名字不一样】
```javascript
// router/index.js
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```

## 后面还有其他包括【路由守卫】以后再更新...