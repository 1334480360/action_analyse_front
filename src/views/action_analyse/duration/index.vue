<template>
  <div id="sa-main" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight: 300;color: #777C7C;font-size: 14px;line-height: 1.42857143;">
    <div class="fixed-top-bar">
      <div class="bookmark-tool-bar">
        <div class="analyse-top">
          <div class="bookmark-title-container">
            <span class="bookmark-title" contenteditable="false">间隔分析</span>
          </div>
          <!-- 选择项目 -->
          <el-select v-model="value" filterable placeholder="请选择项目" style="width: 110px;" @change="paramChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- 刷新按钮 -->
          <el-button @click="refresh" icon="el-icon-refresh" style="width: 55px; position: absolute; right: 20px; top: 5px;"></el-button>
        </div>
      </div>
    </div>

    <div class="sa-report">
      <!--数据搜索条件-->
      <search/>
      <!--图表搜索条件-->
      <chart-search/>
      <!--图表显示区域-->
      <section class="report-chart"
               style="padding-bottom: 20px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative; background: transparent;">
          <!-- <line-chart :chart-data="charts" :total-show="false" v-loading="loading" v-if="this.chartType === 'line'"></line-chart>
          <bar-chart :chart-data="charts" :total-show="false" v-loading="loading" v-else-if="this.chartType === 'bar'"></bar-chart>
          <pie-chart :chart-data="pieData" :total-show="false" v-loading="loading" v-else-if="this.chartType === 'pie'"></pie-chart> -->
      </section>

      <!--间隔面板-->
      <div class="page-part-h-split" style=""></div>
      <div class="page-data-truncated" style="display: none;"></div>

      <!--导出-->
      <!--<div class="table-config clearfix" style="display: block;">-->
        <!--<div class="input-icon-wrap pull-left">-->
          <!--<span data-method="search" class="icon-search" style="display: none;"></span>-->
          <!--<input data-method="search" data-last="" data-timeout="" type="text" class="form-control" placeholder="按分组筛选"-->
                 <!--style="width:200px;display:none;">-->
          <!--<label data-method="rollup" class="sa-checkbox" style="display: none;">-->
            <!--<input id="chk-rollup-display" type="checkbox" data-method="checkbox">-->
            <!--<label for="chk-rollup-display"></label>-->
            <!--<span>显示合计</span>-->
          <!--</label>-->
        <!--</div>-->
        <!--<div class="btn-group pull-right" role="group" aria-label="...">-->
          <!--<button data-method="export" type="button" style="margin-left: 10px; width: 76px;"-->
                  <!--class="btn btn-default btn-icon" data-placement="bottom" data-toggle="tooltip"-->
                  <!--data-original-title="导出表格中数据 csv">-->
            <!--<span class="icon-export" style="vertical-align: sub;"></span>-->
            <!--<span style="display: inline-block;line-height: 20px;">导出</span>-->
          <!--</button>-->
        <!--</div>-->
        <!--<div class="btn-group pull-right" role="group" aria-label="...">-->
          <!--<button data-method="transfer" type="button" class="btn btn-default btn-icon">-->
            <!--<span class="icon-reverse"></span>-->
          <!--</button>-->
          <!--<button data-method="percent" type="button" class="btn btn-default btn-icon">-->
            <!--<span class="icon-percentage" aria-hidden="true"></span>-->
          <!--</button>-->
        <!--</div>-->
      <!--</div>-->
      <!--表格-->
      <!-- <chart-table :table-data="tableData" :date-arr="dateArr"  v-loading="loading"/> -->

      <div class="modal fade" id="config-axis-container" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"></div>
    </div>
  </div>
</template>

<script>
// import LineChart from '../../components/LineChart'
// import LineAreaChart from '../../components/LineAreaChart'
// import PieChart from '../../components/PieChart'
// import BarChart from '../../components/BarChart'

import Search from './search'
import ChartSearch from './chart_search'
import ChartTable from './chart_table'
import RefreshHandler from '../../../utils/refresh-handler'

import {queryDuration , queryEventList} from '../../../api/module_index'
import {formatStrToDate} from '../../../assets/common'
import {mapGetters} from 'vuex'

export default {
  name: 'test',
  components: {
    Search,
    ChartSearch,
    ChartTable
    // LineChart,
    // LineAreaChart,
    // PieChart,
    // BarChart
  },
  computed: {
    ...mapGetters(['durationParam']),
    ...mapGetters(['chartType'])
  },
  created () {
    this.GLOBAL.beginDate = this.durationParam.beginDate
    this.GLOBAL.endDate = this.durationParam.endDate
  },
  mounted () {
    //this.getEventList()
    this.getDurationResult()
  },
  beforeDestroy () {
    this.$store.commit('clearChartList')
    this.$store.commit('initParam')
  },
  methods: {
    refresh: function () {
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    sort: function (a, b) {
      return formatStrToDate(a) - formatStrToDate(b)
    },
    sortByLetter: function (a, b) {
      return a.group >= b.group ? 1 : -1
    },
    paramChange: function () {

      this.durationParam.productName = this.value
      this.$store.commit('updateDurationParam', this.durationParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    async getDurationResult () {
      this.loading = true
      console.log(this.durationParam)
      queryDuration(this.durationParam).then(res => {
        if (res.data.result === 'fail') {
          this.$message.error(res.data.message)
        }
        this.data = res.data.data
        console.log('duration', res)
        // 重新组装charts
        // this.setCharts(JSON.parse(JSON.stringify(this.data)));
        // this.setTableData(JSON.parse(JSON.stringify(this.data)));
        // this.setPieData(JSON.parse(JSON.stringify(this.data)));

        this.loading = false

        // 添加方法到自动刷新列表
        this.$store.commit('addToAutoRefreshChartList', this.getDurationResult)
      })
    },
    async getEventList () {
      queryEventList(this.durationParam.productName).then(res => {
         if (res.data.result === 'fail') {
          this.$message.error(res.data.message)
        }
        this.data = res.data.data
        console.log('event', res)
      })
    }
  },
  data () {
    return {
      data: [],
      charts: [],
      tableData: [],
      pieData: [],
      dateArr: [],
      loading: true,
      options: [{
        value: 'my-dafy',
        label: '个人中心'
      }, {
        value: 'vip-loan',
        label: '豪有钱'
      }],
      value: 'my-dafy'
    }
  }
}
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
</style>
