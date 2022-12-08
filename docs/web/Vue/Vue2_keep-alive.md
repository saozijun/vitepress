# 缓存 keep-alive

使用了 `<keep-alive>` 的组件的页面会被缓存起来，不会被销毁，包括它里面的定时器。

你可以理解为这个页面只是被隐藏起来了，但是它还在！
- keep alive 英文翻译过来就是【保持活跃】的意思

::: danger 注意！
 `<keep-alive>` 缓存的组件只有在初次渲染时才会被创建。  
所以，我们切换组件时，组件的 `生命周期 - beforeDestroy` 是不会触发。  
若该组件是第一次渲染，会触发 `生命周期 - created`  
当再次切换显示该组件时，`生命周期 - created`  不会再次触发。
:::
```html
<keep-alive>
  <router-view></router-view>
</keep-alive>
```
## activated 和 deactivated 生命周期
`activated` 和 `deactivated` 和我们之前学习的生命周期函数一样，也是组件的生命周期函数。
不过， `activated` 和 `deactivated` 只在 `<keep-alive>` 内的所有嵌套组件中触发。

- `activated`：进入组件时触发。
- `deactivated`：退出组件时触发。
```js
activated() {
  console.log('组件A 被添加')
},
deactivated() {
  console.log('组件A 被移除')
}
```
你可以理解由于 这个组件被`<keep-alive>`缓存了 导致失去了 `生命周期 - created（创建）` `生命周期 - beforeDestroy（组件销毁）`，为了还能有他们的周期特性而补上来的两个

## include 和 exclude
include 和 exclude 是 keep-alive 的两个属性，允许组件有条件地缓存。  
- include： 可以是字符串或正则表达式，用来表示只有名称匹配的组件会被缓存。
- exclude： 可以是字符串或正则表达式，用来表示名称匹配的组件不会被缓存。
```html
<keep-alive include="ComponentA,ComponentB">
  <component :is="ComponentA"></component>
  <component :is="ComponentB"></component>
  <component :is="ComponentC"></component>
</keep-alive>
```
