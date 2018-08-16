<template>
  <div>
    <section class="report-chart segmentation-chart">
      <header>
        <!-- 日期选择 -->
        <date-picker/>

        <div class="report-name-wrap">
          <h4 id="reportName" class="report-name">间隔分析</h4>
        </div>

        <div class="report-config btn-group">
          <!-- <div class="dropdown">
            <el-select v-model="value1" placeholder="线图" style="width: 80px" @change="chartChange">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div> -->
          <div class="dropdown">
            <el-select v-model="value2" placeholder="" style="width: 90px" @change="paramChange">
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
import DatePicker from '../../date/date-picker'
import {mapGetters} from 'vuex'
import RefreshHandler from '../../../utils/refresh-handler'

export default {
  name: 'chart_search',
  components: {
    DatePicker
  },
  computed: {
    ...mapGetters(['durationParam']),
    ...mapGetters(['chartType'])
  },
  watch: {
    chartType () {
      console.log('watch chartType------')
      this.value1 = this.chartType
    }
  },
  methods: {
    paramChange: function () {
      this.durationParam.granularity = this.value2

      this.$store.commit('updateDurationParam', this.durationParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    chartChange: function () {
      if (this.value1 === 'pie' && this.eventParam.dimensions[0] === 1) {
        this.$message('饼图只适用于有分组的查询')
        this.value1 = this.chartType
        return
      }
      this.$store.commit('updateChartType', this.value1)
    }
  },
  data () {
    return {
      options1: [{
        value: 'line',
        label: '线图'
      }, {
        value: 'bar',
        label: '柱图'
      }, {
        value: 'pie',
        label: '饼图'
      }],
      value1: this.chartType || 'line',

      options2: [ {
        value: 'day',
        label: '按天'
      }, {
        value: 'week',
        label: '按周'
      }, {
        value: 'month',
        label: '按月'
      }],
      value2: 'day'
    }
  }
}
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";

  .btn-group {
    position: absolute;
    right: 10px;
  }
</style>
