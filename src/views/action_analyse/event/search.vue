<!--搜索条件-->
<template>
  <div>
    <!--添加指标-->
    <div class="ops-item" style="border-bottom: none; background-color: #FDFDFE;">
      <span data-method="toggle-measures" style="vertical-align: sub; cursor: pointer;" class="icon-chart-collapse" aria-hidden="true"></span>
      <span style="color: #4B5764; font-weight: 400;">请添加指标</span>
    </div>
    <!--请添加指标-->
    <section class="report-ops" id="report-ops">
      <div class="ops-item measures-container">
        <!--事件-->
        <search-event v-for="(item, index) in eventItems" :index="index" :key="index"></search-event>
        <!--＋号-->
        <button @click="eventAdd" type="button" class="event-measure-add-new" data-placement="right">
          <span class="icon-new"></span>
        </button>
      </div>

      <!--按分组查看-->
      <div id="segmentation-group-hold-place" class="ops-item">
        <search-group v-for="(item, index) in groupItems" :index="index" :key="index"></search-group>
      </div>

      <!--筛选条件-->
      <search-filters
        @filterRemove="filterRemove"
        @paramChange="paramChange"
        @relationSwitch="relationSwitch"
        :selectData="mixData"
        :funcData="funcData"
      />
    </section>
  </div>
</template>

<script>
import SearchEvent from './search_event'
import SearchGroup from '../search_group'
import SearchFilters from '../search_filters'
import {mixData, funcData} from '../../../utils/staticData'
import {mapGetters} from 'vuex'

export default {
  name: 'search',
  data() {
    return {
      mixData: [],
      funcData: [],
    }
  },
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
  mounted() {
    this.mixData = mixData
    this.funcData = funcData
  },
  methods: {
    eventAdd: function () {
      this.$store.commit('addEventItems')

      this.$store.commit('addEventParamEvent')
      this.$store.commit('updateEventParam', this.eventParam)

      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    filterRemove () {
      this.$store.commit('removeEventParamFilter')
      this.$store.commit('updateEventParam', this.eventParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    paramChange (data) {
      this.eventParam.filter.conditions = data
      if (this.eventParam.filter.conditions.length > 1 && (this.eventParam.filter.relation === '' || this.eventParam.filter.relation == null)) {
        this.eventParam.filter.relation = 'and'
      }
      this.$store.commit('updateEventParam', this.eventParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    relationSwitch (relation) {
      this.eventParam.filter.relation = relation
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
