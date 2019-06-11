<template>
  <div>
    <!-- 头部 start -->
    <el-container>
      <div class="nav">
        <div class="logo">
          <img src="../../assets/logo2.png" alt>
          <span>{{msg}}</span>
          <span class="personal"></span>
          <span id="user">
            <el-dropdown>
              <el-button type="text">
                <i class="el-icon-s-custom" style="margin-right: 18px;font-size: 18px;"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-button  @click="open" type="text" roundButton><el-dropdown-item>查看</el-dropdown-item></el-button>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span>用户信息中心</span>
          </span>
        </div>
      </div>
    </el-container>
    <!-- 头部 end -->

    <!-- 侧边栏 start -->
    <el-container style="height: 100vh;border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(249, 250, 243)">
        <el-menu :default-openeds="['1']" router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>今日信息
            </template>
            <el-menu-item index="/index/header">查看今日信息</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>历史消息
            </template>
            <el-menu-item index="/index/history">年</el-menu-item>
            <el-menu-item index="2-2">月</el-menu-item>
            <el-menu-item index="2-3">日</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-warning-outline"></i>系统提醒
            </template>
            <el-menu-item index="/index/warn">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>设备相关设置
            </template>
            <el-menu-item index="/index/headerSet">系统资源</el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-user"></i>关于我们
            </template>
            <el-menu-item index="/index/about">了解我们</el-menu-item>
            <el-menu-item index="/index/join">加入我们</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 侧边栏 end -->

      <!-- 主体 start -->
      <el-container>
        <router-view></router-view>
      </el-container>
      <!-- 主体 end -->
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "用户公司名字",
      activeIndex: "1"
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    open() {
      this.$alert("用户名<input type='text'>邮箱<input type='text'>性别<input type='text'>用户名<input type='text'>", "个人信息", {
        dangerouslyUseHTMLString: true
      });
    }
  }
};
</script>

<style scoped>
html,
body {
  padding: 0;
  margin: 0;
}
.el-message-box__wrapper .el-message-box {
  width: 960px;
}
.el-header {
  background-color: #f9faf3;
  line-height: 60px;
  border-radius: 200px;
  font-weight: 700;
  font-size: 30px;
}
.el-menu {
  background-color: #f9faf3;
}
.nav {
  width: 100%;
  height: 100px;
  text-align: center;
  background-color: #b3dbdb;
}
.nav .logo {
  text-align: center;
  position: relative;
}
.nav .logo img {
  border-radius: 44px;
  margin-left: -60%;
  width: 200px;
  height: 100px;
}
.nav .logo .personal {
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  right: 0;
  bottom: 50%;
  margin-bottom: -25px;
}
#user {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
