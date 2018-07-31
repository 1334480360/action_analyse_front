import request from '@/utils/request'

let baseUrl = 'http://10.10.11.137:8017/action-analyse';

//根据模块获取所有指标
export function indexList(code) {
  return request({
    url: baseUrl + '/preview/data/getIndexList',
    method: 'post',
    data: {code: code}
  })
}

//获取指标详细
export function indexDetail (id, code, beginDate, endDate, appName) {
  return request({
    url: baseUrl + '/preview/data/getIndexVo',
    method: 'post',
    data: {
      id: id,
      code: code,
      beginDate: beginDate,
      endDate: endDate,
      appName: appName
    }
  })
}
