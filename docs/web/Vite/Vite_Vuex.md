# Vite 安装 Vuex


### 安装
```sh
npm install vuex --save
```
### 配置
👇 `src/store/index.ts` 👇
```ts
import { createStore } from 'vuex'
 
const store = createStore({
  state: {  
	  test:'test1'
  },
  mutations: {   
  },
  actions: {
  },
  getters: {
  }
})
 
export default store
```
👇 `main.ts` 👇
```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const app =  createApp(App)
app.use(router).use(store).mount('#app')
```

## 更多
更多关于 Vuex 的操作请看 [🧩 Vuex](Vuex)
