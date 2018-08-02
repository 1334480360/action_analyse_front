<template>
  <div>
    <section class="report-chart segmentation-chart">
      <header>
        <date-picker/>

        <div class="report-name-wrap">
          <h4 id="reportName" class="report-name">任意事件的总次数</h4>
        </div>

        <div class="report-config btn-group">
          <div class="dropdown">
            <el-select v-model="value1" placeholder="线图" style="width: 80px">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="dropdown">
            <el-select v-model="value2" placeholder="" style="width: 90px">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </header>
      <div class="report-no-data" style="display:none;">
        <div class="report-no-data-msg">
          <h5>没有查找到数据</h5>
          <p>请尝试调整时间段或筛选条件</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import DatePicker from '../date/date-picker'
  export default {
    name: 'chart_search',
    components: {
      DatePicker
    },
    data() {
      return {
        options1: [{
          value: 'line',
          label: '线图'
        }, {
          value: 'column',
          label: '柱图'
        }, {
          value: 'pie',
          label: '饼图'
        }, {
          value: 'areaspline',
          label: '累积'
        }],
        value1: 'line',


        options2: [{
          value: 'minute',
          label: '按分钟'
        }, {
          value: 'hour',
          label: '按小时'
        }, {
          value: 'day',
          label: '按天'
        }, {
          value: 'week',
          label: '按周'
        }, {
          value: 'month',
          label: '按月'
        }],
        value2: 'day',
      }
    }
  }
</script>

<style scoped>
  @import "../../styles/components.css";
  @import "../../styles/compnent.index.css";
  @import "../../styles/bootstrap.min.css";

  .btn-group {
    position: absolute;
    right: 10px;
  }
</style>
