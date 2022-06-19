<script setup>
import { reactive, ref } from 'vue'
import { http_login } from '../api/login.ts'
import { setSessionStorage } from '../utils/util'
import { useRouter } from 'vue-router'
const router = useRouter()
const ruleFormRef = ref()

const validateUname = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    // if (ruleForm.username !== '') {
    //   if (!ruleFormRef.value) return
    //   ruleFormRef.value.validateField('password', () => null)
    // }
    callback()
  }
}
const validatePwd = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  username: '',
  password: '',
})
const login_loading = ref(false)

const rules = reactive({
  username: [{ validator: validateUname, trigger: 'blur' }],
  password: [{ validator: validatePwd, trigger: 'blur' }],
})

const submitLogin = formEl => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      login_loading.value = true
      const result = await http_login('/login', { ...ruleForm })
      if ( result && result.token ) {
        setSessionStorage('token', result.token)
      }
      login_loading.value = false
      formEl.resetFields()
      router.push('/home')

    } else {
      console.log('提交失败!')
      return false
    }
  })
}
</script>
<template>
<div class="login_container">
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="0px" class="demo-ruleForm">
    <el-form-item class="login_input" label="" prop="username">
      <el-input v-model="ruleForm.username" placeholder="用户名" />
    </el-form-item>
    <el-form-item class="login_input" label="" prop="password">
      <el-input v-model="ruleForm.password" type="password" placeholder="密码" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button class="login_btn" :loading="login_loading" type="primary" @click="submitLogin(ruleFormRef)">登 录</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<style lang="scss" scoped>
.login_container {
  width: 320px;
  margin: 10vh auto;
  padding: 50px 40px;
  box-shadow: 0 0 10px #ccc;
}
.login_input {
  margin-bottom: 25px;
}
.login_btn {
  width: 100%;
  margin-top: 20px;
}
</style>