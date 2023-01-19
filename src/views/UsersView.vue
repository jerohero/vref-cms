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
    key: string,
    display: (value: any) => string, // Defines how the displayed value is created
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
        displaySub?: (value: any) => string, // Defines how the option's secondary display value is created
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
        key: 'id',
        display: (id: string) => id,
        value: user.id,
        queryable: false,
        editable: false,
      },
      email: {
        key: 'email',
        display: (email: string) => email,
        value: user.email,
        editable: true,
        queryable: true,
        edit: {
          type: 'input-text'
        }
      },
      firstName: {
        key: 'firstName',
        display: (firstName: string) => firstName,
        value: user.firstName,
        editable: true,
        queryable: true,
        edit: {
          type: 'input-text'
        }
      },
      lastName: {
        key: 'lastName',
        display: (lastName: string) => lastName,
        value: user.lastName,
        editable: true,
        queryable: true,
        edit: {
          type: 'input-text'
        }
      },
      userType: {
        key: 'userType',
        display: (userType: string) => userType,
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
            queryable: (userType: string) => userType
          }
        }
      },
      organization: {
        key: 'organization',
        display: (organization: any) => organization.name,
        value: user.organization,
        queryable: true,
        editable: true,
        edit: {
          type: 'search-single',
          disabled: userStore.user.userType !== 'SuperAdmin',
          options: {
            id: (organization: any) => organization.id,
            fetchUrl: '/organization',
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