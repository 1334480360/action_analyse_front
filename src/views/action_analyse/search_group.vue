<!--分组-->
<template>
  <div class="group-control-item">
    按
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
      }
    },
    computed: {
      ...mapGetters(['groupItems']),
      ...mapGetters(['eventParam']),
      ...mapGetters(['funnelParam']),
      ...mapGetters(['chartType']),
    },
    methods: {
      groupAdd: function () {
        this.$store.commit('addGroupItems');
      },
      groupRemove: function () {
        this.$store.commit('removeGroupItems');
      },
      paramChange: function () {
        //事件分析
        this.eventParam.dimensions[0] = this.value3;
        this.$store.commit('updateEventParam', this.eventParam);

        if(this.eventParam.dimensions[0] === 1 && this.chartType === 'pie'){
          this.$message('饼图只适用于有分组的查询');
          this.$store.commit('updateChartType', 'line');
        }

        //漏斗分析
        this.funnelParam.dimensionCode = this.value3;
        this.$store.commit('updateFunnelParam', this.funnelParam);
      }
    },
    data() {
      return {
        options3: [{
          label: '总体',
          options: [{
            value: 1,
            label: '总体'
          }]
        }, {
          label: '事件属性',
          options: [{
            value: 24,
            label: '操作系统'
          }, {
            value: 21,
            label: '屏幕宽度'
          }]
        }, {
          label: '用户属性',
          options: [{
            value: 49,
            label: '省份'
          }, {
            value: 51,
            label: '手机运营商'
          }]
        }],
        value3: 1,
      }
    }
  }
</script>

<style scoped>
  @import "../../styles/components.css";
  @import "../../styles/compnent.index.css";
  @import "../../styles/bootstrap.min.css";
</style>
