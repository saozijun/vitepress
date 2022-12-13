# css代码片段

## 清除浮动代码

```css
.clearfix:after {
    display:block;
    content:'';
    clear:both;
    height:0;
}
.clearfix {
    zoom: 1;
}
```

## 隐藏滚动条

```css
.note-menu::-webkit-scrollbar {     
    display: none;
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

## 背景图片居中

```css
.img{
	background:url(xxx);
	background-position-x: center;
	background-position-y: center;
}
```

## 去掉 input 发光

```css
input:focus{
    box-shadow:none;
}
或者
input:focus{
    outline: none;
}
```
## 多行文字… 省略的方法

```css
.text{
	overflow: hidden;
	word-break: break-all;  /*允许在单词内换行，更美观*/
	text-overflow: ellipsis;
	display: -webkit-box;  /*元素作为box伸缩盒子*/
	-webkit-line-clamp: 3;  /*设置文本行数限制*/
	-webkit-box-orient: vertical;  /*设置文本排列方式*/
}
```

## 在position:fixed 下居中

```css
.class{
    position:fixed;
    left: 0;
    right: 0;
}
```

## ... 代替“溢出字”

```css
.class{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
```

## 单词/数字 不换行溢出解决办法

```css
.text{
    word-break: break-all;
    word-wrap: break-word;
}
```

## 高斯模糊背景效果_backdrop-filter滤镜
![效果图](img/sjj.png)  
```css
.nav{
    background-color: rgba(0,0,0,0.8);
    backdrop-filter:  blur(20px);
}
```

## backdrop-filter和filter
- `blur` 可以设置图片使用高斯模糊效果，单位值是px。所谓高斯模糊
- `invert`可以设定反色， 值为0-1之间的小数
- `saturate`可以设定照片饱和度，取值范围为数字即可，默认值1，即100%。
- `grayscale`   代表灰度，取值在0-1之间
- `sepia`       代表的是照片褐色，类似于大部分美图软件里的怀旧功能的那种效果，取值也是0-1
- `hue-rotate`  用来改变图片的色相，默认值为0deg，取值是角度（angle）
- `brightness`  可以改变图片的亮度，默认值为100%,即1
- `contrast`    代表对比度，这个属性取值和饱和度saturate类似，取值也是数字
- `drop-shadow` 这个属性类似于box-shadow，给图片加阴影

::: tip 区别
Filter不仅仅作用于当前元素，后代元素也会继承这个属性，作用于一个空背景元素则没有效果。
backdrop-filter 是使透过该层的底部元素模糊化
backdrop-filter属性可以让你为一个元素后面区域添加图形效果（如模糊或颜色偏移）。 因为它适用于元素 背后 的所有元素，为了看到效果，必须使元素或其背景至少部分透明。
backdrop-filter目前兼容性不佳，尤其是安卓移动端。
:::