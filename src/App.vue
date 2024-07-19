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

const breakLines = (text) => text.split('\n').map(l => l.trim()).filter(l => l.length)

const parseContent = (text) => {
  const [meta, content] = text.split(/\n-{3,}\n/)
  const [title, speaker, url] = breakLines(meta)
  const pages = breakLines(content).map(l => l.split(/\s{0,},\s{0,}/))
  return {
    meta: { title, speaker, url },
    slides: pages,
  }
}

const loadContent = async (url) => {
  const response = await fetch(url)
  const text = await response.text()
  const { meta, slides } = parseContent(text)
  store.setMeta(meta)
  store.setSlides(slides)
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
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        prevSlide()
        return
      case ' ':
      case 'ArrowRight':
      case 'ArrowDown':
        nextSlide()
        return
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
    await loadContent('./content.md')
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
