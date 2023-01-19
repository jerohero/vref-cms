<script setup lang="ts">
  import EntityTitle from '@/components/EntityTitle.vue'
  import EntityContent from '@/components/EntityContent.vue'
  import { useUserStore } from '@/stores/user'

  interface UserColumns {
    id: Column,
    email: Column,
    firstName: Column,
    lastName: Column,
    userType: Column,
    organization: Column
  }

  interface Column {
    display: string,
    value: any,
    queryable: boolean, // For searching the table
    editable: boolean, // For making values editable
    edit?: {
      type: string, // Specifies the way the value can be edited
      disabled?: boolean, // Disables editing of the column based on a condition
      options?: {
        id: (value: any) => string,
        value?: any[], // Defines pre-defined options
        fetchUrl?: string, // Defines the URL options can be fetched from
        display: (value: any) => string, // Defines how the option's display value is created
        displaySecondary?: (value: any) => string, // Defines how the option's secondary display value is created
        queryable: (value: any) => string, // Defines how the option's queryable value is created
      }
    }
  }

  const userStore = useUserStore()

  const title = 'Users'
  const organization = userStore.user.organization?.name

  const columns = [
    'Email', 'First name', 'Last name', 'Role', 'Organization'
  ]
  const fetchUrl = '/user'

  const getRowObject = (user: any): UserColumns => {
    return {
      id: {
        display: user.id,
        value: user.id,
        queryable: false,
        editable: false,
      },
      email: {
        display: user.email,
        value: user.email,
        editable: true,
        queryable: true,
        edit: {
          type: 'input-text'
        }
      },
      firstName: {
        display: user.firstName,
        value: user.firstName,
        editable: true,
        queryable: true,
        edit: {
          type: 'input-text'
        }
      },
      lastName: {
        display: user.lastName,
        value: user.lastName,
        editable: true,
        queryable: true,
        edit: {
          type: 'input-text'
        }
      },
      userType: {
        display: user.userType,
        value: user.userType,
        queryable: false,
        editable: true,
        edit: {
          type: 'search-single',
          options: {
            id: (userType: string) => userType,
            value: [
              'SuperAdmin',
              'Admin',
              'Instructor',
              'Student'
            ],
            display: (userType: string) => userType,
            queryable: (userType: string) => userType
          }
        }
      },
      organization: {
        display: user.organization.name,
        value: user.organization,
        queryable: true,
        editable: true,
        edit: {
          type: 'search-single',
          disabled: userStore.user.userType !== 'SuperAdmin',
          options: {
            id: (organization: any) => organization.id,
            fetchUrl: '/organization',
            display: (organization: any) => organization.name,
            queryable: (organization: any) => organization.name
          }
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