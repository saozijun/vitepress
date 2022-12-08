# 监听 Watch

监听函数跟计算属性是有点类似的！
不同的是

1. 计算属性监听的是 方法里面的参数
2. 监听属性监听的是 数据本身

### 🌰 举个例子 

```js
data() {
  return {
    count: 0
  }
},
watch: {
  count: function(newVal, oldVal) {
    console.log(newVal, oldVal)
  }
}
```

当你从别的地方改变 `count` 那么它就会做出对应的方法，你可以把它理解成一个按钮！只不过不是用鼠标点击的按钮，而是你只要通过某些操作让这个数字变了，它就会去触发相应的方法！

 下面是关于它的一些其他参数设置

### handler 属性

watch 方法其实默认写的就是这个 handler。  
当 name 发生改变时, handler 方法就会执行。

```js
watch: {
  name: {
    handler(newVal, oldVal) {
      console.log(newVal)
    }
  }
}
```

### immediate 属性

设置这个参数会让在你页面刚加载出来的时候【立马执行一次先】

```js
watch: {
  name: {
    handler(newVal, oldVal) {
      console.log(newVal)
    },
    immediate: true
  }
}
```

### deep 属性【深度监听】

这个会比较重要，有时候你需要监听【对象】【嵌套数组】！  
如果你没有打开这个【深度监听】你要一个一个去设置要监听的具体对象，很麻烦，很不可靠...

```js
data() {
  return {
    product: {
      name: '',
      count: '',
      title: ''
    }
  }
},

watch: {
  'product.name': function(newValue){
    console.log(newValue)
  },
  'product.count': function(newValue){
    console.log(newValue)
  },
  'product.title': function(newValue){
    console.log(newValue)
  }
}
```

deep 属性代表是否深度监听，默认值是 false。  
当设置为 true 时，会对对象里面的每个属性进行侦听。

```javascript
data() {
  return {
    product: {
      name: '',
      count: '',
      title: ''
    }
  }
},

watch: {
  product: {
    handler: function (newVal) {
      console.log(newVal);
    },
    deep: true,
  },
},
```
这样！只要 `product` 里面任何一个数发生变化，都会被监听到！
