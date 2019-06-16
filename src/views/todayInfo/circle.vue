<template>
  <div>
    <div id="空气湿度" :style="{width: '800px',height: '500px'}" v-if="flag1"></div>
    <!-- <div> {{flag1}}</div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["flag1"],
  mounted: function() {
    this.drawLine2();
  },
  watch: {
    // that: this,
    flag1: () => {
      //箭头函数  不然会发生this改变
      this.drawLine2();
      console.log("hello");
    }
  },
  methods: {
    drawLine2() {
      var myChart = this.$echarts.init(document.getElementById("空气湿度"));
      myChart.setOption({
        title: {
          text: "未来24个小时内气温变化"
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
            data: [11, 11, 15, 13, 12, 13, 10, 32, 16, 18, 19, 29],
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
  }
};
</script>