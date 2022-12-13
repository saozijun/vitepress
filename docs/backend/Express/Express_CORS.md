# Express - CORS跨域

## 方法一：CORS
![图 1](img/f00055fe9548053ecb3ddfb1b4611a1889d9ba9b1abd08c8e97eee051e3a495e.png)  

![图 2](img/1962cf7e801c3327abca5b7ff93f795dc03270a4abffbce2df3ad3bd63f92ec0.png)  


```sh
npm install cors
```
```js
const cors = require('cors')
```
```js
app.use(cors())
```

## 方法二：手动配置
这些个代码也是发在中间件的位置！  
`*`号表示 所有请求头都可以来访问的这个api接口！
```js
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
```
```js
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
```
或者  
下面这个是多个的
```js
var allowCors = function (req, res, next) {
    if (req.headers.origin == 'http://localhost:3000' || req.headers.origin == 'https://www.cxc.com') {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    }
};
app.use(allowCors); //使用跨域中间件
```