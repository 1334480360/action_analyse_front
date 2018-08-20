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
          <el-select v-model="value1" placeholder="请选择" filterable style="width: 150px" @change="paramChange(index)">
            <el-option-group
              v-for="group in options1"
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
      let event = {
        pageName: this.value1.split('-')[0] || '',
        eventName: this.value1.split('-')[1] || ''
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
      options1: [ {
        label: '个人中心',
        options: [{
          value: '个人中心-账号管理',
          label: '账号管理'
        }, {
          value: '个人中心-我的活动',
          label: '我的活动'
        }]
      }],
      value1: ''
    }
  }
}
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
</style>
