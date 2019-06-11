<template>
  <div>
    <div class="main">
      <h3 class="one">系统普通提示</h3>
      <div class="plain">
        <span>Min</span>
        <input type="text" placeholder="请输入内容">
        <span class="max">Max</span>
        <input type="text" placeholder="请输入内容">
        <el-button type="primary">确认</el-button>
      </div>
      <h3 class="two">系统提示</h3>
      <div class="plain">
        <span>Min</span>
        <input type="text" placeholder="请输入内容">
        <span class="max">Max</span>
        <input type="text" placeholder="请输入内容">
        <el-button type="primary">确认</el-button>
      </div>
      <h3 class="three">系统警告提示</h3>
      <div class="plain">
        <span>Min</span>
        <input type="text" placeholder="请输入内容">
        <span class="max">Max</span>
        <input type="text" placeholder="请输入内容">
        <el-button type="primary">确认</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Setting"
};
</script>

<style scoped>
.main {
  text-align: center;
  transition: all 0.5s ease-in-out;
}
h3 {
  width: 150px;
  height: 40px;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  font-weight: 400px;
  transform: skew(-30deg);
  margin-left: 100px;
}
.one {
  background-color: #409eff;
}
.two {
  background-color: #67c23a;
}
.three {
  background-color: #e6a23c;
}
.plain {
  margin-left: -20px;
}

.plain > .max {
  margin-left: 60px;
}
.plain > input {
  width: 200px;
  height: 20px;
  margin-left: 10px;
}
.plain > .el-button {
  margin-left: 40px;
}
</style>
