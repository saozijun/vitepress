::: tip Javascript 篇
向一切成功者和失败者学习思想方法。
:::
# ✨ 异步与事件循环 ✨

## 异步编程的实现方式?
JavaScript 中的异步机制可以分为以下几种：
- 回调函数 的方式，使用回调函数的方式有一个缺点是，多个回调函数嵌套的时候会造成回调函数地狱，上下两层的回调函数间的代码耦合度太高，不利于代码的可维护。
- Promise 的方式，使用 Promise 的方式可以将嵌套的回调函数作为链式调用。但是使用这种方法，有时会造成多个 then 的链式调用，可能会造成代码的语义不够明确。
- generator 的方式，它可以在函数的执行过程中，将函数的执行权转移出去，在函数外部还可以将执行权转移回来。当遇到异步函数执行的时候，将函数执行权转移出去，当异步函数执行完毕时再将执行权给转移回来。因此在 generator 内部对于异步操作的方式，可以以同步的顺序来书写。使用这种方式需要考虑的问题是何时将函数的控制权转移回来，因此需要有一个自动执行 generator 的机制，比如说 co 模块等方式来实现 generator 的自动执行。
- async 函数 的方式，async 函数是 generator 和 promise 实现的一个自动执行的语法糖，它内部自带执行器，当函数内部执行到一个 await 语句的时候，如果语句返回一个 promise 对象，那么函数将会等待 promise 对象的状态变为 resolve 后再继续向下执行。因此可以将异步逻辑，转化为同步的顺序来书写，并且这个函数可以自动执行

## 并发与并行的区别？
- 并发是宏观概念，我分别有任务 A 和任务 B，在一段时间内通过任务间的切换完成了这两个任务，这种情况就可以称之为并发。
- 并行是微观概念，假设 CPU 中存在两个核心，那么我就可以同时完成任务 A、B。同时完成多个任务的情况就可以称之为并行。

## setTimeout、setInterval、requestAnimationFrame 的区别
- setTimeout

执行该语句时，是立即把当前定时器代码推入事件队列，当定时器在事件列表中满足设置的时间值时将传入的函数加入任务队列，之后的执行就交给任务队列负责。但是如果此时任务队列不为空，则需等待，所以执行定时器内代码的时间可能会大于设置的时间。

返回值 timeoutID 是一个正整数，表示定时器的编号。这个值可以传递给 clearTimeout() 来取消该定时器。

- setInterval

重复调用一个函数或执行一个代码片段，每次都精确的隔一段时间推入一个事件（但是，事件的执行时间不一定就不准确，还有可能是这个事件还没执行完毕，下一个事件就来了）。它返回一个 interval ID，该 ID 唯一地标识时间间隔，因此你可以稍后通过调用 clearInterval() 来移除定时器。

技术上，clearTimeout() 和 clearInterval() 可以互换。但是，为了避免混淆，不要混用取消定时函数。

- requestAnimationFrame

是 JS 实现动画的一种方式，它告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

## 什么是回调地狱？回调地狱会带来什么问题？
回调函数的层层嵌套，就叫做回调地狱。回调地狱会造成代码可复用性不强，可阅读性差，可维护性(迭代性差)，扩展性差等等问题。

## Promise 语法

## Promise 是什么
Promise 是异步编程的一种解决方案，它是一个对象，可以获取异步操作的消息，他的出现大大改善了异步编程的困境，避免了地狱回调，它比传统的解决方案回调函数和事件更合理和更强大。

Promise 本身只是一个容器，真正异步的是它的两个回调 resolve() 和 reject()

Promise 本质 不是控制 异步代码的执行顺序（无法控制） ， 而是控制异步代码结果处理的顺序

## Promise 实例有哪些状态，怎么改变状态
1. Promise 的实例有三个状态:
   - Pending（进行中）
   - Resolved（已完成）
   - Rejected（已拒绝）

当把一件事情交给 promise 时，它的状态就是 Pending，任务完成了状态就变成了 Resolved、没有完成失败了就变成了 Rejected。

如何改变 promise 的状态

- resolve(value)：如果当前是 pending 就会变为 resolved
- reject(error)：如果当前是 pending 就会变为 rejected
- 抛出异常：如果当前是 pending 就会变为 rejected

注意：一旦从进行状态变成为其他状态就永远不能更改状态了。

## 创建 Promise 实例有哪些方法
- new Promise((resolve, reject)=>{ ... })

一般情况下都会使用 new Promise() 来创建 promise 对象，但是也可以使用 promise.resolve 和 promise.reject 这两个方法：

- Promise.resolve

Promise.resolve(value) 的返回值也是一个 promise 对象，可以对返回值进行 .then 调用，代码如下：
```js
Promise.resolve(11).then(function(value){
  console.log(value); // 打印出11
});
```
- Promise.reject
Promise.reject 也是 new Promise 的快捷形式，也创建一个 promise 对象。代码如下：
```js
Promise.reject(new Error(“出错了！！”));
```

## Promise 有哪些实例方法
- then

then 方法可以接受两个回调函数作为参数。第一个回调函数是 Promise 对象的状态变为 resolved 时调用，第二个回调函数是 Promise 对象的状态变为 rejected 时调用。其中第二个参数可以省略。then 方法返回的是一个新的 Promise 实例（不是原来那个 Promise 实例）。因此可以采用链式写法，即 then 方法后面再调用另一个 then 方法。

- catch

该方法相当于 then 方法的第二个参数，指向 reject 的回调函数。不过 catch 方法还有一个作用，就是在执行 resolve 回调函数时，如果出现错误，抛出异常，不会停止运行，而是进入 catch 方法中。

- finally

finally 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

下面是一个例子，服务器使用 Promise 处理请求，然后使用 finally 方法关掉服务器。
```js
server.listen(port)
  .then(function () {
    // ...
  })
  .finally(server.stop);

```
finally 方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是 fulfilled 还是 rejected。这表明，finally 方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

## Promise 有哪些静态方法
- all

all 方法可以完成并发任务， 它接收一个数组，数组的每一项都是一个 promise 对象，返回一个Promise实例。当数组中所有的 promise 的状态都达到 resolved 的时候，all 方法的状态就会变成 resolved，如果有一个状态变成了rejected，那么 all 方法的状态就会变成 rejected。

- race

race方法和 all 一样，接受的参数是一个每项都是 promise 的数组，但是与 all 不同的是，当最先执行完的事件执行完之后，就直接返回该 promise 对象的值。如果第一个 promise 对象状态变成 resolved，那自身的状态变成了 resolved；反之第一个 promise 变成 rejected，那自身状态就会变成 rejected。

- any

它接收一个数组，数组的每一项都是一个 promise 对象，该方法会返回一个新的 promise，数组内的任意一个 promise 变成了 resolved 状态，那么由该方法所返回的 promise 就会变成 resolved 状态。如果数组内的 promise 状态都是 rejected，那么该方法所返回的 promise 就会变成 rejected 状态。

- resolve、reject

用来生成对应状态的 Promise 实例

## Promise.all、Promise.race、Promise.any 的区别
all：成功的时候返回的是一个结果数组，而失败的时候则返回最先被 reject 失败状态的值。

race：哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。

any：返回最快的成功结果，如果全部失败就返回失败结果。

## 一个 Promise 指定多个回调函数，都会调用吗?
都会调用，成功状态放在 then 的第一个参数里调用
```js
let p2 = new Promise((resolve, reject) => {
  resolve(1)
})
p2.then(value => {
  console.log('第一个', value)
})
p2.then(value => {
  console.log('第二个', value)
})
```
失败状态放在 then 的第二个参数里调用
```js
let p3 = new Promise((resolve, reject) => {
  reject(2)
})
p3.then(()=>{},
  value => {console.log('第一个', value)}
)
p3.then(()=>{},
  value => {console.log('第二个', value)}
)
```

## 改变 Promise 状态和指定回调函数谁先谁后?
1. 都有可能，正常情况下是先指定回调再改变状态，但也可以先改状态再指定回调
2. 如何先改状态再指定回调?
   - 在执行器中直接调用 resolve()/reject()
   - 延迟更长时间才调用 then()

3. 什么时候才能得到数据?
   - 如果先指定的回调，那当状态发生改变时，回调函数就会调用，得到数据
   - 如果先改变的状态，那当指定回调时，回调函数就会调用，得到数据

## Promise.then() 返回的新 Promise 的结果状态由什么决定?
1. 简单表达：由 then() 指定的回调函数执行的结果决定

2. 详细表达：
   - 如果抛出异常，新 promise 变为 rejected，参数为抛出的异常
   - 如果返回的是非 promise 的任意值，新 promise 变为 resolved，value 为返回的值
   - 如果返回的是另一个新 promise，此 promise 的结果就会成为新 promise 的结果

## Promise 如何串连多个操作任务?
promise 的 then() 返回一个新的 promise，可以开成 then() 的链式调用

通过 then 的链式调用串连多个同步/异步任务

## Promise 异常传透是什么?
Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个 catch 语句捕获。

- 当使用 promise 的 then 链式调用时，可以在最后指定失败的回调，
- 前面任何操作出了异常，都会传到最后失败的回调中处理
  
## 如何中断 Promise 链?
当使用 Promise 的 then 链式调用时，在中间中断，不再调用后面的回调函数。在回调函数中返回一个 pendding 状态的 promise 对象

## Promise 有什么缺点
代码层面
- 无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
- 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。
- 当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

语法层面
- Promise 虽然摆脱了回调地狱，但是 then 的链式调用也会带来额外的阅读负担
- Promise 传递中间值非常麻烦
- Promise 的调试很差，由于没有代码块，你不能在⼀个返回表达式的箭头函数中设置断点，如果你在⼀个 .then 代码块中使⽤调试器的步进（step-over）功能，调试器并不会进入后续的 .then 代码块，因为调试器只能跟踪同步代码的每⼀步。