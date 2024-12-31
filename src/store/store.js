// store.js
import { createStore } from 'vuex';

export const SET_LOADING = 'SET_LOADING';
export const SET_APIADDRESS = 'SET_APIADDRESS';
export const SET_IS_AUTHORIZED = 'SET_IS_AUTHORIZED';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_SHOW_LOGIN_MODAL = 'SET_SHOW_LOGIN_MODAL';

const store = createStore({
  state: {
    loading: false,
    apiAddress: process.env.VUE_APP_API_ADDRESS || 'default value',
    isAuthorized: false,
    token: null,
    showLoginModal: false,
  },
  mutations: {
    [SET_LOADING](state, payload) {
      state.loading = payload;
    },
    [SET_APIADDRESS](state, payload) {
      state.apiAddress = payload;
    },
    [SET_IS_AUTHORIZED](state, payload) {
      state.isAuthorized = payload;
    },
    [SET_TOKEN](state, payload) {
      state.token = payload;
    },
    [SET_SHOW_LOGIN_MODAL](state, payload) {
      state.showLoginModal = payload;
    },
  },
  actions: {
    setLoading({ commit }, payload) {
      commit(SET_LOADING, payload);
    },
    setApiAddress({ commit }, payload) {
      commit(SET_APIADDRESS, payload);
    },
    setIsAuthorized({ commit }, payload) {
      commit(SET_IS_AUTHORIZED, payload);
    },
    setToken({ commit }, payload) {
      commit(SET_TOKEN, payload);
    },
    setShowLoginModal({ commit }, payload) {
      commit(SET_SHOW_LOGIN_MODAL, payload);
    },
  },
  getters: {
    loading: (state) => state.loading,
    apiAddress: (state) => state.apiAddress,
    isAuthorized: (state) => state.isAuthorized,
    token: (state) => state.token,
    showLoginModal: (state) => state.showLoginModal,
  },
});

export default store;
