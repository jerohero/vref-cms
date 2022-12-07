<script setup lang="ts">
import TableRow from "@/components/TableRow.vue";

defineProps<{
  data: any[],
  columns: string[]
}>()
</script>

<template>
  <div class="overflow-x-auto relative">
    <table class="w-full text-left text-text">
      <thead class="bg-backgroundDark border-y border-y-line text-sm">
        <tr>
          <th scope="col" class="py-5 px-6">
            #
          </th>
          <th v-for="col in columns" v-bind:key="col" scope="col" class="py-5 px-6">
            {{ col }}
          </th>
          <th scope="col" class="py-5 px-6">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="text-textDark">
        <TableRow v-for="row in data" v-bind:key="row.id" :row-data="row"/>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
