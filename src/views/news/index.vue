<template>
  <div>
    <!-- 头部 start -->
    <el-container>
        <div class="nav">
          <div class="logo">
            <img src="../../assets/logo2.png" alt>
            <span>{{msg}}</span>
            <span class="personal"></span>
          </div>
        </div>
    </el-container>
    <!-- 头部 end -->
    

    
    <el-container style="height: 100vh;border: 1px solid #eee">
      <!-- 侧边栏 start -->
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu :default-openeds="['1']" router>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>今日信息
              </template>
              <el-menu-item index="/home">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>历史消息
              </template>
              <el-menu-item index="/history">年</el-menu-item>
              <el-menu-item index="2-2">月</el-menu-item>
              <el-menu-item index="2-3">日</el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-warning-outline"></i>系统提醒
              </template>
                <el-menu-item index="/warn">选项1</el-menu-item>
                <el-menu-item index="3-2">选项2</el-menu-item>
              <el-menu-item-group title="分组2">
                <el-menu-item index="3-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="3-4">
                <template slot="title">选项4</template>
                <el-menu-item index="3-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-setting"></i>设备相关设置
              </template>
              <el-menu-item index="4-1">系统资源</el-menu-item>
              <el-menu-item index="4-2">选项2</el-menu-item>
            </el-submenu>

            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-user"></i>关于我们
              </template>
              <el-menu-item index="5-1">选项1</el-menu-item>
              <el-menu-item index="5-2">选项2</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
      <!-- 侧边栏 end -->

      <el-container>
        <!-- 主体 start -->
        <el-header style="text-align: right; font-size: 16px;">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 18px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>个人信息中心</span>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 主体 end -->
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
html,body {
  padding: 0;
  margin: 0;
}
.el-header {
  background-color: #dbf5f8;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.el-menu {
  background-color: #eef1f6;
}
 .nav {
  width: 100%;
  height: 100px;
  text-align: center;
  background-color: #b3dbdb;
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

/* .el-header { 
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
} */
</style>
