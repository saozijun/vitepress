::: tip Javascript 篇
你一定要站在自己所热爱的世界里，闪闪发亮。
:::
# ✨ 其他类型问题补充 ✨
##  简单说说你对观察者模式的理解
观察者模式定义了对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知，并自动更新

观察者模式属于行为型模式，行为型模式关注的是对象之间的通讯，观察者模式就是观察者和被观察者之间的通讯

例如生活中，我们可以用报纸期刊的订阅来形象的说明，当你订阅了一份报纸，每天都会有一份最新的报纸送到你手上，有多少人订阅报纸，报社就会发多少份报纸

报社和订报纸的客户就形成了一对多的依赖关系
## 简单说说你对发布订阅模式的理解
发布-订阅是一种消息范式，消息的发送者（称为发布者）不会将消息直接发送给特定的接收者（称为订阅者）。而是将发布的消息分为不同的类别，无需了解哪些订阅者（如果有的话）可能存在

同样的，订阅者可以表达对一个或多个类别的兴趣，只接收感兴趣的消息，无需了解哪些发布者存在

## 观察者模式与发布订阅的区别
在观察者模式中，观察者是知道 Subject 的，Subject 一直保持对观察者进行记录。然而，在发布订阅模式中，发布者和订阅者不知道对方的存在。它们只有通过消息代理进行通信。

在发布订阅模式中，组件是松散耦合的，正好和观察者模式相反。

观察者模式大多数时候是同步的，比如当事件触发，Subject 就会去调用观察者的方法。而发布-订阅模式大多数时候是异步的（使用消息队列）

## 说说你对正则表达式的理解
正则表达式是一种用来匹配字符串的强有力的武器

它的设计思想是用一种描述性的语言定义一个规则，凡是符合规则的字符串，我们就认为它“匹配”了，否则，该字符串就是不合法的

在 JavaScript 中，正则表达式也是对象，构建正则表达式有两种方式：
1. 字面量创建，其由包含在斜杠之间的模式组成
```js
const re = /d+/g;
```
2. 调用 RegExp 对象的构造函数
```js
const re = new RegExp("d+","g");
const rul = "d+"
const re1 = new RegExp(rul,"g");
```
使用构建函数创建，第一个参数可以是一个变量，遇到特殊字符``需要使用进行转义

## 如何判断当前的 JS 代码是否在浏览器环境中运行
如果 Javascript 在浏览器环境中运行，则会有一个全局对象：window。因此，可以通过以下方式判断环境：
```js
typeof window.self ！== "undefined";
// 在 web worker 或者 sevice worker 下是无法获取到 windows 全局变量， 所以需要通过 self 变量判断
```