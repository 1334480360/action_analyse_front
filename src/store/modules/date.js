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
    appName: null,
    eventItems: ['A'],
    groupItems: [0],
    filterItems: [],
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
      const index = state.autoRefreshChartList.indexOf(chart);
      if (index > 0) {
        state.autoRefreshChartList.splice(index, 1)
      }
    },
    clearChartList (state) {
      state.autoRefreshChartList = [];
    },

    updateAppName (state, code) {
      state.appName = code
    },
    clearAppName (state) {
      state.appName = null
    },

    addEventItems (state) {
      state.eventItems.push(String.fromCharCode(state.eventItems.length + 65));
    },
    removeEventItems (state) {
      state.eventItems.splice(state.eventItems.length - 1)
    },
    initEventItems (state) {
      state.eventItems = [0]
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
      state.filterItems = [0]
    },


  }
};

export default date
