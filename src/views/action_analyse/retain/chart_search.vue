<template>
  <div>
    <section class="report-chart segmentation-chart">
      <header>
        <date-picker/>

        <div class="report-name-wrap">
          <h4 id="reportName" class="report-name">{{title}}分析</h4>
        </div>
        <div class="report-config btn-group">
            <div class="dropdown">
              <el-select v-model="value" placeholder="留存" style="width: 120px;" @change="paramChange">
                <el-option-group
                  v-for="group in options"
                  :key="group.label"
                  :label="group.label">
                  <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-option-group>
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
    ...mapGetters(['retainParam'])
  },
  methods: {
    paramChange: function () {
      this.retainParam.duration = this.value.split('-')[0] || ''
      this.retainParam.unit = this.value.split('-')[1] || ''
      this.title = this.handleTitle(this.value)
      this.$store.commit('updateRetainParam', this.retainParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    handleTitle (type) {
      const data = {
        '1-day': '次天留存',
        '7-day': '7天留存',
        '14-day': '14天留存',
        '30-day': '30天留存',
        '1-week': '次周留存',
        '8-week': '8周留存',
        '12-week': '12周留存',
        '24-week': '24周留存',
        '1-month': '次月留存',
        '6-month': '6个月留存',
        '12-month': '12个月留存',
        '24-month': '24个月留存'
      }
      return data[type]
    }
  },
  data () {
    return {
      options: [{
        label: '日留存',
        options: [{
          value: '1-day',
          label: '次天留存'
        }, {
          value: '7-day',
          label: '7天留存'
        }, {
          value: '14-day',
          label: '14天留存'
        }, {
          value: '30-day',
          label: '30天留存'
        }]
      }, {
        label: '周留存',
        options: [{
          value: '1-week',
          label: '次周留存'
        }, {
          value: '8-week',
          label: '8周留存'
        }, {
          value: '12-week',
          label: '12周留存'
        }, {
          value: '24-week',
          label: '24周留存'
        }]
      }, {
        label: '月留存',
        options: [{
          value: '1-month',
          label: '次月留存'
        }, {
          value: '6-month',
          label: '6个月留存'
        }, {
          value: '12-month',
          label: '12个月留存'
        }, {
          value: '24-month',
          label: '24个月留存'
        }]
      }],
      value: '7-day',
      title: '7天留存'
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
