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
      <search/>
      <!--图表搜索条件-->
      <chart-search/>
      <!--图表展示区域-->
      <section class="report-chart"
               style="padding-bottom: 20px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative; background: transparent; text-align: center;">
          
      </section>
    </div>
  </div>
</template>

<script>
import Search from './search'
import ChartSearch from './chart_search'

import {mapGetters} from 'vuex'
import {queryRetain} from '../../../api/module_index'

export default {
  name: 'index',
  components: {
    Search,
    ChartSearch
  },
  computed: {
    ...mapGetters(['retainParam'])
  },
  created () {
    this.GLOBAL.beginDate = this.retainParam.beginDate
    this.GLOBAL.endDate = this.retainParam.endDate
  },
  mounted () {
    this.queryRetain()
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
      this.retainParam.productName = this.value
      this.$store.commit('updateRetainParam', this.retainParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    sortByLetter: function (a, b) {
      return a.group >= b.group ? 1 : -1
    },
    handleDateType (type) {
      switch (type) {
        case 'day':
          this.dateType = '天'
          break
        case 'week':
          this.dateType = '周'
          break
        case 'month':
          this.dateType = '月'
          break
      }
    },
    handleDate (date) {
      let newDate = ''
      const dateArr = date.split('-')
      switch (this.retainParam.unit) {
        case 'day':
          let day = new Date(date).getDay()
          const dayArr = ['日', '一', '二', '三', '四', '五', '六']
          newDate = `${parseInt(dateArr[1])}-${parseInt(dateArr[2])}(${dayArr[day]})`
          break
        case 'week':
          newDate = `${parseInt(dateArr[1])}-${parseInt(dateArr[2])}当周`
          break
        case 'month':
          newDate = `${parseInt(dateArr[1])}月`
          break
      }
      return newDate
    },
    setTableData: function (data) {
      this.handleDateType(this.retainParam.unit)
      this.dateArr = []
      this.tableData = []
      // let dateSet = new Set()
      for (let i = 0; i < data[0].details.length; i++) {
        this.dateArr.push(i)
      }
      for (let i = 0; i < data.length; i++) {
        let obj = {date: '', userCount: [], rate: []}

        obj.date = this.handleDate(data[i].beginDate)
        for (let j = 0; j < data[i].details.length; j++) {
          obj.userCount.push(data[i].details[j].userCount)
          obj.rate.push(data[i].details[j].percent + '%')
        }
        this.tableData.push(obj)
      }
    },
    setPersonData: function (data) {
      let arr = []
      for (let i = 0; i < data[0].details.length; i++) {
        arr.push({datas: [], dimension: `第 ${i} ${this.dateType}`})
      }

      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (data[j].details[i]) {
            arr[i].datas.push({value: data[j].details[i].userCount, date: this.handleDate(data[j].details[i].retainDate)})
          }
        }
      }
      this.personData = arr
    },
    setPercentData: function (data) {
      let arr = []
      for (let i = 0; i < data[0].details.length; i++) {
        arr.push({datas: [], dimension: `第 ${i} ${this.dateType}`})
      }

      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (data[j].details[i]) {
            arr[i].datas.push({value: data[j].details[i].percent, date: this.handleDate(data[j].details[i].retainDate)})
          }
        }
      }
      this.percentData = arr
    },
    async queryRetain () {
      this.loading = true
      queryRetain(this.retainParam).then(res => {
        if (res.data.result === 'fail') {
          this.$message.error(res.data.message)
        }
        this.data = res.data.data

        // 重新组装charts
        this.setTableData(JSON.parse(JSON.stringify(this.data)))
        this.setPersonData(JSON.parse(JSON.stringify(this.data)))
        this.setPercentData(JSON.parse(JSON.stringify(this.data)))
        this.loading = false

        // 添加方法到自动刷新列表
        this.$store.commit('addToAutoRefreshChartList', this.queryRetain)
      })
    }

  },
  data () {
    return {
      data: [],
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
      lineType: 'person'
    }
  }
}
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
</style>
