# Nodemon 热加载

开发时，修改代码后，需要频繁重启项目。nodemon配置热加载，解决了重复启动的问题。

### 安装
```sh
npm install nodemon -D
```

### 使用
```sh
nodemon app.js
```

### 或者配置在package.json
![图 1](img/37e37944fc11728354f76ec7c7ebf4e46e0cb74c6032b3d0166313b7790150ef.png)  
```json
"dev":"nodemon src/app",
```

这样就可以使用命令👇
```sh
npm run dev
```