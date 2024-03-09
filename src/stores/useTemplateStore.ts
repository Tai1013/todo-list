import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTemplateStore = defineStore('templateStore',
  () => {
    const selected = ref('')
    const templates = ref<GlobalApp.TemplateType[]>([])

    return {
      selected,
      templates
    }
  }
)
