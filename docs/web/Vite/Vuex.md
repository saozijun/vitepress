# Vuex


Vuex 是 【状态管理】,可以把它理解成一个【公共组件】，里面定义着一些公用的数据，哪里都可以很方便的调用，这在 Vue 项目这些组件化的应用里起到很重要的作用！就是可以把一些各组件/页面需要同步的数据定义在这里。

Vuex 现在出到第五了... 应该说第四版本。【Pinia】是下一代，而且用起来方便。但是小程序/uni-app 都还在用 Vuex 做管理，反正他们都差不多，都要学。
:::  danger 注意啦！！！
 Vue3 用 【 Pinia 】！！！
:::


::: tip Vue3 使用 Vuex 👇

1. `useStore` 可以拿到整个 vuex
2. 在 setup 中将 `useStore` 赋值变量
3. 不使用`<script setup>`的时候，在计算属性中，用 return 返回其中的数据

```vue
<script lang="ts" setup>
//引入
import { ref, computed } from "vue";
import { useStore } from "vuex"; //就是这个👈

//实例
let store = useStore(); //就是这个👈

//用计算属性来获取！
let count = computed(() => store.state.count); //就是这个👈
console.log(count.value);
</script>
```

:::

## 安装

```sh
npm install vuex --save
```

## 引入

### ✌【Vue2】✌

```javascript
// src/store/index.js👇
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default = new Vuex.Store({
  state: {
    count: 0 //设定初始状态
    str: "Hello",
  },
  mutations: {},
  actions: {},
  getters: {}
})
```

```javascript
// main.js
//其他引入...
import store from "./store"; //👈引入这个

new Vue({
  el: "#app",
  store, //👈在这挂载使用
});
```

### 👌【Vue3】👌

```ts
// src/store/index.ts👇
import { createStore } from "vuex";

const store = createStore({
  state: {
    count: 0 //设定初始状态
    str: "Hello",
  },
  mutations: {},
  actions: {},
  getters: {},
});

export default store;
```

```ts
//main.ts 入口文件
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"; //👈引入这个

const app = createApp(App);
app.use(router).use(store).mount("#app"); //👈在这挂载使用
```

## ⛺【State】设置初始值

```javascript
// 【Vue2】src/store/index.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0 //设定初始状态
    str: "Hello",
  },
});
```

```ts
// 【Vue3】src/store/index.ts👇
import { createStore } from "vuex";

const store = createStore({
  state: {
    count: 0 //设定初始状态
    str: "Hello",
  },
});

export default store;
```

## 获得值

### ✌【Vue2】✌

```javascript
console.log(this.$store.state.count);
```

```html
<div>{{$store.state.count}}</div>
```

### 👌【Vue3】👌

```ts
import { computed } from "vue";
import { useStore } from "vuex";

let store = useStore();

//用计算属性来获取！
let count = computed(() => store.state.count);
console.log(count.value);
```

```html
<div>{{store.state.count}}</div>
```

## 对象展开运算符

### ✌【Vue2】✌

```javascript
computed: {
    ...mapState([
        'count',
        'str'
    ])
}
```

```html
<div>{{count}}</div>
<div>{{str}}</div>
```

### 👌【Vue3】👌

> 参考：[CSDN | vue3-setup 中使用 mapState](https://blog.csdn.net/W_Zhulin/article/details/124333887?ops_request_misc=&request_id=&biz_id=102&utm_term=vue3%20vuex%20mapState&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-3-124333887.142^v32^experiment_2_v1,185^v2^tag_show&spm=1018.2226.3001.4187)  


> 或者使用 Pinia~


...查了一下，Vue3写Vuex的mapState真的很不优雅... Vue3的话用Pinia吧！Pinia确实简洁明了很多！！！！！  

这里接下来就当复习Vue2吧，毕竟现在很多公司还是在用Vue2的...


## ⛺【Mutation】改值

> mutation 都是同步事务

### 定义方法 👇【2/3一样】

```javascript
//src/store/index.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    str: "Hello",
  },
   mutations: {
    add(state) {
      state.count++;
    },
    str(state, data) {
      state.str = data;
    }
  },
});
```

### 调用方法

### ✌【Vue2】✌
```javascript
countAdd(){
  this.$store.commit('add')
}
Change(){
  this.$store.commit('str','world')
}
```

### 👌【Vue3】👌
```js
const countAdd = () => {
    store.commit('add')
}
```

### ⛺【Mutation 辅助函数】

-  **`mapState` 在 `computed` 里，而 `mapMutations` 是在 `methods` 方法里**

```javascript
import { mapMutations } from "vuex";

export default {
  // ...
  methods: {
    ...mapMutations([
      "add",
      // 将 `this.increment()` 映射为 `this.$store.commit('add')`
    ]),
    ...mapMutations({
      add: "increment",
      // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
  },
};
```


## ⛺【Getter】

- getters 从表面是获得的意思，可以把他看作在获取数据之前进行的一种再编辑,相当于对数据的一个过滤和加工。可以把它看作 store.js 的计算属性。

```javascript
const store = new Vuex.Store({
  state: {
    count: 1,
  },
  mutations: {
    add(state) {
      state.count++;
    },
    reduce(state) {
      state.count--;
    },
  },
  getters: {
    //过滤，就是把运算过程拉到这个地方来
    count: function (state) {
      return (state.count += 100);
    },
    //在输出前 加上一百
  },
});
```

### 通过属性访问

Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值：

```javascript
this.$store.getters.count // -> 101
```
```html
<div>{{$store.getters.count}}</div>
```
Vue3 其实就把 `$store` 变成 `store`，因为在 `setup` 里没有 `this` 鸭！
### Getter 也可以接受其他 getter 作为第二个参数：

```javascript
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length; //输出todolist的条数
  };
}
```

获得👇

```javascript
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

注意，getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的。

### `mapGetters` 辅助函数

`mapGetters` 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

```javascript
import { mapGetters } from "vuex";

export default {
  // ...
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      "doneTodosCount",
      "anotherGetter",
      // ...
    ]),
  },
};
```

Vue3.....

## ⛺【Action】

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。
- 简单点说就是在 index.js 这个文件里 Action 来调用 mutations 里的方法

让我们来注册一个简单的 action：

```javascript
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    add(state) {
      state.count++;
    },
    reduce(state) {
      state.count--;
    },
  },
  actions: {
    addAction(context) {
      context.commit("add", 10);
      //可以把这里的context理解成像上面的state一样，
      //而又因为要触发mutations需要使用到commit 所以就整体变成了context.commit
    },
    reduceAction({ commit }) {
      commit("reduce");
    },
  },
});
```

- `context`：上下文对象，这里你可以理解称 store 本身。
- `{commit}`：直接把 commit 对象传递过来，可以让方法体逻辑和代码更清晰明了。

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
- 可以调用 context.commit 提交一个 mutation
- 或者通过 context.state 和 context.getters 来获取 state 和 getters。

### 调用 👇 【mapActions 辅助函数】

```html
<p>
  <button @click="addAction(可以加参数)">+</button>
  <button @click="reduceAction">-</button>
</p>
```

```javascript
import { mapState,mapMutations,mapActions} from 'vuex';
//...
methods:{
    ...mapMutations([
        'add','reduce'
    ]),
    ...mapActions(['addAction','reduceAction'])
},
```

### 增加异步检验

我们现在看的效果和我们用 Mutations 作的一模一样，肯定有的小伙伴会好奇，那 actions 有什么用，我们为了演示 actions 的异步功能，我们增加一个计时器（setTimeOut）延迟执行。在 addAction 里使用 setTimeOut 进行延迟执行。

```javascript
setTimeOut(() => {
  context.commit(reduce);
}, 3000);
console.log("我比reduce提前执行");
//这些是写在actions里面的！
```

- 简单点说，如果是使用 mutations 就要等 3 秒后执行了这个任务才往下走  
- 而使用 actions 异步就是，你这边还要三秒后才执行，那就先等着，我先执行下面的，等三秒后我再回来执行你~

---

### 分发 Action （也就是使用、调用）

Action 通过 `store.dispatch` 方法触发：

```javascript
store.dispatch("increment");
```

乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？实际上并非如此，还记得 mutation 必须同步执行这个限制么？Action 就不受约束！我们可以在 action 内部执行异步操作：

```javascript
actions: {
  incrementAsync ({ commit }) {
    //这里要么写{commit} 要么写 context
    setTimeout(() => {
      commit('increment')
      //如果上面写了{commit} 这里就写commit
      //如果上面写了context 这里就写context.commit
    }, 1000)
  }
}
```

Actions 支持同样的载荷方式和对象方式进行分发：（也就是可以添加参数，这里的专业名词什么“载荷”、什么“分发”，其实就是参数、调用）

```javascript
// 以载荷形式分发
//dispatch的英文单词意思是 -> 派遣、发送、处理
store.dispatch("incrementAsync", {
  amount: 10,
});

// 以对象形式分发
store.dispatch({
  type: "incrementAsync",
  amount: 10,
});
```

> 👆 这个和 mutation 一样

### 在组件中分发 Action

```javascript
import { mapActions } from "vuex";

export default {
  // ...
  methods: {
    ...mapActions([
      "increment", // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      "incrementBy", // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: "increment", // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),
  },
};
```

> 跟其他的分发一样.....

### 组合 Action

Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？
首先，你需要明白 store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise：

```javascript
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```

现在你可以：

```javascript
store.dispatch("actionA").then(() => {
  // ...
});
```

在另外一个 action 中也可以：

```javascript
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

最后，如果我们利用 async / await，我们可以如下组合 action：

```javascript
// 假设 getData() 和 getOtherData() 返回的是 Promise

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。

## ⛺【Module】

随着项目的复杂性增加，我们共享的状态越来越多，这时候我们就需要把我们状态的各种操作进行一个分组，分组后再进行按组编写。

```javascript
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}
//比如这里分了A B 两组 A管理的是什么什么东西 ，
//B管理的是另外的东西，（哪怕有相同的变量也互不干扰）
//然后把之前写改成分组的方式来传递到组件中去使用
const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
//下面这个是使用方法：就是在拿状态的值时要区分是a，还是b。
store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

---

使用 👇

```html
<h3>{{$store.state.a.count}}</h3>
```

```javascript
computed:{
    count(){
        return this.$store.state.a.count;
    }
},
```
