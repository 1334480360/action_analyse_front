<template>
  <div>
    <section class="report-chart segmentation-chart">
      <header>
        <date-picker/>

        <div class="report-name-wrap">
          <h4 id="reportName" class="report-name">结束事件为App 激活的用户行为路径</h4>
        </div>
      </header>
    </section>
  </div>
</template>

<script>
import DatePicker from '../../date/date-picker'
import {mapGetters} from 'vuex'

export default {
  name: 'chart_search',
  components: {
    DatePicker
  },
  computed: {
    ...mapGetters(['retainParam'])
  },
  methods: {
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";

  
</style>
