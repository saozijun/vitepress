#  JS 代码片段

##  定时器
```js
setTimeout(function(){
    //方法
},1000)
```
##  执行浏览器复制命令
```js
document.execCommand("Copy");
```
##  在js处实现网页跳转
```js
location.href="网址"
```
##  监听鼠标位移
```js
window.addEventListener('mousemove',(e) => {
    let per = (100 - e.clientX / window.innerWidth * 100)
})
```
##  获取字符串的首个字
```js
str.substr(0,1)
```
##  监听浏览器窗口变化
```js
window.onresize = function() {
    // 浏览器窗口变化后需要做的事情
}
window.addEventListener('resize', function() {
    // 变化后需要做的事
})
```
