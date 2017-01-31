<template>
  <div class="slides" :class="styleClass">
    <transition name="fade" mode="out-in" appear>
      <spinner v-if="total === 0" key="spinner" class="spinner"></spinner>
      <router-view v-if="total > 0" :key="$route.path" class="slide"></router-view>
    </transition>
  </div>
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

      styleClass () {
        return `slides-${this.config.style}`
      },

      page () {
        return this.$store.getters.page
      },

      total () {
        return this.$store.getters.slides.length
      }
    },

    methods: {
      getContent (url) {
        return this.$http.get(url)
      },

      saveContent (content) {
        this.$store.dispatch('meta', content.meta)
        this.$store.dispatch('slides', content.slides)
      },

      loadContent (url) {
        this.getContent(url)
          .then(response => response.json())
          .then(this.saveContent)
      },

      navigate (page) {
        const p = Math.min(Math.max(1, page), this.total)
        this.$router.push(`/${p}`)
      },

      bindKeyEvents () {
        window.addEventListener('keydown', e => {
          switch (e.keyCode) {
            case 37: // left
            case 38: // up
              this.navigate(this.page - 1)
              return
            case 32: // space
            case 39: // right
            case 40: // down
              this.navigate(this.page + 1)
              return
          }
        }, false)
      }
    },

    created () {
      if (this.total === 0) {
        this.loadContent(this.config.content)
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
    font-family 'PingFang SC', 'Microsoft Yahei', 'Helvetica Neue', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    margin 0

  .slides
    display flex
    align-items center
    justify-content center
    height 100%
    width 100%

  .slides-light
    background #ecf0f1
    color #34495e

  .slides-dark
    background #2c3e50
    color #ecf0f1

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
