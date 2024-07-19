<template>
  <div ref="root" class="content">
    <p v-for="(line, n) in lines" :key="n" class="line" :style="{'font-size': fontSize + 'px'}" v-text="line"></p>
  </div>
</template>

<script setup>
import { computed, onMounted, nextTick, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSlidesStore } from '../store/index.js'

const router = useRouter()
const route = useRoute()
const store = useSlidesStore()

const slides = computed(() => store.slides)
const page = computed(() => +route.params.page)
const root = ref(null)
const lines = ref([])
const fontSize = ref(16)

const getSlideContent = () => {
  const content = slides.value[page.value - 1]
  lines.value = Array.isArray(content) ? content : [content]
}

const calculateFontSize = () => {
  const el = root.value
  if (el && el.parentNode) {
    const { height: slidesHeight, width: slidesWidth } = el.parentNode.getBoundingClientRect()
    const { height: slideHeight, width: slideWidth } = el.getBoundingClientRect()
    const verticalFactor = 0.85 * slidesHeight / slideHeight
    const horizontalFactor = 0.85 * slidesWidth / slideWidth
    fontSize.value = Math.floor(Math.min(verticalFactor, horizontalFactor) * 16)
  }
}

onMounted(async () => {
  await store.setPage(page.value)
  getSlideContent()
  await nextTick(calculateFontSize)
})
</script>

<style lang="stylus">
  .line
    font-weight 500
    line-height 1.2
    text-align center
    margin 0
</style>
