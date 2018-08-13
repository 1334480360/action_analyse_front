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
      <el-table-column label="第0天">
        <el-tooltip class="item" effect="dark" :content="tip" placement="top">
          <span class="icon-help"></span>
        </el-tooltip>
      </el-table-column>
      <el-table-column label="第1天"></el-table-column>
      <el-table-column label="第2天"></el-table-column>
    </el-table>
  </section>
</template>

<script>
  export default {
    name: 'chart-table',
    // props: {
    //   tableData: {
    //     type: Array,
    //     default () {
    //       return []
    //     }
    //   }
    // },
    data() {
      return {
        tip: '初始事件触发的当天即为第 0 天，第 0 天留存用户数表示当天既进行了任意事件也进行了任意事件的用户。（不分前后顺序）',
        tableData: [
          {
            "beginDate": "2018-08-05",
            "userCount": 62515,
            "details": [
              {
                "beginDate": "2018-08-05",
                "retainDate": "2018-08-05",
                "userCount": 62515,
                "diff": 0,
                "percent": 100
              },
              {
                "beginDate": "2018-08-05",
                "retainDate": "2018-08-06",
                "userCount": 9045,
                "diff": 1,
                "percent": 14.47
              }
            ]
          }
        ]
      }
    }
  }
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
</style>
