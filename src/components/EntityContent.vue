<script setup lang="ts">
import EntityTable from "@/components/EntityTable.vue";
import TableTop from "@/components/TableTop.vue";
import Pagination from "@/components/Pagination.vue";
import {onMounted, ref} from "vue";

const props = defineProps<{
  fetchUrl: string,
  columns: string[],
  getRowObject(values: any): any
}>()

const rows = ref<any[]>()

const fetch = async () => {
  if (props.fetchUrl) {
    const values = [
      { id: 1, status: 'Processing', instructor: { name: 'Jakob Schuurhuis' }, students: [{ name: 'Tim Sanou' }, { name: 'Burak Ucar' }], date: '24/11/2022' },
      { id: 2, status: 'Processing', instructor: { name: 'Jakob Schuurhuis' }, students: [{ name: 'Tim Sanou' }, { name: 'Burak Ucar' }], date: '24/11/2022' }
    ]

    return dataToRows(values)
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
    />
    <Pagination/>
  </div>
</template>

<style scoped>

</style>
