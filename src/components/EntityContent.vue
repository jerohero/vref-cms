<script setup lang="ts">
  import EntityTable from '@/components/EntityTable.vue'
  import TableTop from '@/components/TableTop.vue'
  import Pagination from '@/components/Pagination.vue'
  import { onMounted, ref } from 'vue'
  import axios from 'axios'
  import { useUserStore}  from '@/stores/user'
  import { useTableStore } from '@/stores/table'
  import { useToast}  from 'vue-toastification'
  import CreateRow from "@/components/CreateRow.vue";

  const props = defineProps<{
    route: string,
    columns: string[],
    getRowObject(values: any): any,
    getUpdateObject(updated: any): any,
    createSettings?: any
  }>()

  const userStore = useUserStore()
  const tableStore = useTableStore()
  const toast = useToast()

  const rows = ref<any[]>([])
  const filteredRows = ref<any[]>([])
  const isFetching = ref<boolean>(false)
  const isCreatingRow = ref(false)

  const fetch = async () => {
    if (props.route) {
      isFetching.value = true

      try {
        const res = await axios.get('https://vrefsolutions-api.azurewebsites.net/api' + props.route, {
          headers: { 'Authorization': userStore.bearerToken }
        })

        isFetching.value = false

        return dataToRows(res.data)
      } catch(e: any) {
        isFetching.value = false
        toast.error(e.response.statusText)

        return []
      }
    }

    return []
  }

  const updateRow = async (updatedRow: any) => {
    try {
      await axios.put(
          `https://vrefsolutions-api.azurewebsites.net/api${ props.route }/${ updatedRow.id.value }`,
          props.getUpdateObject(updatedRow),
          {
            headers: { 'Authorization': userStore.bearerToken }
          }
      )

      const rowIndex = rows.value.map((row) => row.id.value).indexOf(updatedRow.id.value)
      for (const key in rows.value[rowIndex]) {
        rows.value[rowIndex][key].value = updatedRow[key].value
      }

      toast.success('Row has been updated successfully!')
    } catch(e: any) {
      toast.error(e.response.statusText)
    }
  }

  const deleteRow = async (deletedRow: any) => {
    try {
      await axios.delete(
          `https://vrefsolutions-api.azurewebsites.net/api${ props.route }/${ deletedRow.id.value }`,
          {
            headers: { 'Authorization': userStore.bearerToken }
          }
      )

      rows.value = rows.value.filter((row) => row.id.value !== deletedRow.id.value)

      toast.success('Row has been deleted successfully!')
    } catch(e: any) {
      toast.error(e.response.statusText)
    }
  }

  const onCreateRow = async (createdRow: any) => {
    try {
      const res = await axios.post(
          `https://vrefsolutions-api.azurewebsites.net/api${ props.route }`,
          createdRow,
          {
            headers: { 'Authorization': userStore.bearerToken }
          }
      )

      isCreatingRow.value = false

      rows.value.push(props.getRowObject(res.data))

      toast.success('Row has been added successfully!')
    } catch(e: any) {
      toast.error(e.response.statusText)
    }
  }

  const dataToRows = (values: any[]) => {
    const output = []

    for (const value of values) {
      output.push(props.getRowObject(value))
    }

    return output
  }

  const filter = (query: string) => {
    return rows.value.filter((row) => {
      let queryable = ''

      for (const rowKey in row) {
        const rowValue = row[rowKey]

        if (rowValue.queryable) {
          queryable += ` ${ rowValue.display(rowValue.value) }`
        }
      }

      return queryable.toLowerCase().includes(query.toLowerCase())
    })
  }

  const onOpenCreatingRow = () => {
    isCreatingRow.value = true
  }

  const onCloseCreatingRow = () => {
    isCreatingRow.value = false
  }

  onMounted(() => {
    fetch().then((res) => {
      rows.value = res
    })
  })

  tableStore.$subscribe((mutation, state) => {
    filteredRows.value = state.query
        ? filter(state.query)
        : []
  })
</script>

<template>
  <div class="bg-foreground rounded-[3px] text-text mt-5">
    <CreateRow
      v-if="props.createSettings"
      :open="isCreatingRow"
      :create-settings="createSettings"
      @close="onCloseCreatingRow"
      @create="onCreateRow"
    />
    <TableTop
      :results-length="rows.length"
      :show-add="!!createSettings"
      @create-click="onOpenCreatingRow"
    />
    <EntityTable
      :columns="columns"
      :rows="tableStore.query ? filteredRows : rows"
      :is-fetching="isFetching"
      @update-row="updateRow"
      @delete-row="deleteRow"
    />
    <Pagination/>
  </div>
</template>

<style scoped>

</style>
