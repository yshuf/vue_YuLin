<template>
  <el-container>
    <div class="nav">
      <header class="logo-container">
        <el-row>
          <!-- logo 部分 -->
          <el-col :span="12">
            <img src="../../assets/logo.jpg" alt>
            <div class="title">
              <p @click="handle">现代农业综合管理系统</p>
            </div>
          </el-col>

          <!-- 用户信息 -->
          <el-col :span="12" class="user">
            <!-- 有关信息 -->
            <div class="userinfo">
              <!-- 头像存放 -->
              <div class="img">
                <!-- <img :src="face" alt> -->
                <img :src=form.imageUrl alt>
              </div>

              <!-- 工具选择 -->
              <el-dropdown id="user">
                <el-button type="text">
                  <i class="el-icon-edit" style="font-size: 22px;"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button type="text" @click="show()">个人信息</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="text" @click="logOut()">退出登录</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <!-- 信息 完善 -->
              <el-dialog
                title="个人信息完善"
                :visible.sync="dialogFormVisible"
                style="width: 50%;margin: auto auto;"
                center
                class="animated fadeInRight"
                closeOnPressEscape
              >
                <!-- 头像部分 -->
                <el-upload
                  class="avatar-uploader"
                  action="123"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :http-request="upLoad"
                >
                  <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

                <!-- 主体个人信息部分 -->
                <el-form :model="form">
                  <el-form-item label="姓名:" :label-width="formLabelWidth" prop="name">
                    <el-input
                      v-model="add.name"
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

                  <el-form-item label="爱好:" :label-width="formLabelWidth" prop="hobby">
                    <el-input
                      v-model="add.hobby"
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
      dialogFormVisible: false,
      // 信息完善保存
      form: {
        username: "",
        sex: "", // 性别
        email: "", // 邮箱
        imageUrl: ""
      },
      add: {
        hobby: "",
        name: "" // 姓名
      },
      formLabelWidth: "60px"
    };
  },
  mounted(){
    this.form.imageUr=localStorage.getItem('face');
  },
  methods: {
    // 查看信息显示
    show() {
      this.dialogFormVisible = true;
      this.form.username = localStorage.getItem("username");
      this.form.sex = localStorage.getItem("sex");
      this.form.email = localStorage.getItem("email");
    },
    // 退出登录
    logOut() {
      this.$axios
        .get("auth/logout")
        .then(res => {
          if (res.status == 200) {
            this.$confirm("此操作将退出登录, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                localStorage.removeItem("username");
                localStorage.removeItem("identity");
                localStorage.removeItem("email");
                localStorage.removeItem("sex");
                localStorage.removeItem("isLogin");
                this.$message({
                  type: "success",
                  message: "成功退出!"
                });
                this.$router.push({ path: "/login" });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消退出"
                });
              });
          } else {
            this.$message({
              message: "退出登录失败",
              type: "danger"
            });
          }
        })
        .catch(err => {
          this.$message({
            message: "退出登录失败",
            type: "danger"
          });
        });
    },
    // 个人信息完善后续将信息提交后台,默认的姓名和头像的获取
    Info() {
      this.dialogFormVisible = false;
      this.$axios
        .put("auth/user", this.add)
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: "信息完善成功",
              type: "success"
            });
          }
        })
        .catch(err => {
          this.$message({
            message: err.data,
            type: "danger"
          });
        });
    },
    // 头像上传
    upLoad(file) {
      const formData = new FormData();
      formData.append("file", file.file);
      console.log(file);
      this.$axios.post("upload/image", formData).then(res => {
        console.log(res);
        console.log("上传成功");
        if (res.status == 200) {
            
          // localStorage.getItem("face");
        }else {
          this.$message('头像上传失败');
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
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
/* logo图标 */
.nav .logo-container img {
  border-radius: 44px;
  width: 200px;
  height: 100px;
  vertical-align: text-bottom;
}
/* 平台标题 */
.logo-container .title {
  display: inline-block;
  color: #027562;
  font-weight: 700;
  font-family: "Courier New", Courier, monospace;
  font-size: 30px;
  cursor: pointer;
}
.nav .logo-container .userinfo .img {
  float: right;
  margin-right: 80px;
  margin-top: 20px;
}
.nav .userinfo img {
  width: 60px;
  height: 60px;
}
#user {
  float: right;
  margin-top: 25px;
  margin-right: -105px;
}
/* 用户姓名样式 */
.username {
  float: right;
  margin-top: 60px;
  margin-right: -115px;
  font-size: 16px;
}
/* 头像上传框样式 */
.avatar-uploader {
  position: absolute;
  top: 0;
  right: 55px;
  border-radius: 50%;
  /* border: 1px dashed #8c939d; */
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
.el-icon-s-custom {
  margin-top: -100px;
}
</style>
