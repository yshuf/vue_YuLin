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
            <div class="userinfo">
              <el-dropdown id="user">
                <el-button type="text">
                  <i class="el-icon-setting" style="font-size: 18px;"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-popover placement="right" width="400" trigger="click">
                    <div>
                      <p>*用户名</p>
                      <p>*性别</p>
                      <p>*邮箱</p>
                    </div>
                    <el-button slot="reference">
                      <el-dropdown-item>查看</el-dropdown-item>
                    </el-button>
                  </el-popover>

                  <el-dropdown-item>新增</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <p class="username">用户名</p>
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
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
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
  /* box-shadow: 0 2px 2px 2px #eee; */
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
  margin-top:  25px;
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
