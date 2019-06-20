<template>
    <div class="main">
      <!-- 系统提示信息 -->
      <!-- <img src="@/assets/images/yun.png" alt=""> -->
      <h3 class="one" >系统普通提示</h3>
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
</template>

<script>
export default {
  name: "Setting"
};
</script>

<style scoped>
.main {
  text-align: center;
  overflow: hidden;
}
.main > img {
  /* float: right; */
}
h3 {
  width: 150px;
  height: 40px;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  font-weight: 400px;
  transform: skew(-30deg);
  margin: 30px 0 10px 100px;
}
.one {
  background-color: #72b6fa;
  box-shadow: 0 0 3px 4px #72b6fa;
}
.two {
  background-color: #94c37c;
  box-shadow: 0 0 3px 4px #94c37c;
}
.three {
  background-color: #e0bd89;
  box-shadow: 0 0 3px 4px #e0bd89;
}
.plain {
  margin-left: -20px;
}

.plain > .max {
  margin-left: 60px;
}
.plain > input {
  padding: 0;
  margin: 0;
  width: 200px;
  height: 30px;
  margin-left: 10px;
  border-radius: 3px;
  border: 2px solid #d1b9b9;
  outline: #94c37c;
}
.plain:hover > input {
  background-color: #e8fad8;
}
.plain > .el-button {
  margin-left: 40px;
}
</style>
