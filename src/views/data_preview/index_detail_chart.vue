<!--图表-->
<template>
  <div class="widget-container" data-chart-type="line" data-widgetid="15" data-size="normal">
    <div class="widget-content-container">
      <div class="mark-contend"></div>
      <div class="widget-topbar" style="cursor: auto;">
        <div class="widget-title">
          <div class="title">
            <a>{{detail.title}}</a>
          </div>
          <div class="range">{{detail.beginDate}}<span>~</span>{{detail.endDate}}</div>
        </div>
        <div class="pull-right widget-setting">
          <div class="customer-menu"></div>
        </div>
      </div>
      <div class="widget-chart-container container">
        <div class="col-md-12" data-container="side" v-show="data.hasStat == 1">
          <div class="dashboard-number-container number-type3">
            <div class="inner">
              <div class="main-number-content">
                <div class="">
                  <div>{{detail.dateStr}}</div>
                  <div class="number-content clearfix">
                    <span class="number" data-origindata="2131" title="2131">{{detail.value}}</span>
                    <span class="measuresUnit">{{detail.unit}}</span>
                    <div class="mom-yoy-content">
                      <div class="MOM-content">
                        <div data-toggle="tooltip" data-placement="top" :data-original-title="detail.monthToMonthDesc">
                          <span class="measuresUnit">环比</span>
                          <span :data-yoy-mom="detail.monthToMonth + '%'" class="kpi-rise">
                  <span class="icon-falling"></span>
                            <!--<span class="icon-rising"></span>-->
                  <span>{{detail.monthToMonth}}%</span>
                </span>
                        </div>
                      </div>
                      <div>
                        <div data-toggle="tooltip" data-placement="top" :data-original-title="detail.yearToYearDesc">
                          <span class="measuresUnit">同比</span>
                          <span :data-yoy-mom="detail.yearToYear + '%'" class="kpi-rise">
                  <span class="icon-rising"></span>
                  <span>{{detail.yearToYear}}%</span>
                </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="second-number-content">
                <div>
                  <span>合计</span>
                  <span class="number" :title="detail.totalValue" :data-origindata="detail.totalValue">{{detail.totalValue}}</span>
                  <span class="measuresUnit">{{detail.unit}}</span>
                </div>
                <div>
                  <span>均值</span>
                  <span class="number" :title="detail.avgValue" :data-origindata="detail.avgValue">{{detail.avgValue}}</span>
                  <span class="measuresUnit">{{detail.unit}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-12" v-show="data.chartType != null">
          <keep-alive>
            <line-chart :chart-data="detail.charts" :total-show="data.hasStat == 1" v-if="data.chartType === 'line'"></line-chart>
            <bar-chart :chart-data="detail.charts" :total-show="data.hasStat == 1" v-else-if="data.chartType === 'column'"></bar-chart>
            <pie-chart :chart-data="detail.charts" :total-show="data.hasStat == 1" v-else-if="data.chartType === 'pie'"></pie-chart>
            <line-area-chart :chart-data="detail.charts" :total-show="data.hasStat == 1" v-else-if="data.chartType === 'areaspline'"></line-area-chart>
          </keep-alive>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import LineChart from '../components/LineChart'
  import LineAreaChart from '../components/LineAreaChart'
  import PieChart from '../components/PieChart'
  import BarChart from '../components/BarChart'
  import BoxCard from '../components/BoxCard'

  import {indexDetail} from "../../api/module_index";
  import {formatCurrency} from '../../assets/common';

  export default {
    components: {
      LineChart,
      LineAreaChart,
      PieChart,
      BarChart,
      BoxCard
    },
    data() {
      return {
        detail: [],
      }
    },
    created() {
      this.getIndexDetail();
    },
    beforeDestroy() {
      this.$store.commit('clearChartList')
    },
    methods: {
      async getIndexDetail() {
        indexDetail(this.data.id, this.code, this.GLOBAL.beginDate, this.GLOBAL.endDate).then(res => {
          this.detail = res.data.data;
          this.detail.value = formatCurrency(this.detail.value, this.detail.unit);
          this.detail.avgValue = formatCurrency(this.detail.avgValue, this.detail.unit);
          this.detail.totalValue = formatCurrency(this.detail.totalValue, this.detail.unit);

          this.$store.commit('addToAutoRefreshChartList', this.getIndexDetail);
        });
      }
    },
    props: {
      data: {
        required: true,
        type: Object
      },
      code: {
        required: true,
        type: String
      }
    }
  }
</script>

<style scoped>
  @import "../../styles/components.css";
  @import "../../styles/bootstrap.min.css";
</style>
