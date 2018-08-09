<template>
  <div id="sa-main" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight: 300;color: #777C7C;font-size: 14px;line-height: 1.42857143;">
    <div class="fixed-top-bar">
      <div class="bookmark-tool-bar">
        <div class="analyse-top">
          <div class="bookmark-title-container">
            <span class="bookmark-title" contenteditable="false">漏斗分析</span>
          </div>
          <el-select v-model="value" filterable placeholder="请选择项目" style="width: 110px;" @change="appNameChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value1" filterable placeholder="请选择渠道" style="width: 110px;" @change="channelChange">
            <el-option
              v-for="item in options1"
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

    </div>
  </div>
</template>

<script>
  import Search from './search'
  import ChartSearch from './chart_search'
  import ChartTable from './chart_table'

  export default {
    name: 'test',
    components: {
      Search,
      ChartSearch,
      ChartTable,
    },
    created() {
      this.appNameChange();
      this.channelChange();
    },
    beforeDestroy() {
      this.$store.commit('clearChartList');
    },
    methods: {
      refresh: function () {
        this.$store.commit('updateAutoRefreshCode', Math.random());
      },
      appNameChange: function () {
        this.$store.commit('updateAppName', this.value);
      },
      channelChange: function () {
        this.$store.commit('updateChannel', this.value1);
      },
    },
    data() {
      return {
        options: [{
          value: 'my-dafy',
          label: '个人中心'
        }, {
          value: 'vip-loan',
          label: '豪有钱'
        }],
        value: 'vip-loan',
        options1: [{
          value: 'wx',
          label: '微信'
        }],
        value1: 'wx'
      }
    }
  }
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
</style>
