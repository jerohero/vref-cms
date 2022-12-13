<script setup lang="ts">
import IconButton from "@/components/IconButton.vue";

defineProps<{
  rowData: any
}>()
</script>

<template>
  <tr class="border-b border-b-line text-sm">
    <th scope="row" class="py-5 px-6 whitespace-nowrap">
      {{ rowData.id }}
    </th>
    <td v-for="value in rowData" v-bind:key="value" class="py-5 px-6">
      {{ value.name || value }}
    </td>
    <td class="py-5 px-6 flex gap-2 text-xl">
      <IconButton icon="pencil-outline" color="text-edit"/>
      <IconButton icon="trash-outline" color="text-delete"/>
    </td>
  </tr>
</template>

<style scoped>

</style>
