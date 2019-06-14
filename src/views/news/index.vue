<template>
  <div>
    <!-- 头部 start -->
      <HeaderNav></HeaderNav>
    <!-- 头部 end -->

    <!-- 侧边栏 start -->
    <el-container style="height: 100vh;border: 1px solid #eee">
      <Sider></Sider>
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
import HeaderNav from '@/components/LayOut/headerNav'
import Sider from '@/components/LayOut/sider'
export default {
  name: 'index',
  components: {
    HeaderNav,
    Sider
  }
};
</script>

<style scoped>
html,
body {
  padding: 0;
  margin: 0;
}
</style>
