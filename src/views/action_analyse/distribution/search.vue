<!--搜索条件-->
<template>
  <section class="report-ops" style="">
    <div class="ops-item ops-item-single">
      <span>用户进行</span>
      <div class="selector select-event">
        <el-select v-model="value1" placeholder="请选择" filterable style="width: 150px" @change="handleSelect">
          <el-option-group
            v-for="group in options1"
            :key="group.label"
            :label="group.label"
          >
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
      <div class="dropdown selector">
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

    <!--按分组查看-->
    <div class="ops-item">
      <!--分组-->
      <search-group :index='0'/>
    </div>

    <!--筛选条件-->
    <div class="ops-item">
      <search-filters
        @filterRemove="filterRemove"
        @paramChange="paramChange"
        @relationSwitch="relationSwitch"
        :selectData="mixData"
        :funcData="funcData"
      />
    </div>

  </section>
</template>

<script>
import SearchGroup from '../search_group'
import SearchFilters from '../search_filters'
import RefreshHandler from '../../../utils/refresh-handler'
import {mixData, funcData} from '../../../utils/staticData'

import {funnelList} from '../../../api/module_index'
import {mapGetters} from 'vuex'

export default {
  name: 'search',
  components: {
    SearchGroup,
    SearchFilters
  },
  computed: {
    ...mapGetters(['appName']),
    ...mapGetters(['disParam'])
  },
  mounted() {
    this.mixData = mixData
    this.funcData = funcData
  },
  methods: {
    handleSelect: function () {
      this.disParam.pageName = this.value1.split('-')[0] || ''
      this.disParam.eventName = this.value1.split('-')[1] || ''
      this.$store.commit('updateDisParam', this.disParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    filterRemove: function () {
      this.$store.commit('removeDisParamFilter')
      this.$store.commit('updateDisParam', this.disParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    paramChange (data) {
      this.disParam.filter.conditions = data
      if (this.disParam.filter.conditions.length > 1 && (this.disParam.filter.relation === '' || this.disParam.filter.relation == null)) {
        this.disParam.filter.relation = 'and'
      }
      this.$store.commit('updateDisParam', this.disParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    relationSwitch (relation) {
      this.disParam.filter.relation = relation
      this.$store.commit('updateDisParam', this.disParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    }
  },
  data () {
    return {
      funnels: [],
      mixData: [],
      funcData: [],
      value: null,
      options1: [{
        label: '任意事件',
        options: [{
          value: '',
          label: '任意事件'
        }]
      }, {
        label: '个人中心',
        options: [{
          value: '个人中心-账号管理',
          label: '账号管理'
        }, {
          value: '个人中心-我的活动',
          label: '我的活动'
        }]
      }],
      value1: '',

      options2: [{
        value: 'total_count',
        label: '总次数'
      }],
      value2: 'total_count'
    }
  }
}
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
</style>
