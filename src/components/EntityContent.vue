<script setup lang="ts">
import Table from "@/components/Table.vue";
import TableTop from "@/components/TableTop.vue";

defineProps<{

}>()
</script>

<template>
  <div class="bg-foreground rounded-[3px] text-text mt-5">
    <TableTop/>
    <Table/>
  </div>
</template>

<style scoped>

</style>
