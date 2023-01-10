#  Class - 类

对象的模板，可以看作语法糖
 常规 

```javascript
//手机
function Phone(brand, price) {
  this.brand = brand;
  this.price = price;
}

//添加方法
Phone.prototype.call = function () {
  console.log("call");
};

//实例化对象
let Huawei = new Phone("华为", 5999);
Hwawei.call();
console.log(Huawei);
```

 使用 class

```javascript
class Phone {
  //构造方法 名字不能修改 此方法在new 实例后调用
  constructor(brand, price) {
    this.brand = brand;
    this.price = price;
  }

  //方法必须使用该语法，不能使用 ES5的对象完整形式 call:function(){}
  call() {
    console.log("call");
  }
}

let onePlus = new Phone("1+", 1999);

console.log(onePlus);
```

### 静态成员 

- 静态成员 属于类， 不属于实例对象

 常规 

```javascript
function Phone() {}

Phone.name = "手机"; //【静态成员】
Phone.change = function () {
  console.log("我可以改变");
};

let nokia = new Phone(); //【实例对象 指向的是 原型对象】

console.log(nokoia.name); //undefined   【拿不到】
nokia.change(); //【没有这个方法】

Phone.prototype.size = "5.5inch";
console.log(nokia.size); //5.5inch    【得往prototype 原型里面加 才拿得到】
```

 使用 class

```javascript
calss Phone {
  //静态属性
  static name = '手机';
  static change(){
    console.log("我可以改变");
  }
}

let nokia = new Phone();
console.log(nokoia.name); //undefined   【拿不到】
console.log(Phone.name); //手机   【静态成员 属于类， 不属于实例对象】
```
