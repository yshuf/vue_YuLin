<template>
  <div id="register-container">
    <!-- 注册界面 -->
    <el-form
      :model="registerForm"
      ref="registerForm"
      label-width="100px"
      class="register-form animated bounceInRight delay-1s"
    >
      <h3 id="title">现代农业综合后台管理注册</h3>

      <!-- 用户名 -->
      <el-form-item
        label="用户名"
        prop="username"
        :rules="[
      { required: true, message: '用户名不能为空', trigger: 'blur' },
      { min:5 ,max:30,message: '长度应在5到30位之间',trigger: 'blur'}
    ]"
      >
        <el-input v-model="registerForm.username" placeholder="username"></el-input>
      </el-form-item>

      <!-- 邮箱 -->
      <el-form-item
        label="邮箱"
        prop="email"
        :rules="[
      { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
      {min: 6,max: 20,message: '长度应在6到20位之间'}
    ]"
      >
        <el-input v-model="registerForm.email" placeholder="email"></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item
        label="密码"
        prop="password"
        :rules="[
      { required: true, message: '密码不能为空', trigger: 'blur' },
    ]"
      >
        <el-input
          v-model="registerForm.password"
          type="password"
          placeholder="password"
          show-password
        ></el-input>
      </el-form-item>

      <!-- 性别 -->
      <el-form-item
        label="性别"
        prop="sex"
        :rules="[{required:true,message:'请选择性别',trigger: 'blur'}]"
      >
        <el-radio-group v-model="registerForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item style="margin-left: -30px;margin-bottom: 10px;">
        <el-button
          type="primary"
          @click="submitForm('registerForm')"
          class="submit_btn"
          style="width: 100px;"
        >提交</el-button>
        <el-button @click="resetForm('registerForm')" style="width: 100px;">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "register",
  components: {},
  data() {
    return {
      registerForm: {
        username: "",
        password: "",
        email: "",
        sex: ""
      }
    };
  },

  methods: {
    // 表单提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("auth/regist", this.registerForm) // 提交表单
            .then(res => {
              // 如果获取信息成功，前往 登录页面
              if (res.status === 200) {
                const user = JSON.parse(res.config.data);
                var username = user.username;
                var sex = user.sex;
                var email = user.email;
                window.localStorage.setItem("username", username);
                window.localStorage.setItem("sex", sex);
                window.localStorage.setItem("email", email);
                this.$message({
                  message: "注册成功，去登录",
                  type: "success"
                });
                this.$router.push({ path: "/login" }); // 注册成功，跳转至登录页
              } else {
                alert("你输入的信息格式有误，请重新输入");
              }
            })
            .catch(err => {
              // 注册失败，返回错误信息
              this.$message({
                showClose: true,
                message: err.response.data,
                type: "danger"
              });
            });
        } else {
          // 只要有一个为空着注册失败
           this.$message({
                showClose: true,
                message: "注册失败，请填写完整注册信息哦",
                type: "danger"
              });
          return false;
        }
      });
    },
    //   if (
    //     this.registerForm.username == "" ||
    //     this.registerForm.password == "" ||
    //     this.registerForm.email == "" ||
    //     this.registerForm.sex == ""
    //   ) {
    //     this.$message({
    //       message: "请填写完整注册信息",
    //       type: "warning",
    //       center: true
    //     });
    //   } else {
    //     // 向后台发起请求

    //   }
    // },

    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
#register-container {
  position: fixed;
  background-color: #abd3c6;
  width: 100%;
  height: 100%;
  background: url(../assets/register1.jpg) no-repeat center center;
  background-size: 100% 100%;
}
#register-container:hover {
  background-color: rgb(194, 221, 231);
}
.register-form {
  background: transparent;
  position: absolute;
  left: 0;
  right: 0;
  width: 300px;
  margin: 120px auto;
  padding: 25px 50px 15px 10px;
  box-shadow: 0 2px 8px #e1e9e6;
  border-radius: 10px;
  /* box-sizing: border-box; */
}
#title {
  font-size: 20px;
  font-weight: 400;
  margin: 0px 0px 30px 38px;
  text-align: center;
  font-weight: 700;
  color: rgb(64, 179, 246);
  font-family: "Courier New", Courier, monospace;
}
</style>
