<template>
  <div class="data">
    <el-table :data="tableData" height="250" border style="width: 50%;">
      <el-table-column prop="max" label="最高" align="center"></el-table-column>
      <el-table-column prop="min" label="最低" align="center"></el-table-column>
      <el-table-column prop="middle" label="中位数" align="center"></el-table-column>
      <el-table-column prop="mode" label="众数" align="center"></el-table-column>
      <el-table-column prop="variance" label="方差" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          max: "32",
          min: "-5",
          middle: "16",
          mode: "17",
          variance: "2.1"
        }
      ]
    };
  }
};
</script>

<style scoped>
.data {
  margin-top: 10px;
  margin-left: 350px;
}
.el-breadcrumb__inner.is-link{
  color: red!important;
  font-weight: 700;
  font-size: 50px;
}
</style>
