<!--搜索条件-->
<template>
  <section class="report-ops">
    <div class="ops-item">
      选择参与分析的事件
      <el-select
        v-model="events"
        multiple
        collapse-tags
        :style="`${currentSelectName === 'my-dafy' ? 'width: 220px' : 'width: 240px'}`"
        @change="eventSelect"
        placeholder="请选择">
        <el-checkbox style="padding: 0 20px;" v-model="checkedAll" @change="selectAll(checkedAll)">全部选中</el-checkbox>
        <el-option-group
          v-for="group in eventList"
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
    <div class="ops-item">
      设置
      <el-select v-model="beganEventVal" style="width: 110px;" placeholder="请选择" @change="handleSelect">
        <el-option
          v-for="item in optionsData"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      为
      <el-select v-model="subEventVal" style="width: 150px;" placeholder="请选择" @change="handleSelect">
        <el-option-group
          v-for="group in subEvent"
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
    <!--按分组查看-->
    <div id="segmentation-group-hold-place" class="ops-item">
      <search-group v-for="(item, index) in groupItems" :selectData="commonData" :index="index" :key="index"></search-group>
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
import {eventData, userData, funcData, unitData} from '../../../utils/staticData'
import {funnelList} from '../../../api/module_index'
import {mapGetters} from 'vuex'

export default {
  name: 'search',
  components: {
    SearchFilters,
    SearchGroup
  },
  computed: {
    ...mapGetters(['routeParam']),
    ...mapGetters(['groupItems']),
  },
  updated() {
    if(this.currentSelectName !== this.routeParam.productName) {
      this.currentSelectName = this.routeParam.productName
      this.events = []
    }
  },
  mounted () {
    this.eventData = eventData
    this.userData = userData
    this.funcData = funcData
    this.commonData = unitData
  },
  methods: {
    eventSelect: function() {
      console.log(this.events)
      let arr = []
      let obj = {}
      for (let i = 0; i < this.events.length; i++) {
        let index = this.events[i].indexOf('-')
        let label = this.events[i].substring(0, index)
        let value = this.events[i].substring(index + 1)
        if(!obj[label]) {
          obj[label] = []
        }
        obj[label].push(this.events[i])
      }
      for (let pageName in obj) {
        let temp = {label: '', options: []}
        for (let i = 0; i < obj[pageName].length; i++) {
          let index = obj[pageName][i].indexOf('-')
          let label = obj[pageName][i].substring(0, index)
          let value = obj[pageName][i].substring(index + 1) 
          temp.label = label
          temp.options.push({label: value, value: obj[pageName][i]})
        }
        arr.push(temp)
      }
      this.subEvent = arr
    },
    handleSelect: function() {
      this.routeParam.isBegin = this.beganEventVal
      if(this.subEventVal) {
        let index = this.subEventVal.indexOf('-')
        let label = this.subEventVal.substring(0, index)
        let value = this.subEventVal.substring(index + 1)
        this.routeParam.specifiedEvent = {
          pageName: label,
          eventName: value
        }
      }
      console.log(this.subEventVal);
      this.$store.commit('updateRouteParam', this.routeParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    selectAll(state) {
      if(state) {
        let valArr = []
        for(let i = 0; i< this.eventList.length; i++) {
          for(let j = 0; j < this.eventList[i].options.length; j++) {
            valArr.push(this.eventList[i].options[j].value)
          }
        }
        this.events = valArr
      } else {
        this.events = []
      }
      this.eventSelect()
    },
    eventRemove: function () {
      this.$store.commit('removeDurationEventFilter')
      this.$store.commit('updateDurationParam', this.durationParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    eventChange: function (data) {
      console.log(data)
      this.routeParam.eventFilter.conditions = data
      if (this.routeParam.eventFilter.conditions.length > 1 && (this.routeParam.eventFilter.relation === '' || this.routeParam.eventFilter.relation == null)) {
        this.routeParam.eventFilter.relation = 'and'
      }
      this.$store.commit('updateRouteParam', this.routeParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    eventRelation: function (relation) {
      this.routeParam.eventFilter.relation = relation
      this.$store.commit('updateRouteParam', this.routeParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    userRemove: function () {
      this.$store.commit('removeRouteParamFilter')
      this.$store.commit('updateRouteParam', this.routeParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    userChange: function (data) {
      this.routeParam.userFilter.conditions = data
      if (this.routeParam.userFilter.conditions.length > 1 && (this.routeParam.userFilter.relation === '' || this.routeParam.userFilter.relation == null)) {
        this.routeParam.userFilter.relation = 'and'
      }
      this.$store.commit('updateRouteParam', this.routeParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    userRelation: function (relation) {
      this.routeParam.userFilter.relation = relation
      this.$store.commit('updateRouteParam', this.routeParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    }
  },
  props: {
    eventList: {
      type: Array
    }
  },
  data () {
    return {
      eventData: [],
      userData: [],
      funcData: [],
      commonData: [],
      checkedAll: false,
      currentSelectName: '',
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
      beganEventVal: true,
      subEventVal: '',
      subEvent: [],
      events: []
    }
  }
}
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
</style>
