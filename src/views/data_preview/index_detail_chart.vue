<!--图表-->
<template>
  <div class="widget-container" data-chart-type="line" data-widgetid="15" data-size="normal">
    <div class="widget-content-container">
      <div class="mark-contend"></div>
      <div class="widget-topbar" style="cursor: auto;">
        <div class="widget-title">
          <div class="title nav">
            <a>{{detail.title}}</a>
            <span class="icon-failed" style="display: none;"></span>
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
                    <span class="number" :data-origindata="detail.valueDetail" :title="detail.valueDetail">{{detail.value || 0}}</span>
                    <span class="measuresUnit">{{detail.unit}}</span>
                    <div class="mom-yoy-content">
                      <div class="MOM-content">
                        <el-tooltip class="item" effect="dark" :content="detail.monthToMonthDesc" placement="top">
                          <div>
                            <span class="measuresUnit">环比</span>
                            <span :data-yoy-mom="detail.monthToMonth + '%'" :class="detail.monthRise ? 'kpi-rise' : 'kpi-drop'">
                              <span class="icon-rising" v-if="detail.monthRise"></span>
                              <span class="icon-falling" v-else></span>
                              <span>{{detail.monthToMonth || 0}}%</span>
                            </span>
                          </div>
                        </el-tooltip>
                      </div>
                      <div>
                        <el-tooltip class="item" effect="dark" :content="detail.yearToYearDesc" placement="top">
                          <div>
                            <span class="measuresUnit">同比</span>
                            <span :data-yoy-mom="detail.yearToYear + '%'" :class="detail.yearRise ? 'kpi-rise' : 'kpi-drop'">
                              <span class="icon-rising" v-if="detail.yearRise"></span>
                              <span class="icon-falling" v-else></span>
                              <span>{{detail.yearToYear || 0}}%</span>
                            </span>
                          </div>
                        </el-tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="second-number-content">
                <div>
                  <span>合计</span>
                  <span class="number" :title="detail.totalValueDetail" :data-origindata="detail.totalValueDetail">{{detail.totalValue}}</span>
                  <span class="measuresUnit" v-show="detail.totalValue !== '--'">{{detail.totalUnit}}</span>
                </div>
                <div>
                  <span>均值</span>
                  <span class="number" :title="detail.avgValueDetail" :data-origindata="detail.avgValueDetail">{{detail.avgValue}}</span>
                  <span class="measuresUnit" v-show="detail.avgValue !== '--'">{{detail.avgUnit}}</span>
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

  import {indexDetail} from "../../api/module_index";
  import {unitConvert} from '../../assets/common';
  import {numConvert} from '../../assets/common';
  import {isRise} from '../../assets/common';
  import {remove} from '../../assets/common';

  import {mapGetters} from 'vuex'

  export default {
    components: {
      LineChart,
      LineAreaChart,
      PieChart,
      BarChart
    },
    data() {
      return {
        detail: [],
      }
    },
    computed: {
      ...mapGetters(['appName'])
    },
    created() {
      this.getIndexDetail();
    },
    beforeDestroy() {
      this.$store.commit('clearChartList')
    },
    methods: {
      async getIndexDetail() {
        indexDetail(this.data.id, this.code, this.GLOBAL.beginDate, this.GLOBAL.endDate, this.appName).then(res => {
          if(res.data.result === 'fail') {
            this.$message.error(res.data.message);
          }
          this.detail = res.data.data;

          //单位自适应
          let value = this.detail.value;
          let totalValue = this.detail.totalValue;
          let avgValue = this.detail.avgValue;
          let unit = this.detail.unit;

          this.detail.valueDetail = value;
          this.detail.totalValueDetail = totalValue;
          this.detail.avgValueDetail = avgValue;

          this.detail.value = numConvert(value, unit);
          this.detail.unit = unitConvert(value, unit);

          this.detail.totalValue = numConvert(totalValue, unit);
          this.detail.totalUnit = unitConvert(totalValue, unit);

          this.detail.avgValue = numConvert(avgValue, unit);
          this.detail.avgUnit = unitConvert(avgValue, unit);

          //环比同比
          this.detail.monthRise = true;
          this.detail.yearRise = true;
          if (!isRise(this.detail.monthToMonth)) {
            this.detail.monthRise = false;
            this.detail.monthToMonth = remove(this.detail.monthToMonth, '-');
          }
          if (!isRise(this.detail.yearToYear)) {
            this.detail.yearRise = false;
            this.detail.yearToYear = remove(this.detail.yearToYear, '-');
          }

          //添加方法到自动刷新列表
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
  @import "../../styles/compnent.index.css";
  @import "../../styles/bootstrap.min.css";
</style>
