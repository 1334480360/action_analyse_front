<!--搜索条件-->
<template>
  <section id="table-container" class="report-chart" style="">
      <div style="display:none;" class="sa-tab tab-table">
        <a data-method="switch-left" class="active"></a>
        <a data-method="switch-right"></a>
        <a data-method="switch-ratio" style="display:none;">时间对比变化率</a>
      </div>
      <div class="table-wrap">
        <el-table
          :data="tableData"
          border
          style="width: 100%; font-weight: 400;">
          <el-table-column
            fixed
            prop="date"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="province"
            label="省份">
          </el-table-column>
          <el-table-column
            prop="city"
            label="市区">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="zip"
            label="邮编">
          </el-table-column>
        </el-table>
      </div>
      <div id="table-pagination"></div>
  </section>
</template>

<script>
  export default {
    name: 'chart-table',
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    }
  }
</script>

<style scoped>
  @import "../../styles/components.css";
  @import "../../styles/compnent.index.css";
  @import "../../styles/bootstrap.min.css";
</style>
