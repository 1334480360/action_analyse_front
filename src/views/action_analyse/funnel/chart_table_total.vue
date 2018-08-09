<!--表格（总）-->
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
              label="分组"
              prop="date">
            </el-table-column>
            <el-table-column
              label="总转化情况">
              <template slot-scope="scope">
                <span>{{scope.row.counts[0]}}</span>
                <br>
                <span style="color: #0AA372;">{{scope.row.convertRates[0].toFixed(2)}}%</span>
              </template>
            </el-table-column>

            <el-table-column
              :label="stepTitle[index]"
              v-for="(title, index) in stepTitle"
              :key="index">
              <template slot-scope="scope">
                <span>{{scope.row.counts[index + 1]}}</span>
                <br>
                <span style="color: #0AA372;">{{scope.row.convertRates[index + 1].toFixed(2)}}%</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>

      <el-table-column
        label="分组"
        prop="dimensionName">
      </el-table-column>
      <el-table-column
        label="总转化情况">
        <template slot-scope="scope">
          <span>{{scope.row.counts[0]}}</span>
          <br>
          <span style="color: #0AA372;">{{scope.row.convertRates[0].toFixed(2)}}%</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="stepTitle[index]"
        v-for="(title, index) in stepTitle"
        :key="index">
        <template slot-scope="scope">
          <span>{{scope.row.counts[index + 1]}}</span>
          <br>
          <span style="color: #0AA372;">{{scope.row.convertRates[index + 1].toFixed(2)}}%</span>
        </template>
      </el-table-column>

    </el-table>
  </section>
</template>

<script>
  export default {
    name: 'chart-table',
    props: {
      tableData: {
        type: Array,
        default () {
          return []
        }
      },
      stepTitle: {
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
