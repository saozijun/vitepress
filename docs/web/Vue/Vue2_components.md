# 父子组件通信

父子组件其实就是 在一个页面里面去引入一个组件模块！然后通常他们之间需要传递参数！

比如父组件要传递参数给子组件！ 子组件要调用父组件的方法！

## 🟩『父 传 子』
### 父组件传参
`:` 或 `v-bing:` 的方式 绑定到属性 `:属性名="参数"`

```html
<child :name="data"></child>
```
### 子组件接收
```javascript
props: {
  name: {
    type: String,  //这个是给这个参数说明类型
    required:true,  //required:true 就是说这个参数必须得有！
    default: 'cxc' //默认值，选填写
  }
}
```
收取后只能【用】,不能去【修改】
如果要【修改】，先 赋值 给变量 然后【修改】变量

## 🟩『子 传 父』
### 子组件触发
```javascript
this.$emit('触发名',参数（可选）);
//比如
this.$emit('emit_btn');
```
### 父组件接收
```html
<child @emit_btn="cxc()"></child>
```
```javascript
methods{
    cxc(){
        //... console.log("volcano是帅哥！")
    }
}
```