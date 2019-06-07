<template>
  <div id="index">
    <!-- head start -->
    <div class="nav">
      <div class="logo">
        <img src="../../assets/logo2.png" alt>
        <span>{{msg}}</span>
        <span class="personal"></span>
        <!-- <img src="" alt=""> -->
      </div>
      
    </div>
    <!-- head end -->

    <!-- 侧边栏 start -->
    <div id="aside">
      <el-row class="tac">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#83c0a9"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <!-- <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group> -->
             <el-submenu index="1-1">
              <template slot="title">选项1</template>
            </el-submenu>
             <el-submenu index="1-2">
              <template slot="title">选项2</template>
            </el-submenu>
             <el-submenu index="1-3">
              <template slot="title">选项3</template>
            </el-submenu>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg:'用户公司名字'
    }
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
#index {
  width: 100%;
}
.nav {
  width: 100%;
  height: 100px;
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
  vertical-align: cneter;
}
#aside {
  width: 100%;
}
.el-row {
  width: 15%;
  height: 100%;
}
</style>
