<!--事件-->
<template>
  <div id="measure-line" class="measure-line">
    <div class="ops-item">
      <div class="measure-line-prefix">
        <!--<span data-method="line-prefix">A</span>-->
        <span data-method="line-prefix">{{eventItems[index]}}</span>
      </div>
      <!--任意事件 的 总次数-->
      <div id="normal-measure-line">
        <div id="select-event" class="selector select-event">
          <el-select v-model="value1" placeholder="请选择" filterable style="width: 150px">
            <el-option-group
              v-for="group in options1"
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
        <span class="mg-8">的</span>
        <div id="select-measures" class="select-measures">
          <el-select v-model="value2" placeholder="请选择" style="width: 120px">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <button @click="eventRemove" type="button" class="btn-icon btn-link" v-show="(this.index === (this.eventItems.length - 1)) && this.eventItems.length > 1">
        <span class="icon-remove"></span>
      </button>
    </div>
    <div class="ops-item" data-container="single-filter"></div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'search_event',
    methods: {
      eventRemove: function () {
        this.$store.commit('removeEventItems');
      }
    },
    computed: {
      ...mapGetters(['eventItems'])
    },
    props: {
      index: {
        required: true,
        type: Number
      }
    },
    data() {
      return {
        options1: [{
          label: '任意事件',
          options: [{
            value: '',
            label: '任意事件'
          }]
        }, {
          label: '预置通用事件',
          options: [{
            value: 'view',
            label: 'Web浏览页面'
          }, {
            value: 'click',
            label: 'Web元素点击'
          }]
        }],
        value1: '',

        options2: [{
          value: 'count',
          label: '总次数'
        }, {
          value: 'menbers',
          label: '触发用户数'
        }, {
          value: 'avg',
          label: '人均次数'
        }],
        value2: 'count',

      }
    }
  }
</script>

<style scoped>
  @import "../../styles/components.css";
  @import "../../styles/compnent.index.css";
  @import "../../styles/bootstrap.min.css";
</style>
