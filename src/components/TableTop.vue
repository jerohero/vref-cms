<script setup lang="ts">
  import CustomButton from '@/components/CustomButton.vue'
  import Search from '@/components/Search.vue'

  defineProps<{
    resultsLength: number
  }>()
</script>

<template>
  <div class="py-4 px-6 flex justify-between items-center">
    <div>
      <p class="text-sm text-text">
        Showing
        <span class="font-medium">1</span>
        to
        <span class="font-medium">10</span>
        of
        <span class="font-medium">
          {{ resultsLength }}
        </span>
        results
      </p>
    </div>
    <div class="flex gap-8">
      <Search/>
      <CustomButton text="Add new" is-primary/>
    </div>
  </div>
</template>

<style scoped>

</style>
