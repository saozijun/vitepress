# Express - Route 路由

### 请求的方法来区分👇

1. get 
2. post
3. put
4. delete
5. ....
### 通过 uri 来区分👇
```js
app.get('/demo',(req,res)=>{
	//...	
})
```
### 全部响应 - all
```js
app.all('/',(req,res)=>{
	//...	
})
```

## 路由中间件
为了更加方便管理【接口请求】把各类请求封装成一个一个的模块，然后使用中间件串起来~   

新建一个 `router` 的文件夹，然后在其下创建一个 `index.js` 文件
```javascript
//创建 src/router/index.js 
const express = require('express')

//1.创建路由实例
// 路由实例 相当于一个 mini Express 实例~
const router = express.Router()

//2.配置路由
router.get('/cxc',(req,res) => {
  res.json({
    name:'cxc'
  })
})

//3.导出
module.exports = router
```
然后回到入口文件 `app.js` 把它引入！！！
```javascript
//app.js
//1.引入...
const router = require('./router/router.js')

//2.中间件/跨域
//...

//3.【接口】路由 and 路由挂载
app.use(router)
//也可以限定路由 这样 请求就得 /abc/cxc
app.use('/abc',router)


//4.404
//5.错误捕获
//6.服务开启！
```