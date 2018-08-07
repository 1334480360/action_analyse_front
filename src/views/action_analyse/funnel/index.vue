<template>
  <div id="sa-main" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight: 300;color: #777C7C;font-size: 14px;line-height: 1.42857143;">
    <div class="fixed-top-bar">
      <div class="bookmark-tool-bar">
        <div class="analyse-top">
          <div class="bookmark-title-container">
            <span class="bookmark-title" contenteditable="false">漏斗分析</span>
          </div>
          <el-button @click="refresh" icon="el-icon-refresh" style="width: 55px; position: absolute; right: 20px; top: 5px;"></el-button>
        </div>
      </div>
    </div>
    <div class="sa-report">
      <!--数据搜索条件-->
      <search/>

      <!--图表搜索条件-->
      <chart-search/>
    </div>
  </div>
</template>

<script>
  import Search from './search'
  import ChartSearch from './chart_search'
  import ChartTable from './chart_table'
  import RefreshHandler from '../../../utils/refresh-handler'



  export default {
    name: 'test',
    components: {
      Search,
      ChartSearch,
    },
    beforeDestroy() {
      this.$store.commit('clearChartList');
    },
    methods: {
      refresh: function () {
        this.$store.commit('updateAutoRefreshCode', Math.random());
      },
    },
  }
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
</style>
