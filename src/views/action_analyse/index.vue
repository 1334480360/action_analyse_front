<template>
  <div id="sa-main" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight: 300;color: #777C7C;font-size: 14px;line-height: 1.42857143;">
    <div id="bookmark-save-bar" class="fixed-top-bar">
      <div class="bookmark-tool-bar" data-id="">
        <div class="from-dashboard-back" style="display:none">
          <a data-method="from-dash-back"><!--{en}Back--><!--{cn}--><span class="icon-arrow-left"></span>
            返回<!--/{cn}--></a>
        </div>
        <div class="analyse-top">
          <div class="bookmark-title-container">
            <span class="bookmark-title" contenteditable="false">事件分析</span>
            <span class="icon-help" style="display: none;"></span>
          </div>
          <span class="sa-h-split" style="display:none"></span>
        </div>
      </div>
    </div>
    <div class="sa-report">
      <!--数据搜索条件-->
      <search/>

      <!--图表搜索条件-->
      <chart-search/>
      <!--图表模块-->
      <section id="chartsContainer" class="report-chart"
               style="padding-bottom: 20px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative; background: transparent;"
               _echarts_instance_="ec_1533040258316">
        <line-chart :chart-data="charts" :total-show="false"></line-chart>
      </section>

      <!--间隔面板-->
      <div class="page-part-h-split" style=""></div>
      <div class="page-data-truncated" style="display: none;"></div>

      <!--导出-->
      <div class="table-config clearfix" style="display: block;">
        <div class="input-icon-wrap pull-left">
          <span data-method="search" class="icon-search" style="display: none;"></span>
          <input data-method="search" data-last="" data-timeout="" type="text" class="form-control" placeholder="按分组筛选"
                 style="width:200px;display:none;">
          <label data-method="rollup" class="sa-checkbox" style="display: none;">
            <input id="chk-rollup-display" type="checkbox" data-method="checkbox">
            <label for="chk-rollup-display"></label>
            <span>显示合计</span>
          </label>
        </div>
        <div class="btn-group pull-right" role="group" aria-label="...">
          <button data-method="export" type="button" style="margin-left: 10px; width: 76px;"
                  class="btn btn-default btn-icon" data-placement="bottom" data-toggle="tooltip"
                  data-original-title="导出表格中数据 csv">
            <span class="icon-export" style="vertical-align: sub;"></span>
            <span style="display: inline-block;line-height: 20px;">导出</span>
          </button>
        </div>
        <div class="btn-group pull-right" role="group" aria-label="...">
          <button data-method="transfer" type="button" class="btn btn-default btn-icon">
            <span class="icon-reverse"></span>
          </button>
          <button data-method="percent" type="button" class="btn btn-default btn-icon">
            <span class="icon-percentage" aria-hidden="true"></span>
          </button>
        </div>
      </div>
      <!--表格-->
      <chart-table/>

      <div class="modal fade" id="config-axis-container" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"></div>
    </div>
  </div>
</template>

<script>
  import LineChart from '../components/LineChart'
  import LineAreaChart from '../components/LineAreaChart'
  import PieChart from '../components/PieChart'
  import BarChart from '../components/BarChart'

  import Search from './search'
  import ChartSearch from './chart_search'
  import ChartTable from './chart_table'

  export default {
    name: 'test',
    components: {
      Search,
      ChartSearch,
      ChartTable,
      LineChart,
      LineAreaChart,
      PieChart,
      BarChart
    },
    data() {
      return {
        charts: [{
          dimension: "Web浏览页面的触发用户数1",
          datas: [
            {
              date: "7-10",
              name: "Web浏览页面的触发用户数",
              value: "74129",
              unit: "人"
            },
            {
              date: "7-11",
              name: "Web浏览页面的触发用户数",
              value: "61009",
              unit: "人"
            }
          ]
        },{
          dimension: "Web浏览页面的触发用户数2",
          datas: [
            {
              date: "7-10",
              name: "Web浏览页面的触发用户数",
              value: "7419",
              unit: "人"
            },
            {
              date: "7-11",
              name: "Web浏览页面的触发用户数",
              value: "6109",
              unit: "人"
            }
          ]
        },{
          dimension: "Web浏览页面的触发用户数3",
          datas: [
            {
              date: "7-10",
              name: "Web浏览页面的触发用户数",
              value: "34129",
              unit: "人"
            },
            {
              date: "7-11",
              name: "Web浏览页面的触发用户数",
              value: "61009",
              unit: "人"
            }
          ]
        }]
      }
    }
  }
</script>

<style scoped>
  @import "../../styles/components.css";
  @import "../../styles/compnent.index.css";
  @import "../../styles/bootstrap.min.css";
  #chartsContainer {
    min-height: auto;
    overflow: hidden;
    zoom: 1;
  }
</style>
