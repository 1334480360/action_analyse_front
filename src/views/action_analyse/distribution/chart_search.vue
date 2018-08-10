<template>
  <div>
    <section class="report-chart segmentation-chart">
      <header>
        <date-picker/>

        <div class="report-name-wrap">
          <h4 id="reportName" class="report-name">用户一天内进行任意事件的次数</h4>
        </div>

        <div class="report-config btn-group">
          <div class="dropdown">
            <el-select v-model="value" placeholder="粒度" style="width: 80px" @change="paramChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </header>
    </section>
  </div>
</template>

<script>
  import DatePicker from '../../date/date-picker'
  import {mapGetters} from 'vuex'

  export default {
    name: 'chart_search',
    components: {
      DatePicker
    },
    computed: {
      ...mapGetters(['disParam']),
    },
    methods: {
      paramChange: function () {
        this.disParam.granularity = this.value;
        this.$store.commit('updateDisParam', this.disParam);
        this.$store.commit('updateAutoRefreshCode', Math.random());
      },
    },
    data() {
      return {
        options: [{
          value: '',
          label: '全部'
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
        value:'day',
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
