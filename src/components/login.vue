<template>
  <div id="container">
    <!-- <div>
            <label for="username">&nbsp;&nbsp;&nbsp;用户名:</label>
            <input type="text" name="username" placeholder="请输入用户名">
        </div>
        <div>
            <label for="password">登录密码:</label>
            <input type="password" name="password" placeholder="请输入密码">
        </div>
        <div>
            <label for="password">&nbsp;&nbsp;&nbsp;验证码:</label>
            <input type="text" name="password" >
    </div>-->
    <el-form status-icon label-width="88px" class="demo-ruleForm">
      <el-form-item label="用户名*" prop="checkPass">
        <el-input type="text" autocomplete="off" placeholder="请输入用户名" v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="登录密码*" prop="pass">
        <el-input type="password" placeholder="请输入密码" autocomplete="off" v-model="password"></el-input>
      </el-form-item>
      <el-form-item label="验证码*" prop="age">
        <el-input type="text" placeholder="请输入验证码" autocomplete="off" v-model="verification"></el-input>
      </el-form-item>
      <el-button type="primary">
        <router-link to="/index" tag="li">立即登录</router-link>
      </el-button>
      <!-- <el-button type="primary"><router-link to="/register" tag="li">立即注册</router-link></el-button> -->
      <el-button type="primary" @click="dialogFormVisible=true">立即注册</el-button>

      <el-dialog title="注册信息表" :visible.sync="dialogFormVisible" style="margin-left:50%">
        <el-form :model="form">
          <el-form-item label="用户名*" prop="checkPass">
            <el-input
              type="text"
              autocomplete="off"
              placeholder="请输入用户名"
              v-model="form.username"
              :label-width="formLabelWidth"
              :label-position="labelPosition"
            ></el-input>
          </el-form-item>
          <el-form-item label="登录密码*" prop="pass">
            <el-input
              type="password"
              placeholder="请输入密码"
              autocomplete="off"
              v-model="form.password"
              :label-position="labelPosition"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别*" prop="sex" :label-position="labelPosition">
            <div id="sex">
              <label for>男</label>
              <input type="radio" value="男" name="person">
              <label for>女</label>
              <input type="radio" value="女" name="person">
            </div>
          </el-form-item>
          <el-form-item label="Email*" prop="age">
            <el-input type="email" placeholder="请输入邮箱地址" autocomplete="off" v-model="form.email"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
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
      },
      formLabelWidth: "100px"
    };
  },
  methods: {}
};
</script>

<style>
#container {
  border: 1px solid #ccc;
  width: 380px;
  height: 300px;
  margin: 160px auto;
  border-radius: 5px;
  box-shadow: 5px 5px 14px lightblue;
  box-sizing: border-box;
}
#container div {
  box-sizing: border-box;
  margin: 7px auto;
  margin-left: 0;
}
#container li {
  list-style: none;
}
.el-input {
  width: 80%;
}
.el-form-item__label {
  padding: 12px 0 0 0;
}
el-form-item .el-dialog__wrapper .el-dialog {
  width: 520px;
  height: 450px;
}
el-form-item .sex input{
  display: block;
  margin: 3px 10px 0px 10px;
}
.el-dialog__body {
  padding: 0px 20px;
}
</style>
