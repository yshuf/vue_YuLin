<template>
  <el-container>
    <div class="nav">
      <header class="logo-container">
        <el-row>
          <!-- logo 部分 -->
          <el-col :span="12">
            <img src="../../assets/logo.jpg" alt>
            <div class="title">
              <p @click="handle">蔬菜产销智能综合管理平台</p>
            </div>
          </el-col>

          <!-- 用户信息 -->
          <el-col :span="12" class="user">
            <!-- 头像部分 -->
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

            <!-- 有关信息 -->
            <div class="userinfo">
              <el-dropdown id="user">
                <el-button type="text">
                  <i class="el-icon-setting" style="font-size: 18px;"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button type="text" @click="show()">个人信息</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="text" @click="open()">退出登录</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <!-- 信息 完善 -->
              <el-dialog
                title="个人信息完善"
                :visible.sync="dialogFormVisible"
                style="width: 60%;margin: auto auto;"
                center
                class="animated fadeInRight"
                closeOnPressEscape
              >
                <el-form :model="form">
                  <el-form-item label="姓名:" :label-width="formLabelWidth" prop="name">
                    <el-input
                      v-model="form.name"
                      placeholder="请输入内容"
                      style="width: 60%;"
                      size="medium"
                    ></el-input>
                  </el-form-item>

                  <el-form-item
                    label="用户名:"
                    :label-width="formLabelWidth"
                    prop="username"
                  >{{form.username}}</el-form-item>

                  <el-form-item
                    label="邮箱:"
                    :label-width="formLabelWidth"
                    prop="email"
                  >{{form.email}}</el-form-item>

                  <el-form-item label="性别:" :label-width="formLabelWidth" prop="sex">{{form.sex}}</el-form-item>

                  <el-form-item
                    label="密码:"
                    :label-width="formLabelWidth"
                    prop="password"
                  >{{form.password}}</el-form-item>

                  <el-form-item label="爱好:" :label-width="formLabelWidth" prop="hobby">
                    <el-input
                      v-model="form.hobby"
                      placeholder="请输入内容"
                      style="width: 60%;"
                      size="medium"
                    ></el-input>
                  </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="Info()">确 定</el-button>
                </div>
              </el-dialog>

              <p class="username">{{form.name}}</p>
            </div>
          </el-col>
        </el-row>
      </header>
    </div>
  </el-container>
</template>

<script>
import { setInterval } from "timers";
export default {
  name: "head-nav",
  data() {
    return {
      imageUrl: "",
      dialogFormVisible: false,
      form: {
        name: "哈嘿嘿", // 姓名
        username: "zhaga",
        sex: "女", // 性别
        email: "12345687@qq.com", // 邮箱
        password: "123",
        hobby: "唱歌"
      },
      formLabelWidth: "60px"
    };
  },
  methods: {
    // 查看显示
    show() {
      this.dialogFormVisible = true;
    },

    // 退出登录
    open() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.localStorage.removeItem("username");
          window.localStorage.removeItem("password");
          this.$message({
            type: "success",
            message: "成功退出!"
          });
          this.$router.push({path:"/"});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    },

    // 个人信息完善
    Info() {
      this.dialogFormVisible = false;
      console.log(window.localStorage.getItem('username'));
    },

    // 头像上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handle() {
      this.$router.push("/index");
    }
  }
};
</script>

<style scoped>
.nav {
  width: 100%;
  height: 100px;
  background-color: #b3dbdb;
  border-bottom: 1px solid #eee;
}
.nav .logo-container {
  position: relative;
  min-width: 1200px;
}
.nav .logo-container img {
  border-radius: 44px;
  width: 200px;
  height: 100px;
  vertical-align: text-bottom;
}
.logo-container .title {
  display: inline-block;
  color: rgb(2, 117, 98);
  font-weight: 700;
  font-family: "Courier New", Courier, monospace;
  font-size: 30px;
  cursor: pointer;
}

/* 用户信息 */
.user {
  position: relative;
}
#user {
  float: right;
  margin-top: 25px;
  margin-right: 20px;
}
.username {
  float: right;
  margin-top: 60px;
  margin-right: -35px;
  font-size: 16px;
}
/* 头像上传 */
.avatar-uploader {
  position: absolute;
  top: 0;
  right: 55px;
  border-radius: 50%;
  border: 1px dashed #8c939d;
  margin-top: 25px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #8c939d;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.avatar {
  width: 50px;
  height: 50px;
  background-color: red;
  display: block;
}
/* 弹出框中的各个信息之间 */
.el-form-item {
  margin-bottom: 18px;
}
.dialog-footer {
  margin-top: -18px;
}
</style>
