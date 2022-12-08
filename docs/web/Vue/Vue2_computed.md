# 计算 computed

计算属性 `computed` 其实就是一个函数！他是一个会自动去触发的函数！！  
平时我们写的那些方法都在 `methods` 里 需要我们设置一个【button按键】去触发！  
而这个函数不是用普通的按键去触发的！触发它的条件是它要计算的数 变了！  

什么意思呢？！ 

### 🌰 举个例子

```js
data(){
  return: {
    firstName:"谢",
    lastName:"夏戈"
  }
}
computed: {
  fullName() {
    return this.firstName + this.lastName
  }
}
```
1. 设置 `computed` 跟设置 `methods` 一样！ 它里面也是方法！
2. 这个 `fullName` 方法把 `姓` 和 `名` 也就是 `firstName` `lastName` 组合在了一起！
3. 这时候！我们在需要的位置上调用 `fullName` 就可以了！
4. 而它的特性就在于！当 `firstName` 或 `lastName` 发生了变化，它会重新计算 `fullName`

::: tip
- 通常我们把这种会因为某些事情而自动触发的函数叫作：【钩子函数】【回调函数】
- 类似的还有【监听watch】【生命周期钩子函数】，都会在特定的条件下触发！
::: 




## 底层原理
> 初学者可以暂时不了解

Vue2 里的 `computed` 的底层原理是 ES6里的 `Objcet.defineProperty` 

```js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```
- `setter`: 每次修改 `fullName` 时将姓赋值给 `firstName`，将名赋值给 `lastName`。
- `getter`: 每次获取 `fullName` 时将 `firstName` 和 `lastName` 拼接后返回。

---

1. 要用的属性不存在，比如 `fullName` ，要通过已有属性计算得来
2. 底层原理借助了 `Objcet.defineproperty` 方法提供的 `getter` 和 `setter` 
3. `get` 函数什么时候执行？
   1. 初次读取时会执行一次
   2. 但依赖的数据发生改变时会被再次调用
4. 优势：与 `methods` 相比，内部有缓存机制（复用），效果更高
5.  备注：
   1. 计算属性最终会出现在 `vm` 上，直接读取使用即可
   2. 如果计算属性要被修改，必须写 `set` 函数去响应修改且 `set` 中要引起计算时依赖的数据发生！



