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
        <search-event v-for="(item, index) in ['A', 'B']" :index="index" :key="index"></search-event>
      </div>

      <!--按分组查看-->
      <div id="segmentation-group-hold-place" class="ops-item">
        <!--分组-->
        <search-group v-for="(item, index) in groupItems" :index="index" :key="index"></search-group>
      </div>

      <!--筛选条件-->
      <search-filters title="事件符合"/>
      <search-filters title="用户符合"/>

    </section>
  </div>
</template>

<script>
import SearchEvent from './search_event'
import SearchGroup from '../search_group'
import SearchFilters from '../search_filters'

import {mapGetters} from 'vuex'

export default {
  name: 'search',
  components: {
    SearchEvent,
    SearchGroup,
    SearchFilters
  },
  computed: {
    ...mapGetters(['eventItems']),
    ...mapGetters(['groupItems']),
    ...mapGetters(['eventParam'])
  },
  beforeDestroy () {
    this.$store.commit('initEventItems')
    this.$store.commit('initGroupItems')
    this.$store.commit('initParam')
  },
  methods: {
    eventAdd: function () {
      this.$store.commit('addEventItems')

      this.$store.commit('addEventParamEvent')
      this.$store.commit('updateEventParam', this.eventParam)

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
