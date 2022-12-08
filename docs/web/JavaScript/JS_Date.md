# ⏰ Date日期/时间

```js
date = new Date()               //日期转换为字符串
date = new Date("1996")         //可以有关于日期时间的参数！
```

```js
date.getFullYear()              //返回年份(4位数) 
date.getYear()                  //年份(2位)

date.getMonth()                 //返回月份(0~11) 月,所以要加 1 
date.getMonth() + 1             //这个才是当前月份

date.getDate()                  //一个月中的某一天(1~31) 日

date.getDay()                   //一周中的某一天(0~6) 星期

date.getHours()	                //返回小时(0~23) 时

date.getMinutes()               //返回分钟(0~59) 分

date.getSeconds()               //返回秒速(0~59) 秒

date.getMilliseconds()          //返回毫秒(0~999) 毫秒

date.getTime()                  //返回 1970 年 1 月 1 日至今的毫秒数。

date.toLocaleDateString();      //当前日期

date.toLocaleTimeString();      //当前时间

date.toLocaleString();          //当前日期 与 时间
```