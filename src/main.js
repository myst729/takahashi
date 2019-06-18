import FastClick from 'fastclick'
import Vue from 'vue'
import VueTouch from 'vue-touch'
import router from './router'
import store from './store'
import Slides from './Slides'

FastClick.attach(document.body)
Vue.use(VueTouch)

const app = new Vue({
  router,
  store,
  ...Slides
})

app.$mount('#app')
