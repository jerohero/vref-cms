<script setup lang="ts">
import IconButton from "@/components/IconButton.vue";

const props = defineProps<{
  rowData: any
}>()

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
</script>

<template>
  <tr class="border-b border-b-line text-sm">
    <th scope="row" class="py-5 px-6 whitespace-nowrap">
      {{ rowData.id.display }}
    </th>
    <td v-for="rowKey in getRowDataWithoutId()" v-bind:key="rowKey" class="py-5 px-6">
      {{ getDisplayValue(rowKey) }}
    </td>
    <td class="py-5 px-6 flex gap-2 text-xl">
      <IconButton icon="pencil-outline" color="text-edit"/>
      <IconButton icon="trash-outline" color="text-delete"/>
    </td>
  </tr>
</template>

<style scoped>

</style>
