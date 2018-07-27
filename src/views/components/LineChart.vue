<!--折线图-->
<template>
  <div :class="className" :style="{height:totalShow ? '210px' : '285px',width:width}"></div>
</template>

<script>
import echarts from 'echarts'

require('echarts/theme/macarons'); // echarts theme
import { debounce } from '@/utils'

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
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true,
      default () {
        return {}
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
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100);
      window.addEventListener('resize', this.__resizeHanlder)
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0];
    sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

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
    setOptions: function(charts) {
      if (charts === null) {
        return;
      }

      const keys = Object.keys(charts);
      let xAxisSet = new Set();
      let seriesMap = new Map();
      keys.map(val => {
        let seriesArr = [];
        charts[val].map(val1 => {
          xAxisSet.add(val1.date);
          seriesArr.push(val1.value);
        });
        seriesMap.set(val, seriesArr);
      });

      this.chart.setOption({
        xAxis: {
          data: Array.from(xAxisSet),
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          top: 15,
          bottom: 30,
          left: 0,
          right: 0,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          bottom: 'bottom',
          data: keys.map(val => {
            return val;
          })
        },
        series: keys.map(val => {
          return {
            name: val,
            smooth: false,
            type: 'line',
            animationDuration: 2800,
            data: seriesMap.get(val)
          }
        }),
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');
      this.setOptions(this.chartData)
    }
  }
}
</script>
