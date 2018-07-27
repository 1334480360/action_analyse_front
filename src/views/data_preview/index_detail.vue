<template>
  <div class="widget-container" data-chart-type="number" data-widgetid="1489" data-size="mini">
    <div class="widget-content-container">
      <div class="mark-contend"></div>
      <div class="widget-topbar" style="cursor: auto;">
        <div class="widget-title"><div class="title">
          <span>注册量</span>
        </div>
          <div class="range">2018-07-16<span>~</span>2018-07-22</div>
        </div>
        <div class="pull-right widget-setting">
          <div class="customer-menu"></div>
        </div>
      </div>
      <div class="widget-chart-container container"><div class="no-display" data-container="side"></div>
        <div class="col-md-12 only" data-container="main"><div class="dashboard-number-container number-type2">
          <div class="inner">
            <div class="main-number-content">
              <div class="">
                <div>7-22(日)</div>
                <div class="number-content clearfix">
                  <span class="number" data-origindata="17" title="17">17</span>
                  <span class="measuresUnit">人</span>
                  <div class="mom-yoy-content">
                    <div class="MOM-content">
                      <div data-toggle="tooltip" data-placement="top" data-original-title="对比7-21(六)下降19.05%">
                        <span class="measuresUnit">环比</span>
                        <span data-yoy-mom="19.05%" class="kpi-drop">
                  <span class="icon-falling"></span>
                  <span>19.05%</span>
                </span>
                      </div>
                    </div>
                    <div>
                      <div data-toggle="tooltip" data-placement="top" data-original-title="对比7-15(日)下降37.04%">
                        <span class="measuresUnit">同比</span>
                        <span data-yoy-mom="37.04%" class="kpi-drop">
                  <span class="icon-falling"></span>
                  <span>37.04%</span>
                </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mobile-mom-yoy-content">
              <div class="MOM-content">
                <div data-toggle="tooltip" data-placement="top" data-original-title="对比7-21(六)下降19.05%">
                  <span class="measuresUnit">环比</span>
                  <span data-yoy-mom="19.05%" class="kpi-drop">
            <span class="icon-falling"></span>
            <span>19.05%</span>
          </span>
                </div>
              </div>
              <div>
                <div data-toggle="tooltip" data-placement="top" data-original-title="对比7-15(日)下降37.04%">
                  <span class="measuresUnit">同比</span>
                  <span data-yoy-mom="37.04%" class="kpi-drop">
            <span class="icon-falling"></span>
            <span>37.04%</span>
          </span>
                </div>
              </div>
            </div>
            <div class="second-number-content">
              <div>
                <span>合计</span>
                <span class="number" title="163" data-origindata="163">163</span>
                <span class="measuresUnit">人</span>
              </div>
              <div>
                <span>均值</span>
                <span class="number" title="23.29" data-origindata="23.29">23.29</span>
                <span class="measuresUnit">人</span>
              </div>
            </div>
          </div>
        </div></div></div>
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
