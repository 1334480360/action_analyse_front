<!--漏斗模块-->
<template>
  <div>
    <!--漏斗图形-->
    <div style="padding: 10px 0; text-align: center;width: 360px; display: inline-block;" v-if="index === 0">
      <svg data-step="$ALL" :class="{'active' : activeFunnelIndex===index}" width="107" height="57" xmlns="http://www.w3.org/2000/svg" @click="switchFunnel">
        <g>
          <title></title>
          <g fill="none" fill-rule="evenodd">
            <g class="active" fill="#EAEFF4">
              <polygon points="0,0 107,0 107,44 53.5,57 0,44"
                       style="stroke-width: 1; stroke: rgba(0,0,0,0.12);"></polygon>
            </g>
          </g>
          <text fill="#000000" stroke="#6666ff" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="50%" y="23" font-size="14" font-family="Monospace" text-anchor="middle" xml:space="preserve">总转化率</text>
          <text xml:space="preserve" text-anchor="middle" font-size="14" y="39" x="48%" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#6666ff" fill="#000000">
            {{funnel.convertRate.toFixed(2)}}%
          </text>
        </g>
      </svg>
    </div>

    <div style="padding: 10px 0; text-align: center;width: 360px;" v-else>
      <svg data-step="0" :class="{'active' : activeFunnelIndex===index}" width="100" height="44" xmlns="http://www.w3.org/2000/svg" @click="switchFunnel">
        <g>
          <g fill="none" fill-rule="evenodd">
            <g fill="#EAEFF4" class="active">
              <polygon points="18,0 82,0 82,20 100,20 50,44 0,20 18,20 " style="stroke-width: 1; stroke: rgba(0,0,0,0.12);"></polygon>
            </g>
          </g>
          <text xml:space="preserve" text-anchor="middle" font-size="14px" id="" y="26" x="48%" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#6666ff" fill="#000000">
            {{funnel.convertRate.toFixed(2)}}%
          </text>
        </g>
      </svg>
    </div>

    <!--漏斗步骤描述-->
    <div style="width: 100%;">
      <div class="fu-arrow-container">
        <span class="icon-funnel-step">{{funnel.orderNum}}</span>
        <div class="div-inline event-title">{{funnel.eventName}}</div>
        <div class="div-inline sa-h-split"></div>
        <div class="div-inline" style="text-align: right;">
          <span data-method="user-list" data-index="0">{{funnel.count}}</span> 人
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'funnel',
    computed: {
      ...mapGetters(['activeFunnelIndex'])
    },
    props: {
      index: {
        required: true,
        type: Number
      },
      funnel: {
        required: true,
        type: Object
      }
    },
    methods: {
      switchFunnel: function () {
        this.$store.commit('updateActiveFunnelIndex', this.index);
      }
    }
  }
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
</style>
