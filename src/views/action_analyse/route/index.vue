<template>
  <div id="sa-main" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight: 300;color: #777C7C;font-size: 14px;line-height: 1.42857143;">
    <div class="fixed-top-bar">
      <div class="bookmark-tool-bar">
        <div class="analyse-top">
          <div class="bookmark-title-container">
            <span class="bookmark-title" contenteditable="false">用户行为路径</span>
          </div>
          <el-select v-model="value" filterable placeholder="请选择项目" style="width: 110px;" @change="paramChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button @click="refresh" icon="el-icon-refresh" style="width: 55px; position: absolute; right: 20px; top: 5px;"></el-button>
        </div>
      </div>
    </div>
    <div class="sa-report">
      <!--数据搜索条件-->
      <search :eventList="eventList" />
      <!--图表搜索条件-->
      <chart-search/>
      <!--图表展示区域-->
      <section class="report-chart"
               style="padding-bottom: 20px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative; background: #F7F9FA;; text-align: center;">
        <sankey-diagram :total-show="true" :chart-data="chartData" />
      </section>
    </div>
  </div>
</template>

<script>
import Search from './search'
import ChartSearch from './chart_search'

import {mapGetters} from 'vuex'
import {queryRoute, queryEventList} from '../../../api/module_index'
import SankeyDiagram from '../../components/SankeyDiagram'

export default {
  name: 'index',
  components: {
    SankeyDiagram,
    Search,
    ChartSearch
  },
  computed: {
    ...mapGetters(['routeParam'])
  },
  created () {
    this.GLOBAL.beginDate = this.routeParam.beginDate
    this.GLOBAL.endDate = this.routeParam.endDate
  },
  mounted () {
    this.getEventsList(this.routeParam.productName)
    this.queryRoute()
  },
  beforeDestroy () {
    this.$store.commit('clearChartList')
    this.$store.commit('initParam')
  },
  methods: {
    refresh: function () {
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    paramChange: function () {
      this.routeParam.productName = this.value
      this.getEventsList(this.routeParam.productName)
      this.$store.commit('updateRouteParam', this.routeParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    sortByLetter: function (a, b) {
      return a.group >= b.group ? 1 : -1
    },
    getEventsList (param) {
      queryEventList({productName: param}).then(res => {
        this.eventList = this.handleEventData(res.data.data)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleEventData (data) {
      let arr = []

      for (let pageName in data) {
        let tempObj = {label: '', options: []}

        tempObj.label = pageName
        for (let i = 0; i < data[pageName].length; i++) {
          let subObj = {}
          subObj = {value: `${pageName}-${data[pageName][i].eventName}`, label: data[pageName][i].eventName}
          tempObj.options.push(subObj)
        }
        arr.push(tempObj)
      }
      return arr
    },
    queryRoute: function () {
      this.loading = true
      queryRoute(this.routeParam).then(res => {
        if (res.data.result === 'fail') {
          this.$message.error(res.data.message)
        }
        this.chartData = res.data.data
        console.log(this.chartData)
        this.loading = false

        // 添加方法到自动刷新列表
        this.$store.commit('addToAutoRefreshChartList', this.queryRoute)
      })
    }
  },
  data () {
    return {
      chartData: {
        links: [],
        nodes: []
      },
      options: [{
        value: 'my-dafy',
        label: '个人中心'
      }, {
        value: 'vip-loan',
        label: '豪有钱'
      }],
      value: 'my-dafy',
      tableData: [],
      loading: true,
      dateArr: [],
      dateType: '',
      tipType: 'item',
      personData: [],
      percentData: [],
      lineType: 'person',
      eventList: []
    }
  }
}
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
</style>
