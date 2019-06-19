<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-top:-60px;margin-bottom:20px;"
      :row-class-name="tableRowClassName"
      align="center"
      border
      stripe
      highlight-current-row
    >
      <el-table-column prop="date" width="180"></el-table-column>
      <el-table-column prop="name" width="180"></el-table-column>
      <el-table-column prop="data1" width="180"></el-table-column>
      <el-table-column prop="data2" width="180"></el-table-column>
      <el-table-column prop="data3" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "空气温度: 27.1℃",
          name: "空气湿度: 62.6%RH",
          data1: "氧气浓度: 21.2 %",
          data2: "降雨量: 0.0mm",
          data3: "土壤温度: 27.1℃"
        },
        {
          date: "土壤湿度: 62.9%RH",
          name: "风速: 0.0m/s",
          data1: "风向: 180°",
          data2: "大气压强: 995hPa",
          data3: "光照强度: 220.0Lux"
        }
      ]
    }
  },
  methods:{
      tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    }
  }

};
</script>

<style scoped>
</style>
