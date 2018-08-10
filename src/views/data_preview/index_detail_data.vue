<!--只有数字-->
<template>
  <div class="widget-container" data-chart-type="number" data-widgetid="92" data-size="normal">
    <div class="widget-content-container">
      <div class="mark-contend"></div>
      <div class="widget-topbar" style="cursor: auto;">
        <div class="widget-title">
          <div class="title">
            <a>{{detail.title}}</a>
          </div>
          <div class="range">
            {{this.GLOBAL.endDate}}
          </div>
        </div>
        <div class="pull-right widget-setting">
          <div class="customer-menu"></div>
        </div>
      </div>
      <div class="widget-chart-container container">
        <div class="col-md-12" data-container="side"></div>
        <div class="col-md-12 only" data-container="main">
          <div class="dashboard-number-container ">
            <div class="inner">
              <div class="user-analytics-content">
                <span>{{detail.value}}</span><span></span>
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
          if(res.data.result === 'fail') {
            this.$message.error(res.data.message);
          }
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
