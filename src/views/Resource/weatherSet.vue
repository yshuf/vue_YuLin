<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="空气温度" name="first">
        <setting></setting>
      </el-tab-pane>
      <el-tab-pane label="空气湿度" name="second">
        <setting></setting>
      </el-tab-pane>
      <el-tab-pane label="氧气浓度" name="thrith">
        <setting></setting>
      </el-tab-pane>
      <el-tab-pane label="降雨量" name="fourth">
        <setting></setting>
      </el-tab-pane>
      <el-tab-pane label="土壤温度" name="fifth">
        <setting></setting>
      </el-tab-pane>
      <el-tab-pane label="土壤温度" name="sixth">
        <setting></setting>
      </el-tab-pane>
      <el-tab-pane label="风速" name="seventh">
        <setting></setting>
      </el-tab-pane>
      <el-tab-pane label="风向" name="eightth">
        <setting></setting>
      </el-tab-pane>
      <el-tab-pane label="大气压强" name="ninth">
        <setting></setting>
      </el-tab-pane>
      <el-tab-pane label="光照强度" name="tenth">
        <setting></setting>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Setting from "@/views/Resource/setting";
export default {
  name: "set",
  components: {
    Setting
  },
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style scoped>

</style>
