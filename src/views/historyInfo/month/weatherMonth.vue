<template>
  <div class="month">
    <el-row class="monthQuery">
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
      <el-button type="danger" class="query">查询</el-button>
    </el-row>
    <Month></Month>
  </div>
</template>

<script>
import Month from "@/views/historyInfo/month";
import Year from "@/views/historyInfo/year";
export default {
  data() {
    return {
      value: ""
    };
  },
  components: {
    Month,
    Year
  }
};
</script>

<style scoped>
.month {
  text-align: center;
}
.query {
  margin-left: 50px;
}
.monthQuery {
  margin-top: -10px;
  margin-bottom: 10px;
}
</style>

