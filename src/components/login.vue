<template>
  <div id="container">
    <el-form status-icon label-width="88px" class="loginForm">
      <!-- 登录界面 -->
      <el-form-item label="用户名*" prop="username ">
        <el-input type="text" autocomplete="off" placeholder="请输入用户名" v-model="username"></el-input>
      </el-form-item>

      <el-form-item label="登录密码*" prop="password">
        <el-input type="password" placeholder="请输入密码" autocomplete="off" v-model="password"></el-input>
      </el-form-item>

      <el-form-item label="验证码*" prop="">
        <el-input type="text" placeholder="请输入验证码" autocomplete="off" v-model="verification"></el-input>
      </el-form-item>

      <el-button  type="primary">
        <router-link to="/index" tag="li">立即登录</router-link>
      </el-button>
      <!-- <el-button type="primary"><router-link to="/register" tag="li">立即注册</router-link></el-button> -->
      <el-button type="primary" @click="dialogFormVisible=true">
        <router-link to="/register" tag="li">立即注册</router-link>
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      verification: "",
      email: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      labelPosition: 'right',
      form: {
        username: "",
        password: "",
        verification: "",
        email: ""
      }
    }
  },
  methods: {
    
  }
};
</script>

<style scoped>

#container {
  position: fixed;
  background-color: #d5dee6;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.loginForm {
  background: transparent;
  position: absolute;
  left: 0;
  right: 0;
  width: 300px;
  margin:  120px auto;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 2px 8px #77bea3;
}

.el-input {
  display: inline-block;
  height: 47px;
  width: 90%;
}
</style>
