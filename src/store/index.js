import Vue from 'vue'
import Vuex from 'vuex'
import * as config from 'config'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

Vue.use(Vuex)

const state = {
  config,
  meta: {},
  slides: [],
  page: -1
}

const store = new Vuex.Store({
  actions,
  mutations,
  getters,
  state
})

export default store
