<template>
  <div class="side">
    <el-aside width="200px" style="background-color: rgb(249, 250, 243)">
      <el-menu router>
        <!-- 侧边栏主体部分 -->
        <!-- 今日信息 -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>今日信息
          </template>
          <el-menu-item index="/index/header/weather">查看今日信息</el-menu-item>
          <el-menu-item index="/index/header/weather">标准区</el-menu-item>
        </el-submenu>
        <!-- 历史信息 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>历史消息
          </template>
          <el-menu-item index="/index/history">年</el-menu-item>
          <el-menu-item index="/index/historyMonth">月</el-menu-item>
          <el-menu-item index="/index/historyDay">日</el-menu-item>
        </el-submenu>
        <!-- 系统提醒 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-warning-outline"></i>系统提醒
          </template>
          <el-menu-item index="/index/headerStard">提醒信息</el-menu-item>
        </el-submenu>
        <!-- 设备设置 -->
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>设备相关设置
          </template>
          <el-menu-item index="/index/headerSet">系统资源</el-menu-item>
        </el-submenu>
        <!-- 关于我们 -->
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-user"></i>关于我们
          </template>
          <el-menu-item index="/index/about">了解我们</el-menu-item>
          <el-menu-item index="/index/join">加入我们</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style scoped>
.side {
  background-color: #f0f5db;
}
.el-message-box__wrapper .el-message-box {
  width: 960px;
}
.el-menu {
  background-color: #f9fdde;
}
.el-aside {
  text-align: center;
  line-height: 200px;
  background-color: #f9fdde;
}
</style>