# 插槽 slot

`<slot>`元素作为承载分发内容的出口，可以理解为一个占位符，或者说是子组件暴露的一个让父组件传入自定义内容的接口。

插槽内可以包含任何模板代码，包括 HTML，甚至其他的组件。在工作中如果你的组件内的内容是可变的，这个时候我们可以考虑使用插槽
## 默认插槽的使用
比如 这是 名叫 cxc 的组件 在里面放一个 `<slot />`的插槽
```vue
<template>
  <h1 class="cxc">
    <slot />
  </h1>
</template>
```
```html
<template>
  <div class="home">
    <cxc>这里是要显示的插槽内容！</cxc>
  </div>
</template>
```
那他们两 相结合就变成  （可以理解成 cxc 里的东西去到了 `<slot />`插槽这）
```html
<template>
  <div class="home">
    <h1 class="cxc">
      这里是要显示的插槽内容！
    </h1>
  </div>
</template>
```
## 具名插槽的使用
有了具体的名字 它就会找 具体的插槽插进去！
```html
<cxc>
  <template slot="hello">hello</template>
</cxc>
```
```js
<template>
  <div class="cxc">
    <h1>
      <slot name="hello"/>
    </h1>
    <h2>
      <slot name="world"/>
    </h2>
  </div>
</template>
```
