<!--搜索条件-->
<template>
  <section id="table-container" class="report-chart">
      <div class="table-wrap">
        <el-table
          :data="tableData"
          border
          style="width: 100%; font-weight: 400;">
          <el-table-column
            prop="group"
            label="分组"
            v-show="!isTotal"
          >
          </el-table-column>
          <el-table-column
            prop="dimension"
            label="指标">
          </el-table-column>
          <el-table-column
            prop="ammount"
            label="合计">
          </el-table-column>
          <el-table-column
            :label="date"
            v-for="(date, index) in dateArr"
            :key="index"
          >
            <template slot-scope="scope">
              {{scope.row.dates[index]}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div id="table-pagination"></div>
  </section>
</template>

<script>
  export default {
    name: 'chart-table',
    props: {
      isTotal: {
        type: Boolean,
        required: true
      },
      tableData: {
        type: Array,
        default () {
          return []
        }
      },
      dateArr: {
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
