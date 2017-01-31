<template>
  <div class="content">
    <p v-for="line in lines" class="line" :style="{'font-size': fontSize + 'px'}" v-text="line"></p>
  </div>
</template>

<script>
  export default {
    name: 'slide',

    computed: {
      slides () {
        return this.$store.getters.slides
      },

      page () {
        return +this.$route.params.page
      }
    },

    data () {
      return {
        lines: [],
        fontSize: 16
      }
    },

    methods: {
      getSlideContent () {
        var content = this.slides[this.page - 1]
        this.lines = Array.isArray(content) ? content : [content]
      },

      calculateFontSize () {
        var { height: slidesHeight, width: slidesWidth } = this.$el.parentNode.getBoundingClientRect()
        var { height: slideHeight, width: slideWidth } = this.$el.getBoundingClientRect()
        var verticalFactor = 0.85 * slidesHeight / slideHeight
        var horizontalFactor = 0.85 * slidesWidth / slideWidth
        this.fontSize = Math.floor(Math.min(verticalFactor, horizontalFactor) * 16)
      }
    },

    created () {
      this.$store.dispatch('page', this.page)
      this.getSlideContent()
      this.$nextTick(this.calculateFontSize)
    }
  }
</script>

<style lang="stylus">
  .line
    font-weight 500
    line-height 1.2
    text-align center
    margin 0
</style>
