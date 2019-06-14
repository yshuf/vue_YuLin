<template>
  <div id="register-container">
    <!-- 注册界面 -->
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="register-form animated bounceInRight delay-1s"
    >
      <h3 id="title">现代农业综合后台管理系统</h3>
      <el-form-item
        label="用户名"
        prop="username"
        :rules="[
      { required: true, message: '用户名不能为空', trigger: 'blur' },
      { min:5 ,max:30,message: '长度应在5到30位之间',trigger: 'blur'}
    ]"
      >
        <el-input v-model="dynamicValidateForm.username" placeholder="username"></el-input>
      </el-form-item>

      <el-form-item
        label="邮箱"
        prop="email"
        :rules="[
      { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
      {min: 6,max: 20,message: '长度应在6到20位之间'}
    ]"
      >
        <el-input v-model="dynamicValidateForm.email" placeholder="email"></el-input>
      </el-form-item>

      <el-form-item
        label="密码"
        prop="password"
        :rules="[
      { required: true, message: '密码不能为空', trigger: 'blur' },
    ]"
      >
        <el-input
          v-model="dynamicValidateForm.password"
          type="password"
          placeholder="password"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item
        label="性别"
        prop="sex"
        :rules="[{required:true,message:'请选择性别',trigger: 'blur'}]"
      >
        <el-radio-group v-model="dynamicValidateForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="身份确认"
        :rules="[
      { required: true, message: '请选择你的身份', trigger: 'blur' },
    ]"
      >
        <el-select v-model="dynamicValidateForm.identity" placeholder="请选择身份">
          <el-option label="管理员" value="manager"></el-option>
          <el-option label="员工" value="employee"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item style="margin-left: -30px;margin-bottom: 10px;">
        <el-button type="primary" @click="submitForm('dynamicValidateForm')" class="submit_btn" style="width: 100px;">提交</el-button>
        <el-button @click="resetForm('dynamicValidateForm')" style="width: 100px;">重置</el-button>
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
      dynamicValidateForm: {
        username: "",
        password: "",
        email: "",
        sex: "",
        identity: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
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
  /* background: url(../assets/register.jpg) no-repeat center center; */
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
  font-size: 18px;
  font-weight: 400;
  margin: 0px 10px 30px 60px;
  text-align: center;
  font-weight: 700;
  color: rgb(90, 184, 238);
}
</style>
