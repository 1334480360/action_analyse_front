<!--指标-->
<template>
  <div id="sa-main">
    <div id="dashboard">
      <!--菜单栏-->
      <div class="dashboard-toolbar">
        <span class="dashboard-name">{{title}}</span>
        <el-select v-model="select.value" filterable placeholder="请选择项目"
                   v-show="code === 'OPERATE'" @change="change"
        >
          <el-option
            v-for="item in select.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="pull-right">
          <date-picker v-show="dateShow"/>
          <button class="el-button el-button--primary el-button--medium" @click="datePick" style="font-size: 13px">日期</button>
          <button class="el-button el-button--primary el-button--medium" @click="refresh" style="font-size: 13px">刷新</button>
        </div>
      </div>

      <!--图表模块-->
      <div class="bd" v-for="detail in list">
        <index-detail-data :data="detail" :code="code" v-if="detail.dataOnly === 1"/>
        <index-detail-chart :data="detail" :code="code" v-else-if="detail.hasChart === 1"/>
        <index-detail :data="detail" :code="code" v-else/>
      </div>

    </div>
  </div>
</template>

<script>
  import DatePicker from '../date/date-picker'
  import IndexDetail from './index_detail'
  import IndexDetailData from './index_detail_data'
  import IndexDetailChart from './index_detail_chart'
  import RefreshHandler from '../../utils/refresh-handler'

  import {indexList} from "../../api/module_index";

  const indexTitles = {
    app: {code: 'APP_BASE', title: 'App基础指标'},
    website: {code: 'WEBSITE_BASE', title: '网站基础指标'},
    boss: {code: 'BOSS_VIEW', title: '老板预览'},
    operate: {code: 'OPERATE', title: '运营分析'}
  };

  export default {
    components: {
      DatePicker,
      IndexDetail,
      IndexDetailData,
      IndexDetailChart
    },
    name: 'index',
    data() {
      return {
        title: this.getTitle(),
        code: this.getCode(),
        dateShow: false,
        list: null,
        activeDate: 0,
        select: {
          options: [{
            value: 'my-dafy',
            label: '个人中心'
          }, {
            value: 'vip-loan',
            label: '豪有钱'
          }],
          value: 'vip-loan'
        }
      }
    },
    created() {
      if(this.code === 'OPERATE'){
        this.$store.commit('updateAppName', 'vip-loan');
      }
    },
    mounted() {
      this.getIndexList();
    },
    beforeDestroy() {
      this.$store.commit('clearAppName');
    },
    methods: {
      datePick: function () {
        this.dateShow = !this.dateShow
      },
      change: function() {
        this.$store.commit('updateAppName', this.select.value);
        this.refresh();
      },
      refresh: function () {
        console.log(this.select.value);
        this.$store.commit('updateAutoRefreshCode', Math.random());
      },
      getTitle: function () {
        let code = this.$route.path.split('/')[2];
        return indexTitles[code].title;
      },
      getCode: function () {
        let code = this.$route.path.split('/')[2];
        return indexTitles[code].code;
      },
      async getIndexList() {
        indexList(this.code).then(res => {
          this.list = res.data.data;
        });
      }
    }
  }
</script>

<style scoped>
  @import "../../styles/components.css";
  @import "../../styles/bootstrap.min.css";
</style>
