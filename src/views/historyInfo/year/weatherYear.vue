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
      <el-button type="danger" class="query" @click="handle">查询</el-button>
    </el-row>
    <!-- <Year></Year> -->
    <el-tabs type="border-card" style="width: 100%;">
      <el-tab-pane :label="items.name" v-for="(items,index) in list" :key="index">
        {{items.name}}
        <div :id="items.name" :style="{width: '800px',height: '500px'}"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import Year from '@/views/historyInfo/year'
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
  // components: {
  //   Year
  // },
  mounted() {
    this.drawLine();
  },
  methods: {
    handle() {
      this.$store.dispatch("handleValue", this.value.toString().split(" ")[3]);
      console.log(this.$store.getters.getStateValue + "年内气温变化");
    },
    drawLine() {
       for (var i = 0; i < this.list.length; i++) {
            var myChart = this.$echarts.init(
              document.getElementById(this.list[i].name)
            );
            myChart.setOption({
              title: {
                // text: this.$store.getters.getStateValue + "年内"+this.list[i].name+"变化"
                text: this.value + "年内" + this.list[i].name + "变化"
              },
              tooltip: {
                trigger: "axis"
              },
              legend: {
                data: ["最高气温", "最低气温"]
              },
              toolbox: {
                show: true,
                feature: {
                  mark: { show: true },
                  dataView: { show: true, readOnly: false },
                  magicType: { show: true, type: ["line", "bar"] },
                  restore: { show: true },
                  saveAsImage: { show: true }
                }
              },
              calculable: true,
              xAxis: [
                {
                  type: "category",
                  boundaryGap: false,
                  data: [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12"
                  ]
                }
              ],
              yAxis: [
                {
                  type: "value",
                  axisLabel: {
                    formatter: "{value} °C"
                  }
                }
              ],
              series: [
                {
                  name: "最高气温",
                  type: "line",
                  data: [
                    11,
                    9,
                    15,
                    13,
                    12,
                    13,
                    10,
                    32,
                    16,
                    18,
                    19,
                    29
                  ],
                  markPoint: {
                    data: [
                      { type: "max", name: "最大值" },
                      { type: "min", name: "最小值" }
                    ]
                  },
                  markLine: {
                    data: [{ type: "average", name: "平均值" }]
                  }
                },
                {
                  name: "最低气温",
                  type: "line",
                  data: [1, -2, 2, 5, 3, 2, 0, 5, 2, 6, -1, -2],
                  markPoint: {
                    data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }]
                  },
                  markLine: {
                    data: [{ type: "average", name: "平均值" }]
                  }
                }
              ]
            });
          }
      // this.$axios
      //   .get("http://10.168.14.55:8080//meteorological/atm")
      //   .then(res => {
      //     console.log(res.data);
      //   });
    }
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

