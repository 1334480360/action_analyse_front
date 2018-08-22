<!--搜索条件-->
<template>
  <div>
    <!--添加指标-->
    <div class="ops-item" style="border-bottom: none; background-color: #FDFDFE;">
      <span data-method="toggle-measures" style="vertical-align: sub; cursor: pointer;" class="icon-chart-collapse" aria-hidden="true"></span>
      <span style="color: #4B5764; font-weight: 400;">选择事件</span>
    </div>
    <!--请添加指标-->
    <section class="report-ops" id="report-ops">
      <div class="ops-item measures-container">
        <!--按事件-->
        <search-event :eventList="eventList" v-for="(item, index) in ['A', 'B']" :index="index" :key="index"></search-event>
      </div>

      <!--按分组查看-->
      <div id="segmentation-group-hold-place" class="ops-item">
        <!--分组-->
        <search-group v-for="(item, index) in groupItems" :selectData="commonData" :index="index" :key="index"></search-group>
      </div>

      <!--筛选条件-->
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
    </section>
  </div>
</template>

<script>
import SearchEvent from './search_event'
import SearchGroup from '../search_group'
import SearchFilters from '../search_filters'
import {eventData, userData, funcData, unitData} from '../../../utils/staticData'

import {mapGetters} from 'vuex'

export default {
  name: 'search',
  data() {
    return {
      eventData: [],
      userData: [],
      funcData: [],
      commonData: []
    }
  },
  props: {
    eventList: {
      type: Array
    }
  },
  components: {
    SearchEvent,
    SearchGroup,
    SearchFilters
  },
  computed: {
    ...mapGetters(['groupItems']),
    ...mapGetters(['durationParam'])
  },
  beforeDestroy () {
    this.$store.commit('initEventItems')
    this.$store.commit('initGroupItems')
    this.$store.commit('initParam')
  },
  mounted () {
    this.eventData = eventData
    this.userData = userData
    this.funcData = funcData
    this.commonData = unitData
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
  }
}
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
</style>
