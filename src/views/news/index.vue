<template>
    <div>
      <el-container style="height: 800px;">
      <!-- head start -->
      <el-header height="100px" fixed>
        <div class="nav">
          <div class="logo">
            <img src="../../assets/logo2.png" alt>
            <span>{{msg}}</span>
            <span class="personal"></span>
            <!-- <img src="" alt=""> -->
          </div>
        </div>
      </el-header>
      <!-- head end -->

      <!-- 侧边栏 start -->
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-menu
              router
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#83c0a9"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-submenu index="/home">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>今日信息</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <el-menu-item index="/index/history">
                <i class="el-icon-menu"></i>
                <span slot="title">历史消息</span>
              </el-menu-item>

              <el-menu-item index="/warn">
                <i class="el-icon-document"></i>
                <span slot="title">系统提醒</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">设备相关设置</span>
              </el-menu-item>
            </el-menu>
          </el-row>
        </el-aside>
        <!-- 侧边栏 end -->


        <el-main>
          Main
        </el-main>
      </el-container>
    </el-container>
    </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "用户公司名字"
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.nav {
  width: 100%;
  height: 100px;
  text-align: center;
  background-color: #83c0a9;
}
.nav .logo {
  text-align: center;
  margin-left: -50%;
}
.nav .logo img {
  border-radius: 44px;
  width: 200px;
  height: 100px;
}
.nav .logo .personal {
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  float: right;
}

.el-header {
  margin: 0;
  padding: 0;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 100px;
}

.el-aside {
  background-color: #83c0a9;
  color: #333;
  text-align: center;
  line-height: 200px;
  display: fixed;
}

.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin: 40px;
}

</style>
