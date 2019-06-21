<template>
  <div class="main">
    <!-- 系统提示信息 -->
    <div class="setting" v-for="(items,index) in list" :key="index">
      <h3 :class="items.order">{{items.h3}}</h3>
      <div class="plain">
        <span>Min</span>
        <input type="text" placeholder="请输入内容">
        <span class="max">Max</span>
        <input type="text" placeholder="请输入内容">
      </div>
      <!-- 修改，确认 -->
    </div>
    <div class="change">
      <el-button type="danger" ref="enter" @click="open" size="big" style="width: 100px;">修改</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Setting",
  data() {
    return {
      message: "确认",
      list: [
        { h3: "系统普通提示", order: "one" },
        { h3: "系统提示", order: "two" },
        { h3: "系统警告提示", order: "three" }
      ]
    };
  },
  methods: {
    open() {
      this.$confirm("此操作将修改设置, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "设置成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消设置"
          });
        });
    }
  }
};
</script>

<style scoped>
.main {
  text-align: center;
  overflow: hidden;
  padding: 20px 0 50px 20px;
}
/* 标题提示 */
h3 {
  width: 150px;
  height: 40px;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  font-weight: 700;
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
/* 输入框 */
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
.change > .el-button {
  margin-top: 50px;
}
</style>
