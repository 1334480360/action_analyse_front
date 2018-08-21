<!--搜索条件-->
<template>
  <section class="report-ops">
    <div class="ops-item">
      选择参与分析的事件
      <el-select
        v-model="value11"
        multiple
        collapse-tags
        style="margin-left: 20px;"
        placeholder="请选择">
        <el-checkbox style="padding: 0 20px;" v-model="checkedAll">全部选中</el-checkbox>
        <el-option
          v-for="item in eventData"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="ops-item">
      设置
      <el-select v-model="value" style="width: 110px;" placeholder="请选择">
        <el-option
          v-for="item in optionsData"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      为
      <el-select v-model="value" style="width: 110px;" placeholder="请选择">
        <el-option
          v-for="item in optionsData"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <!--按分组查看-->
    <div id="segmentation-group-hold-place" class="ops-item">
      <search-group v-for="(item, index) in groupItems" :index="index" :key="index"></search-group>
    </div>
    <!--筛选条件-->
    <div class="ops-item ops-item-single">
      <div>
        <search-filters
          title="事件符合"
          @filterRemove="eventRemove"
          @paramChange="eventChange"
          @relationSwitch="eventRelation"
          :funcData="funcData"
          :selectData="eventData"
        />
        <search-filters
          title="用户符合"
          @filterRemove="userRemove"
          @paramChange="userChange"
          @relationSwitch="userRelation"
          :funcData="funcData"
          :selectData="userData"
        />
      </div>
    </div>
  </section>
</template>

<script>
import SearchFilters from '../search_filters'
import RefreshHandler from '../../../utils/refresh-handler'
import SearchGroup from '../search_group'
import {eventData, userData, funcData} from '../../../utils/staticData'
import {funnelList} from '../../../api/module_index'
import {mapGetters} from 'vuex'

export default {
  name: 'search',
  components: {
    SearchFilters,
    SearchGroup
  },
  computed: {
    ...mapGetters(['retainParam']),
    ...mapGetters(['groupItems']),
  },
  mounted () {
    this.eventData = eventData
    this.userData = userData
    this.funcData = funcData
  },
  methods: {
    eventRemove: function () {
      this.$store.commit('removeDurationEventFilter')
      this.$store.commit('updateDurationParam', this.durationParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    eventChange: function (data) {
      console.log(data)
      this.durationParam.eventFilter.conditions = data
      if (this.durationParam.eventFilter.conditions.length > 1 && (this.durationParam.eventFilter.relation === '' || this.durationParam.eventFilter.relation == null)) {
        this.durationParam.eventFilter.relation = 'and'
      }
      this.$store.commit('updateDurationParam', this.durationParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    eventRelation: function (relation) {
      this.durationParam.eventFilter.relation = relation
      this.$store.commit('updateDurationParam', this.durationParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    userRemove: function () {
      this.$store.commit('removeDurationParamFilter')
      this.$store.commit('updateDurationParam', this.durationParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    userChange: function (data) {
      this.durationParam.userFilter.conditions = data
      if (this.durationParam.userFilter.conditions.length > 1 && (this.durationParam.userFilter.relation === '' || this.durationParam.userFilter.relation == null)) {
        this.durationParam.userFilter.relation = 'and'
      }
      this.$store.commit('updateDurationParam', this.durationParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    userRelation: function (relation) {
      this.durationParam.userFilter.relation = relation
      this.$store.commit('updateDurationParam', this.durationParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    }
  },
  data () {
    return {
      eventData: [],
      userData: [],
      funcData: [],
      checkedAll: false,
      optionsData: [
        {
          value: true,
          label: '起始事件'
        },
        {
          value: false,
          label: '结束事件'
        }
      ],
      value: true,
      value11: ['我的优惠-我的活动', '21'],
      eventData:[
        
      
            {
                value: '我的优惠-我的活动',
                label: '我的活动'
            }, 
            {
                value: '21',
                label: '屏幕宽度'
            }
        
       
      ]
    }
  }
}
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
</style>
