<script setup lang="ts">
  import EntityTitle from '@/components/EntityTitle.vue'
  import EntityContent from '@/components/EntityContent.vue'
  import { useUserStore } from '@/stores/user'
  import dayjs from 'dayjs'
  import type { Column } from '@/shared/interfaces'

  interface TrainingColumns {
    id: Column,
    status: Column,
    instructor: Column,
    students: Column,
    date: Column
  }

  const userStore = useUserStore()

  const title = 'Trainings'
  const organization = userStore.user.organization.name

  const columns = [
    'Status', 'Instructor', 'Students', 'Date'
  ]
  const fetchUrl = '/training'

  const getRowObject = (training: any): TrainingColumns => {
    const trainingDate = dayjs(training.creationDateTime)

    return {
      id: {
        key: 'id',
        display: (id: string) => id,
        value: training.id,
        editable: false,
        queryable: false
      },
      status: {
        key: 'status',
        display: (status: string) => status,
        value: training.status,
        editable: false,
        queryable: false
      },
      instructor: {
        key: 'instructor',
        display: (instructor: any) => `${ instructor?.firstName } ${ instructor?.lastName }`,
        value: training.instructor,
        editable: true,
        queryable: true,
        edit: {
          type: 'search-single',
          options: {
            id: (instructor: any) => instructor.id,
            fetchUrl: '/user',
            queryable: (instructor: any) => `${ instructor?.firstName } ${ instructor?.lastName }`,
            displaySub: (instructor: any) => instructor.email
          }
        }
      },
      students: {
        key: 'students',
        display: (student: any) => Array.isArray(student)
            ? student?.map((student: any) => `${ student?.firstName } ${ student?.lastName }`).join(', ')
            : `${ student?.firstName } ${ student?.lastName }`,
        value: training.students,
        editable: true,
        queryable: true,
        edit: {
          type: 'search-multiple',
          options: {
            id: (student: any) => student.id,
            fetchUrl: '/user',
            queryable: (student: any) => `${ student?.firstName } ${ student?.lastName }`,
            displaySub: (student: any) => student.email
          }
        }
      },
      date: {
        key: 'date',
        display: (creationDateTime: string) => dayjs(creationDateTime).format('DD-MM-YYYY HH:mm'),
        value: trainingDate,
        editable: false,
        queryable: false
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