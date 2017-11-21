import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  meta: {},
  slides: [],
  page: -1
}

const actions = {
  meta ({ commit, state }, meta) {
    commit('setMeta', { meta })
  },

  slides ({ commit, state }, slides) {
    commit('setSlides', { slides })
  },

  page ({ commit, state }, page) {
    commit('setPage', { page })
  }
}

const mutations = {
  setMeta (state, { meta }) {
    state.meta = meta
  },

  setSlides (state, { slides }) {
    state.slides = slides
  },

  setPage (state, { page }) {
    state.page = page
  }
}

const getters = {
  meta: state => state.meta,
  slides: state => state.slides,
  page: state => state.page
}

const store = new Vuex.Store({
  actions,
  mutations,
  getters,
  state
})

export default store
