#  Pinia

Pinia类似Vuex是状态管理工具，但是听说Pinia比Vuex更加优秀！更加简单易用，好学！
##  安装
```sh
npm install pinia
```
或者👇
```sh
yarn add pinia
```

##  引入
###  Vue3:
```typescript
//main.ts
import { createPinia } from 'pinia'

app.use(createPinia())
```
```ts
// src/store/index.ts
import { defineStore} from 'pinia'

export const mainStore = defineStore('main',{
  state:()=>{
    return {
        count:0,
        str:'volcano！'
    }
  },
  getters:{},
  actions:{}
})
```
<!-- ###  Vue2:
在vue2中使用，还需要安装一个插件将create注入`pinia`
```typescript
//main.ts
import { createPinia PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinpa = cretePinia()
``` -->
##  获取数据
```vue
<template>
    {{ store.count }}
    {{ store.str }}
    <button @click="Count_add">增加</button>
</template>


<script setup lang="ts">
  //引入
  import { mainStore } from '../store/index'
  
  //实例
  const store = mainStore()
  
  //直接修改数据
  let Count_add = () => {
    store.count++
  }
</script>
```
###  storeToRefs - 解构

解构以后可以直接在上面使用，而不必使用 `store.count`
```vue
<template>
    {{ count }}
    {{ str }}
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { mainStore } from '../store'
const store = mainStore()

// 解构出来👇
const { count,str } = storeToRefs(store)
</script>
```

##  修改数据
###  方法一：直接修改
这是真的看起来！很方便，比对起Vuex！不是我说.
```ts
import { mainStore } from '../store/index'
const store = mainStore()

store.count++
```
###  方法二：使用$patch 批量更新
```ts
import { mainStore } from '../store/index'
const store = mainStore()

let Count_add = () => {
    // Store.count++
    store.$patch({
        count: store.count + 1,
        str: "是大帅哥！！！"
    })
}
```
###  方法三：更好的批量更新
```ts
let Count_add = () => store.$patch(state => {
    state.count++
    state.str = "是大帅哥！！！"
})
```
1. 普通多次修改，每修改一次数据，模板更新一次，
2. patch是把所有数据都同时修改完成后，模板一次全给更新了！有利于性能！【推荐】
###  方法四：actions
类似组件的 methods 封装组件的业务逻辑 修改state

- 逻辑比较多的时候可以封装到 actions 做处理
- 【注意】：不要使用箭头函数定义 actions（因为箭头函数里 this指向问题！）
```ts
//【actions】设置
//store/index.ts
import { defineStore } from "pinia";
export const mainStore = defineStore('main',{
    state:()=>{
        return{
            count:0,
            str:'volcano！',
        }
    },

    // 类似于组件的computed 用来封装计算属性，有缓存功能
    getters:{},

    //类似组件的 methods 封装组件的业务逻辑 修改state
    actions:{
        changeState(){
            this.count++
            this.str = '是大帅哥！！！'
        }
    },
})
```
```ts
//【actions】调用
import { mainStore } from '../store/index'
const store = mainStore()

const button = () => {
  store.changeState()//可以传参store.changeState(10)
}
```

##  getters
类似于组件的computed 用来封装计算属性，有缓存功能
```typescript
//store/index.ts
state:()=>{
        return{
            count:0,
            str:'volcano！',
            phone:'15139333888'
        }
    },

    // 类似于组件的computed 用来封装计算属性，有缓存功能
    getters:{
        PhoneHidden(state){
            console.log("getters")
            return state.phone.toString().replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')
        }
    },
```
```html
<div>{{ store.PhoneHidden }}</div>
```
##  Pinia中Store的相互调用
在store文件夹下新建cxc.ts
```typescript
import { defineStore  } from "pinia";

export const cxcStore = defineStore('cxc',{
    state:()=>{
        return{
            list:[11,22,33],
        }
    },
})
```
在index.ts中调用
```typescript
import { defineStore } from "pinia";
import { cxcStore } from './cxc'

export const mainStore = defineStore('main', {
    state: () => {
        return {
            count: 100,
					//...
        }
    },

    // 类似于组件的computed 用来封装计算属性，有缓存功能
    getters: {
        //...
    },

    //类似组件的 methods 封装组件的业务逻辑 修改state
    actions: {
        //...
        getList(){
            console.log(cxcStore().list)
        }
    },
})
```

## Pinia监听数值的变化 - $subscribe
可以在app.vue里或者其他组件里设置这样一个回调函数👇
```js
import { storeToRefs } from 'pinia';

//引进Pinia仓库
const store = mainStore()

// 【监听数据】
store.$subscribe((mutation, state) => {
  //  mutation主要包含三个属性值：
  //  events：当前state改变的具体数据，包括改变前的值和改变后的值等等数据
  //  storeId：是当前store的id
  //  type：用于记录这次数据变化是通过什么途径，主要有三个分别是
  //         “direct” ：通过 action 变化的
  //           ”patch object“ ：通过 $patch 传递对象的方式改变的
  //           “patch function” ：通过 $patch 传递函数的方式改变的
  // 
  console.log(mutation)
  console.log(state)
}, { detached: false })  
//第二个参数options对象，是各种配置参数
//1. detached默认是 false，当订阅所在的组件被卸载时，订阅将被删除
//2. detached值为 true 时，即使所在组件被卸载，订阅依然在生效
```