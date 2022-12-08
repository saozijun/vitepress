#  JS 数组方法

###  改变原数组的那 7 个~ 【数组的变异】

- `push()` - 在末尾添加元素
- `pop()` - 删除末尾元素
- `unshift()`- 头部添加元素
- `shift()` - 删掉头部首个元素,并返回第一个元素
- `sort()` - 排序
- `reverse()`- 反转排序
- `splice()`- 多功能方法

###  不会改变原数组

- `slice()` - 截取数组的部分元素
- `concat()` - 数组合并数组 并返回一个新的数组
- `indexOf` `lastIndexOf` - 查找数组中的项，返回对应索引
- `join()` - 把当前数组的每个元素都用指定的字符串连接起来，然后返回连接后的字符串

##  push()和 pop()【向最后一位添加/删除】

- push()：可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。
- pop()：数组末尾移除最后一项，减少数组的 length 值，然后返回移除的项。

```js
var arr = ["Lily", "lucy", "Tom"];
var count = arr.push("Jack", "Sean");
console.log(count); // 5
console.log(arr); // ["Lily", "lucy", "Tom", "Jack", "Sean"]

var item = arr.pop();
console.log(item); // Sean
console.log(arr); // ["Lily", "lucy", "Tom", "Jack"]
```

##  shift() 和 unshift()【向首位添加/删除】
- unshift()：将参数添加到原数组开头，并返回数组的长度 。
- shift()：删除原数组第一项，并返回删除元素的值；如果数组为空则返回 undefined 。


```js
var arr = ["Lily", "lucy", "Tom"];
var count = arr.unshift("Jack", "Sean");
console.log(count); // 5
console.log(arr); //["Jack", "Sean", "Lily", "lucy", "Tom"]

var item = arr.shift();
console.log(item); // Jack
console.log(arr); // ["Sean", "Lily", "lucy", "Tom"]
```

##  sort()【升序】

- sort()：按升序排列数组项——即最小的值位于最前面，最大的值排在最后面  
- 在排序时，sort()方法会调用每个数组项的 toString()转型方法，然后比较得到的字符串，以确定如何排序。  
- 即使数组中的每一项都是数值， sort()方法比较的也是字符串，因此会出现以下的这种情况：

```js
var arr1 = ["a", "d", "c", "b"];
console.log(arr1.sort()); // ["a", "b", "c", "d"]

var arr2 = [13, 24, 51, 3];
console.log(arr2.sort()); // [13, 24, 3, 51]
console.log(arr2); // [13, 24, 3, 51](原数组被改变)
```

```js
function compare(value1, value2) {
  if (value1 < value2) {
    return -1;
  } else if (value1 > value2) {
    return 1;
  } else {
    return 0;
  }
}
arr2 = [13, 24, 51, 3];
console.log(arr2.sort(compare)); // [3, 13, 24, 51]
```

##  reverse()【反转数组】

```js
var arr = [13, 24, 51, 3];
console.log(arr.reverse()); //[3, 51, 24, 13]
console.log(arr); //[3, 51, 24, 13](原数组被改变)
```

##  splice()【多功能方法】

1. 删除 - 两个参数，（删除的开始位置，删除的个数）【会返回删除的东西】
2. 插入 - 三个参数及以上，（起始位置，要删除的项，要插入的项）【不会返回】
3. 替换 - 三个参数及以上，（起始位置，要删除的项目，要插入的项）【返回被删除的】

```js
var arr = [1, 3, 5, 7, 9, 11];

//两个参数 - 删除 第0到第2之前
var arrRemoved = arr.splice(0, 2);
console.log(arr); //[5, 7, 9, 11] - 改变原数组
console.log(arrRemoved); //[1, 3] - 会返回

//此时 arr = [5, 7, 9, 11]
//插入 - 三个参数及以上，（起始位置，要删除的项，要插入的项）【不会返回】
var arrRemoved2 = arr.splice(2, 0, 996, 1024);
console.log(arr); // [5, 7, 996, 1024, 9, 11]
console.log(arrRemoved2); // [] - 不会返回

///此时 arr = [5, 7, 996, 1024, 9, 11]
//替换时，第一个参数和第二个参数一样...
var arrRemoved3 = arr.splice(1, 1, 985, 211);
console.log(arr); // [5, 985, 211, 996, 1024, 9, 11]
console.log(arrRemoved3); //[7]
```

##  slice()【切片 - 截取数组】

这个和上面的 splice()只差一个字母....  
- slice()  不会改变原数组

```js
var arr = [1, 3, 5, 7, 9, 11];

var arrCopy = arr.slice(1);  //从1 到 后面所有
console.log(arrCopy); //[3, 5, 7, 9, 11]

var arrCopy2 = arr.slice(1, 4); //从 1 到第4个（前 =< x =< 后）
console.log(arrCopy2); //[3, 5, 7]

var arrCopy3 = arr.slice(1, -2); //从1 到 倒数第2个前 （前 =< x < 后）
console.log(arrCopy3); //[3, 5, 7]

var arrCopy4 = arr.slice(-4, -1); //从倒数 第4个 到 倒数第1个前（前 =< x < 后）
console.log(arrCopy4); //[5, 7, 9]

console.log(arr); //[1, 3, 5, 7, 9, 11](原数组没变)
```

##  concat()【数组合并数组】

```js
var arr = [1, 3, 5, 7];
var arrCopy = arr.concat(9, 11, 13);
console.log(arrCopy); //[1, 3, 5, 7, 9, 11, 13]
console.log(arr); // [1, 3, 5, 7](原数组未被修改)

var arrCopy2 = arr.concat([9, [11, 13]]);
console.log(arrCopy2); //[1, 3, 5, 7, 9, Array[2]]
console.log(arrCopy2[5]); //[11, 13]
```

##  indexOf()和 lastIndexOf()【查找，返回索引】

- indexOf()：【从前往后找】，lastIndexOf：【从后往前找】
  - 参数一：要查找的项
  - 参数二：（可选的）表示查找起点位置的索引。

```js
var arr = [1, 3, 5, 7, 7, 5, 3, 1];
console.log(arr.indexOf(5)); //2
console.log(arr.indexOf(5, 2)); //2
console.log(arr.indexOf("5")); //-1，找不到返回-1

console.log(arr.lastIndexOf(5)); //5
console.log(arr.lastIndexOf(5, 4)); //2
```

##  join(分隔符)【数组元素的连接】

```js
let arr = [1, 2, 3];

console.log(arr.join()); // 1,2,3
console.log(arr.join("-")); // 1-2-3
console.log(arr); // [1, 2, 3]（原数组不变）
```
