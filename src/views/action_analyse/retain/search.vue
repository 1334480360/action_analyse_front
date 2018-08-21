<!--搜索条件-->
<template>
  <section class="report-ops">
    <div class="ops-item ops-item-single">
      <!--筛选条件-->
      <div class="ops-item">
        <search-filters
          title="用户符合"
          @filterRemove="filterRemove"
          @paramChange="paramChange"
          @relationSwitch="relationSwitch"
          :selectData="mixData"
          :funcData="funcData"
         />
      </div>
    </div>
  </section>
</template>

<script>
import SearchFilters from '../search_filters'
import RefreshHandler from '../../../utils/refresh-handler'
import {mixData, funcData} from '../../../utils/staticData'
import {funnelList} from '../../../api/module_index'
import {mapGetters} from 'vuex'

export default {
  name: 'search',
  components: {
    SearchFilters
  },
  computed: {
    ...mapGetters(['retainParam'])
  },
  mounted () {
    this.mixData = mixData
    this.funcData = funcData
  },
  methods: {
    filterRemove: function () {
      this.$store.commit('removeRetainParamFilter')
      this.$store.commit('updateRetainParam', this.retainParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    paramChange (data) {
      this.retainParam.userFilter.conditions = data
      if (this.retainParam.userFilter.conditions.length > 1 && (this.retainParam.userFilter.relation === '' || this.retainParam.userFilter.relation == null)) {
        this.retainParam.userFilter.relation = 'and'
      }
      this.$store.commit('updateRetainParam', this.retainParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    relationSwitch (relation) {
      this.retainParam.userFilter.relation = relation
      this.$store.commit('updateRetainParam', this.retainParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    }
  },
  data () {
    return {
      mixData: [],
      funcData: []
    }
  }
}
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
</style>
