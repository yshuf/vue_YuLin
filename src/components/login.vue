<template>
  <div id="container">
    <div class="blur"></div>
    <el-form
      status-icon
      label-width="80px"
      :rules="rules"
      class="loginForm animated bounceInRight delay-1s"
      :model="loginForm"
      ref="loginForm"
    >
      <!-- 登录界面 -->
      <h3 id="title" class="animated bounceIn delay-1s">现代农业综合后台管理登录</h3>
      <!-- 用户名 -->
      <el-form-item label="用户名" prop="username">
        <el-input type="text" autocomplete="off" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
      </el-form-item>
      <!-- 登录密码 -->
      <el-form-item label="登录密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          autocomplete="off"
          v-model="loginForm.password"
          show-password
        ></el-input>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item label="验证码" prop="captcha" style="width: 185px;position: relative;">
        <el-input type="text" autocomplete="off" v-model="loginForm.captcha"></el-input>
        <img
          src="http://10.168.14.55:8080/auth/captcha"
          alt="验证码"
          title="点击换一张"
          id="img"
          @click="updateCode()"
        >
      </el-form-item>

      <el-button
        type="primary"
        native-type="submit"
        style="margin-left: 40px;width: 110px;"
        class="login"
        @click="login('loginForm')"
      >立即登录</el-button>
      <el-button @click="resetForm('loginForm')" type="primary" style="width: 110px;">重置</el-button>

      <p>
        还没有账号？立即
        <span @click="register()" class="register">注册</span>
      </p>
    </el-form>
  </div>
</template>

<script>
import { setInterval } from "timers";
import { type } from "os";
export default {
  data() {
    return {
      labelPosition: "right",
      flag: false,
      loginForm: {
        username: "", // 用户名
        password: "", // 密码
        captcha: "" // 验证码
      },
      // 登录规则
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
        captcha: [
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
    // 登录表单提交
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("auth/login", this.loginForm)
            .then(res => {
              // 返回成功
              if (res.status == 200) {
                // 保存用户登录信息
                window.localStorage.setItem("email", res.data.user.email);
                window.localStorage.setItem("identity", res.data.user.identity);
                window.localStorage.setItem("sex", res.data.user.sex);
                window.localStorage.setItem("username", res.data.user.username);
                window.localStorage.setItem("face",res.data.user.face);
                this.$message({
                  showClose: true,
                  message: "登录成功",
                  type: "success"
                });
                // 登录成功进入首页
                this.$router.push("/index");
              }else{
                this.$message({
                   message: "登录失败",
                  type: "error"
                })
              }
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: err.response.data,
                type: "danger"
              });
            });
        } else {
          this.$message({
            showClose: true,
            message: "登录信息无效",
            type: "danger"
          });
        }
      });
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 注册路由跳转
    register() {
      this.$router.push({ path: "/register" });
    },
    // 获取一个新的验证码
    updateCode() {
      let img = document.getElementById("img");
      img.src = img.src + "?" + new Date().getTime();
    },
    // 切换
    toogle() {
      this.flag = !flag;
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.blur {
  position: fixed;
  background-color: #d5dee6;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-size: 100% 100%;
  background: url(../assets/login1.jpg) no-repeat center center;
  filter: blur(30px);
}
#container {
  position: fixed;
  background-color: #d5dee6;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-size: 100% 100%;
  /* background: url(../assets/login1.jpg) no-repeat center center; */
  /* filter: blur(15px); */
}
#container:hover {
  background-color: #d5e6de;
}
/* 表单样式 */
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
/* 输入框样式 */
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
  font-family: "Courier New", Courier, monospace;
}
p {
  font-size: 14px;
  float: right;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
}
p > .register {
  text-decoration: none;
  color: #ff0000;
  font-weight: 700;
  font-size: 16px;
}
#img {
  position: absolute;
  margin-left: 5px;
  width: 96px;
  height: 40px;
}
</style>
