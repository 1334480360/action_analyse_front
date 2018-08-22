<!--事件-->
<template>
  <div id="measure-line" class="measure-line">
    <div class="ops-item">
      <div class="measure-line-prefix">
        <span data-method="line-prefix">{{eventItems[index]}}</span>
      </div>
      <!--任意事件 的 总次数-->
      <div id="normal-measure-line">
        <div id="select-event" class="selector select-event">
          <el-select v-model="events" placeholder="请选择" filterable style="width: 150px" @change="paramChange">
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
        <span class="mg-8">的</span>
        <div id="select-measures" class="select-measures">
          <el-select v-model="value2" placeholder="请选择" style="width: 120px" @change="paramChange">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <button @click="eventRemove" type="button" class="btn-icon btn-link" v-show="(this.index === (this.eventItems.length - 1)) && this.eventItems.length > 1">
        <span class="icon-remove"></span>
      </button>
    </div>
    <div class="ops-item" data-container="single-filter"></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'search_event',
  computed: {
    ...mapGetters(['eventItems']),
    ...mapGetters(['eventParam'])
  },
  props: {
    index: {
      required: true,
      type: Number
    },
    eventList: {
      type: Array
    }
  },
  methods: {
    eventRemove: function () {
      this.$store.commit('removeEventItems')
      this.$store.commit('removeEventParamEvent')
      this.$store.commit('updateEventParam', this.eventParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    paramChange: function () {
      let event = {
        pageName: this.events.split('-')[0] || '',
        eventName: this.events.split('-')[1] || '',
        metric: this.value2
      }
      this.eventParam.events[this.index] = event
      this.$store.commit('updateEventParam', this.eventParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    }
  },
  data () {
    return {
      events: '',

      options2: [{
        value: 'total_count',
        label: '总次数'
      }, {
        value: 'user_count',
        label: '触发用户数'
      }, {
        value: 'avg_count',
        label: '人均次数'
      }],
      value2: 'total_count'

    }
  }
}
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
</style>
