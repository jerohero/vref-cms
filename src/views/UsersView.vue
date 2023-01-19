<script setup lang="ts">
  import EntityTitle from '@/components/EntityTitle.vue'
  import EntityContent from '@/components/EntityContent.vue'
  import { useUserStore } from '@/stores/user'

  interface User {
    id: number,
    name: string
  }

  const userStore = useUserStore()

  const title = 'Users'
  const organization = userStore.user.organization.name

  const columns = [
    'Email', 'First name', 'Last name', 'Role', 'Organization'
  ]
  const fetchUrl = '/user'

  const getRowObject = (training: any): any => {
    return {
      id: {
        display: training.id,
        value: training.id,
        queryable: false,
        editable: false,
      },
      email: {
        display: training.email,
        value: training.email,
        editable: true,
        queryable: true,
        edit: {
          type: 'input-text'
        }
      },
      firstName: {
        display: training.firstName,
        value: training.firstName,
        editable: true,
        queryable: true,
        edit: {
          type: 'input-text'
        }
      },
      lastName: {
        display: training.lastName,
        value: training.lastName,
        editable: true,
        queryable: true,
        edit: {
          type: 'input-text'
        }
      },
      userType: {
        display: training.userType,
        value: training.userType,
        queryable: false,
        editable: true,
        edit: {
          type: 'search-single',
          optionDisplay: (userType: string) => userType,
          queryable: (userType: string) => userType
        }
      },
      organization: {
        display: training.organization.name,
        value: training.organization,
        queryable: true,
        editable: true,
        edit: {
          type: 'search-single',
          disabled: userStore.user.userType !== 'SuperAdmin',
          optionsUrl: '/organization',
          optionDisplay: (organization: any) => organization.name,
          queryable: (organization: any) => organization.name
        }
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
        :fetchUrl="fetchUrl"
        :getRowObject="getRowObject"
    />
  </div>
</template>

<style>
</style>