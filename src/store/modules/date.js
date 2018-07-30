import {formatDate} from "../../assets/common";

//默认取昨天
let day1 = new Date();
day1.setDate(day1.getDate() - 1);

const date = {
  state: {
    beginDate: formatDate(day1, 'yyyy-MM-dd'),
    endDate: this.beginDate,
    autoRefreshChartList: [],
    autoRefreshCode: '',
    appName: 'vip-loan'
  },
  mutations: {
    addToAutoRefreshChartList (state, chart) {
      if (state.autoRefreshChartList.indexOf(chart) < 0) {
        state.autoRefreshChartList.push(chart)
      }
    },
    clearChartList (state) {
      state.autoRefreshChartList = [];
    },
    removeFromAutoChartList (state, chart) {
      const index = state.autoRefreshChartList.indexOf(chart);
      if (index > 0) {
        state.autoRefreshChartList.splice(index, 1)
      }
    },
    updateAutoRefreshCode (state, code) {
      state.autoRefreshCode = code
    },
    updateAppName (state, code) {
      state.appName = code
    },
    clearAppName (state) {
      state.appName = null
    },
  }
};

export default date
