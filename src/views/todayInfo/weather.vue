<template>
  <div class="weather">
    <!-- 数据实时展示表格 -->
    <el-table
      :data="tableData"
      style="width: 100%;margin-top:-60px;margin-bottom:20px;"
      :row-class-name="tableRowClassName"
      align="center"
      border
      stripe
      highlight-current-row
    >
      <el-table-column prop="param1" width="100" align="center"></el-table-column>
      <el-table-column prop="data1" width="100"></el-table-column>
      <el-table-column prop="param2" width="100" align="center"></el-table-column>
      <el-table-column prop="data2" width="100"></el-table-column>
      <el-table-column prop="param3" width="100" align="center"></el-table-column>
      <el-table-column prop="data3" width="100"></el-table-column>
      <el-table-column prop="param4" width="100" align="center"></el-table-column>
      <el-table-column prop="data4" width="100"></el-table-column>
      <el-table-column prop="param5" width="100" align="center"></el-table-column>
      <el-table-column prop="data5" width="100"></el-table-column>
    </el-table>

    <!-- 图形界面 -->
    <el-tabs type="border-card" style="width: 100%;">
      <el-tab-pane :label="items.name" v-for="(items,index) in list" :key="index">
        <div :id="items.name" :style="{width: '1000px',height: '500px'}"></div>
        <!-- 刷新按钮 -->
        <el-button type="warning" class="animated fadeInRight" @click="refresh">立即刷新</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import "@/assets/js/common.js";
import "@/assets/js/common.js";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { setInterval, clearInterval, clearTimeout } from "timers";
export default {
  name: "weather",
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
          name: "大气压强"
        },
        {
          name: "风向/风速"
        },
        {
          name: "光照强度"
        }
      ],
      tableData: [
        {
          param1: "空气温度:",
          ktem1: "",
          param2: "空气湿度:",
          hum1: "",
          param3: "氧气浓度:",
          data3: "",
          param4: "土壤温度:",
          data4: "",
          param5: "降雨量:",
          data5: ""
        },
        {
          param1: "土壤湿度",
          data1: "",
          param2: "风速:",
          data2: "",
          param3: "风向:",
          data3: "",
          param4: "大气压强:",
          data4: "",
          param5: "光照强度:",
          data5: ""
        }
      ],
      stompClient: "",
      timer: "",
      ktem1: "",
      khum1: "",
      o21: "",
      rain1: "",
      stem1: "",
      shum1: "",
      sp1: "",
      dir1: "",
      pre1: "",
      illum1: ""
    };
  },
  mounted() {
    this.ktem();
    this.khum();
    this.o2();
    this.rain();
    this.stem();
    this.shum();
    this.dir();
    this.pre();
    this.illum();
    // 初始化websocket
    this.initWebSocket();
  },
  beforeDestroy() {
    // 页面离开时断开连接，清除定时器
    this.disconnect();
    clearInterval(this.timer);
  },
  methods: {
    initWebSocket() {
      this.connection();
      let that = this;
      // 断开重连机制，尝试发送消息，捕获异常发生时重连
      this.timer = setInterval(() => {
        try {
          that.stompClient.send("test");
        } catch (err) {
          console.log("断线了:" + err);
          that.connection();
        }
      }, 5000);
    },
    // 连接后台
    connection() {
      // 建立连接对象
      let socket = new SockJS("http://10.168.14.55:8080/endpoint");
      // 获取STOMP子协议的客户端对象
      this.stompClient = Stomp.over(socket);
      // 想服务器发起websocket连接
      this.stompClient.connect(
        "guest",
        "guest",
        () => {
          this.stompClient.subscribe("/topic/meteor", msg => {
            // 订阅服务端提供的某个 topic
            // 这里接收从服务器的数据
            var msg = msg.body.split("&");
            this.ktem1 = msg[0];
            this.khum1 = msg[1];
            this.rain1 = msg[2];
            this.sp1 = msg[3];
            this.dir1 = msg[4];
            this.pre1 = msg[5];
            this.stem1 = msg[6];
            this.shum1 = msg[7];
            this.illum1 = msg[8];
            this.o21 = msg[9];
            this.tableData[0].data1 = msg[0] + "℃";
            this.tableData[0].data2 = msg[1] + "";
            this.tableData[0].data5 = msg[2] + "";
            this.tableData[1].data2 = msg[3] + "";
            this.tableData[1].data3 = msg[4] + "";
            this.tableData[1].data4 = msg[5] + "";
            this.tableData[0].data4 = msg[6] + "";
            this.tableData[1].data1 = msg[7] + "";
            this.tableData[1].data5 = msg[8] + "";
            this.tableData[0].data3 = msg[9] + "";
          });
        },
        err => {
          // 连接发生错误时的处理函数
          console.log("失败");
          console.log(err);
        }
      );
    },
    // 断开连接
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
    },

    // 空气温度
    ktem() {
      // 空气温度
      // 图表的各项配置
      let that = this;
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
      var dataX = []; // 实际 存放x 轴数据
      var dataY = []; // 实际 存放y 轴数据
      // 实时更新数据
      let timeTicket;
      clearInterval(timeTicket);
      // 每秒获取数据
      timeTicket = setInterval(function() {
        // 获取当前时间
        var time = new Date().format("hh:mm:ss");
        if (dataY.length == 30) {
          dataX.shift();
          dataY.shift();
        }
        dataX.push(time);
        dataY.push(that.ktem1);
        // 隐藏加载动画
        myChart.hideLoading();
        // 重新绘图
        myChart.setOption({
          xAxis: {
            data: dataX
          },
          series: [
            {
              data: dataY
            }
          ]
        });
      }, 1000);
    },
    // 空气湿度
    khum() {
      // 图表的各项配置
      let that = this;
      let option = {
        // 标题
        title: {
          text: "空气湿度与时间的关系图",
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
      var myChart = this.$echarts.init(document.getElementById("空气湿度"));
      //  使用刚指定的配置项和绘制图表，数据为 option
      myChart.setOption(option);

      //  数据加载完之前 显示一段简单 的 loading 动画
      myChart.showLoading();
      var dataX = []; // 实际 存放x 轴数据
      var dataY = []; // 实际 存放y 轴数据
      // 实时更新数据
      let timeTicket;
      clearInterval(timeTicket);
      // 每秒获取数据
      timeTicket = setInterval(function() {
        // console.log(this);
        // 获取当前时间
        var time = new Date().format("hh:mm:ss");
        if (dataY.length == 30) {
          dataX.shift();
          dataY.shift();
        }
        dataX.push(time);
        dataY.push(that.khum1);
        // 隐藏加载动画
        myChart.hideLoading();
        // 重新绘图
        myChart.setOption({
          xAxis: {
            data: dataX
          },
          series: [
            {
              data: dataY
            }
          ]
        });
      }, 1000);
    },
    // 氧气浓度
    o2() {
      var that = this;
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
      var dataX = []; // 实际 存放x 轴数据
      var dataY = []; // 实际 存放y 轴数据
      // 实时更新数据
      let timeTicket;
      clearInterval(timeTicket);
      // 每秒获取数据
      timeTicket = setInterval(function() {
        // 获取当前时间
        var time = new Date().format("hh:mm:ss");
        if (dataY.length == 30) {
          dataX.shift();
          dataY.shift();
        }
        dataX.push(time);
        dataY.push({ value: that.o21, name: time });
        // 隐藏加载动画
        myChart.hideLoading();
        // 重新绘图
        myChart.setOption({
          legend: {
            data: dataX
          },
          series: [
            {
              data: dataY
            }
          ]
        });
      }, 1000);
    },
    // 降雨量
    rain() {
      var that = this;
      var myChart = this.$echarts.init(document.getElementById("降雨量"));
      var colors = ["#5793f3", "#d14a61", "#675bba"];
      var option = {
        color: colors,
        title: {
          text: "降雨量分布"
        },
        tooltip: {
          trigger: "none",
          axisPointer: {
            type: "cross"
          }
        },
        legend: {
          data: ["2019 降雨量"]
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
            data: []
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "2016 降雨量",
            type: "line",
            smooth: true,
            data: []
          }
        ]
      };
      myChart.setOption(option);

      //  数据加载完之前 显示一段简单 的 loading 动画
      myChart.showLoading();
      var dataX = []; // 实际 存放x 轴数据
      var dataY = []; // 实际 存放y 轴数据
      // 实时更新数据
      let timeTicket;
      clearInterval(timeTicket);
      // 每秒获取数据
      timeTicket = setInterval(function() {
        // console.log(this);
        // 获取当前时间
        var time = new Date().format("hh:mm:ss");
        if (dataY.length == 30) {
          dataX.shift();
          dataY.shift();
        }
        dataX.push(time);
        dataY.push(that.rain1);
        // 隐藏加载动画
        myChart.hideLoading();
        // 重新绘图
        myChart.setOption({
          xAxis: {
            data: dataX
          },
          series: [
            {
              data: dataY
            }
          ]
        });
      }, 1000);
    },
    // 土壤温度
    stem() {
      var that = this;
      var myChart = this.$echarts.init(document.getElementById("土壤温度"));
      let option = {
        xAxis: {
          type: "category",
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [],
            type: "line",
            symbol: "triangle",
            symbolSize: 20,
            lineStyle: {
              normal: {
                color: "green",
                width: 4,
                type: "dashed"
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 3,
                borderColor: "yellow",
                color: "blue"
              }
            }
          }
        ]
      };
      myChart.setOption(option);

      myChart.showLoading();
      var dataX = [];
      var dataY = [];
      let timeTicket;
      clearInterval(timeTicket);
      timeTicket = setInterval(function() {
        var time = new Date().format("hh:mm:ss");
        if (dataY.length == 30) {
          dataY.shift();
          dataX.shift();
        }
        dataX.push(time);
        dataY.push(that.stem1);
        myChart.hideLoading();

        myChart.setOption({
          xAxis: {
            data: dataX
          },
          series: [
            {
              data: dataY
            }
          ]
        });
      }, 1000);
    },
    // 土壤湿度
    shum() {
      // 土壤湿度
      // 图表的各项配置
      let that = this;
      let option = {
        // 标题
        title: {
          text: "土壤湿度与时间的关系图",
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
      var myChart = this.$echarts.init(document.getElementById("土壤湿度"));
      //  使用刚指定的配置项和绘制图表，数据为 option
      myChart.setOption(option);

      //  数据加载完之前 显示一段简单 的 loading 动画
      myChart.showLoading();
      var dataX = []; // 实际 存放x 轴数据
      var dataY = []; // 实际 存放y 轴数据
      // 实时更新数据
      let timeTicket;
      clearInterval(timeTicket);
      // 每秒获取数据
      timeTicket = setInterval(function() {
        // 获取当前时间
        var time = new Date().format("hh:mm:ss");
        if (dataY.length == 30) {
          dataX.shift();
          dataY.shift();
        }
        dataX.push(time);
        dataY.push(that.shum1);
        // 隐藏加载动画
        myChart.hideLoading();
        // 重新绘图
        myChart.setOption({
          xAxis: {
            data: dataX
          },
          series: [
            {
              data: dataY
            }
          ]
        });
      }, 1000);
    },
    // 大气压强
    pre() {
      var myChart = this.$echarts.init(document.getElementById("大气压强"));
      let option = {
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
      };
      myChart.setOption(option);

      var that = this;
      var dataX = []; // 实际存放时间数组
      var dataL = []; // 实际存放左侧半径模式
      var dataR = []; // 实际存放右侧面积模式数据
      // 实时更新数据
      let timeTicket;
      clearInterval(timeTicket);
      // 每秒获取数据
      timeTicket = setInterval(function() {
        // 获取当前时间
        var time = new Date().format("hh:mm:ss");
        if (dataL.length == 30) {
          dataX.shift();
          dataL.shift();
          dataR.shift();
        }
        dataX.push(time);
        dataL.push({ value: that.pre1, name: time });
        dataR.push({ value: that.pre1, name: time });
        // 隐藏加载动画
        myChart.hideLoading();
        // 重新绘图
        myChart.setOption({
          legend: {
            x: "center",
            y: "bottom",
            data: dataX
          },
          series: [
            {
              data: dataL
            },
            {
              data: dataR
            }
          ]
        });
      }, 1000);

      // });
    },
    // 风向
    dir() {
      var that = this;
      var myChart = this.$echarts.init(document.getElementById("风向/风速"));
      myChart.setOption({
        title: {
          text: "风向,风速与时间的关系图"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["风向", "风速"]
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
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "风向",
            type: "line",
            stack: "总量",
            data: []
          },
          {
            name: "风速",
            type: "line",
            stack: "总量",
            data: []
          }
        ]
      });
      //  数据加载完之前 显示一段简单 的 loading 动画
      myChart.showLoading();
      var dataX = []; // 实际 存放x 轴数据
      var dataY = []; // 实际 存放风速数据
      var dataZ = []; // 存放 风速数据
      // 实时更新数据
      let timeTicket;
      clearInterval(timeTicket);
      // 每秒获取数据
      timeTicket = setInterval(function() {
        // 获取当前时间
        var time = new Date().format("hh:mm:ss");
        if (dataY.length == 30) {
          dataX.shift();
          dataY.shift();
          dataZ.shift();
        }
        dataX.push(time);
        dataY.push(that.dir1);
        dataZ.push(that.sp1);
        // 隐藏加载动画
        myChart.hideLoading();
        // 重新绘图
        myChart.setOption({
          xAxis: {
            data: dataX
          },
          series: [
            {
              data: dataY
            },
            {
              data: dataZ
            }
          ]
        });
      }, 1000);
    },
    // 光照强度
    illum() {
      var myChart = this.$echarts.init(document.getElementById("光照强度"));
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

      //  数据加载完之前 显示一段简单 的 loading 动画
      myChart.showLoading();

      var that = this;
      var dataX = []; // 实际 存放x 轴数据
      var dataY = []; // 实际 存放y 轴数据
      // 实时更新数据
      let timeTicket;
      clearInterval(timeTicket);
      // 每秒获取数据
      timeTicket = setInterval(function() {
        // 获取当前时间
        var time = new Date().format("hh:mm:ss");
        if (dataY.length == 30) {
          dataX.shift();
          dataY.shift();
        }
        dataX.push(time);
        dataY.push(that.il1um1);
        // 隐藏加载动画
        myChart.hideLoading();
        // 重新绘图
        myChart.setOption({
          xAxis: {
            data: dataX
          },
          series: [
            {
              data: dataY
            }
          ]
        });
      }, 1000);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    // 立即刷新
    refresh() {}
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
.el-button {
  position: absolute;
  right: 10%;
  top: 50%;
}
</style>