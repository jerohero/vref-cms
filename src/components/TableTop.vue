<script setup lang="ts">
  import CustomButton from '@/components/CustomButton.vue'
  import Search from '@/components/Search.vue'
  import { useTableStore } from '@/stores/table'

  defineProps<{
    resultsLength: number
  }>()

  const tableStore = useTableStore()

  const emit = defineEmits(['createClick'])

  const onCreateRowClick = () => {
    emit('createClick')
  }

  const onQuery = (query: string) => {
    tableStore.$patch({
      query
    })
  }
</script>

<template>
  <div class="py-4 px-6 flex justify-between items-center">
    <div>
      <p class="text-sm text-text">
        Showing
        <span class="font-medium">
          1
        </span>
        to
        <span class="font-medium">
          10
        </span>
        of
        <span class="font-medium">
          {{ resultsLength }}
        </span>
        results
        <span v-if="tableStore.query">
          containing
          <span class="font-medium">
            "{{ tableStore.query }}"
          </span>
        </span>
      </p>
    </div>
    <div class="flex gap-8">
      <Search :on-input="onQuery"/>
      <CustomButton
          text="Add new"
          is-primary
          :on-click="onCreateRowClick"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
