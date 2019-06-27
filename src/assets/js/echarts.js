// 图标格式化 函数
function genData(count) {
  var nameList = [
    '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
  ];
  var legendData = [];
  var seriesData = [];
  var selected = {};
  for (var i = 0; i < 50; i++) {
    name = Math.random() > 0.65 ?
      makeWord(4, 1) + '·' + makeWord(3, 0) :
      makeWord(2, 1);
    legendData.push(name);
    seriesData.push({
      name: name,
      value: Math.round(Math.random() * 100000)
    });
    selected[name] = i < 6;
  }

  return {
    legendData: legendData,
    seriesData: seriesData,
    selected: selected
  };

  function makeWord(max, min) {
    var nameLen = Math.ceil(Math.random() * max + min);
    var name = [];
    for (var i = 0; i < nameLen; i++) {
      name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
    }
    return name.join('');
  }
};


// 折线图实时更新封转
function lineE(name,params){
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
      var myChart = this.$echarts.init(document.getElementById(name));
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
        if (dataX.length == 30) {
          dataX.shift();
          dataY.shift();
        }
        dataX.push(time);
        dataY.push(that.params);
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
export {
  genData,
  lineE
}
