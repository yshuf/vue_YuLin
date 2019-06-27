<template>
  <div>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      stripe
      style="width: 100%; margin-top: -60px;"
      highlight-current-row
      align="center"
    >
      <el-table-column prop="id" width="100" align="center"></el-table-column>
      <el-table-column prop="param1" width="100" align="center"></el-table-column>
      <el-table-column prop="data1" width="120"></el-table-column>
      <el-table-column prop="param2" width="120" align="center"></el-table-column>
      <el-table-column prop="data2" width="120"></el-table-column>
      <el-table-column prop="param3" width="100" align="center"></el-table-column>
      <el-table-column prop="data3" width="120"></el-table-column>
      <el-table-column prop="param4" width="100" align="center"></el-table-column>
      <el-table-column prop="data4" width="120"></el-table-column>
      <el-table-column prop="param5" width="100" align="center"></el-table-column>
      <el-table-column prop="data5" width="120"></el-table-column>
    </el-table>

    <!-- 图形界面 -->
    <el-tabs type="border-card" style="width: 100%;">
      <el-tab-pane :label="items.name" v-for="(items,index) in list" :key="index">
        <div :id="items.name" :style="{width: '1000px',height: '500px'}"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import "@/assets/js/common.js";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { genData } from "@/assets/js/echarts.js";
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
          name: "土壤相关属性"
        },
        {
          name: "水温"
        },
        {
          name: "浑浊度"
        }
      ],
      stompClient: "",
      timer: "",
      ktem1: "",
      co21: "",
      stem1: "",
      snity1: "",
      o21: "",
      khum1: "",
      smoke1: "",
      shum1: "",
      scondu1: "",
      wtem1: "",
      whur1: ""
    };
  },
  mounted() {
    this.ktem();
    this.co2();
    this.snity();
    this.o2();
    this.khum();
    this.smoke();
    this.wtem();
    this.whur();
    // websocket 初始化
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
          this.stompClient.subscribe("/topic/forest", msg => {
            // 订阅服务端提供的某个 topic
            // 这里接收从服务器的数据
            var msg = msg.body.split("&");
            this.ktem1 = msg[0]; // 空气温度
            this.khum1 = msg[1]; //空气湿度
            this.co21 = msg[2]; // 二氧化碳浓度
            this.smoke1 = msg[3]; // 烟雾浓度
            this.wtem1 = msg[4]; // 水温
            this.stem1 = msg[5]; // 土壤温度
            this.shum1 = msg[6]; // 土壤湿度
            this.snity1 = msg[7]; // 土壤盐分
            this.scondu1 = msg[8]; // 土壤电导率
            this.whur1 = msg[9]; // 浑浊度
            this.o21 = msg[10]; // 氧气浓度
            this.tableData[0].data1 = msg[0]+"℃";
            this.tableData[1].data1 = msg[1]+"%RH";
            this.tableData[0].data2 = msg[2]+"ppm";
            this.tableData[1].data2 = msg[3]+"ppm";
            this.tableData[2].data1 = msg[4]+"℃";
            this.tableData[0].data3 = msg[5]+"℃";
            this.tableData[1].data3 = msg[6]+"%RH";
            this.tableData[0].data4 = msg[7]+"mg/L";
            this.tableData[1].data4 = msg[8]+"cm/us";
            this.tableData[2].data2 = msg[9]+"ntv";
            this.tableData[0].data5 = msg[10]+"%";
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
    ktem() {
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

      // 实时更新数据
      myChart.showLoading();
      var dataX = []; // 实际 存放x 轴数据
      var dataY = []; // 实际 存放y 轴数据
      // 实时更新数据
      let timeTicket;
      let that = this;
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
    // 烟雾浓度
    smoke() {
      var myChart = this.$echarts.init(document.getElementById("烟雾浓度"));
      var option = {
        title: {
          text: "烟雾浓度与时间关系图",
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

      //  数据加载完之前 显示一段简单 的 loading 动画
      myChart.showLoading();
      var dataX = []; // 实际存放时间数组
      var dataL = []; // 实际存放左侧半径模式
      var dataR = []; // 实际存放右侧面积模式数据
      let that = this;
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
        dataL.push({ value: that.smoke1, name: time });
        dataR.push({ value: that.smoke1, name: time });
        // 隐藏加载动画
        myChart.hideLoading();
        // 重新绘图
        myChart.setOption({
          legend: {
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
    },
    // 二氧化碳浓度
    co2() {
      // 图表的各项配置
      let that = this;
      let option = {
        // 标题
        title: {
          text: "二氧化碳浓度与时间的关系图",
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
      var myChart = this.$echarts.init(document.getElementById("二氧化碳浓度"));
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
        dataY.push(that.co21);
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
    // 土壤部分
    snity() {
      var myChart = this.$echarts.init(document.getElementById("土壤相关属性"));
      var option = {
        title: {
          text: "土壤相关属性变化"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["土壤温度", "土壤湿度", "土壤盐分", "土壤电导率"]
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
            name: "土壤温度",
            type: "line",
            stack: "总量",
            data: []
          },
          {
            name: "土壤湿度",
            type: "line",
            stack: "总量",
            data: []
          },
          {
            name: "土壤盐分",
            type: "line",
            stack: "总量",
            data: []
          },
          {
            name: "土壤电导率",
            type: "line",
            stack: "总量",
            data: []
          }
        ]
      };
      myChart.setOption(option);

      //  数据加载完之前 显示一段简单 的 loading 动画
      myChart.showLoading();
      var dataX = []; // 实际 存放 时间 数据
      var dataT = []; // 实际 存放 温度数据
      var dataS = []; // 实际 存放 湿度 数据
      var dataN = []; // 实际 存放 盐分 数据
      var dataD = []; //  实际存放 电导率 数据
      var that = this;
      // 实时更新数据
      let timeTicket;
      clearInterval(timeTicket);
      // 每秒获取数据
      timeTicket = setInterval(function() {
        // console.log(this);
        // 获取当前时间
        var time = new Date().format("hh:mm:ss");
        if (dataT.length == 30) {
          dataX.shift();
          dataT.shift();
          dataS.shift();
          dataN.shift();
          dataD.shift();
        }
        dataX.push(time);
        dataT.push(that.stem1);
        dataS.push(that.shum1);
        dataN.push(that.snity1);
        dataD.push(that.scondu1);
        // 隐藏加载动画
        myChart.hideLoading();
        // 重新绘图
        myChart.setOption({
          xAxis: {
            data: dataX
          },
          series: [
            {
              data: dataT
            },
            {
              data: dataS
            },
            {
              data: dataN
            },
            {
              data: dataD
            }
          ]
        });
      }, 1000);
    },
    // 水温
    wtem() {
      var myChart = this.$echarts.init(document.getElementById("水温"));
      let option = {
        title: {
          text: "水温与时间的关系",
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
            formatter: "{value} ℃"
          }
        },
        series: [
          {
            name: "水温",
            type: "line",
            data: []
          }
        ]
      };
      myChart.setOption(option);

      // 实时更新数据
      myChart.showLoading();
      var dataX = []; // 实际 存放x 轴数据
      var dataY = []; // 实际 存放y 轴数据
      // 实时更新数据
      let timeTicket;
      let that = this;
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
        dataY.push(that.wtem1);
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
    // 浑浊度
    whur() {
      var myChart = this.$echarts.init(document.getElementById("浑浊度"));
      let option = {
        title: {
          text: "水浑浊度与时间的关系",
          left: "center"
        },
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: []
          }
        ]
      };
      myChart.setOption(option);

      // 实时更新数据
      myChart.showLoading();
      var dataX = []; // 实际 存放x 轴数据
      var dataY = []; // 实际 存放y 轴数据
      // 实时更新数据
      let timeTicket;
      let that = this;
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
        dataY.push(that.whur1);
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