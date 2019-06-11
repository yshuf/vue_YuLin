<template>
  <div>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      stripe
      style="width: 100%; margin-top: -60px;"
      highlight-current-row
    >
      <el-table-column prop="id"  width="180" align="center"></el-table-column>
      <el-table-column prop="name"></el-table-column>
      <el-table-column prop="amount1"></el-table-column>
      <el-table-column prop="amount2"></el-table-column>
      <el-table-column prop="amount3"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
   data() {
      return {
        tableData: [{
          id: '园林',
          name: '空气温度',
          amount1: '土壤温度',
          amount2: '二氧化碳浓度',
          amount3: '烟雾'
        }, {
          id: '12987123',
          name: '空气湿度',
          amount1: '土壤湿度',
          amount2: '土壤盐分',
        }, {
          id: '鱼塘',
          name: '水温',
          amount1: '浑浊度',
          amount2: '电导率',
        }]
      }
   },
    methods: {
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex % 2 === 0) {
          if (columnIndex === 0) {
            return [1, 2];
          } else if (columnIndex === 1) {
            return [0, 0];
          }
        }
      },

      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    }
};
</script>

<style scoped>
</style>