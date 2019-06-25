<template>
  <div class="year">
    <el-row class="yearQuery">
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
      <el-button type="danger" class="query">查询</el-button>
    </el-row>
    <Year></Year>
  </div>
</template>

<script>
import Year from '@/views/historyInfo/year/yearY'
export default {
  data() {
    return {
      value: ""
    };
  },
  components: {
    Year
  }
};
</script>

<style scoped>
.year {
  text-align: center;
}
.query {
  margin-left: 50px;
}
.yearQuery {
  margin-bottom: 10px;
}
</style>

