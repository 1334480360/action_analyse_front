<template>
  <div class="block, left">
    <!--<span class="demonstration">时间选择</span>-->
    <el-date-picker
      id="datePicker"
      v-model="value7"
      type="daterange"
      align="left"
      unlink-panels
      :clearable="false"
      :editable="false"
      range-separator="——"
      :start-placeholder="beginDate"
      :end-placeholder="endDate"
      placeholder="选择日期"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      :picker-options="pickerOptions2"
      @change="datePickChange"
      style="width: 260px;"
    >
    </el-date-picker>
  </div>
</template>

<script>
  import {formatDate} from "../../assets/common";
  //默认取昨天
  const end = new Date();
  end.setDate(end.getDate() - 1);

  export default {
    methods: {
      datePickChange: function (val) {
        if (val === null) {
          return;
        }

        this.GLOBAL.beginDate = val[0];
        this.GLOBAL.endDate = val[1];
        this.$store.commit('updateAutoRefreshCode', Math.random())
      }
    },
    data() {
      return {
        pickerOptions2: {
          disabledDate(time) {
            return formatDate(time, 'yyyy-MM-dd') > formatDate(end, 'yyyy-MM-dd')
          },
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value6: '',
        value7: '',
        beginDate: this.GLOBAL.beginDate || '开始日期',
        endDate: this.GLOBAL.endDate || '结束日期'
      };
    }
  };
</script>
<style scoped>
  .left {
    float: left;
    margin-right: 10px;
  }
</style>
