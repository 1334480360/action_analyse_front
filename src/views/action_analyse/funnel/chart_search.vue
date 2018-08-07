<template>
  <div>
    <section class="report-chart segmentation-chart funnel-container">
      <header>
        <date-picker/>
        <div class="report-date-picker-tip" style="display: inline-block; width: auto">
          <span>窗口期:</span>
          <div class="content" v-if="funnelInfo.period === 0">当天</div>
          <div class="content" v-else>{{funnelInfo.period}}天</div>
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
               style="float: left; margin-left: 5px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative; background: transparent;"
               _echarts_instance_="ec_1533625622868">

            <div style="position: relative;margin-top: -25px;text-align: center;padding-top: 5px; font-size: 13px; color: rgba(0,0,0,0.38);">
              <span>总转化情况</span>
            </div>
            <div style="position: relative; overflow: hidden; width: 621px; height: 380px; cursor: default;">
              <section class="report-chart"
                       style="padding-bottom: 20px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative; background: transparent;">
                <line-chart :chart-data="[]" :total-show="false" v-loading="loading"></line-chart>
              </section>
            </div>

          </div>
        </div>
      </div>


    </section>
  </div>
</template>

<script>
  import LineChart from '../../components/LineChart'
  import LineAreaChart from '../../components/LineAreaChart'
  import PieChart from '../../components/PieChart'
  import BarChart from '../../components/BarChart'

  import DatePicker from '../../date/date-picker'
  import Funnel from './funnel'
  import {mapGetters} from 'vuex'
  import RefreshHandler from '../../../utils/refresh-handler'

  import {queryFunnel} from "../../../api/module_index";

  export default {
    name: 'chart_search',
    components: {
      DatePicker,
      Funnel,
      LineChart,
      LineAreaChart,
      PieChart,
      BarChart
    },
    mounted() {
      this.queryFunnel();
    },
    data() {
      return {
        loading: true,
        funnelInfo: {}
      }
    },
    methods: {
      async queryFunnel() {
        this.loading = true;
        queryFunnel('2018-08-01', '2018-08-02', 51, 1).then(res => {
          this.funnelInfo = res.data.data;

          this.loading = false;

          //添加方法到自动刷新列表
          this.$store.commit('addToAutoRefreshChartList', this.queryFunnel);
        });
      }
    },
  }
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
</style>
