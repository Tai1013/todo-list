<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs, useTemplateStore } from '@/stores'
import { useTemplate } from '@/composables'

const title = import.meta.env.VITE_APP_TITLE
const image = ref('')
const { selected, templates } = storeToRefs(useTemplateStore())
const { add } = useTemplate()

const getImage = async () => {
  const result = await fetch('https://picsum.photos/200/300.jpg', {
    method: 'get'
  })
  image.value = result.url
}

onMounted(async () => {
  await getImage()
})
</script>

<template lang="pug">
.sidebar
  div
    .sidebar-title
      slot(name="title" :title="title")
        span {{ title }}
    .sidebar-content(v-if="templates.length > 0")
      .sidebar-content-item(
        v-for="(template, index) in templates"
        :key="template.id"
        :class="{ 'active': template.id === selected }"
        @click="selected = template.id"
      )
        span {{ index + 1 }}. {{ template.title }}
    .sidebar-add
      button.btn(@click="add()") Add Item
  div
    .sidebar-image
      button(@click="getImage")
        img(v-if="image" :src="image")
</template>

<style scoped lang="scss">
.sidebar {
  @apply flex flex-col justify-between text-black bg-primary-2 w-60 h-full;

  > div > div {
    @apply py-4;

    & + div {
      @apply pt-0;
    }
  }

  &-title,
  &-image,
  &-add {
    @apply px-4
  }

  &-title {
    @apply flex justify-between items-center text-lg;
  }

  &-content {
    @apply flex flex-col gap-2;

    &-item {
      @apply relative px-4 py-2.5 flex items-center bg-primary-3 cursor-pointer;

      span {
        @apply pr-2 line-clamp-1;
      }

      &.active {
        @apply before:absolute before:inset-y-0 before:right-0 before:border-transparent before:border-r-white before:border-[22px];
      }
    }
  }

  &-image {
    @apply flex;

    button {
      @apply w-full h-16 bg-grey rounded-md overflow-hidden;

      > img {
        @apply w-full h-full object-cover;
      }
    }
  }
}

.btn {
  @apply w-full;
}
</style>
