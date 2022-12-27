<script setup lang="ts">
import IconButton from '@/components/IconButton.vue'
import { ref } from 'vue'

const props = defineProps<{
  rowData: any
}>()

const isEditing = ref<boolean>()

const getDisplayValue = (rowKey: any) => {
  if (Array.isArray(rowKey.display)) {
    return rowKey.display.join(', ')
  }

  return rowKey?.display
}

const getRowDataWithoutId = () => {
  let {id, ...withoutId} = props.rowData;

  return withoutId
}

const onEdit = () => {
  isEditing.value = true
}

const onSave = () => {
  isEditing.value = false
}

const onDelete = () => {

}
</script>

<template>
  <tr class="border-b border-b-line text-sm">
    <th scope="row" class="py-5 px-6 whitespace-nowrap">
      {{ rowData.id.display }}
    </th>
    <td v-for="rowKey in getRowDataWithoutId()" v-bind:key="rowKey" class="py-5 px-6">
      {{ getDisplayValue(rowKey) }}
    </td>
    <td class="py-5 px-6 text-xl">
      <div v-if="isEditing">
        <IconButton :on-click="onSave" is-save class="text-2xl" />
      </div>
      <div v-else class="flex gap-2">
        <IconButton :on-click="onEdit" is-edit />
        <IconButton :on-click="onDelete" is-delete />
      </div>
    </td>
  </tr>
</template>

<style scoped>

</style>
