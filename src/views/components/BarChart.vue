<!--柱形图-->
<template>
  <div :class="className" :style="{height:this.totalShow ? '220px' : '290px',width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import {formatStrToDate} from "../../assets/common";

const animationDuration = 6000

export default {
  props: {
    totalShow: {
      type: Boolean,
      required: true
    },
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
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
    this.initChart();
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100);
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
      this.setOptions(this.chartData);
    },
    sort: function (a, b) {
      if (isNaN(a)) {
        return formatStrToDate(a) - formatStrToDate(b);
      }
      return a - b;
    },
    setOptions: function(charts) {
      this.chart.clear();
      if (charts === null) {
        return;
      }
      this.chart.clear();
      if (charts === null || charts.length === undefined) {
        return;
      }

      //横坐标值
      let xAxisSet = new Set();
      //维度列表
      let seriesMap = new Map();
      charts.map(val1 => {
        let seriesArr = [];
        val1.datas.map(val2 => {
          xAxisSet.add(val2.date);
          seriesArr.push(val2.value);
        });
        seriesMap.set(val1.dimension, seriesArr);
      });

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          padding: [5, 10]
        },
        grid: {
          top: 15,
          bottom: 30,
          left: 0,
          right: 10,
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: Array.from(xAxisSet).sort(this.sort),
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        legend: {
          bottom: 'bottom',
          data: charts.map(val => {
            return val.dimension;
          })
        },
        series: charts.map(val => {
          return {
            name: val.dimension,
            type: 'bar',
            animationDuration: 2800,
            data: seriesMap.get(val.dimension)
          }
        })
      })
    }

  }
}
</script>
