<!--饼图-->
<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    chartData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');
      this.setOptions(this.chartData)
    },
    setOptions: function (charts) {
      this.chart.clear();
      this.chart.showLoading({
        text: '查询中...',
        textStyle: { fontSize : 30 , color: '#61C283' },
        effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}
      });
      if (charts === null || charts.length === undefined || charts.length === 0) {
        this.chart.hideLoading();
        return;
      }

      //横坐标值
      let xAxisSet = new Set();
      //维度
      let seriesName = null;
      charts.map(val => {
        seriesName = val.seriesName;
        xAxisSet.add(val.name);
      });


      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          left: 'center',
          bottom: 10,
          data: Array.from(xAxisSet)
        },
        calculable: true,
        series: [
          {
            name: seriesName,
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: charts,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      });
      this.chart.hideLoading();
    }
  }
}
</script>
