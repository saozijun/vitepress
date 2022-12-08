# 💛 JS 字符串方法

## 💛 大写化
```js
let str = 'cxc'
str.toUpperCase() //cxc       
```
## 💛 小写化
```js
let str = 'cxc'
str.toLowerCase() // cxc
```
## 💛 indexOf
会搜索指定字符串出现的位置： 没有找到会返回 -1 
```js 
let str = 'cxc'
str.indexOf('g') // 2        
```
## 💛 返回指定索引区间的子串
```js
let str = '0123456789'
str.substring(2) //23456789
str.substring(2,5) //234      
```

##  includes() 
判断（字符 / 数组）里有没有这个数
1. 第一个参数是要找的
2. 第二个是从哪个索引开始找，默认从0开始找
```javascript
let str = 'volcano是个帅哥！'
let cxcg = str.includes('是')
console.log(cxcg)//true
```