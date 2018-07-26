import request from '@/utils/request'

//根据模块获取所有指标
export function indexList(code) {
  return request({
    url: 'http://localhost:8017/action-analyse/preview/data/getIndexList',
    method: 'post',
    data: {code: code}
  })
}

//获取指标详细
export function indexDetail(id, code, beginDate, endDate) {
  // console.log(id + ", " + code + ", " + beginDate + ", " + endDate);
  return request({
    url: 'http://localhost:8017/action-analyse/preview/data/getIndexVo',
    method: 'post',
    data: {
      id: id,
      code: code,
      beginDate: beginDate,
      endDate: endDate
    }
  })
}
