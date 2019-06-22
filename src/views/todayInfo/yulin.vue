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
      <el-table-column prop="id" width="120" align="center"></el-table-column>
      <el-table-column prop="param1" width="100" align="center"></el-table-column>
      <el-table-column prop="data1"></el-table-column>
      <el-table-column prop="param2" width="120" align="center"></el-table-column>
      <el-table-column prop="data2"></el-table-column>
      <el-table-column prop="param3" width="100" align="center"></el-table-column>
      <el-table-column prop="data3"></el-table-column>
      <el-table-column prop="param4" width="100" align="center"></el-table-column>
      <el-table-column prop="data4"></el-table-column>
      <el-table-column prop="param5" width="100" align="center"></el-table-column>
      <el-table-column prop="data5"></el-table-column>
    </el-table>

    <!-- 图形界面 -->
    <el-tabs type="border-card" style="width: 100%;">
      <el-tab-pane :label="items.name" v-for="(items,index) in list" :key="index">
        <div :id="items.name" :style="{width: '1200px',height: '500px'}"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import "@/assets/js/common.js";
import {genData} from '@/assets/js/echarts.js';
import { setInterval, clearInterval } from "timers";
export default {
  data() {
    return {
      tableData: [
        {
          id: "园林",
          param1: "空气温度:",
          data1: "",
          param2: "二氧化碳浓度:",
          data2: "",
          param3: "土壤温度:",
          data3: "",
          param4: "土壤盐分:",
          data4: "",
          param5: "氧气浓度:",
          data5: ""
        },
        {
          param1: "空气湿度:",
          data1: "",
          param2: "烟雾浓度:",
          data2: "",
          param3: "土壤湿度:",
          data3: "",
          param4: "土壤电导率:",
          data4: ""
        },
        {
          id: "鱼塘:",
          param1: "水温:",
          data1: "",
          param2: "浑浊度:",
          data2: ""
        }
      ],
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
          name: "烟雾浓度"
        },
        {
          name: "二氧化碳浓度"
        },
        {
          name: "土壤温度"
        },
        {
          name: "土壤湿度"
        },
        {
          name: "土壤盐分"
        },
        {
          name: "土壤电导率"
        },
        {
          name: "水温"
        },
        {
          name: "浑浊度"
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
    this.drawLine11();
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
    },
    // 空气温度
    drawLine() {
      // 图表的各项配置
      let option = {
        // 标题
        title: {
          text: "空气温度与时间的关系图",
          left: "center"
        },
        // 提示框
        tooltip: {
          trigger: "axis"
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
            data: []
          }
        ]
      };
      //  初始化 echarts 实例
      var myChart = this.$echarts.init(document.getElementById("空气温度"));
      //  使用刚指定的配置项和绘制图表，数据为 option
      myChart.setOption(option);

      //  数据加载完之前 显示一段简单 的 loading 动画
      myChart.showLoading();

      var dataX = []; // 实际存放 x 轴的 值
      var dataV = []; // 实际存放 y 轴的 值
      // 从服务器获取数据
      var time = new Date().format("yyyy-MM-dd hh:mm:ss");
      this.$axios
        .get("meteorological/tem?time=" + time)
        .then(res => {
          console.log(res);
          // 判断 是否从服务器中获取到了数据
          if (res) {
            for (var i = 0; i < res.data.length; i++) {
              // 拿到数据后 遍历拿到 对应的时间给 x 轴
              dataX.push(res.data[i].time.slice(11));
              // 拿到数据后， 遍历拿到对应的 温度 给 y 轴
              dataV.push(res.data[i].value);
            }
            // 隐藏加载动画
            myChart.hideLoading();
            // 加载数据图表
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

            // 实时更新（每四秒添加数据）
            let timeTicket;
            clearInterval(timeTicket);
            // 设置定时器，没四秒更新一次数据
            timeTicket = setInterval(function() {
              // 获取到图表的  option
              option = myChart.getOption();
              let arr = option.series[0].data;
              if (arr.length == 30) {
                arr.shift(); // 从队头删除数据
              }
              arr.push(Math.round(Math.random() * 5 + 25)); // 从对尾添加数据
              // 加载数据 图表
              myChart.setOption(option);
            }, 4000);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 空气湿度
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
    // 氧气浓度
    drawLine3() {
      let myChart = this.$echarts.init(document.getElementById("氧气浓度"));
      let option = {
        title: {
          text: "氧气浓度和时间的关系",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          // data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
          data: []
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              // { value: 335, name: "直接访问" },
              // { value: 310, name: "邮件营销" },
              // { value: 234, name: "联盟广告" },
              // { value: 135, name: "视频广告" },
              // { value: 1548, name: "搜索引擎" }
            ]
          }
        ]
      };
      myChart.setOption(option);

      //  数据加载完之前 显示一段简单 的 loading 动画
      myChart.showLoading();

      let dataLeg = []; // 实际存放参数代表
      let dataS = []; // 实际存放 时间和氧气浓度的值
      // 获取数据
      this.$axios
        .get("meteorological/tem")
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            // 获取氧气浓度值
            let value = Number(res.data[i].value);
            // 获取对应的时间
            let time = res.data[i].time.slice(11);
            // 隐藏加载动画
            myChart.hideLoading();
            // 将数据添加到 数组中
            dataLeg.push(time);
            dataS.push({ value: value, name: time });
          }
          // 绘制图表
          myChart.setOption({
            legend: {
              data: dataLeg
            },
            series: [
              {
                data: dataS
              }
            ]
          });
        })
        .catch(err => {
          console.log(err);
        });

      // 实时更新
      // let timeTicket;
      // clearInterval(timeTicket);
      // timeTicket=setInterval(function(){
      //   // 获取到图表 option
      //   option=myChart.getOption();
      //   //
      //   let legend=option.legend.data;
      //   let arr =option.series[0].data;
      //   if(arr.length){
      //     arr.shift();
      //     legend.shift();
      //   }
      //   arr.push(Math.round(Math.random*26+1));
      //   legend.push()
      //   // 重新绘制
      //   myChart.setOption(option);
      // },6000)
    },
    // 烟雾浓度
    drawLine4() {
      var myChart = this.$echarts.init(document.getElementById("烟雾浓度"));
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
      this.$axios.get("/meteorological/sp").then(res => {
        // 判断时候拿到后台数据，如果拿到，对数据进行处理
        if (res) {
          for (var i = 0; i < res.data.length; i++) {
            // 获取时间
            var time = res.data[i].time.slice(11).toString();

            dataX.push(time);
            // 获取到 对应时间的风速
            var value = res.data[i].value;
            dataL.push({ value: value, name: time });
            dataR.push({ value: value, name: time });
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
    // 二氧化碳浓度
    drawLine5() {
      var myChart = this.$echarts.init(document.getElementById("二氧化碳浓度"));
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
    // 土壤温度
    drawLine6() {
      // 图表的各项配置
      let option = {
        // 标题
        title: {
          text: "空气温度与时间的关系图",
          left: "center"
        },
        // 提示框
        tooltip: {
          trigger: "axis"
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
            data: []
          }
        ]
      };
      //  初始化 echarts 实例
      var myChart = this.$echarts.init(document.getElementById("土壤温度"));
      //  使用刚指定的配置项和绘制图表，数据为 option
      myChart.setOption(option);

      //  数据加载完之前 显示一段简单 的 loading 动画
      myChart.showLoading();

      var dataX = []; // 实际存放 x 轴的 值
      var dataV = []; // 实际存放 y 轴的 值
      // 从服务器获取数据
      var time = new Date().format("yyyy-MM-dd hh:mm:ss");
      this.$axios
        .get("meteorological/tem?time=" + time)
        .then(res => {
          console.log(res);
          // 判断 是否从服务器中获取到了数据
          if (res) {
            for (var i = 0; i < res.data.length; i++) {
              // 拿到数据后 遍历拿到 对应的时间给 x 轴
              dataX.push(res.data[i].time.slice(11));
              // 拿到数据后， 遍历拿到对应的 温度 给 y 轴
              dataV.push(res.data[i].value);
            }
            // 隐藏加载动画
            myChart.hideLoading();
            // 加载数据图表
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

            // 实时更新（每四秒添加数据）
            let timeTicket;
            clearInterval(timeTicket);
            // 设置定时器，没四秒更新一次数据
            timeTicket = setInterval(function() {
              // 获取到图表的  option
              option = myChart.getOption();
              let arr = option.series[0].data;
              if (arr.length == 30) {
                arr.shift(); // 从队头删除数据
              }
              arr.push(Math.round(Math.random() * 5 + 25)); // 从对尾添加数据
              // 加载数据 图表
              myChart.setOption(option);
            }, 4000);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 土壤湿度
    drawLine7() {
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
    // 土壤盐分
    drawLine8() {
      var myChart = this.$echarts.init(document.getElementById("土壤盐分"));
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
    // 土壤电导率
    drawLine9() {
      var data = genData(50);
      let option = {
        title: {
          text: "土壤电导率和时间的关系图",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          top: 20,
          bottom: 20,
          data: data.legendData,
          selected: data.selected
        },
        series: [
          {
            name: "姓名",
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            data: data.seriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      var myChart = this.$echarts.init(document.getElementById("土壤电导率"));
      myChart.setOption(option);
    },
    // 水温
    drawLine10() {
      var myChart = this.$echarts.init(document.getElementById("水温"));
      let option = {
        title: {
          text: "光照强度与时间的关系",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}"
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
      };
      myChart.setOption(option);
      var dataX = [];
      var dataY = [];
      // 获取服务器返回数据
      this.$axios.get("meteorological/illum").then(res => {
        if (res) {
          console.log(res.data);
          // 循环遍历 获取到 返回数据中的 时间和 光照强度
          for (var i = 0; i < res.data.length; i++) {
            console.log(res.data[i].time);
            dataX.push(res.data[i].time.slice(11));
            dataY.push(res.data[i].value);
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

          // 实时更新（每四秒添加数据）
          let timeTicket;
          clearInterval(timeTicket);
          // 设置定时器，没四秒更新一次数据
          timeTicket = setInterval(function() {
            // 获取到图表的  option
            option = myChart.getOption();
            let arr = option.series[0].data;
            if (arr.length == 30) {
              arr.shift(); // 从队头删除数据
            }
            arr.push(Math.round(Math.random() * 200 + 500)); // 从对尾添加数据
            // 加载数据 图表
            myChart.setOption(option);
          }, 4000);
        }
      });
    },
    // 浑浊度
    drawLine11() {
      var myChart = this.$echarts.init(document.getElementById("浑浊度"));
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