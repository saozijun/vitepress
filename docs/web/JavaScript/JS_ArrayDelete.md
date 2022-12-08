#  JS 数组删除

- `length()` 【长度】
- `delete()`【删除指定一个位置】
- `pop()` 栈方法【去掉并返回最后一个】
- `shift()` 队列【移除并返回第一项】
- `splice()` 【多功能删除】


##  length() 【长度】
JavaScript中Array的length属性非常有特点一一它不是只读的。  
通过设置这个属性可以从数组的末尾移除项或添加新项
```javascript
let colors = ["red", "blue", "grey"];   //创建一个包含3个字符串的数组

colors.length = 2; //也就是他把长度设为了2 第三个就没了 

console.log(colors);  //["red","blue"]
console.log(colors[2]);  //undefined  就是未定义！
```


##  delete()【删除指定一个位置】
```javascript
let arr = [1, 2, 3, 4];

delete arr[0];

console.log(arr[0]);   //undefined
console.log(arr);   //[undefined, 2, 3, 4]
```
删除第0位，但是长度没变


##  pop() 栈方法【去掉并返回最后一个】
```javascript
let colors = ["red", "blue", "grey"];

let item = colors.pop();

console.log(item);      //"grey"
console.log(colors);    // ['red', 'blue']
```
pop就是返回最后一位，而原数组里会被去掉最后一个


##  shift() 队列【移除并返回第一项】
```javascript
let colors = ["red", "blue", "grey"];

let item = colors.shift();

console.log(item);      //"red"
console.log(colors);    //['blue', 'grey']
```


##  splice() 【多功能删除】
- splice 除了可以删除还可以替换，在这里只讨论【删除】
- splice 删除只需要设置两个参数

1. 参数一：删除的开始位置
2. 参数二：要删除多少个？  
- 例如splice(0, 2)会删除数组中的前两项。
- 例如splice(1, 2)会删除数组中从1开始数往后两项。
```javascript
let colors = ["red", "blue", "grey"];

let item = colors.splice(0, 1);

console.log(item);      //"red"
console.log(colors);    //["blue", "grey"]
```
