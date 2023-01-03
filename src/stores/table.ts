import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { useRouter } from 'vue-router'

interface State {
  query: Ref<string>
}

export const useTableStore = defineStore('table', (): State => {
  const query = ref<string>('')

  return {
    query
  }
})
