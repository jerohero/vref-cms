<script setup lang="ts">
import EntityTable from "@/components/EntityTable.vue";
import TableTop from "@/components/TableTop.vue";
import Pagination from "@/components/Pagination.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import {useUserStore} from "@/stores/user";

const props = defineProps<{
  fetchUrl: string,
  columns: string[],
  getRowObject(values: any): any
}>()

const userStore = useUserStore()

const rows = ref<any[]>([])
const isFetching = ref<boolean>(false)

const fetch = async () => {
  if (props.fetchUrl) {
    isFetching.value = true

    const res = await axios.get(props.fetchUrl, {
      headers: { 'Authorization': userStore.bearerToken }
    })

    isFetching.value = false

    return dataToRows(res.data)
  }

  return []
}

const dataToRows = (values: any[]) => {
  const output = []

  for (const value of values) {
    output.push(props.getRowObject(value))
  }

  return output
}

onMounted(() => {
  fetch().then((res) => {
    rows.value = res
  })
})
</script>

<template>
  <div class="bg-foreground rounded-[3px] text-text mt-5">
    <TableTop/>
    <EntityTable
        :columns="columns"
        :rows="rows"
        :is-fetching="isFetching"
    />
    <Pagination/>
  </div>
</template>

<style scoped>

</style>
