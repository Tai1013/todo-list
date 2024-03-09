<script setup lang="ts">
import dayjs from 'dayjs'
import { ref, computed } from 'vue'
import { TrashIcon } from '@heroicons/vue/24/solid'
import { storeToRefs, useTemplateStore } from '@/stores'
import { useTemplate } from '@/composables'

const { selected, templates } = storeToRefs(useTemplateStore())
const { remove } = useTemplate()

const uploadRef = ref<HTMLInputElement | null>(null)
const uploadInputRef = ref<HTMLInputElement | null>(null)

const isSelected = computed(() => selected.value !== '')
const currentIndex = computed(() => templates.value.findIndex(template => template.id === selected.value))
const currentTemp = computed(() => templates.value[currentIndex.value])
const rangeDateTime = computed(() => ({
  min: dayjs(currentTemp.value.startTime).add(1, 'day').format('YYYY-MM-DD'),
  max: dayjs(currentTemp.value.endTime).subtract(1, 'day').format('YYYY-MM-DD')
}))

const handleDateChange = (event: FocusEvent, type: 'start' | 'end') => {
  const date = (event.target as HTMLInputElement)?.value
  if (type === 'start' && dayjs(date).isBefore(dayjs(currentTemp.value.endTime)) === false) {
    currentTemp.value.startTime = rangeDateTime.value.max
  }
  if (type === 'end' && dayjs(date).isAfter(dayjs(currentTemp.value.startTime)) === false) {
    currentTemp.value.endTime = rangeDateTime.value.min
  }
}

const handleUpdate = () => {
  uploadRef.value?.click()
}

const handleInputUpdate = () => {
  const oneFile = uploadRef.value?.files?.item(0)
  if (oneFile) {
    if (uploadInputRef.value) uploadInputRef.value.value = ''
    currentTemp.value.image = URL.createObjectURL(oneFile)
  }
}

const handleInputBlur = async (event: FocusEvent) => {
  try {
    const image = new URL((event.target as HTMLInputElement)?.value)
    currentTemp.value.image = image.href
  } catch (error) {
    currentTemp.value.image = ''
    if (uploadInputRef.value) uploadInputRef.value.value = ''
  }
}

const errorImage = () => {
  currentTemp.value.image = ''
}
</script>

<template lang="pug">
.form-outline
  .form-top
    div
      slot(name="form-top")
    div
      button(v-if="isSelected")
        TrashIcon(class="w-6 h-6" @click="remove(selected)")
  .from-content(v-if="isSelected")
    .from-content-item(class="flex-auto")
      input(
        v-model="currentTemp.title"
      )
    
    .from-content-group(class="md:w-80")
      .from-content-item(class="flex-1 min-w-32")
        input(
          v-model="currentTemp.startTime"
          type="date"
          :max="rangeDateTime.max"
          @blur="handleDateChange($event, 'start')"
        )
      span ~
      .from-content-item(class="flex-1 min-w-32")
        input(
          v-model="currentTemp.endTime"
          type="date"
          :min="rangeDateTime.min"
          @blur="handleDateChange($event, 'end')"
        )

  .from-content(v-if="isSelected")
    .from-content-group(class="flex-col flex-auto")
      .from-content-update
        button.btn(
          class="w-full"
          @click="handleUpdate"
        ) Upload Image
        input(
          ref="uploadRef"
          type="file"
          hidden
          @change="handleInputUpdate()"
        )
        span or
        .from-content-item(class="w-full")
          input(
            ref="uploadInputRef"
            type="url"
            placeholder="請輸入圖片網址"
            @blur="handleInputBlur"
          )
    .from-content-image(class="md:w-80 h-[124px]")
      img(v-if="currentTemp.image" :src="currentTemp.image" @error.once="errorImage")
    
  .from-content(v-if="isSelected")
    .from-content-item(class="flex-auto relative")
      textarea(v-model="currentTemp.content" maxlength="200" class="min-h-28" placeholder="請輸入")
      .textarea-number {{ currentTemp.content?.length || 0 }} / 200
</template>

<style scoped lang="scss">
.form-outline {
  @apply w-full h-full;
}

.form-top {
  @apply p-4 w-full flex justify-between items-center;

  > div {
    @apply flex items-center;
  }
}

.from-content-group {
  @apply flex items-center gap-2.5;
}

.from-content-update {
  @apply w-full flex flex-col items-center gap-2;
}

.from-content-image {
  @apply bg-grey rounded-lg overflow-hidden;

  img {
    @apply w-full h-full object-cover;
  }
}

.from-content {
  @apply flex flex-col md:flex-row p-4 pt-0 gap-4;

  &-item {
    @apply relative px-4 py-2.5 bg-grey rounded-lg;

    input,
    textarea {
      @apply text-sm md:text-base w-full outline-none border-0 bg-transparent resize-none;
    }
  }
}

.textarea-number {
  @apply absolute right-2 bottom-2 text-xs;
}
</style>
