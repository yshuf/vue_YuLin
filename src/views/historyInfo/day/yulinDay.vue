<template>
  <div class="day">
    <el-row class="dayQuery">
      <el-button type="primary">
        时间
        <strong>:</strong>
      </el-button>
      <el-date-picker
        v-model="value"
        type="year"
        placeholder="选择年"
        style="width: 120px;margin-left: 10px;"
      ></el-date-picker>
      <span class="demonstration">年</span>
      <el-date-picker
        v-model="value"
        type="month"
        placeholder="选择月"
        style="width: 120px;margin-left: 10px;"
      ></el-date-picker>
      <span class="demonstration">月</span>
    <el-date-picker
        v-model="value"
        type="date"
        placeholder="选择日"
        style="width: 150px;margin-left: 10px;"
      ></el-date-picker>
      <span class="demonstration">日</span>
      <el-button type="danger" class="query">查询</el-button>
    </el-row>
    <Day></Day>
  </div>
</template>

<script>
import Day from "@/views/historyInfo/day/dayY"
export default {
  data() {
    return {
      value: ""
    };
  },
  components: {
    Day 
  }
};
</script>

<style scoped>
.day {
  text-align: center;
  width: 100%;
  height: 100%;
}
.query {
  margin-left: 50px;
}
.dayQuery {
  margin-top: -10px;
  margin-bottom: 10px;
  min-width: 960px;
}
</style>

