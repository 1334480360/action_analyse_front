<!--表格（分组）-->
<template>
  <section id="table-container" class="report-chart">
    <el-table
      :data="tableData"
      style="width: 100%"
      stripe
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table :data="scope.row.dailyVoList" :show-header="false" stripe>
            <el-table-column
              prop="date">
            </el-table-column>
            <el-table-column
              prop="preCount">
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <span style="color: #0AA372;">{{scope.row.convertRate.toFixed(2)}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="flowCount">
            </el-table-column>
            <el-table-column
              prop="nextCount">
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>

      <el-table-column
        label="分组"
        prop="dimensionName">
      </el-table-column>
      <el-table-column
        :label="tableData[0].preEventName"
        prop="preCount">
      </el-table-column>
      <el-table-column label="转化率">
        <template slot-scope="scope">
          <span style="color: #0AA372;">{{scope.row.convertRate.toFixed(2)}}%</span>
        </template>
      </el-table-column>
      <el-table-column label="流失用户(人)" prop="flowCount">
      </el-table-column>
      <el-table-column
        :label="tableData[0].nextEventName"
        prop="nextCount">
      </el-table-column>

    </el-table>
  </section>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'chart-table',
    computed: {
      ...mapGetters(['activeFunnelIndex'])
    },
    props: {
      tableData: {
        type: Array,
        default () {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
</style>
