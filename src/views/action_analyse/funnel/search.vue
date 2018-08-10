<!--搜索条件-->
<template>
  <div>
    <section class="report-ops funnel-ops" style="">
      <div class="ops-item">
        <div>显示漏斗</div>
        <el-select v-model="value" filterable placeholder="请选择漏斗" style="width: 130px;" @change="paramChange">
          <el-option
            v-for="item in funnels"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <div class="selector select-funnel">
          <div class="group-control-item">
            <!--分组-->
            <search-group :index="0"/>
          </div>
        </div>
        <el-button type="success" class="btn btn-primary btn-create-fu pull-right" @click="createFunnel">创建漏斗</el-button>
      </div>

      <!--筛选条件-->
      <search-filters/>

    </section>
  </div>
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
      ...mapGetters(['funnelParam']),
      ...mapGetters(['appName']),
      ...mapGetters(['channel'])
    },
    mounted() {
      this.getFunnelList();
    },
    watch: {
      appName() {
        console.log('watch appName------');
        this.$store.commit('updateAutoRefreshCode', Math.random());
        // this.getFunnelList();
        this.paramChange();
      },
      channel() {
        console.log('watch channel------');
        this.$store.commit('updateAutoRefreshCode', Math.random());
        // this.getFunnelList();
        this.paramChange();
      },
    },
    data() {
      return {
        funnels: [],
        value: null
      }
    },
    methods: {
      paramChange: function () {
        this.funnelParam.id = this.value;
        this.$store.commit('updateFunnelParam', this.funnelParam);
        this.$store.commit('updateAutoRefreshCode', Math.random());
      },
      async getFunnelList() {
        this.loading = true;
        funnelList(this.appName, this.channel).then(res => {
          if(res.data.result === 'fail') {
            this.$message.error(res.data.message);
          }
          this.funnels = res.data.data;
          this.value = this.funnels[0].id;

          this.loading = false;

          //添加方法到自动刷新列表
          this.$store.commit('addToAutoRefreshChartList', this.getFunnelList);
        });
      },
      createFunnel: function () {
        this.$message('别急，该功能下期与你相见😊');
      }
    },
  }
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
</style>
