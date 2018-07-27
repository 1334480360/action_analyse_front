<template>
  <div class="widget-container" data-chart-type="number" data-widgetid="92" data-size="normal">
    <div class="widget-content-container">
      <div class="mark-contend"></div>
      <div class="widget-topbar" style="cursor: auto;">
        <div class="widget-title">
          <div class="title">
            <span>剩余本金</span>
          </div>
          <div class="range"></div>
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
                <span>17,290,501,361</span><span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {},
    beforeDestroy () {
      this.$store.commit('clearChartList')
    },
  }
</script>

<style scoped>
  @import "../../styles/components.css";
  @import "../../styles/bootstrap.min.css";
</style>
