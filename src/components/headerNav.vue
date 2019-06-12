<template>
  <el-container>
    <div class="nav">
      <header class="logo-container">
        <el-row>
          <el-col :span="12">
            <img src="../assets/logo.jpg" alt>
            <span class="title">现代农业综合管理系统</span>
          </el-col>
          <el-col :span="12">
            <el-dropdown id="user">
              <el-dropdown>
                <el-button type="text">
                  <i class="el-icon-s-custom" style="margin-right: 18px;font-size: 18px;"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <!-- <el-button  type="text" roundButton> -->
                    <el-dropdown-item @click="open">查看</el-dropdown-item>
                  <!-- </el-button> -->
                  <el-dropdown-item>新增</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span class="username">用户名</span>
            </el-dropdown>
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
      msg: "现代农业综合管理系统"
    };
  },
  methods: {
    open() {
      this.$alert(
        "<el-row><el-col>用户名<input type='text'>邮箱<input type='text'>性别<input type='text'>用户名<input type='text'></el-col></el-row>",
        "个人信息",
        {
          dangerouslyUseHTMLString: true
        }
      );
    }
  }
};
</script>

<style scoped>
.nav {
  width: 100%;
  height: 100px;
  background-color: #b3dbdb;
}
.nav .logo-container {
  position: relative;
}
.nav .logo-container img {
  border-radius: 44px;
  width: 200px;
  height: 100px;
}
.logo-container .title {
    display: inline-block;
    color: rgb(2, 117, 98);
    /* font-size: 18px; */
    font-weight: 700;
    font-family: 'Courier New', Courier, monospace;

}
#user {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 18px;
}
</style>
