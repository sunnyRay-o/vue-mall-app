import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideBarList: [],
  },
  mutations: {
    setSideList(state, list) {
      state.sideBarList = list;
    },
  },
  actions: {
    getSideList({ commit }, type) {
      api.getSideBarList(type).then((resp) => {
        commit('setSideList', resp);
      });
    },
    async getGoodsList({ state, commit }, options) {
      const { page, sortType } = options;
      const type = options.type || state.type;
      commit('setGoodsType', type);
      const { list, total } = await api.getGoodsList(type, page, state.size, sortType);
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
