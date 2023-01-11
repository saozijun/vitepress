# ✨ 手写代码 ✨
## 手写promise(简易版)
```js
class MyPromise {
  constructor(fn){
    // 存储 reslove 回调函数列表
    this.callbacks = []
    const resolve = (value) => {
      this.data = value // 返回值给后面的 .then
      while(this.callbacks.length) {
        let cb = this.callbacks.shift()
        cb(value)
      }
    }
    fn(resolve)
  }
  then(onResolvedCallback) {
    return new MyPromise((resolve) => {
      this.callbacks.push(() => {
        const res = onResolvedCallback(this.data)
        if (res instanceof MyPromise) {
          res.then(resolve)
        } else {
          resolve(res)
        }
      })
    })
  }
}
// 这是测试案例
new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
}).then((res) => {
    console.log(res)
    return new MyPromise((resolve) => {
      setTimeout(() => {
        resolve(2)
      }, 1000)
    })
}).then(res =>{console.log(res)})
```
### Promise.all

```js
MyPromise.all = function (promisesList) {
  return new MyPromise((resolve, reject) => {
    if (!Array.isArray(promiselList) return reject(new Error('必须是数组'))
    if (!promisesList.length) return resolve([])
    let arr = [], count = 0
    // 直接循环同时执行传进来的promise
    for (let i = 0, len = promisesList.length; i < len; i++) {
      // 因为有可能是 promise 有可能不是，所以用resolve()不管是不是都会自动转成promise
      Promise.resolve(promise).then(result => {
          // 由到promise在初始化的时候就执行了，.then只是拿结果而已，所以执行完成的顺序有可能和传进来的数组不一样
          // 也就是说直接push到arr的话，顺序有可能会出错
          count++
          arr[i] = result
          // 不能用arr.length===len，是因为数组的特性
          // arr=[]; arr[3]='xx'; console.log(arr.length) 这打印出来会是4 而不是1
          if(count === len) resolve(arr)
      }).catch(err => reject(err))
    }
  })
}
```

### Promise.race
传参和上面的 all 一模一样，传入一个 Promise 实例集合的数组，然后全部同时执行，谁先快先执行完就返回谁，只返回一个结果
```js
MyPromise.race = function(promisesList) {
  return new MyPromise((resolve, reject) => {
    // 直接循环同时执行传进来的promise
    for (const promise of promisesList) {
      // 直接返回出去了，所以只有一个，就看哪个快
      promise.then(resolve, reject)
    }
  })
}
```

## 防抖和节流
函数防抖是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求。

函数节流是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。节流可以使用在 scroll 函数的事件监听上，通过事件节流来降低事件调用的频率。
```js
// 防抖
function debounce(fn, date) {
  let timer // 声明接收定时器的变量
  return function (...arg) { // 获取参数
    timer && clearTimeout(timer) // 清空定时器
    timer = setTimeout(() => { //  生成新的定时器
      // 因为箭头函数里的this指向上层作用域的this
      // 所以这里可以直接用this，不需要声明其他的变量来接收
      fn.apply(this, arg) // fn()
    }, date)
  }
}
//--------------------------------
// 节流
function debounce(fn, data) {
  let timer = new Date() // 声明初始时间
  return function (...arg) { // 获取参数
    let newTimer = new Date() // 获取触发事件的时间
    if (newTimer - timer >= data) { // 时间判断,是否满足条件
      fn.apply(this, arg) // 调用需要执行的函数,修改this值,并且传入参数
      timer = new Date() // 重置初始时间
    }
  }
}
```

## 手写Object.create
思路：将传入的对象作为原型
```js
function create(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}
```

##  手写instanceof
instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。

实现步骤：

- 首先获取类型的原型
- 然后获得对象的原型
- 最后一直循环判断对象的原型是否等于类型的原型，直到对象原型为 null，因为原型链最终为 null
```js
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left), // 获取对象的原型
      prototype = right.prototype; // 获取构造函数的 prototype 对象
  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
```

## 手写 new
（1）首先创建了一个新的空对象

（2）设置原型，将对象的原型设置为函数的 prototype 对象。

（3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）

（4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

```js
function myNew(fn, ...args) {
  // 判断参数是否是一个函数
  if (typeof fn !== "function") {
    return console.error("type error");
  }
  // 创建一个对象，并将对象的原型绑定到构造函数的原型上
  const obj = Object.create(fn.prototype);
  const value = fn.apply(obj, args); // 调用构造函数，并且this绑定到obj上
  // 如果构造函数有返回值，并且返回的是对象，就返回value ;否则返回obj
  return value instanceof Object ? value : obj;
}
```

##  手写 call 函数
call 函数的实现步骤：
1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
1. 判断传入上下文对象是否存在，如果不存在，则设置为 window 。
1. 处理传入的参数，截取第一个参数后的所有参数。
1. 将函数作为上下文对象的一个属性。
1. 使用上下文对象来调用这个方法，并保存返回结果。
1. 删除刚才新增的属性。
1. 返回结果。

```js
// call函数实现
Function.prototype.myCall = function(context) {
  // 判断调用对象
  if (typeof this !== "function") {
    console.error("type error");
  }
  // 获取参数
  let args = [...arguments].slice(1),
      result = null;
  // 判断 context 是否传入，如果未传入则设置为 window
  context = context || window;
  // 将调用函数设为对象的方法
  context.fn = this;
  // 调用函数
  result = context.fn(...args);
  // 将属性删除
  delete context.fn;
  return result;
};
```

## 手写 apply 函数
apply 函数的实现步骤：
1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
1. 判断传入上下文对象是否存在，如果不存在，则设置为 window 。
1. 将函数作为上下文对象的一个属性。
1. 判断参数值是否传入
1. 使用上下文对象来调用这个方法，并保存返回结果。
1. 删除刚才新增的属性
1. 返回结果

```js
// apply 函数实现
Function.prototype.myApply = function(context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let result = null;
  // 判断 context 是否存在，如果未传入则为 window
  context = context || window;
  // 将函数设为对象的方法
  context.fn = this;
  // 调用方法
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  // 将属性删除
  delete context.fn;
  return result;
};
```

## 手写 bind 函数
bind 函数的实现步骤：
1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
1. 保存当前函数的引用，获取其余传入参数值。
1. 创建一个函数返回
1. 函数内部使用 apply 来绑定函数调用，需要判断函数作为构造函数的情况，这个时候需要传入当前函数的 this 给 apply 调用，其余情况都传入指定的上下文对象。

```js
// bind 函数实现
Function.prototype.myBind = function(context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  // 获取参数
  var args = [...arguments].slice(1),
      fn = this;
  return function Fn() {
    // 根据调用方式，传入不同绑定值
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat(...arguments)
    );
  };
};
```

## 函数柯里化的实现
函数柯里化指的是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
```js
function curry(fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
}
```

## 手写AJAX请求
创建AJAX请求的步骤：

- 创建一个 XMLHttpRequest 对象。
- 在这个对象上使用 open 方法创建一个 HTTP 请求，open 方法所需要的参数是请求的方法、请求的地址、是否异步和用户的认证信息。
- 在发起请求前，可以为这个对象添加一些信息和监听函数。比如说可以通过 setRequestHeader 方法来为请求添加头信息。还可以为这个对象添加一个状态监听函数。一个 XMLHttpRequest 对象一共有 5 个状态，当它的状态变化时会触发onreadystatechange 事件，可以通过设置监听函数，来处理请求成功后的结果。当对象的 readyState 变为 4 的时候，代表服务器返回的数据接收完成，这个时候可以通过判断请求的状态，如果状态是 2xx 或者 304 的话则代表返回正常。这个时候就可以通过 response 中的数据来对页面进行更新了。
- 当对象的属性和监听函数设置完成后，最后调用 sent 方法来向服务器发起请求，可以传入参数作为发送的数据体。
```js
const SERVER_URL = "/server";
let xhr = new XMLHttpRequest();
// 创建 Http 请求
xhr.open("GET", SERVER_URL, true);
// 设置状态监听函数
xhr.onreadystatechange = function() {
  if (this.readyState !== 4) return;
  // 当请求成功时
  if (this.status === 200) {
    handle(this.response);
  } else {
    console.error(this.statusText);
  }
};
// 设置请求失败时的监听函数
xhr.onerror = function() {
  console.error(this.statusText);
};
// 设置请求头信息
xhr.responseType = "json";
xhr.setRequestHeader("Accept", "application/json");
// 发送 Http 请求
xhr.send(null);
```

## 使用Promise封装AJAX请求
```js
// promise 封装实现：
function getJSON(url) {
  // 创建一个 promise 对象
  let promise = new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    // 新建一个 http 请求
    xhr.open("GET", url, true);
    // 设置状态的监听函数
    xhr.onreadystatechange = function() {
      if (this.readyState !== 4) return;
      // 当请求成功或失败时，改变 promise 的状态
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    // 设置错误监听函数
    xhr.onerror = function() {
      reject(new Error(this.statusText));
    };
    // 设置响应的数据类型
    xhr.responseType = "json";
    // 设置请求头信息
    xhr.setRequestHeader("Accept", "application/json");
    // 发送 http 请求
    xhr.send(null);
  });
  return promise;
}
```

## 手写深拷贝
```js
function fn(obj) {
  // 判断数据是否是复杂类型
  if (obj instanceof Object) {
    //判断数据是否是数组
    if (Array.isArray(obj)) {
      //声明一个空数组来接收拷贝后的数据
      let result = []
      obj.forEach(item => {
        // 需要递归深层遍历，否则复制的是地址
        result.push(fn(item))
      })
      // 返回输出这个数组,数组拷贝完成
      return result
    } else {
      //如果是对象,就声明一个空对象来接收拷贝后的数据
      let result = {}
      for (let k in obj) {
        // 使用递归深层遍历
        result[k] = fn(obj[k])
      }
      // 返回输出这个对象,对象拷贝完成
      return result
    }
  }
  // 简单数据类型则直接返回输出
  return obj
}
```
## 手写打乱数组顺序的方法
主要的实现思路就是：
- 取出数组的第一个元素，随机产生一个索引值，将该第一个元素和这个索引对应的元素进行交换。
- 第二次取出数据数组第二个元素，随机产生一个除了索引为1的之外的索引值，并将第二个元素与该索引值对应的元素进行交换
- 按照上面的规律执行，直到遍历完成
```js
let arr = [1,2,3,4,5,6,7,8,9,10];
for (let i = 0; i < arr.length; i++) {
  const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
  [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
}
console.log(arr)
```

## 实现数组扁平化
```js
let arr = [1, [2, [3, 4, 5]]];
function flatten(arr) {
  let result = [];
  for(let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
flatten(arr);  //  [1, 2, 3, 4，5]
```

## 实现数组的flat方法
```js
function _flat(arr, depth) {
  if(!Array.isArray(arr) || depth <= 0) {
    return arr;
  }
  return arr.reduce((prev, cur) => {
    if (Array.isArray(cur)) {
      return prev.concat(_flat(cur, depth - 1))
    } else {
      return prev.concat(cur);
    }
  }, []);
}
```
## 实现数组的push方法
```js
let arr = [];
Array.prototype.push = function() {
  for( let i = 0 ; i < arguments.length ; i++){
    this[this.length] = arguments[i] ;
  }
  return this.length;
}
```

## 实现数组的filter方法
```js
Array.prototype._filter = function(fn) {
  if (typeof fn !== "function") {
    throw Error('参数必须是一个函数');
  }
  const res = [];
  for (let i = 0, len = this.length; i < len; i++) {
    fn(this[i]) && res.push(this[i]);
  }
  return res;
}
```

## 实现数组的map方法
```js
Array.prototype._map = function(fn) {
  if (typeof fn !== "function") {
    throw Error('参数必须是一个函数');
  }
  const res = [];
  for (let i = 0, len = this.length; i < len; i++) {
    res.push(fn(this[i]));
  }
  return res;
}
```

## 实现 add(1)(2)(3)(4)
可以实现任意数量数字相加，但是需要用+号隐式转换

```js
function fn() {
  let result = [];
  function add(...args) {
    // ...args剩余参数,可以获取到传进来的参数
    result = [...result, ...args]
    return add;
  };
  // 创建一个取代 valueOf 方法的函数,覆盖自定义对象的 valueOf 方法
  add.toString = () => result.reduce((sum, k) => sum + k, 0);
  return add;
};
let add = fn()
console.log(+add(1)(2)(3)(4)) // --->10
// let add2 = fn();
console.log(+add2(1, 2, 3)(4)) // --->10
```
参数固定的情况下，不需要用+号，可以根据参数长度来判断返回值
```js
function currying(fn, length) {
  length = length || fn.length; // 第一次调用,给length赋值fn的长度,后面每次重复调用,length的长度都会减去参数的长度
  return function (...args) {
    return args.length >= length // 当前传递进来的参数的长度与length长度进行比较
      ? fn.apply(this, args) // 把最后一组实参传给为赋值的形参,此时所有形参都已赋值,并调用fn函数
      : currying(fn.bind(this, ...args), length - args.length)
    // 每一次调用fn.bind,都会把当前的args里的实参依次传给fn的形参,length的长度减去参数的长度
    // 相当于fn.bind(this, 1).bind(this, 2, 3),bind的连续调用,来填充fn的参数
    // 直到某一次调用,fn的形参即将全部都被赋值时,条件成立,会执行fn.apply,把最后的参数传递过去,并且调用fn
  }
}
function fn(a, b, c, d) {
  return a + b + c + d
}
const add = currying(fn)
add(4)(3)(1)(2) //10
add(1, 3)(4)(2) //10
add(1)(3, 4, 2) //10
```
## 用Promise实现图片的异步加载
```js
let imageAsync=(url)=>{
  return new Promise((resolve,reject)=>{
    let img = new Image();
    img.src = url;
    img.οnlοad=()=>{
      console.log(`图片请求成功，此处进行通用操作`);
      resolve(image);
    }
    img.οnerrοr=(err)=>{
      console.log(`失败，此处进行失败的通用操作`);
      reject(err);
    }
  })
}
imageAsync("url").then(()=>{
  console.log("加载成功");
}).catch((error)=>{
  console.log("加载失败");
})
```

## 手写发布-订阅模式
```js
class EventCenter{
  // 1. 定义事件容器，用来装事件数组
    let handlers = {}
  // 2. 添加事件方法，参数：事件名 事件方法
  addEventListener(type, handler) {
    // 创建新数组容器
    if (!this.handlers[type]) {
      this.handlers[type] = []
    }
    // 存入事件
    this.handlers[type].push(handler)
  }
  // 3. 触发事件，参数：事件名 事件参数
  dispatchEvent(type, params) {
    // 若没有注册该事件则抛出错误
    if (!this.handlers[type]) {
      return new Error('该事件未注册')
    }
    // 触发事件
    this.handlers[type].forEach(handler => {
      handler(...params)
    })
  }
  // 4. 事件移除，参数：事件名 要删除事件，若无第二个参数则删除该事件的订阅和发布
  removeEventListener(type, handler) {
    if (!this.handlers[type]) {
      return new Error('事件无效')
    }
    if (!handler) {
      // 移除事件
      delete this.handlers[type]
    } else {
      const index = this.handlers[type].findIndex(el => el === handler)
      if (index === -1) {
        return new Error('无该绑定事件')
      }
      // 移除事件
      this.handlers[type].splice(index, 1)
      if (this.handlers[type].length === 0) {
        delete this.handlers[type]
      }
    }
  }
}
```

## Object.defineProperty(简易版)
```js
//  Vue2的响应式原理，结合了Object.defineProperty的数据劫持，以及发布订阅者模式

//  Vue2的数据劫持，就是通过递归遍历data里的数据，用Object.
//  defineProperty给每一个属性添加getter和setter,

/*并且把data里的属性挂载到vue实例中，修改vue实例上的属性时，
  就会触发对应的setter函数，向Dep订阅器发布更新消息，对应的
  Watcher订阅者会收到通知，调用自身的回调函数，让编译器去更新视图。*/
const obj = {
  name: '张三',
  age: 20
}
const p = {}
for (let key in obj) {
  Object.defineProperty(p, key, {
    get() {
      console.log(`有人读取p里的${key}属性`);
      return obj[key]
    },
    set(val) {
      console.log(`有人修改了p里的${key}属性,值为${val},需要去更新视图`);
      obj[key] = val
    }
  })
}
```

## Proxy数据劫持(简易版)
```js
// Vue3的数据劫持通过Proxy函数对代理对象的属性进行劫持，通过Reflect对象里的方法对代理对象的属性进行修改，
// Proxy代理对象不需要遍历，配置项里的回调函数可以通过参数拿到修改属性的键和值
// 这里用到了Reflect对象里的三个方法，get，set和deleteProperty，方法需要的参数与配置项中回调函数的参数相同。
// Reflect里的方法与Proxy里的方法是一一对应的，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。
const obj = {
  name: '刘逍',
  age: 20
}
const p = new Proxy(obj, {
  // 读取属性的时候会调用getter
  get(target, propName) {  //第一个参数为代理的源对象,等同于上面的Obj参数。第二个参数为读取的那个属性值
    console.log(`有人读取p对象里的${propName}属性`);
    return Reflect.get(target, propName)
  },
  // 添加和修改属性的时候会调用setter
  set(target, propName, value) { //参数等同于get，第三个参数为修改后的属性值
    console.log(`有人修改了p对象里的${propName}属性,值为${value},需要去修改视图`);
    Reflect.set(target, propName, value)
  },
  // 删除属性时，调用deleteProperty
  deleteProperty(target, propName) { // 参数等同于get
    console.log(`有人删除了p对象里的${propName}属性，需要去修改视图`);
    return Reflect.deleteProperty(target, propName)
  }
})
```

## 实现路由(简易版)
```js
// hash路由
class Route{
  constructor(){
    // 路由存储对象
    this.routes = {}
    // 当前hash
    this.currentHash = ''
    // 绑定this，避免监听时this指向改变
    this.freshRoute = this.freshRoute.bind(this)
    // 监听
    window.addEventListener('load', this.freshRoute, false)
    window.addEventListener('hashchange', this.freshRoute, false)
  }
  // 存储
  storeRoute (path, cb) {
    this.routes[path] = cb || function () {}
  }
  // 更新
  freshRoute () {
    this.currentHash = location.hash.slice(1) || '/'
    this.routes[this.currentHash]()
  }
}
```

## 使用 setTimeout 实现 setInterval
实现思路是使用递归函数，不断地去执行 setTimeout 从而达到 setInterval 的效果
```js
function mySetInterval(fn, timeout) {
  // 控制器，控制定时器是否继续执行
  var timer = {
    flag: true
  };
  // 设置递归函数，模拟定时器执行。
  function interval() {
    if (timer.flag) {
      fn();
      setTimeout(interval, timeout);
    }
  }
  // 启动定时器
  setTimeout(interval, timeout);
  // 返回控制器
  return timer;
}
```

## 使用setInterval实现setTimeout
```js
function mySetInterval(fn, t) {
  const timer = setInterval(() => {
    clearInterval(timer)
    fn()
  }, t)
}
mySetInterval(() => {
  console.log('hoho');
}, 1000)
```

## 实现 jsonp
```js
function addScript(src) {
  const script = document.createElement('script');
  script.src = src;
  script.type = "text/javascript";
  document.body.appendChild(script);
}
addScript("http://xxx.xxx.com/xxx.js?callback=handleRes");
// 设置一个全局的callback函数来接收回调结果
function handleRes(res) {
  console.log(res);
}
// 接口返回的数据格式
handleRes({a: 1, b: 2});
```

## 提取出url 里的参数并转成对象
```js
function getUrlParams(url){
  let reg = /([^?&=]+)=([^?&=]+)/g
  let obj = { }
  url.replace(reg, function(){
      obj[arguments[1]] = arguments[2]
  })
  // 或者
  const search = window.location.search
  search.replace(/([^&=?]+)=([^&]+)/g, (m, $1, $2)=>{obj[$1] = decodeURIComponent($2)})
  return obj
}
let url = 'https://www.junjin.cn?a=1&b=2'
console.log(getUrlParams(url)) // { a: 1, b: 2 }
```
## 请写至少三种数组去重的方法？（原生js）
```js
// 利用filter
function unique(arr) {
  return arr.filter(function(item, index, arr) {
    // 当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
    return arr.indexOf(item, 0) === index;
  });
}
var arr = [1,1,'true','true',true,true];
console.log(unique(arr))
```
```js
// 利用 ES6 Set去重（ES6 中最常用）
function unique (arr) {
  return Array.from(new Set(arr))
}
var arr = [1,1,'true','true',true,true];
console.log(unique(arr))
// [1, "true", true]
```
```js
// 利用for嵌套for，然后splice去重（ES5中最常用）
function unique (arr) {
  for(var i=0; i<arr.length; i++) {
    for(var j=i+1; j<arr.length; j++) {
      if(arr[i]==arr[j]) { // 第一个等同于第二个，splice方法删除第二个
        arr.splice(j,1);
        j--;
      }
    }
  }
  return arr;
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
// [1, "true", 15, false, undefined, NaN, NaN, "NaN", "a", {…}, {…}]
// NaN 和 {} 没有去重，两个 null 直接消失了
```