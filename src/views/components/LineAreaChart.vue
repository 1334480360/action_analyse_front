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

      this.chart.dispose();
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
      sort: function (a, b) {
        return a - b;
      },

      setOptions: function(charts) {
        this.chart.clear();
        if (charts === null || charts.length === undefined || charts.length === 0) {
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
          xAxis: {
            data: Array.from(xAxisSet).sort(this.sort),
            boundaryGap: true,
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
            type: 'scroll',
            bottom: 'bottom',
            data: charts.map(val => {
              return val.dimension;
            })
          },
          series: charts.map(val => {
            return {
              name: val.dimension,
              smooth: false,
              type: 'line',
              itemStyle: {
                normal: {
                  areaStyle: {
                  }
                }
              },
              animationDuration: 2800,
              data: seriesMap.get(val.dimension)
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
