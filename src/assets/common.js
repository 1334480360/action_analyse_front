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

  if ('元'.indexOf(unit) === -1) {
    return formatNum(num, unit);
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
 * @title：单位自适应
 * @author：xuan
 * @date：2018/7/30
 */
export function unitConvert(num, unit) {
  num = parseFloat(num);
  if (num >= 10000 * 10000 * 10000) {
    return '兆' + unit;
  }else if (num >= 10000 * 10000 * 1000) {
    return '千亿' + unit;
  }else if (num >= 10000 * 10000) {
    return '亿' + unit;
  }else if (num >= 10000 * 1000) {
    return '千万' + unit;
  }else if (num >= 10000) {
    return '万' + unit;
  } else {
    return unit;
  }
}

/**
 * @title：数字自适应(判断条件需与单位一致)
 * @author：xuan
 * @date：2018/7/30
 */
export function numConvert(num, unit) {
  if(isNaN(num)){
    return num;
  }

  num = parseFloat(num);
  if (num >= 10000 * 10000 * 10000) {
    return formatCurrency(num/(10000 * 10000 * 10000), unit);
  }else if (num >= 10000 * 10000 * 1000) {
    return formatCurrency(num/(10000 * 10000 * 1000), unit);
  }else if (num >= 10000 * 10000) {
    return formatCurrency(num/(10000 * 10000), unit);
  }else if (num >= 10000 * 1000) {
    return formatCurrency(num/(10000 * 1000), unit);
  }else if (num >= 10000) {
    return formatCurrency(num / 10000, unit);
  } else {
    return num;
  }
}

/**
 * 不保留小数
 * @param num
 */
function formatNum(num, unit) {
  let t = parseInt(num);
  //时间保留三位有效数字
  if(unit === null || unit === '秒'){
    t = num.toFixed(3);
  }
  let i, r;
  for (t = t.toString().replace(/^(\d*)$/, "$1."), t = (t + "00").replace(/(\d*\.\d\d)\d*/, "$1"), t = t.replace(".", ","), i = /(\d)(\d{3},)/; i.test(t);)
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

/**
 * @title：字符串转日期
 * @author：xuan
 * @date：2018/7/30
 */
export function formatStrToDate(s) {
  s = s.replace(/-/g,"/");
  s = s.replace(/(\.\d+)?/g,"");
  return new Date(s);
}

/**
 * @title：是否上升
 * @author：xuan
 * @date：2018/7/31
 */
export function isRise(val) {
  if(val === null){
    return true;
  }

  val += '';
  return val.indexOf("-") === -1;
}

/**
 * @title：remove
 * @author：xuan
 * @date：2018/7/31
 */
export function remove(val) {
  if(val === null){
    return val;
  }

  val += '';
  return val.split('-')[1];
}
