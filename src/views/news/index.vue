<template>
  <div>
    <!-- 头部 start -->
      <HeaderNav></HeaderNav>
    <!-- 头部 end -->

    <!-- 侧边栏 start -->
    <el-container style="height: 100vh;border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(249, 250, 243)">
        <el-menu router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>今日信息
            </template>
            <el-menu-item index="/index/header/weather">查看今日信息</el-menu-item>
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
import HeaderNav from '@/components/headerNav'
export default {
  naem: 'index',
  components: {
    HeaderNav
  },
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
.el-aside {
  text-align: center;
  line-height: 200px;
}

</style>
