<!--筛选条件-->
<template>
  <div>
    <div id="filter-hold-place" class="ops-item" v-show="this.filterItems.length > 0">
      <div class="filter-group-control">
        <div id="filter-group-relation" class="filter-group-relation" v-show="this.filterItems.length > 1">
          <div class="relation-topline"></div>
          <!--关系-->
          <button @click="relationSwitch" data-relation="and" class="btn" type="button"
                  style="border: 1px solid #a8b7c8; padding-left: 10px;">
            {{relation === 'and' ? '且' : '或'}}
          </button>
          <div class="relation-bottomline"></div>
        </div>
        <div class="filter-contain">
          <search-filter v-for="(item, index) in filterItems" :index="index" :key="index"
          :filterItems="filterItems"
          @filterRemove="filterRemove"
          @paramChange="paramChange"
          :selectData="selectData"
          :funcData="funcData"
          ></search-filter>
        </div>
      </div>
    </div>

    <!--筛选条件按钮-->
    <div class="ops-item">
      <span>{{title}}</span>
      <button type="button" class="btn btn-link" @click="filterAdd" style="text-decoration: none;">
        <span class="icon-add"></span><span>筛选条件</span>
      </button>
    </div>
  </div>
</template>

<script>
import SearchFilter from './search_filter'

import {mapGetters} from 'vuex'

export default {
  name: 'search_filters',
  components: {
    SearchFilter
  },
  computed: {
    // ...mapGetters(['filterItems']),
    ...mapGetters(['eventParam']),
    ...mapGetters(['funnelParam']),
    ...mapGetters(['disParam']),
    ...mapGetters(['retainParam']),
    ...mapGetters(['durationParam'])
  },
  props: {
    title: {
      type: String
    },
    selectData: {
      type: Array
    },
    funcData: {
      type: Array
    }
  },
  methods: {
    relationSwitch: function () {
      if (this.relation === 'and') {
        this.relation = 'or'
      } else {
        this.relation = 'and'
      }
      this.$emit('relationSwitch', this.relation)
    },
    filterAdd: function () {
      this.filterItems.push(Math.random())
    },
    filterRemove () {
      this.filterItems.pop()
      this.$emit('filterRemove')
    },
    paramChange (data) {
      this.params.push(data)
      this.$emit('paramChange', this.params)
    }
  },
  data () {
    return {
      relation: 'and',
      params: [],
      filterItems: []
    }
  }
}
</script>

<style scoped>
  @import "../../styles/components.css";
  @import "../../styles/compnent.index.css";
  @import "../../styles/bootstrap.min.css";
</style>
