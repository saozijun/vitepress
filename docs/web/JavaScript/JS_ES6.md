#  ES6

##  变量 - let
1. 变量不能重复声明
1. 块级作用域
1. 不存在变量提升
```javascript
let cxc = "cxc";
```
##  常量 - const

1. 一定要赋初始值
1. 一般常量使用大写
1. 常量的值不能修改
1. 块级作用域
1. 对数组和对象的元素修改，不算 对常数的修改，不会报错。
```javascript
const xg = "xg";
```
##  解构赋值
### 数组解构：
```javascript
const F4 = ['小沈阳','刘能','赵四','宋小宝'];
let [xiao,liu,zhao,song] = F4;
console.log(xiao); //'小沈阳'
```
### 对象解构：
```javascript
const zhao = {
  name:'cxc',
  age'18',
}
let { name , age } = zhao;
console.log(name);
console.log(age);
```
##  模板字符串『 ` ` 』
```javascript
let str = `字符串`;

let strr = `cxc
            lalala
            lalala`;

let strrr = `cxc${str}`;
```
##  简化对象写法
```javascript
let name = 'cxc';

const shuaige = {
   name, //等效于 name:name;
}

//比如 vue中的components组件
components:{ //定义子组件
  home,
},

```
##  箭头函数

1. 【在箭头函数下】this是静态的，this始终指向函数声明时所在作用域下的this的值
1. 【在箭头函数下】不能作为构造实例化对象
1. 【在箭头函数下】不能使用arguments 变量
```javascript
let fn = function(){}

let fn = () => {
  //箭头函数简化后
}
```

4. 省略参数小括号，省略方法花括号
```javascript
let add = n => { //把(n) 省略成 n
  return n + n;
}

let pow = n => n * n ; //省略花括号得写成一行

```

5. 【箭头函数适合与 this 无关的回调。定时器，数组的方法回调】【不适合与 this 有关的回调。事件回调，对象的方法】
##  函数参数的默认值设置

1. 形参初始值 具有默认值的参数，一般位置要靠后（潜规则）
```javascript
function add (a,b,c=10){
  return a + b + c;
}
```
##  rest参数『 ...args 』

1. ES6引入 rest 参数，用于获取函数的实参，用来代替 arguments
1. rest 参数必须要放到最后
```javascript
// es5
function date(){
  cosole.log(arguments);
}
date('x','xx','cxc');

//es6
function dates(...args){
  console.log(args);
}
dates('cxcg','cxcgg','cxcggg');

//2. rest 参数必须要放到最后
function fn(a,b,...args){
  //
}
```
##  扩展运算符『 ... 』

1. 『 ... 』扩展运算符能将『数组』转换为逗号分隔的『参数序列』
```javascript
//『 ... 』扩展运算符能将『数组』转换为逗号分隔的『参数序列』
const shyBoy = ['cxc','ty','xzz'];//=> 'cxc','ty','xzz'

function fn(){
  console.log(arguments);
}

fn(...shyBoy);
```

2. 数组的合并
```javascript
const name1 = ['cxc','cxcgg']
const name2 = ['yt','ytt']

const ddd1 = name1.concat(name2);
const ddd2 = [...name1, ...name2];
console.log(ddd1);
console.log(ddd2);
```

3. 数组的克隆
```javascript
const sanzhihua = ['E','G','M'];
const sanyecao = [...sanzhihua]; //['E','G','M']; 【浅拷贝】：拷贝变量所存的值，如果是引用变量，那拷贝的就是它里面的地址。
```

4. 将伪数组转为真正的数组
```javascript
const divs = Object;
const array = [...divs];
```
##  Symbol【独一无二的值】
阮一峰：[https://es6.ruanyifeng.com/#docs/symbol](https://es6.ruanyifeng.com/#docs/symbol)  

- ES6引入的新原始数据类型，类似字符串数据类型，是第七种数据类型。
1. Symbol的值是唯一的，用来解决命名冲突的问题。
1. Symbol值不能与其他数据进行运算
1. Symbol定义的对象不能使用 for ...in 循环遍历，但是可以用 Reflect.ownKeys 来获取对象的所有键名。
```javascript
let s = Symbol(); //创建
let s2 = Symbol('cxc'); //创建  这种创建方法 参数一样，也不相等
let s3 = Symbol.for('cxcgg'); //函数创建 这种创建方法，参数一样就相等
```

4. Symbol 创建对象属性
```javascript
let game = {
  name:'俄罗斯方块',
  up:...;
  down:...;
}
let methods = {
  up:Symbol(),
  down:Symbol()
}
game[methods.up] = function(){
  console.log('1')
}
game[methods.down] = function(){
  console.log('2')
}
console.log(game) // 使用这种方式可以在game原有相应功能的基础上，添加多一个独一无二的方法，即使名字相同~
```
```javascript
let youxi = {
  name:'狼人杀',
  [Symbol('say')]:function(){
    console.log('我可以发言');
  }
}
```
###  Symbol内置值：略
##  迭代器（Iterator)

- **for...of **循环，Iterator接口主要供 for...of消费
1. Array
1. arguments
1. Set
1. Map
1. String
1. TypeArray
1. NodeList
##  生成器

- 生成器就是一个特殊的函数
- 异步编程 纯回调函数
```javascript
funtction * gen(){
  cosole.log('hello');
  yield 111;
}
let iterator = gen();
iterator.next(); // 要使用 next() 来调用
```
##  Promise
Promise 是ES6引入的异步编程的新解决方案，语法上Promise是一个构造函数，用来封装【异步操作】并可以获取成功或失败。
```javascript
const p = new Promise(function(resolve,reject){
  setTimeout(function(){
    //
    let data = 'data';
    resolve(data);
    
    let err = '数据读取失败';
    reject(err)
  },1000};
});

//调用 promise 对象的 then 方法
p.then(function(value){
  console.log(value);
},function(reason){
  console.log(reason);
})
```
###  promise读取文件
```javascript
const fs = require('fs');

//
fs.readFile('./cxc.md',(err,data)=>{
  if(err) throw err;
  console.log(data.toString());
});

//使用Promise
const p = new Promise(function(resolve,reject){
  fs.readFile("./cxc.md",(err,data)=>{
    if(err) rejuect(err);
    resolvue(data);
  });
});


p.than(funciton(value){
       console.log(value.toString()):
},function(reason){
  console.log("读取失败！！");
});
```
###  promise封装AJAX 

1. 原始
```javascript
//1.创建对象
const xhr = new XMLHttpRequest();

//2.初始化
xhr.open("GET","https://api.apiopen.top/getJoke");

//3.发送
xhr.send();

//4.绑定事件，处理响应结果
xhr.onreadystatechange = function(){
  if(xhr.readyState === 4){
    if(xhr.status >= 200 && xhr.status < 300){
      console.log(xhr.response);
    }else{
      console.error(xhr.status);
    }
  }
}
```

2. 封装
```javascript
const p = new Promise((resolve,reject)=>{
	//1.创建对象
	const xhr = new XMLHttpRequest();
	
	//2.初始化
	xhr.open("GET","https://api.apiopen.top/getJoke");
	
	//3.发送
	xhr.send();
	
	//4.绑定事件，处理响应结果
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status >= 200 && xhr.status < 300){
				
				resolve(xhr.response);
			}else{
				reject(xhr.status);
			}
		}
	}
})

p.then(function(value){
	console.log(value);
},function(reason){
	console.error(reason);
});
```
###  Promise-then方法
```javascript
const p = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve('data');
  },1000)
});

//调用 then 方法  成功了执行第一个方法， 失败了执行第二个方法
p.then(value => {
  console.log(value);
}, reason => {
  console.log(reason);
});

//then的返回 也是一个Promise ，他的返回结果是他的执行结果所决定的！
const result = p.then(value => {
  console.log(value);
}, reason => {
  console.log(reason);
});
```
###  Promise-catch方法
```javascript
const p = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    reject('出错啦！');
  },1000)
});

p.catch(function(reason){
  console.warn(reason);
})
```

---

##  集合 - set
###  基础：

1. 集合去重
```javascript
let s = new Set([3,4,5,6,5]);
let S2 = new Set([1,2,3,4,1,2,3])

console.log(s);//[3,4,5,6]
console.log(s2);//[1,2,3,4]
```

2. 元素个数
```javascript
let S2 = new Set([1,2,3,4,1,2,3])
s2.size
```

3. 添加新元素
```javascript
let S2 = new Set([1,2,3,4,1,2,3])
s2.add('100');
```

4. 删除元素
```javascript
let S2 = new Set([1,2,3,4,1,2,3])
s2.delete('1');
```

5. 检测
```javascript
let S2 = new Set([1,2,3,4,1,2,3])
console.log(s2.has('1')); //true
console.log(s2.has('101')); //false
```

6. 清空
```javascript
let S2 = new Set([1,2,3,4,1,2,3])
s2.clear();
console.log(s2);//[]
```
###  数组去重
```javascript
let arr = [1,2,3,4,5,4,3,2,1];
let result = [...new Set(arr)];

console.log(result) 
```
###  交集
```javascript
let arr = [1,2,3,4,5,4,3,2,1];
let arr2 = [4,5,6,5,6];

let result = [...new Set(arr)].filter(item => {
	let s2 = new Set(arr2);//4 5 6
	if(s2.has(item){
		 return true;
	}else{
		 return false;
	}
});

//简写
//let result = [...new Set(arr)].filter(item => new Set(arr2).has(item));

console.log(result) 
```
###  并集
```javascript
let arr = [1,2,3,4,5,4,3,2,1];
let arr2 = [4,5,6,5,6];

let union = [...arr,...arr2];
let result = [...mew Set(union)];

console.log(result) 
```
###  差集

1. 1里面有的 2里面没有【1和2的差集】
1. 2里面有的 1里面没有【2和1的差集】
```javascript
let arr = [1,2,3,4,5,4,3,2,1];
let arr2 = [4,5,6,5,6];

let diff = [...new Set(arr)].filter(item => !(new Set(arr2).has(item)));

console.log(diff) 
```
##  Map
###  基础：
```javascript
let m = new Map();
```

1. 添加元素
```javascript
m.set('name','cxc');
```

2. 元素个数
```javascript
m.size
```

3. 删除
```javascript
m.delete('name');
```

4. 获取
```javascript
m.get('name');
```

5. 清空
```javascript
m.clear();
```

6. 遍历
```javascript
for(let v of m){
  console.log(v)
}

//["name","cxc"]
  
```

---

## Class - 类
对象的模板，可以看作语法糖
常规
```javascript
//手机
function Phone(brand,price){
  this.brand = brand;
  this.price = price;
}

//添加方法
Phone.prototype.call = function(){
  console.log("call");
}

//实例化对象
let Huawei = new Phone('华为',5999);
Hwawei.call();
console.log(Huawei);
```
使用class
```javascript
class Phone{
  //构造方法 名字不能修改 此方法在new 实例后调用
  constructor(brand,price){
    this.brand = brand;
    this.price = price;
  }
  
  //方法必须使用该语法，不能使用 ES5的对象完整形式 call:function(){}
  call(){
    console.log('call');
  }
}
  
  let onePlus = new Phone('1+',1999);

console.log(onePlus)
```
### 静态成员

- 静态成员 属于类， 不属于实例对象

常规
```javascript
function Phone(){
  
}

Phone.name = "手机";  //【静态成员】
Phone.change = function(){
  console.log("我可以改变");
}

let nokia = new Phone(); //【实例对象 指向的是 原型对象】

console.log(nokoia.name); //undefined   【拿不到】
nokia.change(); //【没有这个方法】


Phone.prototype.size = '5.5inch';
console.log(nokia.size); //5.5inch    【得往prototype 原型里面加 才拿得到】
```
使用class
```javascript
calss Phone {
  //静态属性
  static name = '手机';
  static change(){
    console.log("我可以改变");
  }
}

let nokia = new Phone();
console.log(nokoia.name); //undefined   【拿不到】
console.log(Phone.name); //手机   【静态成员 属于类， 不属于实例对象】
```
### 类继承
ES5
```javascript
//手机
function Phone(brand,price){
  this.brand = brand;
  this.price = price;
}

Phone.prototype.call = function(){
  console.log("call");
}

function SmartPhone(brand,price,color,size){
  Phone.call(this,brand,price);
  this.color = color;
  this.size = size;
}

//设置子级构造函数的原型
SmartPhone.prototype = new Phone;
SmartPhone.prototype.constructor = SmartPone;

//声明子类的方法
SmartPhone.prototype.palyGame = function(){
  console.log("game");
}

const chuizi = new SmartPhone('锤子',2499,'黑色','5.5inch');

console.log(chuizi);
```
class
```javascript
class Phone{
  //构造方法
  constructor(brand,price){
    this.brand = brand;
    this.price = price;
  }
  
  //父类的成员属性
  call(){
    console.log("call")
  }
}

class SmartPhone extends Phone {
  //构造方法
  constructor(brand,price,color,size){
    super(brand,price);
    this.color = color;
    this.size = size;
  }
  
  photo(){
    console.log("拍照");
  }
  playGame(){
    console.log("玩游戏");
  }
}

const xiaomi = new SmartPhone("小米",799,"黑色","4.7inch");
console.log(xiaomi);
```
### 子类对父类的重写
```javascript
class Phone{
  //构造方法
  constructor(brand,price){
    this.brand = brand;
    this.price = price;
  }
  
  //父类的成员属性
  call(){
    console.log("call")
  }
}

class SmartPhone extends Phone {
  //构造方法
  constructor(brand,price,color,size){
    super(brand,price);
    this.color = color;
    this.size = size;
  }
  
  photo(){
    console.log("拍照");
  }
  playGame(){
    console.log("玩游戏");
  }
  call(){
    //不能使用super
    console.log("我可以进行视频通话");
  }
}

const xiaomi = new SmartPhone("小米",799,"黑色","4.7inch");
console.log(xiaomi);
```
## get 和 set
```javascript
class Phone{
  class Phone{
    get price(){
      console.log("价格属性被读取");
      return 'cxc';
    }
    
    set price(newValue){ //必须要有参数
      console.log("价格属性被修改了");
  }

//实例化对象
let s = new Phone();

s.price = 'free';    

console.log(s.price); 
//价格属性被读取
//cxc
```
##  ES6的数值扩展

1. Number.EPSILON 【最小精度】
1. 二进制和八进制 【0b1010】-【0b开头】【 0o777】-【0o开头】
1. Number.isFinite【检测一个数值是否有限数】【Number.isFinite(100)】
1. Number.isNaN 【检测是不是NaN】
1. Number.ParseInt 、Number.parseFloat 【字符串转整数】
1. Number.isInteger 【判断一个数是否为整数】【Number.isInteger(5.5)】
1. Math.trunc 【将数字的小数部分抹掉】【Math.trunc(3.5)】【其实就是向下取整】
1. Math.sign 【判断一个数为 正数 负数 还是0】【正数为1，负数为-1，0为0】

##  对象方法扩展

1. Object.is 【判断两个值是否完全相等】【NaN 是 NaN】
1. Object.assign 【对象的合并】【Object.assign(cxc1,cxc2)】【如果有相同的属性，后面的参数会把前面的覆盖了】
1. Object.setPrototypeOf 【设置原型对象】
1. Object.getPrototypeof

##  ES 模块化

- 模块化是指将一个大的程序文件，拆分成许多小的文件，然后将小文件组合起来。

模块化产品：

1. CommonJS => NodeJS
###  模块化语法：

1. **【export】 命令用于暴露出接口**
1. **【import】 命令用于引入其他文件的接口**
```javascript
//1.通用的导入方式
import * as m1 from "./src/js/m1.js";

//2.解构赋值的方式
import {cxc} from "./src/js/m2.js";

//3.简便形式 针对默认人暴露
import m3 from "./src/js/m3.js";
```
方法二：入口文件（app.js或者叫main.js)
```javascript
// 入口文件

//模块引入
import * as m1 from "./m1.js";
import * as m2 from "./m2.js";
...
...
...

...
```
```html
// 引入入口文件
<srcipt src="./src/js/app.js" type="module"></script>
```
##  babel

- babel - 把ES6转化为大部分浏览器可接受的ES5
1. 安装：babel-cli babel-preset-env browserify(webpack)
1. 转换：npx babel src/js -d dist/js
1. 打包：npx browserify dist/js/app.js -o dist/bundle.js
```html
// 引入入口文件
<srcipt src="./src/js/app.js" type="module"></script>
//改成
<srcipt src="dist/bundle.js" type="module"></script>
```
##  async 和 await【ES8新特性】
async和await 两种语法结合可以让异步代码像同步代码一样！
### async函数：

1. async函数的返回值为promise对象
1. promise 对象的结果由async函数执行的返回值决定
### await表达式：

1. await 必须写在async函数中
1. await 右侧的表达式一般为promise对象
1. await 返回的是promise成功的值
1. await 的promise 失败了，就会抛出异常，需要通过try...catch捕获处理
```javascript
async function fn(){
   //只要你返回的不是一个Promise类型的对象 那这个函数是一个【成功】的Promise
   //比如说 函数里面返回一个字符串，那么这个函数是成功的Promise
}

const result = fn();
console.log(result);
```
```javascript
async function fn(){
   return new Promise((resolve,reject)=>{
     resolve('成功');
     //reject('失败');
}

const result = fn();
console.log(result);
```
```javascript
const p = new Promise((res,rej)=>{
	res('good');
});

async function main(){
	try{
		let result = await p;
		console.log(result);
	}catch(e){
		console.log(e);
	}
}
main();
//good
```
##  对象方法扩展
### Object.keys(cxc)
获取对象所有的键
### Object.values(cxc)
获取对象所有的值
### Object.entries(cxc)
返回一个数组，键值对。
### Object.getOwnPropertyDescriptors(cxc)
对象属性的描述对象
