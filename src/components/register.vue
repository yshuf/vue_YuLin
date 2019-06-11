<template>
  <div id="register-container" >
    <!-- 注册界面 -->
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="register-form"
    >
      <h3 id="title">注册信息表</h3>
      <el-form-item
        label="用户名"
        prop="username"
        :rules="[
      { required: true, message: '请输入用户名', trigger: 'blur' }
    ]"
      >
        <el-input v-model="dynamicValidateForm.username" placeholder="username"></el-input>
      </el-form-item>

      <el-form-item
        label="密码"
        prop="password"
        :rules="[
      { required: true, message: '请输入密码', trigger: 'blur' },
    ]"
      >
        <el-input v-model="dynamicValidateForm.password" type="password" placeholder="password" show-password></el-input>
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
        label="邮箱"
        prop="email"
        :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
      >
        <el-input v-model="dynamicValidateForm.email" placeholder="email"></el-input>
      </el-form-item>

      <el-form-item style="margin-left: 0px;margin-bottom: 10px;">
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        username: "",
        password: "",
        email: "",
        sex: ""
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
  /* box-sizing: border-box; */
}
#title {
  font-size: 26px;
  font-weight: 400;
  color: #d8e1e6;
  margin: 0px 10px 30px 60px;
  text-align: center;
}

</style>
