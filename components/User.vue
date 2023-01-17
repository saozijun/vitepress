<template>
  <div class="box">
    <div class="user-box">
      <!-- <el-avatar :size="50" :src="userInfo.avatarUrl || ''" /> -->
      <!-- <p>{{userInfo.nickname || '未登录'}}</p> -->
      <el-button type="primary" @click="dialogVisible = true">登录</el-button>
      <!-- <el-button v-else type="primary"  @click="onLogout">退出登录</el-button> -->
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="登录"
      width="30%"
      destroy-on-close
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        size="default"
        status-icon
      >
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone" />
        </el-form-item>
        <el-form-item label="密码" prop="pow">
          <el-input v-model="ruleForm.pow" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage,FormInstance, FormRules } from "element-plus";
import { onMounted, ref, reactive } from "vue";
import {login} from "../docs/api/login";
const dialogVisible = ref<boolean>(false);
const ruleFormRef = ref<FormInstance>()
onMounted(() => {
  // getUser()
});
const ruleForm = reactive({
  phone: "",
  pow: "",
});
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid:any, fields:any) => {
    if (valid) {
      const data = await login({phone:ruleForm.phone,password:ruleForm.pow})
      console.log(data);
    }
  })
}

const rules = reactive<FormRules>({
  phone: [
    {
      required: true,
      message: "请输入手机号",
      trigger: "change",
    },
  ],
  pow: [
    {
      required: true,
      message: "请输入密码",
      trigger: "change",
    },
  ],
});
</script>
<style scoped lang="less">
.box {
  .user-box {
    display: flex;
    align-items: center;
    p {
      margin: 0 20px;
      font-size: 14px;
    }
  }
}
.login-box {
  width: 100%;
  display: grid;
  place-content: center;
}
</style>