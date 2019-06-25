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



/*
* 
    需要的参数：
    myChartName:统计图名称
    myChartId:统计图id
    formatterFun:格式化tooltip
    xAxisData:数组，横坐标
    legendData: 数组，纵坐标代表意义
    seriesType: 图表类型//line,'bar'
    barGap:80%
    barCategoryGap:80%
    seriesData:数组
*/
require.config({
  paths: {
    echarts: 'echarts'
  }
});

// function getChart(myChartId, option) {
//   require(
//     ['echarts',
//       'echarts/chart/bar',
//       'echarts/chart/line',
//       'echarts/chart/pie',
//       'echarts/chart/funnel'
//     ],
//     function (ec) {
//       var myChart = ec.init(document.getElementById(myChartId));
//       myChart.setOption(option);
//     }
//   );
// }

function myChart(myChartId, myChartName, formatterFun, legendData, xAxisData, seriesType, barGap, barCategoryGap, seriesData) {
  var series = [];
  for (var i = 0, len = legendData.length; i < len; i++) {
    series[i] = {
      name: legendData[i],
      type: seriesType,
      barGap: barGap,
      barCategoryGap: barCategoryGap,
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: 'top',
            formatter: '{b}\n{c}'
          }
        }
      },
      data: seriesData[i]
    }
  }
  var option = {
    title: {
      text: myChartName
    },
    tooltip: {
      trigger: 'axis',
      formatter: formatterFun
    },
    legend: {
      data: legendData
    }, //data:['最高气温','最低气温'
    toolbox: {
      show: true,
      feature: {
        mark: {
          show: false
        },
        dataView: {
          show: true,
          readOnly: false
        },
        magicType: {
          show: true,
          type: ['line', 'bar']
        },
        restore: {
          show: true
        },
        saveAsImage: {
          show: true
        }
      }
    },
    calculable: true,
    animationDuration: 5000,
    xAxis: [{
      type: 'category', //category  time  value  log  
      position: 'bottom',
      boundaryGap: true,
      axisLine: { // 轴线
        show: true,
        lineStyle: {
          type: 'solid',
          width: 1
        }
      },
      axisTick: { // 轴标记
        show: true,
        length: 10,
        lineStyle: {
          color: 'red',
          type: 'solid',
          width: 2
        }
      },
      axisLabel: {
        show: true,
        interval: 'auto', // {number}
        rotate: 30,
        margin: 6,
        formatter: '{value}',
        textStyle: {
          fontFamily: 'Arial',
          fontStyle: 'italic',
          fontWeight: 'normal',
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#483d8b',
          type: 'dashed',
          width: 1,
          type: 'solid',
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(144,238,144,0.3)', 'rgba(135,200,250,0.3)']
        }
      },
      data: xAxisData
    }],
    yAxis: [{
      type: 'value'
    }],
    series: series
  };
  // getChart(myChartId, option);
}
/*
*   饼图封装
    需要的参数：
    myChartName:统计图名称
    myChartId:统计图id
    max：funnel的最大值
    formatterFun:格式化tooltip
    legendData: 数组，纵坐标代表意义
    seriesData:数组
*/
function myChartPie(myChartId, max, myChartName, formatterFun, legendData, seriesData) {
  option = {
    title: {
      text: myChartName,
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: formatterFun
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      data: legendData
    },
    toolbox: {
      show: true,
      feature: {
        mark: {
          show: false
        },
        dataView: {
          show: true,
          readOnly: false
        },
        magicType: {
          show: true,
          type: ['pie', 'funnel'],
          option: {
            funnel: {
              x: '25%',
              width: '50%',
              funnelAlign: 'left',
              max: max
            }
          }
        },
        restore: {
          show: true
        },
        saveAsImage: {
          show: true
        }
      }
    },
    calculable: true,
    series: [{
      name: myChartName,
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: seriesData
    }]
  };
  // getChart(myChartId, option);
}
export {
  genData,
  myChart,
  myChartPie,
}
