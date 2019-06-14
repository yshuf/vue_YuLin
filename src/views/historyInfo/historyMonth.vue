<template>
  <el-container>
    <el-header style="text-align: right; font-size: 16px;">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        router
      >
        <el-menu-item index="/index/historyMonth/weatherMonth">气象</el-menu-item>
        <el-menu-item index="/index/historyMonth/yulinMonth">渔林</el-menu-item>
        <el-submenu index="3">
          <template slot="title">我的工作台</template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
          <el-menu-item index="3-3">选项3</el-menu-item>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项1</el-menu-item>
            <el-menu-item index="3-4-2">选项2</el-menu-item>
            <el-menu-item index="3-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-header>

    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
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
    }
  }
};
</script>

<style scoped>
.el-header {
 background-color: #f6fcd7;
  /* color: #333; */
  line-height: 60px;
  border-radius: 100px;
  font-weight: 700;
  font-size: 30px;
}

.el-menu {
  background-color: #f7fdd5;
}
</style>

