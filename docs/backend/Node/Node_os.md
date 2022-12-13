# Node - os模块

os 模块是专门用来操作系统的

### 引入 os模块
```js
const os = require('os')
```

### os.cpus - 获取cpu的数量
```js
const os = require('os')

const cpus = os.cpus(); //获取当前cpu的数量

console.log(cpus.length)
```

## 常用方法
```js
os.tmpdir() //返回操作系统的默认临时文件夹。
os.endianness() //返回 CPU 的字节序，可能的是 "BE" 或 "LE"。
os.type() //返回操作系统名
os.platform() //返回编译时的操作系统名
os.arch() //返回操作系统 CPU 架构，可能的值有 “x64”、“arm” 和 “ia32”。
os.release() //返回操作系统的发行版本。
os.uptime() //返回操作系统运行的时间，以秒为单位。
os.loadavg() //返回一个包含 1、5、15 分钟平均负载的数组。
os.totalmem() //返回系统内存总量，单位为字节。
os.freemem() //返回操作系统空闲内存量，单位是字节。
os.networkInterfaces() //获得网络接口列表。
```