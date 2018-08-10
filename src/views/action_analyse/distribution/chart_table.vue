<!--表格-->
<template>
  <section id="table-container" class="report-chart">
    <el-table
      :data="tableData"
      style="width: 100%"
      stripe
      border
    >
      <el-table-column label="分组" fixed prop="dates" width="100px"></el-table-column>
      <el-table-column label="总人数" prop="totalNum"></el-table-column>
      <el-table-column label="1次~3次(不含3次)" width="140px">
        <template slot-scope="scope">
          {{scope.row.num1}}
          <br>
          {{((scope.row.num1 / scope.row.totalNum) * 100).toFixed(1)}}%
        </template>
      </el-table-column>
      <el-table-column label="3次~5次(不5含次)" width="140px">
        <template slot-scope="scope">
          {{scope.row.num2}}
          <br>
          {{((scope.row.num2 / scope.row.totalNum) * 100).toFixed(1)}}%
        </template>
      </el-table-column>
      <el-table-column label="5次~10次(不10含次)" width="150px">
        <template slot-scope="scope">
          {{scope.row.num3}}
          <br>
          {{((scope.row.num3 / scope.row.totalNum) * 100).toFixed(1)}}%
        </template>
      </el-table-column>
      <el-table-column label="10次~20次(不20含次)" width="160px">
        <template slot-scope="scope">
          {{scope.row.num4}}
          <br>
          {{((scope.row.num4 / scope.row.totalNum) * 100).toFixed(1)}}%
        </template>
      </el-table-column>
      <el-table-column label="20次~30次(不含30次)" width="160px">
        <template slot-scope="scope">
          {{scope.row.num5}}
          <br>
          {{((scope.row.num5 / scope.row.totalNum) * 100).toFixed(1)}}%
        </template>
      </el-table-column>
      <el-table-column label="30次~50次(不含50次)" width="160px">
        <template slot-scope="scope">
          {{scope.row.num6}}
          <br>
          {{((scope.row.num6 / scope.row.totalNum) * 100).toFixed(1)}}%
        </template>
      </el-table-column>
      <el-table-column label="50次~100次(不含100次)" width="170px">
        <template slot-scope="scope">
          {{scope.row.num7}}
          <br>
          {{((scope.row.num7 / scope.row.totalNum) * 100).toFixed(1)}}%
        </template>
      </el-table-column>
      <el-table-column label="100次以上(不含100次)" width="170px">
        <template slot-scope="scope">
          {{scope.row.num8}}
          <br>
          {{((scope.row.num8 / scope.row.totalNum) * 100).toFixed(1)}}%
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
      }
    },
    // data() {
    //   return {
    //     tableData:  [
    //       {
    //         "dates": "Android",
    //         "dateStr": "Android",
    //         "totalNum": 118,
    //         "num1": 108,
    //         "num2": 10,
    //         "num3": 0,
    //         "num4": 0,
    //         "num5": 0,
    //         "num6": 0,
    //         "num7": 0,
    //         "num8": 0
    //       },
    //       {
    //         "dates": "Windows",
    //         "dateStr": "Windows",
    //         "totalNum": 1,
    //         "num1": 1,
    //         "num2": 0,
    //         "num3": 0,
    //         "num4": 0,
    //         "num5": 0,
    //         "num6": 0,
    //         "num7": 0,
    //         "num8": 0
    //       },
    //       {
    //         "dates": "iOS",
    //         "dateStr": "iOS",
    //         "totalNum": 29,
    //         "num1": 27,
    //         "num2": 2,
    //         "num3": 0,
    //         "num4": 0,
    //         "num5": 0,
    //         "num6": 0,
    //         "num7": 0,
    //         "num8": 0
    //       }
    //     ]
    //   }
    // }
  }
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
  el-table-column{
    width: 170px;
  }
</style>
