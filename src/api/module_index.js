import request from '@/utils/request'

let baseUrl = 'http://10.10.11.137:8017/action-analyse'
// let baseUrl = 'http://localhost:8017/action-analyse';

// 结果统一处理
export function resultHandle (res) {
  if (res.data.result === 'fail') {
    return res.data.message
  }
  return null
}

// 根据模块获取所有指标
export function indexList (code) {
  return request({
    url: baseUrl + '/preview/data/getIndexList',
    method: 'post',
    data: {code: code}
  })
}

// 获取指标详细
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

// 获取事件分析结果
export function eventResult (eventParam) {
  return request({
    url: baseUrl + '/analysis/event/getResult',
    method: 'post',
    data: eventParam
  })
}

// 获取漏斗列表
export function funnelList (productName, channel) {
  return request({
    url: baseUrl + '/analysis/funnel/getFunnelList',
    method: 'post',
    data: {
      productName: productName,
      channel: channel
    }
  })
}
// 获取漏斗分析数据
export function queryFunnel (funnelParam) {
  return request({
    url: baseUrl + '/analysis/funnel/queryFunnel',
    method: 'post',
    data: funnelParam
  })
}

// 获取分布分析数据
export function queryDistribution (disParam) {
  return request({
    url: baseUrl + '/analysis/distribution/getPage',
    method: 'post',
    data: disParam
  })
}

// 获取留存分析结果
export function queryRetain (param) {
  return request({
    url: baseUrl + '/analysis/retain/getResult',
    method: 'post',
    data: param
  })
}

// 获取间隔分析结果
export function queryDuration (param) {
  return request({
    url: baseUrl + '/analysis/duration/getResult',
    method: 'post',
    data: param
  })
}
