<template>
  <div>
    <section class="report-chart segmentation-chart funnel-container">
      <header>
        <date-picker/>
        <div class="report-date-picker-tip" style="display: inline-block; width: auto">
          <span>窗口期:</span>
          <div class="content">{{funnelInfo.period === 0 ? '当' : funnelInfo.period}}天</div>
        </div>

        <div class="report-name-wrap">
          <h4 id="reportName" class="report-name">{{funnelInfo.funnelName}}漏斗</h4>
        </div>
      </header>

      <div class="container-fluid">
        <div class="row trend-funnel" style="display: block;">
          <div id="funnelContainer" class="funnel-container" style="float: left;">
            <div class="funnel-content ">
              <!--漏斗-->
              <funnel v-for="(funnel, index) in funnelInfo.funnelStepVoList" :index="index" :key="index" :funnel="funnel"/>
            </div>
          </div>
          <!--漏斗图表-->
          <div id="chartContainer" class="chart-container"
               style="float: left; margin-left: 5px; -webkit-tap-highlight-color: transparent; user-select: none;
                position: relative; background: transparent; height: auto; margin-top: 50px;"
               _echarts_instance_="ec_1533625622868">

            <div style="position: relative;margin-top: -25px;text-align: center;padding-top: 5px; font-size: 13px; color: rgba(0,0,0,0.38);">
              <span v-if="activeFunnelIndex === 0">总转化情况（%）</span>
              <span v-else>第{{activeFunnelIndex}}步转化率（%）</span>
            </div>
            <div style="position: relative; overflow: hidden; cursor: default;">
              <section class="report-chart"
                       style="padding-bottom: 20px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative; background: transparent;">
                <line-chart :chart-data="charts" :total-show="false" v-loading="loading"></line-chart>
              </section>
            </div>

          </div>
        </div>
      </div>


    </section>

    <div class="page-part-h-split" style=""></div>
    <!--表格-->
    <chart-table-total :table-data="tableDataTotal" :step-title="stepTitleTotal" v-loading="loading" v-if="activeFunnelIndex === 0"/>
    <chart-table :table-data="tableData" v-loading="loading" v-else/>
  </div>
</template>

<script>
  import LineChart from '../../components/LineChart'
  import LineAreaChart from '../../components/LineAreaChart'
  import PieChart from '../../components/PieChart'
  import BarChart from '../../components/BarChart'
  import ChartTable from './chart_table'
  import ChartTableTotal from './chart_table_total'

  import DatePicker from '../../date/date-picker'
  import Funnel from './funnel'
  import RefreshHandler from '../../../utils/refresh-handler'

  import {queryFunnel} from "../../../api/module_index";
  import {mapGetters} from 'vuex'

  export default {
    name: 'chart_search',
    components: {
      DatePicker,
      Funnel,
      LineChart,
      LineAreaChart,
      PieChart,
      BarChart,
      ChartTable,
      ChartTableTotal,
    },
    computed: {
      ...mapGetters(['activeFunnelIndex']),
      ...mapGetters(['funnelParam']),
    },
    mounted() {
      this.queryFunnel();
    },
    beforeDestroy() {
      this.$store.commit('clearChartList');
    },
    watch: {
      activeFunnelIndex() {
        console.log('watch activeFunnelIndex------');
        this.setCharts();
        this.setTableDataTotal();
        this.setTableData();
      },
    },
    data() {
      return {
        loading: true,
        funnelInfo: {},
        charts: [],
        tableDataTotal: [],
        stepTitleTotal: [],
        tableData: [],
      }
    },
    methods: {
      async queryFunnel() {
        this.loading = true;
        queryFunnel(this.funnelParam).then(res => {
          this.funnelInfo = res.data.data;

          this.setCharts();
          this.setTableDataTotal();
          this.setTableData();

          this.loading = false;

          //添加方法到自动刷新列表
          this.$store.commit('addToAutoRefreshChartList', this.queryFunnel);
        });
      },
      setTableDataTotal: function () {
        this.stepTitleTotal = [];
        this.tableDataTotal = this.funnelInfo.funnelStepVoList[0].funnelTotalGroupVoList;
        let count = this.tableDataTotal[0].counts.length - 1;
        for(let i=1; i<=count; i++){
          this.stepTitleTotal.push('第' + i + '步');
        }
      },
      setTableData: function () {
        this.tableData = this.funnelInfo.funnelStepVoList[this.activeFunnelIndex].funnelGroupVoList;
        console.log(this.tableData);
      },
      setCharts: function () {
        let funnels = JSON.parse(JSON.stringify(this.funnelInfo))
        this.charts = [];
        let funnel = funnels.funnelStepVoList[this.activeFunnelIndex];
        const isTotal = this.activeFunnelIndex === 0;
        let funnelGroupVoList = isTotal ? funnel.funnelTotalGroupVoList : funnel.funnelGroupVoList;


        for(let i=0; i<funnelGroupVoList.length; i++){
          let funnelGroupVo = funnelGroupVoList[i];
          if(funnelGroupVo.dimensionName === 'unknown'){
            continue;
          }

          let dailyVoList = funnelGroupVo.dailyVoList;

          let chart = {};
          chart.dimension=funnelGroupVo.dimensionName;
          let datas = [];

          for(let j=0; j<dailyVoList.length; j++){
            let dailyVo = dailyVoList[j];
            let data = {};
            data.name = funnelGroupVo.dimensionName;
            data.date = dailyVo.date;
            if (isTotal) {
              data.value = dailyVo.convertRates[0].toFixed(2);
            } else {
              data.value = dailyVo.convertRate.toFixed(2);
            }
            datas.push(data);
          }
          chart.datas = datas;
          this.charts.push(chart);
        }
      },
    },
  }
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
</style>
