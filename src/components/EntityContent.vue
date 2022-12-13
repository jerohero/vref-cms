<script setup lang="ts">
import EntityTable from "@/components/EntityTable.vue";
import TableTop from "@/components/TableTop.vue";
import Pagination from "@/components/Pagination.vue";
import {onMounted, ref} from "vue";

const props = defineProps<{
  fetchUrl: string,
  columns: string[]
}>()

const data = ref<object[]>()

const fetch = async () => {
  if (props.fetchUrl) {
    return [
      { id: 1, status: 'Processing', instructor: { name: 'Jakob Schuurhuis' }, students: [{ name: 'Tim Sanou' }, { name: 'Burak Ucar' }], date: '24/11/2022' },
      { id: 2, status: 'Processing', instructor: { name: 'Jakob Schuurhuis' }, students: [{ name: 'Tim Sanou' }, { name: 'Burak Ucar' }], date: '24/11/2022' }
    ]
  }

  return []
}

onMounted(() => {
  fetch().then((res) => {
    data.value = res
  })
})
</script>

<template>
  <div class="bg-foreground rounded-[3px] text-text mt-5">
    <TableTop/>
    <EntityTable :data="data" :columns="columns"/>
    <Pagination/>
  </div>
</template>

<style scoped>

</style>
