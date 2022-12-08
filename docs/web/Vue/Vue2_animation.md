# Vue 过渡 & 动画

过渡动画初学者也可以暂时不学，毕竟只是一个优化展示效果的，没他一样可以做出网站网页~

```vue
<template>
  <div>

    <transition name="fade">
      <p v-show="show">hello !</p>
    </transition>
	
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
```

可以理解为在【p 这个标签】通过 `v-show` 出现的时候，外层包裹着`transition`!  
这个`transition`通过它的`name`属性，让它有了动画效果！

- v-enter：进入阶段的开始
- v-enter-active：整个进入的过程
- v-enter-to: 进入阶段的结束

---

- v-leave: 离开阶段的开始
- v-leave-active：整个离开的过程
- v-leave-to: 离开阶段的结束

前缀这个`v`就是`transition`的`name`属性的名字！

![图 15](img/8bd7b265547579e122ecec58cfcf8b40be0433157ab69a063d3386ac24a847ee.png)
