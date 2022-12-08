#  JS 零碎笔记

##  所有参数 arguments 
```js
function cxc() {
  console.log(arguments.length); // [参数的长度]
  console.log(arguments); //[转入的参数]
}

cxc(1,2,3);
```
##  无限大 Infinity 
```js
Infinity   //无限大
-Infinity   //无限小
```

##  转义序列 encodeURIComponent()

> [百度百科：encodeURIComponent() 函数](https://baike.baidu.com/item/encodeURIComponent%28%29%20%E5%87%BD%E6%95%B0/7418815?fr=aladdin)  
作用：可把字符串作为URI 组件进行编码。
```js
encodeURIComponent("你好，世界！")
encodeURIComponent("Hello world!")
encodeURIComponent(",/?:@&=+$#")

//输出结果：
//测试一：%E4%BD%A0%E5%A5%BD%EF%BC%8C%E4%B8%96%E7%95%8C%EF%BC%81
//测试二：Hello%20world!
//测试三：%2C%2F%3F%3A%40%26%3D%2B%24%23
```
