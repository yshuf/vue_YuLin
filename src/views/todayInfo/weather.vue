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
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { setInterval, clearInterval } from "timers";
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
      ],
      tableData: [
        {
          param1: "空气温度:",
          data1: "",
          param2: "空气湿度:",
          data2: "",
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
      timer: ""
    };
  },
  mounted() {
    this.ktem();
    this.khum();
    this.o2();
    this.rain();
    this.stem();
    this.shum();
    this.sp();
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
          this.stompClient.subscribe("/meteor/message", msg => {
            // 订阅服务端提供的某个 topic
            // 这里接收从服务器的数据
            console.log(msg.body);
          });
        },
        err => {
          // 连接发生错误时的处理函数
          console.log("失败");
          console.log(err);
        });
    },
    // 断开连接
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
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

      //  数据加载完之前 显示一段简单 的 loading 动画
      myChart.showLoading();

      var dataX = []; // 实际存放 x 轴的 值
      var dataV = []; // 实际存放 y 轴的 值
      // 从服务器获取数据
      var time = new Date().format("yyyy-MM-dd hh:mm:ss");
      
      this.$axios
        .get("meteorological/tem?time=" + time)
        .then(res => {
          console.log(res.data);
          // 判断 是否从服务器中获取到了数据
          if (res) {
            for (var i = 0; i < res.data.length; i++) {
              // 拿到数据后 遍历拿到 对应的时间给 x 轴
              dataX.push(res.data[i].time.slice(11));
              // 将拿到的各参数对应的值动态显示在表格中
              this.tableData[0].data1 = res.data[i].value + "℃";
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
    khum() {
      var myChart = this.$echarts.init(document.getElementById("空气湿度"));
      myChart.setOption({
        title: {
          text: "空气温度与时间的关系图"
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
    o2() {
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
            // 填充实时数据表格
            this.tableData.data3 = value + "";
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

      // // 实时更新
      // let timeTicket;
      // clearInterval(timeTicket);
      // timeTicket=setInterval(function(){
      //   // 获取到图表 option
      //   option=myChart.getOption();
      //   // 各个时间
      //   let legend=option.legend.data;
      //   // 要存放时间与数据的容器
      //   let arr =option.series[0].data;
      //   if(arr.length===30){
      //     arr.shift();
      //     legend.shift();
      //   }
      //   arr.push();
      //   legend.push()
      //   // 重新绘制
      //   myChart.setOption(option);
      // },6000)
    },
    // 降雨量
    rain() {
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
    // 土壤温度
    stem() {
      var myChart = this.$echarts.init(document.getElementById("土壤温度"));
      let data = [
        ["2000-06-05", 30],
        ["2000-06-06", 129],
        ["2000-06-07", 135],
        ["2000-06-08", 86],
        ["2000-06-09", 73],
        ["2000-06-10", 85],
        ["2000-06-11", 73],
        ["2000-06-12", 68],
        ["2000-06-13", 92],
        ["2000-06-14", 130],
        ["2000-06-15", 245],
        ["2000-06-16", 139],
        ["2000-06-17", 115],
        ["2000-06-18", 111],
        ["2000-06-19", 309],
        ["2000-06-20", 206],
        ["2000-06-21", 137],
        ["2000-06-22", 128],
        ["2000-06-23", 85],
        ["2000-06-24", 94],
        ["2000-06-25", 71],
        ["2000-06-26", 106],
        ["2000-06-27", 84],
        ["2000-06-28", 93],
        ["2000-06-29", 85],
        ["2000-06-30", 73],
        ["2000-07-01", 83],
        ["2000-07-02", 125],
        ["2000-07-03", 107],
        ["2000-07-04", 82],
        ["2000-07-05", 44],
        ["2000-07-06", 72],
        ["2000-07-07", 106],
        ["2000-07-08", 107],
        ["2000-07-09", 66],
        ["2000-07-10", 91],
        ["2000-07-11", 92],
        ["2000-07-12", 113],
        ["2000-07-13", 107],
        ["2000-07-14", 131],
        ["2000-07-15", 111],
        ["2000-07-16", 64],
        ["2000-07-17", 69],
        ["2000-07-18", 88],
        ["2000-07-19", 77],
        ["2000-07-20", 83],
        ["2000-07-21", 111],
        ["2000-07-22", 57],
        ["2000-07-23", 55],
        ["2000-07-24", 60]
      ];
      var dateList = data.map(function(item) {
        return item[0];
      });
      var valueList = data.map(function(item) {
        return item[1];
      });

      let option = {
        visualMap: [
          {
            show: false,
            type: "continuous",
            seriesIndex: 0,
            min: 0,
            max: 40
          }
        ],
        title: [
          {
            left: "center",
            text: "土壤温度与时间的关系图"
          }
        ],
        tooltip: {
          trigger: "axis"
        },
        xAxis: [
          {
            data: dateList
          }
        ],
        yAxis: [
          {
            splitLine: { show: false }
          }
        ],
        grid: [
          {
            bottom: "10%"
          }
        ],
        series: [
          {
            type: "line",
            showSymbol: false,
            data: valueList
          }
        ]
      };
      myChart.setOption(option);
    },
    // 土壤湿度
    shum() {
      var myChart = this.$echarts.init(document.getElementById("土壤湿度"));
      myChart.setOption({
        title: {
          text: "土壤温度与时间关系图"
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
    // 风速
    sp() {
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
    // 风向
    dir() {
      var myChart = this.$echarts.init(document.getElementById("风向"));
      myChart.setOption({
        title: {
          text: "风向与时间的关系图"
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
    // 大气压强
    pre() {
      var myChart = this.$echarts.init(document.getElementById("大气压强"));
      myChart.setOption({
        title: {
          text: "大气压强与时间关系图"
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
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
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
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      myChart.setOption(option);
      // var dataX = []; // 存放 x 轴数据
      // var dataY = []; // 存放 y 轴数据
      // var time = new Date().format("yyyy-MM-dd hh:mm:ss");
      // // 获取服务器返回数据
      // // this.$axios.get("meteorological/illum?time=" + time).then(res => {
      // this.$axios.get("meteorological/illum").then(res => {

      //   if (res) {
      //     console.log(res.data);
      //     // 循环遍历 获取到 返回数据中的 时间和 光照强度
      //     for (var i = 0; i < res.data.length; i++) {
      //       console.log(res.data[i].time);
      //       dataX.push(res.data[i].time.slice(11));
      //       console.log(res.data[i].value);
      //       dataY.push(res.data[i].value);
      //       // console.log(dataX);
      //       // console.log(dataY);
      //     }

      //     myChart.setOption({
      //       xAxis: {
      //         data: dataX
      //       },
      //       series: {
      //         name: "光照强度",
      //         type: "line",
      //         data: dataY
      //       }
      //     });

      // 实时更新（每四秒添加数据）
      // let timeTicket;
      // clearInterval(timeTicket);
      // // 设置定时器，没四秒更新一次数据
      // timeTicket = setInterval(function() {
      //   // 获取到图表的  option
      //   option = myChart.getOption();
      //   let arr = option.series[0].data;
      //   if (arr.length == 30) {
      //     arr.shift(); // 从队头删除数据
      //   }
      //   arr.push(Math.round(Math.random() * 200 + 500)); // 从对尾添加数据
      //   // 加载数据 图表
      //   myChart.setOption(option);
      // }, 4000);
      //   }
      // });
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