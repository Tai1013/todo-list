<script setup lang="ts">
import { ref } from 'vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/solid'
import Sidebar from './components/Sidebar.vue'
import FormComp from './components/Form.vue'

const mobileSidebarExpand = ref(false)
</script>

<template lang="pug">
.outline-box
  Sidebar(:class="{ 'sidebar-hidden': !mobileSidebarExpand }")
    template(#title="{ title }")
      span {{ title }}
      button(
        class="md:hidden"
        @click="mobileSidebarExpand = !mobileSidebarExpand"
      )
        XMarkIcon(class="w-6 h-6")
  FormComp
    template(#form-top)
      button(
        class="md:hidden"
        @click="mobileSidebarExpand = !mobileSidebarExpand"
      )
        Bars3Icon(class="w-6 h-6")

  .mobile-mask(
    v-show="mobileSidebarExpand"
    @click="mobileSidebarExpand = !mobileSidebarExpand"
  )

</template>

<style scoped lang="scss">
.outline-box {
  @apply relative flex;
}

.sidebar {
  @apply flex-shrink-0 absolute md:relative z-10 h-full;

  &.sidebar-hidden {
    @apply hidden md:flex;
  }
}

.mobile-mask {
  @apply absolute inset-0 bg-black/50 md:hidden;
}
</style>
