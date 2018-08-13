<!--搜索条件-->
<template>
  <section class="report-ops" style="">
    <div class="ops-item ops-item-single">
      <!--筛选条件-->
      <div class="ops-item">
        <search-filters title="用户符合"/>
      </div>
    </div>
  </section>
</template>

<script>
  import SearchGroup from '../search_group'
  import SearchFilters from '../search_filters'
  import RefreshHandler from '../../../utils/refresh-handler'

  import {funnelList} from "../../../api/module_index";
  import {mapGetters} from 'vuex'

  export default {
    name: 'search',
    components: {
      SearchGroup,
      SearchFilters,
    },
    computed: {
      ...mapGetters(['appName']),
      ...mapGetters(['disParam'])
    },
    methods: {
      paramChange: function () {
        this.disParam.pageName = this.value1.split('-')[0] || '';
        this.disParam.eventName = this.value1.split('-')[1] || '';
        this.$store.commit('updateDisParam', this.disParam);
        this.$store.commit('updateAutoRefreshCode', Math.random());
      }
    },
    data() {
      return {
        funnels: [],
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
        value2: 'total_count',
      }
    },
  }
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
</style>
