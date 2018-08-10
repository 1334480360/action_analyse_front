<template>
  <div id="sa-main" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight: 300;color: #777C7C;font-size: 14px;line-height: 1.42857143;">
    <div class="fixed-top-bar">
      <div class="bookmark-tool-bar">
        <div class="analyse-top">
          <div class="bookmark-title-container">
            <span class="bookmark-title" contenteditable="false">分布分析</span>
          </div>
          <el-select v-model="value" filterable placeholder="请选择项目" style="width: 110px;" @change="appNameChange">
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

      <chart-search/>

      <!--图表搜索条件-->
      <chart-table :table-data="tableData" v-loading="loading"/>

    </div>
  </div>
</template>

<script>
  import Search from './search'
  import ChartSearch from './chart_search'
  import ChartTable from './chart_table'

  import {mapGetters} from 'vuex'
  import {queryDistribution} from "../../../api/module_index";

  export default {
    name: 'index',
    components: {
      Search,
      ChartSearch,
      ChartTable,
    },
    computed: {
      ...mapGetters(['disParam']),
    },
    created() {
      this.GLOBAL.beginDate = this.disParam.beginDate;
      this.GLOBAL.endDate = this.disParam.endDate;
      this.appNameChange();
    },
    mounted() {
      this.queryDistribution();
    },
    beforeDestroy() {
      this.$store.commit('clearChartList');
      this.$store.commit('initParam');
    },
    methods: {
      refresh: function () {
        this.$store.commit('updateAutoRefreshCode', Math.random());
      },
      appNameChange: function () {
        this.disParam.appName = this.value;
        this.$store.commit('updateDisParam', this.disParam);
        this.$store.commit('updateAppName', this.value);

        this.$store.commit('updateAutoRefreshCode', Math.random());
      },
      async queryDistribution() {
        this.loading = true;
        queryDistribution(this.disParam).then(res => {
          if(res.data.result === 'fail') {
            this.$message.error(res.data.message);
          }
          this.tableData = res.data.data;

          this.loading = false;

          //添加方法到自动刷新列表
          this.$store.commit('addToAutoRefreshChartList', this.queryDistribution);
        });
      }
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
        value: 'my-dafy',
        tableData: [],
        loading: true,
      }
    }
  }
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
</style>
