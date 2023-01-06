import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSlidesStore = defineStore('slides', () => {
  const meta = ref({})
  const slides = ref([])
  const page = ref('')

  function setMeta (val) {
    meta.value = val
  }
  function setSlides (val) {
    slides.value = val
  }
  function setPage (val) {
    page.value = val
  }

  return { meta, slides, page, setMeta, setSlides, setPage }
})
