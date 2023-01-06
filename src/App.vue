<template>
  <div class="slides" v-touch:swipe.left="nextSlide" v-touch:swipe.right="prevSlide">
    <Transition>
      <LoadingSpinner v-if="total === 0" key="spinner" class="spinner" />
    </Transition>
    <router-view v-if="total > 0" :key="route.path" class="slide"></router-view>
    <div class="fullscreen" @click="toggleFullscreen"></div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSlidesStore } from './store/index.js'
import LoadingSpinner from './components/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const store = useSlidesStore()

const page = computed(() => store.page)
const total = computed(() => store.slides.length)

const loadContent = async (url) => {
  const response = await fetch(url)
  const { meta, slides } = await response.json()
  setTimeout(() => {

  store.setMeta(meta)
  store.setSlides(slides)
  }, 1000)
}

const navigate = (target) => {
  const p = Math.min(Math.max(1, target), total.value)
  router.push(`/${p}`)
}

const prevSlide = () => {
  navigate(page.value - 1)
}

const nextSlide = () => {
  navigate(page.value + 1)
}

const bindKeyEvents = () => {
  window.addEventListener('keydown', e => {
    switch (e.keyCode) {
      case 37: // left
      case 38: // up
        prevSlide()
        return
      case 32: // space
      case 39: // right
      case 40: // down
        nextSlide()
    }
  }, false)
}

const toggleFullscreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}

onMounted(async () => {
  if (total.value === 0) {
    await loadContent('./content.json')
    bindKeyEvents()
  }
})
</script>

<style lang="stylus">
  *
  *:before
  *:after
    box-sizing border-box

  html
  body
    height 100%

  body
    background #2d3e4f
    font-family 'PingFang SC', 'Microsoft Yahei', 'Helvetica Neue', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    margin 0
    display flex

  #app
    display flex
    flex 1

  .slides
    background #2c3e50
    color #ecf0f1
    display flex
    align-items center
    justify-content center
    flex 1

  .fullscreen
    background #283847
    height 48px
    width 48px
    position fixed
    top 0
    right 0
    z-index 1000
    cursor pointer

  .spinner
    height 20vh
    width 20vh
    position fixed
    z-index 2000

  .v-enter-active
  .v-leave-active
    transition opacity 1s ease

  .v-enter-from
  .v-leave-active
    opacity 0
</style>
