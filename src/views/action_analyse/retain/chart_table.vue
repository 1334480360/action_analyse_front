<!--表格-->
<template>
  <section id="table-container" class="report-chart">
    <el-table
      :data="tableData"
      style="width: 100%"
      stripe
      border
    >
      <el-table-column label="日期" fixed prop="date" width="100px"></el-table-column>
      <el-table-column
            :label="`第 ${diff} ${dateType}`"
            v-for="(diff, index) in dateArr"
            :key="index"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.userCount[index] || scope.row.userCount[index] == '0'">
                <span>{{scope.row.userCount[index] + ' 人'}}</span>
                <br>
                <span>{{scope.row.rate[index]}}</span>
              </span>
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
    dateArr: {
      type: Array,
      default () {
        return []
      }
    },
    dateType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // tip: '初始事件触发的当天即为第 0 天，第 0 天留存用户数表示当天既进行了任意事件也进行了任意事件的用户。（不分前后顺序）',
      // tableData: [
      //   {
      //     "beginDate": "2018-08-05",
      //     "userCount": 62515,
      //     "details": [
      //       {
      //         "beginDate": "2018-08-05",
      //         "retainDate": "2018-08-05",
      //         "userCount": 62515,
      //         "diff": 0,
      //         "percent": 100
      //       },
      //       {
      //         "beginDate": "2018-08-05",
      //         "retainDate": "2018-08-06",
      //         "userCount": 9045,
      //         "diff": 1,
      //         "percent": 14.47
      //       }
      //     ]
      //   }
      // ]
    }
  }
}
</script>

<style scoped>
  @import "../../../styles/components.css";
  @import "../../../styles/compnent.index.css";
  @import "../../../styles/bootstrap.min.css";
</style>
