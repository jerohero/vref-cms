<script setup lang="ts">
import TableRow from "@/components/TableRow.vue";

defineProps<{

}>()

const columns = [
    '#', 'Status', 'Instructor', 'Students', 'Date', 'Actions'
]
</script>

<template>
  <div class="overflow-x-auto relative">
    <table class="w-full text-left text-text">
      <thead class="bg-backgroundDark border-y border-y-line text-sm">
        <tr>
          <th v-for="col in columns" scope="col" class="py-5 px-6">
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody class="text-textDark">
        <TableRow/>
        <TableRow/>
        <TableRow/>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
