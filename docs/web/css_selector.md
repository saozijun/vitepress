# css选择器

## 属性选择器

```css
[title]{
    color:blue;
}
```

```css
a[class^=xxg]  //a标签里 类属性 开头带有xxg
a[herf$=xxg]   //a标签里 herf属性 结尾有xxg
a[title*=xxg]  //a标签里 title属性 包含了xxg

a[class^=xxg]{
    color:blue;
}
```

## 防止单行文字溢出

```css
.text{
    text-overflow:ellipsis;
    overflow:hidden;  
    white-space:nowrap;
}
```

## nth 元素选择

- div:nth-child(n) 选择器匹配属于其父元素的第 N 个子元素；
- div:nth-last-child(n) 选择器匹配属于其元素的第 N 个子元素的每个元素，从最后一个子元素开始计数；
- div:nth-of-type(n) 选择器匹配属于父元素的特定类型的第 N 个子元素的每个元素

## before && after

- div:before：元素的内容之前插入新内容。
- div:after：元素的内容之后插入新内容。
  
```css
div:before{
    content: '内容';
}
```
  
### 使用伪类 after 清除元素内部浮动效果

```css
div:after{
    content: '';
    display: block;
    clear: both;
}
.item{
    float: left;
}
```

### 在元素内容开始前插入图片

```css
div:before{
    content: '';
    display:inline-block;
    width:12px;
    height:12px;
    font-size:12px;
    line-height:12px;
    background: url(img.jpg) center  no-repeat;
    background-size: cover;
}
```
## CSS3伪类选择器

伪类选择器|说明
:-:|:-:
a:root|伪类选择器 等同于选择html
a:not|否定选择器 就是不选择这个
a:empty|选择没有任何内容的容器
a:target|目标选择器 用来匹配页面url的某个标志符的目标元素
a:first-child|第一个子元素
a:last-child|最后一个子元素
a:nth-child(n)|n=odd或者even,也可以是数字
a:nth-last-child(n)|从最后一个子元素开始计算
a:first-of-type|指定
a:last-of-type|指定
a:nth-of-type(n)|指定
a:nth-last-of-type(n)|[...]
a:only-child|选的这个元素他 有且只有一个子元素
a:only-of-type|选择这个元素下 他的唯一类型的子元素