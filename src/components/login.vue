<template>
  <div id="container">
    <div class="title">
      <span>现</span>
      <span>代</span>
      <span>农</span>
      <span>业</span>
      <span>综</span>
      <span>合</span>
      <span>管</span>
      <span>理</span>
      <span>系</span>
      <span>统</span>
    </div>
    <el-form
      status-icon
      label-width="80px"
      :rules="rules"
      class="loginForm animated bounceInRight delay-1s"
      :model="login"
      @submit.native.prevent="saveLogin"
    >
      <!-- 登录界面 -->
      <h3 id="title" class="animated bounceIn delay-1s">现代农业综合管理系统</h3>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" autocomplete="off" placeholder="请输入用户名" v-model="login.username"></el-input>
      </el-form-item>

      <el-form-item label="登录密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          autocomplete="off"
          v-model="login.password"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="verification">
        <el-input type="text" placeholder="请输入验证码" autocomplete="off" v-model="login.verification"></el-input>
      </el-form-item>

      <el-button type="primary" native-type="submit" style="margin-left: 30px;">
        <router-link to="/index" tag="li">立即登录</router-link>
      </el-button>
      <!-- <el-button type="primary"><router-link to="/register" tag="li">立即注册</router-link></el-button> -->
      <el-button type="primary">
        <router-link to="/register" tag="li">立即注册</router-link>
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogTableVisible: false,
      labelPosition: "right",
      flag: false,
      login: {
        username: "",
        password: "",
        verification: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ],
        verification:[
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    saveLogin() {
      console.log(this.login);
    },
    toogle() {
      this.flag = !flag;
    }
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

#container:hover {
  background-color: #d5e6de;
}

#container .title {
  margin: 0 auto;
  font-size: 30px;
  font-weight: 700;
  font-family: Georgia, 'Times New Roman', Times, serif
}
.loginForm {
  background: transparent;
  position: absolute;
  left: 0;
  right: 0;
  width: 300px;
  margin: 120px auto;
  padding: 35px 35px 25px 35px;
  box-shadow: 0 2px 8px #77bea3;
  border-radius: 10px;
}

.el-input {
  display: inline-block;
  height: 47px;
  width: 90%;
}

#title {
  font-size: 16px;
  font-weight: 700;
  color: #5db2f8;
  margin: 0px 10px 30px 75px;
}
</style>
