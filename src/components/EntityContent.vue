<script setup lang="ts">
  import EntityTable from '@/components/EntityTable.vue'
  import TableTop from '@/components/TableTop.vue'
  import { onMounted, ref } from 'vue'
  import { useTableStore } from '@/stores/table'
  import { useToast}  from 'vue-toastification'
  import CreateRow from '@/components/CreateRow.vue'
  import axios from '@/shared/axios'

  const props = defineProps<{
    route: string,
    columns: string[],
    getRowObject(values: any): any,
    getUpdateObject(updated: any): any,
    createSettings?: any
  }>()

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
        const res = await axios(true)
            .get(props.route)

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
    if (!validateInputObject(updatedRow)) {
      toast.warning('All fields must be filled')
      return
    }

    try {
      await axios(true)
          .put(
              `${ props.route }/${ updatedRow.id?.value }`,
              props.getUpdateObject(updatedRow)
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
      await axios(true)
          .delete(`${ props.route }/${ deletedRow.id.value }`)

      rows.value = rows.value.filter((row) => row.id.value !== deletedRow.id.value)

      toast.success('Row has been deleted successfully!')
    } catch(e: any) {
      toast.error(e.response.statusText)
    }
  }

  const onCreateRow = async (createdRow: any) => {
    for (const creatableColumn in props.createSettings) {
      const staticValue = props.createSettings[creatableColumn].staticValue

      if (!staticValue)
        continue

      createdRow[creatableColumn] = staticValue
    }

    if (!validateInputObject(createdRow)) {
      toast.warning('All fields must be filled')
      return
    }

    try {
      const res = await axios(true)
          .post(props.route, createdRow)

      isCreatingRow.value = false

      rows.value.push(props.getRowObject(res.data))

      toast.success('Row has been added successfully!')
    } catch(e: any) {
      toast.error(e.response.statusText)
    }
  }

  const validateInputObject = (object: any) => {
    for (const creatableColumn in props.createSettings) {
      if (object.hasOwnProperty(creatableColumn) || !!object[creatableColumn]) {
        if (object[creatableColumn].display && object[creatableColumn].id !== undefined) {
          object[creatableColumn] = object[creatableColumn].id
        }

        continue
      }

      return false
    }

    return true
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
  <div class="bg-foreground rounded-[3px] text-text mt-5 pb-3">
    <CreateRow
      v-if="props.createSettings"
      :open="isCreatingRow"
      :create-settings="createSettings"
      @close="onCloseCreatingRow"
      @create="onCreateRow"
    />
    <TableTop
      :results-length="tableStore.query ? filteredRows.length : rows.length"
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
  </div>
</template>

<style scoped>

</style>
