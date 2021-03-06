import {formatDate} from '../../assets/common'

// 默认取昨天
let day1 = new Date()
day1.setDate(day1.getDate() - 1)
let day2 = new Date()
day2.setDate(day1.getDate() - 1)
let day3 = new Date()
day3.setDate(day1.getDate() - 6)

const eventParam = {
  beginDate: formatDate(day3, 'yyyy-MM-dd'),
  endDate: formatDate(day1, 'yyyy-MM-dd'),
  granularity: 'day',
  dimensions: [1],
  events: [
    {
      pageName: '',
      eventName: '',
      metric: 'total_count'
    }
  ],
  filter: {
    relation: '',
    conditions: []
  },
  productName: 'my-dafy'
}

const funnelParam = {
  beginDate: formatDate(day2, 'yyyy-MM-dd'),
  endDate: formatDate(day1, 'yyyy-MM-dd'),
  granularity: 'day',
  dimensionCode: 1,
  id: 1,
  filter: {
    relation: '',
    conditions: []
  }
}

const disParam = {
  beginDate: formatDate(day3, 'yyyy-MM-dd'),
  endDate: formatDate(day1, 'yyyy-MM-dd'),
  granularity: 'day',
  dimension: null,
  appName: 'my-dafy',
  pageName: '',
  eventName: '',
  metric: 'total_count',
  filter: {
    relation: '',
    conditions: []
  }
}

const retainParam = {
  beginDate: formatDate(day3, 'yyyy-MM-dd'),
  endDate: formatDate(day1, 'yyyy-MM-dd'),
  productName: 'my-dafy',
  userFilter: {
    relation: '',
    conditions: [
      {
        dimensionCode: '17',
        function: 'not_null',
        params: [
          ''
        ]
      }
    ]
  },
  unit: 'day',
  duration: 7
}

const durationParam = {
  beginDate: formatDate(day3, 'yyyy-MM-dd'),
  endDate: formatDate(day1, 'yyyy-MM-dd'),
  productName: 'my-dafy',
  granularity: 'day',
  dimension: 0,
  firstEvent: {
    pageName: '',
    eventName: ''
  },
  secondEvent: {
    pageName: '',
    eventName: ''
  },
  eventFilter: {
    relation: '',
    conditions: [
      {
        dimensionCode: 0,
        function: '',
        params: [
          ''
        ]
      }
    ]
  },
  userFilter: {
    relation: '',
    conditions: [
      {
        dimensionCode: 0,
        function: '',
        params: [
          ''
        ]
      }
    ]
  }
}

const routeParam = {
  productName: 'my-dafy',
  beginDate: formatDate(day3, 'yyyy-MM-dd'),
  endDate: formatDate(day1, 'yyyy-MM-dd'),
  events: [],
  dimensions: [],
  eventFilter: {
    relation: '',
    conditions: [
      {
        dimensionCode: 0,
        function: '',
        params: [
          ''
        ]
      }
    ]
  },
  userFilter: {
    relation: '',
    conditions: [
      {
        dimensionCode: 0,
        function: '',
        params: [
          ''
        ]
      }
    ]
  },
  specifiedEvent: {},
  isBegin: true
}

const date = {
  state: {
    beginDate: formatDate(day1, 'yyyy-MM-dd'),
    endDate: this.beginDate,
    autoRefreshChartList: [],
    autoRefreshCode: '',
    appName: null,
    channel: null,
    eventItems: ['A'],
    groupItems: [0],
    filterItems: [],
    chartType: 'line',
    eventParam: eventParam,
    activeFunnelIndex: 0,
    funnelParam: funnelParam,
    disParam: disParam,
    retainParam: retainParam,
    durationParam: durationParam,
    routeParam: routeParam
  },
  mutations: {
    addToAutoRefreshChartList (state, chart) {
      if (state.autoRefreshChartList.indexOf(chart) < 0) {
        state.autoRefreshChartList.push(chart)
      }
    },
    updateAutoRefreshCode (state, code) {
      state.autoRefreshCode = code
    },
    removeFromAutoChartList (state, chart) {
      const index = state.autoRefreshChartList.indexOf(chart)
      if (index > 0) {
        state.autoRefreshChartList.splice(index, 1)
      }
    },
    clearChartList (state) {
      state.autoRefreshChartList = []
    },

    updateAppName (state, code) {
      state.appName = code
    },
    clearAppName (state) {
      state.appName = null
    },

    updateChannel (state, code) {
      state.channel = code
    },

    addEventItems (state) {
      state.eventItems.push(String.fromCharCode(state.eventItems.length + 65))
    },
    removeEventItems (state) {
      state.eventItems.splice(state.eventItems.length - 1)
    },
    initEventItems (state) {
      state.eventItems = ['A']
    },

    addGroupItems (state) {
      state.groupItems.push(state.groupItems.length)
    },
    removeGroupItems (state) {
      state.groupItems.splice(state.groupItems.length - 1)
    },
    initGroupItems (state) {
      state.groupItems = [0]
    },

    addFilterItems (state) {
      state.filterItems.push(state.filterItems.length)
    },
    removeFilterItems (state) {
      state.filterItems.splice(state.filterItems.length - 1)
    },
    initFilterItems (state) {
      state.filterItems = []
    },

    updateEventParam (state, param) {
      state.eventParam = null
      state.eventParam = param
    },
    addEventParamEvent (state) {
      let event = {
        pageName: '',
        eventName: '',
        metric: 'total_count'
      }
      state.eventParam.events.push(event)
    },
    removeEventParamEvent (state) {
      state.eventParam.events.splice(state.eventParam.events.length - 1)
    },

    removeEventParamFilter (state) {
      state.eventParam.filter.conditions.splice(state.eventParam.filter.conditions.length - 1)
      if (state.eventParam.filter.conditions.length <= 1) {
        state.eventParam.filter.relation = ''
      }
    },

    updateChartType (state, param) {
      state.chartType = param
    },

    updateActiveFunnelIndex (state, index) {
      state.activeFunnelIndex = index
    },

    updateFunnelParam (state, param) {
      state.funnelParam = null
      state.funnelParam = param
    },
    removeFunnelParamFilter (state) {
      state.funnelParam.filter.conditions.splice(state.funnelParam.filter.conditions.length - 1)
      if (state.funnelParam.filter.conditions.length <= 1) {
        state.funnelParam.filter.relation = ''
      }
    },

    updateDisParam (state, param) {
      state.disParam = null
      state.disParam = param
    },
    removeDisParamFilter (state) {
      state.disParam.filter.conditions.splice(state.disParam.filter.conditions.length - 1)
      if (state.disParam.filter.conditions.length <= 1) {
        state.disParam.filter.relation = ''
      }
    },

    updateRetainParam (state, param) {
      state.retainParam = null
      state.retainParam = param
    },
    removeRetainParamFilter (state) {
      state.retainParam.userFilter.conditions.splice(state.retainParam.userFilter.conditions.length - 1)
      if (state.retainParam.userFilter.conditions.length <= 1) {
        state.retainParam.userFilter.relation = ''
      }
    },

    updateDurationParam (state, param) {
      state.durationParam = null
      state.durationParam = param
    },
    removeDurationParamFilter (state) {
      state.durationParam.userFilter.conditions.splice(state.durationParam.userFilter.conditions.length - 1)
      if (state.durationParam.userFilter.conditions.length <= 1) {
        state.durationParam.userFilter.relation = ''
      }
    },
    removeDurationEventFilter (state) {
      state.durationParam.eventFilter.conditions.splice(state.durationParam.eventFilter.conditions.length - 1)
      if (state.durationParam.eventFilter.conditions.length <= 1) {
        state.durationParam.eventFilter.relation = ''
      }
    },

    updateRouteParam (state, param) {
      state.routeParam = null
      state.routeParam = param
    },
    removeRouteParamFilter (state) {
      state.routeParam.userFilter.conditions.splice(state.routeParam.userFilter.conditions.length - 1)
      if (state.routeParam.userFilter.conditions.length <= 1) {
        state.routeParam.userFilter.relation = ''
      }
    },
    removeDurationEventFilter (state) {
      state.routeParam.eventFilter.conditions.splice(state.routeParam.eventFilter.conditions.length - 1)
      if (state.routeParam.eventFilter.conditions.length <= 1) {
        state.routeParam.eventFilter.relation = ''
      }
    },

    initParam (state) {
      state.eventParam = null
      state.funnelParam = null
      state.disParam = null
      state.retainParam = null
      state.durationParam = null
      state.routeParam = null
      state.eventItems = ['A']
      state.groupItems = [0]
      state.filterItems = []

      state.eventParam = {
        beginDate: formatDate(day3, 'yyyy-MM-dd'),
        endDate: formatDate(day1, 'yyyy-MM-dd'),
        granularity: 'day',
        dimensions: [1],
        events: [
          {
            pageName: '',
            eventName: '',
            metric: 'total_count'
          }
        ],
        filter: {
          relation: '',
          conditions: []
        },
        productName: 'my-dafy'
      }
      state.funnelParam = {
        beginDate: formatDate(day2, 'yyyy-MM-dd'),
        endDate: formatDate(day1, 'yyyy-MM-dd'),
        granularity: 'day',
        dimensionCode: 1,
        id: 1,
        filter: {
          relation: '',
          conditions: []
        }
      }
      state.disParam = {
        beginDate: formatDate(day3, 'yyyy-MM-dd'),
        endDate: formatDate(day1, 'yyyy-MM-dd'),
        granularity: 'day',
        dimension: null,
        appName: 'my-dafy',
        pageName: '',
        eventName: '',
        metric: 'total_count',
        filter: {
          relation: '',
          conditions: []
        }
      }
      state.retainParam = {
        beginDate: formatDate(day3, 'yyyy-MM-dd'),
        endDate: formatDate(day1, 'yyyy-MM-dd'),
        productName: 'my-dafy',
        unit: 'day',
        duration: 7,
        userFilter: {
          relation: '',
          conditions: [ {
            dimensionCode: '17',
            function: 'not_null',
            params: [
              ''
            ]
          }]
        }
      }
      state.durationParam = {
        beginDate: formatDate(day3, 'yyyy-MM-dd'),
        endDate: formatDate(day1, 'yyyy-MM-dd'),
        productName: 'my-dafy',
        granularity: 'day',
        dimension: 0,
        firstEvent: {
          pageName: '',
          eventName: ''
        },
        secondEvent: {
          pageName: '',
          eventName: ''
        },
        eventFilter: {
          relation: '',
          conditions: [
            {
              dimensionCode: 0,
              function: '',
              params: [
                ''
              ]
            }
          ]
        }
      }
      state.routeParam = {
        productName: 'my-dafy',
        beginDate: formatDate(day3, 'yyyy-MM-dd'),
        endDate: formatDate(day1, 'yyyy-MM-dd'),
        events: [],
        dimensions: [],
        eventFilter: {
          relation: '',
          conditions: [
            {
              dimensionCode: 0,
              function: '',
              params: [
                ''
              ]
            }
          ]
        },
        userFilter: {
          relation: '',
          conditions: [
            {
              dimensionCode: 0,
              function: '',
              params: [
                ''
              ]
            }
          ]
        },
        specifiedEvent: {},
        isBegin: true
      }
    }
  }
}

export default date
