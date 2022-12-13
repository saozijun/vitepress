# css学习笔记

## 偏移自身一半

```css
.class{ transform: translate(-50%, -50%); }
```

## 去除a标签下划线

```css
.class{ text-decoration:none; }
```

## 去除列表的前缀符号

```css
.class{ list-style:none; }
```

## 字间距

```css
.class{ letter-spacing:20px; }
```

## 光标

```css
.class{ cursor:pointer; }
/*
auto：浏览器根据上下文决定指针的显示样式，比如根据文本和非文本切换指针样式
default：由操作系统决定，一般就是一个小箭头
pointer：一只小手，鼠标指针挪动到链接上面默认就是这个样式
text：一条竖线，鼠标指针挪动到文本输入框上面默认就是这个样式
none：没有任何指针显示在元素上面
*/
```

## 最高级权重 !important

```css
.div_class{ color:blue  }
div{ color:red !important }
```
