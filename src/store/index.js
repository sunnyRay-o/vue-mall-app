import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideBarList: [],
    goodsList: [],
    size: 5,
    showContent: false,
    type: null,
    total: 0,
    // {id(产品id): num};
    counterMap: {},
  },
  mutations: {
    // 添加购物车操作后，需要做的事情
    changeStorage(state, { id, value }) {
      if (state.counterMap[id]) {
        // 看counterMap的某一个属性是否有值,有值就可以继续操作
        if ((value === -1 && state.counterMap[id] === 1) || value === -Infinity) {
          Vue.delete(state.counterMap, id);
        } else {
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        // 没值就设置一个初始值
        Vue.set(state.counterMap, id, 1);
      }
      // 设置本地存储
      localStorage.setItem('goods', JSON.stringify(state.counterMap));
    },
    setSideList(state, list) {
      state.sideBarList = list;
    },
    setGoodsList(state, list) {
      state.goodsList = [...state.goodsList, ...list];
    },
    setShowContent(state, bool) {
      state.showContent = bool;
    },
    resetGoodsList(state) {
      state.goodsList = [];
    },
    setGoodsType(state, type) {
      state.type = type;
    },
    setCounterMap(state, map) {
      state.counterMap = map;
    },
  },
  actions: {
    getSideList({ commit }, type) {
      commit('setShowContent', false);
      api.getSideBarList(type).then((resp) => {
        commit('setSideList', resp);
        commit('setShowContent', true);
      });
    },
    async getGoodsList({ commit, state }, options) {
      const { page, sort } = options;
      const type = options.type || state.type;
      commit('setGoodsType', type);
      const { list, total } = await api.getGoodsList(type, page, state.size, sort);
      commit('setGoodsList', list);
      if (total > state.goodsList.length) {
        return true;
      }
      return false;
    },
  },
  modules: {
  },
});
