import * as echarts from 'echarts';

const dom = document.getElementById('echarts-container');
const myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false,
});

const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
    },
  ],
};

myChart.setOption(option);
