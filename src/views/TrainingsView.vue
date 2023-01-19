<script setup lang="ts">
  import EntityTitle from '@/components/EntityTitle.vue'
  import EntityContent from '@/components/EntityContent.vue'
  import { useUserStore } from '@/stores/user'
  import dayjs from 'dayjs'

  interface Training {
    id: number,
    status: string,
    instructor: any,
    students: any[],
    date: Date
  }

  const userStore = useUserStore()

  const title = 'Trainings'
  const organization = userStore.user.organization.name

  const columns = [
    'Status', 'Instructor', 'Students', 'Date'
  ]
  const fetchUrl = '/training'

  const getRowObject = (training: any): any => {
    const trainingDate = dayjs(training.creationDateTime)

    return {
      id: {
        display: (id: string) => id,
        value: training.id,
        editable: false,
      },
      status: {
        display: (status: string) => status,
        value: training.status,
        editable: false,
      },
      instructor: {
        display: (instructor: any) => `${ instructor?.firstName } ${ instructor?.lastName }`,
        value: training.instructor,
        editable: true,
        edit: {
          type: 'search-single'
        }
      },
      students: {
        display: (students: any[]) => students?.map((student: any) => `${ student?.firstName } ${ student?.lastName }`)
            .join(', '),
        value: training.students,
        editable: true,
        edit: {
          type: 'search-multiple'
        }
      },
      date: {
        display: (creationDateTime: string) => dayjs(creationDateTime).format('DD-MM-YYYY HH:mm'),
        value: trainingDate,
        editable: false,
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