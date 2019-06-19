<template>
  <div>
    <!-- 数据表格 -->
    <Table></Table>

    <!-- 图形界面 -->
    <el-tabs type="border-card" style="width: 100%;">
      <el-tab-pane :label="items.name" v-for="(items,index) in list" :key="index">
        <!-- {{items.name}} -->
        <div :id="items.name" :style="{width: '1200px',height: '500px'}"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Table from "./table";
export default {
  name: "weather",
  components: {
    Table
  },
  data() {
    return {
      data: [],
      list: [
        {
          name: "空气温度"
        },
        {
          name: "空气湿度"
        },
        {
          name: "氧气浓度"
        },
        {
          name: "降雨量"
        },
        {
          name: "土壤温度"
        },
        {
          name: "土壤湿度"
        },
        {
          name: "风速"
        },
        {
          name: "风向"
        },
        {
          name: "大气压强"
        },
        {
          name: "光照强度"
        }
      ]
    };
  },
  mounted() {
    this.drawLine();
    this.drawLine2();
    this.drawLine3();
    this.drawLine4();
    this.drawLine5();
    this.drawLine6();
    this.drawLine7();
    this.drawLine8();
    this.drawLine9();
    this.drawLine10();
  },
  methods: {
    drawLine() {
      //  初始化 echarts 实例
      var myChart = this.$echarts.init(document.getElementById("空气温度"));
      //  使用刚指定的配置项和绘制图表，数据为 this.option
      myChart.setOption({
        title: {
          text: "未来24个小时内气温变化"
        },
        // 提示框
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["最高气温", "最低气温"]
        },
        // 是否显示工具栏组件
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false }, // 数据视图工具，可以展示当前图表所用的数据，编辑后可以动态更新
            magicType: { show: true, type: ["line", "bar"] }, // 动态类型切换
            restore: { show: true }, // 重置
            saveAsImage: { show: true } // 保存图片
          }
        },
        calculable: true,
        // x 轴 表示
        xAxis: {
          data: []
        },
        // y 轴 表示
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} °C"
            }
          }
        ],
        series: [
          // 最高温
          {
            name: "当前气温",
            type: "line",
            data: [],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      });

      var dataX = []; // 实际存放 x 轴的 值
      var dataV = []; // 实际存放 y 轴的 值
      // 从服务器获取数据
      this.$axios
        .get("http://10.168.14.55:8080/meteorological/tem")
        .then(res => {
          // 判断 是否从服务器中获取到了数据
          if (res) {
            for (var i = 0; i < res.data.length; i++) {
              // 拿到数据后 遍历拿到 对应的时间给 x 轴
              dataX.push(res.data[i].time.slice(11));
              // 拿到数据后， 遍历拿到对应的 温度 给 y 轴
              dataV.push(res.data[i].name);
            }
            // 二次 绘图把 时间和 温度 添加进 图表中
            myChart.setOption({
              xAxis: {
                data: dataX
              },
              series: [
                {
                  data: dataV
                }
              ]
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
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
    },
    drawLine3() {
      var myCharts = this.$echarts.init(document.getElementById("氧气浓度"));
      myCharts.setOption({
        title: {
          text: '氧气浓度和时间的关系',
          left: 'center'
        },
        xAxis: {
          scale: true
        },
        yAxis: {
          scale: true
        },
        series: [
          {
            type: "scatter",
            data: [
              [161.2, 51.6],
              [167.5, 59.0],
              [159.5, 49.2],
              [157.0, 63.0],
              [155.8, 53.6],
              [170.0, 59.0],
              [159.1, 47.6],
              [166.0, 69.8],
              [176.2, 66.8],
              [160.2, 75.2],
              [172.5, 55.2],
              [170.9, 54.2],
              [172.9, 62.5],
              [153.4, 42.0],
              [160.0, 50.0],
              [147.2, 49.8],
              [168.2, 49.2],
              [175.0, 73.2],
              [157.0, 47.8],
              [167.6, 68.8],
              [159.5, 50.6],
              [175.0, 82.5],
              [166.8, 57.2],
              [176.5, 87.8],
              [170.2, 72.8],
              [174.0, 54.5],
              [173.0, 59.8],
              [179.9, 67.3],
              [170.5, 67.8],
              [160.0, 47.0],
              [154.4, 46.2],
              [162.0, 55.0],
              [176.5, 83.0],
              [160.0, 54.4],
              [152.0, 45.8],
              [162.1, 53.6],
              [170.0, 73.2],
              [160.2, 52.1],
              [161.3, 67.9],
              [166.4, 56.6],
              [168.9, 62.3],
              [163.8, 58.5],
              [167.6, 54.5],
              [160.0, 50.2],
              [161.3, 60.3],
              [167.6, 58.3],
              [165.1, 56.2],
              [160.0, 50.2],
              [170.0, 72.9],
              [157.5, 59.8],
              [167.6, 61.0],
              [160.7, 69.1],
              [163.2, 55.9],
              [152.4, 46.5],
              [157.5, 54.3],
              [168.3, 54.8],
              [180.3, 60.7],
              [165.5, 60.0],
              [165.0, 62.0],
              [164.5, 60.3],
              [156.0, 52.7],
              [160.0, 74.3],
              [163.0, 62.0],
              [165.7, 73.1],
              [161.0, 80.0],
              [162.0, 54.7],
              [166.0, 53.2],
              [174.0, 75.7],
              [172.7, 61.1],
              [167.6, 55.7],
              [151.1, 48.7],
              [164.5, 52.3],
              [163.5, 50.0],
              [152.0, 59.3],
              [169.0, 62.5],
              [164.0, 55.7],
              [161.2, 54.8],
              [155.0, 45.9],
              [170.0, 70.6],
              [176.2, 67.2],
              [170.0, 69.4],
              [162.5, 58.2],
              [170.3, 64.8],
              [164.1, 71.6],
              [169.5, 52.8],
              [163.2, 59.8],
              [154.5, 49.0],
              [159.8, 50.0],
              [173.2, 69.2],
              [170.0, 55.9],
              [161.4, 63.4],
              [169.0, 58.2],
              [166.2, 58.6],
              [159.4, 45.7],
              [162.5, 52.2],
              [159.0, 48.6],
              [162.8, 57.8],
              [159.0, 55.6],
              [179.8, 66.8],
              [162.9, 59.4],
              [161.0, 53.6],
              [151.1, 73.2],
              [168.2, 53.4],
              [168.9, 69.0],
              [173.2, 58.4],
              [171.8, 56.2],
              [178.0, 70.6],
              [164.3, 59.8],
              [163.0, 72.0],
              [168.5, 65.2],
              [166.8, 56.6],
              [172.7, 105.2],
              [163.5, 51.8],
              [169.4, 63.4],
              [167.8, 59.0],
              [159.5, 47.6],
              [167.6, 63.0],
              [161.2, 55.2],
              [160.0, 45.0],
              [163.2, 54.0],
              [162.2, 50.2],
              [161.3, 60.2],
              [149.5, 44.8],
              [157.5, 58.8],
              [163.2, 56.4],
              [172.7, 62.0],
              [155.0, 49.2],
              [156.5, 67.2],
              [164.0, 53.8],
              [160.9, 54.4],
              [162.8, 58.0],
              [167.0, 59.8],
              [160.0, 54.8],
              [160.0, 43.2],
              [168.9, 60.5],
              [158.2, 46.4],
              [156.0, 64.4],
              [160.0, 48.8],
              [167.1, 62.2],
              [158.0, 55.5],
              [167.6, 57.8],
              [156.0, 54.6],
              [162.1, 59.2],
              [173.4, 52.7],
              [159.8, 53.2],
              [170.5, 64.5],
              [159.2, 51.8],
              [157.5, 56.0],
              [161.3, 63.6],
              [162.6, 63.2],
              [160.0, 59.5],
              [168.9, 56.8],
              [165.1, 64.1],
              [162.6, 50.0],
              [165.1, 72.3],
              [166.4, 55.0],
              [160.0, 55.9],
              [152.4, 60.4],
              [170.2, 69.1],
              [162.6, 84.5],
              [170.2, 55.9],
              [158.8, 55.5],
              [172.7, 69.5],
              [167.6, 76.4],
              [162.6, 61.4],
              [167.6, 65.9],
              [156.2, 58.6],
              [175.2, 66.8],
              [172.1, 56.6],
              [162.6, 58.6],
              [160.0, 55.9],
              [165.1, 59.1],
              [182.9, 81.8],
              [166.4, 70.7],
              [165.1, 56.8],
              [177.8, 60.0],
              [165.1, 58.2],
              [175.3, 72.7],
              [154.9, 54.1],
              [158.8, 49.1],
              [172.7, 75.9],
              [168.9, 55.0],
              [161.3, 57.3],
              [167.6, 55.0],
              [165.1, 65.5],
              [175.3, 65.5],
              [157.5, 48.6],
              [163.8, 58.6],
              [167.6, 63.6],
              [165.1, 55.2],
              [165.1, 62.7],
              [168.9, 56.6],
              [162.6, 53.9],
              [164.5, 63.2],
              [176.5, 73.6],
              [168.9, 62.0],
              [175.3, 63.6],
              [159.4, 53.2],
              [160.0, 53.4],
              [170.2, 55.0],
              [162.6, 70.5],
              [167.6, 54.5],
              [162.6, 54.5],
              [160.7, 55.9],
              [160.0, 59.0],
              [157.5, 63.6],
              [162.6, 54.5],
              [152.4, 47.3],
              [170.2, 67.7],
              [165.1, 80.9],
              [172.7, 70.5],
              [165.1, 60.9],
              [170.2, 63.6],
              [170.2, 54.5],
              [170.2, 59.1],
              [161.3, 70.5],
              [167.6, 52.7],
              [167.6, 62.7],
              [165.1, 86.3],
              [162.6, 66.4],
              [152.4, 67.3],
              [168.9, 63.0],
              [170.2, 73.6],
              [175.2, 62.3],
              [175.2, 57.7],
              [160.0, 55.4],
              [165.1, 104.1],
              [174.0, 55.5],
              [170.2, 77.3],
              [160.0, 80.5],
              [167.6, 64.5],
              [167.6, 72.3],
              [167.6, 61.4],
              [154.9, 58.2],
              [162.6, 81.8],
              [175.3, 63.6],
              [171.4, 53.4],
              [157.5, 54.5],
              [165.1, 53.6],
              [160.0, 60.0],
              [174.0, 73.6],
              [162.6, 61.4],
              [174.0, 55.5],
              [162.6, 63.6],
              [161.3, 60.9],
              [156.2, 60.0],
              [149.9, 46.8],
              [169.5, 57.3],
              [160.0, 64.1],
              [175.3, 63.6],
              [169.5, 67.3],
              [160.0, 75.5],
              [172.7, 68.2],
              [162.6, 61.4],
              [157.5, 76.8],
              [176.5, 71.8],
              [164.4, 55.5],
              [160.7, 48.6],
              [174.0, 66.4],
              [163.8, 67.3]
            ]
          }
        ]
      });

      // var dataXY = []; // 实际存放 x 轴, 和y轴 的数据
      // // 获取数据
      // this.$axios
      //   .get("http://10.168.14.55:8080/meteorological/ox")
      //   .then(res => {
      //     if (res) {
      //       // 循环遍历 拿到时间值
      //       for (var i = 0; i < res.data.length; i++) {
      //         var dataE = res.data[i]; // 拿到 数据中的每一项
      //         var x = dataE.time.slice(11);
      //         var y = parseFloat(dataE.name);
      //         dataXY.push([x, y]); 
      //         console.log(typeof x);
      //         console.log(typeof y);
      //       }
      //       console.log(dataXY[0]);
      //       myCharts.setOption({
      //         series: [
      //           {
      //             type: "scatter",
      //             data: dataXY
      //           }
      //         ]
      //       });
      //     }
      //   });
    },
    drawLine4() {
      var myChart = this.$echarts.init(document.getElementById("降雨量"));
      var colors = ["#5793f3", "#d14a61", "#675bba"];
      myChart.setOption({
        color: colors,
        title: {
          text: "两年内降雨量分布"
        },
        tooltip: {
          trigger: "none",
          axisPointer: {
            type: "cross"
          }
        },
        legend: {
          data: ["2015 降雨量", "2016 降雨量"]
        },
        grid: {
          top: 70,
          bottom: 50
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[1]
              }
            },
            axisPointer: {
              label: {
                formatter: function(params) {
                  return (
                    "降雨量  " +
                    params.value +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data
                      : "")
                  );
                }
              }
            },
            data: [
              "2016-1",
              "2016-2",
              "2016-3",
              "2016-4",
              "2016-5",
              "2016-6",
              "2016-7",
              "2016-8",
              "2016-9",
              "2016-10",
              "2016-11",
              "2016-12"
            ]
          },
          {
            type: "category",
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[0]
              }
            },
            axisPointer: {
              label: {
                formatter: function(params) {
                  return (
                    "降雨量  " +
                    params.value +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data
                      : "")
                  );
                }
              }
            },
            data: [
              "2015-1",
              "2015-2",
              "2015-3",
              "2015-4",
              "2015-5",
              "2015-6",
              "2015-7",
              "2015-8",
              "2015-9",
              "2015-10",
              "2015-11",
              "2015-12"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "2015 降雨量",
            type: "line",
            xAxisIndex: 1,
            smooth: true,
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ]
          },
          {
            name: "2016 降雨量",
            type: "line",
            smooth: true,
            data: [
              3.9,
              5.9,
              11.1,
              18.7,
              48.3,
              69.2,
              231.6,
              46.6,
              55.4,
              18.4,
              10.3,
              0.7
            ]
          }
        ]
      });
    },
    drawLine5() {
      var myChart = this.$echarts.init(document.getElementById("土壤温度"));
      var colors = ["#5793f3", "#d14a61", "#675bba"];
      myChart.setOption({
        color: colors,
        title: {
          text: "两年内降雨量分布"
          // subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "none",
          axisPointer: {
            type: "cross"
          }
        },
        legend: {
          data: ["2015 降水量", "2016 降水量"]
        },
        grid: {
          top: 70,
          bottom: 50
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[1]
              }
            },
            axisPointer: {
              label: {
                formatter: function(params) {
                  return (
                    "降水量  " +
                    params.value +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data
                      : "")
                  );
                }
              }
            },
            data: [
              "2016-1",
              "2016-2",
              "2016-3",
              "2016-4",
              "2016-5",
              "2016-6",
              "2016-7",
              "2016-8",
              "2016-9",
              "2016-10",
              "2016-11",
              "2016-12"
            ]
          },
          {
            type: "category",
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[0]
              }
            },
            axisPointer: {
              label: {
                formatter: function(params) {
                  return (
                    "降水量  " +
                    params.value +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data
                      : "")
                  );
                }
              }
            },
            data: [
              "2015-1",
              "2015-2",
              "2015-3",
              "2015-4",
              "2015-5",
              "2015-6",
              "2015-7",
              "2015-8",
              "2015-9",
              "2015-10",
              "2015-11",
              "2015-12"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "2015 降水量",
            type: "line",
            xAxisIndex: 1,
            smooth: true,
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ]
          },
          {
            name: "2016 降水量",
            type: "line",
            smooth: true,
            data: [
              3.9,
              5.9,
              11.1,
              18.7,
              48.3,
              69.2,
              231.6,
              46.6,
              55.4,
              18.4,
              10.3,
              0.7
            ]
          }
        ]
      });
    },
    drawLine6() {
      var myChart = this.$echarts.init(document.getElementById("土壤湿度"));
      myChart.setOption({
        title: {
          text: "未来12个小时内气温变化"
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
    },
    drawLine7() {
      var myChart = this.$echarts.init(document.getElementById("风速"));
      myChart.setOption({
        title: {
          text: "风速与时间关系图",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          x: "center",
          y: "bottom",
          data: []
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: "半径模式",
            type: "pie",
            radius: [20, 110],
            center: ["25%", "50%"],
            roseType: "radius",
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: []
          },
          {
            name: "面积模式",
            type: "pie",
            radius: [30, 110],
            center: ["75%", "50%"],
            roseType: "area",
            data: []
          }
        ]
      });

      var dataX = []; // 实际存放时间数组
      var dataL = []; // 实际存放左侧半径模式
      var dataR = []; // 实际存放右侧面积模式数据
      // 从后台获取数据
      this.$axios
        .get("http://10.168.14.55:8080/meteorological/sp")
        .then(res => {
          // 判断时候拿到后台数据，如果拿到，对数据进行处理
          if (res) {
            for (var i = 0; i < res.data.length; i++) {
              // 获取时间
              var time = res.data[i].time.slice(11).toString();

              dataX.push(time);
              // 获取到 对应时间的风速
              var value = res.data[i].name;
              dataL.push({value: value, name: time });
              dataR.push({value: value, name: time });
            }
            // 二次 绘图
            myChart.setOption({
              legend: {
                x: "center",
                y: "bottom",
                data: dataX
              },
              series: [
                {
                  name: "半径模式",
                  type: "pie",
                  radius: [20, 110],
                  center: ["25%", "50%"],
                  roseType: "radius",
                  label: {
                    normal: {
                      show: false
                    },
                    emphasis: {
                      show: true
                    }
                  },
                  lableLine: {
                    normal: {
                      show: false
                    },
                    emphasis: {
                      show: true
                    }
                  },
                  data: dataL
                },
                {
                  name: "面积模式",
                  type: "pie",
                  radius: [30, 110],
                  center: ["75%", "50%"],
                  roseType: "area",
                  data: dataR
                }
              ]
            });
          }
        });
    },
    drawLine8() {
      var myChart = this.$echarts.init(document.getElementById("风向"));
      myChart.setOption({
        title: {
          text: "折线图堆叠"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
    },
    drawLine9() {
      var myChart = this.$echarts.init(document.getElementById("大气压强"));
      myChart.setOption({
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
    },
    drawLine10() {
      var myChart = this.$echarts.init(document.getElementById("光照强度"));
      myChart.setOption({
        title: {
          text: "光照强度与时间的关系",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}"
        },
        legend: {
          left: "left",
          data: ["2的指数", "3的指数"]
        },
        xAxis: {
          type: "category",
          name: "x",
          splitLine: { show: false },
          data: []
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} Lux"
          }
        },
        series: [
          {
            name: "光照强度",
            type: "line",
            data: []
          }
        ]
      });
      var dataX = [];
      var dataY = [];
      // 获取服务器返回数据
      this.$axios
        .get("http://10.168.14.55:8080/meteorological/illum")
        .then(res => {
          if (res) {
            // 循环遍历 获取到 返回数据中的 时间和 光照强度
            for (var i = 0; i < res.data.length; i++) {
              dataX.push(res.data[i].time.slice(11));
              dataY.push(res.data[i].name);
            }
            myChart.setOption({
              xAxis: {
                data: dataX
              },
              series: {
                name: "光照强度",
                type: "line",
                data: dataY
              }
            });
          }
        });
    },
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
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #97d377;
}
</style>