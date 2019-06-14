<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="空气温度" name="first" align="center">
        <span class="setting">空气温度设置</span>
        <setting></setting>
      </el-tab-pane>
      <el-tab-pane label="空气湿度" name="second" align="center">
        <span class="setting">空气湿度设置</span>
        <setting></setting>
      </el-tab-pane>
      <el-tab-pane label="氧气浓度" name="thrith" align="center">
        <span class="setting">氧气浓度设置</span>

        <setting></setting>
      </el-tab-pane>
      <el-tab-pane label="降雨量" name="fourth" align="center">
        <span class="setting">降雨量设置</span>

        <setting></setting>
      </el-tab-pane>
      <el-tab-pane label="土壤温度" name="fifth" align="center">
        <span class="setting">土壤温度设置</span>

        <setting></setting>
      </el-tab-pane>
      <el-tab-pane label="土壤湿度" name="sixth" align="center">
        <span class="setting">土壤湿度设置</span>

        <setting></setting>
      </el-tab-pane>
      <el-tab-pane label="风速" name="seventh" align="center">
        <span class="setting">风速设置</span>

        <setting></setting>
      </el-tab-pane>
      <el-tab-pane label="风向" name="eightth" align="center">
        <span class="setting">风向设置</span>

        <setting></setting>
      </el-tab-pane>
      <el-tab-pane label="大气压强" name="ninth" align="center">
        <span class="setting">大气压强设置</span>

        <setting></setting>
      </el-tab-pane>
      <el-tab-pane label="光照强度" name="tenth" align="center">
        <span class="setting">光照强度设置</span>

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
.setting {
  font-weight: 700;
  font-family: "Courier New", Courier, monospace;
}
</style>
