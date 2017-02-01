import 'es6-promise/auto'

import FastClick from 'fastclick'
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueTouch from 'vue-touch'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import Slides from './Slides'

FastClick.attach(document.body)
Vue.use(VueResource)
Vue.use(VueTouch)
sync(store, router)

const app = new Vue({
  router,
  store,
  ...Slides
})

app.$mount('#app')
