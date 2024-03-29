::: tip Javascript 篇
天才就是这样，终身努力便成天才。
:::
# ✨ js基础 ✨
## JavaScript 有哪些数据类型
JavaScript 共有八种数据类型

七种基本数据类型：Undefined、Null、Boolean、Number、String、Symbol、BigInt。

一种引用数据类型：Object

其中 Symbol 和 BigInt 是 ES6 中新增的数据类型：

- Symbol 代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题。
- BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。

## 说说你对堆区和栈区的理解
在操作系统中，内存被分为栈区和堆区

- 栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。
- 堆区内存一般由开发着分配释放，若开发者不释放，程序结束时可能由垃圾回收机制回收。

在数据结构中：
- 在数据结构中，栈中数据的存取方式为先进后出。
- 堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。

数据的储存方式
- 原始数据类型直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；
- 引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

## 数据类型检测的方式有哪些
判断数据类型一般可以通过 typeof、instanceof、constructor、toString 四种常用方法进行
1. typeof：使用方法（typeof xxx === xxx，返回具体类型）
2. instanceof：使用方法（xxx instanceof Array，返回 true 或者 false）
3. constructor：使用方法（xxx.constructor === Array，返回 true 或者 false）
4. toString()：使用方法（Object.prototype.toString.call(xxx)，返回 [object array] 之类的结果）

不同类型的优缺点：

类型|优点|缺点
:---:|:---:|:---:
typeof|使用简单|只能检测出除 null 外的基本数据类型和引用数据类型中的 function
instanceof|能检测出引用类型|不能检测出基本类型，且不能跨 iframe
constructor|constructor 易被修改，也不能跨 iframe
Object.prototype.toString.call|检测出所有的类型|IE6 下，undefined 和 null 均为 Object

##  判断数组的方式有哪些
- 通过 Object.prototype.toString.call() 做判断
- 通过原型链做判断
- 通过 ES6 的 Array.isArray() 做判断
- 通过 instanceof 做判断
- 通过 Array.prototype.isPrototypeOf

## null 和 undefined 区别
- 首先 undefined 和 null 都是基本数据类型，这两个基本数据类型分别都只有一个值，就是 Undefined 和 null。
- undefined 代表的含义是未定义，null 代表的含义是空对象。一般变量声明了但还没有定义的时候会返回 undefined，null 主要用于赋值给一些可能会返回对象的变量，作为初始化。
- undefined 在 JavaScript 中不是一个保留字，这意味着可以使用 undefined 来作为一个变量名，但是这样的做法是非常危险的，它会影响对 undefined 值的判断。我们可以通过一些方法获得安全的 undefined 值，比如说 void 0。
- 当对这两种类型使用 typeof 进行判断时，Null 类型化会返回 “object”，这是一个历史遗留的问题。当使用双等号对两种类型的值进行比较时会返回 true，使用三个等号时会返回 false。

## typeof null 的结果是什么，为什么？
typeof null 的结果是 Object。

在 JavaScript 第一个版本中，所有值都存储在 32 位的单元中，每个单元包含一个小的 类型标签（1-3 bits）以及当前要存储值的真实数据。类型标签存储在每个单元的低位中，共有五种数据类型：
```js
000: object   - 当前存储的数据指向一个对象。
  1: int      - 当前存储的数据是一个 31 位的有符号整数。
010: double   - 当前存储的数据指向一个双精度的浮点数。
100: string   - 当前存储的数据指向一个字符串。
110: boolean  - 当前存储的数据是布尔值。
```
如果最低位是 1，则类型标签标志位的长度只有一位；如果最低位是 0，则类型标签标志位的长度占三位，为存储其他四种数据类型提供了额外两个 bit 的长度。

有两种特殊数据类型：
- undefined 的值是 (-2)30（一个超出整数范围的数字）；
- null 的值是机器码 NULL 指针（null 指针的值全是 0）

那也就是说 null 的类型标签也是 000，和 Object 的类型标签一样，所以会被判定为 Object。

## typeof NaN 的结果是什么？
NaN 指“不是一个数字”（not a number），NaN 是一个“警戒值”（sentinel value，有特殊用途的常规值），用于指出数字类型中的错误情况，即“执行数学运算没有成功，这是失败后返回的结果”。
```js
typeof NaN; // "number"
```
NaN 是一个特殊值，它和自身不相等，是唯一一个非自反的值。所谓的非自反就是说，NaN 与谁都不相等，包括它本身，但在 NaN ！= NaN 下会返回true

##  isNaN 和 Number.isNaN 函数的区别？
- 函数 isNaN 接收参数后，会尝试将这个参数转换为数值，任何不能被转换为数值的的值都会返回 true，因此非数字值传入也会返回 true ，会影响 NaN 的判断。
- 函数 Number.isNaN 会首先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN ，不会进行数据类型的转换，这种方法对于 NaN 的判断更为准确。

## 为什么 0.1+0.2 ! == 0.3，如何让其相等（精度丢失）
计算机是通过二进制的方式存储数据的，所以计算机计算 0.1+0.2 的时候，实际上是计算的两个数的二进制的和。

在 Js中只有一种数字类型：Number，它的实现遵循 IEEE 754 标准，使用 64 位固定长度来表示，也就是标准的 double 双精度浮点数。在二进制科学表示法中，双精度浮点数的小数部分最多只能保留 52 位，再加上前面的 1，其实就是保留53位有效数字，剩余的需要舍去，遵从“0 舍 1 入”的原则。

根据这个原则，0.1 和 0.2 的二进制数相加，再转化为十进制数就是：0.30000000000000004。所以不相等

解决方法就是设置一个误差范围，通常称为“机器精度”。对 JavaScript 来说，这个值通常为 2-52，在 ES6 中，提供了 Number.EPSILON 属性，而它的值就是 2-52，只要判断 0.1+0.2-0.3 是否小于 Number.EPSILON，如果小于，就可以判断为 0.1+0.2 ===0.3
```js
function numberepsilon(arg1,arg2){                  
  return Math.abs(arg1 - arg2) < Number.EPSILON;        
}        
console.log(numberepsilon(0.1 + 0.2, 0.3)); // true
```

## 如何获取安全的 undefined 值？
因为 undefined 是一个标识符，所以可以被当作变量来使用和赋值，但是这样会影响 undefined 的正常判断。表达式 void ___ 没有返回值，因此返回结果是 undefined。void 并不改变表达式的结果，只是让表达式不返回值。因此可以用 void 0 来获得 undefined。

## == 操作符的强制类型转换规则是什么？
对于 == 来说，如果对比双方的类型不一样，就会进行类型转换。假如对比 x 和 y 是否相同，就会进行如下判断流程：
- 首先会判断两者类型是否相同， 相同的话就比较两者的大小；
- 类型不相同的话，就会进行类型转换；
- 会先判断是否在对比 null 和 undefined，是的话就会返回 true
- 判断两者类型是否为 string 和 number，是的话就会将字符串转换为 number
```js
1 == '1'
      ↓
1 ==  1
```
判断其中一方是否为 boolean，是的话就会把 boolean 转为 number 再进行判断
```js
'1' == true
        ↓
'1' ==  1
        ↓
 1  ==  1
```
判断其中一方是否为 object 且另一方为 string、number 或者 symbol，是的话就会把 object 转为原始类型再进行判断.

## 其他值类型转成字符串的转换规则？
- Null 和 Undefined 类型 ，null 转换为 "null"，undefined 转换为 "undefined"，
- Boolean 类型，true 转换为 "true"，false 转换为 "false"。
- Number 类型的值直接转换，不过那些极小和极大的数字会使用指数形式。
- Symbol 类型的值直接转换，但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误。
- 对普通对象来说，除非自行定义 toString() 方法，否则会调用 toString()（Object.prototype.toString()）来返回内部属性 [[Class]] 的值，如"[object Object]"。如果对象有自己的 toString() 方法，字符串化时就会调用该方法并使用其返回值。

##  其他值类型转成数字的转换规则？
- Undefined 类型的值转换为 NaN。
- Null 类型的值转换为 0。
- Boolean 类型的值，true 转换为 1，false 转换为 0。
- String 类型的值转换如同使用 Number() 函数进行转换，如果包含非数字值则转换为 NaN，空字符串为 0。
- Symbol 类型的值不能转换为数字，会报错。
- 对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字。

为了将值转换为相应的基本类型值， 隐式转换会首先检查该值是否有 valueOf() 方法。如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用 toString() 的返回值（如果存在）来进行强制类型转换。

如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。

## 其他值类型转成布尔类型的转换规则？
以下这些是假值：undefined 、 null 、 false 、 +0、-0 和 NaN 、 ""

假值的布尔强制类型转换结果为 false。从逻辑上说，假值列表以外的都应该是真值。

## || 和 && 操作符的返回值？
|| 和 && 首先会对第一个操作数执行条件判断，如果其不是布尔值就先强制转换为布尔类型，然后再执行条件判断。
- 对于 || 来说，如果条件判断结果为 true 就返回第一个操作数的值，如果为 false 就返回第二个操作数的值。
- && 则相反，如果条件判断结果为 true 就返回第二个操作数的值，如果为 false 就返回第一个操作数的值。

|| 和 && 返回它们其中一个操作数的值，而非条件判断的结果

## Object.is() 与比较操作符 “===”、“==” 的区别？
- 使用双等号（==）进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。
- 使用三等号（===）进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 false。
- 使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 是相等的。

## 什么是 JavaScript 中的包装类型？
在 JavaScript 中，基本类型是没有属性和方法的，但是为了便于操作基本类型的值，在调用基本类型的属性或方法时 JavaScript 会在后台隐式地将基本类型的值转换为对象。如：
```js
const a = "abc";
a.length; // 3
```
在访问 'abc'.length 时，JavaScript 将 'abc' 在后台转换成 String('abc')，然后再访问其 length 属性。

## 说说你对 this 的理解
this 是一个在运行时才进行绑定的引用，在不同的情况下它可能会被绑定不同的对象。

## 如何判断 this 的指向
- 第一种是函数调用模式，当一个函数不是一个对象的属性时，直接作为函数来调用时，this 指向全局对象。
- 第二种是方法调用模式，如果一个函数作为一个对象的方法来调用时，this 指向这个对象。
- 第三种是构造器调用模式，如果一个函数用 new 调用时，函数执行前会新创建一个对象，this 指向这个新创建的对象。
- 第四种是 apply 、 call 和 bind 调用模式，这三个方法都可以显示的指定调用函数的 this 指向。其中 apply 方法接收两个参数：一个是 this 绑定的对象，一个是参数数组。call 方法接收的参数，第一个是 this 绑定的对象，后面的其余参数是传入函数执行的参数。也就是说，在使用 call() 方法时，传递给函数的参数必须逐个列举出来。bind 方法通过传入一个对象，返回一个 this 绑定了传入对象的新函数。这个函数的 this 指向除了使用 new 时会被改变，其他情况下都不会改变。
### this 绑定的优先级
new 绑定优先级 > 显示绑定优先级 > 隐式绑定优先级 > 默认绑定优先级

## Map 和 Object 的区别
.|Map|Object
:--:|:--:|:--:
意外的键|Map 默认情况不包含任何键，只包含显式插入的键。|Object 有一个原型, 原型链上的键名有可能和自己在对象上的设置的键名产生冲突。
键的类型|Map 的键可以是任意值，包括函数、对象或任意基本类型。|Object 的键必须是 String 或是 Symbol。
键的顺序|Map 中的 key 是有序的。因此，当迭代的时候， Map 对象以插入的顺序返回键值。|Object 的键是无序的
Size|Map 的键值对个数可以轻易地通过size 属性获取|Object 的键值对个数只能手动计算
迭代|Map 是 iterable 的，所以可以直接被迭代。|迭代 Object 需要以某种方式获取它的键然后才能迭代。
性能|在频繁增删键值对的场景下表现更好。|在频繁添加和删除键值对的场景下未作出优化。

##  说说你对 JSON 的理解
JSON 是一种基于文本的轻量级的数据交换格式。它可以被任何的编程语言读取和作为数据格式来传递。

在项目开发中，使用 JSON 作为前后端数据交换的方式。在前端通过将一个符合 JSON 格式的数据结构序列化为 JSON 字符串，然后将它传递到后端，后端通过 JSON 格式的字符串解析后生成对应的数据结构，以此来实现前后端数据的一个传递。

因为 JSON 的语法是基于 js 的，因此很容易将 JSON 和 js 中的对象弄混，但是应该注意的是 JSON 和 js 中的对象不是一回事，JSON 中对象格式更加严格，比如说在 JSON 中属性值不能为函数，不能出现 NaN 这样的属性值等，因此大多数的 js 对象是不符合 JSON 对象的格式的。

在 js 中提供了两个函数来实现 js 数据结构和 JSON 格式的转换处理，
- JSON.stringify 函数，通过传入一个符合 JSON 格式的数据结构，将其转换为一个 JSON 字符串。如果传入的数据结构不符合 JSON 格式，那么在序列化的时候会对这些值进行对应的特殊处理，使其符合规范。在前端向后端发送数据时，可以调用这个函数将数据对象转化为 JSON 格式的字符串。
- JSON.parse() 函数，这个函数用来将 JSON 格式的字符串转换为一个 js 数据结构，如果传入的字符串不是标准的 JSON 格式的字符串的话，将会抛出错误。当从后端接收到 JSON 格式的字符串时，可以通过这个方法来将其解析为一个 js 数据结构，以此来进行数据的访问。
### String 和 JSON.stringify 的区别
```js
console.log(String("cxc")); // cxc
console.log(JSON.stringify("cxc")); // "cxc"
console.log(String({ key: "value" })); // [object Object]
console.log(JSON.stringify({ key: "value" })); // {"key":"value"}
console.log(String([1, 2, 3])); // 1,2,3
console.log(JSON.stringify([1, 2, 3])); // [1,2,3]
const obj = {
    title: "devpoint",
    toString() {
        return "obj";
    },
};
console.log(String(obj)); // obj
console.log(JSON.stringify(obj)); // {"title":"devpoint"}
```
- 当需要将一个数组和一个普通对象转换为字符串时，经常使用 JSON.stringify。
- 如果需要对象的 toString 方法被重写，则需要使用 String()。
- 在其他情况下，使用 String() 将变量转换为字符串

## 什么是伪数组(类数组)
一个拥有 length 属性和若干索引属性的对象就可以被称为类数组对象，类数组对象和数组类似，但是不能调用数组的方法。

常见的类数组对象有 arguments 和 DOM 方法的返回结果，还有一个函数也可以被看作是类数组对象，因为它含有 length 属性值，代表可接收的参数个数。

## 类数组转换成数组的方法有哪些
常见的类数组转换为数组的方法有这样几种：

通过 call 调用数组的 slice 方法来实现转换
```js
Array.prototype.slice.call(arrayLike);
```
通过 call 调用数组的 splice 方法来实现转换
```js
Array.prototype.splice.call(arrayLike, 0);
```
通过 apply 调用数组的 concat 方法来实现转换
```js
Array.prototype.concat.apply([], arrayLike);
```
通过 Array.from 方法来实现转换
```js
Array.from(arrayLike);
```
##  常见的位运算符有哪些？其计算规则是什么？
现代计算机中数据都是以二进制的形式存储的，即 0、1 两种状态，计算机对二进制数据进行的运算加减乘除等都是叫位运算，即将符号位共同参与运算的运算。

常见的位运算有以下几种：
运算符|描述|运算规则
:-:|:-:|:-:
&|与|两个位都为1时，结果才为1
&#124;|或|两个位都为0时，结果才为0
!|取反|0变1，1变0
`<<`|左移|各二进制位全部左移若干位，高位丢弃，低位补0
`>>`|右移|各二进制位全部右移若干位，正数左补0，负数左补1，右边丢弃

## 为什么函数的 arguments 参数是类数组而不是数组？如何遍历类数组?
arguments 是一个对象，它的属性是从 0 开始依次递增的数字，还有 callee 和 length 等属性，与数组相似；但是它却没有数组常见的方法属性，如 forEach, reduce 等，所以叫它们类数组。

要遍历类数组，有三个方法：

（1）将数组的方法应用到类数组上，这时候就可以使用call和apply方法，如：
```js
function cxc(){
  Array.prototype.forEach.call(arguments, a => console.log(a))
}
```
（2）使用Array.from方法将类数组转化成数组：‌
```js
function cxc(){
  const arrArgs = Array.from(arguments)
  arrArgs.forEach(a => console.log(a))
}
```
（3）使用展开运算符将类数组转化成数组
```js
function cxc(){
  const arrArgs = [...arguments]
  arrArgs.forEach(a => console.log(a))
}
```

## escape、encodeURI、encodeURIComponent 的区别
- encodeURI 是对整个 URI 进行转义，将 URI 中的非法字符转换为合法字符，所以对于一些在 URI 中有特殊意义的字符不会进行转义。
- encodeURIComponent 是对 URI 的组成部分进行转义，所以一些特殊字符也会得到转义。
- escape 和 encodeURI 的作用相同，不过它们对于 unicode 编码为 0xff 之外字符的时候会有区别，escape 是直接在字符的 unicode 编码前加上 %u，而 encodeURI 首先会将字符转换为 UTF-8 的格式，再在每个字节前加上 %。


## 什么是尾调用，使用尾调用有什么好处？
尾调用指的是函数的最后一步调用另一个函数。代码执行是基于执行栈的，所以当在一个函数里调用另一个函数时，会保留当前的执行上下文，然后再新建另外一个执行上下文加入栈中。使用尾调用的话，因为已经是函数的最后一步，所以这时可以不必再保留当前的执行上下文，从而节省了内存，这就是尾调用优化。

但是 ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

##  use strict 是什么? 它有什么用？
use strict 是一种 ECMAScript5 添加的（严格模式）运行模式，这种模式使得 Javascript 在更严格的条件下运行。设立严格模式的目的如下：
- 消除 Javascript 语法的不合理、不严谨之处，减少怪异行为;
- 消除代码运行的不安全之处，保证代码运行的安全；
- 提高编译器效率，增加运行速度；
- 为未来新版本的 Javascript 做好铺垫。

区别：
- 禁止使用 with 语句。
- 禁止 this 关键字指向全局对象。
- 对象不能有重名的属性。

## 如何判断一个对象是否属于某个类？
- 第一种方式，使用 instanceof 运算符来判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。

- 第二种方式，通过对象的 constructor 属性来判断，对象的 constructor 属性指向该对象的构造函数，但是这种方式不是很安全，因为 constructor 属性可以被改写。

- 第三种方式，如果需要判断的是某个内置的引用类型的话，可以使用 Object.prototype.toString() 方法来打印对象的 [[Class]] 属性来进行判断。

## 强类型语言和弱类型语言的区别
- 强类型语言：强类型语言也称为强类型定义语言，是一种总是强制类型定义的语言，要求变量的使用要严格符合定义，所有变量都必须先定义后使用。Java 和 C++ 等语言都是强制类型定义的，也就是说，一旦一个变量被指定了某个数据类型，如果不经过强制转换，那么它就永远是这个数据类型了。例如你有一个整数，如果不显式地进行转换，你不能将其视为一个字符串。
- 弱类型语言：弱类型语言也称为弱类型定义语言，与强类型定义相反。JavaScript 语言就属于弱类型语言。简单理解就是一种变量类型可以被忽略的语言。比如 JavaScript 是弱类型定义的，在 JavaScript 中就可以将字符串 '12' 和整数 3 进行连接得到字符串 '123'，在相加的时候会进行强制类型转换。

两者对比：强类型语言在速度上可能略逊色于弱类型语言，但是强类型语言带来的严谨性可以有效地帮助避免许多错误。

## 解释性语言和编译型语言的区别
（1）解释型语言 使用专门的解释器对源程序逐行解释成特定平台的机器码并立即执行。是代码在执行时才被解释器一行行动态翻译和执行，而不是在执行之前就完成翻译。解释型语言不需要事先编译，其直接将源代码解释成机器码并立即执行，所以只要某一平台提供了相应的解释器即可运行该程序。其特点总结如下
- 解释型语言每次运行都需要将源代码解释称机器码并执行，效率较低；
- 只要平台提供相应的解释器，就可以运行源代码，所以可以方便源程序移植；
- JavaScript、Python 等属于解释型语言。

（2）编译型语言 使用专门的编译器，针对特定的平台，将高级语言源代码一次性的编译成可被该平台硬件执行的机器码，并包装成该平台所能识别的可执行性程序的格式。在编译型语言写的程序执行之前，需要一个专门的编译过程，把源代码编译成机器语言的文件，如 exe 格式的文件，以后要再运行时，直接使用编译结果即可，如直接运行 exe 文件。因为只需编译一次，以后运行时不需要编译，所以编译型语言执行效率高。其特点总结如下：
- 一次性的编译成平台相关的机器语言文件，运行时脱离开发环境，运行效率高；
- 与特定平台相关，一般无法移植到其他平台；
- C、C++ 等属于编译型语言。

两者主要区别在于：后者源程序编译后即可在该平台运行，前者是在运行期间才编译。所以后者运行速度快，前者跨平台性好。

## for...in 和 for...of 的区别
for…of 是 ES6 新增的遍历方式，允许遍历一个含有 iterator 接口的数据结构（数组、对象等）并且返回各项的值，和 ES3 中的 for…in 的区别如下
- for…of 遍历获取的是对象的键值，for…in 获取的是对象的键名；
- for… in 会遍历对象的整个原型链，性能非常差不推荐使用，而 for…of 只遍历当前对象不会遍历原型链；
- 对于数组的遍历，for…in 会返回数组中所有可枚举的属性(包括原型链上可枚举的属性)，for…of 只返回数组的下标对应的属性值；

总结： for...in 循环主要是为了遍历对象而生，不适用于遍历数组；for...of 循环可以用来遍历数组、类数组对象，字符串、Set、Map 以及 Generator 对象。

## ajax、axios、fetch 的区别
### AJAX
Ajax 即“AsynchronousJavascriptAndXML”（异步 JavaScript 和 XML），是指一种创建交互式网页应用的网页开发技术。它是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。通过在后台与服务器进行少量数据交换，Ajax 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。传统的网页（不使用 Ajax）如果需要更新内容，必须重载整个网页页面。其缺点如下：
- 本身是针对 MVC 编程，不符合前端 MVVM 的浪潮
- 基于原生 XHR 开发，XHR 本身的架构不清晰
- 不符合关注分离（Separation of Concerns）的原则
- 配置和调用方式非常混乱，而且基于事件的异步模型不友好。

### Fetch
fetch 号称是 AJAX 的替代品，是在 ES6 出现的，使用了 ES6 中的 promise 对象。Fetch 是基于 promise 设计的。Fetch 的代码结构比起ajax简单多。fetch 不是 ajax 的进一步封装，而是原生 js，没有使用 XMLHttpRequest对象。

fetch 的优点：
- 语法简洁，更加语义化
- 基于标准 Promise 实现，支持 async/await
- 更加底层，提供的 API 丰富（request, response）
- 脱离了 XHR，是 ES 规范里新的实现方式

fetch 的缺点：
- fetch 只对网络请求报错，对 400，500 都当做成功的请求，服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
- fetch 默认不会带 cookie，需要添加配置项： fetch(url, {credentials: 'include'})
- fetch 不支持 abort，不支持超时控制，使用 setTimeout 及 Promise.reject 的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
- fetch 没有办法原生监测请求的进度，而 XHR 可以

### Axios
Axios 是一种基于 Promise 封装的 HTTP 客户端，其特点如下：
- 浏览器端发起 XMLHttpRequests 请求
- node 端发起 http 请求
- 支持 Promise API
- 监听请求和返回
- 对请求和返回进行转化
- 取消请求
- 自动转换 json 数据
- 客户端支持抵御 XSRF 攻击


##  数组的遍历方法有哪些
方法|是否改变原数组|特点
:--:|:--:|:--:
forEach()|否|不改变原数组的长度，没有返回值
map()|否|不改变原数组的长度，有返回值，可链式调用
filter()|否|过滤数组，返回包含符合条件的元素的数组，可链式调用
for...of|否|for...of 遍历具有 Iterator 迭代器的对象的属性，返回的是数组的元素、对象的属性值，不能遍历普通的 obj 对象，将异步循环变成同步循环
every() 和 some()|否|some() 只要有一个是 true，便返回 true；而 every() 只要有一个是 false，便返回 false.
find() 和 findIndex()|否|find() 返回的是第一个符合条件的值；findIndex() 返回的是第一个返回条件的值的索引值
reduce() 和 reduceRight()|否|reduce() 对数组正序操作；reduceRight() 对数组逆序操作

## forEach 和 map 方法有什么区别

这方法都是用来遍历数组的，两者区别如下：
- forEach() 方法会针对每一个元素执行提供的函数，如果遍历的元素是引用数据类型，则可以改变指针指向的堆内存里的值，该方法没有返回值；
- map() 方法返回一个新数组，新数组中的值为原数组调用函数处理之后的值，如果遍历的元素是引用数据类型，则可以改变指针指向的堆内存里的值

## 说说你对浅拷贝和深拷贝的理解
### 浅拷贝
浅拷贝，指的是创建新的数据，这个数据有着原始数据属性值的一份精确拷贝

如果属性是基本类型，拷贝的就是基本类型的值。如果属性是引用类型，拷贝的就是内存地址

即浅拷贝是拷贝一层，深层次的引用类型则共享内存地址

常见的浅拷贝：
- Object.assign
- Object.create
- slice
- concat()
- 展开运算符

### 深拷贝

深拷贝开辟一个新的栈，两个对象属完成相同，但是对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性

常见的深拷贝方式有：
- _.cloneDeep()
- jQuery.extend()
- JSON.stringify()
- 手写循环递归

##  JSON.stringify 深拷贝的缺点
如果 obj 里面有时间对象，则 JSON.stringify 后再 JSON.parse 的结果，时间将只是字符串的形式，而不是对象的形式

如果 obj 里面有 RegExp，则打印出来是空对象

如果对象中有函数或者 undefined，则会直接被丢掉

如果 json 里有对象是由构造函数生成的，则会丢掉对象的 constructon

## 知道 lodash 吗？它有哪些常见的 API ？

Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。
- _.cloneDeep 深度拷贝
- _.reject 根据条件去除某个元素。
- _.drop(array, [n=1] ) 作用：将 array 中的前 n 个元素去掉，然后返回剩余的部分.

## includes 比 indexOf 好在哪？
includes 可以检测 NaN，indexOf 不能检测 NaN，includes 内部使用了 Number.isNaN 对 NaN 进行了匹配

## AMD 和 CMD 的区别？
模块化|代表应用|特点
:---:|:--:|:--:
AMD|require.js|1.AMD 的 api 默认一个当多个用；2.依赖前置，异步执行
CMD|sea.js|1.CMD 的 api 严格区分，推崇职责单一；2、依赖就近，按需加载，同步执行

## (a == 1 && a == 2 && a == 3) 有可能是 true 吗？
### 方案一：重写 toString() 或 valueOf()
```js
let a = {  
  i: 1,  
  toString: function () {    
    return a.i++;  
  }
}
console.log(a == 1 && a == 2 && a == 3); // true
```
### 方案二：数组
数组的 toString 接口默认调用数组的 join 方法，重写 join 方法。定义 a 为数字，每次比较时就会调用 toString() 方法，我们把数组的 shift 方法覆盖 toString 即可：
```js
let a = [1, 2, 3];
a.toString = a.shift;
console.log(a == 1 && a == 2 && a == 3); // true
/*
当然把 toString 改为 valueOf 也是一样效果
let a = [1, 2, 3];
a. valueOf  = a.shift;
console.log(a == 1 && a == 2 && a == 3); // true
*/
```
### 方案三：使用 Object.defineProperty()
Object.defineProperty() 用于定义对象中的属性，接收三个参数：object 对象、对象中的属性，属性描述符。属性描述符中 get: 访问该属性时自动调用。
```js
var  _a = 1;
Object.defineProperty(this, 'a', {  
    get:function() {    
        return _a++  
    }
})
console.log(a===1 && a===2 && a===3) // true
```

## JS 中的 MUL 函数
MUL 表示数的简单乘法。在这种技术中，将一个值作为参数传递给一个函数，而该函数将返回另一个函数，将第二个值传递给该函数，然后重复继续。例如：xyz 可以表示为
```js
const mul = x => y => z => x * y * z
console.log(mul(1)(2)(3)) // 6
```

##  深度遍历广度遍历的区别？
对于算法来说 无非就是时间换空间 空间换时间
1. 深度优先不需要记住所有的节点，所以占用空间小，而广度优先需要先记录所有的节点占用空间大
1. 深度优先有回溯的操作（没有路走了需要回头）所以相对而言时间会长一点
1. 深度优先采用的是堆栈的形式，即先进后出
1. 广度优先则采用的是队列的形式，即先进先出

## JS 中的设计模式有哪些？
### 单例模式

保证一个类仅有一个实例，并提供一个访问它的全局访问点。实现的方法为先判断实例存在与否，如果存在则直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。

### 策略模式

定义一系列的算法，把他们一个个封装起来，并且使他们可以相互替换。

### 代理模式

为一个对象提供一个代用品或占位符，以便控制对它的访问。

### 中介者模式

通过一个中介者对象，其他所有的相关对象都通过该中介者对象来通信，而不是相互引用，当其中的一个对象发生改变时，只需要通知中介者对象即可。通过中介者模式可以解除对象与对象之间的紧耦合关系。

### 装饰者模式

在不改变对象自身的基础上，在程序运行期间给对象动态地添加方法。

## forEach 如何跳出循环？
forEach 是不能通过 break 或者 return 来实现跳出循环的，为什么呢？实现过 forEach 的同学应该都知道，forEach 的的回调函数形成了一个作用域，在里面使用 return 并不会跳出，只会被当做 continue

可以利用 try catch

```js
function getItemById(arr, id) {
  var item = null;
  try {
    arr.forEach(function (curItem, i) {
      if (curItem.id == id) {
        item = curItem;
        throw Error();
      }
    })
  } catch (e) {
  }
  return item;
}
```

## JS 中如何将页面重定向到另一个页面？
1. 使用 location.href：window.location.href ="url"
2. 使用 location.replace：window.location.replace("url");

## 移动端如何实现上拉加载，下拉刷新？
### 上拉加载

上拉加载的本质是页面触底，或者快要触底时的动作

判断页面触底我们需要先了解一下下面几个属性
- scrollTop：滚动视窗的高度距离 window 顶部的距离，它会随着往上滚动而不断增加，初始值是 0，它是一个变化的值
- clientHeight：它是一个定值，表示屏幕可视区域的高度；
- scrollHeight：页面不能滚动时也是存在的，此时 scrollHeight 等于 clientHeight。scrollHeight 表示 body 所有元素的总长度（包括 body 元素自身的 padding）

综上我们得出一个触底公式：
```js
scrollTop + clientHeight >= scrollHeight
```

### 下拉刷新

下拉刷新的本质是页面本身置于顶部时，用户下拉时需要触发的动作

关于下拉刷新的原生实现，主要分成三步：
- 监听原生 touchstart 事件，记录其初始位置的值，e.touches[0].pageY；
- 监听原生 touchmove 事件，记录并计算当前滑动的位置值与初始位置值的差值，大于 0 表示向下拉动，并借助 CSS3 的 translateY 属性使元素跟随手势向下滑动对应的差值，同时也应设置一个允许滑动的最大值；
- 监听原生 touchend 事件，若此时元素滑动达到最大值，则触发 callback，同时将 translateY 重设为 0，元素回到初始位置

## JS 中的数组和函数在内存中是如何存储的？
JavaScript 中的数组存储大致需要分为两种情况：
- 同种类型数据的数组分配连续的内存空间
- 存在非同种类型数据的数组使用哈希映射分配内存空间
::: warning 温馨提示
可以想象一下连续的内存空间只需要根据索引（指针）直接计算存储位置即可。如果是哈希映射那么首先需要计算索引值，然后如果索引值有冲突的场景下还需要进行二次查找（需要知道哈希的存储方式）。
:::