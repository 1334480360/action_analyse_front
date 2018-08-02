<!--筛选条件-->
<template>
  <div class="filter-item">
    <span class="property"></span>
    <div class="selector property">
      <el-select v-model="value3" placeholder="请选择" filterable style="width: 180px">
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
      <el-select v-model="value2" placeholder="请选择" style="width: 120px">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="input" style="position: absolute;margin-top: 4px;">
      <el-input placeholder="请输入内容"></el-input>
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
      ...mapGetters(['filterItems'])
    },
    props: {
      index: {
        required: true,
        type: Number
      }
    },
    methods: {
      filterRemove: function () {
        this.$store.commit('removeFilterItems');
      }
    },
    data() {
      return {
        relation: 'and',
        options2: [{
          value: 'equal',
          label: '等于'
        }, {
          value: 'not_equal',
          label: '不等于'
        }, {
          value: 'contains',
          label: '包含'
        }],
        value2: 'equal',

        options3: [{
          label: '事件属性',
          options: [{
            value: 'ip',
            label: 'IP'
          }, {
            value: 'country',
            label: '国家'
          }]
        }, {
          label: '用户属性',
          options: [{
            value: 'name',
            label: '姓名'
          }, {
            value: 'gender',
            label: '性别'
          }]
        }],
        value3: 'ip',
      }
    }
  }
</script>

<style scoped>
  @import "../../styles/components.css";
  @import "../../styles/compnent.index.css";
  @import "../../styles/bootstrap.min.css";
</style>
