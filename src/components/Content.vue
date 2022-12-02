<script setup lang="ts">
import Table from "@/components/Table.vue";

defineProps<{

}>()
</script>

<template>
  <div class="bg-foreground m-10 rounded-[3px] text-text">
    <div class="py-6 px-7 flex justify-between">
      <div class="">
        <p>429 results</p>
      </div>
      <div class="">
        <button>Add new</button>
      </div>
    </div>
    <Table/>
  </div>
</template>

<style scoped>

</style>
