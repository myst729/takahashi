<template>
  <v-touch class="slides" @swipeleft="nextSlide" @swiperight="prevSlide">
    <div class="fullscreen" @click="toggleFullscreen"></div>
    <transition name="fade" mode="out-in" appear>
      <spinner v-if="total === 0" key="spinner" class="spinner"></spinner>
      <router-view v-if="total > 0" :key="$route.path" class="slide"></router-view>
    </transition>
  </v-touch>
</template>

<script>
  import Spinner from './components/Spinner'

  export default {
    name: 'slides',

    components: {
      Spinner
    },

    computed: {
      config () {
        return this.$store.getters.config
      },

      page () {
        return this.$store.getters.page
      },

      total () {
        return this.$store.getters.slides.length
      }
    },

    methods: {
      saveContent (content) {
        this.$store.dispatch('meta', content.meta)
        this.$store.dispatch('slides', content.slides)
      },

      loadContent (url) {
        fetch(url)
          .then(response => response.json())
          .then(this.saveContent)
      },

      navigate (page) {
        const p = Math.min(Math.max(1, page), this.total)
        this.$router.push(`/${p}`)
      },

      prevSlide () {
        this.navigate(this.page - 1)
      },

      nextSlide () {
        this.navigate(this.page + 1)
      },

      bindKeyEvents () {
        window.addEventListener('keydown', e => {
          switch (e.keyCode) {
            case 37: // left
            case 38: // up
              this.prevSlide()
              return
            case 32: // space
            case 39: // right
            case 40: // down
              this.nextSlide()
          }
        }, false)
      },

      toggleFullscreen () {
        if (document.webkitFullscreenElement) {
          document.webkitExitFullscreen()
        } else {
          document.documentElement.webkitRequestFullscreen()
        }
      }
    },

    created () {
      if (this.total === 0) {
        this.loadContent('./static/content.json')
      }
      this.bindKeyEvents()
    }
  }
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

  .fullscreen
    background #283847
    height 48px
    width 48px
    position fixed
    top 0
    right 0
    z-index 1000

  .slides
    background #2c3e50
    color #ecf0f1
    display flex
    align-items center
    justify-content center
    height 100%
    width 100%

  .spinner
    height 10vh
    width 10vh

  .fade-enter-active
  .fade-leave-active
    transition opacity .3s ease

  .fade-enter
  .fade-leave-active
    opacity 0
</style>
