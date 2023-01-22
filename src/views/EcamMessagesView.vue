<script setup lang="ts">
  import EntityTitle from '@/components/EntityTitle.vue'
  import EntityContent from '@/components/EntityContent.vue'
  import { useUserStore } from '@/stores/user'
  import type { Column } from '@/shared/interfaces';

  interface EcamMessageColumns {
    id: Column,
    name: Column,
    isAccepted: Column,
  }

  const userStore = useUserStore()

  const title = 'ECAM Messages'
  const organization = userStore.user.organization.name

  const columns = [
    'Name', 'Accepted',
  ]
  const route = '/ecam-message'

  const getUpdateObject = (updated: any) => {
    const { name, message, symbol } = updated

    return {
      name: name.value,
      message: message.value,
      symbol: symbol.value
    }
  }

  const getRowObject = (ecamMessage: any): EcamMessageColumns => {
    return {
      id: {
        key: 'id',
        display: (id: string) => id,
        value: ecamMessage.id,
        editable: false,
        queryable: true,
      },
      name: {
        key: 'name',
        display: (name: string) => name,
        value: ecamMessage.name,
        editable: false,
        queryable: true
      },
      isAccepted: {
        key: 'isAccepted',
        display: (isAccepted: string) => isAccepted,
        value: ecamMessage.isAccepted,
        editable: false,
        queryable: true
      }
    }
  }
</script>

<template>
  <div class="mx-10 my-7 min-h-full">
    <EntityTitle
        :title="title"
        :organization="organization"
    />
    <EntityContent
        :columns="columns"
        :route="route"
        :get-row-object="getRowObject"
        :get-update-object="getUpdateObject"
    />
  </div>
</template>

<style>
</style>