<script setup lang="ts">
import IconButton from '@/components/IconButton.vue'
import { ref } from 'vue'
import InputCombobox from "@/components/InputCombobox.vue";
import ConfirmationModal from "@/components/ConfirmationModal.vue";

const props = defineProps<{
  rowData: any
}>()

const isEditing = ref<boolean>()
const isDeleting = ref<boolean>()

const getDisplayValue = (rowKey: any) => {
  if (Array.isArray(rowKey.display)) {
    return rowKey.display.join(', ')
  }

  return rowKey?.display
}

const getEditBoxes = (rowKey: any) => {
  for (const rowKeyElement of rowKey) {

  }
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

const onCancel = () => {
  isEditing.value = false
}

const onDelete = () => {
  isDeleting.value = true
}

const onDeleteCancel = () => {
  isDeleting.value = false
}

const onDeleteConfirm = () => {
  isDeleting.value = false
}
</script>

<template>
  <tr class="border-b border-b-line text-sm">
    <th scope="row" class="py-5 px-6 whitespace-nowrap">
      {{ rowData.id.display }}
    </th>
    <td v-for="rowKey in getRowDataWithoutId()" v-bind:key="rowKey" class="px-6">
      <span v-if="!isEditing || !rowKey.editable" class="py-5">
        {{ getDisplayValue(rowKey) }}
      </span>
      <!-- Do if multiple items -->
      <InputCombobox
          v-else-if="rowKey.editType === 'search-multiple'"
          :row-item="rowKey"
          multiple
          :min-items="2"
          :max-items="2"
      />
      <InputCombobox
          v-else-if="rowKey.editType === 'search-single'"
          :rowItem="rowKey"
      />
    </td>
    <td class="px-6 text-xl select-none">
      <div v-if="isEditing" class="flex gap-1">
        <IconButton :on-click="onSave" is-save class="text-3xl" />
        <IconButton :on-click="onCancel" is-cancel class="text-3xl" />
      </div>
      <div v-else class="flex gap-3">
        <IconButton :on-click="onEdit" is-edit class="text-2xl" />
        <IconButton :on-click="onDelete" is-delete class="text-2xl" />
      </div>
    </td>
  </tr>
  <ConfirmationModal
      v-if="isDeleting"
      :onCancel="onDeleteCancel"
      :onConfirm="onDeleteConfirm"
      title="Delete training"
      type="alert"
      content="Are you sure you want to delete this training? This action cannot be undone."
      confirm-text="Delete"
  />
</template>

<style scoped>

</style>
