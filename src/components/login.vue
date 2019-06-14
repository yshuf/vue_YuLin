<template>
  <div id="container">
    <el-form
      status-icon
      label-width="80px"
      :rules="rules"
      class="loginForm animated bounceInRight delay-1s"
      :model="loginForm"
      ref="loginForm"
      @submit.native.prevent="saveLogin"
    >
      <!-- 登录界面 -->
      <h3 id="title" class="animated bounceIn delay-1s">现代农业综合后台管理登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" autocomplete="off" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
      </el-form-item>

      <el-form-item label="登录密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          autocomplete="off"
          v-model="loginForm.password"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="verification" style="width: 185px;">
        <el-input type="text" autocomplete="off" v-model="loginForm.verification"></el-input>
        <el-input type="text" class="random"></el-input>
      </el-form-item>
      
      

      <el-button
        type="primary"
        native-type="submit"
        style="margin-left: 40px;width: 110px;"
        class="login"
      >
        <router-link to="/index" tag="li">立即登录</router-link>
      </el-button>
      <el-button @click="resetForm('loginForm')" type="primary" style="width: 110px;">重置</el-button>
      <p>
        还没有账号？立即
        <router-link to="/register">注册</router-link>
      </p>
      <!-- <el-button type="primary"><router-link to="/register" tag="li">立即注册</router-link></el-button> -->
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
      loginForm: {
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
        verification: [
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
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
  background: url(../assets/login1.jpg) no-repeat center center;
  background-size: 100% 100%;
}

#container:hover {
  background-color: #d5e6de;
}
.loginForm {
  background: transparent;
  position: absolute;
  left: 0;
  right: 0;
  width: 300px;
  margin: 150px auto;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 2px 8px #77bea3;
  border-radius: 10px;
}

.el-input {
  display: inline-block;
  height: 47px;
  width: 90%;
}

.random {
  position: absolute;
  margin-left: 10px;
}

#title {
  font-size: 16px;
  font-weight: 700;
  color: #5db2f8;
  text-align: center;
  margin: 0px 10px 30px 25px;
}
p {
  font-size: 14px;
  float: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
p > a {
  text-decoration: none;
  color: #ff0000;
  font-weight: 700;
  font-size: 16px;
}
</style>
