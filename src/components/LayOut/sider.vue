<template>
  <div class="side">
    <el-aside width="200px" style="background-color: rgb(249, 250, 243)">
      <el-menu router  default-active="1">
        <!-- 侧边栏主体部分 -->
        <!-- 今日信息 -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>今日信息
          </template>
          <el-menu-item index="/index/header/weather">(A)区</el-menu-item>
          <el-menu-item>(B)区</el-menu-item>
          <el-menu-item index="/index"  @click="open">
            标准区
          </el-menu-item>
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

        <!-- 系统管理 -->
        <el-submenu index="4" v-if="true">
          <template slot="title">
            <i class="el-icon-s-check"></i>系统管理
          </template>
          <el-menu-item index="/index/headerSet">设备相关设置</el-menu-item>
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
    return {};
  },
  methods: {
     open() {
      //  判断该用户是不是管理员，如果不是管理员，提示他请管理员前去设置，
      // 如果是管理员，提示他： 可以去历史信息中选择某一天设置为标准去
        // this.$notify.info({
        //   title: '消息',
        //   message: '你好，你的管理员暂时还没有设置标准，如有需要，你可以请管理前去设置',
        //   offset: 100
        // });
        this.$notify.info({
          title: '提示',
          message: '你好，你可以前往历史消息中选择某一天作为标准区哦',
          offset: 200
        })
      },
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