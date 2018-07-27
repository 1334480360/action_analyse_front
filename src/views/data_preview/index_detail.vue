<template>
  <div class="widget-container" data-chart-type="number" data-widgetid="1489" data-size="mini">
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
        <div class="no-display" data-container="side"></div>
        <div class="col-md-12 only" data-container="main">
          <div class="dashboard-number-container number-type2">
            <div class="inner">
              <div class="main-number-content">
                <div class="">
                  <div>{{detail.dateStr}}</div>
                  <div class="number-content clearfix">
                    <span class="number" :data-origindata="detail.value" :title="detail.value">{{detail.value}}</span>
                    <span class="measuresUnit">{{detail.unit}}</span>
                    <div class="mom-yoy-content">
                      <div class="MOM-content">
                        <div data-toggle="tooltip" data-placement="top" :data-original-title="detail.monthToMonthDesc">
                          <span class="measuresUnit">环比</span>
                          <span data-yoy-mom="19.05%" class="kpi-drop">
                  <span class="icon-falling"></span>
                  <span>{{detail.monthToMonth}}%</span>
                </span>
                        </div>
                      </div>
                      <div>
                        <div data-toggle="tooltip" data-placement="top" data-original-title="对比7-15(日)下降37.04%">
                          <span class="measuresUnit">同比</span>
                          <span data-yoy-mom="37.04%" class="kpi-drop">
                  <span class="icon-falling"></span>
                  <span>{{detail.yearToYear}}%</span>
                </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {indexDetail} from "../../api/module_index";
  import {formatCurrency} from '../../assets/common';

  export default {
    props: {
      data: {
        required: true,
        type: Object
      },
      code: {
        required: true,
        type: String
      }
    },
    data() {
      return {
        detail: []
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

          this.$store.commit('addToAutoRefreshChartList', this.getIndexDetail);
        });
      }
    }
  }
</script>

<style scoped>
  @import "../../styles/components.css";
  @import "../../styles/bootstrap.min.css";
</style>
