<template>
  <el-container>
    <div class="nav">
      <header class="logo-container">
        <el-row>
          <el-col :span="12">
            <img src="../../assets/logo.jpg" alt>
            <div class="title">
              <p>现代农业综合管理系统</p>
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
                    <el-button type="text" @click="show()">查看</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>修改</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <!-- 查看信息 -->
                <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
                  <el-form :model="form">
                    <el-form-item label="用户名" :label-width="formLabelWidth">
                      <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth">
                      <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="邮箱" :label-width="formLabelWidth">
                      <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="活动区域" :label-width="formLabelWidth">
                      <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
export default {
  name: "head-nav",
  data() {
    return {
      imageUrl: "",
      dialogFormVisible: false,
      form: {
        name: "用户名",
        sex: "",
        email: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    show() {
      this.dialogFormVisible = true;
    },
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
</style>
