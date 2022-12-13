# 【前端】上传头像

1. 后端保存头像图片跟保存其他图片是一样的
2. 前端上传图片/文件需要设置`form-data`的参数名，以及裁切正方形图片
::: danger 确保一个用户只会保存一张头像
1. 每次用户上传就将头像路径和id绑定，
2. 同一用户再次上传时就先根据前一次绑定的头像路径将该图片删除
3. 再将新头像路径绑定到对应id。

以此反复，保证服务器上每个用户只会保存一张头像图片。
:::

### 前端设置
1. `type` 是要 `file` 类型
2. `name` 是要与后端对应。
3. 上传文件请求头里要添加相关用户的 `Token` !
```html
<form action="http://127.0.0.1:3001/uploadAvatar" method="post" enctype="multipart/form-data">
  <h3>单图上传</h3>
  <input type="file" name="avatar">
  <input type="submit" value="提交">
</form>
```
下面是使用Naive-UI组件（使用其他UI库，一般也有相关参数设置）
```html
<n-upload :show-file-list="false" 
          action="http://127.0.0.1:3001/uploadAvatar" 
          @finish="handleFinish" 
          type="file"
          name="avatar" 
          :headers="{
                'authorization': Token
          }">
            <n-button>上传文件</n-button>
</n-upload>
```

## 【前端】图片裁剪

1. 【裁切】对图片进行裁剪【使用vue-cropper】【或者Cropper.js✅】
1. 对上传文件请求头里添加Token！

### 安装 cropperjs（1.5版本）
官方gihub文档：[https://github.com/fengyuanchen/cropperjs/blob/main/README.md](https://github.com/fengyuanchen/cropperjs/blob/main/README.md)
```sh
npm install cropperjs
```
### 引入 cropperjs👇
```js
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
```
### 上传裁切的设置 HTML 👇
```html
<!-- 1.一个用于获取上传文件的input，type="file"，并且监听onchange事件  -->
<input type="file" id="imgReader" @change="loadingImg($event)">

<!-- 2.一个用于给Cropper.js覆盖使用的img  -->
<img id="cropImg" />

<!-- 3.用于预览的div  -->
<div class="previewBox"></div>
<button @click="GetData">上传文件</button>
```

### 上传裁切的设置 JS👇
```ts
let CROPPER: any = null    //创建一个cropper的全局对象 
const loadingImg = (eve: any) => {
    //👇 解决再次上传图片 没换到图片的问题
    if (CROPPER) {
        CROPPER.destroy()
    }
    //👆 可以试着不加这句，就知道会出现什么问题了


    // 实例化 FileReader 【以下照抄就可以了，不用太多理解】
    let reader = new FileReader();
    console.log(eve.target.files)
    if (eve.target.files[0]) {

        //readAsDataURL方法可以将File对象转化为data:URL格式的字符串（base64编码）
        reader.readAsDataURL(eve.target.files[0]);
        reader.onload = (e) => {
            let dataURL = reader.result;

            //这里会把图片放到上面的img标签里
            document.getElementById('cropImg').src = dataURL
            //将img的src改为刚上传的文件的转换格式
            const image: any = document.getElementById('cropImg');
            //js里是 const image = document.getElementById('cropImg');

            //创建cropper实例【这里照抄就可以了】
            CROPPER = new Cropper(image, {
                aspectRatio: 1,
                viewMode: 1,
                minContainerWidth: 240,
                minContainerHeight: 240,
                dragMode: 'move',
                preview: [document.querySelector('.previewBox')]
            })
        }
    }
}

//【以下照抄就可以了，不用太多理解】
const GetData = () => {
    //getCroppedCanvas方法可以将裁剪区域的数据转换成canvas数据
    CROPPER.getCroppedCanvas({
        width: 240,
        height: 240,
        minWidth:200,
        minHeight:200,
        maxWidth:240,
        maxHeight:240,
        fillColor: '#fff',
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
    }).toBlob((blob: any) => {
        //然后调用浏览器原生的toBlob方法将canvas数据转换成blob数据
        //之后就可以愉快的将blob数据发送至后端啦，可根据自己情况进行发送，我这里用的是axios
        let formData = new FormData();
        // 第三个参数为文件名，可选填.
        formData.append('avatar', blob,'avatar.png');

        let data = uploadAvatar(formData)
    })
}
```
