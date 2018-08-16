<!--筛选条件-->
<template>
  <div class="filter-item">
    <span class="property"></span>
    <div class="selector property" style="width: auto">
      <el-select v-model="value3" placeholder="请选择" filterable style="width: 180px" @change="paramChange">
        <el-option-group
          v-for="group in options3"
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
    <div class="selector function">
      <el-select v-model="value2" placeholder="请选择" style="width: 120px" @change="paramChange">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="input" style="position: absolute;margin-top: 4px;">
      <el-input v-model="value" placeholder="请输入内容" @change="paramChange"></el-input>
    </div>
    <div>
      <button type="button" class="btn btn-danger-small remove" style="margin-left: 210px;" @click="filterRemove"
              v-show="this.index === (this.filterItems.length - 1)">
        <span class="icon-remove"></span>
      </button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'search_filter',
  computed: {
    ...mapGetters(['filterItems']),
    ...mapGetters(['eventParam']),
    ...mapGetters(['funnelParam']),
    ...mapGetters(['disParam']),
    ...mapGetters(['retainParam']),
    ...mapGetters(['durationParam'])
  },
  props: {
    index: {
      required: true,
      type: Number
    },
    typeData: {
      type: Array
    }
  },
  mounted () {
    let length = this.options3[0].options.length
    if (length <= this.index) {
      this.value3 = this.options3[1].options[this.index - length].value
    } else {
      this.value3 = this.options3[0].options[this.index].value
    }
  },
  methods: {
    filterRemove: function () {
      this.$store.commit('removeFilterItems')

      // 事件分析
      this.$store.commit('removeEventParamFilter')
      this.$store.commit('updateEventParam', this.eventParam)
      // 漏斗分析
      this.$store.commit('removeFunnelParamFilter')
      this.$store.commit('updateFunnelParam', this.funnelParam)
      // 分布分析
      this.$store.commit('removeDisParamFilter')
      this.$store.commit('updateDisParam', this.disParam)
      // 留存分析
      this.$store.commit('removeRetainParamFilter')
      this.$store.commit('updateRetainParam', this.retainParam)
      // 间隔分析
      this.$store.commit('removeDurationParamFilter')
      this.$store.commit('updateDurationParam', this.durationParam)

      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    paramChange: function () {
      if (this.value === null || this.value === '') {
        return
      }

      let condition = {
        dimensionCode: this.value3,
        function: this.value2,
        params: [
          this.value
        ]
      }
      // 事件分析
      this.eventParam.filter.conditions[this.index] = condition
      if (this.eventParam.filter.conditions.length > 1 && (this.eventParam.filter.relation === '' || this.eventParam.filter.relation == null)) {
        this.eventParam.filter.relation = 'and'
      }
      this.$store.commit('updateEventParam', this.eventParam)

      // 漏斗分析
      this.funnelParam.filter.conditions[this.index] = condition
      if (this.funnelParam.filter.conditions.length > 1 && (this.funnelParam.filter.relation === '' || this.funnelParam.filter.relation == null)) {
        this.funnelParam.filter.relation = 'and'
      }
      this.$store.commit('updateFunnelParam', this.funnelParam)

      // 分布分析
      this.disParam.filter.conditions[this.index] = condition
      if (this.disParam.filter.conditions.length > 1 && (this.disParam.filter.relation === '' || this.disParam.filter.relation == null)) {
        this.disParam.filter.relation = 'and'
      }
      this.$store.commit('updateDisParam', this.disParam)

      // 留存分析
      this.retainParam.userFilter.conditions[this.index] = condition
      if (this.retainParam.userFilter.conditions.length > 1 && (this.retainParam.userFilter.relation === '' || this.retainParam.userFilter.relation == null)) {
        this.retainParam.userFilter.relation = 'and'
      }
      this.$store.commit('updateRetainParam', this.retainParam)

      // 间隔分析
      this.durationParam.userFilter.conditions[this.index] = condition
      if (this.durationParam.userFilter.conditions.length > 1 && (this.durationParam.userFilter.relation === '' || this.durationParam.userFilter.relation == null)) {
        this.durationParam.userFilter.relation = 'and'
      }
      this.$store.commit('updateDurationParam', this.durationParam)

      this.$store.commit('updateAutoRefreshCode', Math.random())
    }
  },
  data () {
    return {
      value: '',
      relation: 'and',
      options2: [{
        value: 'equal',
        label: '等于'
      }, {
        value: 'not_equal',
        label: '不等于'
      }, {
        value: 'contain',
        label: '包含'
      }, {
        value: 'not_contain',
        label: '不包含'
      }, {
        value: 'null',
        label: '没值'
      }, {
        value: 'not_null',
        label: '有值'
      }, {
        value: 'empty',
        label: '为空'
      }, {
        value: 'not_empty',
        label: '不为空'
      }, {
        value: 'regex_match',
        label: '正则匹配'
      }, {
        value: 'regex_not_match',
        label: '正则不匹配'
      }],
      value2: 'equal',

      options3: [{
        label: '事件属性',
        options: [{
          value: '24',
          label: '操作系统'
        }, {
          value: '21',
          label: '屏幕宽度'
        }]
      }, {
        label: '用户属性',
        options: [{
          value: '49',
          label: '省份'
        }, {
          value: '51',
          label: '手机运营商'
        }]
      }],
      value3: '24'
    }
  }
}
</script>

<style scoped>
  @import "../../styles/components.css";
  @import "../../styles/compnent.index.css";
  @import "../../styles/bootstrap.min.css";
</style>
