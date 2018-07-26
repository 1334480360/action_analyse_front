<template>
  <div class="widget-container" data-chart-type="line" data-widgetid="15" data-size="normal">
    <div class="widget-content-container">
      <div class="mark-contend"></div>
      <div class="widget-topbar" style="cursor: auto;">
        <div class="widget-title">
          <div class="title">
            <span>{{detail.title}}</span>
          </div>
          <div class="range">{{detail.beginDate}}<span>~</span>{{detail.endDate}} | 过去 30 天</div>
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
                  <div>7-23(一)</div>
                  <div class="number-content clearfix">
                    <span class="number" data-origindata="2131" title="2131">{{detail.value}}</span>
                    <span class="measuresUnit">人</span>
                    <div class="mom-yoy-content">
                      <div class="MOM-content">
                        <div data-toggle="tooltip" data-placement="top" :data-original-title="detail.monthToMonthDesc">
                          <span class="measuresUnit">环比</span>
                          <span :data-yoy-mom="detail.monthToMonth + '%'" class="kpi-rise">
                  <span class="icon-rising"></span>
                  <!--<span class="icon-falling"></span>-->
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
              <div class="mobile-mom-yoy-content">
                <div class="MOM-content">
                  <div data-toggle="tooltip" data-placement="top" data-original-title="对比7-22(日)增长3.4%">
                    <span class="measuresUnit">环比</span>
                    <span data-yoy-mom="3.4%" class="kpi-rise">
            <span class="icon-rising"></span>
            <span>3.4%</span>
          </span>
                  </div>
                </div>
                <div>
                  <div data-toggle="tooltip" data-placement="top" data-original-title="对比7-16(一)增长3.65%">
                    <span class="measuresUnit">同比</span>
                    <span data-yoy-mom="3.65%" class="kpi-rise">
            <span class="icon-rising"></span>
            <span>3.65%</span>
          </span>
                  </div>
                </div>
              </div>
              <div class="second-number-content">
                <div>
                  <span>合计</span>
                  <span class="number" title="27027" data-origindata="27027">{{detail.totalValue}}</span>
                  <span class="measuresUnit">{{detail.unit}}</span>
                </div>
                <div>
                  <span>均值</span>
                  <span class="number" title="1898.87" data-origindata="1898.87">{{detail.avgValue}}</span>
                  <span class="measuresUnit">{{detail.unit}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-12" v-show="data.chartType != null">
          <keep-alive>
            <line-chart :chart-data="lineChartData" :total-show="data.hasStat == 1" v-if="data.chartType === 'line'"></line-chart>
            <bar-chart :total-show="data.hasStat == 1" v-else-if="data.chartType === 'column'"></bar-chart>
            <pie-chart :total-show="data.hasStat == 1" v-else-if="data.chartType === 'pie'"></pie-chart>
            <area-chart :chart-data="lineChartData" :total-show="data.hasStat == 1" v-else-if="data.chartType === 'areaspline'"></area-chart>
          </keep-alive>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import LineChart from '../components/LineChart'
  import PieChart from '../components/PieChart'
  import BarChart from '../components/BarChart'
  import BoxCard from '../components/BoxCard'
  import AreaChart from "../components/AreaChart";

  import {indexDetail} from "../../api/module_index";

  const lineChartData = {
    newVisitis: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    }
  };

  export default {
    components: {
      AreaChart,
      LineChart,
      PieChart,
      BarChart,
      BoxCard
    },
    data() {
      return {
        lineChartData: lineChartData.newVisitis,
        detail: []
      }
    },
    mounted() {
      this.getIndexDetail();
    },
    methods: {
      handleSetLineChartData(type) {
        this.lineChartData = lineChartData[type]
      },
      async getIndexDetail() {
        indexDetail(this.data.id, this.code, '2018-07-10', '2018-07-24').then(res => {
          this.detail = res.data.data;
          console.log(this.detail);
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
