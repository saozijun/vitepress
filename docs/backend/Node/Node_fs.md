# Node - fs模块

[[toc]]


###  引入 fs模块
```javascript
//引入模块👇
const fs = require("fs");
```
### 文件读取 readFileSync / readFile
1. 参数一：文件的路径
2. 参数二：打开的编码方式（可选）
3. readFile参数三：回调
```javascript
const fs = require("fs");

//同步👇 readFileSync
let buf = fs.readFileSync("1.txt");
let data = fs.readFileSync("1.txt", "utf8");
console.log(buf); // <Buffer 48 65 6c 6c 6f>
console.log(data); // Hello

//异步👇 readFile
fs.readFile("1.txt", "utf8", (err, data) => {
    console.log(err); // null
    console.log(data); // Hello
});
```
### 文件写入 writeFileSync / writeFile
写入会覆盖掉原来的内容  
1. 参数一：文件的路径
2. 参数二：写入的内容
3. 参数三：编码格式（可选，默认utf8）
4. 参数四：回调
```javascript
const fs = require("fs");

 //同步 writeFileSync 
fs.writeFileSync("2.txt", "Hello world");//写入文件（地址，内容）
let data = fs.readFileSync("2.txt", "utf8");//读取文件
console.log(data); // Hello world

//异步 writeFile
fs.writeFile("2.txt", "Hello world", err => {
    if (!err) {
        fs.readFile("2.txt", "utf8", (err, data) => {
            console.log(data); // Hello world
        });
    }
});
```
#### 文件追加写入 appendFileSync / appendFile
追加写入不是覆盖原来的内容，是在原来的内容上追加在后面
```javascript
const fs = require("fs");

 //同步 appendFileSync
fs.appendFileSync("3.txt", " world");
let data = fs.readFileSync("3.txt", "utf8");
console.log(data);

//异步 appendFile
fs.appendFile("3.txt", " world", err => {
    if (!err) {
        fs.readFile("3.txt", "utf8", (err, data) => {
            console.log(data); // Hello world
        });
    }
});
```
#### 文件拷贝写入 copyFileSync / copyFile
1. 参数一：被拷贝的源文件路径 
2. 参数二：拷贝到的目标文件路径，如果目标文件不存在，则会创建。  


现在将上面 3.txt 的内容拷贝到 4.txt 中：
```javascript
const fs = require("fs");

//同步
fs.copyFileSync("3.txt", "4.txt");
let data = fs.readFileSync("4.txt", "utf8");
console.log(data);

//异步
fs.copyFile("3.txt", "4.txt", () => {
    fs.readFile("4.txt", "utf8", (err, data) => {
        console.log(data); // Hello world
    });
});
```
## 文件操作的高级方法：
- a 打开文件用于追加。如果文件不存在，则创建该文件。
- ax 与 a 相似，但如果路径已存在则失败。
- a+ 打开文件用于读取和追加。如果文件不存在，则创建该文件。
- ax+ 与 a+ 相似，但如果路径已存在则失败。
- as 以同步模式打开文件用于追加。如果文件不存在，则创建该文件。
- as+ 以同步模式打开文件用于读取和追加。如果文件不存在，则创建该文件。
---
- r 打开文件用于读取。如果文件不存在，则出现异常。
- r+ 打开文件用于读取和写入。如果文件不存在，则出现异常。
- rs+ 以同步模式打开文件用于读取和写入。指示操作系统绕过本地的文件系统缓存。
---
- w 打开文件用于写入。如果文件不存在则创建文件，如果文件已存在则覆盖文件。
- wx 与 w 相似，但如果路径已存在则失败。
- w+ 打开文件用于读取和写入。如果文件不存在则创建文件，如果文件已存在则截断文件。
- wx+ 与 w+ 相似，但如果路径已存在则失败。
  
::: tip   
`__dirname` 表示当前文件所处目录
:::  
### 打开文件 open
```javascript
const fs = require("fs");
 
fs.open("4.txt", "r", (err, fd) => {
    console.log(fd);
});
fs.open(__dirname + "/4.txt", "r", (err, fd) => {
    console.log(fd);
});
```
### 关闭文件 close
```javascript
fs.open("4.txt", "r", (err, fd) => {
    fs.close(fd, err => {
        console.log("关闭成功");
    });
});
```
### 读取文件 read

```javascript
const fs = require("fs");
// 打开文件
fs.open("6.txt", "r", (err, fd) => {
    // 读取文件
    fs.read(fd, buf, 0, 3, 0, (err, bytesRead, buffer) => {
        console.log(bytesRead);
        console.log(buffer);
    });
});
```
### 新建文件夹目录 mkdir
1. 第一个参数是目录名，
2. 第二个参数是权限值，
3. 第三个参数是回调函数。
```js
let fs=require('fs')

fs,mkdir('./cxc',100,function(err){
	if(err) throw err;
})
```
### 读取文件夹目录 readdirSync / readdir
```javascript
//同步👇
let data = fs.readdirSync("a/b");
console.log(data); // [ 'c', 'index.js' ]

//异步👇
fs.readdir("a/b", (err, data) => {
    if (!err) console.log(data);
});// [ 'c', 'index.js' ]
```
### 删除文件目录 rmdirSync / rmdir
rmdirSync 的参数为要删除目录的路径，现在存在 a 目录和 a 目录下的 b 目录，删除 b 目录
```javascript
//同步
const fs = require("fs");
fs.rmdirSync("a/b");

//异步
fs.rmdir("a/b", err => {
    if (!err) console.log("删除成功");
});
```

### 删除文件操作 unlinkSync / unlink
```javascript
//同步
const fs = require("fs");
 
fs.unlinkSync("a/inde.js");

//异步
fs.unlink("a/index.js", err => {
    if (!err) console.log("删除成功");
});
```


### 判断给定路径是否存在 exists
exists方法用来判断给定路径是否存在，然后不管结果如何，都会调用回调函数。

回调函数的参数是一个表示文件是否存在的布尔值。
```js
let fs=require('fs')

fs.exists('./src',function(exists){
	console.log(exists)
})
```
### 判断是文件夹还是文件 stat
exists方法用来判断给定路径是否存在，然后不管结果如何，都会调用回调函数。回调函数的参数是一个表示文件是否存在的布尔值。
```js
let fs=require('fs')

fs.stat(文件名,function(error,stats){
    console.log(stats.isFile())
    console.log(stats.isDirectory())
})
```

### 监听一个文件 watchfile/unwatchfile
watchfile方法监听一个文件，如果该文件发生变化，就会自动触发回调函数。
```js
let fs=require('fs')

fs.watchFile('./cxc.txt',function(curr,prev){
    console.log(curr.mtime)
    console.log(prev.mtime)
})
```
unwatchfile方法用于解除对文件的监听。