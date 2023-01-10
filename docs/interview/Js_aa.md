::: tip Javascript 篇
比别人多一点努力、多一点自律、多一点决心、多一点反省、多一点学习、多一点实践、多一点疯狂，多一点点就能创造奇迹！
:::
# ✨ async/await 语法 ✨

## async 函数是什么
一句话概括： 它就是 Generator 函数的语法糖，也就是处理异步操作的另一种高级写法

## async 函数的实现原理
async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。
```js
async function fn(args) {
  // ...
}
// 等同于
function fn(args) {
  return spawn(function* () {  // spawn 函数就是自动执行器
    // ...
  });
}
```

## async 函数的返回值
async 函数返回一个 Promise 对象。

async 函数内部 return 语句返回的值，会成为 then 方法回调函数的参数。

async 函数内部抛出错误，会导致返回的 Promise 对象变为 reject 状态。抛出的错误对象会被 catch 方法回调函数接收到。

## await 到底在等待什么?
await 等待的是一个表达式，这个表达式的计算结果是 Promise 对象或者其它值（换句话说，就是没有特殊限定）。await 不仅仅用于等 Promise 对象，它可以等任意表达式的结果，所以，await 后面实际是可以接普通函数调用或者直接量的。

await 表达式的运算结果取决于它等的是什么。

- 如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西。
- 如果它等到的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。

## 什么是顶层 await？
从 ES2022 开始，允许在模块的顶层独立使用 await 命令，使得上面那行代码不会报错了。它的主要目的是使用 await 解决模块异步加载的问题。
```js
import { AsyncFun } from 'module'
await AsyncFun()
console.log(123)
```

##  如何用 await 让程序停顿指定的时间(休眠效果)
JavaScript 一直没有休眠的语法，但是借助 await 命令就可以让程序停顿指定的时间
```js
function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  })
}
// 用法
async function one2FiveInAsync() {
  for(let i = 1; i <= 5; i++) {
    console.log(i);
    await sleep(1000);
  }
}
one2FiveInAsync();
```

##  await 的使用注意点
1. await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。
1. 多个 await 命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
1. await 命令只能用在 async 函数之中，如果用在普通函数，就会报错。
1. async 函数可以保留运行堆栈。

## async 语法怎么捕获异常
async 函数内部的异常可以通过 .catch() 或者 try/catch 来捕获，区别是

- try/catch 能捕获所有异常，try 语句抛出错误后会执行 catch 语句，try 语句内后面的内容不会执行
- catch() 只能捕获异步方法中 reject 错误，并且 catch 语句之后的语句会继续执行
```js
// async 函数错误捕获，以登录功能为例
async function getCatch () {
  await new Promise(function (resolve, reject) {
    reject(new Error('登录失败'))
  }).catch(error => {
    console.log(error)  // .catch() 能捕获到错误信息
  })
  console.log('登录成功') // 但是成功信息也会执行
}
async function getCatch () {
  try {
    await new Promise(function (resolve, reject) {
      reject(new Error('登录失败'))
    })
    console.log('登录成功')  // try 抛出错误之后，就不会执行这条语句
  } catch (error) {
    console.log(error)  //  catch 语句能捕获到错误信息
  }
}
```

## async/await 对比 Promise 的优势
代码读起来更加同步，Promise 虽然摆脱了回调地狱，但是 then 的链式调用也会带来额外的阅读负担

Promise 传递中间值非常麻烦，而 async/await 几乎是同步的写法，非常优雅

错误处理友好，async/await 可以用成熟的 try/catch，Promise 的错误捕获非常冗余

调试友好，Promise 的调试很差，由于没有代码块，你不能在⼀个返回表达式的箭头函数中设置断点，如果你在⼀个 .then 代码块中使用调试器的步进（step-over）功能，调试器并不会进入后续的 .then 代码块，因为调试器只能跟踪同步代码的每⼀步。

## 事件循环 Event Loop

## JS 的执行机制（同步任务、异步任务）
JS 是一门单线程语言，单线程就意味着，所有的任务需要排队，前一个任务结束，才会执行下一个任务。这样所导致的问题是：如果JS执行的时间过长，这样就会造成页面的渲染不连贯，导致页面渲染加载阻塞的觉。为了解决这个问题，JS中出现了同步和异步。

同步任务：即主线程上的任务，按照顺序由上至下依次执行，当前⼀个任务执行完毕后，才能执行下⼀个任务。

异步任务：不进入主线程，而是进入任务队列的任务，执行完毕之后会产生一个回调函数，并且通知主线程。当主线程上的任务执行完后，就会调取最早通知自己的回调函数，使其进入主线程中执行。

## 什么是 Event Loop

事件循环 Event Loop 又叫事件队列，两者是一个概念

事件循环指的是 JS 代码所在运行环境（浏览器、nodejs）编译器的一种解析执行规则。事件循环不属于 js 代码本身的范畴，而是属于 js 编译器的范畴，在 js 中讨论事件循环是没有意义的。换句话说，js 代码可以理解为是一个人在公司中具体做的事情， 而 事件循环 相当于是公司的一种规章制度。 两者不是一个层面的概念。

##  宏任务与微任务的概念与区别
为了协调任务有条不紊地在主线程上执行，页面进程引入了 消息队列 和 事件循环机制，渲染进程内部也会维护多个消息队列，比如延迟执行队列和普通的消息队列。然后主线程采用一个 for 循环，不断地从这些任务队列中取出任务并执行任务。这些消息队列中的任务就称为 宏任务。

微任务是一个需要异步执行的回调函数，执行时机是在主函数执行结束之后、当前宏任务结束之前。当 JS 执行一段脚本（一个宏任务）的时候，V8 会为其创建一个全局执行上下文，在创建全局执行上下文的同时，V8 引擎也会在内部创建一个 微任务队列。也就是说 每个宏任务都关联了一个微任务队列。

##  常见的宏任务与微任务分别有哪些

任务（代码）|宏/微 任务|环境
:-:|:-:|:-:
整体JS代码|宏任务|浏览器
事件|宏任务|浏览器
网络请求（Ajax）|宏任务|浏览器
setTimeout() 定时器|宏任务|浏览器/Node
fs.readFile() 读取文件|宏任务|Node
Promise.then()|微任务|浏览器/Node
async/await|微任务|浏览器/Node

## 事件循环 Event Loop 执行机制
1. 进入到 script 标签，就进入到了第一次事件循环。
2. 遇到同步代码，立即执行
3. 遇到宏任务，放入到宏任务队列里。
4. 遇到微任务，放入到微任务队列里。
5. 执行完所有同步代码
6. 执行微任务代码
7. 微任务代码执行完毕，本次队列清空
8. 寻找下一个宏任务，重复步骤 1

## 为什么 JS 是单线程？
JS 是单线程，但是浏览器是多线程。单线程是为了避免 UI 操作混乱，所有和 UI 操作相关的开发语言都应该是单线程。

## 代码题易考点
1. promise 本身是一个同步的代码，只有它后面调用的 then() 方法里面的回调才是微任务
1. then 方法需要 Promise 里的 resolve 传值才会执行
1. await 右边的表达式还是会立即执行,表达式之后的代码才是微任务，await 微任务可以转换成等价的 promise 微任务分析
1. script 标签本身是一个宏任务， 当页面出现多个 script 标签的时候，浏览器会把 script 标签作为宏任务来解析