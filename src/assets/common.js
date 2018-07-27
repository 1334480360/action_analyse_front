/**
 * 将数值四舍五入后格式化成金额形式（金额保留两位小数，否则不保留小数）
 *
 * @param num 数值(Number或者String)
 * @param unit
 * @return String
 * @type String
 */
export function formatCurrency(num, unit) {
  if (num === null) {
    return num;
  }

  if(unit !== '元'){
    return formatNum(num);
  }

  num = num.toString().replace(/\$|\,/g, '');
  if (isNaN(num))
    num = "0";
  let sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 100 + 0.50000000001);
  let cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10)
    cents = "0" + cents;
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num = num.substring(0, num.length - (4 * i + 3)) + ',' +
      num.substring(num.length - (4 * i + 3));
  return (((sign) ? '' : '-') + num + '.' + cents);
}

/**
 * 不保留有效数字
 * @param num
 */
function formatNum(num) {
  var t = parseInt(num), i, r;
  for (t = t.toString().replace(/^(\d*)$/, "$1."), t = (t + "00").replace(/(\d*\.\d\d)\d*/, "$1"), t = t.replace(".", ","), i = /(\d)(\d{3},)/; i.test(t); )
    t = t.replace(i, "$1,$2");
  return t = t.replace(/,(\d\d)$/, ".$1"), r = t.split("."), r[1] == "00" && (t = r[0]), t
}

/**
 * @title：日期格式化
 * @author：xuan
 * @date：2018/7/26
 */
export function formatDate(date, fmt) { //author: meizz
  let o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
