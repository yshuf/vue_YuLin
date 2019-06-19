<template>
  <div class="month">
    <el-tabs type="border-card" style="width: 100%;">
      <el-tab-pane :label="items.name" v-for="(items,index) in list" :key="index">
        {{items.name}}
        <div :id="items.name" :style="{width: '800px',height: '500px'}"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
          address:　"http://localhost:8080/meteorological/sp"
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
      ],
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      this.$axios
        .get("http://10.168.14.55:8080//meteorological/atm")
        .then(res => {
          console.log(res.data);
          for (var i = 0; i < this.list.length; i++) {
            var myChart = this.$echarts.init(
              document.getElementById(this.list[i].name)
            );
            myChart.setOption({
              title: {
                text: this.$store.getters.getStateValue + "年内"+this.list[i].name+"变化"
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
                    res.data[0],
                    res.data[1],
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
        });
    }
  }
};
</script>

<style scoped>
</style>