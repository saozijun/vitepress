#  JS 数组遍历

- `forEach()`【遍历循环】【无返回】
- `map()`【遍历循环】【返回】
- `for`【遍历循环】
- `for of`【遍历循环】
- `filter()`【过滤】
- `every()`【所有都满足才 true】
- `some()`【有一个满足就 true】
- `reduce()` 和 `reduceRight()`【迭代所有项】

 
##  forEach()【遍历循环】【无返回】

1. 数组内容
1. 索引
1. 数组本身

```js
var arr = [1, 2, 3, 4, 5];
arr.forEach(function (item, index, array) {
  console.log(item + "|" + index + "|" + (array === arr));
});
// 输出为：
// 1|0|true
// 2|1|true
// 3|2|true
// 4|3|true
// 5|4|true
```

##  map()【遍历循环】【返回】

```js
var arr = [1, 2, 3, 4, 5];
var arr2 = arr.map(function (item) {
  return item * item;
});
console.log(arr2); //[1, 4, 9, 16, 25]
```

##  for【遍历循环】

for 循环和 forEach 是等价的，都是循环数组

```javascript
let arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

##  for of【遍历循环】

for of 是 ES6 语法，支持 return,并且是只能遍历数组，不能遍历对象

```javascript
let arr = [1, 2, 3, 4, 5];
for (let i of arr) {
  console.log(i);
}
//1
//2
//3
//4
//5
```

如果要遍历对象 可以 

#### 对象 

Object.keys 将对象的 key 作为新的数组

```javascript
let obj = { school: "name", age: 8 };
for (let i of Object.keys(obj)) {
  console.log(obj[i]);
}
//name
//8
```


##  filter()【过滤】

- 返回符合的项，

```js
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var arr2 = arr.filter(function (item, index) {
  return index % 3 === 0 || item >= 8;
});
console.log(arr2); //[1, 4, 7, 8, 9, 10]
```

##  every()【所有都满足才 true】

- 判断数组中每一项都是否满足条件，只有所有项都满足条件，才会返回 true。

```js
var arr = [1, 2, 3, 4, 5];
var arr2 = arr.every(function (item) {
  return item < 10;
});
console.log(arr2); //true
var arr3 = arr.every(function (item) {
  return item < 3;
});
console.log(arr3); // false
```

##  some()【有一个满足就 true】

- 判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回 true。

```js
var arr = [1, 2, 3, 4, 5];
var arr2 = arr.some(function (item) {
  return item < 3;
});
console.log(arr2); //true
var arr3 = arr.some(function (item) {
  return item > 6;
});
console.log(arr3); // false
```

##  reduce() 和 reduceRight()【迭代所有项】

- 迭代数组的所有项
- `reduce()` 从数组的第一项开始，逐个遍历到最后。
- `reduceRight()` 从数组的最后一项开始，向前遍历到第一项。
- 这个函数返回的任何值都会作为【第一个参数】自动传给下一项
- 四个参数分别为：（前一个返回值，当前值，索引，数组对象）

```js
var values = [1, 2, 3, 4, 5];
var sum = values.reduceRight(function (prev, cur, index, array) {
  return prev + cur;
}, 10); //👈 这个相当于给prev设了一个初始值10
console.log(sum); //25
//10 + 5 = 15
//15 + 4 = 19
//19 + 3 = 22
//22 + 2 = 24
//24 + 1 = 25
```

