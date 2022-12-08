# 过滤器 filters

过滤器，就是... 就是过滤用的...

它可以帮你把一些数据通过 `filters` 这个 类似 计算属性的方法帮你过滤、筛选！

### 🌰 举个例子 

```html
<div>{{ message | filteName }}</div>

<div v-bind:id="message | filteName"></div>
```
```javascript
//局部
filters: {
  'filteName': function(value) {
    return value + 'cxc'
  }
}
```
从上面可以看到 在过滤的过程中，把每个进来的数据后面都多加一个 `cxc` 然后返回回去~

::: danger 注意
filters过滤器在Vue3.0中已经删除了，不再支持！
:::