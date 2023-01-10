::: tip HTML 篇
参考他人的路，但是保持客观自觉，听信自己的心，走出自己的路，做最好的自己。
:::
# ✨ HTML ✨
## 说说对 HTML 语义化的理解
语义化是指根据内容的结构化（内容语义化），选择合适的标签（代码语义化） 。通俗来讲就是用正确的标签做正确的事情。
语义化的优点如下：
- 对机器友好，带有语义的文字表现力丰富，更适合搜索引擎的爬虫爬取有效信息，有利于 SEO。除此之外，语义类还支持读屏软件，根据文章可以自动生成目录；
- 对开发者友好，使用语义类标签增强了可读性，结构更加清晰，开发者能清晰的看出网页的结构，便于团队的开发与维护。

### 常见的语义化标签：
```html
<h1>~<h6>标签：标题标签，h1等级最高，h6等级最低
<header></header>：用于定义页面的介绍展示区域，通常包括网站logo、主导航、全站链接以及搜索框
<nav></nav>：定义页面的导航链接部分区域
<main></main>：定义页面的主要内容，一个页面只能使用一次。
<article></article>：定义页面独立的内容，它可以有自己的header、footer、sections等
<section></section>：元素用于标记文档的各个部分，例如长表单文章的章节或主要部分
<aside></aside>：一般用于侧边栏
<footer></footer>：文档的底部信息
<small></small>：呈现小号字体效果
<strong></strong>：用于强调文本
```

## script 标签中 defer 和 async 的区别
如果没有 defer 或 async 属性，浏览器会立即加载并执行相应的脚本。它不会等待后续加载的文档元素，读取到就会开始加载和执行，这样就阻塞了后续文档的加载。
<br>
下图可以直观的看出三者之间的区别：

![效果图 1](img/0.png)
其中蓝色代表 JS 脚本网络加载时间，红色代表 JS 脚本执行时间，绿色代表 html 解析。
<br>
<br>
defer 和 async 属性都是去异步加载外部的 JS 脚本文件，它们都不会阻塞页面的解析，其区别如下：

- 执行顺序： 多个带 async 属性的标签，不能保证加载的顺序；多个带 defer 属性的标签，按照加载顺序执行；
- 脚本是否并行执行：async 属性，表示后续文档的加载和执行与 JS 脚本的加载和执行是并行进行的，即异步执行；defer 属性，加载后续文档的过程和 JS 脚本的加载（此时仅加载不执行）是并行进行的（异步），JS 脚本需要等到文档所有元素解析完成之后才执行，DOMContentLoaded 事件触发执行之前。

## HTML5 有哪些新特性

### HTML5 新增的元素

- 新增语义化标签：nav、header、footer、aside、section、article
- 音频、视频标签：audio、video
- 数据存储：localStorage、sessionStorage
- canvas（画布）、Geolocation（地理定位）、websocket（通信协议）
- input标签新增属性：placeholder、autocomplete、autofocus、required
- history API：go、forward、back、pushstate
  
### HTML5 移除的元素
- 纯表现的元素：basefont，big，center，font, s，strike，tt，u;
- 对可用性产生负面影响的元素：frame，frameset，noframes

## src 和 href 的区别

src 和 href 都是用来引用外部的资源，它们的区别如下：

- src：表示对资源的引用，它指向的内容会嵌入到当前标签所在的位置。src 会将其指向的资源下载并应用到文档内，如请求 JS 脚本。当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，所以⼀般js脚本会放在页面底部。
- href：表示超文本引用，它指向一些网络资源，建立和当前元素或本文档的链接关系。当浏览器识别到它他指向的文件时，就会并行下载资源，不会停止对当前文档的处理。 常用在 a、link 等标签上。

## img 的 srcset 属性的作用？

- 响应式页面中经常用到根据屏幕密度设置不同的图片。这时就用到了 img 标签的 srcset 属性。

- 通过使用 img 标签的 srcset 属性，可定义一组额外的图片集合，让浏览器根据不同的屏幕状况选取合适的图片来显示。

## 响应式图片处理优化：Picture 标签

考察点: 响应式图片处理
<br>
`<picture>` 元素就像是图像和其源的容器。浏览器仍然需要 img 元素，用来表明需要加载的图片
<br>
在 `<picture>` 下可放置零个或多个 `<source>` 标签、以及一个 `<img>` 标签，为不同的屏幕设备和场景显示不同的图片。
<br>
如果 source 匹配到了, 就会优先用匹配到的，如果没有匹配到会往下继续找
<br>
使用 picture 元素选择图像，不会有歧义。
<br>
浏览器的工作流程如下：

- 浏览器会先根据当前的情况，去匹配和使用 `<source>` 提供的图片
- 如果未匹配到合适的`<source>`，就使用 `<img>` 标签提供的图片

```html
<picture>
  <source srcset="640.png" media="(min-width: 640px)">
  <source srcset="480.png" media="(min-width: 480px)">
  <img src="320.png" alt="">
</picture>
```

## DOCTYPE (文档类型) 的作用是什么

DOCTYPE 是 HTML5 中一种标准通用标记语言的文档类型声明，它的目的是告诉浏览器（解析器）应该以什么样（html 或 xhtml）的文档类型定义来解析文档，不同的渲染模式会影响浏览器对 CSS 代码甚至 JavaScript 脚本的解析。它必须声明在 HTML 文档的第一行。
<br>
浏览器渲染页面的两种模式（可通过 document.compatMode 获取，比如，语雀官网的文档类型是 CSS1Compat）：

- CSS1Compat：标准模式（Strick mode） ，默认模式，浏览器使用 W3C 的标准解析渲染页面。在标准模式中，浏览器以其支持的最高标准呈现页面。
- BackCompat：怪异模式（混杂模式）（Quick mode），浏览器使用自己的怪异模式解析渲染页面。在怪异模式中，页面以一种比较宽松的向后兼容的方式显示。


## 常用的 meta 标签有哪些

meta 标签由 name 和 content 属性定义，用来描述网页文档的属性，比如网页的作者，网页描述，关键词等，除了 HTTP 标准固定了一些 name 作为大家使用的共识，开发者还可以自定义 name。
<br>
常用的 meta 标签：
```html
//charset，用来描述 HTML 文档的编码类型：
<meta charset="UTF-8" >
//description，页面描述：
<meta name="keywords" content="关键词" />
//charset，用来描述 HTML 文档的编码类型：
<meta name="description" content="页面描述内容" />
//refresh，页面重定向和刷新：
<meta http-equiv="refresh" content="0;url=" />
/*
viewport，适配移动端，可以控制视口的大小和比例：
viewport 的 content  参数有以下几种：
width viewport：宽度（数值/device-width）
height viewport：高度（数值/device-height）
initial-scale：初始缩放比例
maximum-scale：最大缩放比例
minimum-scale：最小缩放比例
user-scalable：是否允许用户缩放（yes/no
*/
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
/*
robots，搜索引擎索引方式
robots 的 content 参数有以下几种：
all：文件将被检索，且页面上的链接可以被查询；
none：文件将不被检索，且页面上的链接不可以被查询；
index：文件将被检索；
follow：页面上的链接可以被查询；
noindex：文件将不被检索；
nofollow：页面上的链接不可以被查询。
*/
<meta name="robots" content="index,follow" />
```

## 行内元素有哪些？块级元素有哪些？ 空（void）元素有那些？

- 行内元素有：`a b span img input select strong`

- 块级元素有：`div ul ol li dl dt dd h1 h4 h3 h4 h5 h6 p`

空元素，即没有内容的 HTML 元素。空元素是在开始标签中关闭的，也就是空元素没有闭合标签：
- 常见的有：`<br> <hr> <img> <input> <link> <meta>`

- 鲜见的有：`<area> <base> <col> <colgroup> <command> <embed> <keygen> <param> <source> <track> <wbr>`

## title 与 h1 的区别、b 与 strong 的区别、i 与 em 的区别？

- strong 标签有语义，是起到加重语气的效果，而 b 标签是没有的，b 标签只是一个简单加粗标签。b 标签之间的字符都设为粗体，strong 标签加强字符的语气都是通过粗体来实现的，而搜索引擎更侧重 strong 标签。

- title 属性没有明确意义只表示是个标题，H1 则表示层次明确的标题，对页面信息的抓取有很大的影响

- i 内容展示为斜体，em 表示强调的文本

## iframe 标签有那些优点和缺点？
iframe 元素会创建包含另外一个文档的内联框架（即行内框架）。
<br>
优点：

- 用来加载速度较慢的内容（如广告）
- 可以使脚本可以并行下载
- 可以实现跨子域通信

缺点：
- iframe 会阻塞主页面的 onload 事件
- 无法被一些搜索引擎索识别
- 会产生很多页面，不容易管理

## 说一下 HTML5 drag（拖拽）API

- dragstart：事件主体是被拖放元素，在开始拖放被拖放元素时触发。
- darg：事件主体是被拖放元素，在正在拖放被拖放元素时触发。
- dragenter：事件主体是目标元素，在被拖放元素进入某元素时触发。
- dragover：事件主体是目标元素，在被拖放在某元素内移动时触发。
- dragleave：事件主体是目标元素，在被拖放元素移出目标元素是触发。
- drop：事件主体是目标元素，在目标元素完全接受被拖放元素时触发。
- dragend：事件主体是被拖放元素，在整个拖放操作结束时触发。

## label 标签的作用是什么？
label 标签来定义表单控件的关系：当用户选择 label 标签时，浏览器会自动将焦点转到和 label 标签相关的表单控件上。

## Canvas 和 SVG 标签的区别

SVG：SVG 可缩放矢量图形（Scalable Vector Graphics）是基于可扩展标记语言 XML 描述的 2D 图形的语言，SVG 基于 XML 就意味着 SVG DOM 中的每个元素都是可用的，可以为某个元素附加 Javascript 事件处理器。在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。

其特点如下：
- 不依赖分辨率
- 支持事件处理器
- 最适合带有大型渲染区域的应用程序（比如谷歌地图）
- 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）
- 不适合游戏应用
  
Canvas：Canvas 是画布，通过 Javascript 来绘制 2D 图形，是逐像素进行渲染的。其位置发生改变，就会重新进行绘制。

其特点如下：
- 依赖分辨率
- 不支持事件处理器
- 弱的文本渲染能力
- 能够以 .png 或 .jpg 格式保存结果图像
- 最适合图像密集型的游戏，其中的许多对象会被频繁重绘

## head 标签有什么作用，其中什么标签必不可少？
标签用于定义文档的头部，它是所有头部元素的容器。 中的元素可以引用脚本、指示浏览器在哪里找到样式表、提供元信息等。

文档的头部描述了文档的各种属性和信息，包括文档的标题、在 Web 中的位置以及和其他文档的关系等。绝大多数文档头部包含的数据都不会真正作为内容显示给读者。

下面这些标签可用在 head 部分：`<base>, <link>, <meta>, <script>, <style>, <title>`

其中 `<title>` 定义文档的标题，它是 head 部分中唯一必需的元素。

## 文档声明（Doctype）和 <!Doctype html> 标签有何作用?

文档声明的作用：文档声明是为了告诉浏览器，当前 HTML 文档使用什么版本的 HTML 来写的，这样浏览器才能按照声明的版本来正确的解析。

`<!doctype html>` 的作用： 就是让浏览器进入标准模式（严格模式），使用最新的 HTML5 标准来解析渲染页面；如果不写，浏览器就会进入混杂模式，我们需要避免此类情况发生。


## 严格模式与混杂模式的区分：

- 严格模式： 又称为标准模式，指浏览器按照 W3C 标准解析代码；
- 混杂模式： 又称怪异模式、兼容模式，是指浏览器用自己的方式解析代码。混杂模式通常模拟老式浏览器的行为，以防止老站点无法工作；

## HTML5 为什么只需要写 <! DOCTYPE HTML> ？
- HTML 4.01 中的 doctype 需要对 DTD 进行引用，因为 HTML 4.01 基于 SGML。而 HTML 5 不基于 SGML，因此不需要对 DTD 进行引用，但是需要 doctype 来规范浏览器的行为。
- 其中，SGML 是标准通用标记语言, 简单的说，就是比 HTML, XML 更老的标准，HTML，XML 这两者都是由 SGML 发展而来的，而 HTML5 不是的。

## 浏览器乱码的原因是什么？如何解决？
产生乱码的原因：

- 网页源代码是 gbk 的编码，而内容中的中文字是 utf-8 编码的，这样浏览器打开即会出现 html 乱码，反之也会出现乱码；
- html 网页编码是 gbk，而程序从数据库中调出呈现是 utf-8 编码的内容也会造成编码乱码；
- 浏览器不能自动检测网页编码，造成网页乱码。

解决办法：

- 使用软件编辑 HTML 网页内容；
- 如果网页设置编码是 gbk，而数据库储存数据编码格式是 UTF-8，此时需要程序查询数据库数据显示数据前进程序转码；
- 如果浏览器浏览时候出现网页乱码，在浏览器中找到转换编码的菜单进行转换。

## 渐进增强和优雅降级之间的区别

（1）渐进增强（progressive enhancement）：主要是针对低版本的浏览器进行页面重构，保证基本的功能情况下，再针对高级浏览器进行效果、交互等方面的改进和追加功能，以达到更好的用户体验。

（2）优雅降级（graceful degradation）：一开始就构建完整的功能，然后再针对低版本的浏览器进行兼容。

两者区别：

- 优雅降级是从复杂的现状开始的，并试图减少用户体验的供给；而渐进增强是从一个非常基础的，能够起作用的版本开始的，并在此基础上不断扩充，以适应未来环境的需要；
- 降级（功能衰竭）意味着往回看，而渐进增强则意味着往前看，同时保证其根基处于安全地带。

## HTML、XML、XHTML 之间有什么区别？

它们都属于标记语言。
语言|中文名|说明
:-:|:-:|:-:
HTML4|超文本标记语言|主要用于做界面呈现。HTML 是先有实现，后面才慢慢制定标准的，导致 HTML 非常混乱和松散，语法非常的不严谨。
XML|可扩展标记语言|主要用于存储数据和结构。语法严谨，可扩展性强。由于 JSON 也有类似作⽤但更轻量⾼效， XML 的市场变得越来越小。
XHTML|可扩展超文本标记语言|属于加强版 HTML，为解决 HTML 的混乱问题而生，在语法方面变得和 XML 一样严格。另外，XHTML 的出现也催生了 HTML 5，让 HTML 向规范化严谨化过渡。
HTML5|超文本标记语言|在 HTML 的基础上进行拓展，用于页面呈现 (目前标准)

XML 的要求会比较严格:

1. 有且只能有一个根元素
2. 大小写敏感
3. 正确嵌套
4. 必须双引号
5. 必须闭合标签

## 前缀为 data- 开头的元素属性是什么？

这是一种为 HTML 元素添加额外数据信息的方式，被称为 自定义属性。

我们可以直接在元素标签上声明这样的数据属性：

```html
<div id="mydiv" data-message="Hello,world" data-num="123"></div>
```
也可以使用 JavaScript 来操作元素的数据属性：
```js
let mydiv = document.getElementById('mydiv')
// 读取
console.log(mydiv.dataset.message)
// 写入
mydiv.dataset.foo = "bar!!!"
```
::: warning 注意
 在各种现代前端框架出现后，这种原生的自定义属性已经变得不太常用了, 以前的使用频率非常高, 所以我们知道即可。
:::

## 说一下 HTML5 的离线存储？

指的是没有网络连接的时候，可以正常访问应用，与网络连接时更新缓存文件

在 cache.manifest 文件中编写需要离线存储的资源：

在离线状态时，操作 window.applicationCache 进行离线缓存的操作。

如何清除缓存：更新 manifest 文件，通过 javascript 操作，清除浏览器缓存

## html 常见兼容性问题？

1. 双边距 BUG float 引起的，解决办法: 使用 display 解决
1. 3 像素问题 使用 float 引起的，解决办法: 使用 dislpay: inline -3px
1. 超链接 hover 点击后失效，解决办法：使用正确的书写顺序 link visited hover active
1. Ie z-index 问题，解决办法: 给父级添加 position:relative
1. Png 透明 ，解决办法: 使用 js 代码
1. Min-height 最小高度 ，解决办法: !Important 解决
1. select 在 ie6 下遮盖，解决办法: 使用 iframe 嵌套
1. 为什么没有办法定义 1px 左右的宽度容器，解决办法: （IE6 默认的行高造成的，使用 over: hidden; zoom: 0.08; line-height: 1px）
1. IE5-8 不支持 opacity，解决办法：

```css
.opacity {
  opacity: 0.4;
  filter: alpha(opacity=60); /_ for IE5-7 _/
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"; /_ for IE 8_/
}
```
10. IE6 不支持 PNG 透明背景，解决办法：IE6 下使用 gif 图片

## 说说 img 标签的 onerror 事件，图片加载失败的处理方法

在图片不存在或者网络状态不好的情况下，会存在图片加载不过来，用户体验很差

可以直接在 img 标签里添加 onerror 事件进行控制

```html
<img src="" onerror="javascript:this.src='xxx.jpg';">
注意点：
1.这里的图片要尽可能小，如果过大还会存在加载失败的可能；
2.当 'xxx.jpg' 图片不存在时还会出现加载失败；
3.当加载失败时会再次执行 onerror，再失败再执行，会一直执行陷入循环之中。
```
所以可以写一个函数，让函数只执行一次（执行一次把它置为 null 即可），不让其进入循环之中
```html
<img src="" onerror="onImg"/>
```

```js
function noImg(event){
    let img=img=event.srcElement ? event.srcElement : event.target;img.src="images/wechat.png";
    img.onerror=null;
}
```

## 说一下 web worker

在 HTML 页面中，如果在执行脚本时，页面的状态是不可响应的，直到脚本执行完成后，页面才变成可响应。web worker 是运行在后台的 js，独立于其他脚本，不会影响页面的性能。 并且通过 postMessage 将结果回传到主线程。这样在进行复杂操作的时候，就不会阻塞主线程了。

如何创建 web worker：

1. 检测浏览器对于 web worker 的支持性
1. 创建 web worker 文件（js，回传函数等）
1. 创建 web worker 对象

## 说一下音视频标签的使用？
audio 标签用来向页面中引入一个外部的音视频文件。音视频文件引入时，默认情况下不允许用户自己控制播放停止。

属性：
- controls 是否允许用户自己控制播放。
- autoplay 音视频文件是否自动播放。
- loop -音视频是否进行循环播放。

如果设置了 autoplay，则音视频在打开界面时会自动播放。
但是目前来讲大部分浏览器都不会对音视频进行播放。
video 标签来向网页中引入一个视频，使用方法和 audio 基本上是一样的，包括各种 audio 拥有的属性，video 也有。

## 前端页面由哪三层构成，分别作用是什么？
分成：结构层、表示层、行为层。

1. 结构层（structural layer）

由 HTML 或 XHTML 之类的标记语言负责创建。标签，也就是那些出现在尖括号里的单词，对网页内容的语义含义做出了描述，但这些标签不包含任何关于如何显示有关内容的信息。例如，P 标签表达了这样一种语义：“这是一个文本段。”

2. 表示层（presentation layer）

由 CSS 负责创建。 CSS 对“如何显示有关内容”的问题做出了回答。

3. 行为层（behaviorlayer）

负责回答“内容应该如何对事件做出反应”这一问题。这是 Javascript 语言和 DOM 主宰的领域。

## 说说你对 WEB 标准以及 W3C 的理解与认识

web 标准简单来说可以分为结构、表现和行为。其中结构主要是有 HTML 标签组成。或许通俗点说，在页面 body 里面我们写入的标签都是为了页面的结构。表现即指 css 样式表，通过 css 可以是页面的结构标签更具美感。

行为是指页面和用户具有一定的交互，同时页面结构或者表现发生变化，主要是由 js 组成。

web 标准一般是将该三部分独立分开，使其更具有模块化。但一般产生行为时，就会有结构或者表现的变化，也使这三者的界限并不那么清晰。

W3C 对 web 标准提出了规范化的要求，也就是在实际编程中的一些代码规范：包含如下几点

1. 对于结构要求：（标签规范可以提高搜索引擎对页面的抓取效率，对 SEO 很有帮助）

    1）标签字母要小写<br>
    2）标签要闭合<br>
    3）标签不允许随意嵌套<br>

2. 对于 css 和 js 来说

    1）尽量使用外链 css 样式表和 js 脚本。是结构、表现和行为分为三块，符合规范。同时提高页面渲染速度，提高用户的体验。<br>
    2）样式尽量少用行间样式表，使结构与表现分离，标签的 id 和 class 等属性命名要做到见文知义，标签越少，加载越快，用户体验提高，代码维护简单，便于改版<br>
    3）不需要变动页面内容，便可提供打印版本而不需要复制内容，提高网站易用性。<br>

## 为什么最好把 CSS 的 `<link>` 标签放在 `<head></head>` 之间？

把 `<link>` 标签放在 `<head></head>` 之间是规范要求的内容。这种做法可以让页面逐步呈现，提高了用户体验。如果将样式表放在文档底部附近，会使许多浏览器（包括 Internet Explorer）不能逐步呈现页面。

一些浏览器会阻止渲染，以避免在页面样式发生变化时，重新绘制页面中的元素。这种做法可以防止呈现给用户空白的页面或没有样式的内容

## 为什么最好把 JS 的 `<script>` 标签恰好放在 `</body>` 之前？

脚本在下载和执行期间会阻止 HTML 解析。把 `<script>` 标签放在底部，保证 HTML 首先完成解析，将页面尽早呈现给用户。

例外情况：

是当你的脚本里包含 document.write() 时。（但是现在 document.write() 不推荐使用）。同时你将 `<script>` 标签放在底部，意味着浏览器直到整个文档（document）被解析完成不能开始下载脚本。

也许，对此比较好的做法是，`<script>` 使用 defer 属性，放在 `<head>` 中。

## 为什么要转载重构？

- 更好的阅读体验（增加必要的单词空格，使用正确的标点符号等）
- 更准确的描述（优化错别字，错误单词等）
- 不断更新的内容（在不断的阅读中，增减内容及修复错误描述）