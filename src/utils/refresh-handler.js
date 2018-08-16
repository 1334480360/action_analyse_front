/**
 * @title：监听时间变化刷新图表
 * @author：xuan
 * @date：2018/7/27
 */
import Vue from 'vue'
import store from '../store'
import {mapGetters} from 'vuex'

export default new Vue({
  store,
  computed: {
    ...mapGetters(['autoRefreshCode', 'autoRefreshChartList'])
  },
  watch: {
    autoRefreshCode () {
      this.repaintAutoRefreshList()
    }
  },
  methods: {
    repaintAutoRefreshList () {
      console.log('Begin to repaintAutoRefresh!')
      this.autoRefreshChartList.forEach(chart => chart())
    }
  }
})
