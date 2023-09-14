<template>
  <div>
    <div v-if="list" class="box">
      <el-button @click="refresh" style="margin-bottom: 10px;" type="primary" :loading="loading">刷新</el-button>
      <div v-for="item in list" class="box_item" @click="toDetails(item)">
        <div>
          <p>{{ item.banner_name }}</p>
          <p>{{ item.release_date }}</p>
        </div>
        <el-image style="width: 100px; height: 100px;padding-left: 10px;" :src="item.pic" fit="scale-down" />
      </div>
    </div>
    <el-dialog v-model="dialogVisible" title="登录" width="30%">
      <div>
        <el-input v-model="phone" placeholder="输入手机号">
          <template #append><el-button type="primary" @click="send">发送验证码</el-button></template>
        </el-input>
        <el-input style="margin-top: 10px;" v-model="code" placeholder="请输入验证码" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="login">
            登录
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import { ElMessage } from 'element-plus'
import axios from 'axios';
const token = ref<any>("")
const dialogVisible = ref(false)
const phone = ref<string>("")
const code = ref<string>("")
const HOST = 'https://api.aichaoliuapp.cn:443/aiera'
const list = ref<any>()
const loading = ref(false)
const newId = ref<any>(null)
onMounted(() => {
  token.value = localStorage.getItem("token") || ""
  newId.value = localStorage.getItem("newId") || null
  getlist()
})
const refresh = () => {
  list.value = []
  loading.value = true
  getlist()
}
const send = () => {
  // console.log(phone.value);
  if (phone.value == "") {
    ElMessage.success('请输入正确的手机号！')
    return
  }
  axios({
    method: "post",
    url: HOST + "/v2/hotdog/user_account/send_vcode",
    data: { "username": phone.value, "app_type": "0" }
  })
    .then(function (res: any) {
      if (res.data.msg == "success") {
        ElMessage.success("发送成功！")
        return
      }
      ElMessage.success(res.data.msg)
    })
}
const getlist = () => {
  axios({
    method: "post",
    headers: { 'token': token.value },
    url: HOST + "/common/banner_index_v2/notice",
    data: { "page_num": 1, "follow": 0, "page_size": 20 }
  })
    .then(function (res: any) {
      console.log(res);
      if (res.data.code === 401) {
        console.log("用户登录");
        dialogVisible.value = true
      } else {
        list.value = res.data.d
        if (newId.value) {
          if (newId.value != res.data.d[0].id) {
            axios({
              method: "get",
              url: "http://www.pushplus.plus/send",
              data: { 
                token: "e262d58b53d24982ba7542d2adf52321",
                title:res.data.d[0].banner_name,
                content:res.data.d[0].link,
                template:"html",
                topic:"001"
                }
            }).then(function (res: any) {
                console.log(res);
            })
          }
          newId.value = res.data.d[0].id
          setTimeout(()=>{refresh()},2000)
        } else {
          newId.value = res.data.d[0].id
        }
        localStorage.setItem("newId", res.data.d[0].id)
        loading.value = false
      }
    })

}
const login = () => {
  if (phone.value == "") {
    ElMessage.success('请输入手机号！')
    return
  }
  if (code.value == "") {
    ElMessage.success('请输入验证码！')
    return
  }
  axios({
    method: "post",
    url: HOST + "/v2/hotdog/user_account/code_login",
    data: { "username": phone.value, "v_code": code.value, "app_type": "0", "device_id": "C4886B2D-8F25-45E9-BAB4-B49DFC22BE6A", "remark": "mobile" }
  })
    .then(function (res: any) {
      console.log(res);
      dialogVisible.value = false
      if (res.data.code === 0) {
        ElMessage.success("登录成功")
        token.value = res.data.data.token
        localStorage.setItem("token", res.data.data.token)
        getlist()
      }
    })
}
const toDetails = (item: any) => {
  window.location.href = item.link
}
</script>

<style scoped lang="less">
.box {
  .box_item {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    padding: 10px;
    transition: .3s all;
    border-radius: 4px;

    >div {
      width: 70%;

      p {
        &:nth-child(1) {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }

    &:hover {
      background-color: #f9f9f9;
    }
  }
}
</style>