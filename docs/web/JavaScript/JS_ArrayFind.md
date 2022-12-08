#  JS 数组查找


- `includes()` 【判断（字符 / 数组）里有没有这个数】
- `find()` 【返回数组中第一个满足条件的key】
- `findIndex()` 【从0开始找】【返回index索引】【针对对象】
- `indexOf()` 【从0开始找】【返回index索引】【针对普通数组】
- `lastIndexOf()` 【从后往前找】【返回index索引】【针对普通数组】


##  includes() 
判断（字符 / 数组）里有没有这个数
1. 第一个参数是要找的
2. 第二个是从哪个索引开始找，默认从0开始找

```javascript
data.includes(找的参数,[可选。从哪个索引位置开始搜寻，默认值为0])
// 返回布尔值 true/false
```
### 🌰 举个栗子
```javascript
let arr = [1,2,3]
let cxc = arr.includes(1)
console.log(cxc)//true

let cxcg = arr.includes(1,1) //从第一位往后数！数组的从0开始的
console.log(cxcg)//false
```
```javascript
let str = 'volcano是个帅哥！'
let cxcg = str.includes('是')
console.log(cxcg)//true
```
##  find() 
返回数组中第一个满足条件的数据
```javascript
let arr = [10, 20, 30, 40, 50, 60, 70, 80, 90];
let cxc = arr.find((item, index) => {
    return item > 40;
})
console.log(cxc);//50
```
##  findIndex() 
返回数组中第一个满足条件的索引(从0开始), 不满足返回-1
```javascript
let arr = [10, 20, 30, 40, 50, 60, 70, 80, 90];
let cxc = arr.findIndex((item, index) => {
    return item > 40;
})
console.log(cxc);//4
```
- `findIndex` ：比较函数作为第一个参数，多用于非基本类型(例如对象)的数组索引查找，或查找条件很复杂
- `indexOf` ：查找值作为第一个参数，采用 === 比较，更多的是用于查找基本类型，如果是对象类型，则是判断是否是同一个对象的引用
##  indexOf() 
返回数组中第一个满足条件的索引(从0开始), 不满足返回-1
```javascript
// var num = [10, 20, 30, 40, 50, 60, 70, 80, 90];
let arr = [10, 20, 30, 40, 50, 60, 70, 80, 90];
let cxc = arr.indexOf(40);
let cxcg = arr.indexOf(40, 10);//从索引10的位置开始向后查找

console.log("cxc = " + cxc);//3
console.log("cxcg = " + cxcg);//-1
```
- `indexOf` 更多的是用于查找基本类型，如果是对象类型，则是判断是否是同一个对象的引用
```js
let arr = [{a: 1}, {b: 2}];
console.log(sisters.indexOf({b: 2}));// -1 【找不到这个对象】

const an = {b: 2}
arr = [{a: 1}, an];
console.log(sisters.indexOf(an));// 1 【对象的引用是可以匹配的！】
```


##  lastIndexOf() 
返回数组中最后一个满足条件的索引(从0开始), 不满足返回-1
```javascript
let arr = [10, 20, 30, 40, 50, 60, 70, 80, 90];
let cxc = arr.lastIndexOf(40);
let cxcg = arr.lastIndexOf(40, 9);//从索引1的位置开始向前查找
let cxcgg = arr.lastIndexOf(40, 1);//从索引1的位置开始向前查找

console.log(cxc);//3
console.log(cxcg);//3
console.log(cxcgg);//-1 从1往前找是找不到的了哦~
```
