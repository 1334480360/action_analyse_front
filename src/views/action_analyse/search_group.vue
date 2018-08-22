<!--分组-->
<template>
  <div class="group-control-item">
    按
    <div class="selector property" style="width: auto">
      <el-select v-model="selectValue" placeholder="请选择" filterable style="width: 180px" @change="paramChange">
        <el-option-group
          v-for="group in selectData"
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
    查看
    <!--todo 先控制只有一个分组-->
    <!--<button type="button" class="btn-icon btn-link" @click="groupRemove" v-show="(this.index === (this.groupItems.length - 1)) && this.groupItems.length > 1">-->
      <!--<span class="icon-remove"></span>-->
    <!--</button>-->
    <!--<button type="button" class="btn-icon btn-link" @click="groupAdd" v-show="this.index === (this.groupItems.length - 1)" style="text-decoration: none;">-->
      <!--<span class="icon-add"></span>-->
    <!--</button>-->
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'search_group',
  props: {
    index: {
      required: true,
      type: Number
    },
    selectData: {
      type: Array
    }
  },
  data () {
    return {
      selections: this.selectData,
      selectValue: 1 || this.selectData[0].options[0].value
    }
  },
  computed: {
    ...mapGetters(['groupItems']),
    ...mapGetters(['eventParam']),
    ...mapGetters(['funnelParam']),
    ...mapGetters(['disParam']),
    ...mapGetters(['chartType']),
    ...mapGetters(['durationParam']),
    ...mapGetters(['routeParam'])
  },
  methods: {
    groupAdd: function () {
      this.$store.commit('addGroupItems')
    },
    groupRemove: function () {
      this.$store.commit('removeGroupItems')
    },
    paramChange: function () {
      // 事件分析
      this.eventParam.dimensions[0] = this.selectValue
      this.$store.commit('updateEventParam', this.eventParam)

      if (this.eventParam.dimensions[0] === 1 && this.chartType === 'pie') {
        this.$message('饼图只适用于有分组的查询')
        this.$store.commit('updateChartType', 'line')
      }

      // 漏斗分析
      this.funnelParam.dimensionCode = this.selectValue
      this.$store.commit('updateFunnelParam', this.funnelParam)

      // 分布分析
      this.disParam.dimension = this.selectValue
      this.$store.commit('updateDisParam', this.disParam)

      // 间隔分析
      this.durationParam.dimension = this.selectValue
      this.$store.commit('updateDurationParam', this.durationParam)

      // 路径分析
      this.routeParam.dimensions[0] = this.selectValue
      this.$store.commit('updateRouteParam', this.routeParam)

      this.$store.commit('updateAutoRefreshCode', Math.random())
    }
  }
}
</script>

<style scoped>
  @import "../../styles/components.css";
  @import "../../styles/compnent.index.css";
  @import "../../styles/bootstrap.min.css";
  .group-control-item {
    padding-left: 12px!important;
  }
</style>
