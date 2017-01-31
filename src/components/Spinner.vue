<template>
  <svg width="256" height="256" viewBox="0 0 256 256">
    <g class="group">
      <circle class="stripe" :class="styleClass" cx="128" cy="128" r="114" />
    </g>
  </svg>
</template>

<script>
  export default {
    name: 'spinner',

    computed: {
      styleClass () {
        return `stripe-${this.$store.getters.config.style}`
      }
    }
  }
</script>

<style lang="stylus">
  .group
    transform-origin center
    animation group 1.5s linear infinite

  .stripe
    fill none
    stroke-width 16
    stroke-linecap round
    stroke-dashoffset 0
    stroke-dasharray 672
    transform-origin center
    animation stripe 1.5s ease-in-out infinite

  .stripe-light
    stroke #3498db

  .stripe-dark
    stroke #ecf0f1

  @keyframes group
    0%
      transform rotate(0deg)
    100%
      transform rotate(270deg)

  @keyframes stripe
    0%
      stroke-dashoffset 660
    50%
      stroke-dashoffset 330
      transform rotate(135deg)
    100%
      stroke-dashoffset 660
      transform rotate(450deg)
</style>
