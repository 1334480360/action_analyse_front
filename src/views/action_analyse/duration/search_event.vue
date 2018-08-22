<!--事件-->
<template>
  <div id="measure-line" class="measure-line">
    <div class="ops-item">
      <div class="measure-line-prefix">
        <span data-method="line-prefix">{{eventItems[index]}}</span>
      </div>
      <!--事件选择-->
      <div id="normal-measure-line">
        <div id="select-event" class="selector select-event">
          <el-select v-model="events" placeholder="请选择" filterable style="width: 165px" @change="paramChange(index)">
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
      </div>
    </div>
    <div class="ops-item" data-container="single-filter"></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'search_event',
  computed: {
    ...mapGetters(['durationParam'])
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
  updated() {
    if(this.currentSelectName !== this.durationParam.productName) {
      this.currentSelectName = this.durationParam.productName
      this.events = this.eventList[0].options[0].value
    }
  },
  methods: {
    eventRemove: function () {
      this.$store.commit('removeEventItems')
      this.$store.commit('removeEventParamEvent')
      this.$store.commit('updateEventParam', this.eventParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    },
    paramChange: function (index) {
      console.log(index)
      let pageName = this.events.substring(0, this.events.indexOf('-'))
      let eventName = this.events.substring(this.events.indexOf('-')+1)
      let event = {
        pageName: pageName || '',
        eventName: eventName || ''
      }
      if (index == 0) {
        this.durationParam.firstEvent = event
      } else if (index == 1) {
        this.durationParam.secondEvent = event
      }

      this.$store.commit('updateDurationParam', this.durationParam)
      this.$store.commit('updateAutoRefreshCode', Math.random())
    }
  },
  data () {
    return {
      eventItems: ['A', 'B'],
      events: '',
      currentSelectName: ''
    }
  }
}
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
</style>
