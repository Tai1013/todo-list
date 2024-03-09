import dayjs from 'dayjs'
import { storeToRefs, useTemplateStore } from '@/stores'

export const useTemplate = () => {
  const { selected, templates } = storeToRefs(useTemplateStore())

  const add = () => {
    let id = 1
    const tempIndex = templates.value.map(temp => Number(temp.id.split('temp-')[1]))

    if(tempIndex.length > 0) id = Math.max(...tempIndex) + 1
    
    templates.value.push({
      id: 'temp-' + id,
      title: 'new item title',
      startTime: dayjs().format('YYYY-MM-DD'),
      endTime: dayjs().add(1, 'day').format('YYYY-MM-DD')
    })

    selected.value = 'temp-' + id
  }

  const remove = (id: string) => {
    templates.value = templates.value.filter(template => template.id !== id)
    selected.value = ''
  }

  return {
    add,
    remove
  }
}
