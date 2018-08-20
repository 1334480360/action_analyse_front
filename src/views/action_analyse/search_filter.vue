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
  props: {
    index: {
      required: true,
      type: Number
    },
    filterItems: {
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
      this.$emit('filterRemove')
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
      this.$emit('paramChange', condition)
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
