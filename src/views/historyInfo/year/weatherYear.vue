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
      <el-button type="danger" class="query" @click="query()">查询</el-button>
    </el-row>
    <Year></Year>
  </div>
</template>

<script>
import Year from '@/views/historyInfo/year/year'
export default {
  data() {
    return {
      value: "",
      list: [
        {
          name: "空气温度",
          address: "http://10.168.14.55:8080//meteorological/atm"
        },
        {
          name: "空气湿度",
          address: "http://10.168.14.55:8080//meteorological/atm"
        },
        {
          name: "氧气浓度"
        },
        {
          name: "降雨量",
          address: "http://localhost:8080/meteorological/rain"
        },
        {
          name: "土壤温度"
        },
        {
          name: "土壤湿度"
        },
        {
          name: "风速",
          address: "http://localhost:8080/meteorological/sp"
        },
        {
          name: "风向",
          address: "http://localhost:8080/meteorological/dir"
        },
        {
          name: "大气压强"
        },
        {
          name: "光照强度",
          address: "http://localhost:8080/meteorological/illum"
        }
      ]
    };
  },
  components: {
    Year
  },
  motheds: {
    // query(){

    // }
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

