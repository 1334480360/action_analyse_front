<!--折线图-->
<template>
  <div :class="className" :style="{height:totalShow ? '210px' : '285px',width:width}"></div>
</template>

<script>
import echarts from 'echarts' // echarts theme
import { debounce } from '@/utils'
import {formatStrToDate} from '../../assets/common'

require('echarts/theme/macarons')

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
    tipType: {
      type: String,
      default: 'axis'
    },
    chartData: {
      type: Array,
      default () {
        return []
      }
    },
    businessType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  },
  beforeDestroy () {
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
      handler (val) {
        this.setOptions(val)
      }
    }
  },
  methods: {
    sort: function (a, b) {
      if (isNaN(a)) {
        return formatStrToDate(a) - formatStrToDate(b)
      }
      return a - b
    },
    filterRetainData (sourceData, saveMap) {
      sourceData.map(value => {
        saveMap.set(value.dimension, value.datas)
      })
    },
    setOptions: function (charts) {
      this.chart.clear()
      this.chart.showLoading({
        text: '查询中...',
        textStyle: { fontSize: 30, color: '#61C283' },
        effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}
      })
      if (charts === null || charts.length === undefined || charts.length === 0) {
        this.chart.hideLoading()
        return
      }

      // 横坐标值
      let xAxisSet = new Set()
      // 维度列表
      let seriesMap = new Map()
      charts.map(val1 => {
        val1.datas.map(val2 => {
          if (val2.date !== '合计') {
            xAxisSet.add(val2.date)
          }
        })
      })
      let xAxisArr = Array.from(xAxisSet).sort(this.sort)
      let length = xAxisArr.length
      // 数据和坐标对应
      if (this.businessType === 'retain') {
        this.filterRetainData(charts, seriesMap)
      } else {
        charts.map(val1 => {
          let seriesList = []
          for (let i = 0; i < length; i++) {
            seriesList[i] = 0
          }

          val1.datas.map(val2 => {
            if (val2.date !== '合计') {
              for (let i = 0; i < length; i++) {
                if (xAxisArr[i] === val2.date) {
                  seriesList.splice(i, 0, val2.value)
                  break
                }
              }
            }
          })
          seriesMap.set(val1.dimension, seriesList.slice(0, length))
        })
      }
      this.chart.setOption({
        xAxis: {
          data: xAxisArr,
          boundaryGap: true,
          axisTick: {
            show: false
          }
        },
        grid: {
          top: 15,
          bottom: 30,
          left: 0,
          right: 10,
          containLabel: true
        },
        tooltip: {
          trigger: this.tipType,
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
            return val.dimension
          })
        },
        series: charts.map(val => {
          return {
            name: val.dimension,
            smooth: false,
            type: 'line',
            animationDuration: 2800,
            data: seriesMap.get(val.dimension)
          }
        })
      })
      this.chart.hideLoading()
    },
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
