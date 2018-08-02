<!--分组-->
<template>
  <div class="group-control-item">
    按
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
    查看
    <button type="button" class="btn-icon btn-link" @click="groupRemove" v-show="(this.index === (this.groupItems.length - 1)) && this.groupItems.length > 1">
      <span class="icon-remove"></span>
    </button>
    <button type="button" class="btn-icon btn-link" @click="groupAdd" v-show="this.index === (this.groupItems.length - 1)">
      <span class="icon-add"></span>
    </button>
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
      ...mapGetters(['groupItems'])
    },
    methods: {
      groupAdd: function () {
        this.$store.commit('addGroupItems');
      },
      groupRemove: function () {
        this.$store.commit('removeGroupItems');
      }
    },
    data() {
      return {
        options3: [{
          label: '总体',
          options: [{
            value: '',
            label: '总体'
          }]
        }, {
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
        value3: '',
      }
    }
  }
</script>

<style scoped>
  @import "../../styles/components.css";
  @import "../../styles/compnent.index.css";
  @import "../../styles/bootstrap.min.css";
</style>
