<template>
  <div>{{msg}}</div>
</template>

<script>
  import {formatDate} from "../assets/common";

  //默认取昨天
  var day1 = new Date();
  day1.setDate(day1.getDate() - 1);

  let beginDate;
  let endDate = formatDate(day1, 'yyyy-MM-dd');

  export default {
    beginDate,
    endDate,
  }
</script>

<style scoped>

</style>
