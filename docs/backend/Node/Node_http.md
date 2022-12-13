# Node - http模块

```js
// http.js
const http = require('http');

const server = http.createServer((req,res)=>{
  res.end('hello')
})

server.listen(3000,'127.0.0.1',()=>{
  console.log('服务启动成功')
})
//前面3000是端口/后面是ip地址
```
在终端输入`node http.js`启动服务   
然后上浏览器：http://127.0.0.1:3000 就可以访问了！🥳🎉