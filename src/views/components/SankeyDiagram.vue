<template>
  <div :class="className" :style="{height: '800px',width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'
require('echarts/theme/macarons')

export default {
  name: 'SankeyDiagram',
  props: {
    chartData: {
      type: Object
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
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler () {
        this.setOptions()
      }
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
  methods: {
    setOptions () {
      this.chart.clear()
      this.chart.showLoading({
        text: '查询中...',
        textStyle: { fontSize: 30, color: '#61C283' },
        effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}
      })
      if (!this.chartData || !this.chartData.nodes.length || !this.chartData.links.length) {
        this.chart.hideLoading()
        return
      }

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'sankey',
            layout: 'none',
            focusNodeAdjacency: true,
            itemStyle: {
              normal: {
                borderWidth: 1,
                borderColor: '#aaa'
              }
            },
            lineStyle: {
              normal: {
                curveness: 0.5
              }
            },
            data: this.chartData.nodes,
            links: this.chartData.links
          }
        ]
      })
      this.chart.hideLoading()
    },
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions()
    }
  }
}
</script>
