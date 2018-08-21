<!--筛选条件-->
<template>
  <div class="filter-item">
    <span class="property"></span>
    <div class="selector property" style="width: auto">
      <el-select v-model="selectValue" placeholder="请选择" filterable style="width: 180px" @change="paramChange">
        <el-option-group
          v-for="group in selections"
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
      <el-select v-model="funcValue" placeholder="请选择" style="width: 120px" @change="paramChange">
        <el-option
          v-for="item in funcSelect"
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
    },
    selectData: {
      type: Array
    },
    funcData: {
      type: Array
    }
  },
  mounted () {
    let length = this.selectData[0].options.length
    if (length <= this.index) {
      this.selectValue = this.selectData[1].options[this.index - length].value
    } else {
      this.selectValue = this.selectData[0].options[this.index].value
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
        dimensionCode: this.selectValue,
        function: this.funcValue,
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
      funcSelect: this.funcData,
      funcValue: this.funcData[0].value,
      selections: this.selectData,
      selectValue: this.selectData[0].value
    }
  }
}
</script>

<style scoped>
  @import "../../styles/components.css";
  @import "../../styles/compnent.index.css";
  @import "../../styles/bootstrap.min.css";
</style>
